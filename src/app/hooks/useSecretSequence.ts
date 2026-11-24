import { useEffect, useRef } from 'react';

/** Typing pauses longer than this start the sequence over. */
const IDLE_RESET_MS = 4000;

/**
 * Calls `onMatch` when the user types `sequence` (case-insensitive) anywhere on
 * the page. Keystrokes made while focus is in a form field are ignored, as are
 * shortcuts (Ctrl / Cmd / Alt combinations).
 */
export function useSecretSequence(sequence: string, onMatch: () => void) {
  const onMatchRef = useRef(onMatch);
  onMatchRef.current = onMatch;

  useEffect(() => {
    let buffer = '';
    let lastKeyAt = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) {
        buffer = '';
        return;
      }
      if (e.key.length !== 1) return; // Shift, arrows, Enter, …

      if (e.timeStamp - lastKeyAt > IDLE_RESET_MS) buffer = '';
      lastKeyAt = e.timeStamp;

      buffer = (buffer + e.key.toLowerCase()).slice(-sequence.length);
      if (buffer === sequence) {
        buffer = '';
        onMatchRef.current();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sequence]);
}
