---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories),
research.md, data-model.md, contracts/

**Tests**: Include test/check tasks only when requested by the feature spec or
when needed to validate layout, accessibility, motion, or build behavior.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files.
- **[Story]**: User story label, such as US1, US2, or US3.
- Include exact file paths in task descriptions.

## Path Conventions

- **Next.js app**: `app/` for routes/layouts, `data/` for static content, and
  `public/` for assets.
- Website copy belongs in typed `data/*.ts` files whenever it is content-driven.
- Documentation, specs, plans, and task files MUST be written in English.
- Do not introduce backend, mobile, auth, database, admin, or extra dependency
  paths unless the feature plan records explicit user approval.

## Phase 1: Setup

**Purpose**: Confirm the existing project baseline.

- [ ] T001 Confirm existing Next.js, React, Tailwind, and TypeScript setup in package.json
- [ ] T002 [P] Confirm lint/build commands from package.json
- [ ] T003 [P] Read the relevant Next.js guide under `node_modules/next/dist/docs/`

---

## Phase 2: Foundational

**Purpose**: Shared decisions that block user story work.

- [ ] T004 Confirm `theme-vibe.md` colors, typography, motion, and accessibility constraints
- [ ] T005 [P] Define the Brazilian Portuguese editorial outline for affected website sections
- [ ] T006 [P] Define or update the `data/*.ts` content model for affected topics
- [ ] T007 Confirm no new dependencies are needed or record explicit user approval
- [ ] T008 Confirm whether the Conclusion Google Forms link/embed is affected

**Checkpoint**: Foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Checks for User Story 1

- [ ] T009 [P] [US1] Visual check for [section] on mobile and desktop
- [ ] T010 [P] [US1] Accessibility check for headings, contrast, and keyboard flow

### Implementation for User Story 1

- [ ] T011 [P] [US1] Draft Brazilian Portuguese website content for [topic] in data/[file].ts
- [ ] T012 [P] [US1] Create or update section component in app/components/[component].tsx
- [ ] T013 [US1] Integrate [section] into app/page.tsx
- [ ] T014 [US1] Apply responsive styling and theme tokens in app/[style-file]
- [ ] T015 [US1] Review cybersecurity wording for responsible academic framing
- [ ] T016 [US1] Verify clean animation behavior for the completed story
- [ ] T017 [US1] Run lint/build validation for the completed story

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Checks for User Story 2

- [ ] T018 [P] [US2] Visual check for [section] on mobile and desktop
- [ ] T019 [P] [US2] Accessibility check for headings, contrast, and keyboard flow

### Implementation for User Story 2

- [ ] T020 [P] [US2] Draft Brazilian Portuguese website content for [topic] in data/[file].ts
- [ ] T021 [US2] Create or update section component in app/components/[component].tsx
- [ ] T022 [US2] Integrate [section] into app/page.tsx
- [ ] T023 [US2] Verify clean animation behavior for the completed story

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Checks for User Story 3

- [ ] T024 [P] [US3] Visual check for [section] on mobile and desktop
- [ ] T025 [P] [US3] Accessibility check for headings, contrast, and keyboard flow

### Implementation for User Story 3

- [ ] T026 [P] [US3] Draft Brazilian Portuguese website content for [topic] in data/[file].ts
- [ ] T027 [US3] Create or update section component in app/components/[component].tsx
- [ ] T028 [US3] Integrate [section] into app/page.tsx
- [ ] T029 [US3] Connect Google Forms from the Conclusion section if this story touches Conclusion
- [ ] T030 [US3] Verify clean animation behavior for the completed story

**Checkpoint**: All selected user stories work independently.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [ ] TXXX [P] Documentation updates in English
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Accessibility and responsive layout pass across mobile and desktop
- [ ] TXXX Motion pass to keep animations clean and non-blocking
- [ ] TXXX Review cybersecurity wording for responsible academic framing
- [ ] TXXX Verify Google Forms link/embed works from the Conclusion section
- [ ] TXXX Run lint/build validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: No dependencies; can start immediately.
- **Foundational**: Depends on Setup; blocks all user stories.
- **User Stories**: Depend on Foundational; proceed in priority order unless
  work is clearly independent.
- **Polish**: Depends on all selected user stories.

### Within Each User Story

- Brazilian Portuguese website content outline before components.
- `data/*.ts` updates before components that consume that content.
- Section components before page integration.
- Clean motion and accessibility checks before final validation.

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel.
- Content and independent section components marked [P] can run in parallel.
- Visual and accessibility checks marked [P] can run in parallel.

---

## Notes

- Website copy is Brazilian Portuguese; project documentation is English.
- Keep Hero, Content, and Conclusion as the three top-level sections.
- Add no dependency without explicit user approval.
- Avoid vague tasks, same-file conflicts, and hidden cross-story dependencies.
