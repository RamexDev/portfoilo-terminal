import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/utils';

interface ScanlineOverlayProps {
  className?: string;
  /** Show the traveling highlight band. Default true. Disabled automatically under reduced motion. */
  traveling?: boolean;
  /** Show the static repeating scanlines. Default true. */
  static?: boolean;
  /** Show the CRT vignette. Default true. */
  vignette?: boolean;
}

/**
 * CRT overlay layers — fixed full-screen scanlines, traveling highlight band,
 * and vignette. Should be rendered once at the top of the layout (pointer-events-none).
 */
export function ScanlineOverlay({
  className,
  traveling = true,
  static: staticLines = true,
  vignette = true,
}: ScanlineOverlayProps) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Defer mounting of the traveling band by a tick to avoid SSR/CSR mismatch
  // (it depends on viewport height)
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 z-[1]', className)}
    >
      {staticLines && <div className="absolute inset-0 crt-scanlines opacity-60" />}
      {vignette && <div className="absolute inset-0 crt-vignette" />}
      {traveling && !reduced && mounted && (
        <div className="crt-scan-travel" style={{ top: 0 }} />
      )}
    </div>
  );
}
