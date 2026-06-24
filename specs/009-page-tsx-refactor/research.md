# Research: Page.tsx Refactor

**Date**: 2026-06-24

## Scope

No technical unknowns. Pure structural refactoring + CSS-to-Tailwind conversion. Research covers CSS mapping strategy and component boundary decisions.

## CSS-to-Tailwind Mapping Reference

### Strategy

Each `.hero-*` CSS class in `globals.css` converts to one of:

1. **Tailwind utility class** — for layout/spacing/typography that maps directly (grid, flex, padding, font, z-index)
2. **Arbitrary value** — for clamp() values and 1-off sizing (`w-[clamp(40px,9.6vw,142px)]`)
3. **Inline `style` object** — for multi-layered gradients, inset values with clamp, and filter blur (Tailwind has no utility for `filter:blur(14px)` or stacked `linear-gradient/radial-gradient`)

### Class-to-Conversion Map

| CSS Class | Tailwind Approach |
|-----------|------------------|
| `.hero-stage` | `relative grid place-items-center w-svw min-h-svh overflow-hidden isolate` + inline style for layered gradients |
| `.hero-stage::before` | Explicit `<div className="absolute inset-0 pointer-events-none z-[-3]"` + inline style (gradients + filter + transform + animation) |
| `.hero-stage::after` | Explicit `<div className="absolute inset-0 pointer-events-none z-[-1]"` + inline style (gradients + mix-blend + animation) |
| `.hero-grain` | `<div className="absolute inset-0 z-3 pointer-events-none opacity-24"` + inline style for radial+linear background pattern |
| `.hero-clouds` | `<div className="absolute inset-[-8%] z-[-2] pointer-events-none"` + inline style for radial gradients + blur |
| `.hero-frame` | `<div className="absolute pointer-events-none z-1"` + inline style for inset clamp, border, border-radius, box-shadow |
| `.hero-content` | `relative z-2 grid justify-items-center text-center` + inline style for width/min, gap, padding-block |
| `.hero-content::before` | Explicit `<div className="col-start-1 row-start-1"` + inline style (dimensions, bg, border, box-shadow, animation) |
| `.hero-title` | `<h1 className="grid justify-items-center m-0 text-[#eef3ff]"` + inline style for gap and text-shadow |
| `.hero-title-row` | `flex items-baseline justify-center gap-[0.06em] whitespace-nowrap` + inline style for font-size clamp + line-height |
| `.hero-title-row:nth-child(2)` | `nth-child(2)` handle via CSS `&:nth-child(2)` in inline style or separate className |
| `.hero-title-smooth` | `font-(family-name:--font-space-grotesk) text-[1em] font-normal` |
| `.hero-title-pixel` | `font-(family-name:--font-silkscreen) text-[0.76em] font-normal` |
| `.hero-subtitle` | Inline style for font-size clamp + `font-(family-name:--font-silkscreen) text-[#eef3ff] z-1 col-start-1 row-start-1 max-w-[min(700px,88vw)] self-center` |
| `.hero-github` | `grid place-items-center` + inline style for width clamp, aspect-ratio, font-size, color, animation |

### Keyframe Animations (stay in globals.css)

- `hero-rise` — opacity 0→1, translateY 16→0
- `hero-title-rise` — opacity 0→1, translateY 24→0, blur 8→0
- `hero-cloud-drift` — translateX -1.5→1.5%, scale 1.08→1.1
- `hero-light-sweep` — opacity 0.72→1, translateX -1.5→1.5%

### Reduced Motion

Replace `@media (prefers-reduced-motion: reduce)` with `useReducedMotion()` from `motion/react` — same pattern as ScrollExpandingSection.tsx. When reduced, skip `style.animation` on animated elements and use initial values.

### Responsive Override: `@media (max-width: 720px)`

Convert to Tailwind arbitrary breakpoint: `max-720px:` variant or inline style media queries via `@media(max-width:720px)` in style object.

## Component Boundary Decisions

### HeroSection

- `"use client"` required (uses `useReducedMotion()`)
- Takes no props
- Renders hero stage, grain, clouds, frame, content, title, subtitle, github icon
- Uses motion library for animation control (already a dependency)

### ContentSection

- Server component (no `"use client"`)
- Owns data imports: `contentIntro`, `topicChooser`, `topicDetails`
- Renders ScrollExpandingSection > TopicChooser + TopicDetailSection
- Existing ScrollExpandingSection already is `"use client"` — client boundary stays there

### page.tsx

- Removes: hero markup, scroll-section wrapping, data imports for content
- Keeps: `FaGithub` import (user preference), `conclusionContent` import, `ConclusionSection` usage
- Composition: `<HeroSection /> <ContentSection /> <ConclusionSection />`
