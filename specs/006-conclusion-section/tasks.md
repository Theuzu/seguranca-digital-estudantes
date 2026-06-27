# Tasks: Responsive Conclusion Section

**Input**: Design documents from `specs/006-conclusion-section/`

**Prerequisites**: `specs/006-conclusion-section/plan.md`, `specs/006-conclusion-section/spec.md`, `specs/006-conclusion-section/research.md`, `specs/006-conclusion-section/data-model.md`, `specs/006-conclusion-section/contracts/conclusion-ui.md`, `specs/006-conclusion-section/quickstart.md`

**Tests**: Include validation tasks because the feature has explicit responsive layout, accessibility, motion, build, and Google Forms behavior requirements.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files or performs an independent check.
- **[Story]**: User story label, such as US1, US2, or US3.
- Every task includes exact file paths or exact commands.

## Phase 1: Setup

**Purpose**: Confirm the current project baseline and feature constraints before code changes.

- [X] T001 Confirm Next.js, React, TypeScript, Tailwind CSS, and Motion versions in `package.json`
- [X] T002 [P] Confirm available validation commands `npm run lint` and `npm run build` in `package.json`
- [X] T003 [P] Read Next.js Server and Client Components guidance in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- [X] T004 [P] Read Next.js CSS Modules guidance in `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- [X] T005 [P] Read Next.js external navigation guidance in `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`
- [X] T006 [P] Read Next.js accessibility guidance in `node_modules/next/dist/docs/03-architecture/accessibility.md`
- [X] T007 Confirm current page composition and existing section order in `app/page.tsx`
- [X] T008 Confirm existing content data patterns in `data/content.ts` and `data/data.ts`

---

## Phase 2: Foundational

**Purpose**: Create shared content, validation helpers, and styling boundary that all user stories depend on.

- [X] T009 Define exported `ConclusionContent` type and `conclusionContent` object skeleton in `data/conclusion.ts`
- [X] T010 Add Google Forms URL validation helper in `data/conclusion.ts` that accepts only HTTPS `docs.google.com/forms` or `forms.gle` URLs
- [X] T011 Set `evaluation.formUrl` to `null` in `data/conclusion.ts` so placeholder never becomes an `href`
- [X] T012 Create empty scoped style module `app/components/ConclusionSection.module.css` for Conclusion layout, CTA states, motion states, and responsive rules
- [X] T013 Create initial Client Component shell in `app/components/ConclusionSection.tsx` with `"use client"`, `ConclusionContent` prop, and import from `app/components/ConclusionSection.module.css`
- [X] T014 Confirm no new dependency is needed by checking `package.json` remains unchanged after setup

**Checkpoint**: Foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Finish the Learning Journey (Priority: P1) MVP

**Goal**: Student reaches the final section and reads the closing safety message in the correct order on desktop and mobile.

**Independent Test**: Reach Conclusion after Content and confirm label, heading, and two safety paragraphs are readable in order with no interaction.

### Implementation for User Story 1

- [X] T015 [US1] Add exact `label`, `title`, and two `closingParagraphs` strings to `data/conclusion.ts`
- [X] T016 [US1] Render semantic `<section id="conclusao">`, label, `h2`, and closing paragraphs in `app/components/ConclusionSection.tsx`
- [X] T017 [US1] Add closing-message layout, container sizing, display typography, paragraph measure, and mobile stacking styles in `app/components/ConclusionSection.module.css`
- [X] T018 [US1] Import `ConclusionSection` and `conclusionContent` in `app/page.tsx`
- [X] T019 [US1] Render `ConclusionSection` once after the existing Content flow in `app/page.tsx`
- [X] T020 [US1] Add block-level Motion reveal for the closing group with `useReducedMotion` in `app/components/ConclusionSection.tsx`

### Checks for User Story 1

- [X] T021 [P] [US1] Verify `app/page.tsx` keeps the single-page journey order and does not add an unrelated page region
- [X] T022 [P] [US1] Verify 390px, 768px, and 1280px closing-message layout has no clipping, overlap, or horizontal overflow using `specs/006-conclusion-section/quickstart.md`
- [X] T023 [P] [US1] Verify reduced-motion mode shows closing content immediately with no entrance translation in `app/components/ConclusionSection.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Evaluate the Academic Project (Priority: P2)

