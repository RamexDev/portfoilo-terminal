import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ProjectFilterProps {
  options: string[];
  active: string | null;
  onChange: (value: string | null) => void;
}

export function ProjectFilter({ options, active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter projects">
      <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest mr-1">
        filter:
      </span>
      <button
        onClick={() => onChange(null)}
        aria-pressed={active === null}
        aria-label="Show all projects"
        className={cn(
          'relative font-mono text-[10px] px-3 py-1.5 border transition-all duration-300',
          active === null
            ? 'border-accent/60 text-accent bg-accent/10 shadow-glow-sm'
            : 'border-border-subtle text-text-muted hover:border-border-accent hover:text-text-primary',
        )}
      >
        *
      </button>
      {options.map((option) => (
        <motion.button
          key={option}
          layout
          onClick={() => onChange(active === option ? null : option)}
          aria-pressed={active === option}
          className={cn(
            'relative font-mono text-[10px] px-3 py-1.5 border transition-all duration-300',
            active === option
              ? 'border-accent/60 text-accent bg-accent/10 shadow-glow-sm'
              : 'border-border-subtle text-text-muted hover:border-border-accent hover:text-text-primary',
          )}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}
