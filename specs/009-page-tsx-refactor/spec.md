# Feature Specification: Page.tsx Refactor

**Feature Branch**: `[009-page-tsx-refactor]`

**Created**: 2026-06-24

**Status**: Draft

**Input**: User description: "Lets create a spec for refactoring the page.tsx section. Also change the CSS to tailwind inline styles at the hero component."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read and Maintain page.tsx as a Thin Shell (Priority: P1)

A developer opens `page.tsx` and sees only top-level section assembly with no inline section markup, no data-wiring props, and no CSS class references to global hero styles.

**Why this priority**: The core goal is extracting concerns out of `page.tsx`. This story defines the primary success condition.

**Independent Test**: Open `page.tsx` and confirm it contains fewer than 10 meaningful lines of JSX composition (excluding imports and component declarations).

**Acceptance Scenarios**:

1. **Given** the refactored page is loaded, **When** a developer opens `page.tsx`, **Then** the file contains exactly three top-level children: `<HeroSection />`, `<ContentSection />`, and `<ConclusionSection />`.
2. **Given** the refactored page is loaded, **When** a developer inspects `page.tsx`, **Then** no inline hero markup (title, subtitle, GitHub icon, hero divs) exists in the file.
3. **Given** the refactored page is loaded, **When** a developer inspects `page.tsx`, **Then** no data imports such as `contentIntro`, `topicChooser`, or `topicDetails` are present.

---

### User Story 2 - Maintain Hero Section in One Place (Priority: P1)

A developer needs to update the hero presentation and finds all hero markup, styling, and animations self-contained inside `app/components/HeroSection.tsx`.

**Why this priority**: The hero currently has markup in `page.tsx` and CSS scattered across `globals.css`. This story ensures the extraction actually consolidates the hero.

**Independent Test**: Navigate to `app/components/HeroSection.tsx` and confirm the file contains the full hero JSX and all hero styling (Tailwind utilities + inline style objects for complex values).

**Acceptance Scenarios**:

1. **Given** the hero extraction is complete, **When** a developer opens `globals.css`, **Then** no `.hero-*` class selectors remain.
2. **Given** the hero extraction is complete, **When** a developer opens `HeroSection.tsx`, **Then** all hero background gradients, pseudo-element effects, and decorative overlays are expressed through Tailwind utilities or inline `style` objects.
3. **Given** the hero extraction is complete, **When** a developer inspects the hero at mobile and desktop viewports, **Then** the hero looks visually identical to the pre-refactor version.

---

### User Story 3 - Edit Content Section Composition Separately (Priority: P2)

A developer needs to change how the topic chooser and topic details relate inside the Content section and finds a single component (`ContentSection.tsx`) that owns that composition.

**Why this priority**: The Content section currently mixes `ScrollExpandingSection` wrapping logic with `page.tsx` orchestration. Encapsulating it reduces cross-file editing when adjusting section layout.

**Independent Test**: Open `ContentSection.tsx` and confirm it imports `contentIntro`, `topicChooser`, and `topicDetails` from `data/` and renders the `ScrollExpandingSection` wrapping `TopicChooser` and `TopicDetailSection`.

**Acceptance Scenarios**:

1. **Given** the Content section extraction is complete, **When** a developer opens `ContentSection.tsx`, **Then** the data imports `contentIntro`, `topicChooser`, and `topicDetails` are present inside this file rather than `page.tsx`.
2. **Given** the Content section extraction is complete, **When** a developer opens `ContentSection.tsx`, **Then** it renders `<ScrollExpandingSection content={contentIntro}>` containing `<TopicChooser content={topicChooser} />` and `<TopicDetailSection topics={topicDetails} />`.

---

### User Story 4 - Remove Global CSS After Hero Inlining (Priority: P2)

A developer audits the project styles and finds no dead hero-related selectors in the global stylesheet.

**Why this priority**: Leaving orphaned CSS selectors creates technical debt and confuses future contributors.

**Independent Test**: Search `globals.css` for `.hero-` and confirm zero matches.

