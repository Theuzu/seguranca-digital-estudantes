# Tasks: Header Navigation

**Input**: Design documents from `/specs/010-header-navigation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/header-navigation-ui.md, quickstart.md

**Tests**: Include validation tasks because this feature has explicit layout, accessibility, anchor, motion, responsive, zoom, and build requirements.

**Organization**: Tasks grouped by user story so each story can ship and validate independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files.
- **[Story]**: User story label, such as US1, US2, or US3.
- Every task includes exact file path.

## Phase 1: Setup

**Purpose**: Confirm baseline and keep scope tight.

- [X] T001 Confirm current dependency versions and available scripts in `package.json`
- [X] T002 [P] Confirm active Spec Kit feature pointer is `specs/010-header-navigation` in `.specify/feature.json`
- [X] T003 [P] Re-read local Next.js hash-link behavior in `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md`
- [X] T004 [P] Re-read local Next.js client-boundary rules in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- [X] T005 [P] Confirm header constraints, anchor offsets, reduced motion, and responsive matrix in `design.md`

---

## Phase 2: Foundational

**Purpose**: Shared header data, anchors, and offsets that block all stories.

- [X] T006 Define header destination IDs for top, content intro, topic overview, five topics, and evaluation in `app/page.tsx`
- [X] T007 [P] Add or verify durable page-level scroll padding and reduced-motion scroll behavior in `app/globals.css`
- [X] T008 [P] Add or verify target-level scroll margins for topic and evaluation regions in `app/components/TopicDetailSection.tsx`
- [X] T009 [P] Add or verify target-level scroll margins for content intro and topic overview regions in `app/components/ContentSection.tsx`
- [X] T010 [P] Add or verify a specific evaluation anchor target inside the conclusion/evaluation area in `app/components/ConclusionSection.tsx`
- [X] T011 Define shared header navigation item types and derivation helpers from `data/content.ts` and `data/conclusion.ts` in `app/components/SiteHeader.tsx`
- [X] T012 Confirm no header topic labels are duplicated outside existing data sources in `app/components/SiteHeader.tsx`

**Checkpoint**: Shared anchors and header data ready; user stories can begin.

---

## Phase 3: User Story 1 - Understand and Use the Site Map (Priority: P1) MVP

**Goal**: Student sees project identity, site parts, topics entry, and primary evaluation action from the header.

**Independent Test**: Load first viewport and confirm header shows `SeguranÃ§a Digital`, `Temas`, `Sobre`, and primary `AvaliaÃ§Ã£o`; activate `Sobre` and `AvaliaÃ§Ã£o` and confirm targets are visible below header.

### Implementation for User Story 1

- [X] T013 [US1] Create responsive `SiteHeader` shell with project identity, `Temas`, `Sobre`, and primary `AvaliaÃ§Ã£o` in `app/components/SiteHeader.tsx`
- [X] T014 [US1] Integrate `SiteHeader` before main page content without making `app/page.tsx` a Client Component in `app/page.tsx`
- [X] T015 [US1] Style desktop and mobile header states with design tokens, max 72px height, visible focus, and primary evaluation action in `app/components/SiteHeader.tsx`
- [X] T016 [US1] Add scrolled contrast state after hero with subtle divider and no large viewport blur in `app/components/SiteHeader.tsx`
- [X] T017 [US1] Ensure `Sobre` and `AvaliaÃ§Ã£o` links are anchors and preserve final-section evaluation context in `app/components/SiteHeader.tsx`

### Checks for User Story 1

- [X] T018 [P] [US1] Check first viewport orientation and scrolled header contrast at 1280x800 and 390x844 using `specs/010-header-navigation/quickstart.md`
- [X] T019 [P] [US1] Check keyboard tab order, visible focus, skip-link interaction, and header touch targets using `specs/010-header-navigation/quickstart.md`
- [X] T020 [US1] Run `npm run lint` and record result for header shell changes using `package.json`
- [X] T021 [US1] Run `npm run build` and record result for header shell changes using `package.json`

**Checkpoint**: MVP header map works independently.

---

## Phase 4: User Story 2 - Navigate Directly to a Topic (Priority: P2)

**Goal**: Student opens `Temas`, sees all five topics in order, and lands at chosen chapter without header overlap.

**Independent Test**: From header, open topics panel, choose each topic, and confirm matching chapter title and number are visible below header; reduced-motion mode reaches same targets without decorative smooth-scroll.

### Implementation for User Story 2

- [X] T022 [US2] Add compact `Temas` button state, ARIA expanded controls, and panel open/close behavior in `app/components/SiteHeader.tsx`
- [X] T023 [US2] Render five topic links from existing topic data in correct order in `app/components/SiteHeader.tsx`
- [X] T024 [US2] Add Escape close and focus return to `Temas` trigger in `app/components/SiteHeader.tsx`
- [X] T025 [US2] Close compact topics panel after selecting any topic destination in `app/components/SiteHeader.tsx`
- [X] T026 [US2] Add reduced-motion-aware navigation enhancement while preserving native anchor fallback in `app/components/SiteHeader.tsx`
- [X] T027 [US2] Verify all topic chapter IDs match header link hrefs in `app/components/TopicDetailSection.tsx`

### Checks for User Story 2

- [X] T028 [P] [US2] Check topic panel order and direct navigation for all five topics using `specs/010-header-navigation/quickstart.md`
- [X] T029 [P] [US2] Check Escape close, focus return, keyboard reachability, and no keyboard trap using `specs/010-header-navigation/quickstart.md`
- [X] T030 [P] [US2] Check reduced-motion topic navigation and no decorative smooth-scroll using `specs/010-header-navigation/quickstart.md`
- [X] T031 [US2] Run `npm run lint` and record result for topic navigation changes using `package.json`
- [X] T032 [US2] Run `npm run build` and record result for topic navigation changes using `package.json`

**Checkpoint**: Topic navigation works independently after MVP header.

---

## Phase 5: User Story 3 - Stay Oriented While Reading (Priority: P3)

**Goal**: Header remains quiet while showing current page part or topic as student scrolls.

**Independent Test**: Scroll through intro, overview, topics, final summary, and evaluation; confirm header stays readable and current-location cue works without color-only meaning.

### Implementation for User Story 3

- [X] T033 [US3] Add active section/topic observation with null-safe fallback in `app/components/SiteHeader.tsx`
- [X] T034 [US3] Add non-color-only active cue for current page part or topic in `app/components/SiteHeader.tsx`
- [X] T035 [US3] Ensure active-state updates avoid high-frequency React state churn in `app/components/SiteHeader.tsx`
- [X] T036 [US3] Confirm active cue does not overlap content or safe areas on mobile in `app/components/SiteHeader.tsx`
- [X] T037 [US3] Add reduced-motion/static behavior for active-state and panel transitions in `app/components/SiteHeader.tsx`

### Checks for User Story 3

- [X] T038 [P] [US3] Check active header state while scrolling through all page regions using `specs/010-header-navigation/quickstart.md`
- [X] T039 [P] [US3] Check 200% zoom, mobile widths, and no horizontal overflow for header active state using `specs/010-header-navigation/quickstart.md`
- [X] T040 [P] [US3] Check no-JavaScript or failure-safe anchor behavior for header links using `specs/010-header-navigation/quickstart.md`
- [X] T041 [US3] Run `npm run lint` and record result for active-state changes using `package.json`
- [X] T042 [US3] Run `npm run build` and record result for active-state changes using `package.json`

**Checkpoint**: Full header navigation experience works.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full feature validation and cleanup.

- [X] T043 [P] Review public header labels for Brazilian Portuguese clarity and no unsupported cybersecurity claims in `app/components/SiteHeader.tsx`
- [X] T044 [P] Review AppyCamper inspiration constraints, no copied branding/assets/exact composition, in `app/components/SiteHeader.tsx`
- [X] T045 [P] Check required responsive matrix 360x800, 390x844, 768x1024, 1024x768, 1280x800, 1440x900, and 1920x1080 using `specs/010-header-navigation/quickstart.md`
- [X] T046 [P] Check final Google Forms CTA remains prominent after header evaluation navigation in `app/components/ConclusionSection.tsx`
- [X] T047 [P] Check topic overview and existing topic chooser behavior is not regressed by header navigation in `app/components/TopicChooser.tsx`
- [X] T048 [P] Check sticky guidance cards are not obscured by header or scroll offset changes in `app/components/TopicDetailSection.tsx`
- [X] T049 Run final `npm run lint` for full feature using `package.json`
- [X] T050 Run final `npm run build` for full feature using `package.json`
- [X] T051 Update implementation notes and known validation gaps in `specs/010-header-navigation/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: T001-T005 no dependencies.
- **Foundational**: T006-T012 depend on Setup and block all stories.
- **US1 MVP**: T013-T021 depend on Foundational.
- **US2 Topic Navigation**: T022-T032 depend on US1 shell.
- **US3 Orientation**: T033-T042 depend on US1 shell and benefits from US2 destinations.
- **Polish**: T043-T051 depend on selected stories.

