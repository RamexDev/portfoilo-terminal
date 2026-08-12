import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32 lg:py-40', className)}>
      {children}
    </section>
  );
}