**Acceptance Scenarios**:

1. **Given** the refactor is complete, **When** a search is performed for `.hero-stage`, `.hero-grain`, `.hero-clouds`, `.hero-frame`, `.hero-content`, `.hero-title`, `.hero-title-row`, `.hero-title-smooth`, `.hero-title-pixel`, `.hero-subtitle`, or `.hero-github` in `globals.css`, **Then** no matches are found.
2. **Given** the refactor is complete, **When** the `@keyframes hero-rise`, `hero-title-rise`, `hero-cloud-drift`, and `hero-light-sweep` declarations are checked, **Then** they remain in `globals.css` (keyframes cannot be inlined).

### Edge Cases

- Complex CSS gradients and pseudo-element effects must look identical before and after refactoring; visual diff tools should confirm zero visible change.
- The hero grain overlay (`radial-gradient` + `linear-gradient` pattern) must preserve its 0.24 opacity and 6px/4px background sizing.
- The hero frame (`border`, `border-radius`, `box-shadow`) must preserve its `clamp()`-driven responsive sizing.
- The `@media (max-width: 720px)` overrides for hero content width, gap, and title sizes must continue to apply at the correct breakpoints.
- The `prefers-reduced-motion` media query must continue to disable hero entry animations.
- The `ScrollExpandingSection` wrapping behavior must not shift or flicker due to the extraction — the component tree keeps the same nesting.
- The `HeroSection` extraction must preserve the `aria-labelledby="hero-title"` and `aria-hidden="true"` attributes for accessibility.
- Data imports that were previously centralized in `page.tsx` must not duplicate content in memory after the move into child components.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The refactored `page.tsx` MUST render exactly three top-level components: `<HeroSection />`, `<ContentSection />`, and `<ConclusionSection />`.
- **FR-002**: The `HeroSection` component MUST contain all hero JSX currently inline in `page.tsx` (hero stage, grain, clouds, frame, content div, title, subtitle, GitHub icon span).
- **FR-003**: The `HeroSection` component MUST apply all hero visual styling through Tailwind CSS utility classes or inline `style` objects, replacing every `.hero-*` class selector.
- **FR-004**: The `HeroSection` component MUST visually preserve the effect of CSS pseudo-elements (`::before` and `::after` on `.hero-stage` and `.hero-content`) through either Tailwind `before:`/`after:` variants, explicit `<div>` elements, or inline `style` objects.
- **FR-005**: The `HeroSection` component MUST preserve the `@keyframes`-driven entry animations (`hero-rise`, `hero-title-rise`) and ambient animations (`hero-cloud-drift`, `hero-light-sweep`). These `@keyframes` MAY remain in `globals.css` since they cannot be inlined.
- **FR-006**: The `HeroSection` component MUST respect `prefers-reduced-motion` by using `useReducedMotion()` from `motion/react` to disable entry animations when the user prefers reduced motion.
- **FR-007**: The `HeroSection` component MUST preserve all existing `aria-*` attributes and semantic HTML structure (section, h1, p, span with roles).
- **FR-008**: After extracting hero styles, all `.hero-*` class selectors MUST be removed from `globals.css`.
- **FR-009**: The `@keyframes hero-rise`, `hero-title-rise`, `hero-cloud-drift`, and `hero-light-sweep` MAY remain in `globals.css` as they do not reference `.hero-*` selectors and are runtime animation definitions.
- **FR-010**: The `@media (max-width: 720px)` responsive overrides for the hero MUST be replaced with responsive Tailwind breakpoint classes or arbitrary value queries (e.g., `max-720px:`).
- **FR-011**: The `ContentSection` component MUST encapsulate the `ScrollExpandingSection` composition — it MUST render `<ScrollExpandingSection content={contentIntro}>` wrapping `<TopicChooser content={topicChooser} />` and `<TopicDetailSection topics={topicDetails} />`.
- **FR-012**: The `ContentSection` component MUST import its own data (`contentIntro`, `topicChooser`, `topicDetails`) from `data/content.ts` instead of receiving them as props from `page.tsx`.
- **FR-013**: The `ContentSection` component MUST be a server component (no `"use client"` directive), since `ScrollExpandingSection` already carries its own client boundary.
- **FR-014**: The `page.tsx` MUST remove the `contentIntro`, `topicChooser`, and `topicDetails` data imports after the `ContentSection` extraction.
- **FR-015**: The `page.tsx` MUST keep the `FaGithub` import from `react-icons/fa6` (user preference to not move it).
- **FR-016**: The overall HTML output rendered in the browser MUST be functionally and visually identical to the pre-refactor output; no component logic, behavior, or visible styling MAY change.
- **FR-017**: The conclusion section (`ConclusionSection`) MUST NOT be modified or moved as part of this refactor.
- **FR-018**: The feature MUST NOT add new runtime dependencies. Only existing project dependencies (React, Next.js, Tailwind CSS, Motion, React Icons) MAY be used.
- **FR-019**: The feature MUST pass `npm run lint` and `npm run build` without new errors or warnings.
- **FR-020**: Project documentation for this feature MUST be written in English.

