import { useState, useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useT } from '../../i18n';

const STORAGE_KEY = 'section-nav-collapsed';

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

/**
 * Sidebar navigation for a section's chapter list. Below the `lg:` breakpoint
 * (1024px) the sidebar is hidden entirely — slides take the full width on
 * tablets and phones. On `lg:` and above, the user can collapse it to a thin
 * strip via the toggle button at the top. Choice persists in localStorage.
 */
export function SectionNav({ chapters, accentColor = '#ED1C24' }: SectionNavProps) {
  const t = useT();
  const buttons = chapters.filter(c => c.kind !== 'group');
  const [activeId, setActiveId] = useState<string>(buttons[0]?.id ?? '');
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === '1';
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0'); } catch { /* ignore */ }
  }, [collapsed]);

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
    <aside
      className={`shrink-0 h-full hidden lg:flex flex-col border-r border-border transition-[width] duration-200 ease-out ${
        collapsed ? 'w-9' : 'w-44'
      }`}
    >
      {/* Toggle */}
      <div className={`shrink-0 flex ${collapsed ? 'justify-center' : 'justify-end'} px-1 pt-2 pb-1`}>
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? t('sectionNav.expand') : t('sectionNav.collapse')}
          title={collapsed ? t('sectionNav.expand') : t('sectionNav.collapse')}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          {collapsed
            ? <PanelLeftOpen className="size-4" />
            : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      {/* Chapter list */}
      {!collapsed && (
        <nav className="flex-1 min-h-0 flex flex-col pl-2 pr-1 pb-2 overflow-y-auto gap-0.5">
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
      )}

      {/* Collapsed state — current-chapter indicator dot */}
      {collapsed && buttons.length > 0 && (
        <div
          className="shrink-0 mx-auto mt-1 size-2 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden
        />
      )}
    </aside>
  );
}
