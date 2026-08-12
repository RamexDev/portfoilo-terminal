import { useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/navLinks';
import { socials } from '../data/socials';
import { contactInfo } from '../data/contactInfo';
import { useLockBody } from '../hooks/useLockBody';
import { setPendingScroll } from '../hooks/useScrollToPending';
import { SvgIcon } from './ui/SvgIcon';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (to: string) => void;
}

export function FullscreenMenu({ isOpen, onClose, navigate }: FullscreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useLockBody(isOpen);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const prev = document.activeElement as HTMLElement | null;
    const sel = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = menu.querySelectorAll<HTMLElement>(sel);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', handleKey);
    menu.querySelector<HTMLElement>(sel)?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      prev?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleNav = useCallback((id: string) => {
    onClose();
    const route = window.location.hash.replace(/^#/, '') || '/';
    if (id === 'hero' && (route === '/' || route === '')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === '/' || route === '') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingScroll(id);
      navigate('/');
    }
  }, [onClose, navigate]);

  const linkVar = {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const infoVar = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
          animate={{ clipPath: 'circle(170% at calc(100% - 48px) 32px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-bg-main"
        >
          {/* Backgrounds */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-100" />
          <div className="pointer-events-none absolute inset-0 crt-scanlines opacity-40" />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent)' }} />

          {/* Top bar — terminal chrome */}
          <div className="relative z-20 flex items-center justify-between border-b border-border-subtle px-5 py-4 md:px-10 lg:px-16">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-accent">root@ramex</span>
              <span className="text-text-dim">:</span>
              <span className="text-accent-dim">~</span>
              <span className="text-text-dim">$</span>
              <span className="text-text-muted">navigate</span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 border border-border-subtle px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-border-accent hover:text-accent"
              aria-label="Close Menu"
            >
              [ close ]
            </button>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-1 flex-col lg:flex-row min-h-0">
            {/* Left — contact info (desktop only) */}
            <motion.div
              variants={infoVar}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex w-80 flex-col justify-center pl-16 pr-8 border-r border-border-subtle"
            >
              <p className="mb-2 font-mono text-xs text-text-muted tracking-widest uppercase">
                <span className="text-accent-dim">$</span> cat contact.info
              </p>
              <p className="mb-6 text-4xl font-extrabold text-text-primary leading-tight">
                Let&apos;s<br />
                <span className="text-accent glitch-hover">connect</span>
              </p>
              <div className="space-y-2 mb-8">
                <p className="font-mono text-xs text-text-muted">{contactInfo.email}</p>
                <p className="font-mono text-xs text-text-muted">{contactInfo.phone}</p>
                <p className="font-mono text-xs text-text-muted">{contactInfo.address}</p>
              </div>

              {/* CV Builder CTA in menu */}
              <button
                onClick={() => { onClose(); navigate('/cv'); }}
                className="flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2.5 font-mono text-sm font-semibold text-accent transition-all hover:bg-accent/10 hover:border-accent/70 hover:shadow-glow-sm w-fit"
              >
                <SvgIcon name="cv" size={14} />
                <span className="text-accent-dim">./</span>resume
              </button>
            </motion.div>

            {/* Right — nav links, ls style */}
            <nav className="flex flex-1 items-center justify-center px-8 sm:px-16 lg:pl-20">
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    custom={i}
                    variants={linkVar}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="group"
                  >
                    <button
                      onClick={() => handleNav(link.href.replace('#', ''))}
                      className="flex items-center gap-4 py-1 text-left group"
                    >
                      <span className="font-mono text-[10px] text-text-muted group-hover:text-accent-dim transition-colors w-8 text-right shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-[clamp(2rem,7vw,4.5rem)] font-extrabold text-text-primary leading-none tracking-tight transition-all duration-300 group-hover:text-accent group-hover:translate-x-2 glitch-hover">
                        {link.label.toLowerCase()}
                      </span>
                    </button>
                  </motion.li>
                ))}
                {/* Mobile-only CV Builder */}
                <motion.li
                  custom={navLinks.length}
                  variants={linkVar}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="lg:hidden mt-4"
                >
                  <button
                    onClick={() => { onClose(); navigate('/cv'); }}
                    className="flex items-center gap-3 py-1 text-left group"
                  >
                    <span className="font-mono text-[10px] text-text-muted w-8 text-right shrink-0">→</span>
                    <span className="text-[clamp(1.5rem,5vw,3rem)] font-extrabold text-accent leading-none tracking-tight">
                      resume
                    </span>
                  </button>
                </motion.li>
              </ul>
            </nav>
          </div>

          {/* Footer socials */}
          <motion.div
            variants={infoVar}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex items-center justify-center gap-6 border-t border-border-subtle px-8 py-5"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                title={social.label}
                className="text-text-muted transition-all hover:text-accent hover:-translate-y-0.5"
              >
                <SvgIcon name={social.iconName} size={14} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
