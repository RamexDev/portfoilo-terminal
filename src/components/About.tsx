import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { TerminalWindow } from './ui/TerminalWindow';
import { skillCategories } from '../data/skills';

const HIGHLIGHTS = [
  { number: '2+',  label: 'Years Experience', desc: 'Professional dev since 2024' },
  { number: '10+', label: 'Projects Completed',  desc: 'Across frontend & backend' },
  { number: '12+', label: 'Technologies',       desc: 'Full-stack proficiency' },
];

export function About() {
  return (
    <Section id="about" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-60 top-1/4 h-96 w-96 rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 70%)' }} />

      <Container>
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="text-accent-dim">$</span> cat about.md
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            <span className="text-text-dim">## </span>The person behind the code
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Bio — terminal panel */}
          <Reveal>
            <TerminalWindow title="about.md" status="read" className="h-full">
              <div className="p-5 space-y-4 font-mono text-sm leading-relaxed">
                <p className="text-text-muted">
                  <span className="text-accent-dim"># </span>Bio
                </p>
                <p className="text-text-secondary leading-relaxed">
                  I am a software engineer passionate about building products that make a{' '}
                  <span className="text-accent font-semibold">real impact</span>. I specialize in
                  React, TypeScript, and Node.js with solid experience across the entire web stack.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  My approach combines{' '}
                  <span className="text-accent font-semibold">clean architecture</span> with
                  thoughtful user experience. I am always looking to learn and I am currently
                  exploring machine learning and LLMs to expand my toolset.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Based in Addis Ababa, Ethiopia — working remotely with teams and clients worldwide
                  through <span className="text-accent font-semibold">Upwork</span>.
                </p>
                <p className="text-text-dim pt-2">
                  <span className="text-accent-dim">$</span> _<span className="block-cursor" aria-hidden="true" />
                </p>
              </div>
            </TerminalWindow>
          </Reveal>

          {/* Stats grid */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="glass-card glass-card-hover spotlight-card group p-5"
                >
                  <div className="text-3xl font-extrabold text-accent md:text-4xl">{h.number}</div>
                  <div className="mt-1 text-sm font-bold text-text-primary">{h.label}</div>
                  <div className="mt-1 font-mono text-[10px] text-text-muted">
                    <span className="text-accent-dim">// </span>{h.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Skills grid — `ls` style output */}
        <Reveal delay={0.1} className="mt-20">
          <p className="mb-6 font-mono text-xs tracking-widest text-text-muted uppercase">
            <span className="text-accent">$</span> ls -la ./skills/
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08, duration: 0.45 }}
                className="glass-card glass-card-hover p-4"
              >
                <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
                  <span className="text-accent-dim">drwx </span>
                  {cat.name}/
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-block border border-border-subtle bg-bg-card/60 px-3 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
