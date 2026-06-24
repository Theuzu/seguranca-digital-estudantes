# UI Contract: Topic Chooser Fit Refresh

## Component Contract

### `TopicChooser`

```ts
type TopicChooserProps = {
  content: TopicChooserContent;
};
```

- Remains a Client Component because it owns pointer gestures, scroll
  positioning, reduced-motion behavior, animation frames, and current-index
  state.
- Receives only serializable static chooser content from the server-rendered
  page.
- Does not own remote data, persistent state, routing state, or topic-detail
  content.

## Content Contract

- Chooser title copy comes from `data/content.ts` as:
  - `Explore um`
  - `tema`
  - `>>>`
- The title renders as two visible rows, with `tema` and `>>>` sharing the final
  row.
- All five existing cards remain present once, in existing order, with existing
  icon keys, titles, and descriptions.
- No `Ver orientações` control is reintroduced.

## Composition Contract

- `app/page.tsx` remains unchanged:
  - Hero section first
  - `ScrollExpandingSection` second
  - `TopicChooser` before `TopicDetailSection`
  - Conclusion section third
- `ScrollExpandingSection` expansion behavior remains unchanged.
- Topic-detail anchors and content remain out of scope for this feature.

## Layout Contract

- Section remains a dark full-width continuation of the Content section.
- Background keeps the current grid texture and soft glow treatment.
- Heading container remains readable on short mobile heights and at 200% zoom.
- Rail becomes visually full-bleed enough that edge cards no longer look
  accidentally cropped.
- Mobile layout:
  - one dominant centered card
  - partial neighbor previews where available
  - visible pagination markers
- Tablet and desktop layout:
  - multi-card horizontal rail
  - smaller cards than current implementation
  - at least four visible cards at 1280px
  - pagination hidden

## Geometry Contract

- Card edge alignment rules:
  - mobile: centered snapping
  - tablet/desktop: start-edge snapping using the rail's computed inline inset
- First and last resting states must show full card corners and surface edges.
- Rail overflow remains scoped to the chooser only.
- Page body must never gain horizontal overflow because of the chooser.

## Interaction Contract

- Pointer down records the gesture origin but does not activate dragging yet.
- A horizontal-dominant movement of at least 8px starts dragging.
- Confirmed drag updates `scrollLeft` directly and suppresses the resulting click
  once.
- Release/cancel settles to the nearest valid card position according to current
  alignment mode.
- Reduced-motion mode sets the target immediately.
- Keyboard focus still aligns a card into a readable position without navigating.
- Whole card remains the only activation target and continues using native anchor
  navigation to `#<topic-id>`.

## Visual State Contract

| State | Required treatment |
|---|---|
| Neutral | Light card, dark icon/text, equal visual hierarchy |
| Hover | Color change only; no lift, scale, tilt, or icon movement |
| Focus visible | Same color-led emphasis plus clear accessible outline |
| Pressed | Stable surface; no transform-based compression |
| Dragging | Grabbing cursor, selection disabled, readable content preserved |
| Current mobile position | One elongated primary marker, four neutral markers |
| Reduced motion | Immediate position/color updates; no animated settling |

## Typography Contract

- Main chooser title uses `Space Grotesk`.
- Final-line accent uses `Silkscreen`.
- Accent color uses `#7EDB8A`.
- Card titles remain display-weighted and become slightly bolder on desktop than
  the current implementation.
- Card descriptions remain legible after the card size reduction.

## Accessibility Contract

- One `h2` still names the chooser.
- Icons remain decorative with `aria-hidden`.
- All five anchors remain reachable in DOM order.
- Focus outlines, markers, titles, and descriptions remain visible at 200% zoom.
- Hover-only cues are not required for touch or keyboard users.
- Reduced-motion behavior continues to honor motion-sensitive users.
