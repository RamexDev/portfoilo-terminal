import type { IconName } from '../../types';
import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  GitBranch,
  Calendar,
  Building2,
  Award,
  Mail,
  Phone,
  MapPin,
  Atom,
  Server,
  Globe,
  Palette,
  Database,
  FlaskConical,
  Code2,
  Paintbrush,
  Printer,
  Download,
  FileText,
  Eye,
  EyeOff,
  Pencil,
  Check,
  GraduationCap,
  Briefcase,
  User,
  ChevronRight,
  Share2,
} from 'lucide-react';
import {
  SiTypescript,
  SiPython,
  SiDjango,
  SiJavascript,
  SiGithub,
  SiX,
  SiTelegram,
  SiUpwork,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

interface IconProps {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

interface SvgIconProps extends IconProps {
  name: IconName;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  react: Atom,
  typescript: SiTypescript,
  nodejs: Server,
  nextjs: Globe,
  tailwind: Palette,
  postgresql: Database,
  mongodb: Database,
  git: GitBranch,
  python: SiPython,
  django: SiDjango,
  flask: FlaskConical,
  html: Code2,
  css: Paintbrush,
  javascript: SiJavascript,
  github: SiGithub,
  linkedin: FaLinkedin,
  twitter: SiX,
  telegram: SiTelegram,
  upwork: SiUpwork,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  menu: Menu,
  x: X,
  externalLink: ExternalLink,
  gitBranch2: GitBranch,
  calendar: Calendar,
  building: Building2,
  certificate: Award,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  printer: Printer,
  download: Download,
  cv: FileText,
  eye: Eye,
  eyeOff: EyeOff,
  edit: Pencil,
  check: Check,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  user: User,
  chevronRight: ChevronRight,
  share: Share2,
};

export function SvgIcon({ name, size = 16, strokeWidth = 1.5, className }: SvgIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}
