import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    title: 'Positivus',
    slug: 'positivus',
    overview:
      'A comprehensive digital marketing agency landing page built from a detailed Figma design. The page features a bold dark-and-green visual identity with multiple content sections including a hero with clear call-to-action, a logo bar showcasing client brands, six distinct service cards, a prominent CTA banner, case study previews, an accordion-based working process, team member profiles, a testimonials carousel, and a contact form — all tied together with a consistent design system.',
    challenge:
      'Translating a feature-rich Figma design into pixel-perfect, responsive HTML and CSS without any framework or library support required meticulous attention to typography, spacing, and layout fidelity across every breakpoint. Several interactive components — an expandable accordion, a smooth testimonials carousel, a mobile navigation menu, and scroll-triggered animations — had to be implemented in vanilla JavaScript with reliable cross-browser behavior and no external dependencies.',
    process:
      'Begun by auditing the Figma design and extracting a complete design token system using CSS custom properties for colors, spacing, and typography to keep the stylesheet consistent and maintainable. Built the layout mobile-first with a stacked single-column approach, then progressively enhanced to multi-column grids using CSS Grid for the service cards and team section. Each interactive component was engineered independently — the accordion uses event delegation for efficiency, the carousel is driven by CSS transforms with JavaScript controlling the active index, and scroll animations are triggered through the Intersection Observer API. The form was wired to a serverless function for submissions.',
    solution:
      'A semantic HTML5 codebase with BEM-inspired class naming that keeps the markup readable and scalable. CSS custom properties act as the single source of truth for the entire design system, enabling rapid iteration and theming. Vanilla JavaScript handles all interactivity with zero third-party dependencies — the accordion toggles cleanly, the carousel transitions smoothly, and the mobile menu slides in with a simple CSS transition. The result is a visually faithful, performant implementation of the original design.',
    outcome:
      'Achieved perfect 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO. The page renders flawlessly on every device from 320px mobile screens to wide desktop monitors. The project validated that complex, multi-section marketing pages can be built to production quality without heavyweight frameworks — just clean HTML, organized CSS, and purposeful JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    timeline: 'March 2025',
    thumbnail: '/assets/positivus-thumbnail.webp',
    gradient: 'from-lime-500/30 to-green-500/30',
    previousProject: null,
    nextProject: 'nice-cursor',
  },
  {
    title: 'Nice Cursor',
    slug: 'nice-cursor',
    overview:
      'A lightweight, zero-dependency cursor animation library that brings custom mouse effects to any website. The library ships with a growing collection of interactive effects — smooth followers with spring physics, click ripples, text morphing on hover, magnetic button attraction, and multi-dot trail snakes — all packaged as drop-in React components with full TypeScript support.',
    challenge:
      'Building cursor animations that feel buttery-smooth at 60fps across all modern browsers while consuming minimal resources was the core technical challenge. Each effect had to degrade gracefully on touch devices where there is no cursor, work correctly inside scrollable containers and iframes, and avoid layout thrashing that would tank performance. The architecture needed to be modular so users could import only the effects they need.',
    process:
      'Started by researching requestAnimationFrame patterns and studying production-grade cursor libraries to understand common pitfalls. Prototyped each effect in isolation — the smooth follower uses spring physics with configurable stiffness and damping, the ripple effect expands a radial gradient on click, and the trail snake chains multiple follower instances with staggered positions. Each effect was optimized to minimize DOM writes by batching style updates within a single RAF cycle. The library was then wrapped in a React-friendly API with custom hooks and a provider pattern for global configuration.',
    solution:
      'A modular plugin architecture where each cursor effect is a standalone class with a consistent lifecycle — mount, update, destroy. Effects are composed together through a central CursorManager that coordinates the RAF loop. The Framer Motion integration adds declarative magnetic hover support. TypeScript generics give users full type safety on effect options. Tree-shaking ensures unused effects don\'t bloat the bundle.',
    outcome:
      'The library achieves a consistent 60fps on mid-range devices with multiple effects active simultaneously. Each effect gracefully disables on touch devices, falling back to the native cursor. The package is structured for npm publication with proper TypeScript declarations and is already powering cursor effects on several personal projects. The clear, modular architecture makes it straightforward for contributors to add new effects.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    timeline: 'April 2025',
    thumbnail: '/assets/nice-cursor-thumbnail.webp',
    gradient: 'from-pink-500/30 to-rose-500/30',
    previousProject: 'positivus',
    nextProject: 'x-twitter-clone',
  },
  {
    title: 'X (Twitter) Clone',
    slug: 'x-twitter-clone',
    overview:
      'A full-stack social media platform that replicates the core experience of Twitter/X, including real-time posting, likes, retweets, follows, user profiles, and a personalized feed. The application leverages Next.js API routes for the entire backend, MongoDB for data persistence, and Clerk for authentication — all within a single Next.js project for streamlined deployment.',
    challenge:
      'Recreating Twitter\'s complex relational data model — users, tweets, likes, retweets, bookmarks, follows — within the constraints of Next.js serverless API routes was the primary architectural challenge. Each API endpoint needed efficient MongoDB aggregation pipelines to assemble personalized feeds, calculate engagement metrics, and enforce access control, all while keeping cold-start latency acceptable on a serverless platform.',
    process:
      'Designed the MongoDB schema with indexed collections for users, tweets, and relationships to support efficient queries. Built RESTful API routes under Next.js\'s App Router, each handling validation, authorization via Clerk session tokens, and database operations. The feed algorithm uses aggregation pipelines that merge tweets from followed users, inject the authenticated user\'s own tweets, and sort by recency. The UI was styled to faithfully match X\'s dark theme with the signature three-column layout — left sidebar for navigation, center feed, and right sidebar for trends and suggestions.',
    solution:
      'MongoDB aggregation pipelines drive the personalized feed with a single database query that joins tweets, user data, and interaction status. Clerk handles the entire authentication flow — sign-up, sign-in, session management, and webhook sync to the local database. The UI implements optimistic updates so likes and retweets appear instantly before the server confirms, creating a responsive feel. The entire application deploys as a single Next.js project on Vercel.',
    outcome:
      'A fully functional social media platform with real-time posting, interaction toggles, follow relationships, and personalized feeds. Users can sign up, create a profile, post tweets, and engage with content from other users. The project demonstrated that a modern social media backend can be built entirely within Next.js serverless functions while maintaining acceptable performance and a familiar UX.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB', 'Clerk'],
    timeline: 'April 2025',
    thumbnail: '/assets/x-twitter-clone-thumbnail.webp',
    gradient: 'from-sky-500/30 to-blue-500/30',
    previousProject: 'nice-cursor',
    nextProject: 'quizzer',
  },
  {
    title: 'Quizzer',
    slug: 'quizzer',
    overview:
      'An AI-powered quiz application that uses Google\'s Gemini API to dynamically generate questions on any topic the user provides. The app supports multiple question types — multiple choice, true or false, and short answer — with adaptive difficulty levels and two distinct game modes: Standard for a fixed-length quiz and Survival where each wrong answer ends the run.',
    challenge:
      'Integrating Gemini\'s API for reliable, well-structured question generation required careful prompt engineering to ensure consistent JSON output that the frontend could parse without errors. The quiz state machine had to handle mode-specific rules — Survival mode tracks a streak and ends on first failure, while Standard mode presents a fixed number of questions — both with real-time scoring and progress tracking.',
    process:
      'Designed structured prompts that instruct Gemini to return quiz questions in a predictable JSON schema, with fallback handling for malformed responses. Built a state machine in React that manages the quiz lifecycle — topic selection, question presentation, answer submission, feedback, and results. The UI presents a clean setup screen where users choose their topic, difficulty, and question type before starting. Survival mode adds pressure with a streak counter and dramatic failure state.',
    solution:
      'A modular React architecture with custom hooks for the quiz state machine and Gemini API integration. The prompt template includes few-shot examples to guide Gemini\'s output format, and a validation layer catches and retries on malformed responses. The UI uses animated transitions between questions and results, with clear visual feedback for correct and incorrect answers. Progress and scores are persisted to localStorage so users can resume.',
    outcome:
      'A polished quiz application that generates fresh, relevant questions on any topic — from quantum physics to pop culture. Standard mode provides a structured learning experience while Survival mode adds replayability through the challenge of maintaining a streak. The project proved that LLM-powered applications can deliver consistent, production-quality interactive experiences with the right prompt engineering and state management patterns.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    timeline: 'April 2025',
    thumbnail: '/assets/quizzer-thumbnail.webp',
    gradient: 'from-violet-500/30 to-purple-500/30',
    previousProject: 'x-twitter-clone',
    nextProject: 'amazon-clone',
  },
  {
    title: 'Amazon Clone',
    slug: 'amazon-clone',
    overview:
      'A front-end e-commerce clone of Amazon\'s familiar shopping experience, built entirely with vanilla HTML, CSS, and JavaScript. The site features a searchable product catalog with live filtering, a fully functional shopping cart with localStorage persistence, and a clean responsive layout that mirrors Amazon\'s distinctive visual language without relying on any frameworks or libraries.',
    challenge:
      'Recreating Amazon\'s information-dense layout — the navigation bar with search, the product grid, sidebar filters, and the persistent cart — using only vanilla techniques required disciplined DOM management and state handling. The search functionality needed real-time filtering across product titles, categories, and descriptions, while the cart had to persist across page views using localStorage and update the badge count in real time.',
    process:
      'Started by structuring the product data as a JSON array with fields for title, price, image, category, and description. Built the core HTML skeleton matching Amazon\'s layout conventions, then styled it with CSS custom properties for the signature orange-and-dark color scheme. The search bar uses a debounced input handler that filters the product array and re-renders the grid. The cart module manages a separate state array, persists it to localStorage, and dispatches custom events to keep the cart badge and checkout summary in sync.',
    solution:
      'A component-inspired vanilla architecture where each major UI unit — product grid, search bar, cart drawer — has its own render function and state manager. Products are rendered from the JSON data using template literals and inserted into the DOM via innerHTML. The cart uses a pub-sub pattern: state changes emit events that subscribed UI elements react to. localStorage provides persistence across sessions, and the entire codebase is under 400 lines of organized JavaScript.',
    outcome:
      'A fully functional e-commerce front-end that feels responsive and snappy despite having zero framework overhead. Users can browse products, search and filter by keyword, add items to the cart, adjust quantities, and see the running total — all with instant UI feedback. The project demonstrates that vanilla JavaScript remains a perfectly viable choice for moderate-complexity applications and that thoughtful architecture matters more than the tools you choose.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    timeline: 'March 2025',
    thumbnail: '/assets/amazon-clone-thumbnail.webp',
    gradient: 'from-yellow-500/30 to-orange-500/30',
    previousProject: 'quizzer',
    nextProject: 'foody',
  },
  {
    title: 'Foody',
    slug: 'foody',
    overview:
      'An AI-powered recipe chatbot that suggests meals based on the ingredients you already have. Foody presents a clean, conversational interface where users type queries like "What can I make with chicken and rice?" and receives detailed recipes with step-by-step instructions, ingredient lists, and nutrition information. The chatbot personality adds a playful touch with the tagline "I only cook, I don\'t chat."',
    challenge:
      'Building a conversational experience that feels natural and responsive required careful design of the chat flow — the app had to understand ingredient-based queries, return structured recipe data, and handle edge cases like unrecognized ingredients or ambiguous requests. The AI integration needed to produce consistently formatted recipes that could be rendered cleanly in the chat UI with proper sections for ingredients, steps, and timing.',
    process:
      'Designed a minimal chat interface with message bubbles, a persistent input field, and typing indicators for the AI response delay. The recipe data was initially structured as a JSON knowledge base of common dishes, then augmented with an AI API fallback for custom queries. Each AI prompt is engineered to return recipes in a structured format that the frontend can parse into consistent sections. The conversation flow handles ingredient-only queries, cuisine preferences, dietary restrictions, and follow-up questions about specific steps.',
    solution:
      'A dual-source architecture: a local JSON database of curated recipes provides instant responses for common ingredient combinations, while an AI API handles novel or complex queries with a structured prompt template. The chat UI uses a message array as its single source of truth, with each message typed as user, bot, or system. Typing indicators create a natural conversational rhythm, and the recipe cards render with clear visual hierarchy — title, ingredients, steps, and tips.',
    outcome:
      'A delightful recipe assistant that consistently suggests relevant, cookable recipes from whatever ingredients the user has on hand. The conversational flow feels natural, the recipe formatting is clean and scannable, and the playful personality makes the interaction engaging. The project demonstrated effective patterns for combining structured data with AI fallbacks and building conversational UIs with vanilla JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    timeline: 'March 2025',
    thumbnail: '/assets/foody-thumbnail.webp',
    gradient: 'from-green-500/30 to-emerald-500/30',
    previousProject: 'amazon-clone',
    nextProject: 'dog-runner',
  },
  {
    title: 'Dog Runner',
    slug: 'dog-runner',
    overview:
      'An endless runner game built entirely with HTML5 Canvas where players control a dog sprinting through a parallax countryside, dodging enemies and collecting hearts. The game features smooth sprite animations, a five-layer parallax background system, multiple enemy types with distinct behaviors, a 20-second survival mode with rolling mechanics, and real-time score tracking.',
    challenge:
      'Building a complete 2D game engine from scratch using only the HTML5 Canvas API — including a fixed-timestep game loop, AABB collision detection, sprite sheet animation, and parallax scrolling — required deep understanding of game development fundamentals. Each enemy type needed unique movement patterns and collision responses, and the rolling mechanic (activated by holding Enter) demanded precise state management to feel responsive and fair.',
    process:
      'Designed the game architecture around a central Game class that owns the game loop, entity management, and rendering pipeline. The player dog, enemies, and background layers are each separate classes with update and draw methods. The parallax system layers five background images scrolling at different speeds to create convincing depth. Collision detection uses axis-aligned bounding box checks between the player and each enemy, with invincibility frames after taking damage. The rolling mechanic toggles a player state that changes the collision behavior — instead of taking damage, the player destroys enemies on contact.',
    solution:
      'A fixed-timestep game loop using requestAnimationFrame with accumulator-based delta time ensures consistent physics regardless of frame rate. Sprite animations are driven by a sprite sheet with configurable frame rates per animation state (idle, run, roll, hurt). The five background layers scroll at progressive speeds for immersive parallax depth. HUD elements — hearts, score, timer — are rendered as canvas overlays with a restart button for immediate replays.',
    outcome:
      'A polished, playable game that maintains smooth 60fps even with multiple enemies and particle effects on screen. The parallax backgrounds create a convincing sense of motion, the rolling mechanic adds satisfying player agency, and the 20-second time limit creates urgency that drives replayability. The project demonstrates that rich, performant 2D games can be built entirely with vanilla JavaScript and the Canvas API, with zero engine dependencies.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    timeline: 'March 2025',
    thumbnail: '/assets/dog-runner-thumbnail.webp',
    gradient: 'from-amber-500/30 to-yellow-500/30',
    previousProject: 'foody',
    nextProject: 'mini-projects',
  },
  {
    title: 'Mini Projects',
    slug: 'mini-projects',
    overview:
      'A curated collection of six small but focused projects that document a progression from vanilla JavaScript fundamentals through React to Next.js. The collection includes a calculator with dark mode, a Tenzzies dice game with confetti celebrations, an Instagram clone (Oldagram), a unit converter, a basketball scoreboard, and a todo list with localStorage persistence — each demonstrating specific front-end concepts in isolation.',
    challenge:
      'Each sub-project had to be independently functional while demonstrating a distinct set of front-end skills — DOM manipulation, state management, React hooks, game logic, CSS animation, and data persistence. The gallery itself needed to present these varied projects in a cohesive way, linking to each live demo and GitHub repository, without overshadowing the individual work.',
    process:
      'Built each project independently with its own repository and tech stack appropriate to its complexity. The calculator started as a vanilla JS exercise and was later upgraded to a React Vite app with dark mode. Tenzzies introduced React state with useState and useEffect, plus react-confetti for celebration feedback. Oldagram practiced vanilla JS DOM manipulation with an Instagram-style layout. The unit converter and scoreboard focused on pure JavaScript logic with minimal DOM updates. The todo list explored Next.js with Tailwind CSS and localStorage persistence for a full-stack feel.',
    solution:
      'Each project lives in its own repository with a focused README and live demo link. The gallery page presents them as a responsive grid with screenshots, tech tags, and links. The diversity of tech stacks — vanilla JS, React Vite, Next.js — intentionally mirrors a realistic learning path, showing growth from basic DOM scripting to modern framework architecture. Together they form a portfolio that demonstrates versatility across the front-end spectrum.',
    outcome:
      'Six polished, individually deployable applications that together tell a clear story of technical growth. Each project is self-contained, well-documented, and publicly accessible with both live demos and source code. The collection serves as both a learning record and a practical reference — patterns from these smaller projects are directly applicable to larger production applications. The gallery itself, built with Next.js and Tailwind, ties them together in a professional showcase.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    timeline: 'January–March 2025',
    thumbnail: '/assets/mini-projects-thumbnail.webp',
    gradient: 'from-cyan-500/30 to-teal-500/30',
    previousProject: 'dog-runner',
    nextProject: 'product-rest-api',
  },
  {
    title: 'Product Rest API',
    slug: 'product-rest-api',
    overview:
      'A production-ready RESTful API for product inventory management built entirely with Django Rest Framework. The API exposes well-documented endpoints for creating, reading, updating, and deleting products, with support for advanced query filters, pagination, sorting, and user authentication via JWT tokens.',
    challenge:
      'Designing a clean, extensible API architecture that follows REST conventions while supporting complex filtering, search, and pagination required careful URL structuring and serializer design. Authentication needed to be secure yet developer-friendly, and the entire API had to be self-documenting for easy consumption by frontend clients.',
    process:
      'Started by modelling the Product model with relevant fields — name, description, price, category, SKU, stock quantity, and timestamps. Built serializers with nested relationships and custom validation. Implemented view sets with Django Rest Framework\'s ModelViewSet for clean CRUD endpoints, then layered on filtering with django-filter, pagination with PageNumberPagination, and search with DRF\'s SearchFilter. JWT authentication was added using SimpleJWT, and API documentation was auto-generated with drf-spectacular providing an OpenAPI schema and Swagger UI.',
    solution:
      'A modular Django REST Framework API with feature-rich endpoints. django-filter powers query parameters for precise result filtering. Pagination limits response payloads while providing navigation metadata. JWT tokens handle stateless authentication with access and refresh token flow. The drf-spectacular integration generates live OpenAPI documentation accessible at /api/docs, making the API explorable without external tools.',
    outcome:
      'A fully functional, well-documented REST API that can serve as the backend for any e-commerce or inventory application. The clean separation of serializers, views, and URL routes makes the codebase maintainable and extensible. Comprehensive test coverage ensures reliability, and the auto-generated API docs reduce onboarding time for frontend developers.',
    technologies: ['Python', 'Django'],
    timeline: 'June 2025',
    thumbnail: '/assets/product-rest-api-thumbnail.webp',
    gradient: 'from-blue-500/30 to-indigo-500/30',
    previousProject: 'mini-projects',
    nextProject: 'omni-store',
  },
  {
    title: 'Omni-Store',
    slug: 'omni-store',
    overview:
      'A full-stack e-commerce platform combining a Django Rest Framework backend with a React TypeScript frontend. The backend handles product data, user accounts, cart management, and order processing through a RESTful API, while the React frontend delivers a polished shopping experience with responsive design and modern UI patterns.',
    challenge:
      'Coordinating two separate codebases — a Python/Django API and a TypeScript/React SPA — required a well-defined API contract and smooth development workflow. The e-commerce domain introduced complex state management needs: a persistent shopping cart, user sessions, product search with filters, and order lifecycle tracking across both client and server.',
    process:
      'Built the Django REST Framework API first with models for Products, Categories, CartItems, Orders, and Users. The API exposes endpoints for product listing with filtering and search, cart CRUD operations, order placement and status tracking, and user registration and profile management. On the frontend, React with TypeScript handles routing, global state via Context API, and API communication through a dedicated service layer. Tailwind CSS provides a responsive, utility-first styling system with custom design tokens that match the brand identity.',
    solution:
      'A two-tier architecture where the Django REST Framework API serves as the single source of truth for all business logic and data persistence, while the React frontend consumes it through typed API service modules. The cart state is synchronized between the frontend Context and the backend via API calls, ensuring consistency across sessions. Product search uses the same django-filter backend that powers the admin interface, providing consistent filtering on both ends.',
    outcome:
      'A complete e-commerce platform with a clean separation of concerns between backend and frontend. The API can be reused by mobile apps or third-party integrations, while the React frontend delivers a fast, interactive shopping experience. The project demonstrates a real-world full-stack architecture using Django Rest Framework and React working together in production-quality harmony.',
    technologies: ['Python', 'Django', 'React', 'TypeScript', 'Tailwind'],
    timeline: 'June 2025',
    thumbnail: '/assets/omni-store-thumbnail.webp',
    gradient: 'from-teal-500/30 to-cyan-500/30',
    previousProject: 'product-rest-api',
    nextProject: null,
  },
];
