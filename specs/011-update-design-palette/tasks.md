# Tasks: Update Design Palette

**Input**: Design documents from `specs/011-update-design-palette/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md),
[research.md](./research.md), [data-model.md](./data-model.md),
[contracts/palette-token-contract.md](./contracts/palette-token-contract.md),
[quickstart.md](./quickstart.md)

**Tests**: This feature requires validation checks because it changes global
styles, governance, contrast, focus, and responsive visual behavior. No formal
test suite is added; use source checks, lint/build, and manual verification.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently. The governance story is listed before
the student-facing palette story because the constitution currently conflicts
with the requested palette and must be resolved before implementation.

## Phase 1: Setup

**Purpose**: Confirm the existing baseline and locate active palette usage.

- [X] T001 Confirm active feature pointer in `.specify/feature.json` matches `specs/011-update-design-palette`
- [X] T002 [P] Confirm dependency and script baseline in `package.json`
- [X] T003 [P] Re-read local Next CSS guidance in `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- [X] T004 [P] Re-read local Next Server/Client guidance in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- [X] T005 Inventory current old palette values and CSS variable mappings in `app/globals.css`
- [X] T006 [P] Inventory current old palette guidance in `design.md`
- [X] T007 [P] Inventory current palette-dependent component usage in `app/components/HeroSection.tsx`, `app/components/SiteHeader.tsx`, `app/components/TopicChooser.tsx`, `app/components/TopicDetailSection.tsx`, `app/components/ScrollExpandingSection.tsx`, `app/components/ConclusionSection.tsx`, and `app/components/ConclusionSection.module.css`

---

## Phase 2: Foundational

**Purpose**: Define shared palette roles and validation rules that block all user stories.

- [X] T008 Define final semantic role mapping for Ink Black, Ghost White, Dusk Blue, Rosy Copper, and Saffron in `specs/011-update-design-palette/contracts/palette-token-contract.md`
- [X] T009 Define old/new palette search patterns for implementation validation in `specs/011-update-design-palette/quickstart.md`
- [X] T010 Confirm no new dependency, route, backend, asset, or content-model change is needed in `specs/011-update-design-palette/plan.md`
- [X] T011 Confirm the expected no-content-change boundary for `data/content.ts` and `data/conclusion.ts` in `specs/011-update-design-palette/plan.md`

**Checkpoint**: Palette roles, scope boundaries, and validation checks are ready.

---

## Phase 3: User Story 2 - Update The Binding Design Document (Priority: P2)

**Goal**: Align governance and `design.md` so implementation no longer conflicts with the old one-accent dark-sky rule.

**Independent Test**: Inspect `.specify/memory/constitution.md` and `design.md` and confirm the old green single-accent palette is no longer active guidance, while the new palette roles and global Tailwind CSS variable rule are explicit.

### Checks for User Story 2

- [X] T012 [P] [US2] Verify current conflicting palette language in `.specify/memory/constitution.md`
- [X] T013 [P] [US2] Verify current conflicting palette language and old token block in `design.md`

### Implementation for User Story 2

- [X] T014 [US2] Update Sync Impact Report and version metadata for the palette amendment in `.specify/memory/constitution.md`
- [X] T015 [US2] Replace the old dark-sky one-accent palette rule with the new dark neutral palette and three support colors in `.specify/memory/constitution.md`
- [X] T016 [US2] Replace the active palette token block with the new palette and semantic roles in `design.md`
- [X] T017 [US2] Update `design.md` color usage rules for Dusk Blue, Rosy Copper, Saffron, Ink Black, Ghost White, borders, focus, shadow, caution, and CTA treatment
- [X] T018 [US2] Remove or rewrite old active references to dark-sky atmosphere and consistent green accent in `design.md`
- [X] T019 [US2] Verify `.specify/memory/constitution.md` and `design.md` are aligned with `specs/011-update-design-palette/contracts/palette-token-contract.md`

