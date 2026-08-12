import { socials } from '../data/socials';
import { SvgIcon } from './ui/SvgIcon';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle no-print">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row md:px-10 lg:px-16 max-w-7xl">
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-accent">root@ramex</span>
          <span className="text-text-dim">:</span>
          <span className="text-accent-dim">~</span>
          <span className="text-text-dim">$</span>
          <span className="text-text-muted">echo &quot;© {year}&quot;</span>
          <span className="text-text-dim">·</span>
          <span className="text-accent font-semibold">Ramadan Jamal</span>
          <span className="text-text-dim">·</span>
          <span className="text-text-muted">all rights reserved</span>
        </div>

        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              className="text-text-muted transition-all hover:text-accent hover:-translate-y-0.5"
            >
              <SvgIcon name={social.iconName} size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
