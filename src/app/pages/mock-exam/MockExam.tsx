import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, Send, X } from 'lucide-react';
import { useLang } from '../../../i18n/useLang';
import { BrandLogo } from '../../components/shared/BrandLogo';
import { MockExamLoading } from './MockExamLoading';
import {
  createAttempt,
  getQuestion,
  isBankLoaded,
  isCorrect,
  loadBank,
  loadOrCreateAttempt,
  saveAttempt,
  scoreAttempt,
  type CourseId,
  type ExamAttempt,
  type ExamScore,
} from './examEngine';

/**
 * Hidden mock-exam page (route `/:lang/mockexam`). Not linked from anywhere: the
 * only way in is typing the trigger on the Academy homepage (see
 * CourseSelection) or knowing the URL.
 *
 * One question per screen with a question navigator, a wall-clock countdown
 * that auto-submits at zero, and a results screen with a per-course breakdown
 * and a full review. All exam logic lives in ./examEngine.
 *
 * The question bank is fetched when the page mounts (see the default export at
 * the bottom); the exam itself only renders once it has arrived.
 */

const COURSE_COLOR: Record<CourseId, string> = {
  'blockchain-fundamentals': '#ED1C24',
  'blockchain-platforms': '#39B54A',
  'smart-contracts': '#6366f1',
};

/** Neutral "quiz" accent used across the site's quizzes; red/green stay reserved for wrong/right. */
const ACCENT = '#6366f1';

const letter = (position: number) => String.fromCharCode(65 + position);

function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const secondsUntil = (deadline: number) => Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

function CourseBadge({ course }: { course: CourseId }) {
  const { t } = useTranslation('mock-exam');
  const color = COURSE_COLOR[course];
  return (
    <span
      className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold"
      style={{ color, borderColor: `${color}55`, backgroundColor: `${color}14` }}
    >
      {t(`courses.${course}`)}
    </span>
  );
}

