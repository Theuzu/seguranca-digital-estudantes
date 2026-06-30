<!--
Sync Impact Report
Version change: 2.0.0 -> 2.1.0
Modified principles:
- III. Binding Design System and Accessible Motion updated for the new required palette
Preserved principles:
- Portuguese interface and English documentation
- Data-driven educational journey
- Next.js discipline and controlled dependencies
- Academic and responsible cybersecurity
Added:
- Required Ink Black, Ghost White, Dusk Blue, Rosy Copper, and Saffron palette roles
- Requirement that active website colors come from centralized global Tailwind/CSS variables
Removed:
- Old one-accent green palette requirement
Templates and documentation requiring review or update:
- updated: design.md
- updated: active specs, plans, tasks, contracts, research, and quickstart files for palette-token implementation
- not present: .specify/templates/commands/*.md
Follow-up TODOs:
- None.
-->
# Seguranca Digital para Estudantes Constitution

## Core Principles

### I. Portuguese Interface, English Documentation

All public interface and website content MUST be written in clear Brazilian
Portuguese for students and cybersecurity beginners. Cybersecurity terminology
MUST be explained in context without assuming prior knowledge. Project
documentation MUST be written in English, including specs, plans, tasks, README
files, governance notes, and agent guidance.

Rationale: the public learning experience serves Brazilian students, while the
repository workflow stays consistent for planning, review, and agent handoff.

### II. Data-Driven Educational Journey

The website MUST remain one coherent, responsive, single-page educational
journey. It preserves three conceptual macro phases: Introduction, educational
journey, and conclusion/evaluation. The rendered page MUST NOT be constrained to
exactly three top-level sections; detailed information architecture, including
skip link, header, hero, project introduction, five-topic overview, five topic
chapters, problem presentation, guidance sequence, checklist, next-topic
transitions, final summary, Google Forms evaluation call to action,
acknowledgment, and footer, is governed by `design.md`.

Cybersecurity content MUST be owned by typed data files under `data/`, such as
`data/*.ts`. The five topics and their educational order MUST remain
data-driven rather than hardcoded into five unrelated components. Each topic
MUST preserve the recognizable model: `O problema`; `Como se proteger` or
`Como agir` with three practical guidance entries; and `Checklist`. Layout
components may determine presentation, but educational copy MUST remain
centralized in the content data model whenever practical.

Rationale: the site is an academic narrative, not a dashboard or application
shell, and centralized content keeps the educational message reviewable.

### III. Binding Design System and Accessible Motion

`design.md` is the sole binding design and implementation specification for
visual identity, information architecture, layout, responsive behavior, design
tokens, typography, imagery, component presentation, sticky-card behavior,
motion, reduced-motion alternatives, accessibility, performance expectations,
and design acceptance criteria. Statements marked `must`, `must not`,
`required`, or `do not` in `design.md` are hard constraints. `theme-vibe.md` is
obsolete and MUST NOT be used as active guidance.

When requirements conflict, work MUST use this priority order:

1. Content clarity and semantic structure.
2. Accessibility and reduced-motion behavior.
3. Responsive layout and touch usability.
4. Visual hierarchy.
5. Animation and decorative effects.

No implementation may sacrifice the first three priorities to preserve an
effect. Essential information MUST NOT depend on hover, animation, JavaScript
scroll effects, or a high-performance device. The site MUST remain readable and
functional without scroll-driven animation, and reduced-motion behavior is
mandatory. AppyCamper is a design-principle reference only and MUST NOT be
copied in branding, assets, source code, exact compositions, or illustrations.

The experience MUST be editorial and chapter-based, not dashboard-like. The
visitor MUST understand the subject, current topic, remaining progression, key
action, and route to the evaluation form. All five topics MUST be directly
discoverable and navigable. Every topic needs a clear beginning, ending, and
transition. Long-form text MUST use constrained reading widths. The layout MUST
NOT rely on horizontal scrolling. Text and controls MUST remain usable at 200%
zoom. The header MUST NOT obscure anchor targets. The final evaluation CTA MUST
have strong visual priority. The site MUST NOT wrap every content block in a
disconnected floating card.

Guidance sequences MUST follow the sticky-card model defined in `design.md`: the
guidance heading appears above the sequence; the stack is centered; every card
uses the same sticky top position; incoming cards fully cover previous cards at
the sticky point; card backgrounds are opaque; content from different cards MUST
NOT visually mix; future cards may remain naturally visible below the active
card; mobile preserves readability without horizontal overflow; and
reduced-motion mode uses a readable static sequence without large empty scroll
tracks.

The website MUST use a cohesive design system. Design tokens MUST be centralized.
Space Grotesk remains the display heading font when configured; Silkscreen is
limited to short labels and counters; body copy uses a readable sans-serif; and
no additional font family may be added without approval. The palette MUST remain
a dark-mode palette based on Ink Black for the dominant background and Ghost
White for primary readable text. Dusk Blue, Rosy Copper, and Saffron are support
colors for hierarchy, depth, progress, focus, call-to-action priority, and
educational emphasis. Active website colors MUST be declared in centralized
global Tailwind/CSS variables, not scattered as inline component styles or raw
hex values. Rosy Copper may support warning or caution states, but it MUST NOT
turn every decorative accent into an error cue. Borders, spacing, containers,
typography scales, and topic imagery treatment MUST remain consistent. The
visual cliches prohibited by `design.md`, including Matrix-style code rain,
hooded hacker stock imagery, excessive neon, dashboard widget grids, fake
terminal reading containers, glowing borders everywhere, unrelated topic color
systems, purposeless 3D objects, large glassmorphism text surfaces, and
animations that delay reading, MUST NOT be introduced.

Accessibility failures block completion even when the visual result appears
correct. The minimum target is WCAG AA with semantic HTML, correct heading
hierarchy, a functional skip link, visible keyboard focus, complete keyboard
navigation, practical touch targets of approximately 44px or larger, body text
of at least 16px, sufficient contrast, correct image alternative-text behavior,
no hover-only essential content, no keyboard traps, accessible mobile navigation
when present, usable 200% zoom layouts, `prefers-reduced-motion` support, and a
readable static fallback for motion-driven sections.

### IV. Next.js Discipline and Controlled Dependencies

Implementation MUST respect the installed Next.js version and the instructions
in `AGENTS.md`. When repository instructions require it, agents MUST read the
relevant local Next.js documentation under `node_modules/next/dist/docs/` before
changing framework-specific behavior. The project MUST reuse React, TypeScript,
Tailwind CSS, Motion, and existing utilities before adding anything new.

No animation library, component system, CSS-in-JS solution, WebGL library, page
builder, state framework, backend service, or heavy dependency may be introduced
without explicit approval. Prefer server components unless client-side behavior
is required, and isolate client components to the smallest reasonable boundary.
The site MUST remain statically deployable to Vercel.

Responsive and performance work MUST follow `design.md`: verify narrow mobile,
standard mobile, tablet, desktop, wide desktop, short landscape screens, and
200% zoom; prevent horizontal page overflow; wrap Portuguese titles
intentionally; avoid clipped card content; keep decorative objects away from
essential text; use content-driven breakpoints; reserve image dimensions; lazy
load below-the-fold imagery where appropriate; prioritize `transform` and
`opacity` for animation; avoid unnecessary permanent animation loops; avoid
WebGL, canvas, autoplay video, or sound for essential content; keep essential
content visible without JavaScript-driven animation; and avoid unapproved heavy
dependencies.

Rationale: the project has a narrow academic scope and should stay fast,
portable, reviewable, and simple to deploy.

### V. Academic and Responsible Cybersecurity

Cybersecurity content MUST remain focused on digital literacy, prevention,
privacy, source verification, safe student habits, respectful online
interaction, and critical thinking. It MUST NOT include offensive-security
instructions, exploit workflows, credential theft procedures, malware
implementation, evasion advice, or operational material that enables abuse. The
project MUST NOT invent statistics, claims, sources, institutional data, or
security guarantees.

Rationale: the project teaches students practical safety without romanticizing
attacks or producing material that could be misused.

## Product Scope and Constraints

The project is a responsive, single-page academic website. It uses one
continuous educational experience with three conceptual macro phases:

- Introduction: subject, academic context, and purpose.
- Educational journey: five data-driven topic chapters with overview,
  problem/action/checklist rhythm, and direct navigation.
- Conclusion and evaluation: final summary, prominent Google Forms evaluation
  CTA, acknowledgment, and footer.

The detailed order and behavior of the page are governed by `design.md`. Google
Forms remains the only required external connection and MUST appear near the end
of the journey through an accessible link or embed.

Authentication, user accounts, databases, admin interfaces, full course
platforms, complex quizzes, cybersecurity simulators, gamification systems,
additional external service integrations, separate routes for each topic, and a
custom backend for the evaluation form are out of scope unless explicitly
approved.

## Development Workflow and Quality

Before planning or implementing work, agents MUST read:

1. This constitution.
2. `design.md`.
3. `AGENTS.md`.
4. The current feature spec and plan, when present.
5. Relevant local framework documentation, including Next.js docs when required.

Specs and plans MUST explicitly check Brazilian Portuguese interface copy,
English documentation, data-driven topic content, single-page narrative
architecture, compliance with `design.md`, responsive and reduced-motion
behavior, accessibility, Google Forms placement, dependency restrictions, and
academic cybersecurity scope. Implementation tasks MUST NOT begin with complex
hero animation before page hierarchy, topic navigation, guidance-card behavior,
and static accessibility are stable.

For changes affecting components, pages, styles, configuration, dependencies,
content imports, navigation, or animation, delivery MUST include `npm run lint`
and `npm run build`. Manual verification MUST cover keyboard navigation, skip
link, focus visibility, topic anchors, sticky guidance sequence, reduced-motion
behavior, mobile layout, short landscape layout, 200% zoom, no horizontal
overflow, Google Forms CTA, image alternative text, and content visibility
without animation. If a command or manual check cannot be completed, the
delivery report MUST state exactly what was not verified and why.

A feature is not complete merely because it builds. Completion requires
constitution compliance, all applicable hard constraints in `design.md`,
preserved educational meaning, correct responsive behavior, keyboard
accessibility, reduced-motion support, no unintended overflow or clipping, no
unapproved dependency, lint and build results, and a delivery summary listing
files changed, components added or removed, major design decisions, validation
completed, and known limitations.

## Governance

This constitution governs product values, scope, durable engineering rules,
content, documentation, design compliance, and implementation decisions. In case
of conflict, precedence is:

1. This constitution for product values, scope, and durable engineering rules.
2. `design.md` for detailed visual and interaction implementation.
3. Feature specs and plans for approved feature-specific behavior.
4. Informal preferences and generic boilerplate.

A feature document may refine `design.md`, but it may not silently contradict it.
A deliberate exception MUST be identified in the spec and explicitly approved.

Amendments MUST document the change, rationale, impacted files, and version
classification:

- MAJOR for redefining or removing core principles.
- MINOR for adding principles, required sections, or product constraints.
- PATCH for wording, clarification, or correction without changing rules.

Every relevant spec, plan, or task list MUST include a compliance check against
these principles. Reviews MUST reject work that ignores `design.md`, references
`theme-vibe.md` as active guidance, breaks the data-driven content model,
hardcodes the five topics unnecessarily, hides essential content behind
animation or hover, lacks reduced-motion behavior, causes horizontal overflow or
clipping, weakens the evaluation CTA, violates the interface/documentation
language split, adds unapproved dependencies, introduces unnecessary application
complexity, or leaves accessibility failures unresolved.

**Version**: 2.1.0 | **Ratified**: 2026-06-16 | **Last Amended**: 2026-06-30
