# Tasks: Topic Chooser Fit Refresh

**Input**: Design documents from `specs/008-topic-chooser-fit/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/topic-chooser-fit-ui.md`, `quickstart.md`

**Tests**: No automated test suite was requested. This task list includes
required validation checks for layout, accessibility, interaction, lint, build,
and diff hygiene.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files.
- **[Story]**: User story label, such as US1, US2, or US3.
- Every task includes exact file paths.

## Phase 1: Setup

**Purpose**: Confirm the existing project baseline and implementation inputs.

- [X] T001 Confirm Next.js 16.2.6, React 19.2.4, Tailwind CSS 4, Motion 12.40.0, and React Icons 5.6.0 versions in `package.json`
- [X] T002 [P] Confirm available validation commands `npm run lint` and `npm run build` in `package.json`
- [X] T003 [P] Review local Next.js App Router CSS guidance in `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- [X] T004 [P] Review local Next.js accessibility guidance in `node_modules/next/dist/docs/03-architecture/accessibility.md`
- [X] T005 [P] Review current chooser implementation and drag logic in `app/components/TopicChooser.tsx`
- [X] T006 Confirm feature scope, viewport targets, and manual validation steps in `specs/008-topic-chooser-fit/plan.md` and `specs/008-topic-chooser-fit/quickstart.md`

---

## Phase 2: Foundational

**Purpose**: Shared content-model and styling decisions that block all user story work.

- [X] T007 Update `TopicChooserContent` to use `TopicChooserTitle` instead of a single heading string in `data/content.ts`
- [X] T008 Add the structured chooser title content `Explore um` / `tema` / `>>>` to `topicChooser` in `data/content.ts`
- [X] T009 [P] Refactor `TopicChooser` to consume the structured title data while preserving its existing client-component gesture API in `app/components/TopicChooser.tsx`
- [X] T010 [P] Replace `TopicChooser.module.css`-driven section, title, rail, card, and pagination styling with inline Tailwind-driven markup in `app/components/TopicChooser.tsx`
- [X] T011 Remove the chooser CSS Module import dependency from `app/components/TopicChooser.tsx`
- [X] T012 Verify `app/page.tsx` does not need composition changes and that `TopicChooser` still renders before `TopicDetailSection`

**Checkpoint**: Foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Scan Full Title and Cards Cleanly (Priority: P1) MVP

**Goal**: A student can read the full chooser title and visible cards without clipping, oversizing, or broken edge fit.

**Independent Test**: Open the chooser on mobile and desktop and confirm the full title stays inside the viewport, visible card copy is readable, and first/last rail states no longer look accidentally cut.

### Checks for User Story 1

- [X] T013 [P] [US1] Check the title copy and line composition against `specs/008-topic-chooser-fit/spec.md` and `data/content.ts`
- [X] T014 [P] [US1] Check the fit and edge-alignment expectations against `specs/008-topic-chooser-fit/contracts/topic-chooser-fit-ui.md` and `app/components/TopicChooser.tsx`

### Implementation for User Story 1

- [X] T015 [US1] Render the chooser title as two rows with `tema` and `>>>` on the final line in `app/components/TopicChooser.tsx`
- [X] T016 [US1] Apply viewport-safe title sizing, line-height, width, and top spacing so `Explore um tema` remains fully visible in `app/components/TopicChooser.tsx`
- [X] T017 [US1] Reduce mobile and desktop card dimensions to the planned portrait sizes while preserving full card readability in `app/components/TopicChooser.tsx`
- [X] T018 [US1] Rework rail padding and section width treatment so the first and last visible card edges align cleanly with the section boundary in `app/components/TopicChooser.tsx`
- [X] T019 [US1] Preserve the existing five topic cards, order, icons, titles, and descriptions while adapting the denser layout in `data/content.ts` and `app/components/TopicChooser.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Browse Smaller, Stronger Desktop Cards (Priority: P2)