**Checkpoint**: Governance and design documentation support the requested palette.

---

## Phase 4: User Story 1 - Apply The New Dark Palette Consistently (Priority: P1) MVP

**Goal**: Make the rendered website read as the new dark palette, with Ink Black as the dominant background, Ghost White as primary text, and Dusk Blue, Rosy Copper, and Saffron as support colors.

**Independent Test**: Review the website top-to-bottom and confirm header, hero, topic overview, topic chapters, sticky guidance cards, checklist, final summary, and evaluation CTA use the new palette without old green/navy colors appearing.

### Checks for User Story 1

- [X] T020 [P] [US1] Run pre-change source search for old palette values in `app/globals.css` and `app/components`
- [X] T021 [P] [US1] Identify contrast-sensitive text, focus, border, and CTA pairings in `app/components/ConclusionSection.module.css`

### Implementation for User Story 1

- [X] T022 [US1] Replace `:root` palette variables with the new semantic palette in `app/globals.css`
- [X] T023 [US1] Replace `@theme inline` color mappings with CSS-variable-backed Tailwind tokens in `app/globals.css`
- [X] T024 [US1] Add support-color Tailwind mappings for Dusk Blue, Rosy Copper, and Saffron in `app/globals.css`
- [X] T025 [US1] Update hero gradients, decorative surfaces, borders, shadows, and accent usage in `app/components/HeroSection.tsx`
- [X] T026 [US1] Update header background, navigation, menu, hover, and focus color usage in `app/components/SiteHeader.tsx`
- [X] T027 [US1] Update topic overview cards, grid background, hover states, and progress indicators in `app/components/TopicChooser.tsx`
- [X] T028 [US1] Update topic chapter backgrounds, sticky guidance cards, checklist indicators, borders, and focus colors in `app/components/TopicDetailSection.tsx`
- [X] T029 [US1] Update scroll-expanding intro card token usage in `app/components/ScrollExpandingSection.tsx`
- [X] T030 [US1] Update conclusion JSX token classes in `app/components/ConclusionSection.tsx`
- [X] T031 [US1] Update final summary, evaluation CTA, borders, shadows, hover states, and focus states in `app/components/ConclusionSection.module.css`
- [X] T032 [US1] Verify rendered sections still preserve responsive layout, sticky card readability, reduced-motion behavior, and Google Forms CTA priority using `specs/011-update-design-palette/quickstart.md`

**Checkpoint**: Student-facing website uses the new palette consistently.

---

## Phase 5: User Story 3 - Prevent Scattered Color Implementation (Priority: P3)

**Goal**: Prove the palette is centralized in global Tailwind CSS variables and not scattered through inline styles or duplicated component constants.

**Independent Test**: Search app source for old palette values, new palette hex values, and inline color styles; only global token declarations and approved documentation should contain raw palette hex values.

### Checks for User Story 3

- [X] T033 [P] [US3] Search for raw new palette hex values across `app`, `design.md`, `.specify/memory/constitution.md`, and `specs/011-update-design-palette`
- [X] T034 [P] [US3] Search for old palette hex values across `app`, `design.md`, and `.specify/memory/constitution.md`
- [X] T035 [P] [US3] Search for inline color, background, border, boxShadow, and hex usage in `app`

### Implementation for User Story 3

- [X] T036 [US3] Remove any remaining raw palette hex values outside `app/globals.css` from `app/components/HeroSection.tsx`, `app/components/SiteHeader.tsx`, `app/components/TopicChooser.tsx`, `app/components/TopicDetailSection.tsx`, `app/components/ScrollExpandingSection.tsx`, and `app/components/ConclusionSection.tsx`
- [X] T037 [US3] Remove any remaining raw palette hex values outside global tokens from `app/components/ConclusionSection.module.css`
- [X] T038 [US3] Convert any remaining component color styles to semantic Tailwind classes or CSS variables in `app/components`
- [X] T039 [US3] Document final source-search results in the implementation delivery report using `specs/011-update-design-palette/quickstart.md`

