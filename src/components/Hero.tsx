import { motion } from 'framer-motion';
import { setPendingScroll } from '../hooks/useScrollToPending';
import { Container } from './ui/Container';
import { SvgIcon } from './ui/SvgIcon';
import { techStack } from '../data/techStack';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  navigate: (to: string) => void;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};


export function Hero({ navigate }: HeroProps) {
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
    <section
      id="hero"
      className="hero-stage relative flex min-h-[100dvh] items-center overflow-hidden pt-20"
    >
      {/* The grid and bloom deliberately sit behind the desk, rather than over the content. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-aurora hero-aurora-one" />
        <div className="hero-aurora hero-aurora-two" />
        <div className="hero-horizon" />
      </div>

      <motion.div
        className="relative z-10 w-full py-12 lg:py-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <Container className="flex flex-col items-center text-center">
          <motion.div variants={fadeIn} className="mb-3">
            <div className="inline-flex items-center gap-2 border border-accent/25 bg-accent/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                Available for new work
              </span>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="font-mono text-[11px] text-text-muted sm:text-xs">
            <span className="text-accent">$</span>{' '}
            <span className="text-text-primary font-medium">whoami</span>
            <span className="text-text-muted"> → Ramadan Jamal · Addis Ababa, ET</span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1] tracking-[-0.055em] text-text-primary sm:text-5xl md:text-6xl"
          >
            Full Stack <span className="text-accent">Software Engineer</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Designing fast, accessible web products and the dependable systems behind them.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-terminal-rig hero-terminal-rig-centered mt-8">
            <div className="hero-terminal-monitor">
              <div className="hero-terminal-glass">
                <InteractiveTerminal variant="panel" navigate={navigate} scrollTo={scrollTo} />
              </div>
            </div>
            <div className="hero-terminal-stand" aria-hidden="true" />
            <div className="hero-terminal-keyboard" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, index) => <span key={index} />)}
            </div>
            <p className="mt-5 text-center font-mono text-[9px] tracking-[0.16em] text-text-dim sm:text-[10px]">
              INTERACTIVE CONSOLE · TYPE <span className="text-accent">HELP</span> TO EXPLORE
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => scrollTo('works')}
              className="group inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-xs font-bold text-bg-main transition-all duration-300 hover:shadow-glow-md hover:scale-[1.03] active:scale-100"
            >
              <span className="text-bg-main/70 group-hover:text-bg-main/90">./</span>
              view-work
              <SvgIcon name="arrowRight" size={14} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => navigate('/cv')}
              className="inline-flex items-center gap-2 border border-border-subtle bg-bg-card/50 px-5 py-2.5 font-mono text-xs font-bold text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-border-accent hover:text-accent hover:shadow-glow-sm"
            >
              <SvgIcon name="cv" size={14} />
              resume.pdf
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-medium text-text-muted transition-colors hover:text-accent"
            >
              <span className="text-accent-dim">cat</span> contact.info →
            </button>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">Core stack</span>
            {techStack.slice(0, 5).map((tech) => (
              <div key={tech.name} title={tech.name} className="flex items-center gap-1.5 border border-border-subtle bg-bg-card/45 px-2 py-1 text-xs text-text-muted transition-all hover:border-border-accent hover:text-accent">
                <SvgIcon name={tech.iconName} size={11} />
                <span className="font-mono text-[9px]">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
