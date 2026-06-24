# Implementation Plan: Page.tsx Refactor

**Branch**: `[009-page-tsx-refactor]` | **Date**: 2026-06-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/009-page-tsx-refactor/spec.md`

## Summary

Refactor `page.tsx` from monolithic inline markup + data wiring into 3 thin child components. Extract inline hero markup + all `.hero-*` CSS classes from `globals.css` into new `HeroSection.tsx` with Tailwind inline styles. Extract `ScrollExpandingSection` wrapping composition into new `ContentSection.tsx` server component. No visual or behavioral changes.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4, Motion 12.40.0, React Icons 5.6.0

**Storage**: Static typed content in `data/content.ts`; no changes to data model

**Testing**: `npm run lint`, `npm run build`, visual diff against pre-refactor page, manual viewport checks at 360px/390px/768px/1280px, `prefers-reduced-motion: reduce` check

**Target Platform**: Static App Router page for modern mobile and desktop browsers

**Project Type**: Next.js academic website

**Performance Goals**: Zero behavior/perf impact — refactor is compile-time only, runtime rendering tree unchanged in depth

**Constraints**: pt-BR website copy preserved; English docs; no new dependencies; HeroSection uses Tailwind inline styles; pseudo-elements preserved via divs or before:/after: variants; keyframes stay in globals.css; ContentSection is server component; FaGithub import stays in page.tsx; ConclusionSection untouched

**Scale/Scope**: Extract 2 components (HeroSection, ContentSection), convert ~240 lines of hero CSS to Tailwind inline styles, clean globals.css, update AGENTS.md; no data model changes, no new routes, no behavior changes

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Public content unchanged. All planning artifacts in English.
- **Three-section structure**: Refactor preserves exactly Hero, Content, Conclusion. Only extraction — no section creation, removal, or reorder.
- **Data-file content model**: `data/content.ts` unchanged. Data imports move from `page.tsx` into `ContentSection.tsx`; no duplication.
- **Theme compliance**: CSS → Tailwind preserves all existing theme colors, gradients, animations, responsive behavior. No new visual tokens.
- **Clean animation**: Keyframes stay in globals.css. Reduced motion via `useReducedMotion()` (same pattern as ScrollExpandingSection).
- **Next.js discipline**: Checked `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` for CSS module vs global style rules in App Router. Tailwind v4 inline styles confirmed valid.
- **Dependency restraint**: No dependencies added. React Icons, Motion, Tailwind CSS already present.
- **Google Forms scope**: ConclusionSection untouched. Google Forms connection unchanged.
- **Responsible cybersecurity framing**: Refactor is structural only. No content changes.

## Project Structure

### Documentation (this feature)

```text
specs/009-page-tsx-refactor/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- page.tsx                       # stripped to 3 children + FaGithub import
|-- globals.css                    # hero-* classes removed; keyframes kept
|-- components/
|   |-- HeroSection.tsx            # NEW — inline hero markup + Tailwind styles
|   |-- ContentSection.tsx         # NEW — server component wrapping ScrollExpandingSection + children
|   |-- ScrollExpandingSection.tsx # unchanged
|   |-- TopicChooser.tsx           # unchanged
|   |-- TopicDetailSection.tsx     # unchanged
|   |-- ConclusionSection.tsx      # unchanged

data/
|-- content.ts                     # unchanged
|-- conclusion.ts                  # unchanged

AGENTS.md                          # update SPECKIT section to point at this plan
```

**Structure Decision**: All three changes are pure extraction. No new logic; no new files beyond the two new components. No directory structure changes.

## Complexity Tracking

No constitution violations. All existing patterns respected. No dependencies, routes, or backend scope added.

## Phase 0: Research

Research completed — no unknowns. See [research.md](./research.md) for CSS-to-Tailwind mapping reference.

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for component interface contracts.

### Quickstart Validation

See [quickstart.md](./quickstart.md) for build/validation procedure.