**Checkpoint**: Palette values are centralized and source-searchable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full feature across documentation, source, build, accessibility, and responsive behavior.

- [X] T040 [P] Run `npm run lint` and record results for `specs/011-update-design-palette/quickstart.md`
- [X] T041 Run `npm run build` and record results for `specs/011-update-design-palette/quickstart.md`
- [X] T042 [P] Validate WCAG AA contrast for body text, muted text, focus rings, topic cards, sticky guidance cards, and evaluation CTA in `app/components`
- [X] T043 [P] Validate required viewports from `design.md` for no horizontal overflow, readable wrapping, and CTA prominence in the running website
- [X] T044 [P] Validate keyboard navigation, skip link, topic anchors, focus visibility, 200% zoom, and reduced-motion behavior using `specs/011-update-design-palette/quickstart.md`
- [X] T045 Review final diffs for unrelated churn in `.specify/memory/constitution.md`, `design.md`, `app/globals.css`, `app/components`, `data/content.ts`, and `data/conclusion.ts`
- [X] T046 Update the final implementation notes with changed files, palette roles, validation completed, and known limitations in `specs/011-update-design-palette/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; defines shared roles and validation boundaries.
- **US2 Governance/Design Docs (Phase 3)**: Depends on Foundational; must finish before app implementation because the current constitution conflicts with the requested palette.
- **US1 Student-Facing Palette (Phase 4)**: Depends on US2; delivers the visible palette MVP.
- **US3 Token Centralization (Phase 5)**: Depends on US1; proves implementation discipline after color usage is updated.
- **Polish (Phase 6)**: Depends on US1 and US3.

### User Story Dependencies

- **US2 -> US1**: Governance and `design.md` must be aligned before app palette work.
- **US1 -> US3**: App token and component updates must exist before final source centralization checks.

### Within Each User Story

- Documentation/guidance before app token changes.
- `app/globals.css` token changes before component color changes.
- Component updates before full-page visual validation.
- Source searches before and after cleanup.

## Parallel Opportunities

- T002, T003, T004, T006, and T007 can run in parallel after T001.
- T012 and T013 can run in parallel because they inspect different docs.
- T020 and T021 can run in parallel before app palette edits.
- T025 through T031 touch different component files and can be split after T022 through T024 are complete.
- T033, T034, and T035 can run in parallel during centralization validation.
- T040, T042, T043, and T044 can run in parallel after implementation, while T041 should run after code cleanup is stable.

## Parallel Execution Examples

### User Story 2

```text
T012 Verify current conflicting palette language in .specify/memory/constitution.md
T013 Verify current conflicting palette language and old token block in design.md
```

### User Story 1

```text
After T022-T024:
T025 Update app/components/HeroSection.tsx
T026 Update app/components/SiteHeader.tsx
T027 Update app/components/TopicChooser.tsx
T028 Update app/components/TopicDetailSection.tsx
T029 Update app/components/ScrollExpandingSection.tsx
T030 Update app/components/ConclusionSection.tsx
T031 Update app/components/ConclusionSection.module.css
```

### User Story 3

```text
T033 Search new palette hex usage
T034 Search old palette hex usage
T035 Search inline color style usage
```

## Implementation Strategy

### MVP First

Complete Phase 1, Phase 2, Phase 3, and Phase 4. This resolves the governance conflict and delivers the visible dark palette update.

### Incremental Delivery

1. Establish inventory and roles.
2. Align constitution and `design.md`.
3. Update global tokens.
4. Update current app component usage.
5. Run source centralization checks.
6. Run lint/build and manual visual/accessibility validation.

### Scope Guardrails

- Do not rewrite cybersecurity content in `data/content.ts`.
- Do not change the Google Forms URL in `data/conclusion.ts`.
- Do not add dependencies, routes, backend services, theme providers, or new client boundaries.
- Do not turn the palette pass into a full layout redesign.
