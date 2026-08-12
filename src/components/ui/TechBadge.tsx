import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TechBadgeProps {
  children: ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent transition-colors hover:border-accent/50 hover:bg-accent/10',
        className,
      )}
    >
      {children}
    </span>
  );
}
