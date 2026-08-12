import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SvgIcon } from './ui/SvgIcon';
import { TechBadge } from './ui/TechBadge';
import { certificates } from '../data/certificates';
import { experiences } from '../data/experience';
import { education } from '../data/education';

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <Reveal>
          <p className="mb-2 text-sm font-medium text-accent">Experience</p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Where I&apos;ve worked
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24">
          {/* Work Experience */}
          <div>
            <Reveal>
              <h3 className="mb-8 text-sm font-semibold text-text-muted uppercase tracking-wider">
                Work
              </h3>
            </Reveal>
            <div className="relative space-y-8">
              <div className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-border" />
              {experiences.map((exp, i) => (
                <Reveal key={`${exp.company}-${exp.startDate}`} delay={i * 0.1}>
                  <div className="group relative pl-8">
                    <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-border bg-bg transition-colors duration-300 group-hover:border-accent" />
                    <div className="rounded-xl border border-border p-5 transition-all duration-300 group-hover:border-border-hover">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-text-muted">
                        <SvgIcon name="calendar" size={12} strokeWidth={1.5} />
                        <span>
                          {exp.startDate} &mdash; {exp.endDate}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-text-primary">{exp.position}</h4>
                      <p className="mb-3 text-sm font-medium text-accent">{exp.company}</p>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <TechBadge key={tech}>{tech}</TechBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Reveal>
              <h3 className="mb-8 text-sm font-semibold text-text-muted uppercase tracking-wider">
                Education
              </h3>
            </Reveal>
            <div className="relative space-y-8">
              {education.map((edu, i) => (
                <Reveal key={edu.institution} delay={i * 0.1}>
                  <div className="group relative pl-8">
                    <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-border bg-bg transition-colors duration-300 group-hover:border-accent" />
                    <div className="rounded-xl border border-border p-5 transition-all duration-300 group-hover:border-border-hover">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-text-muted">
                        <SvgIcon name="calendar" size={12} strokeWidth={1.5} />
                        <span>
                          {edu.startDate} &mdash; {edu.endDate}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-text-primary">{edu.degree}</h4>
                      <p className="mb-1 text-sm font-medium text-accent">{edu.institution}</p>
                      <p className="mb-3 text-xs text-text-muted">{edu.location} &middot; GPA: {edu.gpa}</p>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <Reveal>
              <h3 className="mb-8 text-sm font-semibold text-text-muted uppercase tracking-wider">
                Certifications
              </h3>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.map((cert, i) => (
                <Reveal key={`${cert.title}-${cert.issuer}`} delay={i * 0.1}>
                  <div className="group rounded-xl border border-border p-5 transition-all duration-300 hover:border-border-hover">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <SvgIcon name="certificate" size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-text-primary">{cert.title}</h4>
                        <p className="text-xs text-text-muted">
                          {cert.issuer} &middot; {cert.date}
                        </p>
                      </div>
                    </div>
                    {cert.description && (
                      <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                        {cert.description}
                      </p>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors duration-300 hover:text-accent-hover"
                      >
                        <SvgIcon name="externalLink" size={12} strokeWidth={1.5} />
                        View Certificate
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
