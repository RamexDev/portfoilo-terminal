import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface BootSequenceProps {
  /** Called when the boot sequence finishes (or is skipped). */
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: '[ OK ] Initializing ramex-portfolio v2.0.0...', delay: 0 },
  { text: '[ OK ] Mounting /src/data/*.ts .............. ok', delay: 200 },
  { text: '[ OK ] Loading 10 projects ................. ok', delay: 380 },
  { text: '[ OK ] Loading 10 case studies ............. ok', delay: 520 },
  { text: '[ OK ] Loading 5 experience entries ........ ok', delay: 660 },
  { text: '[ OK ] Loading 2 certificates .............. ok', delay: 780 },
  { text: '[ OK ] Loading 1 education record .......... ok', delay: 900 },
  { text: '[ OK ] Assembling spatial workstation ....... ok', delay: 1040 },
  { text: '[ OK ] Calibrating CRT phosphor ............ ok', delay: 1180 },
  { text: '[ OK ] Mounting interactive shell ........... ok', delay: 1320 },
  { text: '[ OK ] System ready. Welcome back, user.', delay: 1480 },
];

const STORAGE_KEY = 'ramex:boot-played';

export function BootSequence({ onComplete }: BootSequenceProps) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [skipped, setSkipped] = useState(false);

  // Determine whether to play this session
  useEffect(() => {
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      if (played === '1') {
        // Already played this session — skip straight through
        onComplete();
        return;
      }
    } catch {
      // sessionStorage may be blocked — fall through to playing
    }

    if (reduced) {
      // Reduced motion — skip the animation but mark as played
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
      onComplete();
      return;
    }

    setVisible(true);
  }, [reduced, onComplete]);

  // Reveal lines on schedule
  useEffect(() => {
    if (!visible) return;
    const timers: number[] = [];
    BOOT_LINES.forEach((line, i) => {
      const t = window.setTimeout(() => {
        setVisibleLines((n) => Math.max(n, i + 1));
      }, line.delay);
      timers.push(t);
    });
    // Auto-complete shortly after the last line
    const done = window.setTimeout(() => finish(), BOOT_LINES[BOOT_LINES.length - 1].delay + 700);
    timers.push(done);
    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const finish = useCallback(() => {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    setSkipped(true);
    // Allow the exit animation to play before notifying parent
    window.setTimeout(() => onComplete(), 350);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    finish();
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && !skipped && (
        <motion.div
          role="dialog"
          aria-label="System boot sequence"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex flex-col bg-bg-main"
        >
          {/* CRT layers */}
          <div className="pointer-events-none absolute inset-0 crt-scanlines opacity-50" />
          <div className="pointer-events-none absolute inset-0 crt-vignette" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-border-subtle px-5 py-3 md:px-10 lg:px-16">
            <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
              <span className="text-accent">root@ramex</span>
              <span className="text-text-dim">:</span>
              <span className="text-accent-dim">~</span>
              <span className="text-text-dim">$</span>
              <span className="text-text-secondary">boot --resume</span>
            </div>
            <button
              onClick={handleSkip}
              className="border border-border-subtle px-3 py-1 font-mono text-[10px] text-text-muted transition-colors hover:border-border-accent hover:text-accent"
              aria-label="Skip boot sequence"
            >
              [ skip ⏎ ]
            </button>
          </div>

          {/* Boot log */}
          <div className="relative z-10 flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-2xl font-mono text-xs leading-relaxed md:text-sm">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <span className="shrink-0 text-accent">{line.text.split(']')[0]}]</span>
                  <span className="text-text-secondary">{line.text.split(']').slice(1).join(']').trim()}</span>
                </motion.div>
              ))}
              {visibleLines >= BOOT_LINES.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 flex items-center gap-2"
                >
                  <span className="text-accent">root@ramex</span>
                  <span className="text-text-dim">:</span>
                  <span className="text-accent-dim">~</span>
                  <span className="text-text-dim">$</span>
                  <span className="block-cursor" aria-hidden="true" />
                </motion.div>
              )}

              {/* Progress bar */}
              <div className="mt-8 boot-bar" aria-hidden="true" />
              <p className="mt-2 font-mono text-[10px] text-text-dim">
                Loading modules · {Math.round((visibleLines / BOOT_LINES.length) * 100)}%
              </p>
            </div>
          </div>

          {/* Hint */}
          <div className="relative z-10 border-t border-border-subtle px-5 py-3 text-center font-mono text-[10px] text-text-dim md:px-10 lg:px-16">
            Press <span className="text-accent">[ skip ⏎ ]</span> or wait — boot plays once per session
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