### Story Dependencies

- **US1**: MVP. Can ship first.
- **US2**: Needs US1 `SiteHeader` shell.
- **US3**: Needs US1 shell and topic/evaluation anchors; can be implemented after US2 or in parallel after T022-T027 are stable.

### Within Each Story

- Structure before styling.
- Anchors and offsets before smooth-scroll enhancement.
- Native link behavior before Motion/Lenis enhancement.
- Static accessibility before active-state polish.
- Reduced-motion behavior before final animation tuning.

## Parallel Opportunities

- T002-T005 can run in parallel.
- T007-T010 can run in parallel after T006.
- T018-T019 can run in parallel after T017.
- T028-T030 can run in parallel after T027.
- T038-T040 can run in parallel after T037.
- T043-T048 can run in parallel after user stories complete.

## Parallel Example: US1

```text
Task A: T018 check first viewport and scrolled contrast via quickstart
Task B: T019 check keyboard, focus, skip link, and touch targets via quickstart
```

## Parallel Example: US2

```text
Task A: T028 check five-topic order and destinations
Task B: T029 check Escape/focus/keyboard panel behavior
Task C: T030 check reduced-motion navigation
```

## Parallel Example: US3

```text
Task A: T038 check active state during full scroll
Task B: T039 check 200% zoom and overflow
Task C: T040 check no-JavaScript anchor fallback
```

## Implementation Strategy

### MVP First

Complete T001-T021. This delivers the visible header map with project identity,
main page parts, and evaluation navigation.

### Incremental Delivery

1. Add direct topic panel and topic anchors with T022-T032.
2. Add active/current-location state with T033-T042.
3. Run full responsive, accessibility, motion, and build polish with T043-T051.

### Notes

- Website copy is Brazilian Portuguese; docs stay English.
- Do not add dependencies.
- Do not hardcode five unrelated topic copies outside the existing content data.
- Do not make `app/page.tsx` a Client Component.
- Keep anchors functional without JavaScript-driven animation.

