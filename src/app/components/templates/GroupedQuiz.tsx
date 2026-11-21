import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { QuizSlide, type QuizOption } from './QuizSlide';
import { trackEvent } from '../../analytics';

export interface GroupedQuizQuestion {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

interface GroupedQuizProps {
  /** The section's questions, in the order they should be asked. */
  questions: GroupedQuizQuestion[];
  /** Passed straight through to QuizSlide: dense layout for long question / option text. */
  compact?: boolean;
}

/**
 * One slide that holds a whole section's quiz and steps through it a question
 * at a time. Each question is a plain QuizSlide (same look, same answer
 * feedback, same explanation); this component only adds the stepper bar
 * underneath — Previous · "Question N / total" · Next question — and a short
 * end state after the last question.
 *
 * Answers are remembered while the slide is mounted, so going back shows a
 * question as the student left it. A single-question quiz renders as a bare
 * QuizSlide with no stepper.
 */
export function GroupedQuiz({ questions, compact = false }: GroupedQuizProps) {
  const { t } = useTranslation('common');
  const total = questions.length;

  // step: 0 … total-1 is a question, total is the end state.
  const [step, setStep] = useState(0);
  // question index → index of the option the student picked
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // Bumped on "Try again" so every question remounts unanswered.
  const [round, setRound] = useState(0);

  if (total === 0) return null;
  if (total === 1) return <QuizSlide {...questions[0]} compact={compact} />;

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q, i) => answers[i] !== undefined && q.options[answers[i]]?.correct).length;

  const finish = () => {
    trackEvent('quiz_group_complete', { total, answered: answeredCount, correct: correctCount });
    setStep(total);
  };

  const restart = () => {
    setAnswers({});
    setRound((r) => r + 1);
    setStep(0);
  };

  // ── End state ──
  if (step >= total) {
    return (
      <div className="slide-template w-full items-center justify-center p-5 lg:p-10">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex size-14 lg:size-16 items-center justify-center rounded-full bg-[#6366f1]/20 border border-[#6366f1] mb-4 lg:mb-5">
            <Check className="size-7 lg:size-8 text-[#6366f1]" strokeWidth={3} />
          </div>
          <h2 className="text-xl lg:text-3xl font-bold text-foreground">{t('quiz.doneTitle')}</h2>
          <p className="mt-3 text-sm lg:text-lg text-muted-foreground">
            {answeredCount === total
              ? t('quiz.doneScore', { correct: correctCount, total })
              : t('quiz.doneScorePartial', { correct: correctCount, answered: answeredCount, total })}
          </p>
          <div className="mt-5 lg:mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/30 px-4 py-2 text-sm lg:text-base font-semibold text-foreground transition-all hover:border-[#6366f1] hover:bg-[#6366f1]/5 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              {t('quiz.review')}
            </button>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card/30 px-4 py-2 text-sm lg:text-base font-semibold text-foreground transition-all hover:border-[#6366f1] hover:bg-[#6366f1]/5 cursor-pointer"
            >
              <RotateCcw className="size-4" />
              {t('quiz.restart')}
            </button>
          </div>
          <p className="mt-5 lg:mt-7 text-xs lg:text-sm text-muted-foreground">{t('quiz.continueHint')}</p>
        </div>
      </div>
    );
  }

  // ── One question + the stepper bar ──
  const current = questions[step];
  const isLast = step === total - 1;
  const answered = answers[step] !== undefined;

  return (
    <div className="slide-template w-full min-h-0">
      {/* The question scrolls inside this box if it is ever too tall, so the stepper bar stays put. */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
        <QuizSlide
          key={`${round}-${step}`}
          question={current.question}
          options={current.options}
          explanation={current.explanation}
          compact={compact}
          defaultSelectedIndex={answers[step] ?? null}
          onAnswer={(index) => setAnswers((prev) => ({ ...prev, [step]: index }))}
        />
      </div>

      {/* Kept to a centred column, narrower than the question, so "Next question" never
          sits under the floating slide up/down buttons in the bottom-right corner. */}
      <div className="shrink-0 w-full px-5 lg:px-10 pb-4 lg:pb-5">
        <div className="max-w-2xl w-full mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="justify-self-start">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60 cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                {t('quiz.previous')}
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {questions.map((q, i) => {
                const picked = answers[i];
                const state =
                  picked === undefined
                    ? i === step ? 'bg-[#6366f1]' : 'bg-muted-foreground/30'
                    : q.options[picked]?.correct ? 'bg-[#10b981]' : 'bg-[#ef4444]';
                return (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i === step ? 'w-5' : 'w-1.5'} ${state}`}
                  />
                );
              })}
            </div>
            <span className="text-xs lg:text-sm font-semibold text-muted-foreground tabular-nums" aria-live="polite">
              {t('quiz.progress', { n: step + 1, total })}
            </span>
          </div>

          <div className="justify-self-end">
            <button
              type="button"
              onClick={isLast ? finish : () => setStep(step + 1)}
              className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm lg:text-base font-bold transition-all cursor-pointer ${
                answered
                  ? 'border-[#6366f1] bg-[#6366f1] text-white hover:bg-[#6366f1]/90'
                  : 'border-[#6366f1]/50 text-[#6366f1] hover:border-[#6366f1] hover:bg-[#6366f1]/5'
              }`}
            >
              {isLast ? t('quiz.finish') : t('quiz.next')}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
