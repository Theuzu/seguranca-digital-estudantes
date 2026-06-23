# Research: Content Topic Choice Cards

## Decision 1: Preserve a narrow client boundary

**Decision**: Render `TopicChooser` as a Server Component in `app/page.tsx` and pass it as `children` to `ScrollExpandingSection`.

**Rationale**: The existing transition needs Motion and therefore remains client-side. Cards, links, and destinations are static. Next.js 16 supports passing server-rendered UI into a Client Component through props/children, avoiding unnecessary chooser JavaScript.

**Alternatives considered**:

- Import `TopicChooser` directly into the client component: rejected because it would add static chooser markup to the client boundary.
- Create another top-level Content section: rejected because the project permits exactly three top-level sections and this work continues the existing Content section.
- Move all Content markup into `app/page.tsx`: rejected because it would split ownership of the existing transition and make the semantic section harder to keep cohesive.

## Decision 2: Isolate scroll progress from following content

**Decision**: Keep the semantic section as the outer wrapper, but move the Motion target ref and transition height/margin classes to a dedicated inner transition track.

**Rationale**: Appending chooser content to the element currently measured by `useScroll` would lengthen the target and change the existing expansion timing. An inner track preserves feature 003 behavior while allowing static content to follow inside the same section.

**Alternatives considered**:

- Leave the ref on the outer section: rejected because chooser height would distort normalized scroll progress.
- Recalculate offsets for the larger section: rejected because it couples card content height to the existing animation and expands scope.

## Decision 3: Use native fragment navigation

**Decision**: Use semantic `<a href="#topic-id">` links styled as controls and matching `id` attributes on destination headings/containers.

**Rationale**: Navigation stays within one document, needs no route transition, and must work with pointer, touch, keyboard, and JavaScript-disabled output. Native fragments meet those needs without a client handler or new dependency. The existing Lenis options are not changed and no anchor-smoothing behavior is added.

**Alternatives considered**:

- Buttons calling `scrollIntoView`: rejected because buttons are wrong semantics for navigation and require client JavaScript.
- Next.js `<Link>`: rejected because no route change, prefetch, or client transition is needed for a same-document fragment.
- Smooth-scroll handler: rejected because animation is explicitly outside scope.

## Decision 4: Keep one typed Content data source

**Decision**: Extend `data/content.ts` with one typed chooser export containing shared heading/CTA copy and a fixed five-item topic tuple.

**Rationale**: The intro already lives in this file. Keeping all second-section copy together follows constitution rules, preserves order, prevents presentation-layer duplication, and makes each topic ID the single source for card-to-destination mapping.

**Alternatives considered**:

- Put card strings directly in JSX: rejected by centralized content ownership rules.
- Create a second data file: valid but unnecessary for five closely related items in the same Content section.
- Duplicate destination headings in data: rejected because the card title already supplies the exact required heading.

## Decision 5: Use a responsive CSS grid with no carousel

**Decision**: Use one column on narrow screens, two columns at intermediate widths, and five equal columns at 1280px and above.

**Rationale**: This preserves supplied order, meets the 1280px one-row criterion, supports long Portuguese titles, and avoids horizontal page scrolling or carousel behavior.

**Alternatives considered**:

- Horizontal scrolling cards: rejected by the spec.
- Three-column desktop wrap: rejected because the 1280px acceptance criterion requires one row.
- Fixed card heights: rejected because zoom and long titles could clip copy or controls.

## Decision 6: Keep styling component-local and static

**Decision**: Use literal Tailwind utilities in `TopicChooser.tsx`; add no global selector, CSS module, image, icon, or animation.

**Rationale**: Existing theme tokens and utilities cover layout, typography, color, border, radius, and focus states. Next.js 16 CSS guidance recommends Tailwind for most component styling and global CSS only for truly global concerns.

**Alternatives considered**:

- Add topic selectors to `app/globals.css`: rejected because styles are feature-local.
- Add a CSS module: valid but unnecessary for this static utility-based layout.
- Reuse Motion hover effects from `theme-vibe.md`: rejected because animation is outside this feature.

