# Tasks: Draggable Topic Card Redesign

**Input**: Design documents from `specs/005-draggable-topic-cards/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md),
[research.md](./research.md), [data-model.md](./data-model.md),
[UI contract](./contracts/topic-rail-ui.md), [quickstart.md](./quickstart.md)

**Tests**: No automated test suite was requested. Tasks include required lint,
build, responsive, accessibility, gesture, motion, and fragment checks from the
specification.

**Organization**: Tasks are grouped by user story. Every story ends with an
independent validation checkpoint.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it changes no shared file or touches a
  different file.
- **[Story]**: Maps task to US1, US2, or US3.
- All paths are repository-relative.

## Phase 1: Setup

**Purpose**: Confirm implementation baseline and local framework rules.

- [X] T001 Review installed versions and confirm no package change is needed in `package.json`
- [X] T002 [P] Read Client Component, linking, CSS, and accessibility rules in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`, `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`, and `node_modules/next/dist/docs/03-architecture/accessibility.md`
- [X] T003 [P] Record the current chooser, Content boundary, and page composition baseline from `app/components/TopicChooser.tsx`, `app/components/ScrollExpandingSection.tsx`, and `app/page.tsx` before editing

---

## Phase 2: Foundational

**Purpose**: Establish shared typed content and preserve page-level constraints.

**Critical**: Complete before any user-story work.

- [X] T004 Replace `ctaLabel` with typed `TopicIconKey` values and apply the five approved simplified pt-BR titles/descriptions in `data/content.ts`
- [X] T005 Verify the five topic IDs remain unique, ordered, and mapped one-to-one to existing same-section destinations consumed by `app/components/TopicChooser.tsx`

**Checkpoint**: Typed content is ready; no CTA label, package change, new route,
Hero change, or Conclusion change exists.

---

## Phase 3: User Story 1 - Discover the Interactive Topic Rail (Priority: P1) MVP

**Goal**: Present a dark Content-section chooser with five equal-priority tall
cards, icons, concise copy, and primary hover/focus treatment.

**Independent Test**: At 390x844 and 1280x720, complete the existing Content
intro and confirm five ordered portrait cards, topic icons, simplified copy,
mobile neighbor peeks, at least four visible desktop cards, and no inner CTA.

### Implementation for User Story 1

- [X] T006 [US1] Create scoped rail geometry, 82% mobile card width, centered peeks, desktop portrait sizing, dark-surface layout, card states, and reduced-motion transition rules in `app/components/TopicChooser.module.css`
- [X] T007 [US1] Convert `app/components/TopicChooser.tsx` into the narrow Client Component, map typed icon keys to `react-icons/fa6`, and render each complete card as one native fragment anchor containing icon, title, and description
- [X] T008 [P] [US1] Validate content order, icon consistency, no default featured card, and absence of `Ver orientações` against `data/content.ts` and `app/components/TopicChooser.tsx`
- [ ] T009 [P] [US1] Validate 390x844 and 1280x720 visual composition, card text wrapping, WCAG AA blue hover/focus contrast, and zero body overflow for `app/components/TopicChooser.module.css`

**Checkpoint**: US1 works as a static, responsive, whole-card topic rail and is
independently reviewable without drag behavior.

---

## Phase 4: User Story 2 - Drag Through Topics (Priority: P2)

**Goal**: Let mouse, pen, and touch users drag the rail, then settle on the
nearest valid card without unintended navigation.

**Independent Test**: Perform ten mouse/touch drags including slow, fast,
first-boundary, and last-boundary gestures; every gesture moves the rail, snaps
within 350 ms, reveals no blank end, and triggers zero fragment navigations.

### Implementation for User Story 2

- [X] T010 [US2] Add rail refs and transient pointer state with the 8-pixel horizontal-dominant drag threshold, pointer capture, direct `scrollLeft`, and animation cancellation in `app/components/TopicChooser.tsx`
- [X] T011 [US2] Add nearest-center calculation, clamped first/last offsets, cancellable 280 ms `requestAnimationFrame` settling, reduced-motion immediate positioning, and post-drag click suppression in `app/components/TopicChooser.tsx`
- [X] T012 [US2] Add animation-frame-throttled current-index tracking and five non-interactive mobile position markers in `app/components/TopicChooser.tsx`, then style neutral/current and dragging states in `app/components/TopicChooser.module.css`
- [ ] T013 [P] [US2] Validate mouse, pen, and touch dragging, vertical touch-page scrolling, click-threshold behavior, and zero unintended navigation against `app/components/TopicChooser.tsx`
- [ ] T014 [P] [US2] Validate first/last boundaries, 280 ms settling, rapid gesture cancellation, marker synchronization, and no rail/body overflow against `app/components/TopicChooser.tsx` and `app/components/TopicChooser.module.css`

