import type { Project } from '../types';
import { motion } from 'framer-motion';
import { SvgIcon } from './ui/SvgIcon';

interface ProjectCardProps {
  project: Project;
  navigate: (to: string) => void;
}

export function ProjectCard({ project, navigate }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col h-full border border-border-subtle bg-bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-border-accent hover:shadow-glow-sm">
      {/* Thumbnail */}
      <button
        onClick={() => navigate(`/case-study/${project.slug}`)}
        className="block w-full text-left"
        aria-label={`View case study for ${project.title}`}
      >
        <div className={`relative mb-5 aspect-video overflow-hidden border-b border-border-subtle bg-gradient-to-br ${project.gradient} transition-all duration-500 group-hover:border-border-accent`}>
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`Screenshot of ${project.title}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-extrabold text-accent/15 transition-colors group-hover:text-accent/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          {/* CRT scanlines over thumbnail on hover */}
          <div className="absolute inset-0 crt-scanlines opacity-0 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none" />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Case study badge */}
          <div className="absolute top-3 right-3 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="flex items-center gap-1 border border-accent/50 bg-bg-main/90 backdrop-blur-sm px-2 py-1 font-mono text-[9px] text-accent">
              <span className="text-accent-dim">./</span>case-study →
            </span>
          </div>
        </div>

        {/* Meta — terminal header style */}
        <div className="px-5 pt-1 mb-2 flex items-center gap-2 font-mono text-[10px]">
          <span className="text-text-muted border border-border-subtle px-1.5 py-0.5">{project.year}</span>
          <span className="text-text-dim">·</span>
          <span className="text-accent-dim">{project.role}</span>
        </div>

        {/* Title */}
        <h3 className="px-5 mb-2 text-xl font-extrabold text-text-primary transition-colors duration-300 group-hover:text-accent leading-tight glitch-hover">
          {project.title}
        </h3>

        {/* Description */}
        <p className="px-5 mb-4 text-sm leading-relaxed text-text-muted line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="px-5 mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] border border-border-subtle px-2 py-0.5 text-text-muted transition-colors hover:border-accent hover:text-accent">
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Action links */}
      <div className="mt-auto px-5 pb-5 flex items-center gap-2">
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="inline-flex items-center gap-1.5 border border-border-subtle px-3 py-1.5 font-mono text-[10px] text-text-muted transition-all hover:border-border-accent hover:text-accent"
          >
            <SvgIcon name="externalLink" size={10} />
            live
          </motion.a>
        )}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="inline-flex items-center gap-1.5 border border-border-subtle px-3 py-1.5 font-mono text-[10px] text-text-muted transition-all hover:border-border-accent hover:text-accent"
          >
            <SvgIcon name="github" size={10} />
            source
          </motion.a>
        )}
        <button
          onClick={() => navigate(`/case-study/${project.slug}`)}
          className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-text-muted transition-colors hover:text-accent"
        >
          details
          <SvgIcon name="chevronRight" size={10} />
        </button>
      </div>
    </article>
  );
}
