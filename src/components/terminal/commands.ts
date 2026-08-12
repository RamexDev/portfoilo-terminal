import { projects } from '../../data/projects';
import { caseStudies } from '../../data/caseStudies';
import { skillCategories } from '../../data/skills';
import { techStack } from '../../data/techStack';
import { experiences } from '../../data/experience';
import { certificates } from '../../data/certificates';
import { education } from '../../data/education';
import { contactInfo } from '../../data/contactInfo';
import { socials } from '../../data/socials';

/**
 * Terminal command registry.
 *
 * Every command returns an array of output lines. Each line is either a string
 * or a structured object describing rich content. The InteractiveTerminal
 * component renders these into the terminal output area.
 *
 * All data is sourced from src/data/*.ts — the same files used by the rest of
 * the site. Single source of truth.
 */

export type TerminalLineKind =
  | 'text'
  | 'prompt'
  | 'success'
  | 'warn'
  | 'danger'
  | 'muted'
  | 'accent'
  | 'heading'
  | 'ascii'
  | 'commandList'
  | 'table'
  | 'list'
  | 'link'
  | 'divider';

export interface TerminalLine {
  kind: TerminalLineKind;
  text?: string;
  items?: string[];
  commands?: Array<{ name: string; aliases?: string[]; description: string }>;
  headers?: string[];
  rows?: string[][];
  href?: string;
  label?: string;
}

export interface CommandContext {
  /** Navigate the hash router to the given path (e.g. '/', '/cv', '/case-study/slug'). */
  navigate: (to: string) => void;
  /** Scroll to a section id within the home page. */
  scrollTo: (id: string) => void;
}

export interface CommandDef {
  name: string;
  description: string;
  /** Optional aliases / short forms. */
  aliases?: string[];
  usage?: string;
  run: (args: string[], ctx: CommandContext) => TerminalLine[] | { lines: TerminalLine[]; action?: () => void };
}

/* ------------------------------------------------------------
   Helpers
   ------------------------------------------------------------ */

const divider = (): TerminalLine => ({ kind: 'divider' });

export const RAMEX_ASCII = String.raw`██████╗  █████╗ ███╗   ███╗███████╗██╗  ██╗
██╔══██╗██╔══██╗████╗ ████║██╔════╝╚██╗██╔╝
██████╔╝███████║██╔████╔██║█████╗   ╚███╔╝ 
██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝   ██╔██╗ 
██║  ██║██║  ██║██║ ╚═╝ ██║███████╗██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝`;

const helpHeader: TerminalLine = {
  kind: 'heading',
  text: 'Available commands',
};

/* ------------------------------------------------------------
   Command implementations
   ------------------------------------------------------------ */

const helpCommand: CommandDef = {
  name: 'help',
  description: 'List available commands',
  aliases: ['?'],
  usage: 'help [command]',
  run: (args) => {
    if (args[0]) {
      const target = commands.find((c) => c.name === args[0] || c.aliases?.includes(args[0]));
      if (!target) {
        return [{ kind: 'danger', text: `help: no such command: ${args[0]}` }];
      }
      return [
        { kind: 'heading', text: target.name },
        { kind: 'muted', text: target.description },
        ...(target.usage ? [{ kind: 'accent', text: `usage: ${target.usage}` } as TerminalLine] : []),
        ...(target.aliases?.length ? [{ kind: 'muted', text: `aliases: ${target.aliases.join(', ')}` } as TerminalLine] : []),
      ];
    }
    const lines: TerminalLine[] = [
      helpHeader,
      { kind: 'muted', text: `${commands.length} commands installed · aliases shown in dim text` },
      divider(),
      {
        kind: 'commandList',
        commands: commands.map(({ name, aliases, description }) => ({ name, aliases, description })),
      },
      divider(),
    ];
    lines.push({ kind: 'muted', text: 'Tip: press Tab to complete a command, ↑/↓ for history.' });
    return lines;
  },
};

const aboutCommand: CommandDef = {
  name: 'about',
  description: 'Show information about Ramadan Jamal',
  aliases: ['whoami'],
  run: () => [
    { kind: 'heading', text: 'Ramadan Jamal — Fullstack Software Engineer' },
    { kind: 'muted', text: 'Addis Ababa, Ethiopia · Available for freelance & full-time' },
    divider(),
    { kind: 'text', text: 'Software engineer building performant, accessible, and beautiful web applications.' },
    { kind: 'text', text: 'Specialises in React, TypeScript, and Node.js with solid experience across the entire web stack.' },
    divider(),
    { kind: 'accent', text: 'Stats' },
    { kind: 'list', items: ['2+ years of professional experience', '10+ projects shipped', '12+ technologies in active use'] },
    { kind: 'muted', text: 'Tip: run `skills`, `experience`, or `projects` for more.' },
  ],
};

