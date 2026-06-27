# Tasks: Reusable Topic Detail Layout

**Input**: Design documents from `specs/007-topic-detail-layout/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/topic-detail-ui.md`, `quickstart.md`

**Tests**: No automated test suite was requested. This task list includes
required validation checks for layout, accessibility, motion, lint, build, and
diff hygiene.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files.
- **[Story]**: User story label, such as US1, US2, or US3.
- Every task includes exact file paths.

## Phase 1: Setup

**Purpose**: Confirm the existing project baseline and implementation inputs.

- [X] T001 Confirm Next.js 16.2.6, React 19.2.4, Tailwind CSS 4, Motion 12.40.0, Lenis, and React Icons versions in `package.json`
- [X] T002 [P] Confirm available validation commands `npm run lint` and `npm run build` in `package.json`
- [X] T003 [P] Review local Next.js Server/Client Component guidance in `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- [X] T004 [P] Review local Next.js Tailwind/CSS guidance in `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- [X] T005 [P] Review local Next.js accessibility guidance in `node_modules/next/dist/docs/03-architecture/accessibility.md`
- [X] T006 Confirm feature scope, source targets, and validation steps in `specs/007-topic-detail-layout/plan.md` and `specs/007-topic-detail-layout/quickstart.md`

---

## Phase 2: Foundational

**Purpose**: Shared content, component, and anchor decisions that block user story work.

- [X] T007 Define `TopicProblemContent`, `TopicGuidanceEntry`, `TopicChecklistItem`, and `TopicDetailContent` types in `data/content.ts`
- [X] T008 Add exported `topicDetails` collection with the supplied Topic 3 shared-computer content in `data/content.ts`
- [X] T009 [P] Create the `TopicDetailSection` Client Component shell with typed props and semantic article structure in `app/components/TopicDetailSection.tsx`
- [X] T010 Import `TopicDetailSection` and `topicDetails`, then compose topic details immediately after `TopicChooser` inside `ScrollExpandingSection` in `app/page.tsx`
- [X] T011 Remove placeholder destination rendering from `TopicChooser` while preserving card anchors and drag behavior in `app/components/TopicChooser.tsx`
- [X] T012 Verify chooser anchors now target real rendered topic-detail IDs using `app/components/TopicChooser.tsx` and `app/components/TopicDetailSection.tsx`

**Checkpoint**: Foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Read One Complete Topic (Priority: P1) MVP

**Goal**: A student opens the shared-computer topic and reads a complete three-part flow: problem, guidance, checklist.

**Independent Test**: Open the shared-computer topic and confirm the approved Portuguese copy appears in order with no empty placeholders or missing headings.

### Checks for User Story 1

- [X] T013 [P] [US1] Check the shared-computer topic copy against `specs/007-topic-detail-layout/spec.md` and `data/content.ts`
- [X] T014 [P] [US1] Check heading order, article labels, and DOM reading order against `specs/007-topic-detail-layout/contracts/topic-detail-ui.md` and `app/components/TopicDetailSection.tsx`

### Implementation for User Story 1

