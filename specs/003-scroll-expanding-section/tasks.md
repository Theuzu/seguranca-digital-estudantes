# Tasks: Scroll-Expanding Content Section

**Input**: Design documents from `/specs/003-scroll-expanding-section/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/content-section-ui.md`, `quickstart.md`

**Tests**: Browser checks are included because card geometry, sticky overlap, reversible motion, reduced motion, responsive behavior, and zoom readability are explicit acceptance requirements.

**Organization**: Tasks are grouped by user story. This revision starts from the existing feature implementation and replaces its outdated `15svh`, four-corner radius, moving-Hero, and 80%-to-100% reveal behavior.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after its phase dependencies are complete because it touches a different file or performs an independent check.
- **[Story]**: Maps tasks to User Story 1, 2, or 3 from `spec.md`.
- Every task includes an exact repository path.

## Phase 1: Setup

**Purpose**: Confirm current framework rules and revision baseline before editing.

- [X] T001 [P] Review current Server/Client Component and Tailwind guidance in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` and `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- [X] T002 [P] Audit the existing feature baseline and approved dependency scope in `app/page.tsx`, `app/components/ScrollExpandingSection.tsx`, `package.json`, and `package-lock.json`

---

## Phase 2: Foundational

**Purpose**: Protect shared content and establish the layout ownership needed by every story.

- [X] T003 Confirm the existing `ContentIntro` type and exact pt-BR copy remain unchanged and exclusively owned by `data/content.ts`
- [X] T004 Map Hero sticky ownership, Content stacking order, scroll-track boundaries, and reduced-motion bypass against `specs/003-scroll-expanding-section/contracts/content-section-ui.md` before editing `app/page.tsx` and `app/components/ScrollExpandingSection.tsx`

**Checkpoint**: Existing dependency and content contracts are protected; layout responsibilities are explicit.

---

## Phase 3: User Story 1 - Discover the Next Section (Priority: P1) MVP

**Goal**: Replace the oversized floating pill with a shallow Content preview that keeps the Hero primary and visually continues below the viewport.

**Independent Test**: At 1280x720 and 390x844 without scrolling, the preview occupies 8%-12% of viewport height, uses the required side inset, rounds only its top corners, keeps square bottom corners, and exposes no background strip below it.

### Implementation for User Story 1

- [X] T005 [US1] Change the initial card geometry to `10svh` height, `8vw` horizontal inset, `28px` top-corner radii, and zero bottom-corner radii in `app/components/ScrollExpandingSection.tsx`
- [ ] T006 [P] [US1] Verify the initial preview dimensions, top-only rounding, square bottom edge, Hero priority, and no bottom gap at 1280x720 using `app/components/ScrollExpandingSection.tsx`
- [ ] T007 [P] [US1] Verify the initial preview dimensions, at least 5% mobile side inset, top-only rounding, square bottom edge, and no horizontal overflow at 390x844 using `app/components/ScrollExpandingSection.tsx`
- [X] T008 [US1] Verify semantic Hero-then-Content section order and accessible Content labeling in `app/page.tsx` and `app/components/ScrollExpandingSection.tsx`

**Checkpoint**: User Story 1 independently delivers the corrected bottom-card preview.

---

## Phase 4: User Story 2 - Expand the Card Through Scrolling (Priority: P2)

**Goal**: Keep the Hero stationary while the pinned Content card overlaps and progressively covers it through a reversible full-viewport expansion.

**Independent Test**: Scroll forward and backward through one viewport at 1280x720 and 390x844; the Hero remains fixed, the Content card stays above it, reaches every viewport edge, restores the shallow preview in reverse, and never exposes a blank background.

### Implementation for User Story 2

- [X] T009 [US2] Make the Hero section sticky at the viewport top while preserving its existing copy and visual classes in `app/page.tsx`
- [X] T010 [US2] Tune the `-mt-[100svh] h-[200svh]` Content track, sticky viewport, stacking order, `10svh`-to-`100svh` height mapping, `8vw`-to-zero inset mapping, and top-radius-to-zero mapping in `app/components/ScrollExpandingSection.tsx`
- [ ] T011 [P] [US2] Verify desktop forward, reverse, and fast-scroll behavior with a stationary Hero, bounded card expansion, full-screen completion, and no layer jump at 1280x720 using `app/page.tsx` and `app/components/ScrollExpandingSection.tsx`
- [ ] T012 [P] [US2] Verify mobile forward, reverse, and fast-scroll behavior with a stationary Hero, bounded card expansion, full-screen completion, and no background exposure at 390x844 using `app/page.tsx` and `app/components/ScrollExpandingSection.tsx`

