import type { TerminalLine } from './commands';

interface TerminalLineViewProps {
  line: TerminalLine;
}

/** Render a single terminal output line. */
export function TerminalLineView({ line }: TerminalLineViewProps) {
  switch (line.kind) {
    case 'divider':
      return (
        <div className="terminal-output-divider" aria-hidden="true" />
      );

    case 'heading':
      return (
        <div className="terminal-output-heading">
          <span>#</span>
          {line.text}
        </div>
      );

    case 'ascii':
      return (
        <pre className="terminal-ascii" aria-label="Ramex ASCII banner">
          {line.text}
        </pre>
      );

    case 'commandList':
      return (
        <div className="terminal-command-index" role="list" aria-label="Available terminal commands">
          <div className="terminal-command-index-head" aria-hidden="true">
            <span>COMMAND</span>
            <span>DESCRIPTION</span>
          </div>
          {line.commands?.map((command) => (
            <div key={command.name} className="terminal-command-index-row" role="listitem">
              <div className="terminal-command-index-name">
                <span>{command.name}</span>
                {command.aliases && command.aliases.length > 0 && (
                  <small>{command.aliases.join(', ')}</small>
                )}
              </div>
              <span className="terminal-command-index-description">{command.description}</span>
            </div>
          ))}
        </div>
      );

    case 'prompt':
      return (
        <div className="terminal-command-echo">
          <span className="text-accent">root@ramex</span>
          <span className="text-text-dim">:</span>
          <span className="text-accent-dim">~</span>
          <span className="text-text-dim">$ </span>
          <span className="text-text-primary">{line.text}</span>
        </div>
      );

    case 'table': {
      const columns = line.headers?.length ?? 0;
      const gridTemplateColumns = columns === 4
        ? 'minmax(8.4rem, 1.45fr) minmax(7.2rem, 1.2fr) minmax(5.5rem, 0.95fr) 3rem'
        : `repeat(${columns || 1}, minmax(0, 1fr))`;
      return (
        <div className="terminal-table" role="table" aria-label="Terminal data table" style={{ gridTemplateColumns }}>
          {line.headers?.map((header) => <span key={header} className="terminal-table-head" role="columnheader">{header}</span>)}
          {line.rows?.flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <span key={`${rowIndex}-${cellIndex}`} className="terminal-table-cell" role="cell">{cell}</span>
            )),
          )}
        </div>
      );
    }

    case 'success':
      return (
        <div className="terminal-output-status terminal-output-success">
          <span>[OK]</span>
          {line.text}
        </div>
      );

    case 'warn':
      return (
        <div className="terminal-output-status terminal-output-warn">
          <span>[!]</span>
          {line.text}
        </div>
      );

    case 'danger':
      return (
        <div className="terminal-output-status terminal-output-danger">
          <span>[X]</span>
          {line.text}
        </div>
      );

    case 'muted':
      return <div className="terminal-output-muted">{line.text}</div>;

    case 'accent':
      return <div className="terminal-output-accent">{line.text}</div>;

    case 'list':
      return (
        <div className="terminal-output-list">
          {line.items?.map((item, i) => (
            <div key={i}>
              <span>{i === (line.items?.length ?? 0) - 1 ? '└─' : '├─'}</span>
              {item}
            </div>
          ))}
        </div>
      );

    case 'link':
      return (
        <a
          href={line.href}
          target={line.href?.startsWith('http') ? '_blank' : undefined}
          rel={line.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="terminal-output-link"
        >
          <span>↗</span>
          {line.label}
        </a>
      );

    case 'text':
    default:
      return <div className="terminal-output-text">{line.text}</div>;
  }
}
