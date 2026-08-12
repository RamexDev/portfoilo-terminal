import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div id={id} className={cn('mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16', className)}>
      {children}
    </div>
  );
}