- [X] T015 [US1] Render each topic article with `id`, eyebrow, title, problem heading, and problem paragraphs in `app/components/TopicDetailSection.tsx`
- [X] T016 [US1] Render guidance and checklist regions after the problem region in `app/components/TopicDetailSection.tsx`
- [X] T017 [US1] Apply the dark editorial problem/guidance layout with inline Tailwind utility classes in `app/components/TopicDetailSection.tsx`
- [X] T018 [US1] Ensure Topic 3 contains exactly three guidance entries and five checklist items from the approved copy in `data/content.ts`
- [X] T019 [US1] Verify the "Computadores compartilhados" chooser card lands on the real topic detail section in `app/page.tsx` and `app/components/TopicChooser.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Follow Sequential Protection Guidance (Priority: P2)

**Goal**: A student scrolls through guidance entries one at a time in a sticky sequence with a smooth cut transition.

**Independent Test**: Scroll forward and backward through the Topic 3 guidance sequence on desktop and mobile; every entry becomes readable and no fast-scroll state leaves unreadable overlap.

### Checks for User Story 2

- [X] T020 [P] [US2] Check the multi-entry guidance behavior against `specs/007-topic-detail-layout/contracts/topic-detail-ui.md` and `app/components/TopicDetailSection.tsx`
- [X] T021 [P] [US2] Check reduced-motion guidance fallback against `specs/007-topic-detail-layout/quickstart.md` and `app/components/TopicDetailSection.tsx`

### Implementation for User Story 2

- [X] T022 [US2] Add Motion `useScroll`, `useTransform`, and `useReducedMotion` handling for the guidance sequence in `app/components/TopicDetailSection.tsx`
- [X] T023 [US2] Implement the sticky guidance scroll track sized from `topic.guidance.length` in `app/components/TopicDetailSection.tsx`
- [X] T024 [US2] Implement outgoing-entry clipping and incoming-entry replacement with inline Tailwind utility classes and Motion styles in `app/components/TopicDetailSection.tsx`
- [X] T025 [US2] Add a static single-entry guidance branch in `app/components/TopicDetailSection.tsx`
- [X] T026 [US2] Add reduced-motion stacked guidance rendering in `app/components/TopicDetailSection.tsx`
- [X] T027 [US2] Verify scroll-forward/backward behavior, fast-scroll behavior, and no scroll trap using `specs/007-topic-detail-layout/quickstart.md`

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Use the Practical Checklist (Priority: P3)

**Goal**: A student reaches a simple checklist and can scan practical actions without any data collection.

**Independent Test**: Review the shared-computer checklist and confirm five items appear once, remain readable at 200% zoom, and do not behave like form controls.

### Checks for User Story 3

- [X] T028 [P] [US3] Check checklist item count and copy against `specs/007-topic-detail-layout/spec.md` and `data/content.ts`
- [X] T029 [P] [US3] Check checklist accessibility, non-form behavior, and reading order against `specs/007-topic-detail-layout/contracts/topic-detail-ui.md` and `app/components/TopicDetailSection.tsx`

### Implementation for User Story 3

- [X] T030 [US3] Render checklist heading and checklist items as presentational content in `app/components/TopicDetailSection.tsx`
- [X] T031 [US3] Apply simple checklist row styling with inline Tailwind utility classes in `app/components/TopicDetailSection.tsx`
- [X] T032 [US3] Ensure checklist items use stable item keys from `data/content.ts` in `app/components/TopicDetailSection.tsx`
- [X] T033 [US3] Verify the checklist contains no inputs, persistence, submission, or user-data collection in `app/components/TopicDetailSection.tsx`

**Checkpoint**: All selected user stories work independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate responsive behavior, accessibility, motion, and repo hygiene across all stories.

- [X] T034 [P] Check mobile 390x844 layout for no clipped text or horizontal overflow using `specs/007-topic-detail-layout/quickstart.md`
- [X] T035 [P] Check tablet 768x1024 layout for stable spacing and readable line lengths using `specs/007-topic-detail-layout/quickstart.md`
- [X] T036 [P] Check desktop 1280x720 layout for dark editorial rhythm and sticky guidance framing using `specs/007-topic-detail-layout/quickstart.md`
- [X] T037 [P] Check 200% zoom readability for problem, guidance, checklist, and focus states using `specs/007-topic-detail-layout/quickstart.md`
- [X] T038 Check keyboard navigation from chooser cards into topic detail sections using `app/components/TopicChooser.tsx` and `app/components/TopicDetailSection.tsx`
- [X] T039 Check responsible cybersecurity wording and pt-BR public copy in `data/content.ts`
- [X] T040 Run `npm run lint` for the implementation touched by `data/content.ts`, `app/page.tsx`, `app/components/TopicChooser.tsx`, and `app/components/TopicDetailSection.tsx`
- [X] T041 Run `npm run build` for the implementation touched by `data/content.ts`, `app/page.tsx`, `app/components/TopicChooser.tsx`, and `app/components/TopicDetailSection.tsx`
- [X] T042 Run `git diff --check` for whitespace validation across the feature changes
- [X] T043 Review final implementation against `specs/007-topic-detail-layout/contracts/topic-detail-ui.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational; delivers the MVP complete topic reading flow.
- **US2 (Phase 4)**: Depends on US1 because the guidance content and component structure must exist first.
- **US3 (Phase 5)**: Depends on US1 because the article and checklist data must exist first; can run partly in parallel with US2 after US1.
- **Polish (Phase 6)**: Depends on selected user stories.

### User Story Dependencies

- **US1**: MVP, no other user story dependency after Foundation.
- **US2**: Requires US1 article and guidance markup.
- **US3**: Requires US1 article and checklist data.

### Within Each User Story

- Data model and content before component rendering.
- Component rendering before page integration.
- Motion behavior after static content is readable.
- Accessibility and responsive checks before final lint/build validation.

### Parallel Opportunities

- T002, T003, T004, and T005 can run in parallel during Setup.
- T009 can run in parallel with T007 and T008 once the component API is agreed, but T010 waits for exported data and component shell.
- T013 and T014 can run in parallel for US1 checks.
- T020 and T021 can run in parallel for US2 checks.
- T028 and T029 can run in parallel for US3 checks.
- T034, T035, T036, and T037 can run in parallel during final visual validation.

---

## Parallel Execution Examples

### User Story 1

```text
Task: T013 [P] [US1] Check copy in spec.md and data/content.ts
Task: T014 [P] [US1] Check heading order and DOM reading order in contract/component
```

### User Story 2

```text
Task: T020 [P] [US2] Check multi-entry guidance behavior
Task: T021 [P] [US2] Check reduced-motion guidance fallback
```

### User Story 3

```text
Task: T028 [P] [US3] Check checklist count and copy
Task: T029 [P] [US3] Check checklist accessibility and non-form behavior
```

---

## Implementation Strategy

### MVP First

Complete Phase 1, Phase 2, and Phase 3. This delivers a reusable topic-detail
section with Topic 3 content in the required problem, guidance, checklist order.

### Incremental Delivery

1. Add typed topic-detail content and compose the new section.
2. Make the complete static topic readable and anchorable.
3. Add sticky guidance motion and reduced-motion fallback.
4. Finish checklist presentation and cross-device validation.

### Final Validation

Use `specs/007-topic-detail-layout/quickstart.md` as the manual validation
source, then run `npm run lint`, `npm run build`, and `git diff --check`.

## Notes

- Website copy is Brazilian Portuguese; project documentation is English.
- Keep the approved single-page narrative architecture from `design.md`.
- Keep new topic-detail styling as inline Tailwind utility classes.
- Add no dependency without explicit user approval.
- Do not touch Conclusion or Google Forms for this feature.