interface ConfirmDialogProps {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ title, body, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  // Latest onCancel without re-running the effect (the page re-renders as the
  // timer ticks, and re-focusing on every render would steal focus).
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-6 backdrop-blur-md"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="mock-exam-dialog-title"
      aria-describedby="mock-exam-dialog-body"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-2xl">
        <h2 id="mock-exam-dialog-title" className="text-xl font-black text-foreground">
          {title}
        </h2>
        <p id="mock-exam-dialog-body" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-xl border-2 border-[#6366f1] bg-[#6366f1] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#6366f1]/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function MockExamSession() {
  const { t } = useTranslation('mock-exam');
  const lang = useLang();
  const location = useLocation();
  const nonce = (location.state as { mockExamNonce?: string } | null)?.mockExamNonce ?? null;

  const [attempt, setAttempt] = useState<ExamAttempt>(() => loadOrCreateAttempt(nonce));
  const [current, setCurrent] = useState(0);
  // Whole seconds left; only changes once a second, so the 250 ms tick below
  // re-renders the page once a second rather than four times.
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(attempt.deadline));
  const [dialog, setDialog] = useState<null | 'submit' | 'new'>(null);
  const [onlyMissed, setOnlyMissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = attempt.items.length;
  const submitted = attempt.submittedAt !== null;
  const answeredCount = attempt.answers.filter((a) => a !== null).length;

  // Keep the attempt in sessionStorage so a reload resumes it.
  useEffect(() => {
    saveAttempt(attempt);
  }, [attempt]);

  // Countdown. Driven by the wall-clock deadline (not by counting ticks), so a
  // throttled background tab or a sleeping laptop can't stretch the exam.
  useEffect(() => {
    if (submitted) return;
    const tick = () => {
      setSecondsLeft(secondsUntil(attempt.deadline));
      if (Date.now() >= attempt.deadline) {
        setAttempt((a) => (a.submittedAt === null ? { ...a, submittedAt: a.deadline, timedOut: true } : a));
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [submitted, attempt.deadline]);

  // Submitting (by hand or by the timer) closes any open dialog.
  useEffect(() => {
    if (submitted) setDialog(null);
  }, [submitted]);

  // Each question, and the results screen, starts at the top of the page.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [current, submitted, attempt.startedAt]);

  const answer = (index: number, option: number | null) =>
    setAttempt((a) =>
      a.submittedAt !== null ? a : { ...a, answers: a.answers.map((v, i) => (i === index ? option : v)) },
    );

  const submit = () =>
    setAttempt((a) =>
      a.submittedAt !== null ? a : { ...a, submittedAt: Math.min(Date.now(), a.deadline), timedOut: false },
    );

  const startNewExam = () => {
    const fresh = createAttempt(attempt.nonce);
    setAttempt(fresh);
    setSecondsLeft(secondsUntil(fresh.deadline));
    setCurrent(0);
    setOnlyMissed(false);
    setDialog(null);
  };

  // Keyboard: ← → move between questions, A–E / 1–5 pick an option.
  useEffect(() => {
    if (submitted || dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        setCurrent((c) => Math.min(total - 1, c + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrent((c) => Math.max(0, c - 1));
      } else {
        const key = e.key.toLowerCase();
        const position = /^[1-5]$/.test(key) ? Number(key) - 1 : /^[a-e]$/.test(key) ? key.charCodeAt(0) - 97 : -1;
        const order = attempt.items[current].order;
        if (position >= 0 && position < order.length) answer(current, order[position]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submitted, dialog, total, current, attempt.items]);

  const score = useMemo(() => (submitted ? scoreAttempt(attempt) : null), [submitted, attempt]);

  const timerTone =
    secondsLeft <= 60
      ? 'border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444] animate-pulse'
      : secondsLeft <= 5 * 60
      ? 'border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]'
      : 'border-border bg-card text-foreground';

  const newExamButton = (label: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      title={t('exam.newExam')}
      aria-label={t('exam.newExam')}
      className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border-2 border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-[#6366f1] hover:bg-[#6366f1]/5"
    >
      <RotateCcw className="size-4" />
      <span className={label ? '' : 'hidden md:inline'}>{t('exam.newExam')}</span>
    </button>
  );

  return (
    // Fixed-height column: top bar, a middle that scrolls, and (during the exam)
    // a bottom bar. The two bars are flex siblings of the scroller rather than
    // overlays, so they never move and never cover the question. They reserve
    // the same scrollbar gutter as the scroller to stay aligned with it.
    <div className="flex size-full flex-col bg-background">
      {/* ── Top bar: brand · timer · submit ── */}
      <header className="relative z-30 shrink-0 overflow-y-hidden border-b border-border bg-card [scrollbar-gutter:stable]">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 lg:px-8">
          <Link to={`/${lang}`} title={t('home')} aria-label={t('home')} className="hidden shrink-0 sm:block">
            <BrandLogo className="h-7" />
          </Link>
          <span className="hidden whitespace-nowrap text-base font-black text-foreground min-[440px]:inline">{t('title')}</span>
          <span className="hidden rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary sm:inline-block">
            {t('badge')}
          </span>

          <div className="ml-auto flex items-center gap-2">
            {submitted ? (
              newExamButton(true, startNewExam)
            ) : (
              <>
                <span className="hidden text-sm font-semibold tabular-nums text-muted-foreground lg:inline">
                  {t('exam.answered', { n: answeredCount, total })}
                </span>
                <div
                  role="timer"
                  aria-label={t('exam.timeLeft')}
                  title={t('exam.timeLeft')}
                  className={`inline-flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 font-mono text-sm font-bold tabular-nums ${timerTone}`}
                >
                  <Clock className="size-4" />
                  {formatClock(secondsLeft * 1000)}
                </div>
                {newExamButton(false, () => setDialog('new'))}
                <button
                  type="button"
                  onClick={() => setDialog('submit')}
                  className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border-2 border-[#6366f1] bg-[#6366f1] px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-[#6366f1]/90"
                >
                  <Send className="hidden size-4 sm:block" />
                  {t('exam.submit')}
                </button>
              </>
            )}
          </div>
        </div>
        {!submitted && (
          <div
            className="h-1 bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={answeredCount}
            aria-label={t('exam.answered', { n: answeredCount, total })}
          >
            <div
              className="h-full bg-[#6366f1] transition-all duration-300"
              style={{ width: `${(answeredCount / total) * 100}%` }}
            />
          </div>
        )}
      </header>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]">
        {submitted && score ? (
          <ResultsView
            attempt={attempt}
            score={score}
            onlyMissed={onlyMissed}
            setOnlyMissed={setOnlyMissed}
            onNewExam={startNewExam}
            onBackToTop={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        ) : (
          <ExamView attempt={attempt} current={current} setCurrent={setCurrent} onAnswer={answer} />
        )}
      </div>

      {!submitted && (
        <ExamFooter
          current={current}
          total={total}
          picked={attempt.answers[current]}
          setCurrent={setCurrent}
          onClear={() => answer(current, null)}
          onSubmit={() => setDialog('submit')}
        />
      )}

      {dialog === 'submit' && (
        <ConfirmDialog
          title={t('confirm.submitTitle')}
          body={
            answeredCount === total
              ? t('confirm.submitAllAnswered')
              : t('confirm.submitUnanswered', { count: total - answeredCount })
          }
          confirmLabel={t('confirm.submitConfirm')}
          cancelLabel={t('confirm.cancel')}
          onConfirm={submit}
          onCancel={() => setDialog(null)}
        />
      )}
      {dialog === 'new' && (
        <ConfirmDialog
          title={t('confirm.newTitle')}
          body={t('confirm.newBody')}
          confirmLabel={t('confirm.newConfirm')}
          cancelLabel={t('confirm.cancel')}
          onConfirm={startNewExam}
          onCancel={() => setDialog(null)}
        />
      )}
    </div>
  );
}

/* ───────────────────────────── Exam ───────────────────────────── */

interface ExamViewProps {
  attempt: ExamAttempt;
  current: number;
  setCurrent: (index: number) => void;
  onAnswer: (index: number, option: number | null) => void;
}

function ExamView({ attempt, current, setCurrent, onAnswer }: ExamViewProps) {
  const { t } = useTranslation('mock-exam');
  const total = attempt.items.length;
  const item = attempt.items[current];
  const question = getQuestion(item.id);
  const picked = attempt.answers[current];

  return (
    <main className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8 lg:px-8 lg:py-8">
      <section className="min-w-0">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm font-bold tabular-nums text-muted-foreground" aria-live="polite">
              {t('exam.questionOf', { n: current + 1, total })}
            </span>
            <CourseBadge course={question.course} />
          </div>

          <h1 id="mock-exam-question" className="text-lg font-semibold leading-snug text-foreground lg:text-xl">
            {question.question}
          </h1>

          <div className="mt-5 space-y-2.5" role="radiogroup" aria-labelledby="mock-exam-question">
            {item.order.map((option, position) => {
              const selected = picked === option;
              return (
                <button
                  key={`${item.id}-${option}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onAnswer(current, option)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition-all lg:gap-4 lg:px-5 lg:py-4 ${
                    selected
                      ? 'border-[#6366f1] bg-[#6366f1]/10'
                      : 'border-border bg-card/30 hover:border-[#6366f1]/60 hover:bg-[#6366f1]/5'
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold lg:size-8 lg:text-sm ${
                      selected ? 'border-[#6366f1] bg-[#6366f1] text-white' : 'border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {letter(position)}
                  </span>
                  <span className="text-sm leading-snug text-foreground lg:text-base">{question.options[option]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Question navigator */}
      <aside className="self-start rounded-2xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-8">
        <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-muted-foreground">
          {t('exam.navigator')}
        </h2>
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 lg:grid-cols-6">
          {attempt.items.map((it, i) => {
            const isAnswered = attempt.answers[i] !== null;
            const isCurrent = i === current;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={t('exam.goToQuestion', { n: i + 1 })}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 text-xs font-bold tabular-nums transition-all sm:text-sm ${
                  isAnswered
                    ? 'border-[#6366f1] bg-[#6366f1] text-white'
                    : 'border-border bg-card text-muted-foreground hover:border-[#6366f1]/60'
                } ${isCurrent ? 'ring-2 ring-foreground ring-offset-2 ring-offset-card' : ''}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded bg-[#6366f1]" />
            {t('exam.legendAnswered')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded border-2 border-border" />
            {t('exam.legendUnanswered')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded border-2 border-border ring-2 ring-foreground ring-offset-1 ring-offset-card" />
            {t('exam.legendCurrent')}
          </span>
        </div>
      </aside>
    </main>
  );
}

/**
 * Previous · clear · next. Lives outside the scrolling area (see
 * MockExamSession), so it sits at the same spot on screen however long the
 * question is. Its grid mirrors ExamView's, which keeps the buttons under the
 * question card on wide screens.
 */
interface ExamFooterProps {
  current: number;
  total: number;
  picked: number | null;
  setCurrent: (index: number) => void;
  onClear: () => void;
  onSubmit: () => void;
}

function ExamFooter({ current, total, picked, setCurrent, onClear, onSubmit }: ExamFooterProps) {
  const { t } = useTranslation('mock-exam');
  const isLast = current === total - 1;

  return (
    <footer className="relative z-30 shrink-0 overflow-y-hidden border-t border-border bg-card [scrollbar-gutter:stable]">
      <div className="mx-auto grid max-w-6xl items-center px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-[#6366f1] hover:bg-[#6366f1]/5 disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-card"
            >
              <ArrowLeft className="size-4" />
              {t('exam.previous')}
            </button>
          </div>
          <button
            type="button"
            onClick={onClear}
            className={`cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground underline-offset-2 hover:text-foreground hover:underline ${
              picked === null ? 'invisible' : ''
            }`}
          >
            {t('exam.clear')}
          </button>
          <div className="justify-self-end">
            <button
              type="button"
              onClick={isLast ? onSubmit : () => setCurrent(current + 1)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#6366f1] bg-[#6366f1] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#6366f1]/90"
            >
              {isLast ? t('exam.submit') : t('exam.next')}
              {isLast ? <Send className="size-4" /> : <ArrowRight className="size-4" />}
            </button>
          </div>
        </div>
        <p className="hidden text-center text-xs text-muted-foreground lg:block">{t('exam.keyboardHint')}</p>
      </div>
    </footer>
  );
}

/* ──────────────────────────── Results ──────────────────────────── */

interface ResultsViewProps {
  attempt: ExamAttempt;
  score: ExamScore;
  onlyMissed: boolean;
  setOnlyMissed: (value: boolean) => void;
  onNewExam: () => void;
  onBackToTop: () => void;
}

function ResultsView({ attempt, score, onlyMissed, setOnlyMissed, onNewExam, onBackToTop }: ResultsViewProps) {
  const { t } = useTranslation('mock-exam');
  const percent = Math.round((score.correct / score.total) * 100);
  const timeUsed = (attempt.submittedAt ?? attempt.deadline) - attempt.startedAt;

  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const rows = attempt.items
    .map((item, index) => ({ item, index, right: isCorrect(attempt, index) }))
    .filter((row) => !onlyMissed || !row.right);

  const filterButton = (active: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
        active ? 'bg-[#6366f1] text-white' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-6 lg:px-8 lg:py-10">
      {/* Total score */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <div className="relative size-36 shrink-0">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-muted" />
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                stroke={ACCENT}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - score.correct / score.total)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tabular-nums text-foreground">
                {score.correct}
                <span className="text-lg text-muted-foreground"> / {score.total}</span>
              </span>
              <span className="text-sm font-bold tabular-nums text-muted-foreground">{percent}%</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-black text-foreground lg:text-3xl">{t('results.title')}</h1>
            <p className="mt-1 text-base text-muted-foreground">
              {t('results.scoreLabel', { correct: score.correct, total: score.total })}
            </p>
            {attempt.timedOut && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#f59e0b]/10 px-2.5 py-1 text-sm font-semibold text-[#f59e0b]">
                <Clock className="size-4" />
                {t('results.timedOut')}
              </p>
            )}
            <dl className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 sm:justify-start">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  {t('results.timeUsed')}
                </dt>
                <dd className="font-mono text-lg font-bold tabular-nums text-foreground">{formatClock(timeUsed)}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  {t('results.answeredStat')}
                </dt>
                <dd className="font-mono text-lg font-bold tabular-nums text-foreground">
                  {score.answered} / {score.total}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={onNewExam}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#6366f1] bg-[#6366f1] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#6366f1]/90"
            >
              <RotateCcw className="size-4" />
              {t('results.newExam')}
            </button>
          </div>
        </div>
      </section>

      {/* Per-course breakdown */}
      <section>
        <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-muted-foreground">
          {t('results.byCourse')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {score.perCourse.map(({ course, correct, total }) => {
            const color = COURSE_COLOR[course];
            return (
              <div key={course} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="text-sm font-bold" style={{ color }}>
                  {t(`courses.${course}`)}
                </div>
                <div className="mt-1 text-2xl font-black tabular-nums text-foreground">
                  {correct}
                  <span className="text-base text-muted-foreground"> / {total}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${total ? (correct / total) * 100 : 0}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Review */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">{t('results.review')}</h2>
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            {filterButton(!onlyMissed, t('results.filterAll'), () => setOnlyMissed(false))}
            {filterButton(onlyMissed, t('results.filterWrong'), () => setOnlyMissed(true))}
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            {t('results.nothingMissed')}
          </p>
        ) : (
          <div className="space-y-4">
            {rows.map(({ item, index, right }) => {
              const question = getQuestion(item.id);
              const picked = attempt.answers[index];
              const correctOption = question.correct_option_number - 1;
              const status = right ? 'correct' : picked === null ? 'unanswered' : 'incorrect';
              const statusClass =
                status === 'correct'
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : status === 'incorrect'
                  ? 'bg-[#ef4444]/10 text-[#ef4444]'
                  : 'bg-muted text-muted-foreground';

              return (
                <article key={item.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-sm font-black tabular-nums text-foreground">{index + 1}</span>
                    <CourseBadge course={question.course} />
                    <span className="text-xs text-muted-foreground">{question.section_title}</span>
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass}`}
                    >
                      {status === 'correct' && <Check className="size-3.5" strokeWidth={3} />}
                      {status === 'incorrect' && <X className="size-3.5" strokeWidth={3} />}
                      {t(`results.${status}`)}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold leading-snug text-foreground lg:text-lg">
                    {question.question}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {item.order.map((option, position) => {
                      const isRight = option === correctOption;
                      const isPick = option === picked;
                      return (
                        <li
                          key={option}
                          className={`flex items-start gap-3 rounded-xl border-2 border-border px-3 py-2.5 ${
                            isRight ? 'ex-correct' : isPick ? 'ex-wrong' : 'bg-card/30'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                              isRight
                                ? 'border-[#10b981] bg-[#10b981] text-white'
                                : isPick
                                ? 'border-[#ef4444] bg-[#ef4444] text-white'
                                : 'border-muted-foreground text-muted-foreground'
                            }`}
                          >
                            {isRight ? (
                              <Check className="size-3.5" strokeWidth={3} />
                            ) : isPick ? (
                              <X className="size-3.5" strokeWidth={3} />
                            ) : (
                              letter(position)
                            )}
                          </span>
                          <span className="flex-1 text-sm leading-snug text-foreground lg:text-base">
                            {question.options[option]}
                          </span>
                          <span className="flex shrink-0 flex-col items-end gap-1">
                            {isPick && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                                  isRight ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#ef4444]/15 text-[#ef4444]'
                                }`}
                              >
                                {t('results.yourAnswer')}
                              </span>
                            )}
                            {isRight && !isPick && (
                              <span className="rounded-full bg-[#10b981]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#10b981]">
                                {t('results.correctAnswer')}
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 rounded-xl bg-muted/60 p-4">
                    <div className="mb-1 text-xs font-black uppercase tracking-wider text-muted-foreground">
                      {t('results.explanation')}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground lg:text-base">{question.explanation}</p>
                  </div>

                  {/* Bank id — lets a reviewer point at a specific question. */}
                  <div className="mt-2 text-right font-mono text-[10px] text-muted-foreground/70">{question.id}</div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToTop}
            className="cursor-pointer rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-[#6366f1] hover:bg-[#6366f1]/5"
          >
            {t('results.backToTop')}
          </button>
          <button
            type="button"
            onClick={onNewExam}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#6366f1] bg-[#6366f1] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#6366f1]/90"
          >
            <RotateCcw className="size-4" />
            {t('results.newExam')}
          </button>
        </div>
      </section>
    </main>
  );
}

/**
 * Route component: downloads the question bank, then hands over to the exam.
 * The bank is a separate chunk, so nothing outside this page pays for it.
 */
export default function MockExam() {
  const { t } = useTranslation('mock-exam');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(() => (isBankLoaded() ? 'ready' : 'loading'));
  const [attemptNo, setAttemptNo] = useState(0);

  useEffect(() => {
    if (isBankLoaded()) return;
    let active = true;
    loadBank().then(
      () => active && setStatus('ready'),
      () => active && setStatus('error'),
    );
    return () => {
      active = false;
    };
  }, [attemptNo]);

  if (status === 'ready') return <MockExamSession />;
  if (status === 'loading') return <MockExamLoading />;

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <p role="alert" className="max-w-sm text-sm font-semibold text-muted-foreground">
        {t('loadError')}
      </p>
      <button
        type="button"
        onClick={() => {
          setStatus('loading');
          setAttemptNo((n) => n + 1);
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-[#6366f1] hover:bg-[#6366f1]/5"
      >
        <RotateCcw className="size-4" />
        {t('retry')}
      </button>
    </div>
  );
}
