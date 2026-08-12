import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-mono font-semibold transition-all duration-300';

  const variantClasses: Record<string, string> = {
    primary: 'bg-accent text-bg-main hover:bg-accent-hover hover:shadow-glow-sm',
    secondary: 'border border-border-subtle text-text-muted hover:border-accent hover:text-accent',
    ghost: 'text-text-muted hover:text-accent',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
