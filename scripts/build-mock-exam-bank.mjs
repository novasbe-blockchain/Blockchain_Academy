#!/usr/bin/env node
/**
 * Builds src/data/mockExamBank.json (the question pool for the hidden mock-exam
 * page) from the exam question-bank CSV.
 *
 *   node scripts/build-mock-exam-bank.mjs <path/to/question-bank-final.csv>
 *
 * - Pool = every row whose `change` column is not "removed".
 * - The review columns (`change`, `change_note`) are NOT written to the JSON.
 * - Ids are derived from the course + question stem, so they stay the same when
 *   rows are added, removed or reordered (they only change if a stem is edited).
 * - Near-twin questions that must never share an exam are listed below by the
 *   NEWnnn tag found in the source `change_note`; they are resolved to ids here
 *   and written as `exclusivePairs`. A pair that cannot be resolved is skipped
 *   with a warning rather than failing the build.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXCLUSIVE_PAIRS = [
  ['NEW004', 'NEW041'],
  ['NEW036', 'NEW047'],
  ['NEW056', 'NEW065'],
  ['NEW058', 'NEW059'],
];

const COURSE_PREFIX = {
  'blockchain-fundamentals': 'bf',
  'blockchain-platforms': 'bp',
  'smart-contracts': 'sc',
};

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/mockExamBank.json');

/** Minimal RFC 4180 parser: quoted fields, escaped quotes, newlines in fields. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      rows.push(row); row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f !== ''));
}

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-mock-exam-bank.mjs <question-bank.csv>');
  process.exit(1);
}

const [header, ...body] = parseCsv(readFileSync(src, 'utf8').replace(/^﻿/, ''));
const records = body.map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? '').trim()])));
const pool = records.filter((r) => r.change !== 'removed');

const seenIds = new Set();
const idByTag = new Map(); // NEWnnn -> id
const questions = pool.map((r, n) => {
  const where = `pool row ${n + 1} ("${r.question.slice(0, 50)}…")`;
  const prefix = COURSE_PREFIX[r.course];
  if (!prefix) throw new Error(`Unknown course "${r.course}" at ${where}`);

  const options = [1, 2, 3, 4, 5].map((i) => r[`option_${i}`]);
  const count = options.filter(Boolean).length;
  if (options.slice(0, count).some((o) => !o)) throw new Error(`Gap in options at ${where}`);
  const correct = Number(r.correct_option_number);
  if (!(correct >= 1 && correct <= count)) throw new Error(`Bad correct_option_number at ${where}`);
  if (options[correct - 1] !== r.correct_option_text) throw new Error(`correct_option_text mismatch at ${where}`);

  const id = `${prefix}-${createHash('sha1').update(`${r.course}\n${r.question}`).digest('hex').slice(0, 8)}`;
  if (seenIds.has(id)) throw new Error(`Duplicate id ${id} at ${where}`);
  seenIds.add(id);

  const tag = r.change_note.match(/^\[(NEW\d+)/)?.[1];
  if (tag) idByTag.set(tag, id);

  return {
    id,
    course: r.course,
    section_number: Number(r.section_number),
    section_title: r.section_title,
    question: r.question,
    options: options.slice(0, count),
    correct_option_number: correct,
    correct_option_text: r.correct_option_text,
    explanation: r.explanation,
  };
});

const exclusivePairs = [];
for (const [a, b] of EXCLUSIVE_PAIRS) {
  const ia = idByTag.get(a);
  const ib = idByTag.get(b);
  if (ia && ib) exclusivePairs.push([ia, ib]);
  else console.warn(`! exclusive pair ${a}+${b} not resolved — constraint skipped`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify({ exclusivePairs, questions }, null, 1)}\n`);

const perCourse = {};
for (const q of questions) perCourse[q.course] = (perCourse[q.course] ?? 0) + 1;
console.log(`${questions.length} questions (${records.length - pool.length} removed rows skipped) -> ${OUT}`);
console.log(perCourse);
console.log(`${exclusivePairs.length}/${EXCLUSIVE_PAIRS.length} exclusive pairs resolved`);