**Goal**: Student understands the feedback request and can open the configured Google Form through one prominent action.

**Independent Test**: Review the evaluation callout, activate "Responder ao formulÃ¡rio" by pointer and keyboard when configured, and confirm no local submission exists.

### Implementation for User Story 2

- [X] T024 [US2] Add exact evaluation title, two evaluation paragraphs, action label, and nullable `formUrl` to `data/conclusion.ts`
- [X] T025 [US2] Render evaluation callout heading, paragraphs, and CTA area from `content.evaluation` in `app/components/ConclusionSection.tsx`
- [X] T026 [US2] Render enabled CTA as native `<a>` only when `formUrl` passes validation in `app/components/ConclusionSection.tsx`
- [X] T027 [US2] Render pending CTA as non-interactive layout-preserving element with `aria-disabled="true"` and no `href` in `app/components/ConclusionSection.tsx`
- [X] T028 [US2] Add evaluation panel, CTA, disabled, hover, focus, active, and responsive styles in `app/components/ConclusionSection.module.css`
- [X] T029 [US2] Add block-level Motion reveal for the evaluation group with reduced-motion fallback in `app/components/ConclusionSection.tsx`

### Checks for User Story 2

- [X] T030 [P] [US2] Verify pending `formUrl: null` produces no `href`, no `#`, and no placeholder URL in rendered output from `app/components/ConclusionSection.tsx`
- [X] T031 [P] [US2] Verify configured Google Forms URL opens through current-tab native link behavior using `specs/006-conclusion-section/quickstart.md`
- [X] T032 [P] [US2] Verify CTA keyboard focus outline, Enter activation, disabled state, and WCAG AA contrast using `app/components/ConclusionSection.module.css`

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Understand Context and Leave with a Thank You (Priority: P3)

**Goal**: Student sees the academic-purpose footer note and final thank-you message in a secondary but readable close.

**Independent Test**: Reach the end of the page and confirm thank-you copy plus academic-purpose footer are present in logical reading order on mobile and desktop.

### Implementation for User Story 3

- [X] T033 [US3] Add exact thank-you title, two thank-you paragraphs, and academic footer note to `data/conclusion.ts`
- [X] T034 [US3] Render thank-you block after evaluation content in `app/components/ConclusionSection.tsx`
- [X] T035 [US3] Render nested semantic `<footer>` with academic note after thank-you content in `app/components/ConclusionSection.tsx`
- [X] T036 [US3] Add thank-you spacing, dark footer surface, secondary academic-note hierarchy, and decorative `aria-hidden` mark styles in `app/components/ConclusionSection.module.css`
- [X] T037 [US3] Add block-level Motion reveal for the thank-you group with reduced-motion fallback in `app/components/ConclusionSection.tsx`

### Checks for User Story 3

- [X] T038 [P] [US3] Verify DOM reading order is closing message, evaluation explanation and action, thank-you content, academic footer in `app/components/ConclusionSection.tsx`
- [X] T039 [P] [US3] Verify decorative footer marks are hidden from assistive technology with `aria-hidden="true"` in `app/components/ConclusionSection.tsx`
- [X] T040 [P] [US3] Verify footer and thank-you layout reflow at 390px, 768px, 1280px, and 200% zoom using `specs/006-conclusion-section/quickstart.md`

**Checkpoint**: All user stories work independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full feature against responsiveness, accessibility, motion, copy accuracy, and build health.

