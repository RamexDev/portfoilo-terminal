import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { ProjectFilter } from './ProjectFilter';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';
import { filters } from '../data/filters';

interface WorksProps {
  navigate: (to: string) => void;
}

const PER_PAGE = 4;

function getStoredFilter(): string | null {
  try {
    return sessionStorage.getItem('worksFilter');
  } catch {
    return null;
  }
}

export function Works({ navigate }: WorksProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(
    getStoredFilter,
  );
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const featured = useMemo(() => projects.filter((p) => p.featured), []);

  useEffect(() => {
    try {
      if (activeFilter) sessionStorage.setItem('worksFilter', activeFilter);
      else sessionStorage.removeItem('worksFilter');
    } catch {
      // Storage can be disabled in privacy modes; filtering still works in memory.
    }
  }, [activeFilter]);

  const techFilter = filters.find((f) => f.id === 'tech')!;
  const options = useMemo(() => techFilter.getOptions(featured), [featured]);

  const filtered = useMemo(
    () => activeFilter ? featured.filter((p) => techFilter.match(p, activeFilter)) : featured,
    [activeFilter, featured],
  );

  // A saved filter may no longer exist after the project list changes.
  useEffect(() => {
    if (activeFilter && !options.includes(activeFilter)) setActiveFilter(null);
  }, [activeFilter, options]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => { setVisibleCount(PER_PAGE); }, [activeFilter]);

  return (
    <Section id="works" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px]"
        style={{ background: 'radial-gradient(ellipse at top right, color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, transparent 60%)' }} />

      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <Reveal>
            <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
              <span className="text-accent-dim">$</span> ls ./works
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              <span className="text-text-dim">## </span>Selected Work
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="shrink-0">
            <ProjectFilter
              options={options}
              active={activeFilter}
              onChange={setActiveFilter}
            />
          </Reveal>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex"
              >
                <ProjectCard project={project} navigate={navigate} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-20 text-center font-mono text-sm text-text-muted">
            <span className="text-danger">[!] </span>
            No projects match this filter.
          </p>
        )}

        {hasMore && (
          <div className="mt-14 flex justify-center">
            <motion.button
              onClick={() => setVisibleCount((c) => c + PER_PAGE)}
              whileHover={{ y: -1 }}
              className="border border-border-subtle px-8 py-3 font-mono text-xs text-text-muted transition-all hover:border-border-accent hover:text-accent hover:shadow-glow-sm"
            >
              <span className="text-accent-dim">$</span> load-more ↓
            </motion.button>
          </div>
        )}
      </Container>
    </Section>
  );
}
