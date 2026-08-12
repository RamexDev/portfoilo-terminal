import { useEffect } from 'react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { TechBadge } from './ui/TechBadge';
import { TerminalWindow } from './ui/TerminalWindow';
import { caseStudies } from '../data/caseStudies';
import { projects } from '../data/projects';

interface CaseStudyPageProps {
  navigate: (to: string) => void;
}

export function CaseStudyPage({ navigate }: CaseStudyPageProps) {
  const route = window.location.hash.replace(/^#/, '') || '/';
  const slug = route.replace('/case-study/', '');
  const study = caseStudies.find((cs) => cs.slug === slug);
  const project = slug ? projects.find((p) => p.slug === slug) : null;

  useEffect(() => {
    document.title = study ? `${study.title} — Portfolio` : 'Case Study Not Found — Portfolio';
  }, [study]);

  if (!study) {
    return (
      <Container className="flex min-h-[100dvh] items-center justify-center">
        <div className="text-center">
          <p className="mb-2 font-mono text-sm text-text-muted">
            <span className="text-danger">[X] </span>
            Error 404
          </p>
          <h1 className="text-6xl font-black tracking-tight text-text-primary md:text-8xl glitch-hover">
            Case Study Not Found
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-text-muted">
            The case study <span className="text-accent">`{slug}`</span> doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 border border-accent px-6 py-3 font-mono text-sm font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-bg-main"
            >
              <span className="text-accent-dim">cd</span> ~/
            </button>
          </div>
        </div>
      </Container>
    );
  }

  const galleryImages = project?.galleryImages ?? [];
  const prevStudy = study.previousProject
    ? caseStudies.find((cs) => cs.slug === study.previousProject)
    : null;
  const nextStudy = study.nextProject
    ? caseStudies.find((cs) => cs.slug === study.nextProject)
    : null;

  return (
    <article>
      <section
        className={`relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br ${study.gradient}`}
      >
        {study.thumbnail && (
          <img
            src={study.thumbnail}
            alt={`${study.title} hero image`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-bg-main/70" />
        <div className="absolute inset-0 crt-scanlines opacity-40" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl border border-border-accent bg-bg-main/95 backdrop-blur-sm px-8 py-10 text-center sm:px-12 sm:py-12 shadow-glow-md">
            <p className="mb-3 font-mono text-xs text-accent">
              <span className="text-accent-dim">$</span> open ./case-studies/{study.slug}.md
            </p>
            <h1 className="text-3xl font-black tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl glitch-hover">
              {study.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-text-muted">
              <span className="font-mono text-sm">{study.timeline}</span>
            </div>
          </div>
        </Container>
      </section>
      <Section>
        <Container className="max-w-4xl">
          <div className="space-y-24">
            <Reveal>
              <TerminalWindow title={study.slug} status="read">
                <div className="p-6 md:p-8">
                  <p className="mb-3 font-mono text-sm font-medium text-accent">
                    <span className="text-accent-dim"># </span>Overview
                  </p>
                  <p className="text-lg leading-relaxed text-text-primary md:text-xl">
                    {study.overview}
                  </p>
                </div>
              </TerminalWindow>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="mb-3 font-mono text-sm font-medium text-accent">
                  <span className="text-accent-dim">$</span> The Challenge
                </p>
                <p className="text-lg leading-relaxed text-text-muted md:text-xl">
                  {study.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <p className="mb-3 font-mono text-sm font-medium text-accent">
                  <span className="text-accent-dim">$</span> The Process
                </p>
                <p className="text-lg leading-relaxed text-text-muted md:text-xl">
                  {study.process}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="mb-3 font-mono text-sm font-medium text-accent">
                  <span className="text-accent-dim">$</span> The Solution
                </p>
                <p className="text-lg leading-relaxed text-text-muted md:text-xl">
                  {study.solution}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div>
                <p className="mb-3 font-mono text-sm font-medium text-accent">
                  <span className="text-accent-dim">$</span> Results
                </p>
                <p className="text-lg leading-relaxed text-text-muted md:text-xl">
                  {study.outcome}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div>
                <p className="mb-4 font-mono text-sm font-medium text-accent">
                  <span className="text-accent-dim">$</span> Technologies Used
                </p>
                <div className="flex flex-wrap gap-3">
                  {study.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            </Reveal>
            {galleryImages.length > 0 && (
              <Reveal delay={0.35}>
                <div>
                  <p className="mb-6 font-mono text-sm font-medium text-accent">
                    <span className="text-accent-dim">$</span> Gallery
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {galleryImages.map((src, i) => (
                      <div
                        key={src}
                        className={`overflow-hidden bg-gradient-to-br ${study.gradient} border border-border-subtle`}
                      >
                        <img
                          src={src}
                          alt={`${study.title} screenshot ${i + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
            {(project?.liveUrl || project?.githubUrl) && (
              <Reveal delay={0.4}>
                <div>
                  <p className="mb-6 font-mono text-sm font-medium text-accent">
                    <span className="text-accent-dim">$</span> Links
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-accent/50 px-5 py-3 font-mono text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        live-demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-text-muted/30 px-5 py-3 font-mono text-sm font-medium text-text-primary transition-colors hover:border-text-muted/60"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        source-code
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>
      {(prevStudy || nextStudy) && (
        <section className="border-t border-border-subtle">
          <Container>
            <div className="flex items-stretch py-12 md:py-16">
              {prevStudy ? (
                <button
                  onClick={() => navigate(`/case-study/${prevStudy.slug}`)}
                  className="group flex w-1/2 items-center gap-3 pr-4 text-left transition-colors duration-300 hover:text-accent"
                >
                  <span className="text-text-muted group-hover:text-accent">←</span>
                  <div>
                    <p className="mb-1 font-mono text-xs text-text-muted">
                      <span className="text-accent-dim">$</span> cd ../{prevStudy.slug}
                    </p>
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-accent">
                      {prevStudy.title}
                    </h3>
                  </div>
                </button>
              ) : (
                <div className="w-1/2" />
              )}
              {nextStudy ? (
                <button
                  onClick={() => navigate(`/case-study/${nextStudy.slug}`)}
                  className="group flex w-1/2 items-center justify-end gap-3 pl-4 text-right transition-colors duration-300 hover:text-accent"
                >
                  <div>
                    <p className="mb-1 font-mono text-xs text-text-muted">
                      cd ../{nextStudy.slug} <span className="text-accent-dim">$</span>
                    </p>
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-accent">
                      {nextStudy.title}
                    </h3>
                  </div>
                  <span className="text-text-muted group-hover:text-accent">→</span>
                </button>
              ) : (
                <div className="w-1/2" />
              )}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
