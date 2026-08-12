import { useEffect, useRef, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalWindow } from './ui/TerminalWindow';
import { TerminalLineView } from './terminal/TerminalLine';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useTabComplete } from '../hooks/useTabComplete';
import { useLockBody } from '../hooks/useLockBody';
import { findCommand, allCommandTokens, RAMEX_ASCII, type TerminalLine, type CommandContext } from './terminal/commands';

interface InteractiveTerminalProps {
  /** Compact floating variant (bottom-right) vs full-width panel. */
  variant?: 'floating' | 'panel';
  /** Navigation context — passed to commands so they can navigate the SPA. */
  navigate: (to: string) => void;
  /** Scroll to a section id on the home page. */
  scrollTo: (id: string) => void;
}

interface OutputEntry {
  id: number;
  promptText: string;
  lines: TerminalLine[];
}

const WELCOME_LINES: TerminalLine[] = [
  { kind: 'ascii', text: RAMEX_ASCII },
  { kind: 'heading', text: 'portfolio shell · v3.0.0' },
  { kind: 'success', text: 'Session established · workspace ready' },
  { kind: 'muted', text: 'Type `help` for commands · Tab completes · ↑/↓ walks history.' },
  { kind: 'divider' },
];

const QUICK_COMMANDS = [
  ['about', 'whoami'],
  ['projects', 'projects'],
  ['skills', 'stack'],
  ['contact', 'contact'],
  ['banner', 'banner'],
] as const;

let idCounter = 0;
const nextId = () => ++idCounter;

