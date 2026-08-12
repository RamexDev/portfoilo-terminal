import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SvgIcon } from './ui/SvgIcon';
import { FullscreenMenu } from './FullscreenMenu';
import { setPendingScroll } from '../hooks/useScrollToPending';

interface HeaderProps {
  navigate: (to: string) => void;
}

const NAV_LINKS = [
  { label: 'works',       id: 'works' },
  { label: 'about',      id: 'about' },
  { label: 'creds', id: 'credentials' },
  { label: 'contact',    id: 'contact' },
];

export function Header({ navigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isCaseStudy, setIsCaseStudy] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const check = () => {
      const route = window.location.hash.replace(/^#/, '') || '/';
      setIsCaseStudy(route.startsWith('/case-study/'));
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const handleClose = useCallback(() => setIsMenuOpen(false), []);

  const scrollToSection = (id: string) => {
    const route = window.location.hash.replace(/^#/, '') || '/';
    if (route === '/' || route === '') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingScroll(id);
      navigate('/');
    }
  };

  const goHome = () => {
    if (window.location.hash.replace(/^#/, '') !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openTerminal = () => window.dispatchEvent(new Event('portfolio:open-terminal'));

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-main/85 backdrop-blur-xl border-b border-border-subtle shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-5 md:px-10 lg:px-16 max-w-7xl">
          {/* Logo / Back button */}
          {isCaseStudy ? (
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-accent"
            >
              <SvgIcon name="arrowLeft" size={14} />
              <span className="text-accent-dim">cd ..</span>
            </button>
          ) : (
            <button onClick={goHome} className="group flex items-center gap-2" aria-label="Go home">
              <span className="font-mono text-xs text-accent opacity-60 group-hover:opacity-100 transition-opacity">$</span>
              <span className="font-mono text-sm font-bold text-text-primary group-hover:text-accent transition-colors tracking-tight">
                ramex
              </span>
              <span className="inline-block w-[7px] h-[14px] bg-accent animate-blink opacity-90" aria-hidden="true" />
            </button>
          )}

          {/* Desktop nav — terminal command style */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:text-accent"
              >
                <span className="text-text-dim group-hover:text-accent-dim transition-colors">./</span>
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-4/5" />
              </button>
            ))}
            <div className="ml-2 h-4 w-px bg-border-subtle" />
            <button
              onClick={openTerminal}
              className="terminal-launch ml-2"
              aria-label="Open command terminal"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <span className="terminal-launch-prompt">&gt;_</span>
              <span>bash</span>
              <kbd>⌘K</kbd>
            </button>
            <button
              onClick={() => navigate('/cv')}
              className="ml-2 flex items-center gap-1.5 border border-accent/30 bg-accent/5 px-3 py-1.5 font-mono text-xs font-bold text-accent transition-all hover:bg-accent/15 hover:border-accent/70 hover:shadow-glow-sm"
            >
              <SvgIcon name="cv" size={12} />
              resume
            </button>
          </nav>

          {/* Mobile command dock */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={openTerminal}
              className="terminal-launch terminal-launch-mobile"
              aria-label="Open command terminal"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <span className="terminal-launch-prompt">&gt;_</span>
              <span>terminal</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-1.5 border border-border-subtle px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-border-accent hover:text-accent"
              aria-label="Open Menu"
            >
              [ menu ]
            </button>
          </div>
        </div>
      </motion.header>

      {/* Scroll to top FAB */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 flex h-9 w-9 items-center justify-center border border-border-subtle bg-bg-card/90 text-text-muted backdrop-blur-sm transition-all hover:border-border-accent hover:text-accent hover:shadow-glow-sm no-print"
            aria-label="Scroll to top"
          >
            <SvgIcon name="arrowUp" size={14} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <FullscreenMenu isOpen={isMenuOpen} onClose={handleClose} navigate={navigate} />
    </>
  );
}
