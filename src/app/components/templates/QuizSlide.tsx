import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { trackEvent } from '../../analytics';

export interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizSlideProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
  /** Text of the pill above the question, e.g. "Quiz · 2 / 6". Defaults to "Quiz". */
  label?: string;
  /**
   * Dense layout for quizzes with long question / option text. Smaller type and
   * tighter spacing so four multi-line options plus the explanation fit on one
   * slide; if they still don't (short viewports), the slide scrolls instead of
   * clipping.
   */
  compact?: boolean;
  /**
   * Start already answered with this option picked. Lets a wrapper such as
   * GroupedQuiz restore a question the student answered earlier.
   */
  defaultSelectedIndex?: number | null;
  /** Called once, when the student picks an option. */
  onAnswer?: (index: number, correct: boolean) => void;
}

export function QuizSlide({
  question,
  options,
  explanation,
  label = 'Quiz',
  compact = false,
  defaultSelectedIndex = null,
  onAnswer,
}: QuizSlideProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(defaultSelectedIndex);
  const [showAnswer, setShowAnswer] = useState(defaultSelectedIndex !== null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setShowAnswer(true);
    onAnswer?.(index, !!options[index]?.correct);
    trackEvent('quiz_answer', {
      quiz: question,
      quiz_type: 'multiple_choice',
      correct: !!options[index]?.correct,
    });
  };

  const isCorrect = selectedIndex !== null && options[selectedIndex]?.correct;

  return (
    <div
      className={
        compact
          // min-h-0 + overflow-y-auto: scroll inside the slide rather than clip.
          // Centering is done with m-auto on the child so overflow stays reachable.
          ? 'slide-template w-full min-h-0 overflow-y-auto [overflow-anchor:none] p-5 lg:px-10 lg:py-6'
          : 'slide-template w-full items-center justify-center p-5 lg:p-10'
      }
    >
      <div className={compact ? 'max-w-5xl w-full m-auto' : 'max-w-4xl w-full'}>
        <div className={compact ? 'mb-3 lg:mb-4 text-center' : 'mb-4 lg:mb-6 text-center'}>
          <div
            className={`inline-block rounded-full bg-[#6366f1]/20 border border-[#6366f1] ${
              compact ? 'px-3 py-1 mb-2 lg:mb-3 text-sm' : 'px-4 py-2 mb-3 lg:mb-4'
            }`}
          >
            <span className="text-[#6366f1] font-bold">{label}</span>
          </div>
          <h2
            className={`font-bold text-foreground ${
              compact ? 'text-lg lg:text-2xl leading-snug text-balance' : 'text-xl lg:text-3xl'
            }`}
          >
            {question}
          </h2>
        </div>

        <div className={compact ? 'space-y-2 mb-3' : 'space-y-2 lg:space-y-3 mb-4 lg:mb-6'}>
          {options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const showCorrect = showAnswer && option.correct;
            const showIncorrect = showAnswer && isSelected && !option.correct;

            // Determine state class using the shared ex-* vocabulary
            const stateClass = showCorrect
              ? 'ex-correct cursor-default'
              : showIncorrect
              ? 'ex-wrong cursor-default'
              : isSelected && !showAnswer
              ? 'ex-selected cursor-pointer'
              : !showAnswer
              ? 'border-border bg-card/30 hover:border-[#6366f1] hover:bg-[#6366f1]/5 cursor-pointer'
              : 'border-border bg-card/30 cursor-default';

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showAnswer}
                className={`w-full rounded-xl border-2 text-left transition-all flex items-center ${
                  compact ? 'px-3 py-2.5 lg:px-5 lg:py-3 gap-3' : 'p-3 lg:p-6 gap-3 lg:gap-4'
                } ${stateClass}`}
              >
                <div className={`
                  ${compact ? 'size-6 lg:size-7' : 'size-6 lg:size-8'} rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${showCorrect ? 'border-[#10b981] bg-[#10b981]' : ''}
                  ${showIncorrect ? 'border-[#ef4444] bg-[#ef4444]' : ''}
                  ${!showAnswer ? 'border-muted-foreground' : ''}
                `}>
                  {showCorrect && <Check className="size-4 lg:size-5 text-white" strokeWidth={3} />}
                  {showIncorrect && <X className="size-4 lg:size-5 text-white" strokeWidth={3} />}
                  {!showAnswer && <span className="text-xs lg:text-sm text-muted-foreground">{String.fromCharCode(65 + index)}</span>}
                </div>
                <span className={`text-foreground ${compact ? 'text-sm lg:text-base leading-snug' : 'text-sm lg:text-lg'}`}>{option.text}</span>
              </button>
            );
          })}
        </div>

        {showAnswer && explanation && (
          <div className={`rounded-xl border-2 ${compact ? 'p-3 lg:p-4' : 'p-4 lg:p-6'} ${isCorrect ? 'ex-correct' : 'ex-wrong'}`}>
            <div className={`flex items-center gap-2 ${compact ? 'mb-1' : 'mb-2'}`}>
              {isCorrect
                ? <Check className="size-5 lg:size-6 text-[#10b981]" strokeWidth={3} />
                : <X    className="size-5 lg:size-6 text-[#ef4444]" strokeWidth={3} />
              }
              <span className={`font-bold ${isCorrect ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className={`text-foreground ${compact ? 'text-sm leading-snug' : 'text-sm lg:text-base'}`}>{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
