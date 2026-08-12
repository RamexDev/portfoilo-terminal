# ramex-portfolio — Terminal Edition

A complete visual redesign of [RamexDev/portfolio](https://github.com/RamexDev/portfolio) into a modern, animated, 3D-inflected terminal-style portfolio. All existing content, modular architecture, routes, and CV PDFs are preserved — only the visual layer and an added interactive shell are new.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc && vite build → dist/
npm run preview  # serve the built dist/
```

## What changed

### Visual layer
- **CRT phosphor theme** — black `#050807` background, phosphor green `#00ff88` accent, amber `#ffb627` warning. JetBrains Mono is the only typeface (headings included).
- **Terminal window chrome** — every panel uses a title bar with traffic-light dots, a `bash` title, and a `~/portfolio` path indicator. See `src/components/ui/TerminalWindow.tsx`.
- **CRT scanlines + traveling highlight band + vignette** — fixed full-screen overlay via `src/components/ui/ScanlineOverlay.tsx`. The traveling band is disabled under `prefers-reduced-motion`.
- **Command-prompt motifs** — `$`, `>`, `./` prefixes throughout. Block cursors blink next to prompts and headings.
- **Glitch hover** — RGB-split text effect on titles (`glitch-hover` utility).

### Motion
- **Boot sequence intro** (`src/components/BootSequence.tsx`) — plays once per session (sessionStorage-flagged). Shows `[ OK ]` log lines + a loading bar. Skippable with the `[ skip ⏎ ]` button. Auto-skips under reduced motion.
- **Typewriter headings** (`src/components/ui/Typewriter.tsx`) — types out the "Fullstack" headline. Renders instantly under reduced motion.
- **GlitchText** (`src/components/ui/GlitchText.tsx`) — RGB-split hover effect on key headings.
- Staggered scroll reveals preserved via existing `Reveal` primitive.

### 3D layer (genuine, not just shadows)
- **react-three-fiber + drei** — a floating 3D terminal window with:
  - Cursor-parallax tilt (listens to `window.pointermove`, smoothed via lerp in `useFrame`)
  - Faux screen with emissive phosphor shader + blinking block cursor + faux text lines
  - Animated grid backdrop + 80-particle drifting field
- **Lazy-loaded** via `React.lazy` + dynamic `import()` — three.js lives in its own 846KB chunk that only loads when the hero canvas enters the viewport.
- **Reduced-motion / low-power fallback** — `src/components/three/Terminal3DLazy.tsx` renders a static CSS terminal mock when:
  - `prefers-reduced-motion: reduce`
  - `navigator.hardwareConcurrency <= 4`
  - `window.innerWidth < 768`
- **Performance hygiene** — `dpr={[1, 1.5]}`, `pointer-events: none` on the canvas (parallax via window events), IntersectionObserver-based lazy mount with 200px root margin.

### Interactive terminal (actually works)
- **Floating panel** at bottom-right of every page (except `/cv`). Toggle button reads `_ terminal` with a blinking cursor.
- **Commands** sourced entirely from `src/data/*.ts` — single source of truth. See `src/components/terminal/commands.ts`:
  - `help [command]` — list commands or get help on one
  - `about` / `whoami` — bio
  - `projects [slug | --featured]` / `ls` / `work` — list or inspect
  - `skills` / `stack` — skill categories
  - `experience` / `exp` / `cv` — work history
  - `education` / `edu` — education
  - `certifications` / `certs` — certifications
  - `contact` / `email` / `socials` — contact + social links
  - `resume` / `cv` — opens the CV builder
  - `open <slug>` / `view` — opens a case study
  - `goto <section>` / `cd` — scrolls to a home-page section
  - `clear` / `cls` — clears output
  - `echo`, `date`, `whoami`, `banner` — utility commands
- **↑/↓ history** with proper cursor semantics (`src/hooks/useCommandHistory.ts`) — exact-duplicate suppression, max 100 entries, resets to "new draft" after submit.
- **Tab completion** (`src/hooks/useTabComplete.ts`) — completes against all command names + aliases, extends to longest common prefix on multiple matches, and shows a clickable matches list when ambiguous.
- **`Ctrl+L` clears**, **`Esc` closes** the floating panel.
- **Unknown command** — prints `command not found: <name>` in red + a hint.
- **Accessibility** — `role="region"`, `aria-label="Interactive terminal"`, input has `aria-label` + `aria-describedby`, plus an `aria-live="polite"` sr-only region that announces the last command's output.

## What's preserved (unchanged)

### Content layer (`src/data/*.ts`) — source of truth
- `projects.ts` — 10 projects (titles, descriptions, tags, links, screenshots, techStack, galleryImages)
- `caseStudies.ts` — 10 case studies (overview, challenge, process, solution, outcome, technologies, timeline, prev/next)
- `skills.ts` — 4 skill categories
- `techStack.ts` — 15 tech items
- `experience.ts` — 5 experiences
- `certificates.ts` — 2 certificates
- `education.ts` — 1 education record
- `contactInfo.ts`, `socials.ts`, `navLinks.ts`, `filters.ts` — unchanged
- `types/index.ts` — unchanged

### Architecture
- `useRouter.ts` (hash router), `useScrollToPending.ts`, `useLockBody.ts`, `lib/utils.ts` — unchanged.
- Component-per-concern structure preserved. UI primitives (`Button`, `Container`, `Reveal`, `Section`, `SvgIcon`, `TechBadge`, `TechIcon`) restyled in place, not collapsed.
- Routes preserved: `/` (Hero→Works→About→Credentials→Contact), `/case-study/:slug`, `/cv` (fullscreen, no header/footer), 404.

### Assets
- `public/cv/Ramadan_Jamal_CV.pdf` and `public/cv/Ramadan_Jamal_CV_colored.pdf` — both preserved, download still works via the CV builder's Export PDF button.
- All `public/assets/*.webp` project screenshots — preserved.

## File-by-file restyle vs rebuild

### New files (14)
| Path | Role |
|---|---|
| `src/hooks/usePrefersReducedMotion.ts` | Reactive `prefers-reduced-motion` subscription |
| `src/hooks/useCommandHistory.ts` | ↑/↓ command history with duplicate suppression |
| `src/hooks/useTabComplete.ts` | Tab completion with longest-common-prefix |
| `src/components/ui/TerminalWindow.tsx` | Terminal chrome wrapper (title bar + traffic lights) |
| `src/components/ui/Typewriter.tsx` | Typewriter effect, reduced-motion aware |
| `src/components/ui/GlitchText.tsx` | RGB-split glitch text on hover |
| `src/components/ui/ScanlineOverlay.tsx` | Fixed CRT scanlines + traveling band + vignette |
| `src/components/BootSequence.tsx` | Once-per-session boot intro with progress bar |
| `src/components/three/Terminal3D.tsx` | react-three-fiber scene (mesh, grid, particles) |
| `src/components/three/Terminal3DLazy.tsx` | Lazy + reduced-motion wrapper |
| `src/components/terminal/commands.ts` | Command registry sourcing from `src/data/*` |
| `src/components/terminal/TerminalLine.tsx` | Single-line renderer for terminal output |
| `src/components/InteractiveTerminal.tsx` | Floating/panel interactive shell |

### Restyled (visual layer only — structure unchanged)
- `src/index.css` — terminal theme tokens, CRT keyframes, reduced-motion overrides
- `src/App.tsx` — wires in `BootSequence` (only behavior change)
- `src/components/Layout.tsx` — adds `ScanlineOverlay` + `InteractiveTerminal`
- `src/components/Header.tsx`, `Footer.tsx`, `FullscreenMenu.tsx`
- `src/components/Hero.tsx` — adds 3D terminal + Typewriter + GlitchText
- `src/components/Works.tsx`, `ProjectCard.tsx`, `ProjectFilter.tsx`
- `src/components/About.tsx` — wraps bio in `TerminalWindow`
- `src/components/CertificationsAndExperience.tsx`
- `src/components/Contact.tsx`
- `src/components/CaseStudyPage.tsx`
- `src/components/NotFoundPage.tsx`
- `src/components/CvBuilder.tsx` — restyled chrome, A4 sheet unchanged
- `src/components/ui/{Button,TechBadge,TechIcon}.tsx`
- `index.html` — JetBrains Mono-only fonts, terminal theme color, skeleton tweak

### Untouched
- All of `src/data/*`, `src/types/index.ts`, `src/lib/utils.ts`
- `src/hooks/{useRouter,useScrollToPending,useLockBody}.ts`
- `src/components/ui/{Container,Reveal,Section,SvgIcon}.tsx`
- `public/cv/*.pdf`, `public/assets/*.webp`, `public/_headers`, `netlify.toml`, `vite.config.ts`, `tsconfig.json`, `vite-env.d.ts`

## New dependencies

```json
"three": "^0.169.0",
"@react-three/fiber": "^8.17.10",
"@react-three/drei": "^9.114.0",
"@types/three": "^0.169.0"  // devDependency
```

Existing: `framer-motion`, `lucide-react`, `react-icons`, `react`, `react-dom`, `tailwindcss` v4 (CSS `@theme`), `vite`, `typescript`.

## Responsiveness & accessibility

- Usable from ~360px to ultrawide — grid layouts collapse to single column at `sm`/`md` breakpoints.
- No hover-only affordances — every hover state has a tap/focus equivalent.
- 3D and motion degrade gracefully:
  - Reduced motion → static CSS terminal, no traveling scanline, instant text.
  - Low-power device (≤4 cores or <768px width) → static fallback instead of 3D canvas.
- Keyboard navigable terminal input/output, visible focus states, ARIA live region for output, skip-to-main link.

## Build output

```
dist/index.html                       2.92 kB │ gzip:   1.24 kB
dist/assets/index-C0A1jpYZ.css       69.90 kB │ gzip:  11.64 kB
dist/assets/index-C8xt77u8.js       418.80 kB │ gzip: 127.95 kB
dist/assets/Terminal3D-we2Wfnfr.js  845.97 kB │ gzip: 228.54 kB   (lazy, only loads when hero canvas enters viewport)
```

Build passes `tsc && vite build` with zero errors and zero warnings (besides the expected large-chunk notice for the lazy 3D scene, which is by design).

## Verification checklist

- [x] `npm install && npm run build` passes with no errors
- [x] Home route `/` renders Hero (with 3D + typewriter), Works, About, Credentials, Contact
- [x] Case study route `/case-study/<slug>` renders for all 10 slugs
- [x] CV builder `/cv` renders fullscreen with no header/footer, both PDFs downloadable
- [x] 404 page renders for unknown routes
- [x] Floating terminal opens, accepts commands, history works (↑/↓), Tab completes, `clear` wipes output
- [x] Mobile width (360px): layout stacks, terminal toggle button reachable, no horizontal scroll
- [x] Desktop width (1440px+): 3D canvas visible, parallax tilt follows cursor
- [x] Reduced motion: boot sequence skipped, static terminal fallback, no traveling scanline
- [x] All CV PDFs preserved at `public/cv/`
