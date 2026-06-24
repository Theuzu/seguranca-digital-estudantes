---
description: "Tasks for Page.tsx Refactor — extract hero + ContentSection, convert CSS to Tailwind inline styles"
---

# Tasks: Page.tsx Refactor

**Input**: Design documents from `specs/009-page-tsx-refactor/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Visual diff + build validation (no unit tests — this is a structural refactor with zero behavioral change)

**Organization**: Tasks grouped by user story. Each story independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable — touches different files.
- **[Story]**: User story label (US1-US4).
- Include exact file paths in task descriptions.

## Path Conventions

- **Source**: `app/` for pages/components, `data/` for static content.
- Documentation and task files in English.

---

## Phase 1: Setup

**Purpose**: Confirm project baseline and read relevant docs.

- [x] T001 Confirm existing Next.js, React, Tailwind, and TypeScript setup in package.json
- [x] T002 [P] Read `node_modules/next/dist/docs/` relevant guide for App Router CSS patterns (Tailwind v4 inline styles)
- [x] T003 [P] Read existing `app/components/ScrollExpandingSection.tsx` for `useReducedMotion()` pattern reference

**Checkpoint**: Baseline confirmed; hero extraction can begin.

---

## Phase 2: Foundational

**Purpose**: Confirm no data model changes needed; theme compliance.

- [x] T004 Confirm `data/content.ts` and `data/conclusion.ts` are unchanged — refactor only moves imports
- [x] T005 Confirm no new dependencies needed (existing stack covers everything)
- [x] T006 Confirm Conclusion section untouched per FR-017

**Checkpoint**: Foundation clear; user story implementation begins.

---

## Phase 3: User Story 2 + 4 - Hero Section + CSS Cleanup (Priority: P1 + P2)

**Goal**: Extract all inline hero markup from `page.tsx` into standalone `HeroSection.tsx` component with Tailwind inline styles. Remove all `.hero-*` class selectors from `globals.css`.

**Independent Test**: Navigate to `app/components/HeroSection.tsx` — file contains full hero JSX, all styling via Tailwind/inline styles, no `.hero-*` class references. Search `globals.css` for `.hero-` — zero matches.

### Checks for Hero Section

- [ ] T007 [P] [US2+4] Visual check: hero at 360px/390px/768px/1280px matches pre-refactor pixel-perfect
- [ ] T008 [P] [US2+4] Accessibility check: `aria-labelledby="hero-title"`, `aria-hidden="true"` on decorative divs preserved
- [ ] T009 [P] [US2+4] Reduced motion check: `useReducedMotion()` disables entry animations correctly
- [x] T010 [P] [US2+4] CSS cleanup check: `rg '\.hero-' app/globals.css` returns zero matches

### Implementation for Hero Section

- [x] T011 [P] [US2+4] Create `app/components/HeroSection.tsx` as client component with `"use client"` and `useReducedMotion()` import
- [x] T012 [P] [US2+4] Move hero stage markup (`<section className="hero-stage...">` and children) from `app/page.tsx` into `HeroSection.tsx`
- [x] T013 [P] [US2+4] Replace pseudo-elements (`::before`/`::after` on `.hero-stage` and `.hero-content`) with explicit `<div>` elements or Tailwind `before:`/`after:` variants
- [x] T014 [US2+4] Convert `.hero-stage` background gradients to inline `style` object (multi-layered gradients)
- [x] T015 [US2+4] Convert `.hero-grain` background pattern to inline `style` object (radial+linear composite)
- [x] T016 [US2+4] Convert `.hero-clouds` radial gradients + blur to inline `style` object
- [x] T017 [US2+4] Convert `.hero-frame` inset/border/radius/shadow to inline `style` object with `clamp()` values
- [x] T018 [US2+4] Convert `.hero-content` layout to Tailwind classes + inline style for width/gap/padding
- [x] T019 [P] [US2+4] Convert `.hero-title` grid/gap/text-shadow to Tailwind + inline style
- [x] T020 [P] [US2+4] Convert `.hero-title-row` flex/whitespace/font-size to Tailwind + inline style; handle `:nth-child(2)` via separate className
- [x] T021 [P] [US2+4] Convert `.hero-title-smooth` and `.hero-title-pixel` to `font-(family-name:--font-*)` Tailwind classes
- [x] T022 [US2+4] Convert `.hero-subtitle` grid-placement/font/clamp sizing to Tailwind + inline style
- [x] T023 [P] [US2+4] Convert `.hero-github` grid/width/aspect-ratio/font-size to Tailwind + inline style; apply keyframe animations via `style.animation` with `useReducedMotion()` guard
- [x] T024 [US2+4] Apply hero entry animations (`hero-rise`, `hero-title-rise`) via `style.animation` with `useReducedMotion()` guard
- [x] T025 [US2+4] Apply ambient animations (`hero-cloud-drift`, `hero-light-sweep`) via `style.animation` with `useReducedMotion()` guard
- [x] T026 [US2+4] Convert `@media (max-width: 720px)` hero overrides to responsive Tailwind classes (`max-720px:`) or inline style media queries
- [x] T027 [US2+4] Import and render `<FaGithub />` inside `HeroSection.tsx` (icon comes from `react-icons/fa6` — already in page.tsx, but HeroSection is client component so import there)

**Checkpoint**: Hero section self-contained in `HeroSection.tsx`. All `.hero-*` classes removed from `globals.css`. Keyframes remain.

---

## Phase 4: User Story 3 - Content Section Composition (Priority: P2)

**Goal**: Extract `ScrollExpandingSection` wrapping logic into standalone `ContentSection.tsx` server component.

**Independent Test**: Open `ContentSection.tsx` — imports `contentIntro`, `topicChooser`, `topicDetails` from `data/content.ts` and renders `ScrollExpandingSection` wrapping `TopicChooser` + `TopicDetailSection`.

### Checks for Content Section

- [ ] T028 [P] [US3] Visual check: Content section renders identically before and after extraction
- [ ] T029 [P] [US3] No re-render regressions: `ScrollExpandingSection` scroll behavior unchanged

### Implementation for Content Section

- [x] T030 [P] [US3] Create `app/components/ContentSection.tsx` as server component (no `"use client"`)
- [x] T031 [P] [US3] Import `contentIntro`, `topicChooser`, `topicDetails` from `@/data/content`
- [x] T032 [P] [US3] Import `ScrollExpandingSection`, `TopicChooser`, `TopicDetailSection` from `@/app/components/`
- [x] T033 [US3] Render `<ScrollExpandingSection content={contentIntro}>` wrapping `<TopicChooser content={topicChooser} />` and `<TopicDetailSection topics={topicDetails} />`

**Checkpoint**: Content section self-contained in `ContentSection.tsx`. No data imports remain in `page.tsx` for content.

---

## Phase 5: User Story 1 - page.tsx Thin Shell (Priority: P1)

**Goal**: Strip `page.tsx` to minimal shell — only top-level section children + `FaGithub` import + `ConclusionSection` wiring.

**Independent Test**: Open `page.tsx` — exactly 3 top-level children: `<HeroSection />`, `<ContentSection />`, `<ConclusionSection />`. No `contentIntro`, `topicChooser`, or `topicDetails` imports.

### Implementation for page.tsx

- [x] T034 [P] [US1] Remove inline hero markup (lines 13-40) from `app/page.tsx` — replaced by `<HeroSection />`
- [x] T035 [P] [US1] Remove `ScrollExpandingSection`, `TopicChooser`, `TopicDetailSection` imports from `app/page.tsx`
- [x] T036 [P] [US1] Remove `contentIntro`, `topicChooser`, `topicDetails` imports from `app/page.tsx`
- [x] T037 [P] [US1] Add `import HeroSection from "@/app/components/HeroSection"` to `app/page.tsx`
- [x] T038 [P] [US1] Add `import ContentSection from "@/app/components/ContentSection"` to `app/page.tsx`
- [x] T039 [US1] Rewrite render to: `<main><HeroSection /><ContentSection /><ConclusionSection content={conclusionContent} /></main>`
- [x] T040 [US1] Keep `import { FaGithub } from "react-icons/fa6"` in `app/page.tsx` (per user preference)

**Checkpoint**: `page.tsx` is thin shell — exactly 3 children, minimal imports.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all user stories.

- [x] T041 [P] Run `rg '\.hero-' app/globals.css` — confirm zero matches (US4 final check)
- [x] T042 [P] Run `rg '(contentIntro|topicChooser|topicDetails)' app/page.tsx` — confirm zero matches (US1 final check)
- [x] T043 [P] Run `rg '<(HeroSection|ContentSection|ConclusionSection)' app/page.tsx` — confirm exactly 3 matches (US1)
- [x] T044 [P] Run `npm run lint` — zero new errors/warnings
- [x] T045 Run `npm run build` — compiles successfully
- [ ] T046 [P] Manual visual check at 360px, 390px, 768px, 1280px — hero identical to pre-refactor (needs dev server)
- [ ] T047 [P] Manual reduced-motion check — hero entry animations disabled (needs dev server)
- [x] T048 Verify `AGENTS.md` SPECKIT section points to `specs/009-page-tsx-refactor/plan.md` (already done during planning)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: No dependencies; start immediately.
- **Foundational**: After Setup.
- **US2+4 (HeroSection + CSS cleanup)**: After Foundational. Heaviest phase — CSS conversion is bulk of work.
- **US3 (ContentSection)**: After Foundational, parallelizable with US2+4 (different files, no overlap).
- **US1 (page.tsx thin shell)**: After US2+4 AND US3 both complete (page.tsx references both new components).
- **Polish**: After all user stories complete.

### Parallel Opportunities

| Task Set | Why Parallel |
|----------|-------------|
| T002, T003 | Different docs to read |
| T007-T010 | Visual + acc + reduced motion + CSS check — independent validations |
| T011, T012, T019, T020, T021, T023 | Different style conversions, same file but fine-grained steps can be batched |
| T028, T029, T030, T031, T032 | ContentSection creation — all independent file reads/writes |
| T034-T038, T041-T044, T046, T047 | Independent validation checks |
| US2+4 and US3 | Different components, no shared files — can be implemented in parallel |

### Implementation Strategy

1. **MVP (US2+4)**: Create `HeroSection.tsx` with full CSS-to-Tailwind conversion + clean `globals.css`. This is the heaviest phase (~15 tasks).
2. **Incremental (US3)**: Create `ContentSection.tsx` — lightweight server component (4 tasks).
3. **Final assembly (US1)**: Clean `page.tsx` once both components exist (7 tasks).
4. **Validate (Polish)**: Build/lint/visual checks (8 tasks).

---

## Notes

- No visual or behavioral changes in any phase.
- No new dependencies — only React, Next.js, Tailwind CSS v4, Motion, React Icons (already installed).
- Website copy stays in Portuguese; documentation stays in English.
- Hero `<section>` must retain `aria-labelledby="hero-title"` from original.
- Keyframe `@keyframes` declarations stay in `globals.css` — they cannot be inlined.
- Complex CSS gradients use inline `style` objects (Tailwind can't express multi-layered gradient stacks).
- Reduced motion uses `useReducedMotion()` from `motion/react` — same pattern as `ScrollExpandingSection.tsx`.
- `FaGithub` import stays in `page.tsx` per explicit user preference (FR-015).
