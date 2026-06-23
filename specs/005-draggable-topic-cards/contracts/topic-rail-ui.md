# UI Contract: Draggable Topic Rail

## Component Contract

### `TopicChooser`

```ts
type TopicChooserProps = {
  content: TopicChooserContent;
};
```

- Is a Client Component because it owns pointer handlers, rail refs, browser
  scroll position, animation frames, reduced-motion state, and current index.
- Receives serializable static content from the Server Component page.
- Owns no remote data, route state, persistent selection, or detailed guidance.

## Composition Contract

- `app/page.tsx` remains a Server Component.
- `ScrollExpandingSection` remains the existing Content-section and Motion
  boundary.
- Hero stays first; Content intro and chooser stay second; Conclusion remains
  separate third-section scope.
- Existing scroll-expansion geometry and timing do not change.

## Content Contract

- Visible heading is `Escolha um tema`.
- Five cards appear once in approved order.
- Each card contains one decorative topic icon, title, and short description.
- No `Ver orientações` text or inner control remains.
- All visible copy and icon identifiers come from `data/content.ts`.

## Navigation Contract

- Complete card is one native anchor: `href="#<topic-id>"`.
- Every topic ID maps to one destination in the same Content section.
- A click/tap below the drag threshold follows the fragment.
- A gesture crossing the drag threshold suppresses exactly its resulting click.
- Keyboard Enter follows native link behavior.
- Focus alignment changes rail position only; it does not navigate.

## Gesture Contract

- Pointer down records origin but does not immediately capture or block click.
- Horizontal-dominant movement of at least 8 pixels begins dragging.
- Dragging updates rail `scrollLeft` and captures the active pointer.
- Release/cancel snaps to the nearest card center, clamped to first/last.
- Settle duration is 280 milliseconds and cancellable by a new gesture.
- Reduced motion sets the target immediately.
- Vertical touch movement remains available for page scrolling.

## Layout Contract

- Chooser uses the existing dark surface and a wide horizontal card field.
- Mobile dominant card uses 82% of available rail width with centered alignment
  and visible neighbor peeks where neighbors exist.
- Five compact, non-interactive status markers appear on mobile; current marker
  reflects nearest card.
- At 1280px, at least four portrait cards are visible.
- At wider sizes where all five fit, rail remains stable and does not require
  artificial drag.
- Rail overflow never becomes page-body overflow.

## Visual State Contract

| State | Required treatment |
|---|---|
| Neutral | Light surface, dark text/icon, equal hierarchy |
| Hover | Educational-blue surface, readable dark text/icon, 250ms transition |
| Focus visible | Same primary emphasis plus distinct unclipped outline |
| Pressed | Subtle compressed/offset feedback without text distortion |
| Dragging | Grabbing cursor, selection disabled, cards remain readable |
| Current mobile position | One elongated/primary marker; four neutral markers |
| Reduced motion | Immediate color and position changes; no inertia |

No card is featured by default.

## Accessibility Contract

- One `h2` names the chooser; card and destination headings preserve hierarchy.
- Icons use `aria-hidden`; titles and descriptions carry meaning.
- All five anchors are reachable in DOM order and activate natively.
- Focused off-screen cards move into a readable rail position.
- Status marker group exposes current position without adding controls.
- Text, icons, focus outlines, and markers remain visible at 200% zoom.
- Primary interaction states meet WCAG AA contrast.

## Responsive and Overflow Contract

- Rail uses scoped scroll-snap, scroll-padding, touch-action, and scrollbar
  rules from `TopicChooser.module.css`.
- `app/globals.css` remains unchanged unless a verified global containment bug
  cannot be fixed locally.
- No viewport creates horizontal body scrolling.