**Checkpoint**: User Stories 1 and 2 deliver the corrected pinned overlap transition.

---

## Phase 5: User Story 3 - Read the Introductory Guidance (Priority: P3)

**Goal**: Reveal the exact centered Portuguese copy earlier while preserving readability and the immediate reduced-motion presentation.

**Independent Test**: Copy remains hidden before 50% progress, fades from 50% to full opacity by 70%, stays visible afterward, matches `data/content.ts`, wraps without clipping, and appears immediately in reduced-motion mode.

### Implementation for User Story 3

- [X] T013 [US3] Change copy opacity mapping from the old 80%-to-100% interval to `0.5`-to-`0.7` while preserving paragraph order and centered layout in `app/components/ScrollExpandingSection.tsx`
- [X] T014 [US3] Preserve the immediate full-size card and full-opacity copy path for `useReducedMotion` while applying the revised geometry and timing in `app/components/ScrollExpandingSection.tsx`
- [ ] T015 [US3] Verify exact copy, 50%-to-70% reveal timing, reduced-motion behavior, 200% zoom, responsive wrapping, WCAG AA colors, and no clipping at 1280x720 and 390x844 against `data/content.ts` and `app/components/ScrollExpandingSection.tsx`

**Checkpoint**: All three user stories work with corrected geometry, overlap, timing, and accessibility behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Enforce source scope and complete regression validation.

- [X] T016 Audit `app/components/ScrollExpandingSection.tsx`, `app/page.tsx`, `app/globals.css`, and `data/content.ts` to confirm no copy duplication, no new Content CSS selector, no Hero visual regression, and Motion `style` contains only animated values
- [X] T017 Run `npm run lint` from `package.json`, fixing only feature-caused errors and recording unrelated warnings
- [X] T018 Run `npm run build` from `package.json`, fixing only feature-caused failures
- [ ] T019 Run the complete Hero-to-Content regression in `specs/003-scroll-expanding-section/quickstart.md` at 1280x720 and 390x844, including reverse scroll, fast scroll, reduced motion, and 200% zoom

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks implementation edits.
- **User Story 1 (Phase 3)**: Depends on Foundation and establishes corrected card geometry.
- **User Story 2 (Phase 4)**: Depends on User Story 1 geometry and adds pinned layering plus full expansion.
- **User Story 3 (Phase 5)**: Depends on normalized User Story 2 scroll progress and updates reveal timing.
- **Polish (Phase 6)**: Depends on all user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US1 -> US2 -> US3 -> Polish
```

- **US1** fixes the initial preview shape and size.
- **US2** uses that geometry as the start state for the stationary-Hero overlap transition.
- **US3** uses US2 scroll progress for the earlier copy reveal.

### Within Each User Story

- Apply same-file implementation tasks sequentially.
- Run viewport checks only after the related implementation task completes.
- Preserve current Hero content, `data/content.ts` copy, and approved dependency set.
- Do not add section-specific rules to `app/globals.css`.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T006 and T007 can run in parallel after T005.
- T011 and T012 can run in parallel after T009-T010.
- Desktop and mobile observations inside T015 and T019 can be collected independently.

## Parallel Examples

### User Story 1

```text
Task A: T006 desktop initial-preview validation at 1280x720
Task B: T007 mobile initial-preview validation at 390x844
```

### User Story 2

```text
Task A: T011 desktop forward/reverse/fast-scroll validation
Task B: T012 mobile forward/reverse/fast-scroll validation
```

### User Story 3

```text
Task A: Inspect exact copy and 50%-to-70% opacity mapping in source
Task B: Validate reduced motion and 200% zoom in the browser after T013-T014
```

## Implementation Strategy

### MVP First

1. Complete T001-T004.
2. Complete T005-T008 for User Story 1.
3. Demonstrate the smaller open-bottom preview before changing scroll layering.

### Incremental Delivery

1. **MVP**: Correct shallow preview with top-only rounding.
2. **Motion**: Stationary Hero with pinned overlapping expansion.
3. **Content**: Earlier 50%-to-70% copy reveal and reduced-motion preservation.
4. **Polish**: Source audit, lint/build, and full browser regression.

## Notes

- Website copy remains Brazilian Portuguese; task documentation remains English.
- Conclusion and Google Forms remain outside this feature revision.
- `motion` remains the only approved feature dependency; add no dependency.
- Preserve unrelated changes in the dirty worktree.