const projectsCommand: CommandDef = {
  name: 'projects',
  description: 'List projects (use --featured or pass a slug)',
  aliases: ['ls', 'work'],
  usage: 'projects [slug] | projects --featured',
  run: (args, _ctx) => {
    if (args[0] && args[0] !== '--featured') {
      const slug = args[0];
      const p = projects.find((x) => x.slug === slug);
      if (!p) return [{ kind: 'danger', text: `projects: not found: ${slug}` }];
      return [
        { kind: 'heading', text: p.title },
        { kind: 'muted', text: `${p.role} · ${p.year}` },
        divider(),
        { kind: 'text', text: p.description },
        divider(),
        { kind: 'accent', text: 'Stack' },
        { kind: 'list', items: p.techStack },
        ...(p.liveUrl ? [{ kind: 'link', href: p.liveUrl, label: 'Live site' } as TerminalLine] : []),
        ...(p.githubUrl ? [{ kind: 'link', href: p.githubUrl, label: 'Source code' } as TerminalLine] : []),
        { kind: 'muted', text: `Open the case study: run \`open ${p.slug}\`` },
      ];
    }
    const list = args[0] === '--featured' ? projects.filter((p) => p.featured) : projects;
    const lines: TerminalLine[] = [
      { kind: 'heading', text: `Projects (${list.length})` },
      divider(),
      {
        kind: 'table',
        headers: ['SLUG', 'PROJECT', 'ROLE', 'YEAR'],
        rows: list.map((p) => [p.slug, p.title, p.role, String(p.year)]),
      },
    ];
    lines.push(divider());
    lines.push({ kind: 'muted', text: 'Open a case study: run `open <slug>` or `projects <slug>`.' });
    return lines;
  },
};

const skillsCommand: CommandDef = {
  name: 'skills',
  description: 'List skill categories',
  aliases: ['stack'],
  run: () => {
    const lines: TerminalLine[] = [{ kind: 'heading', text: 'Skills & Technologies' }, divider()];
    skillCategories.forEach((cat) => {
      lines.push({ kind: 'accent', text: cat.name });
      lines.push({ kind: 'list', items: cat.skills });
    });
    lines.push(divider());
    lines.push({ kind: 'muted', text: 'Also comfortable with: ' + techStack.map((t) => t.name).join(', ') });
    return lines;
  },
};

const experienceCommand: CommandDef = {
  name: 'experience',
  description: 'Show work history',
  aliases: ['exp', 'cv'],
  run: () => {
    const lines: TerminalLine[] = [{ kind: 'heading', text: 'Work Experience' }, divider()];
    experiences.forEach((e) => {
      lines.push({ kind: 'accent', text: `${e.position} @ ${e.company}` });
      lines.push({ kind: 'muted', text: `${e.startDate} — ${e.endDate}` });
      lines.push({ kind: 'text', text: e.description });
      lines.push({ kind: 'muted', text: `tech: ${e.technologies.join(', ')}` });
      lines.push(divider());
    });
    return lines;
  },
};

const educationCommand: CommandDef = {
  name: 'education',
  description: 'Show education history',
  aliases: ['edu'],
  run: () => {
    const lines: TerminalLine[] = [{ kind: 'heading', text: 'Education' }, divider()];
    education.forEach((e) => {
      lines.push({ kind: 'accent', text: e.degree });
      lines.push({ kind: 'muted', text: `${e.institution} · ${e.location}` });
      lines.push({ kind: 'muted', text: `${e.startDate} — ${e.endDate}${e.gpa ? ` · GPA ${e.gpa}` : ''}` });
      if (e.description) lines.push({ kind: 'text', text: e.description });
      lines.push(divider());
    });
    return lines;
  },
};

const certificationsCommand: CommandDef = {
  name: 'certifications',
  description: 'Show certifications',
  aliases: ['certs'],
  run: () => {
    const lines: TerminalLine[] = [{ kind: 'heading', text: 'Certifications' }, divider()];
    certificates.forEach((c) => {
      lines.push({ kind: 'accent', text: c.title });
      lines.push({ kind: 'muted', text: `${c.issuer} · ${c.date}` });
      if (c.description) lines.push({ kind: 'text', text: c.description });
      if (c.url) lines.push({ kind: 'link', href: c.url, label: 'View certificate' });
      lines.push(divider());
    });
    return lines;
  },
};

