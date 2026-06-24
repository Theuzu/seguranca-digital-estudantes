# Data Model: Topic Chooser Fit Refresh

## Overview

The feature keeps editorial chooser content in `data/content.ts` and preserves
all runtime interaction state inside the existing client component. No server
state, browser storage, database, or remote interface is introduced.

## Entity: TopicChooserContent

| Field | Type | Rules |
|---|---|---|
| `id` | literal string | Stable chooser section identifier |
| `title` | `TopicChooserTitle` | Exact pt-BR two-line title structure for the chooser |
| `topics` | readonly five-item tuple of `TopicChoice` | Exactly five topics in approved order |

## Entity: TopicChooserTitle

| Field | Type | Rules |
|---|---|---|
| `lineOne` | string | Exact copy: `Explore um` |
| `lineTwo` | string | Exact copy: `tema` |
| `accent` | string | Exact copy: `>>>`; rendered on the same final line as `lineTwo` |

This entity is editorial content. It controls reading order and displayed copy,
while font and color treatment remain presentation concerns.

## Entity: TopicChoice

| Field | Type | Rules |
|---|---|---|
| `id` | `TopicId` | Unique, stable fragment identifier shared with in-page destinations |
| `icon` | `TopicIconKey` | One approved visual key mapped in presentation code |
| `title` | string | Existing simplified pt-BR card title |
| `description` | string | Existing simplified pt-BR preventive summary |

## Value: TopicId

Closed union with unchanged order:

1. `senhas-autenticacao`
2. `cyberbullying-etica`
3. `computadores-compartilhados`
4. `trabalhos-na-nuvem`
5. `golpes-links-falsos`

## Value: TopicIconKey

Closed union with unchanged visual mapping:

1. `key`
2. `comments`
3. `computer`
4. `cloud`
5. `link`

## Transient Entity: RailInteractionState

| Field | Type | Rules |
|---|---|---|
| `currentIndex` | integer `0..4` | Current snapped/nearest topic index |
| `pointerId` | integer or null | Active pointer being tracked |
| `startX` | number | Pointer origin for drag-threshold math |
| `startY` | number | Pointer origin for horizontal-vs-vertical decision |
| `startScrollLeft` | number | Rail scroll origin for drag updates |
| `isDragging` | boolean | True only after the horizontal threshold passes |
| `suppressNextClick` | boolean | True after confirmed drag; consumed once |
| `settleFrame` | frame handle or null | Cancellable requestAnimationFrame handle |
| `alignmentMode` | `"mobile-center"` or `"edge-start"` | Derived from viewport width breakpoint |

This state is derived in-browser only and must not be persisted.

## Relationships

- One `TopicChooserContent` owns exactly one `TopicChooserTitle`.
- One `TopicChooserContent` owns exactly five `TopicChoice` records.
- Each `TopicChoice.id` maps one chooser card to one same-page destination.
- Each `TopicChoice.icon` maps to one decorative React Icons component.
- Tuple position maps to `currentIndex` and to one mobile pagination marker.
- `alignmentMode` controls how `currentIndex` is evaluated and where the rail
  settles after drag or focus alignment.

## Validation Rules

- Title copy must remain exactly `Explore um` / `tema` / `>>>` unless a later
  content change explicitly revises it.
- The title must render as two lines, with the accent token on the second line.
- Exactly five topics must remain present and ordered as approved.
- Topic IDs must remain unique and must continue matching destination anchors.
- No topic title or description changes are part of this feature.
- Rail geometry changes must not hide icon, title, description, focus outline,
  or pagination marker at supported viewports.
- `currentIndex` must always be clamped between `0` and `topics.length - 1`.

## Interaction State Transitions

```text
idle
  -> pointer-down
  -> click-candidate
  -> native fragment navigation

pointer-down
  -> dragging (horizontal movement >= 8px and horizontal-dominant)
  -> settling
  -> idle

settling
  -> mobile-center target (viewport < 640px)
  -> edge-start target (viewport >= 640px)
  -> immediate target when reduced motion is enabled

idle
  -> keyboard-focus
  -> alignment to readable card position
  -> native Enter activation
```
