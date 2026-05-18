import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { useT } from '../../i18n';

const STORAGE_KEY = 'slide-nav-tip-seen';
const AUTO_FADE_MS = 10_000;

/**
 * Floating bottom-center hint telling first-time users that the arrow keys
 * advance / rewind the slide. Renders only when a `#section-scroll` container
 * is in the DOM and the tip hasn't been dismissed before (localStorage).
 *
 * Dismisses on: first ArrowUp / ArrowDown press, first scroll on the snap
 * container, click on the pill, or auto-fade after AUTO_FADE_MS.
 */
export function SlideNavTip() {
  const location = useLocation();
  const t = useT();
  const [visible, setVisible] = useState(false);

  // Decide whether to show on the current route.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY) === '1') return;

    // Wait a tick so route children mount + the section-scroll element exists.
    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      const hasScroll = !!document.getElementById('section-scroll');
      setVisible(hasScroll);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      setVisible(false);
    };
  }, [location.pathname]);

  // Dismissal triggers.
  useEffect(() => {
    if (!visible) return;

    const dismiss = () => {
      setVisible(false);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore quota / privacy mode */ }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') dismiss();
    };

    const scrollEl = document.getElementById('section-scroll');
    const onScroll = () => dismiss();

    const autoFade = window.setTimeout(dismiss, AUTO_FADE_MS);

    window.addEventListener('keydown', onKey);
    scrollEl?.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      scrollEl?.removeEventListener('scroll', onScroll);
      window.clearTimeout(autoFade);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
        }}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-full border bg-card/95 backdrop-blur shadow-lg shadow-black/10 hover:shadow-xl transition-shadow"
        style={{ borderColor: 'rgba(99,102,241,0.5)' }}
        aria-label={t('slideNavTip.dismiss')}
      >
        <div className="flex flex-col gap-0.5">
          <span className="size-5 rounded-md border border-border bg-muted flex items-center justify-center">
            <ChevronUp className="size-3 text-foreground" />
          </span>
          <span className="size-5 rounded-md border border-border bg-muted flex items-center justify-center">
            <ChevronDown className="size-3 text-foreground" />
          </span>
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-foreground leading-tight">{t('slideNavTip.title')}</div>
          <div className="text-[10px] text-muted-foreground leading-tight">{t('slideNavTip.subtitle')}</div>
        </div>
        <X className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
    </div>
  );
}
