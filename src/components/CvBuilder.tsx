import { useState, useEffect } from 'react';
import { SvgIcon } from './ui/SvgIcon';
import { experiences }   from '../data/experience';
import { education }     from '../data/education';
import { certificates }  from '../data/certificates';
import { skillCategories } from '../data/skills';
import { contactInfo }   from '../data/contactInfo';
import { projects }      from '../data/projects';
import { socials }       from '../data/socials';

interface CvBuilderProps {
  navigate: (to: string) => void;
}

const DEFAULT_SUMMARY =
  'Fullstack Software Engineer with 2+ years of experience building performant, scalable web applications using React, Next.js, TypeScript, and Node.js. Proven ability to deliver quality products across the entire stack — from pixel-perfect UIs to RESTful APIs and database design. Experienced with remote collaboration, agile workflows, and shipping production features for international clients on Upwork.';

type Template = 'ats' | 'executive';

export function CvBuilder({ navigate }: CvBuilderProps) {
  const [summary] = useState(DEFAULT_SUMMARY);
  const [template, setTemplate] = useState<Template>('ats');

  useEffect(() => { document.title = 'CV — Ramadan Jamal'; }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const handleExport = () => {
    const filename = template === 'ats' ? 'Ramadan_Jamal_CV.pdf' : 'Ramadan_Jamal_CV_colored.pdf';
    const a = document.createElement('a');
    a.href = `/cv/${filename}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const accentColor = template === 'executive' ? '#0d4a3a' : '#1a1a1a';
  const accentLight = template === 'executive' ? '#0d5c4a' : '#1a1a1a';

  return (
    <div className="min-h-screen bg-bg-main flex flex-col no-print-wrapper">
      {/* ── Top bar — terminal chrome ────────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-border-subtle bg-bg-main/90 backdrop-blur-xl no-print" id="cv-controls">
        {/* Title-bar dots */}
        <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-surface/60 px-4 py-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-danger/70" />
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-warn/70" />
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent/70" />
          <div className="ml-3 font-mono text-[10px] text-text-muted">
            <span className="text-accent">root@ramex</span>
            <span className="text-text-dim">:</span>
            <span className="text-accent-dim">~/cv-builder</span>
            <span className="text-text-dim">$</span>{' '}
            <span className="text-text-secondary">render --template={template}</span>
          </div>
        </div>
        <div className="mx-auto flex h-12 items-center justify-between px-4 sm:px-8 max-w-screen-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 font-mono text-xs text-text-muted transition-colors hover:text-accent"
            >
              <SvgIcon name="arrowLeft" size={12} />
              <span className="text-accent-dim">cd</span> portfolio
            </button>
            <span className="h-4 w-px bg-border-subtle" />
            <span className="font-mono text-sm font-semibold text-text-primary">cv.md</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 border border-border-subtle p-0.5">
              <button
                onClick={() => setTemplate('ats')}
                aria-pressed={template === 'ats'}
                className={`px-3 py-1 font-mono text-[10px] font-semibold transition-all ${
                  template === 'ats'
                    ? 'bg-accent text-bg-main'
                    : 'text-text-muted hover:text-accent'
                }`}
              >
                minimal
              </button>
              <button
                onClick={() => setTemplate('executive')}
                aria-pressed={template === 'executive'}
                className={`px-3 py-1 font-mono text-[10px] font-semibold transition-all ${
                  template === 'executive'
                    ? 'bg-accent text-bg-main'
                    : 'text-text-muted hover:text-accent'
                }`}
              >
                colored
              </button>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-accent px-4 py-1.5 font-mono text-[11px] font-bold text-bg-main transition-all hover:shadow-glow-sm hover:scale-[1.02]"
            >
              <SvgIcon name="printer" size={12} />
              export.pdf
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile template toggle ──────────────────────────────────────── */}
      <div className="sm:hidden flex items-center justify-center gap-1 border-b border-border-subtle bg-bg-card/40 px-4 py-2 no-print">
        <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest mr-2">tpl:</span>
        <button
          onClick={() => setTemplate('ats')}
          aria-pressed={template === 'ats'}
          className={`px-3 py-1 font-mono text-[10px] font-semibold transition-all ${
            template === 'ats'
                    ? 'bg-accent text-bg-main'
                    : 'border border-border-subtle text-text-muted'
                }`}
              >
                minimal
              </button>
              <button
          onClick={() => setTemplate('executive')}
          aria-pressed={template === 'executive'}
                className={`px-3 py-1 font-mono text-[10px] font-semibold transition-all ${
                  template === 'executive'
                    ? 'bg-accent text-bg-main'
                    : 'border border-border-subtle text-text-muted'
          }`}
        >
          colored
        </button>
      </div>

      {/* ── Preview ──────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-bg-card/60 p-4 sm:p-8">
        {/* A4 sheet */}
        <div
          className="mx-auto max-w-[760px] bg-white shadow-[0_8px_64px_rgba(0,0,0,0.6)] print:shadow-none"
          style={{ minHeight: '1050px', fontFamily: template === 'ats' ? 'Arial, Helvetica, sans-serif' : 'Georgia, serif' }}
          id="cv-print-area"
        >
          {/* ── CV Header ── */}
          <div
            className="px-10 py-8 border-b-2"
            style={{ borderColor: accentColor }}
          >
            <h1 className="text-[26px] font-black text-gray-900 tracking-tight">
              Ramadan Jamal
            </h1>
            <p className="mt-1 text-[13px] font-semibold" style={{ color: accentLight }}>
              Fullstack Software Engineer
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
              <span>{contactInfo.email}</span>
              <span>{contactInfo.phone}</span>
              <span>{contactInfo.address}</span>
              {socials.find(s => s.name === 'GitHub') && (
                <span>github.com/RamexDev</span>
              )}
              {socials.find(s => s.name === 'LinkedIn') && (
                <span>linkedin.com/in/ramex7</span>
              )}
            </div>
          </div>

          <div className="px-10 py-6 space-y-6">
            {/* ── Summary ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Professional Summary
              </h2>
              <p className="text-[12px] leading-relaxed text-gray-700">{summary}</p>
            </section>

            {/* ── Experience ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={`${exp.company}-${exp.startDate}`} className="page-break-avoid">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[13px] font-bold text-gray-900">{exp.position}</p>
                        <p className="text-[12px] font-semibold" style={{ color: accentLight }}>{exp.company}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono shrink-0 mt-0.5">
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-gray-600">{exp.description}</p>
                    <p className="mt-1.5 text-[10.5px] text-gray-400">
                      <span className="font-semibold text-gray-500">Technologies:</span>{' '}
                      {exp.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Education ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.institution} className="page-break-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[13px] font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-[12px] font-semibold" style={{ color: accentLight }}>
                        {edu.institution}
                      </p>
                      <p className="text-[11px] text-gray-400">{edu.location}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-gray-400 font-mono">
                        {edu.startDate} – {edu.endDate}
                      </p>
                      {edu.gpa && (
                        <p className="text-[10px] font-bold mt-0.5" style={{ color: accentLight }}>
                          GPA: {edu.gpa} / 4.0
                        </p>
                      )}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-gray-500">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>

            {/* ── Skills ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Skills
              </h2>
              <div className="space-y-1.5">
                {skillCategories.map((cat) => (
                  <p key={cat.name} className="text-[11.5px] text-gray-600">
                    <span className="font-bold text-gray-800">{cat.name}:</span>{' '}
                    {cat.skills.join(', ')}
                  </p>
                ))}
              </div>
            </section>

            {/* ── Projects ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Selected Projects
              </h2>
              <div className="space-y-3">
                {featuredProjects.slice(0, 4).map((p) => (
                  <div key={p.slug} className="page-break-avoid">
                    <div className="flex items-center gap-2">
                      <p className="text-[12.5px] font-bold text-gray-900">{p.title}</p>
                      <span className="text-gray-300">·</span>
                      <span className="text-[10px] text-gray-400 font-mono">{p.year}</span>
                      {p.liveUrl && (
                        <span className="text-[10px]" style={{ color: accentLight }}>{p.liveUrl}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500 line-clamp-2">{p.description}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      <span className="font-semibold text-gray-500">Stack:</span>{' '}
                      {p.techStack.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Certifications ── */}
            <section className="page-break-avoid">
              <h2
                className="cv-section-title text-[11px] font-black tracking-widest uppercase pb-1 mb-3 border-b"
                style={{ color: accentLight, borderColor: accentLight + '40' }}
              >
                Certifications
              </h2>
              <ul className="space-y-1">
                {certificates.map((cert) => (
                  <li key={cert.title} className="text-[11.5px] text-gray-600">
                    <span className="font-bold text-gray-800">{cert.title}</span>
                    {' — '}{cert.issuer} ({cert.date})
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
