import { useEffect, useState, useRef, createElement } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

interface TypewriterProps {
  /** The text to type out. Can contain multiple lines separated by \n. */
  text: string;
  /** Milliseconds per character. Default 42ms. */
  speed?: number;
  /** Delay before typing starts (ms). */
  startDelay?: number;
  /** Show a blinking block cursor while typing and after completion. */
  cursor?: boolean;
  /** Render as a heading element. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  /** Called when typing completes. */
  onDone?: () => void;
}

/**
 * Typewriter effect that respects prefers-reduced-motion (renders full text
 * immediately when reduced motion is requested).
 */
export function Typewriter({
  text,
  speed = 42,
  startDelay = 0,
  cursor = true,
  as = 'span',
  className,
  onDone,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState<string>(reduced ? text : '');
  const [done, setDone] = useState<boolean>(reduced);
  const indexRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      setDone(true);
      onDone?.();
      return;
    }

    setDisplay('');
    setDone(false);
    indexRef.current = 0;

    const startTimer = window.setTimeout(() => {
      const tick = () => {
        const i = indexRef.current;
        if (i >= text.length) {
          setDone(true);
          onDone?.();
          return;
        }
        // Type one char (handle multi-char clusters by stepping +1)
        indexRef.current = i + 1;
        setDisplay(text.slice(0, indexRef.current));
        timerRef.current = window.setTimeout(tick, speed);
      };
      tick();
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduced]);

  return createElement(
    as,
    { className: cn(className) },
    display,
    cursor && !done && <span className="block-cursor" aria-hidden="true" />,
    cursor && done && <span className="block-cursor" aria-hidden="true" />,
  );
}
