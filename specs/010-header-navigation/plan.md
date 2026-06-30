# Implementation Plan: Header Navigation

**Branch**: `[]` | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/010-header-navigation/spec.md`

## Summary

Add a responsive, AppyCamper-inspired site header that divides the single-page
academic website into its constitution-defined parts, exposes all five
data-driven topics, highlights the evaluation destination, and supports
motion-enhanced anchor navigation with reduced-motion and no-JavaScript
fallbacks. The implementation should preserve the current App Router page,
reuse the existing content data and smooth-scroll/motion stack, and keep
interactive browser-only behavior inside a small client boundary.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4, Motion
12.40.0, Lenis 1.3.23, React Icons 5.6.0

**Storage**: Static content in `data/content.ts` and `data/conclusion.ts`; no
new storage

**Testing**: `npm run lint`, `npm run build`, manual keyboard/accessibility
checks, anchor navigation checks, reduced-motion checks, and responsive checks
at the viewports required by `design.md`

**Target Platform**: Static App Router presentation page for modern mobile and
desktop browsers

**Project Type**: Next.js academic website

**Performance Goals**: Header interactions must feel immediate on mobile and
desktop; scroll navigation must not create layout shift, horizontal overflow, or
large JavaScript work during scroll

**Constraints**: Brazilian Portuguese website copy; English documentation;
single-page narrative architecture; all five topics sourced from existing
typed data; no new routes; no backend/auth/database; no new dependency; no
AppyCamper asset/code/composition copying; no large blur layer across the
viewport; essential navigation must work without smooth-scroll animation

**Scale/Scope**: One responsive header/navigation layer, anchor targets and
offsets for existing page parts, optional compact mobile topics panel, current
section/topic indication, and validation docs. Existing topic content,
conclusion copy, Google Forms URL, hero art, guidance stack, and topic chapter
content are not rewritten by this feature.

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Header labels and navigation microcopy are
  Brazilian Portuguese; this plan and generated artifacts are English.
- **Single-page narrative architecture**: The feature adds navigation within
  the existing single page and preserves the Introduction, educational journey,
  and conclusion/evaluation macro phases. It does not add routes.
- **Data-driven topic content**: Topic IDs, titles, order, and descriptions
  remain owned by `data/content.ts`. Evaluation destination remains connected
  to `data/conclusion.ts`.
- **Design compliance**: The plan follows `design.md` sections 6, 10, 13, 22,
  23, 24, and 31: site header, topic overview, responsive behavior, accessible
  motion, focus, reduced motion, and sticky-header anchor offsets.
- **Accessible motion**: Hash anchors remain the baseline. Smooth scrolling is
  enhancement only, disabled under reduced motion, and target focus/offsets
  keep content readable without animation.
- **Responsive/accessibility coverage**: Validate 360x800, 390x844,
  768x1024, 1024x768, 1280x800, 1440x900, 1920x1080, keyboard-only use, skip
  link, Escape close, focus return, visible focus, 44px touch targets, 200%
  zoom, and no horizontal overflow.
- **Next.js discipline**: Checked
  `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md`
  for hash navigation and sticky-header scroll offsets, and
  `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  for keeping client behavior in the smallest boundary.
- **Dependency restraint**: No dependency is added. Reuse existing Tailwind,
  Motion, Lenis, React, and plain anchor semantics.
- **Google Forms scope**: The header links to the existing evaluation region
  and preserves the current Google Forms CTA behavior without backend
  integration.
- **Responsible cybersecurity framing**: This is navigation/orientation work
  only. It does not add offensive-security instructions, claims, or statistics.

## Project Structure

### Documentation (this feature)

```text
specs/010-header-navigation/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- header-navigation-ui.md
|-- checklists/
|   |-- requirements.md
```

### Source Code (repository root)

```text
app/
|-- layout.tsx                    # Root layout, fonts, SmoothScroll wrapper
|-- page.tsx                      # Main single-page composition; add header
|-- globals.css                   # Design tokens, scroll offset/reduced-motion rules
|-- components/
|   |-- SiteHeader.tsx            # New compact client boundary for header state/menu
|   |-- ContentSection.tsx        # Existing data-driven intro/topic wrapper
|   |-- TopicChooser.tsx          # Existing topic overview; anchor behavior preserved
|   |-- TopicDetailSection.tsx    # Existing topic anchors/chapters; offset verified
|   |-- ConclusionSection.tsx     # Existing final/evaluation destination
|   |-- SmoothScroll.tsx          # Existing Lenis wrapper; reduced-motion compatibility checked

data/
|-- content.ts                    # Existing topic order, titles, IDs, descriptions
|-- conclusion.ts                 # Existing conclusion/evaluation ID and form URL

specs/010-header-navigation/
|-- contracts/header-navigation-ui.md
```

**Structure Decision**: Add a small `SiteHeader.tsx` client component because
active section state, mobile panel state, Escape handling, focus return, and
Motion/reduced-motion behavior need browser APIs and event handlers. Keep
`page.tsx` as the composition owner and continue sourcing labels from the data
files. Put durable scroll offset and reduced-motion defaults in `globals.css`
so hash navigation works even without JavaScript.

## Complexity Tracking

No constitution violations. The feature stays within the approved stack,
single-page architecture, and data-driven topic model.

## Phase 0: Research

Research complete. See [research.md](./research.md).

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md).

### Contracts

See [contracts/header-navigation-ui.md](./contracts/header-navigation-ui.md).

### Quickstart Validation

See [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- **Language split**: Passed. Planned public labels are pt-BR; docs are
  English.
- **Single-page architecture**: Passed. All destinations are fragments or
  existing regions in the current page.
- **Data-driven topics**: Passed. Header topic entries derive from
  `topicChooser.topics` and/or `topicDetails` by shared IDs.
- **Design compliance**: Passed. Header height, contrast, anchor offsets,
  primary evaluation action, compact mobile behavior, and AppyCamper
  non-copying constraints are documented.
- **Accessible motion**: Passed. Native anchors are baseline; smooth scroll is
  progressive enhancement with reduced-motion bypass.
- **Responsive/accessibility coverage**: Passed. Quickstart covers required
  viewport matrix, 200% zoom, keyboard, Escape/focus return, and overflow.
- **Next.js discipline**: Passed. Local Next docs for `Link` and
  Server/Client Components were checked before planning architecture.
- **Dependency restraint**: Passed. No new package planned.
- **Google Forms scope**: Passed. Header only navigates to the existing
  evaluation region.
- **Responsible cybersecurity framing**: Passed. No educational content meaning
  changes are planned.
