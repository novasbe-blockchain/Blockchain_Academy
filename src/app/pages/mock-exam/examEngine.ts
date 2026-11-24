import bank from '../../../data/mockExamBank.json';

/* ------------------------------------------------------------------ */
/*  Mock-exam engine: builds a randomized attempt from the bundled      */
/*  question bank, scores it, and keeps it in sessionStorage so a page  */
/*  reload (or iPad Safari evicting the tab) doesn't lose the attempt.  */
/*  Pure logic — no React in here.                                      */
/* ------------------------------------------------------------------ */

export type CourseId = 'blockchain-fundamentals' | 'blockchain-platforms' | 'smart-contracts';

export interface BankQuestion {
  id: string;
  course: CourseId;
  section_number: number;
  section_title: string;
  question: string;
  options: string[];
  /** 1-based index into `options`. */
  correct_option_number: number;
  correct_option_text: string;
  explanation: string;
}

/** Questions drawn per course, in display order for the breakdown. Sums to 30. */
export const BLUEPRINT: ReadonlyArray<{ course: CourseId; count: number }> = [
  { course: 'blockchain-fundamentals', count: 7 },
  { course: 'blockchain-platforms', count: 10 },
  { course: 'smart-contracts', count: 13 },
];

export const EXAM_QUESTION_COUNT = BLUEPRINT.reduce((n, b) => n + b.count, 0);

/** One minute per question. */
export const EXAM_DURATION_MS = EXAM_QUESTION_COUNT * 60_000;

const QUESTIONS = bank.questions as BankQuestion[];
const EXCLUSIVE_PAIRS = bank.exclusivePairs as string[][];
const BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

export const BANK_SIZE = QUESTIONS.length;

export function getQuestion(id: string): BankQuestion {
  const q = BY_ID.get(id);
  if (!q) throw new Error(`Unknown mock-exam question: ${id}`);
  return q;
}

export interface ExamItem {
  /** Bank question id. */
  id: string;
  /** Display order of the options: `order[k]` is the index into the bank
   *  question's `options` shown in position k. */
  order: number[];
}

export interface ExamAttempt {
  v: 1;
  /** Identifies the homepage trigger that started this attempt (see loadOrCreateAttempt). */
  nonce: string | null;
  items: ExamItem[];
  /** Per item: the picked option as an index into the BANK question's `options`
   *  (not the shuffled position), or null. Storing the original index is what
   *  carries the correct answer through the option shuffle. */
  answers: Array<number | null>;
  startedAt: number;
  deadline: number;
  submittedAt: number | null;
  /** True when the timer ran out rather than the student submitting. */
  timedOut: boolean;
}

type Rng = () => number;