**Goal**: A student on desktop sees a tighter, smaller multi-card rail with slightly bolder cards and no broken edge fit.

**Independent Test**: Compare the desktop chooser against the reference and confirm at least four cards are visible at 1280px, the cards are smaller than before, and the rail still reads as a continuous horizontal field.

### Checks for User Story 2

- [X] T020 [P] [US2] Check desktop sizing and visible-card-count requirements against `specs/008-topic-chooser-fit/spec.md` and `specs/008-topic-chooser-fit/quickstart.md`
- [X] T021 [P] [US2] Check desktop typography and edge-state expectations against `specs/008-topic-chooser-fit/contracts/topic-chooser-fit-ui.md` and `app/components/TopicChooser.tsx`

### Implementation for User Story 2

- [X] T022 [US2] Apply desktop-specific card basis, min-height, gap, and rail inset tuning for 1024px+ and 1280px+ layouts in `app/components/TopicChooser.tsx`
- [X] T023 [US2] Tighten desktop card title and description typography so the cards feel slightly bolder without adding extra effects in `app/components/TopicChooser.tsx`
- [X] T024 [US2] Split snap geometry so tablet/desktop use start-edge alignment instead of centered alignment in `app/components/TopicChooser.tsx`
- [X] T025 [US2] Update nearest-card and target-scroll calculations to use the rail's computed inline inset for non-mobile layouts in `app/components/TopicChooser.tsx`
- [X] T026 [US2] Verify wide-layout behavior still contains horizontal movement inside the rail and does not introduce body overflow in `app/components/TopicChooser.tsx`

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Use Simple Responsive Interaction States (Priority: P3)

**Goal**: A student gets the simplified title accent, drag behavior, and color-only hover state across mouse, touch, and keyboard.

**Independent Test**: Hover, focus, drag, and tap the chooser on mobile and desktop and confirm hover only changes color, drag still works, click suppression still works, and the mobile centered-card composition remains readable.

### Checks for User Story 3

- [X] T027 [P] [US3] Check hover/focus/pressed expectations against `specs/008-topic-chooser-fit/contracts/topic-chooser-fit-ui.md` and `app/components/TopicChooser.tsx`
- [X] T028 [P] [US3] Check mobile centered-card and pagination expectations against `specs/008-topic-chooser-fit/spec.md` and `specs/008-topic-chooser-fit/quickstart.md`

### Implementation for User Story 3

- [X] T029 [US3] Remove hover lift, icon motion, active scale, and exaggerated hover shadow behavior from `app/components/TopicChooser.tsx`
- [X] T030 [US3] Keep color-only hover styling plus accessible focus-visible emphasis in `app/components/TopicChooser.tsx`
- [X] T031 [US3] Preserve mobile-centered snapping and pagination visibility below 640px in `app/components/TopicChooser.tsx`
- [X] T032 [US3] Preserve drag threshold, reduced-motion immediate settling, and click suppression after confirmed drag in `app/components/TopicChooser.tsx`
- [X] T033 [US3] Verify whole-card anchor activation and keyboard focus alignment still work after the layout refactor in `app/components/TopicChooser.tsx`

**Checkpoint**: All selected user stories work independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate responsive behavior, accessibility, interaction, and repo hygiene across the full feature.

