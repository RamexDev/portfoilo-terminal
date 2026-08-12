import { SvgIcon } from './SvgIcon';
import { techStack } from '../../data/techStack';

interface TechIconProps {
  name: string;
}

export function TechIcon({ name }: TechIconProps) {
  const item = techStack.find((t) => t.name === name);

  return (
    <div
      className="flex items-center gap-2 border border-border-subtle bg-bg-card/40 px-2 sm:px-3 py-1.5 font-mono text-xs text-text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
      title={name}
    >
      {item && <SvgIcon name={item.iconName} size={14} strokeWidth={1.5} />}
      <span className="hidden sm:inline">{name}</span>
    </div>
  );
}
