import { useCallback, useRef, useState } from 'react';

/**
 * Command history hook for interactive terminal.
 *
 * - Stores every successfully submitted command (excluding blanks).
 * - Exposes `navigate(direction)` for ↑/↓ traversal.
 * - Resets the cursor to "after the last entry" when a new command is submitted
 *   so the next ↑ returns the most recent entry.
 * - Returns the current draft (whatever the user is editing at the cursor position).
 */
export function useCommandHistory(maxSize = 100) {
  const [history, setHistory] = useState<string[]>([]);
  const cursorRef = useRef<number>(-1); // -1 means "writing a new command"
  const [draft, setDraft] = useState<string>('');

  const push = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      // Skip exact consecutive duplicates
      if (prev[prev.length - 1] === trimmed) return prev;
      const next = [...prev, trimmed];
      return next.length > maxSize ? next.slice(next.length - maxSize) : next;
    });
    cursorRef.current = -1;
    setDraft('');
  }, [maxSize]);

  const navigate = useCallback(
    (direction: 'up' | 'down'): string => {
      if (history.length === 0) return draft;

      let next: number;
      if (direction === 'up') {
        // If we're at -1 (writing new), jump to last; otherwise step back
        next = cursorRef.current === -1 ? history.length - 1 : Math.max(0, cursorRef.current - 1);
      } else {
        // Going down from -1 does nothing
        if (cursorRef.current === -1) return draft;
        next = cursorRef.current + 1;
        if (next >= history.length) {
          cursorRef.current = -1;
          setDraft('');
          return '';
        }
      }

      cursorRef.current = next;
      const value = history[next];
      setDraft(value);
      return value;
    },
    [history, draft],
  );

  const reset = useCallback(() => {
    cursorRef.current = -1;
    setDraft('');
  }, []);

  return { history, push, navigate, reset, draft, setDraft };
}
