import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { skillCategories } from '../data/skills';

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Reveal>
          <p className="mb-2 text-sm font-medium text-accent">Skills</p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Technical abilities
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.1}>
              <div className="rounded-xl border border-border p-6 transition-colors duration-300 hover:border-border-hover">
                <h3 className="mb-4 text-sm font-semibold text-text-primary">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-bg-surface px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
