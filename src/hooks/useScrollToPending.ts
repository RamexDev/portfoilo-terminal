import { useEffect } from 'react';

let pendingScrollTo: string | null = null;

export function setPendingScroll(sectionId: string | null): void {
  pendingScrollTo = sectionId;
}

export function getPendingScroll(): string | null {
  return pendingScrollTo;
}

export function useScrollToPending(): void {
  useEffect(() => {
    if (pendingScrollTo === null) return;

    const sectionId = pendingScrollTo;
    pendingScrollTo = null;

    const raf = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(raf);
  });
}
