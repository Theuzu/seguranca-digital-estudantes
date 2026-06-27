# Implementation Plan: Topic Chooser Fit Refresh

**Branch**: `[008-topic-chooser-fit]` | **Date**: 2026-06-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/008-topic-chooser-fit/spec.md`

## Summary

Refine the existing topic chooser so the title fits every viewport, the rail no
longer looks cut at the edges, and the cards become smaller and visually tighter
while preserving the current drag, swipe, keyboard, and in-page anchor
behavior. The implementation keeps the chooser inside the existing Content
section, moves chooser styling out of `TopicChooser.module.css` and into inline
Tailwind-driven markup inside `TopicChooser.tsx`, and introduces one small
content-shape update in `data/content.ts` so the revised title can be rendered
as two lines with a pixel-font accent on the final line.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4, Motion
12.40.0, React Icons 5.6.0

**Storage**: Static typed content in `data/content.ts`; no persistence, remote
data, or user-generated state

**Testing**: `npm run lint`, `npm run build`, `git diff --check`, static source
checks, and manual viewport/accessibility validation at 360x760, 390x844,
768x1024, 1280x720, and 1440x900 plus 200% zoom, reduced motion, keyboard
navigation, drag-vs-click behavior, and page-overflow checks

**Target Platform**: Static App Router page for modern mobile and desktop
browsers

**Project Type**: Next.js academic website

**Performance Goals**: Keep chooser rendering in the current client component,
avoid layout shift, preserve drag settling within the existing 280ms behavior,
and keep horizontal movement contained to the rail without page-body overflow

**Constraints**: pt-BR public copy; English planning artifacts; approved
single-page narrative architecture; chooser content stays in `data/*.ts`;
no new dependencies; inline Tailwind-driven chooser styling; keep reduced-motion
fallback; preserve existing topic order and topic-detail anchors; keep hover
feedback limited to color change

**Scale/Scope**: Update one data type/value, refactor one client component's
presentation and snap geometry, remove one chooser CSS module dependency, and
update agent context; no new routes, no topic-detail redesign, no Conclusion
changes, and no new content sections

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Public chooser copy stays in Brazilian
  Portuguese inside `data/content.ts`; all generated planning artifacts stay in
  English.
- **Single-page narrative architecture**: Feature only refines the chooser
  already located inside the educational-journey flow.
- **Data-driven topic content**: `data/content.ts` remains the single owner of the
  chooser title copy, topic order, topic IDs, icon keys, and descriptions.
- **Design compliance**: Layout continues using `design.md` colors and
  typography: dark educational surface, Space Grotesk headings, Silkscreen
  short labels, readable cards, restrained effects, and accessible contrast.
- **Accessible motion**: Existing drag-settle behavior remains; hover motion is
  simplified by removing lift/scale effects. Reduced-motion behavior stays
  immediate.
- **Next.js discipline**: Checked local Next.js 16 docs for CSS usage in the
  App Router (`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`)
  and accessibility guidance (`node_modules/next/dist/docs/03-architecture/accessibility.md`).
- **Dependency restraint**: No dependency is added. Existing Tailwind, Motion,
  and React Icons cover the feature.
- **Google Forms scope**: Feature does not touch Conclusion or the Google Forms
  entry point.
- **Responsible cybersecurity framing**: Feature is presentational only and does
  not change the preventive educational cybersecurity content.

## Project Structure

### Documentation (this feature)

```text
specs/008-topic-chooser-fit/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- topic-chooser-fit-ui.md
|-- checklists/
|   |-- requirements.md
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- page.tsx                       # existing composition remains unchanged
|-- components/
|   |-- TopicChooser.tsx           # chooser layout + geometry refactor
|   |-- TopicChooser.module.css    # remove chooser dependency after refactor

data/
|-- content.ts                     # chooser title structure and existing topic copy
```

**Structure Decision**: Keep `app/page.tsx` unchanged because the feature does
not alter section composition. Concentrate all chooser refresh work in
`TopicChooser.tsx` and `data/content.ts`. Remove `TopicChooser.module.css` from
the chooser implementation rather than mixing two styling systems, because the
user explicitly asked for inline Tailwind-driven styling for this refresh.

## Implementation Design

### Content Model

- Replace the current chooser heading literal with a structured title object:
  - `lineOne: "Explore um"`
  - `lineTwo: "tema"`
  - `accent: ">>>"`
- Keep all five `TopicChoice` entries, IDs, icon keys, titles, descriptions,
  and order exactly as currently implemented.
- Update the `TopicChooserContent` type so the title object is reusable and does
  not hard-code one literal string.

### Component Layout

- Keep `TopicChooser.tsx` as a Client Component because it already owns drag
  refs, reduced-motion behavior, and browser scroll position.
- Remove the CSS Module import and rewrite chooser presentation with Tailwind
  utility classes plus a small inline `style` object only where arbitrary
  gradient/background values are clearer than utility tokens.
- Render the section as:
  1. full-bleed dark chooser wrapper with existing grid background and subtle
     blue glow
  2. inner heading container with viewport-safe top padding
  3. horizontal rail
  4. mobile-only pagination
- Render the title in two rows:
  - row 1: `Explore um`
  - row 2: `tema` + `>>>`
- Use `font-(family-name:--font-space-grotesk)` for both text rows and
  `font-(family-name:--font-silkscreen)` for the accent.
- Use `#7EDB8A` for the accent color so the final line stands apart without
  copying the bright neon reference.

### Responsive Geometry

- Section heading:
  - mobile size target: `clamp(2.9rem, 15vw, 4.9rem)`
  - desktop size target: `clamp(4.6rem, 7.4vw, 7rem)`
  - line height around `0.9`
  - max width limited to roughly `8ch` so title fills the viewport without
    escaping it
- Rail spacing:
  - mobile inline padding: `0`
  - tablet/desktop inline padding: `clamp(1rem, 2.5vw, 2.5rem)`
  - rail gap: `0.9rem` mobile, `1rem` tablet, `1.1rem` desktop
- Card sizing:
  - mobile: `flex-basis: min(78vw, 19rem)`, `min-height: 22.5rem`
  - tablet (`>= 640px`): `flex-basis: clamp(15.5rem, 34vw, 18rem)`,
    `min-height: 24rem`
  - desktop (`>= 1024px`): `flex-basis: clamp(13.75rem, 15.5vw, 15rem)`,
    `min-height: 24.5rem`
  - wide desktop (`>= 1280px`): ensure at least four cards visible while keeping
    full text readability
- Card typography:
  - desktop title weight increases from current `600` feel to a slightly bolder
    `650-700` equivalent via Tailwind weight choice and tighter letter spacing
  - descriptions stay readable but slightly denser than current layout
- Edge behavior:
  - first and last card states must show full rounded card edges
  - no card should appear accidentally chopped by the section boundary

### Interaction and Snap Logic

- Preserve:
  - `DRAG_THRESHOLD = 8`
  - `SETTLE_DURATION = 280`
  - click suppression after confirmed drag
  - reduced-motion immediate settling
  - keyboard focus-triggered alignment
- Split snap behavior by viewport mode:
  - **mobile-center mode** for widths below `640px`
    - settle target stays center-aligned
    - nearest card uses card-center vs viewport-center comparison
  - **edge-start mode** for widths `>= 640px`
    - settle target aligns card start to the rail's effective inline start inset
    - nearest card uses card start edge compared to the rail viewport leading
      edge
- Read the rail's actual computed inline padding so target scroll values and
  visual alignment use the same inset source.
- Keep pagination visible only in mobile-center mode.
- Keep vertical page scrolling available during non-horizontal gestures.

### Visual States

- Neutral card: light surface, dark text/icon, existing border softness
- Hover card: only surface/border/text color change to the approved blue state
- Focus-visible card: same color-led emphasis plus visible outline/halo for
  accessibility
- Pressed card: no scale transform; pressed state may reuse hover color without
  motion
- Remove from chooser:
  - hover translateY
  - hover icon translate/scale
  - active scale transform
  - exaggerated hover shadow growth

## Complexity Tracking

No constitution violation. Existing App Router structure, fonts, Tailwind
utilities, Motion reduced-motion hooks, and React Icons already cover the
feature without new dependencies, extra routes, backend work, or global theme
rewrites.
