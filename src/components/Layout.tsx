import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScanlineOverlay } from './ui/ScanlineOverlay';
import { InteractiveTerminal } from './InteractiveTerminal';
import { setPendingScroll } from '../hooks/useScrollToPending';

interface LayoutProps {
  children: ReactNode;
  navigate: (to: string) => void;
}

export function Layout({ children, navigate }: LayoutProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
        spotlightRef.current.style.opacity = '1';
      }
    };
    const handleMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollTo = (id: string) => {
    const route = window.location.hash.replace(/^#/, '') || '/';
    if (route === '/' || route === '') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingScroll(id);
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col relative bg-bg-main">
      {/* Static CRT texture only — the moving scan band was visually distracting. */}
      <ScanlineOverlay traveling={false} />

      {/* Global mouse spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 60%)',
        }}
      />
      {/* Dot grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-grid opacity-100" />

      {/* Skip to main */}
      <button
        onClick={() => document.getElementById('main-content')?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:border focus:border-accent focus:bg-bg-main focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent"
      >
        Skip to main content
      </button>

      <Header navigate={navigate} />

      <main id="main-content" tabIndex={-1} className="relative z-[2] flex-1 outline-none">
        {children}
      </main>

      <Footer />

      {/* Floating interactive terminal — appears on every page (except CV) */}
      <InteractiveTerminal variant="floating" navigate={navigate} scrollTo={scrollTo} />
    </div>
  );
}
