# Tasks: Content Topic Choice Cards

**Input**: Design documents from `specs/004-topic-choice-cards/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/topic-chooser-ui.md`, `quickstart.md`

**Tests**: No automated test suite requested. Tasks include required lint, build, responsive, accessibility, fragment-navigation, and regression checks.

**Organization**: Tasks follow user-story priority and keep same-file work sequential.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because task touches a different file and has no incomplete dependency.
- **[Story]**: Maps task to US1, US2, or US3 from `spec.md`.
- Every task includes exact file paths.

## Phase 1: Setup

**Purpose**: Confirm implementation baseline before edits.

- [X] T001 Confirm Next.js 16.2.6, React 19.2.4, TypeScript 5, Tailwind CSS 4, existing dependencies, and no package additions in `package.json`; re-read `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`, `05-server-and-client-components.md`, `11-css.md`, and `node_modules/next/dist/docs/03-architecture/accessibility.md`
- [X] T002 Run baseline `npm run lint` and `npm run build` from scripts in `package.json`, recording any pre-existing blocker before editing `app/` or `data/`

---

## Phase 2: Foundational

**Purpose**: Create shared data and preserve existing scroll behavior before story work.

- [X] T003 [P] Add `TopicId`, `TopicChoice`, `TopicChooserContent`, and the exact ordered five-item `topicChooser` export to `data/content.ts` per `specs/004-topic-choice-cards/data-model.md`
- [X] T004 [P] Update `app/components/ScrollExpandingSection.tsx` to accept `children`, keep the outer Content section semantic, move the Motion ref and transition sizing classes to an inner track, and render children after that track without changing existing expansion or reduced-motion values

**Checkpoint**: Typed content exists; scroll progress remains isolated from following content.

---

## Phase 3: User Story 1 - Understand the Problem and Next Step (Priority: P1) MVP

**Goal**: Continue from the unchanged scroll-expanding introduction into a clear asymmetric `Escolha um tema` area inside the same Content section.

**Independent Test**: Complete the existing transition at 1280x720 and 390x844; confirm original paragraphs remain unchanged, expansion timing remains stable, and `Escolha um tema` follows inside the same Content surface.

### Implementation for User Story 1

- [X] T005 [US1] Create the server-rendered `TopicChooser` shell with typed props, semantic `h2`, asymmetric heading composition, current palette/typography, and no client directive or animation in `app/components/TopicChooser.tsx`
- [X] T006 [US1] Import `topicChooser` and compose `<TopicChooser content={topicChooser} />` as children of `ScrollExpandingSection` without changing Hero or Conclusion markup in `app/page.tsx`
- [X] T007 [US1] Execute Content continuity and existing-transition regression checks from Scenario 1 in `specs/004-topic-choice-cards/quickstart.md` against `app/page.tsx` and `app/components/ScrollExpandingSection.tsx`

**Checkpoint**: User Story 1 works independently as the minimum continuation from problem statement to topic choice.

---

## Phase 4: User Story 2 - Compare the Available Themes (Priority: P2)

**Goal**: Present five equal-priority, text-only cards with complete supplied copy and clear controls across mobile and desktop.

**Independent Test**: At 1280x720, confirm five equal-width cards form one row; at 390x844, confirm one ordered column; at 200% zoom, confirm complete copy, controls, and no horizontal scrolling.

### Implementation for User Story 2

- [X] T008 [US2] Render all five semantic cards from `content.topics` with title, description, flexible height, consistent CTA alignment, and no icons, numbers, badges, images, or decorative shapes in `app/components/TopicChooser.tsx`
- [X] T009 [US2] Add one native fragment link labeled `Ver orientações` per card plus the five matching heading-only destinations in supplied order so no visible control is a dead end in `app/components/TopicChooser.tsx`
- [X] T010 [US2] Apply and verify one-column, two-column, and 1280px five-column layouts; immediate theme-compliant interaction colors; complete copy wrapping; and no motion or horizontal overflow using Scenarios 2 and 3 in `specs/004-topic-choice-cards/quickstart.md` against `app/components/TopicChooser.tsx`