const contactCommand: CommandDef = {
  name: 'contact',
  description: 'Show contact details and socials',
  aliases: ['email', 'socials'],
  run: () => [
    { kind: 'heading', text: 'Get in touch' },
    divider(),
    { kind: 'link', href: `mailto:${contactInfo.email}`, label: `email   · ${contactInfo.email}` },
    { kind: 'link', href: `tel:${contactInfo.phone}`, label: `phone   · ${contactInfo.phone}` },
    { kind: 'muted', text: `location· ${contactInfo.address}` },
    divider(),
    { kind: 'accent', text: 'Socials' },
    ...socials.map((s) => ({ kind: 'link', href: s.url, label: `${s.name.padEnd(10)} · ${s.url}` }) as TerminalLine),
    divider(),
    { kind: 'success', text: 'Status: available for freelance & full-time roles' },
  ],
};

const resumeCommand: CommandDef = {
  name: 'resume',
  description: 'Open the CV builder',
  aliases: ['cv'],
  run: (_args, ctx) => ({
    lines: [
      { kind: 'accent', text: 'Opening CV builder...' },
      { kind: 'muted', text: 'Tip: use the Export PDF button to download.' },
    ],
    action: () => ctx.navigate('/cv'),
  }),
};

const openCommand: CommandDef = {
  name: 'open',
  description: 'Open a project case study by slug',
  aliases: ['view'],
  usage: 'open <slug>',
  run: (args, ctx) => {
    const slug = args[0];
    if (!slug) return [{ kind: 'danger', text: 'open: missing slug. Usage: open <slug>' }];
    const found = caseStudies.find((c) => c.slug === slug) || projects.find((p) => p.slug === slug);
    if (!found) return [{ kind: 'danger', text: `open: not found: ${slug}` }];
    return {
      lines: [
        { kind: 'accent', text: `Opening case study: ${found.title}...` },
      ],
      action: () => ctx.navigate(`/case-study/${slug}`),
    };
  },
};

const gotoCommand: CommandDef = {
  name: 'goto',
  description: 'Jump to a section on the home page',
  aliases: ['cd'],
  usage: 'goto <section>',
  run: (args, ctx) => {
    const section = args[0];
    if (!section) return [{ kind: 'danger', text: 'goto: missing section. Try: hero, works, about, credentials, contact' }];
    const map: Record<string, string> = {
      hero: 'hero',
      works: 'works',
      projects: 'works',
      about: 'about',
      credentials: 'credentials',
      experience: 'credentials',
      contact: 'contact',
    };
    const id = map[section.toLowerCase()];
    if (!id) return [{ kind: 'danger', text: `goto: unknown section: ${section}` }];
    return {
      lines: [{ kind: 'accent', text: `Jumping to #${id}...` }],
      action: () => ctx.scrollTo(id),
    };
  },
};

const clearCommand: CommandDef = {
  name: 'clear',
  description: 'Clear the terminal output',
  aliases: ['cls'],
  run: () => [], // empty output + caller detects `clear` and wipes state
};

const echoCommand: CommandDef = {
  name: 'echo',
  description: 'Print arguments back to the terminal',
  run: (args) => [{ kind: 'text', text: args.join(' ') }],
};

const dateCommand: CommandDef = {
  name: 'date',
  description: 'Show current date and time',
  run: () => [{ kind: 'text', text: new Date().toString() }],
};

const whoamiCommand: CommandDef = {
  name: 'whoami',
  description: 'Print the current user',
  run: () => [{ kind: 'text', text: 'guest@ramex-portfolio' }],
};

const bannerCommand: CommandDef = {
  name: 'banner',
  description: 'Show the ASCII banner',
  run: () => [
    { kind: 'ascii', text: RAMEX_ASCII },
    divider(),
    { kind: 'muted', text: 'Fullstack Software Engineer · Addis Ababa, Ethiopia' },
  ],
};

/* ------------------------------------------------------------
   Registry
   ------------------------------------------------------------ */

export const commands: CommandDef[] = [
  helpCommand,
  aboutCommand,
  projectsCommand,
  skillsCommand,
  experienceCommand,
  educationCommand,
  certificationsCommand,
  contactCommand,
  resumeCommand,
  openCommand,
  gotoCommand,
  clearCommand,
  echoCommand,
  dateCommand,
  whoamiCommand,
  bannerCommand,
];

/** Flat list of all command names + aliases — used for Tab-completion. */
export const allCommandTokens: string[] = commands.flatMap((c) => [c.name, ...(c.aliases ?? [])]);

/** Find a command by name or alias. */
export function findCommand(token: string): CommandDef | undefined {
  return commands.find((c) => c.name === token || c.aliases?.includes(token));
}