export function InteractiveTerminal({
  variant = 'floating',
  navigate,
  scrollTo,
}: InteractiveTerminalProps) {
  const [entries, setEntries] = useState<OutputEntry[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(variant === 'panel');
  const [completionHint, setCompletionHint] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(open);
  const liveRegionId = useId();

  const { push, navigate: navigateHistory, reset: resetHistory, setDraft } = useCommandHistory();
  const tabComplete = useTabComplete(allCommandTokens);

  const ctx: CommandContext = { navigate, scrollTo };
  useLockBody(variant === 'floating' && open);

  const openTerminal = useCallback(() => {
    const activeElement = document.activeElement;
    returnFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 260);
  }, []);

  const closeTerminal = useCallback(() => setOpen(false), []);

  // Ctrl/Cmd + K makes the terminal discoverable without taking over ordinary typing.
  useEffect(() => {
    if (variant !== 'floating') return;
    const handleShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      event.preventDefault();
      if (open) closeTerminal();
      else openTerminal();
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [variant, open, openTerminal, closeTerminal]);

  // Escape should work even after the user clicks somewhere outside the input.
  useEffect(() => {
    if (variant !== 'floating' || !open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTerminal();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [variant, open, closeTerminal]);

  // Keep keyboard navigation inside the modal while the expanded terminal is open.
  useEffect(() => {
    if (variant !== 'floating' || !open) return;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [variant, open]);

  // The header uses this lightweight event so the terminal state stays local
  // while its launcher can live anywhere in the app shell.
  useEffect(() => {
    if (variant !== 'floating') return;
    window.addEventListener('portfolio:open-terminal', openTerminal);
    return () => window.removeEventListener('portfolio:open-terminal', openTerminal);
  }, [variant, openTerminal]);

  // Return keyboard users to the control that opened the deck.
  useEffect(() => {
    if (variant !== 'floating') return;
    if (wasOpenRef.current && !open) {
      window.setTimeout(() => returnFocusRef.current?.focus(), 0);
    }
    wasOpenRef.current = open;
  }, [variant, open]);

  // Print the shell banner only for the first session; `clear` should behave like a real terminal.
  useEffect(() => {
    if (open && !initialized) {
      setEntries([{ id: nextId(), promptText: '', lines: WELCOME_LINES }]);
      setInitialized(true);
    }
  }, [open, initialized]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries, completionHint]);

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const promptLine = trimmed;
      push(trimmed);

      if (!trimmed) {
        setEntries((prev) => [...prev, { id: nextId(), promptText: '', lines: [] }]);
        return;
      }

      const [cmdName, ...args] = trimmed.split(/\s+/);
      const cmd = findCommand(cmdName);

      if (!cmd) {
        setEntries((prev) => [
          ...prev,
          {
            id: nextId(),
            promptText: promptLine,
            lines: [
              { kind: 'danger', text: `command not found: ${cmdName}` },
              { kind: 'muted', text: 'Type `help` for a list of available commands.' },
            ],
          },
        ]);
        return;
      }

      if (cmd.name === 'clear') {
        setEntries([]);
        return;
      }

      const result = cmd.run(args, ctx);
      const lines = Array.isArray(result) ? result : result.lines;
      const action = Array.isArray(result) ? undefined : result.action;

      setEntries((prev) => [...prev, { id: nextId(), promptText: promptLine, lines }]);
      if (action) {
        // Navigation commands dismiss the full-screen shell before changing view.
        if (variant === 'floating') {
          closeTerminal();
          window.setTimeout(action, 240);
        } else {
          window.setTimeout(action, 50);
        }
      }
    },
    [push, navigate, scrollTo, variant, closeTerminal],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter — submit
      if (e.key === 'Enter') {
        e.preventDefault();
        execute(input);
        setInput('');
        resetHistory();
        setCompletionHint(null);
        return;
      }

      // ↑ / ↓ — history navigation
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const value = navigateHistory('up');
        // Use draft when history hook has set it
        setInput(value);
        setCompletionHint(null);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const value = navigateHistory('down');
        setInput(value);
        setCompletionHint(null);
        return;
      }

      // Tab — completion
      if (e.key === 'Tab') {
        e.preventDefault();
        const completed = tabComplete(input);
        if (completed !== null) {
          setInput(completed);
          setCompletionHint(null);
        } else {
          // Show matching commands as a hint
          const tokens = input.split(/\s+/);
          const last = tokens[tokens.length - 1] ?? '';
          const matches = allCommandTokens.filter((c: string) => c.toLowerCase().startsWith(last.toLowerCase()));
          setCompletionHint(matches.length > 0 ? matches : null);
        }
        return;
      }

      // Ctrl+L — clear
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setEntries([]);
        setCompletionHint(null);
        return;
      }

      // Escape — close (floating variant)
      if (e.key === 'Escape' && variant === 'floating') {
        e.preventDefault();
        closeTerminal();
        return;
      }

      // Any other key clears the completion hint
      if (completionHint) setCompletionHint(null);
    },
    [input, execute, navigateHistory, resetHistory, tabComplete, completionHint, variant, closeTerminal],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      // Sync the draft in the history hook so ↑ doesn't override an in-progress edit
      setDraft(e.target.value);
    },
    [setDraft],
  );

  const runQuickCommand = useCallback((command: string) => {
    execute(command);
    setInput('');
    setCompletionHint(null);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [execute]);

  // Global variant — a full-screen, physical-feeling command workstation.
  if (variant === 'floating') {
    return (
      <>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="global-terminal-overlay fixed inset-0 z-[120] flex items-center justify-center overflow-hidden p-4 no-print sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              aria-describedby={`${liveRegionId}-instructions`}
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) closeTerminal();
              }}
            >
              <div className="global-terminal-atmosphere" aria-hidden="true" />
              <div className="global-terminal-computer">
                <div className="global-terminal-monitor">
                  <div className="global-terminal-screen">
                    <TerminalWindow title="portfolio.sh" status="command deck" className="global-terminal-window">
                {/* Output area */}
                <div
                  ref={outputRef}
                  className="terminal-viewport global-terminal-output overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm"
                  onClick={() => inputRef.current?.focus()}
                >
                  {entries.map((entry) => (
                    <div key={entry.id} className="mb-2">
                      {entry.promptText !== '' && (
                        <div className="terminal-command-echo">
                          <span className="text-accent">root@ramex</span>
                          <span className="text-text-dim">:</span>
                          <span className="text-accent-dim">~</span>
                          <span className="text-text-dim">$ </span>
                          <span className="text-text-primary">{entry.promptText}</span>
                        </div>
                      )}
                      {entry.lines.map((line, i) => (
                        <TerminalLineView key={i} line={line} />
                      ))}
                    </div>
                  ))}

                  {/* Completion hint */}
                  {completionHint && completionHint.length > 0 && (
                    <div className="my-1 border border-border-subtle bg-bg-surface/60 p-2">
                      <div className="text-text-dim text-[10px] uppercase tracking-wider mb-1">matches</div>
                      <div className="flex flex-wrap gap-2">
                        {completionHint.map((c) => (
                          <button
                            type="button"
                            key={c}
                            className="font-mono text-[10px] text-accent hover:underline"
                            onClick={() => {
                              setInput(c + ' ');
                              setCompletionHint(null);
                              inputRef.current?.focus();
                            }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active prompt */}
                  <div className="terminal-input-line">
                    <span className="text-accent shrink-0">root@ramex</span>
                    <span className="text-text-dim shrink-0">:</span>
                    <span className="text-accent-dim shrink-0">~</span>
                    <span className="text-text-dim shrink-0">$</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      aria-label="Terminal input"
                      aria-describedby={liveRegionId}
                      className="flex-1 bg-transparent text-text-primary caret-accent outline-none"
                    />
                  </div>
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2 font-mono text-[9px] text-text-dim sm:px-5 sm:text-[10px]">
                  <span><span className="text-accent-dim">TAB</span> complete · <span className="text-accent-dim">↑↓</span> history · <span className="text-accent-dim">⌘L</span> clear</span>
                  <button
                    onClick={closeTerminal}
                    className="text-text-muted transition-colors hover:text-accent"
                    aria-label="Close terminal"
                  >
                    [ close · esc ]
                  </button>
                </div>
                <div className="terminal-command-bar">
                  <span className="terminal-command-bar-label">quick run</span>
                  {QUICK_COMMANDS.map(([command, label]) => (
                    <button key={command} onClick={() => runQuickCommand(command)}>
                      <span>$</span>{label}
                    </button>
                  ))}
                </div>
                    </TerminalWindow>
                  </div>
                </div>
                <div className="global-terminal-stand" aria-hidden="true" />
                <div className="global-terminal-keyboard" aria-hidden="true">
                  {Array.from({ length: 42 }).map((_, index) => <span key={index} />)}
                </div>
                <p className="global-terminal-caption">RAMEX // COMMAND DECK <span>ONLINE</span></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ARIA live region — announces command output for screen readers */}
        <div id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="false">
          {entries.slice(-1).map((e) =>
            e.lines.map((l, i) => <span key={i}>{l.text ?? ''} </span>),
          )}
        </div>
        <p id={`${liveRegionId}-instructions`} className="sr-only">
          Click outside the command deck or press Escape to close it.
        </p>
      </>
    );
  }

  // Panel variant — full-width inline
  return (
    <TerminalWindow title="portfolio.sh" status="live workspace" className="hero-terminal-window">
      <div
        ref={outputRef}
        className="terminal-viewport max-h-[60vh] min-h-[240px] overflow-y-auto p-4 font-mono text-xs leading-relaxed md:text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-2">
            {entry.promptText !== '' && (
              <div className="terminal-command-echo">
                <span className="text-accent">root@ramex</span>
                <span className="text-text-dim">:</span>
                <span className="text-accent-dim">~</span>
                <span className="text-text-dim">$ </span>
                <span className="text-text-primary">{entry.promptText}</span>
              </div>
            )}
            {entry.lines.map((line, i) => (
              <TerminalLineView key={i} line={line} />
            ))}
          </div>
        ))}

        {completionHint && completionHint.length > 0 && (
          <div className="my-1 border border-border-subtle bg-bg-surface/60 p-2">
            <div className="text-text-dim text-[10px] uppercase tracking-wider mb-1">matches</div>
            <div className="flex flex-wrap gap-2">
              {completionHint.map((c) => (
                <button
                  type="button"
                  key={c}
                  className="font-mono text-[10px] text-accent hover:underline"
                  onClick={() => {
                    setInput(c + ' ');
                    setCompletionHint(null);
                    inputRef.current?.focus();
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="terminal-input-line">
          <span className="text-accent shrink-0">root@ramex</span>
          <span className="text-text-dim shrink-0">:</span>
          <span className="text-accent-dim shrink-0">~</span>
          <span className="text-text-dim shrink-0">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            aria-describedby={liveRegionId}
            className="flex-1 bg-transparent text-text-primary caret-accent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-subtle px-3 py-1.5 font-mono text-[9px] text-text-dim">
        <span>↑/↓ history · Tab complete · Ctrl+L clear</span>
        <button
          onClick={() => setEntries([])}
          className="text-text-muted transition-colors hover:text-accent"
          aria-label="Clear terminal"
        >
          [ clear ]
        </button>
      </div>

      <div className="terminal-command-bar">
        <span className="terminal-command-bar-label">quick run</span>
        {QUICK_COMMANDS.map(([command, label]) => (
          <button key={command} onClick={() => runQuickCommand(command)}>
            <span>$</span>{label}
          </button>
        ))}
      </div>

      <div id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="false">
        {entries.slice(-1).map((e) =>
          e.lines.map((l, i) => <span key={i}>{l.text ?? ''} </span>),
        )}
      </div>
    </TerminalWindow>
  );
}
