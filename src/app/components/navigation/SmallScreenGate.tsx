import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { MonitorSmartphone, RotateCw } from 'lucide-react';

const DISMISS_KEY = 'small-screen-gate-dismissed';

/**
 * The slide decks are designed for the `lg:` breakpoint (1024px) and up —
 * that's where the chapter sidebar appears and the two-column slide layouts
 * have room to breathe. Below that, content overflows and the experience
 * degrades badly.
 *
 * This component renders a full-screen blurred gate over the app whenever the
 * viewport is narrower than 1024px (iPad portrait, phones, small windows),
 * asking the user to switch to a larger screen or rotate to landscape.
 *
 * 1024px == iPad / tablet in landscape == small laptop, so the content is
 * still reachable on common classroom hardware.
 */

const MIN_WIDTH = 1024; // px — Tailwind `lg:` breakpoint

export function SmallScreenGate() {
  const { pathname } = useLocation();
  const [tooNarrow, setTooNarrow] = useState(false);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try { return sessionStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; }
  });
  const [width, setWidth] = useState<number>(() =>
    typeof window === 'undefined' ? MIN_WIDTH : window.innerWidth
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MIN_WIDTH - 1}px)`);
    const sync = () => {
      setTooNarrow(mql.matches);
      setWidth(window.innerWidth);
    };
    sync();
    mql.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mql.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch { /* ignore */ }
  };

  // The mock exam is a responsive page, not a slide deck, and its timer is
  // running — don't cover it.
  const isResponsivePage = /^\/[^/]+\/mockexam\/?$/.test(pathname);

  if (!tooNarrow || dismissed || isResponsivePage) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Screen too small"
    >
      <div className="max-w-sm w-full rounded-2xl border border-border bg-card shadow-2xl p-7 text-center">
        <div className="mx-auto mb-5 size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MonitorSmartphone className="size-8 text-primary" />
        </div>

        <h2 className="text-xl font-black text-foreground mb-2">
          Best on a bigger screen
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          The Blockchain Academy slides are built for{' '}
          <span className="font-semibold text-foreground">tablets in landscape, laptops and desktops</span>{' '}
          — screens at least{' '}
          <span className="font-semibold text-foreground">1024&nbsp;px</span> wide.
          On smaller screens the interactive decks don't lay out properly.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground mb-5">
          <RotateCw className="size-3.5" />
          On an iPad? Rotate to landscape.
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs">
          <span className="text-muted-foreground">Your screen</span>
          <span className="font-mono font-bold text-foreground">{width}px</span>
          <span className="text-muted-foreground">/ need ≥ {MIN_WIDTH}px</span>
        </div>

        <div className="mt-6 pt-5 border-t border-border">
          <button
            type="button"
            onClick={dismiss}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
          >
            Continue anyway
          </button>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Some layouts may look broken. We won't ask again this visit.
          </p>
        </div>
      </div>
    </div>
  );
}