- [X] T041 [P] Compare all visible pt-BR strings in `data/conclusion.ts` against `specs/006-conclusion-section/spec.md`
- [X] T042 [P] Verify `app/components/ConclusionSection.module.css` uses the existing palette, typography, container, and responsive padding from `design.md`
- [X] T043 Verify all entrance motion in `app/components/ConclusionSection.tsx` completes within 300ms and uses at most 16px vertical translation
- [X] T044 Verify all CTA interaction transitions in `app/components/ConclusionSection.module.css` complete within 250ms
- [X] T045 Verify no backend route, embedded form, analytics, submission tracking, or new external integration was added under `app/`
- [X] T046 Run `npm run lint` from repository root
- [X] T047 Run `npm run build` from repository root
- [X] T048 Run `git diff --check -- app/page.tsx app/components/ConclusionSection.tsx app/components/ConclusionSection.module.css data/conclusion.ts specs/006-conclusion-section/tasks.md` from repository root
- [X] T049 Review `git diff -- app/page.tsx app/components/ConclusionSection.tsx app/components/ConclusionSection.module.css data/conclusion.ts` to confirm Hero and Content behavior remain unchanged
- [X] T050 Update `specs/006-conclusion-section/quickstart.md` only if validation steps changed during implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; start immediately.
- **Phase 2 Foundational**: Depends on Phase 1; blocks all user stories.
- **Phase 3 US1**: Depends on Phase 2; MVP and first independent increment.
- **Phase 4 US2**: Depends on Phase 2 and can build on the same component after US1 integration.
- **Phase 5 US3**: Depends on Phase 2 and can build on the same component after US1 integration.
- **Phase 6 Polish**: Depends on all selected user stories.

### User Story Dependencies

- **US1 (P1)**: No story dependency after foundation. Delivers visible final section shell and closing message.
- **US2 (P2)**: Depends on foundation and shared component shell. Can be implemented after US1 or in parallel with US3 if file conflicts are coordinated.
- **US3 (P3)**: Depends on foundation and shared component shell. Can be implemented after US1 or in parallel with US2 if file conflicts are coordinated.

### Within Each User Story

- `data/conclusion.ts` content before `app/components/ConclusionSection.tsx` rendering.
- `app/components/ConclusionSection.tsx` rendering before `app/components/ConclusionSection.module.css` final visual checks.
- Motion and accessibility checks after content is present.
- Page integration in `app/page.tsx` after component exports exist.

## Parallel Opportunities

- Setup reading tasks T003, T004, T005, and T006 can run in parallel.
- US1 checks T021, T022, and T023 can run in parallel after T015-T020.
- US2 checks T030, T031, and T032 can run in parallel after T024-T029.
- US3 checks T038, T039, and T040 can run in parallel after T033-T037.
- Polish checks T041 and T042 can run in parallel before final command validation.

## Parallel Example: User Story 1

```text
Task A: T021 Verify top-level order in app/page.tsx
Task B: T022 Verify responsive closing-message layout using quickstart.md
Task C: T023 Verify reduced-motion closing behavior in ConclusionSection.tsx
```

## Parallel Example: User Story 2

```text
Task A: T030 Verify pending URL renders no href in ConclusionSection.tsx
Task B: T031 Verify configured Google Forms native link behavior using quickstart.md
Task C: T032 Verify CTA focus, keyboard, disabled, and contrast states in CSS/module output
```

## Parallel Example: User Story 3

```text
Task A: T038 Verify DOM reading order in ConclusionSection.tsx
Task B: T039 Verify decorative marks are aria-hidden in ConclusionSection.tsx
Task C: T040 Verify footer and thank-you responsive reflow using quickstart.md
```

## Implementation Strategy

### MVP First

Complete Phase 1, Phase 2, and Phase 3. This creates the conclusion/evaluation flow with the approved closing message and validates it independently.

### Incremental Delivery

1. Add US1 closing message and page integration.
2. Add US2 evaluation callout and safe Google Forms state handling.
3. Add US3 thank-you block and nested academic footer.
4. Run cross-cutting validation and fix only issues inside the feature scope.

### Scope Guardrails

- Keep public copy in pt-BR and docs/tasks in English.
- Keep the approved single-page narrative architecture.
- Keep all Conclusion copy and form configuration in `data/conclusion.ts`.
- Use no new dependency.
- Do not add backend routes, embedded forms, analytics, quizzes, accounts, or tracking.
- Preserve existing Hero and Content behavior.