**Checkpoint**: US2 drag, snap, boundary, and indicator behavior works without
breaking US1 presentation.

---

## Phase 5: User Story 3 - Open a Topic from the Whole Card (Priority: P3)

**Goal**: Preserve intentional native card navigation and full keyboard access
while keeping drag releases non-activating.

**Independent Test**: Activate all five cards by pointer/touch without dragging
and by keyboard Enter; each reaches only its matching Content destination. Tab
through all cards and confirm every focused card becomes fully readable.

### Implementation for User Story 3

- [X] T015 [US3] Finalize native anchor semantics, unique fragment destinations, focus-visible treatment, off-screen focus alignment, icon `aria-hidden`, and current-position status semantics in `app/components/TopicChooser.tsx`
- [ ] T016 [P] [US3] Run ten no-drag click/tap attempts plus Enter activation for all five anchors and verify matching destination IDs from `data/content.ts` in `app/components/TopicChooser.tsx`
- [ ] T017 [P] [US3] Validate DOM-order keyboard flow, readable focused-card alignment, unclipped outlines, status-marker semantics, and 200% zoom behavior in `app/components/TopicChooser.tsx` and `app/components/TopicChooser.module.css`

**Checkpoint**: All three stories work together; card activation remains native,
unique, keyboard-accessible, and protected from drag-release clicks.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify constitution, quality gates, and complete feature behavior.

- [X] T018 Run `npm run lint` using `package.json` and fix feature-caused errors in `data/content.ts`, `app/components/TopicChooser.tsx`, or `app/components/TopicChooser.module.css`
- [X] T019 Run `npm run build` using `package.json` and fix feature-caused TypeScript, Client Component, CSS Module, or production-build errors in `data/content.ts` and `app/components/TopicChooser.tsx`
- [ ] T020 Execute every responsive, gesture, keyboard, reduced-motion, 200% zoom, fragment, and overflow scenario in `specs/005-draggable-topic-cards/quickstart.md`
- [X] T021 Review `git diff --check` and the final diff for English documentation, pt-BR preventive copy, unchanged Hero/Conclusion, unchanged dependency set, and scope limited to `data/content.ts`, `app/components/TopicChooser.tsx`, `app/components/TopicChooser.module.css`, and `specs/005-draggable-topic-cards/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational and delivers visual MVP.
- **US2 (Phase 4)**: Depends on US1 rail markup and CSS geometry.
- **US3 (Phase 5)**: Depends on US1 anchors and US2 drag-click suppression.
- **Polish (Phase 6)**: Depends on all user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US1 (visual rail) -> US2 (drag/snap) -> US3 (activation/a11y) -> Polish
```

### Within Each User Story

- US1: scoped geometry before component consumes CSS classes; component before
  visual/content checks.
- US2: pointer state before snap; snap before current markers; implementation
  before gesture/boundary checks.
- US3: semantics and focus alignment before activation/accessibility checks.
- Lint and build pass before final quickstart and scope review.

### Parallel Opportunities

- T002 and T003 can run together after T001 starts.
- T008 and T009 can run together after T007.
- T013 and T014 can run together after T012.
- T016 and T017 can run together after T015.

### Parallel Example: User Story 1

```text
Task A: T008 content/icon/order review in data/content.ts and TopicChooser.tsx
Task B: T009 responsive/contrast/overflow review in TopicChooser.module.css
```

### Parallel Example: User Story 2

```text
Task A: T013 input and click-threshold validation
Task B: T014 boundary, timing, markers, and overflow validation
```

### Parallel Example: User Story 3

```text
Task A: T016 fragment activation checks
Task B: T017 keyboard, semantics, zoom, and focus checks
```

---

## Implementation Strategy

### MVP First: User Story 1

1. Complete Setup and Foundational phases.
2. Implement US1 dark horizontal rail and responsive cards.
3. Validate US1 independently at 390x844 and 1280x720.
4. Continue to drag only after visual/content baseline passes.

### Incremental Delivery

1. **Foundation**: typed simplified copy, IDs, icon keys.
2. **US1**: reference-inspired visual rail and full-card markup.
3. **US2**: pointer drag, deterministic snap, current markers.
4. **US3**: fragment activation, keyboard focus alignment, semantics.
5. **Polish**: lint, build, full quickstart, scope review.

## Notes

- Public copy stays Brazilian Portuguese; tasks/docs stay English.
- Add no dependency. Reuse `react-icons`, Motion reduced-motion support, and
  browser APIs already available.
- Keep the approved single-page narrative architecture; this feature changes the
  topic-choice portion of the educational journey only.
- Do not add detailed guidance, routes, backend, forms, search, auth, or data
  collection.