### Key Entities

- **page.tsx**: The App Router home page that currently assembles all sections. After refactoring, it becomes a thin shell composing `<HeroSection />`, `<ContentSection />`, and `<ConclusionSection />`.
- **HeroSection**: New component extracted from inline `page.tsx` markup, owning all hero presentation and styling.
- **ContentSection**: New server component encapsulating `ScrollExpandingSection`, `TopicChooser`, and `TopicDetailSection` composition.
- **Hero CSS Classes**: The set of `.hero-*` selectors in `globals.css` that must be converted to Tailwind inline styles and then removed from the global stylesheet.
- **Keyframe Animations**: `hero-rise`, `hero-title-rise`, `hero-cloud-drift`, `hero-light-sweep` — runtime animation definitions that remain in `globals.css`.
- **Reducer Motion Hook**: `useReducedMotion()` — used by `HeroSection` to respect accessibility preferences, same pattern already used by `ScrollExpandingSection`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `page.tsx` contains exactly 3 top-level JSX children (`<HeroSection />`, `<ContentSection />`, `<ConclusionSection />`) post-refactor.
- **SC-002**: `globals.css` contains zero `.hero-` class selectors after hero style extraction.
- **SC-003**: A `git diff` on the rendered page output shows zero differences when comparing pre-refactor and post-refactor builds (visual preservation verified by snapshot or manual comparison).
- **SC-004**: `npm run build` completes without errors.
- **SC-005**: `npm run lint` completes without new warnings.
- **SC-006**: On tested viewports (360px, 390px, 768px, 1280px), the hero section presents identical layout, gradients, frame, grain, title sizing, and entry animation behavior compared to the pre-refactor version.
- **SC-007**: With `prefers-reduced-motion: reduce` active, the hero section loads without entry animations (opacity, translate, blur transitions are immediate).
- **SC-008**: The `HeroSection` component file contains all hero JSX and all hero styling — no hero-related markup or CSS reference remains outside of it or `globals.css` (excluding `@keyframes`).

## Assumptions

- The refactor is purely structural — no intentional visual or behavioral changes.
- `@keyframes` cannot be expressed as Tailwind utilities or inline styles, so they remain in `globals.css` even though `.hero-*` selectors are removed.
- The `aria-labelledby` and `aria-hidden` patterns from the original inline markup are preserved in the extracted `HeroSection`.
- The `useReducedMotion()` approach follows the same pattern already established by `ScrollExpandingSection.tsx` in the same codebase.
- Complex multi-layered CSS gradients (stage background, grain pattern, cloud radial gradients) use inline `style` objects with the original CSS value strings, since Tailwind has no utility for nested gradient stacks.
- The `ContentSection` is a server component wrapping a client child tree (`ScrollExpandingSection`), following Next.js best practices for client boundary placement.
- The `fa6` import path for `FaGithub` remains in `page.tsx` per user preference, not moved into `HeroSection`.
