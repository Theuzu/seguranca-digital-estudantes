# Tasks: Update Hero Page

**Input**: Design documents from `specs/002-update-hero-page/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/hero-ui.md, quickstart.md

**Tests**: Lint/build plus responsive and reduced-motion checks.

## Phase 1: Setup

**Purpose**: Confirm existing project baseline before edits.

- [X] T001 Confirm package setup in package.json
- [X] T002 Confirm ignore/config coverage in .gitignore and eslint.config.mjs
- [X] T003 Read relevant Next.js docs for app/page.tsx, app/globals.css, and app/layout.tsx

---

## Phase 2: Foundational

**Purpose**: Lock hero design rules before implementation.

- [X] T004 Confirm required hero text and UI contract in specs/002-update-hero-page/contracts/hero-ui.md
- [X] T005 Confirm theme constraints in theme-vibe.md

---

## Phase 3: User Story 1 - View a Fullscreen Hero (Priority: P1) MVP

**Goal**: Make the hero stage fill the full viewport edge-to-edge.

**Independent Test**: Open the homepage and confirm the hero stage touches all viewport edges on desktop and mobile.

- [X] T006 [US1] Update homepage hero markup in app/page.tsx for fullscreen title/subtitle-only content
- [X] T007 [US1] Update fullscreen responsive stage styles in app/globals.css

---

## Phase 4: User Story 2 - Match the Reference Design Direction (Priority: P2)

**Goal**: Match the reference layout and typography direction.

**Independent Test**: Compare homepage against the reference image for centered hierarchy, split title feel, soft cloudy background, and retro texture.

- [X] T008 [US2] Update font imports/variables in app/layout.tsx for split title typography
- [X] T009 [US2] Update reference-inspired background, texture, split title, and motion styles in app/globals.css

---

## Phase 5: User Story 3 - Keep Required Current Text (Priority: P3)

**Goal**: Preserve exact title and subtitle.

**Independent Test**: Confirm visible hero text contains exactly the required title and subtitle.

- [X] T010 [US3] Verify required title/subtitle text in app/page.tsx

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate implementation against spec and quality checks.

- [X] T011 Run npm run lint
- [X] T012 Run npm run build
- [X] T013 Run responsive/reduced-motion quickstart checks from specs/002-update-hero-page/quickstart.md

---

## Dependencies & Execution Order

- Setup blocks all implementation.
- Foundational blocks user stories.
- US1 before US2 because reference styling depends on fullscreen structure.
- US3 verification after markup/styling.
- Polish after all stories.

## Notes

- Website visible text remains the exact title/subtitle only.
- Docs remain English.
- No backend, routes, Content, or Conclusion work.
