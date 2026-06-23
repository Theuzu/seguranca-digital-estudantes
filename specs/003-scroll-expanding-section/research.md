# Research: Scroll-Expanding Content Section

## Decision 1: Isolate Motion in One Client Component

**Decision**: Keep `app/page.tsx` server-rendered and place all browser scroll hooks inside `app/components/ScrollExpandingSection.tsx` with a `"use client"` boundary.

**Rationale**: Next.js pages are Server Components by default. Scroll progress and reduced-motion hooks require a client boundary, but the rest of the page does not. A narrow boundary minimizes client JavaScript and preserves static Hero rendering.

**Alternatives considered**:

- Mark the full page as a Client Component: rejected because it expands the client bundle without benefit.
- Use manual `window` listeners: rejected because the approved motion library already provides lifecycle-safe scroll values.

## Decision 2: Use a Sticky Two-Viewport Scroll Track

**Decision**: Keep the Hero sticky at `top-0`, overlap the Content section by `100svh`, give its outer track `200svh` height, and keep its `h-svh` viewport sticky above the Hero.

**Rationale**: Two coordinated sticky layers keep the Hero visually stationary while the higher Content layer expands over it. The card can start as a bottom-aligned preview and cover the Hero through one viewport of scroll without removing either section from document flow.

**Alternatives considered**:

- Negative margin with a normal-flow card: rejected because the card would move while expanding, contradicting the pinned clarification.
- JavaScript-controlled fixed positioning: rejected because it removes content from normal flow and requires extra boundary state; sticky layout provides the requested fixed-screen effect with native layout behavior.

## Decision 3: Scroll-Linked Motion Values

**Decision**: Use Framer Motion `useScroll` for normalized section progress and `useTransform` for card height, inline margin, top-corner radii, and text opacity.

**Rationale**: Motion values update directly with scroll and naturally reverse. No React state or per-frame rerender is needed. The revised mapping reveals copy from `0.5` to `0.7`, avoiding the delayed appearance seen in the screenshots.

**Alternatives considered**:

- Threshold-triggered entrance animation: rejected because it is not continuously linked or reversible.
- CSS scroll-driven animations: rejected because Framer Motion was explicitly requested and approved.

## Decision 4: Tailwind Utilities Inline in JSX

**Decision**: Put every static section style directly in `className` strings in `ScrollExpandingSection.tsx`. Keep only continuously animated values in Motion `style` props.

**Rationale**: This satisfies the user constraint, keeps styling colocated with the separate component, and avoids adding section selectors to the existing global Hero stylesheet.

**Alternatives considered**:

- CSS module: rejected by the inline Tailwind requirement.
- New global classes: rejected because they would mix new section ownership into `app/globals.css`.

## Decision 5: Typed Static Copy

**Decision**: Add `data/content.ts` with a readonly `ContentIntro` shape and exact two-paragraph copy.

**Rationale**: The constitution requires website content under `data/*.ts`. A serializable typed object can pass safely from the Server Component page to the client section.

**Alternatives considered**:

- Inline copy in the component: rejected by the project data-ownership rule.
- Runtime content loading: rejected because the feature is static and needs no service or storage.

## Decision 6: Reduced Motion

**Decision**: When reduced motion is requested, render final card dimensions and fully visible copy immediately.

**Rationale**: This exactly follows clarification and preserves content access without scaling or delayed opacity.

**Alternatives considered**:

- Shorter expansion: rejected because it still introduces scaling motion.
- Fade-only transition: rejected because clarification chose immediate presentation.

## Decision 7: Use a Shallow, Open-Bottom Preview Shape

**Decision**: Start the card at `10svh` with `8vw` horizontal inset, animate only its two top corner radii from `28px` to `0`, and keep both bottom corner radii at `0`.

**Rationale**: The screenshots show the current `15svh` preview occupying too much Hero space and exposing a fully rounded floating-card silhouette. A shallower preview with square bottom corners reads as a section continuing below the viewport rather than a detached pill.

**Alternatives considered**:

- Keep `15svh` and reduce only the width: rejected because it does not fix the excessive visible height.
- Round all four corners: rejected because the bottom corners become visible and create the incorrect floating-card effect.
- Remove all rounding: rejected because the rounded top edge is part of the intended card-to-section transition.

## References

- Local Next.js guide: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Local Next.js guide: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- Framer Motion React scroll hooks: `useScroll`, `useTransform`, and `useReducedMotion`