**Checkpoint**: User Stories 1 and 2 present complete, responsive theme choices without adding a new route or unrelated page region.

---

## Phase 5: User Story 3 - Open the Chosen Guidance (Priority: P3)

**Goal**: Make every card control navigate accessibly to its exact heading-only destination in the same Content section.

**Independent Test**: Activate every CTA with Enter, pointer, and touch; confirm unique URL fragment, matching heading destination, visible focus, browser Back behavior, and no smooth-scroll animation.

### Implementation for User Story 3

- [X] T011 [US3] Finalize native link semantics, per-topic accessible names, `focus-visible` treatment, unique destination IDs, scroll margin, heading hierarchy, and non-clickable card surfaces in `app/components/TopicChooser.tsx`
- [X] T012 [US3] Execute all five fragment, keyboard, pointer, touch, and browser Back checks from Scenarios 4 and 5 in `specs/004-topic-choice-cards/quickstart.md` against `app/components/TopicChooser.tsx`

**Checkpoint**: All three user stories work; five controls reach five correct same-section destinations.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate complete feature against governance and acceptance criteria.

- [X] T013 [P] Review exact pt-BR copy, five-item order, preventive cybersecurity framing, typed ownership, and absence of fabricated guidance in `data/content.ts` against `specs/004-topic-choice-cards/spec.md`
- [X] T014 [P] Run full responsive, 200% zoom, keyboard, touch, no-hover, reduced-motion, and existing scroll-transition regression pass from `specs/004-topic-choice-cards/quickstart.md` across `app/page.tsx`, `app/components/ScrollExpandingSection.tsx`, and `app/components/TopicChooser.tsx`
- [X] T015 Verify `app/globals.css`, `package.json`, `package-lock.json`, and `app/page.tsx` contain no topic-specific global CSS, new dependency, unrelated page region, Conclusion change, or Google Forms scope change
- [X] T016 Run final `npm run lint` and `npm run build` from `package.json`; record any unresolved failure in the implementation delivery summary

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: Starts immediately.
- **Phase 2 Foundational**: Depends on Phase 1; blocks all user-story work.
- **US1**: Depends on T003 and T004.
- **US2**: Depends on US1 composition and `TopicChooser.tsx` shell.
- **US3**: Depends on US2 cards, links, and destination markup.
- **Polish**: Depends on all three user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US1 (MVP) -> US2 -> US3 -> Polish
```

### Within Each User Story

- US1: component shell before page composition; composition before regression check.
- US2: card markup before CTA/destinations; complete markup before responsive checks.
- US3: semantic/focus hardening before interaction checks.
- Final lint/build runs after all source and content changes.

### Parallel Opportunities

- T003 and T004 can run together: different files, shared plan already fixed.
- T013 and T014 can run together after US3: content review and browser regression use different primary artifacts.
- Do not parallelize T005, T008, T009, T010, or T011 because each changes or validates `app/components/TopicChooser.tsx` in sequence.

## Parallel Execution Examples

### Foundation

```text
Task T003: Add typed topic content in data/content.ts
Task T004: Isolate transition track and accept children in app/components/ScrollExpandingSection.tsx
```

### Final Review

```text
Task T013: Audit copy and data rules in data/content.ts
Task T014: Run browser regression across page and components
```

## Implementation Strategy

### MVP First

1. Complete T001-T004.
2. Complete US1 tasks T005-T007.
3. Validate transition-to-heading continuity before adding cards.

### Incremental Delivery

1. **US1**: Preserve problem statement and introduce chooser heading.
2. **US2**: Add all five responsive, text-only cards and working target shells.
3. **US3**: Harden fragment navigation and accessibility.
4. **Polish**: Run governance, responsive, regression, lint, and build checks.

## Notes

- Website copy remains Brazilian Portuguese; task documentation remains English.
- The approved single-page narrative architecture remains intact.
- Topic content stays in `data/content.ts`.
- Existing Motion and Lenis behavior stays unchanged; chooser adds no animation.
- Conclusion and Google Forms are explicitly outside this feature.
- No dependency addition is authorized or required.
