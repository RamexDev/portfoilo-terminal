import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
  title?: string;
  /** Show the optional path/status text in the title bar's right side */
  status?: string;
  /** Skip the title bar entirely (still shows the body) */
  bare?: boolean;
}

/**
 * Terminal window chrome — title bar with traffic-light buttons and a body
 * panel. Used to wrap sections, cards, and the interactive terminal.
 */
export function TerminalWindow({
  children,
  className,
  title = 'bash',
  status,
  bare = false,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'relative border border-border bg-bg-card/80 backdrop-blur-sm',
        'shadow-card shadow-inset-crt',
        className,
      )}
    >
      {/* Title bar */}
      {!bare && (
        <div className="terminal-titlebar">
          <div className="terminal-window-controls">
            {/* Traffic-light buttons (decorative) */}
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-danger/70 border border-danger/40"
            />
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-warn/70 border border-warn/40"
            />
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-accent/70 border border-accent/40"
            />
          </div>
          <div className="terminal-window-title">
            <span className="terminal-window-title-mark">$</span>
            <span>{title}</span>
            {status && (
              <>
                <span className="text-text-dim">·</span>
                <span className="terminal-window-status"><span />{status}</span>
              </>
            )}
          </div>
          <div className="terminal-window-path">
            <span className="hidden sm:inline">~/portfolio</span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="relative">{children}</div>
    </div>
  );
}
