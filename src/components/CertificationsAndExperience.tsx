import { useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SvgIcon } from './ui/SvgIcon';
import { certificates } from '../data/certificates';
import { experiences } from '../data/experience';
import { education } from '../data/education';

type Tab = 'experience' | 'education' | 'certifications';

const TABS: { id: Tab; label: string; icon: 'briefcase' | 'graduationCap' | 'award' }[] = [
  { id: 'experience',     label: 'experience.log',     icon: 'briefcase'     },
  { id: 'education',      label: 'education.log',       icon: 'graduationCap' },
  { id: 'certifications', label: 'certs.log',  icon: 'award'         },
];

export function CertificationsAndExperience() {
  const [active, setActive] = useState<Tab>('experience');

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: Tab) => {
    const currentIndex = TABS.findIndex((tab) => tab.id === current);
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = TABS[nextIndex].id;
    setActive(nextTab);
    window.setTimeout(() => document.getElementById(`credentials-tab-${nextTab}`)?.focus(), 0);
  };

  return (
    <Section id="credentials" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 70%)' }} />

      <Container>
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="text-accent-dim">$</span> tail -f credentials/*
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            <span className="text-text-dim">## </span>Experience &amp; Education
          </h2>
        </Reveal>

        {/* Tab switcher — terminal tab bar */}
        <Reveal delay={0.05} className="mt-10">
          <div className="flex items-center gap-1 border border-border-subtle bg-bg-card/40 p-1 w-fit" role="tablist" aria-label="Credentials tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                role="tab"
                aria-selected={active === tab.id}
                aria-controls="credentials-panel"
                id={`credentials-tab-${tab.id}`}
                tabIndex={active === tab.id ? 0 : -1}
                className={`relative flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 ${
                  active === tab.id
                    ? 'text-bg-main'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-accent"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <SvgIcon name={tab.icon} size={12} />
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab panels — render only active panel for natural height */}
        <div
          id="credentials-panel"
          role="tabpanel"
          aria-labelledby={`credentials-tab-${active}`}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            {active === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative space-y-6">
                  <div className="timeline-line" />
                  {experiences.map((exp, i) => (
                    <Reveal key={`${exp.company}-${exp.startDate}`} delay={i * 0.08}>
                      <div className="group relative pl-10">
                        <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center border border-border-subtle bg-bg-main transition-all duration-300 group-hover:border-border-accent group-hover:shadow-glow-sm">
                          <SvgIcon name="briefcase" size={11} strokeWidth={1.5} className="text-text-muted group-hover:text-accent transition-colors" />
                        </div>
                        <div className="glass-card glass-card-hover spotlight-card p-5 transition-all duration-300">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h4 className="text-base font-bold text-text-primary">{exp.position}</h4>
                              <p className="text-sm font-semibold text-accent">@ {exp.company}</p>
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted border border-border-subtle px-2 py-1 shrink-0">
                              <SvgIcon name="calendar" size={10} />
                              {exp.startDate} — {exp.endDate}
                            </div>
                          </div>
                          <p className="mb-4 text-sm leading-relaxed text-text-muted">{exp.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="font-mono text-[10px] border border-border-subtle px-2 py-0.5 text-text-muted hover:border-border-accent hover:text-accent transition-colors">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}

            {active === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative space-y-6">
                  <div className="timeline-line" />
                  {education.map((edu, i) => (
                    <Reveal key={edu.institution} delay={i * 0.08}>
                      <div className="group relative pl-10">
                        <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center border border-border-subtle bg-bg-main transition-all duration-300 group-hover:border-border-accent group-hover:shadow-glow-sm">
                          <SvgIcon name="graduationCap" size={11} strokeWidth={1.5} className="text-text-muted group-hover:text-accent transition-colors" />
                        </div>
                        <div className="glass-card glass-card-hover spotlight-card p-5">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h4 className="text-base font-bold text-text-primary">{edu.degree}</h4>
                              <p className="text-sm font-semibold text-accent">@ {edu.institution}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted border border-border-subtle px-2 py-1">
                                <SvgIcon name="calendar" size={10} />
                                {edu.startDate} — {edu.endDate}
                              </div>
                              {edu.gpa && (
                                <span className="font-mono text-[10px] text-accent border border-accent/30 px-2 py-0.5">
                                  GPA {edu.gpa}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <SvgIcon name="mapPin" size={11} className="text-text-muted" />
                            <span className="font-mono text-[10px] text-text-muted">{edu.location}</span>
                          </div>
                          {edu.description && (
                            <p className="text-sm leading-relaxed text-text-muted">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}

            {active === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {certificates.map((cert, i) => (
                    <Reveal key={`${cert.title}-${cert.issuer}`} delay={i * 0.08}>
                      <div className="glass-card glass-card-hover spotlight-card group p-5 h-full flex flex-col">
                        <div className="mb-4 flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/5 text-accent group-hover:shadow-glow-sm transition-all">
                            <SvgIcon name="award" size={18} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-text-primary leading-snug">{cert.title}</h4>
                            <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                              {cert.issuer} · {cert.date}
                            </p>
                          </div>
                        </div>
                        {cert.description && (
                          <p className="flex-1 text-xs leading-relaxed text-text-muted mb-4">{cert.description}</p>
                        )}
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-text-muted transition-colors hover:text-accent"
                          >
                            <SvgIcon name="externalLink" size={10} />
                            <span className="text-accent-dim">./</span>view-cert
                          </a>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
