# Implementation Plan: Draggable Topic Card Redesign

**Branch**: `[005-draggable-topic-cards]` | **Date**: 2026-06-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-draggable-topic-cards/spec.md`

## Summary

Replace the existing static topic grid inside the Content section with a dark,
horizontal rail of five tall, fully clickable cards. `TopicChooser` becomes the
smallest client boundary needed for pointer dragging, deterministic snapping,
current-position feedback, and click suppression after drag. Typed pt-BR copy,
icon keys, order, and fragment IDs remain in `data/content.ts`; existing
`react-icons` supplies the visuals; Tailwind handles the main layout while a
scoped CSS Module owns rail geometry and interaction-only styles. No package,
route, backend, Hero, Conclusion, or detailed-guidance change is required.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4,
Motion 12.40.0, React Icons 5.6.0; Lenis remains unchanged

**Storage**: Immutable build-time topic content in `data/content.ts`; transient
rail position and gesture state exist only in the browser

**Testing**: `npm run lint`, `npm run build`, and browser checks at 390x844 and
1280x720 for pointer/touch drag, click suppression, keyboard activation, 200%
zoom, reduced motion, fragment destinations, contrast, and body overflow

**Target Platform**: Static App Router website in modern pointer-, touch-, and
keyboard-capable browsers

**Project Type**: Next.js academic website

**Performance Goals**: Drag follows pointer without layout reflow; rail settles
on a valid card in 280 milliseconds and never exceeds the 350-millisecond spec
limit; only one scroll-state update is scheduled per animation frame

**Constraints**: pt-BR public copy; English docs; approved single-page
narrative architecture; existing scroll-expanding introduction retained; five ordered
cards; whole-card fragment links; WCAG AA; 82% mobile card target; at least four
cards visible at 1280px; no body overflow; no new dependency; no Conclusion or
Google Forms change

**Scale/Scope**: One five-item typed tuple, one client component, one scoped CSS
Module, five existing in-page destinations, and no persistent or remote data

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: All card copy stays pt-BR in
  `data/content.ts`; plan artifacts remain English.
- **Single-page narrative architecture**: Rail and destinations remain inside
  the educational-journey flow. Introduction and conclusion/evaluation stay
  untouched.
- **Data-driven topic content**: `data/content.ts` owns chooser heading, five
  stable IDs, icon keys, titles, descriptions, and editorial order.
- **Design compliance**: Dark surface, light cards, Space Grotesk, readable
  body type, rounded surfaces, and restrained status markers follow `design.md`
  and its editorial cybersecurity direction.
- **Accessible motion**: Card-state transitions use 250 ms; snap uses 280 ms;
  reduced motion disables both. Text never animates independently or becomes
  unreadable.
- **Next.js discipline**: Checked local Next.js 16 guides for Server and Client
  Components, Linking and Navigating, CSS, and Accessibility. Browser event
  handlers stay in a narrowly scoped Client Component; native fragments keep
  same-document navigation semantics.
- **Dependency restraint**: No dependency added. Existing `react-icons` supplies
  icons; existing Motion may supply `useReducedMotion`; browser Pointer Events
  and `requestAnimationFrame` supply drag/snap behavior.
- **Google Forms scope**: Conclusion is unchanged. Google Forms remains reserved
  for Conclusion work.
- **Responsible cybersecurity framing**: Simplified copy remains preventive,
  practical, student-focused, and non-operational.
- **Static-content restraint**: No API, auth, database, telemetry, form, or
  runtime content mutation is introduced.

## Project Structure

### Documentation (this feature)

```text
specs/005-draggable-topic-cards/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- topic-rail-ui.md
|-- spec.md
|-- checklists/
|   |-- requirements.md
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- page.tsx
|-- globals.css
|-- components/
|   |-- ScrollExpandingSection.tsx
|   |-- TopicChooser.tsx
|   |-- TopicChooser.module.css        # new scoped rail geometry/interaction styles

data/
|-- content.ts                         # copy, IDs, icon keys, order

AGENTS.md
```

**Structure Decision**: Keep `app/page.tsx` as the Server Component composition
root and `ScrollExpandingSection.tsx` as the existing Motion boundary.
`TopicChooser.tsx` becomes a Client Component because it needs event handlers,
refs, `scrollLeft`, pointer capture, and current-index state. Its data remains a
serializable prop from the server-owned page. Tailwind utilities define visual
tokens and hierarchy; `TopicChooser.module.css` contains only component-scoped
scroll-snap, card-basis calculations, touch-action, scrollbar, and drag-state
rules that would be brittle as long inline utility expressions. Global styles
and unrelated components remain unchanged.

## Implementation Design

- Replace `ctaLabel` with a closed `TopicIconKey` field on each `TopicChoice`.
  Use icon keys `key`, `comments`, `computer`, `cloud`, and `link`; map them to
  existing Font Awesome 6 React Icons inside `TopicChooser`.
- Keep stable ASCII topic IDs and use each as both data identity and the native
  `<a href="#topic-id">` destination. Render no nested button or link.
- Render each card as one anchor containing a decorative icon, title, and short
  description. Icon receives `aria-hidden`; card text remains the accessible
  name and explanation.
- Use a dark chooser section and neutral light cards. Hover and `focus-visible`
  transition card surface to educational blue while preserving dark readable
  text and a distinct focus outline. Press feedback remains subtle.
- Use an overflow-clipped viewport around an overflow-x rail. Mobile cards use
  82% of available width, centered snap alignment, symmetric inline scroll
  padding, side peeks, and five status markers. Tablet/desktop cards use fixed
  portrait proportions sized so at least four appear at 1280px; five may fit on
  wider screens.
- Implement one Pointer Events gesture path for mouse, pen, and touch. On
  pointer down, record pointer ID, origin, and initial `scrollLeft`; after an
  8-pixel horizontal-dominant movement, capture the pointer, mark the gesture as
  a drag, and update `scrollLeft` directly. `touch-action: pan-y` keeps vertical
  page scrolling available.
- On pointer up/cancel, find the card whose center is nearest the viewport
  center, clamp its index to first/last, and settle to its aligned offset in
  280 ms with one cancellable `requestAnimationFrame` loop. A new gesture
  cancels the prior settle. Reduced-motion mode assigns the target position
  immediately.
- Suppress the click following a confirmed drag. Movement below the 8-pixel
  threshold remains a normal native anchor click. Keyboard Enter keeps native
  link behavior.
- Track the nearest card during scroll in one `requestAnimationFrame` callback.
  Use that index only for mobile status markers and `aria-current`; do not turn
  markers into controls.
- When a card receives keyboard focus, settle it into a readable position
  without changing the fragment. Focus outlines remain inside the clipping
  boundary.
- Preserve five heading-only destinations after the rail, derived from the same
  topic tuple. Do not invent guidance copy.
- Leave `ScrollExpandingSection`, Hero, Conclusion, Lenis, global motion, and
  page composition unchanged unless implementation verification exposes a
  direct containment bug.

## Complexity Tracking

No constitution violation. Client-side state is limited to interaction the
feature explicitly requires; existing dependencies and browser APIs cover all
behavior.
