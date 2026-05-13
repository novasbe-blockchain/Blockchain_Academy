import { useState, useEffect } from 'react';

export interface SubChapter {
  id: string;
  label: string;
  /** "group" renders as a small section heading, not a clickable button. Other items default to clickable. */
  kind?: 'group';
}

interface SectionNavProps {
  chapters: SubChapter[];
  /** Optional course-accent for the active chapter highlight. Defaults to BF red. */
  accentColor?: string;
}

export function SectionNav({ chapters, accentColor = '#ED1C24' }: SectionNavProps) {
  const buttons = chapters.filter(c => c.kind !== 'group');
  const [activeId, setActiveId] = useState<string>(buttons[0]?.id ?? '');

  useEffect(() => {
    const container = document.getElementById('section-scroll');
    if (!container) return;

    const handleScroll = () => {
      const threshold = container.clientHeight / 3;
      let current = buttons[0]?.id ?? '';
      for (const ch of buttons) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
          if (top <= threshold) current = ch.id;
        }
      }
      setActiveId(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="h-full flex flex-col py-2 pl-2 pr-1 overflow-y-auto gap-0.5">
      {chapters.map((ch, i) => {
        if (ch.kind === 'group') {
          return (
            <div
              key={`group-${i}-${ch.label}`}
              className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70"
            >
              {ch.label}
            </div>
          );
        }
        const active = activeId === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            className="min-w-0 text-left text-xs leading-snug px-3 py-1 rounded-md transition-all cursor-pointer flex items-center"
            style={
              active
                ? { backgroundColor: accentColor + '26', color: accentColor, fontWeight: 700 }
                : undefined
            }
          >
            <span
              className={`truncate block w-full ${active ? '' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {ch.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
