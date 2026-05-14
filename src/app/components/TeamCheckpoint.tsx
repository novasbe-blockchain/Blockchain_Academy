import type { ReactNode } from 'react';

export interface CheckpointSection {
  /** small uppercase label */
  label: string;
  /** bulleted items or arbitrary content */
  items: ReactNode[];
  /** optional accent for the column ribbon (defaults to the slide accent) */
  color?: string;
}

interface TeamCheckpointProps {
  /** course/day context, e.g. "Day 1 wrap · Blockchain Fundamentals" */
  contextLabel: string;
  /** main title */
  title: string;
  /** one-line description shown under the title */
  subtitle: string;
  /** suggested duration pill, e.g. "10–15 min" */
  duration?: string;
  /** main panes: typically "what you have so far", "what to do now", "bring to next session" */
  sections: CheckpointSection[];
  /** optional banner at the bottom — e.g. forward reference to the next day */
  footnote?: ReactNode;
}

export function TeamCheckpoint({
  contextLabel,
  title,
  subtitle,
  duration,
  sections,
  footnote,
}: TeamCheckpointProps) {
  const COLOR = '#6366f1';

  return (
    <div className="h-full flex flex-col p-6 lg:p-10 relative overflow-hidden">
      {/* Subtle gradient bg so this slide reads as "different" at a glance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${COLOR}18, transparent 60%), radial-gradient(circle at 80% 100%, #8b5cf618, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="shrink-0 relative z-10 mb-4 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          {/* Ribbon */}
          <div
            className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-md shrink-0"
            style={{ background: `linear-gradient(135deg, ${COLOR}, #8b5cf6)` }}
          >
            🤝 Team Checkpoint
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {contextLabel}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-0.5">{title}</h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-3xl">{subtitle}</p>
          </div>
        </div>
        {duration && (
          <div
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-2 self-center"
            style={{ borderColor: COLOR + '50', color: COLOR, backgroundColor: COLOR + '10' }}
          >
            ⏱ {duration}
          </div>
        )}
      </div>

      {/* Panes */}
      <div
        className="flex-1 min-h-0 relative z-10 grid gap-4 content-center"
        style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
      >
        {sections.map((s, i) => {
          const color = s.color ?? COLOR;
          return (
            <div
              key={i}
              className="p-5 bg-card border-2 rounded-2xl flex flex-col gap-3"
              style={{ borderColor: color + '50' }}
            >
              <div
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color }}
              >
                {s.label}
              </div>
              <ul className="space-y-2 text-sm text-foreground/90">
                {s.items.map((item, j) => (
                  <li key={j} className="flex gap-2 leading-snug">
                    <span style={{ color }} className="shrink-0 mt-0.5 font-bold">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {footnote && (
        <div
          className="shrink-0 relative z-10 mt-4 p-3 rounded-xl border-2 text-sm"
          style={{ borderColor: COLOR + '40', backgroundColor: COLOR + '10' }}
        >
          {footnote}
        </div>
      )}
    </div>
  );
}
