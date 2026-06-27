# Implementation Plan: Scroll-Expanding Content Section

**Branch**: `[003-scroll-expanding-section]` | **Date**: 2026-06-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-scroll-expanding-section/spec.md`

## Summary

Improve the educational-journey introduction so the Hero remains pinned as a
stationary backdrop while a shallower content card overlaps and expands above
it. The initial card occupies `10svh`, uses `8vw` side insets, rounds only its
top corners, and continues square-edged below the viewport. Scroll-linked Motion
expands it to the full viewport and reveals the centered copy from 50% to 70%
progress. Static presentation styles stay directly in components through
Tailwind CSS utility classes; no section-specific CSS is added to
`app/globals.css`.

## Technical Context

**Language/Version**: TypeScript, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js, React, Tailwind CSS 4, Motion (`motion`, explicitly approved by the user)

**Storage**: Static typed copy in `data/content.ts`; no runtime storage

**Testing**: `npm run lint`, `npm run build`, browser checks at 390x844 and 1280x720, forward/reverse scroll checks, reduced-motion check

**Target Platform**: Static web presentation for modern browsers

**Project Type**: Next.js App Router academic website

**Performance Goals**: Scroll motion remains responsive on mobile and desktop; animation modifies layout-bounded values inside one isolated client component; Hero remains visually stationary; text is fully readable by 70% progress

**Constraints**: Public copy in Brazilian Portuguese; documentation in English;
approved single-page narrative architecture; exact supplied copy; initial
preview at `10svh` with `8vw` side insets; only top corners rounded; Hero pinned
behind overlapping card; copy opacity mapped from 50% to 70%; static styling
only through inline JSX Tailwind utility classes; dynamic scroll values only
through Motion `style` bindings; separate component; no backend, auth, database,
or new service

**Scale/Scope**: One new Content-section component, one typed content export, one dependency addition, and page composition changes only

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Exact student-facing paragraphs remain pt-BR in `data/content.ts`; all feature artifacts remain English.
- **Single-page narrative architecture**: Feature adds only the
  educational-journey introduction. Existing hero remains in the Introduction
  macro phase; conclusion/evaluation remains outside this feature.
- **Data-driven topic content**: `data/content.ts` owns the two-paragraph introductory copy and its stable section identifier.
- **Design compliance**: Card uses the light surface, dark readable text, large modern body typography, subtle rounded treatment, and no hacker/cyberpunk imagery.
- **Accessible motion**: One scroll-linked expansion and an earlier 50%-to-70% text fade; both reversible. Hero stays visually stationary, and reduced-motion users receive the full card and copy immediately.
- **Next.js discipline**: Read local Next.js 16 guides for Server/Client Components and CSS under `node_modules/next/dist/docs/01-app/01-getting-started/`.
- **Dependency restraint**: `motion` is new but explicitly requested and approved by the user. No other dependency is added.
- **Google Forms scope**: Conclusion is untouched; no form integration appears in this feature.
- **Responsible cybersecurity framing**: Copy describes prevention and everyday student risk without offensive instructions.
- **Tailwind/component constraint**: `ScrollExpandingSection.tsx` owns all static section styling in `className` utilities. No CSS module or new global CSS selector is created.

## Project Structure

### Documentation (this feature)

```text
specs/003-scroll-expanding-section/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- content-section-ui.md
|-- spec.md
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- page.tsx
|-- components/
|   |-- ScrollExpandingSection.tsx

data/
|-- content.ts

package.json
package-lock.json
```

**Structure Decision**: Keep `app/page.tsx` as a Server Component and compose the interactive Content section through one narrow client boundary. `ScrollExpandingSection.tsx` contains Motion hooks and all static Content-card Tailwind classes inline. `data/content.ts` contains serializable copy passed into the client component. Existing Hero content and visual details remain untouched; page composition adds sticky positioning so the Hero stays pinned behind the card.

## Implementation Design

- `app/page.tsx` remains the page-level `<main>` composition. Existing Hero content and visual treatment stay unchanged, but its section becomes `sticky top-0` so it remains stationary during the overlapping transition. `ScrollExpandingSection` stays above it through explicit stacking order.
- `ScrollExpandingSection.tsx` starts with `"use client"` and accepts a serializable `ContentIntro` prop. It imports `motion`, `useReducedMotion`, `useScroll`, and `useTransform` from the package's React entry point, `motion/react`.
- The section wrapper keeps the one-viewport overlap and two-viewport scroll track: `-mt-[100svh] h-[200svh]`. Its inner viewport remains `sticky top-0 h-svh`, bottom-aligns the card, and stays above the pinned Hero.
- Scroll progress maps from wrapper start to end. Card height grows from `10svh` to `100svh`, and horizontal inset shrinks from `8vw` to `0`.
- Only `borderTopLeftRadius` and `borderTopRightRadius` animate from `28px` to `0`; both bottom corners remain `0` throughout so the card continues below the viewport without a rounded lower edge or exposed background strip.
- Copy opacity maps progress `0.5 -> 0.7` to opacity `0 -> 1`. Copy remains centered in a constrained readable column and stays visible through the rest of expansion.
- `useReducedMotion()` switches directly to final card dimensions and opacity, bypassing progressive scaling and delayed reveal.
- All colors, spacing, typography, sizing, sticky positioning, overflow, and responsive rules use literal Tailwind utilities in JSX. Motion-controlled `height`, `marginInline`, top-corner radii, and `opacity` are the only values placed in the Motion `style` prop.
- No new rules are added to `app/globals.css`; existing Hero CSS remains intact.

## Complexity Tracking

No constitution violation. Motion is an explicitly approved dependency required by the requested scroll-linked behavior.