- [ ] T034 [P] Check 360x760 title fit and two-line title accent layout using `specs/008-topic-chooser-fit/quickstart.md`
- [ ] T035 [P] Check 390x844 centered-card mobile composition, side previews, and pagination visibility using `specs/008-topic-chooser-fit/quickstart.md`
- [ ] T036 [P] Check 768x1024 tablet rail fit and no accidental edge cropping using `specs/008-topic-chooser-fit/quickstart.md`
- [ ] T037 [P] Check 1280x720 and 1440x900 desktop rail fit, visible-card count, and bolder-card feel using `specs/008-topic-chooser-fit/quickstart.md`
- [ ] T038 [P] Check 200% zoom readability for title, cards, focus outlines, and markers using `specs/008-topic-chooser-fit/quickstart.md`
- [ ] T039 Check keyboard navigation, focus alignment, and same-page anchor activation using `app/components/TopicChooser.tsx`
- [ ] T040 Check reduced-motion behavior and drag-versus-click behavior using `app/components/TopicChooser.tsx` and `specs/008-topic-chooser-fit/quickstart.md`
- [X] T041 Check responsible pt-BR copy, title wording, and design.md alignment in `data/content.ts` and `app/components/TopicChooser.tsx`
- [X] T042 Run `npm run lint` for the implementation touched by `data/content.ts`, `app/components/TopicChooser.tsx`, and `AGENTS.md`
- [X] T043 Run `npm run build` for the implementation touched by `data/content.ts` and `app/components/TopicChooser.tsx`
- [X] T044 Run `git diff --check` for whitespace validation across the feature changes
- [X] T045 Review final implementation against `specs/008-topic-chooser-fit/contracts/topic-chooser-fit-ui.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational; delivers the MVP card/title fit refresh.
- **US2 (Phase 4)**: Depends on US1 because desktop geometry builds on the new title and base responsive card layout.
- **US3 (Phase 5)**: Depends on US1 because the simplified states and mobile interaction refinements apply to the refactored chooser structure; can overlap partly with late US2 checks once base layout is stable.
- **Polish (Phase 6)**: Depends on selected user stories.

### User Story Dependencies

- **US1**: MVP, no other user story dependency after Foundation.
- **US2**: Requires US1 title and base card geometry.
- **US3**: Requires US1 refactored chooser structure and should land after the geometry changes are stable.

### Within Each User Story

- Content shape updates before component rendering.
- Base inline styling before viewport-specific geometry tuning.
- Snap logic updates before drag/focus validation.
- Visual/accessibility checks before lint/build validation.

### Parallel Opportunities

- T002, T003, T004, and T005 can run in parallel during Setup.
- T009 and T010 can run in parallel once the `TopicChooserTitle` shape is agreed in `data/content.ts`.
- T013 and T014 can run in parallel for US1 checks.
- T020 and T021 can run in parallel for US2 checks.
- T027 and T028 can run in parallel for US3 checks.
- T034, T035, T036, T037, and T038 can run in parallel during final visual validation.

---

## Parallel Execution Examples

### User Story 1

```text
Task: T013 [P] [US1] Check title copy and line composition
Task: T014 [P] [US1] Check fit and edge-alignment expectations
```

### User Story 2

```text
Task: T020 [P] [US2] Check desktop sizing and visible-card-count requirements
Task: T021 [P] [US2] Check desktop typography and edge-state expectations
```

### User Story 3

```text
Task: T027 [P] [US3] Check hover/focus/pressed expectations
Task: T028 [P] [US3] Check mobile centered-card and pagination expectations
```

---

## Implementation Strategy

### MVP First

Complete Phase 1, Phase 2, and Phase 3. This delivers the visible title/card
fit fix: full title visibility, smaller cards, and clean edge alignment.

### Incremental Delivery

1. Update chooser content shape and move chooser styling inline.
2. Fix title fit, card sizing, and edge alignment for the MVP.
3. Tune desktop-specific geometry and start-edge snapping.
4. Simplify hover/interaction states while preserving drag and keyboard access.
5. Finish responsive, accessibility, lint/build, and diff-hygiene validation.

### Final Validation

Use `specs/008-topic-chooser-fit/quickstart.md` as the manual validation
source, then run `npm run lint`, `npm run build`, and `git diff --check`.

## Notes

- Website copy is Brazilian Portuguese; project documentation is English.
- Keep the approved single-page narrative architecture from `design.md`.
- Keep chooser styling inline inside `app/components/TopicChooser.tsx`.
- Add no dependency without explicit user approval.
- Do not change topic-detail layout, Conclusion content, or Google Forms for this feature.
