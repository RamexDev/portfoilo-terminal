import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { TerminalWindow } from '../ui/TerminalWindow';

// Lazy-load the 3D scene so three.js isn't in the initial bundle
const Terminal3D = lazy(() =>
  import('./Terminal3D').then((m) => ({ default: m.Terminal3D })),
);

interface Terminal3DLazyProps {
  className?: string;
}

/** Static CSS-only terminal mock used as the reduced-motion / low-power fallback. */
function StaticTerminal({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <TerminalWindow title="bash" status="static" className="mx-auto max-w-md opacity-80">
        <div className="p-4 font-mono text-[10px] leading-relaxed text-accent">
          <div><span className="text-text-dim">$</span> whoami</div>
          <div className="text-text-secondary pl-3">ramex</div>
          <div className="mt-2"><span className="text-text-dim">$</span> cat role.txt</div>
          <div className="text-text-secondary pl-3">Fullstack Software Engineer</div>
          <div className="mt-2"><span className="text-text-dim">$</span> ls skills/</div>
          <div className="text-text-secondary pl-3">react/ nextjs/ nodejs/ django/</div>
          <div className="mt-2"><span className="text-text-dim">$</span> _<span className="block-cursor" /></div>
        </div>
      </TerminalWindow>
    </div>
  );
}

/**
 * Lazy wrapper around the 3D terminal scene.
 *
 * - Defers loading of three.js until the canvas enters the viewport.
 * - Falls back to a static CSS terminal under prefers-reduced-motion or when
 *   the device is detected as low-power (few cores / small screen).
 * - The canvas itself is `pointer-events-none`; parallax is driven by window
 *   pointer events so the page remains fully interactive.
 */
export function Terminal3DLazy({ className }: Terminal3DLazyProps) {
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect low-power devices: small screens or limited cores
  const isLowPower =
    typeof navigator !== 'undefined' &&
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency <= 4;

  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (reduced || isLowPower || isSmallScreen) return; // skip observation entirely
    if (!containerRef.current || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '200px' },
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [reduced, isLowPower, isSmallScreen]);

  // Render the static fallback under reduced motion or low-power
  if (reduced || isLowPower || isSmallScreen) {
    return <StaticTerminal className={className} />;
  }

  return (
    <div ref={containerRef} className={className}>
      {inView ? (
        <Suspense fallback={<StaticTerminal className={className} />}>
          <Terminal3D className="h-full w-full" />
        </Suspense>
      ) : (
        <StaticTerminal className={className} />
      )}
    </div>
  );
}