function shuffle<T>(input: readonly T[], rng: Rng): T[] {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Splits `total` draws across groups in proportion to their size, with
 * randomized rounding: every group gets the floor or the ceiling of its
 * proportional share, so a course's questions are always spread over its
 * sections, and across many attempts every question in the course is equally
 * likely to come up.
 */
function allocate(sizes: number[], total: number, rng: Rng): number[] {
  const pool = sizes.reduce((a, b) => a + b, 0);
  const shares = sizes.map((s) => (total * s) / pool);
  const counts = shares.map(Math.floor);
  const order = shuffle(sizes.map((_, i) => i), rng);

  // Systematic sampling over the fractional parts (they sum to the number of
  // draws still to hand out): each group gains at most one extra draw.
  let acc = 0;
  let threshold = rng();
  for (const i of order) {
    acc += shares[i] - counts[i];
    if (acc > threshold && counts[i] < sizes[i]) {
      counts[i]++;
      threshold += 1;
    }
  }
  // Floating-point safety net: top up if a draw was lost to rounding.
  let missing = total - counts.reduce((a, b) => a + b, 0);
  for (const i of order) {
    if (missing <= 0) break;
    if (counts[i] < sizes[i]) { counts[i]++; missing--; }
  }
  return counts;
}

function partnersOf(id: string): string[] {
  const out: string[] = [];
  for (const [a, b] of EXCLUSIVE_PAIRS) {
    if (a === id) out.push(b);
    else if (b === id) out.push(a);
  }
  return out;
}

/** Picks the 30 questions: per-course blueprint, spread across each course's sections. */
function drawQuestions(rng: Rng): BankQuestion[] {
  const picked: BankQuestion[] = [];

  for (const { course, count } of BLUEPRINT) {
    const sections = new Map<number, BankQuestion[]>();
    for (const q of QUESTIONS) {
      if (q.course !== course) continue;
      const list = sections.get(q.section_number);
      if (list) list.push(q);
      else sections.set(q.section_number, [q]);
    }
    const groups = [...sections.values()];
    const counts = allocate(groups.map((g) => g.length), count, rng);
    groups.forEach((group, i) => picked.push(...shuffle(group, rng).slice(0, counts[i])));
  }

  // Mutual exclusion: if both near-twins of a pair were drawn, drop one at
  // random and redraw from the same section (falling back to the same course),
  // never picking something that would clash with what is already in the exam.
  for (const pair of EXCLUSIVE_PAIRS) {
    const present = pair.filter((id) => picked.some((q) => q.id === id));
    if (present.length < 2) continue;
    const dropId = present[Math.floor(rng() * present.length)];
    const dropIndex = picked.findIndex((q) => q.id === dropId);
    const dropped = picked[dropIndex];
    const chosen = new Set(picked.map((q) => q.id));
    const eligible = (q: BankQuestion) =>
      !chosen.has(q.id) && partnersOf(q.id).every((p) => p === dropId || !chosen.has(p));
    const sameSection = QUESTIONS.filter(
      (q) => q.course === dropped.course && q.section_number === dropped.section_number && eligible(q),
    );
    const candidates = sameSection.length
      ? sameSection
      : QUESTIONS.filter((q) => q.course === dropped.course && eligible(q));
    if (candidates.length) picked[dropIndex] = candidates[Math.floor(rng() * candidates.length)];
  }

  return picked;
}

function isTrueFalse(q: BankQuestion): boolean {
  return q.options.length === 2 && q.options[0] === 'True' && q.options[1] === 'False';
}

/** Builds a fresh attempt: new question draw, new question order, new option order. */
export function createAttempt(nonce: string | null = null, now = Date.now(), rng: Rng = Math.random): ExamAttempt {
  const items = shuffle(drawQuestions(rng), rng).map((q) => {
    const indices = q.options.map((_, i) => i);
    // "True / False" always reads in that order; everything else is shuffled.
    return { id: q.id, order: isTrueFalse(q) ? indices : shuffle(indices, rng) };
  });
  return {
    v: 1,
    nonce,
    items,
    answers: items.map(() => null),
    startedAt: now,
    deadline: now + EXAM_DURATION_MS,
    submittedAt: null,
    timedOut: false,
  };
}

export interface ExamScore {
  correct: number;
  answered: number;
  total: number;
  perCourse: Array<{ course: CourseId; correct: number; total: number }>;
}

export function isCorrect(attempt: ExamAttempt, index: number): boolean {
  const picked = attempt.answers[index];
  return picked !== null && picked === getQuestion(attempt.items[index].id).correct_option_number - 1;
}

export function scoreAttempt(attempt: ExamAttempt): ExamScore {
  const perCourse = BLUEPRINT.map(({ course }) => ({ course, correct: 0, total: 0 }));
  let correct = 0;
  let answered = 0;
  attempt.items.forEach((item, i) => {
    const row = perCourse.find((c) => c.course === getQuestion(item.id).course)!;
    row.total++;
    if (attempt.answers[i] !== null) answered++;
    if (isCorrect(attempt, i)) { correct++; row.correct++; }
  });
  return { correct, answered, total: attempt.items.length, perCourse };
}

/* ---------------------------- persistence ---------------------------- */

const STORAGE_KEY = 'mock-exam-attempt';

export function saveAttempt(attempt: ExamAttempt): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
  } catch {
    // ignore (private mode / storage disabled) — the attempt just won't survive a reload
  }
}

function isValid(a: unknown): a is ExamAttempt {
  if (!a || typeof a !== 'object') return false;
  const x = a as ExamAttempt;
  if (x.v !== 1 || !Array.isArray(x.items) || !Array.isArray(x.answers)) return false;
  if (x.items.length !== EXAM_QUESTION_COUNT || x.answers.length !== x.items.length) return false;
  if (typeof x.startedAt !== 'number' || typeof x.deadline !== 'number') return false;
  return x.items.every((item, i) => {
    const q = BY_ID.get(item?.id);
    if (!q || !Array.isArray(item.order) || item.order.length !== q.options.length) return false;
    if (new Set(item.order).size !== q.options.length || item.order.some((o) => !(o >= 0 && o < q.options.length))) return false;
    const picked = x.answers[i];
    return picked === null || (Number.isInteger(picked) && picked >= 0 && picked < q.options.length);
  });
}

function readAttempt(): ExamAttempt | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Decides what the page shows when it mounts.
 *
 * - An attempt still in progress is always resumed (its deadline keeps running
 *   in wall-clock time, so leaving the page does not pause the timer).
 * - A finished attempt is shown again on reload, but a NEW homepage trigger
 *   (a different `nonce`) starts a fresh exam instead.
 * - Otherwise a fresh exam is generated.
 */
export function loadOrCreateAttempt(nonce: string | null, now = Date.now()): ExamAttempt {
  const stored = readAttempt();
  if (stored) {
    // The timer ran out while the page was closed: it counts as auto-submitted.
    if (stored.submittedAt === null && now >= stored.deadline) {
      stored.submittedAt = stored.deadline;
      stored.timedOut = true;
      saveAttempt(stored);
    }
    if (stored.submittedAt === null) return stored;
    if (nonce === null || stored.nonce === nonce) return stored;
  }
  const fresh = createAttempt(nonce, now);
  saveAttempt(fresh);
  return fresh;
}
