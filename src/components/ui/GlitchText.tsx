import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlitchTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** When `true`, the glitch effect is always on. When `false` (default), it only triggers on hover. */
  always?: boolean;
}

/**
 * Text with an RGB-split glitch effect. By default the effect only fires on
 * hover; pass `always` to keep it active continuously (use sparingly —
 * prefer the cursor-following parallax for ambient motion).
 *
 * Uses pseudo-elements via Tailwind `before:` and `after:` content copies.
 */
export function GlitchText({
  children,
  as: Tag = 'span',
  className,
  always = false,
}: GlitchTextProps) {
  const base = 'relative inline-block';
  const hoverClass = always
    ? 'glitch-always'
    : 'glitch-hover';

  return (
    <Tag
      data-text={typeof children === 'string' ? children : undefined}
      className={cn(base, hoverClass, className)}
    >
      {children}
    </Tag>
  );
}
