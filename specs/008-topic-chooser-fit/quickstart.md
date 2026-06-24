# Quickstart: Validate Topic Chooser Fit Refresh

## Prerequisites

- Current feature artifacts under `specs/008-topic-chooser-fit/`
- Dependencies installed
- Browser with responsive viewport tools and reduced-motion emulation

## Start Site

```powershell
npm run dev
```

Open the local URL printed by Next.js.

## Automated Checks

```powershell
npm run lint
npm run build
git diff --check
```

Expected: all commands succeed with no new lint/build errors or whitespace
problems.

## Scenario 1: Title fit and section continuity

1. Open the homepage at 360x760.
2. Scroll through Hero into the Content section.
3. Confirm the chooser stays inside the existing dark Content area.
4. Confirm the full title `Explore um tema` is visible.
5. Confirm `>>>` appears on the final title line beside `tema`.
6. Confirm Hero and Conclusion remain unchanged.

## Scenario 2: Mobile card fit

1. Keep the viewport at 390x844.
2. Confirm one dominant centered card is visible.
3. Confirm neighboring cards are partially previewed intentionally.
4. Confirm no visible card edge looks accidentally chopped.
5. Confirm card title and description are fully readable.
6. Confirm pagination markers remain visible below the rail.

## Scenario 3: Desktop rail fit

1. Set the viewport to 1280x720.
2. Confirm at least four cards are visible at once.
3. Confirm cards are smaller than the previous implementation.
4. Confirm the rail reaches the section edge without the final visible card
   looking cut off.
5. Confirm desktop card titles feel slightly bolder while remaining readable.

## Scenario 4: Hover and focus simplification

1. On a pointer-capable desktop viewport, hover each card.
2. Confirm the only persistent hover emphasis is the color change.
3. Confirm there is no hover lift, scale, icon shift, or exaggerated shadow
   growth.
4. Tab through all cards.
5. Confirm focused cards remain fully readable and visually distinct.

## Scenario 5: Drag versus click

1. Drag the rail left and right with mouse input.
2. Confirm drag still moves the rail and settles predictably.
3. Release after dragging over a card; confirm no navigation occurs.
4. Click cards without dragging; confirm each navigates to its matching fragment.
5. Repeat on touch emulation for swipe behavior.

## Scenario 6: Reduced motion, zoom, and overflow

1. Enable `prefers-reduced-motion: reduce`.
2. Confirm settling becomes immediate.
3. Set browser zoom to 200%.
4. Confirm title, card text, icons, focus outlines, and markers remain visible.
5. Check mobile, tablet, and desktop widths for page-body horizontal overflow.
6. Confirm only the rail moves horizontally.

## Contract References

- [UI contract](./contracts/topic-chooser-fit-ui.md)
- [Data model](./data-model.md)
- [Research decisions](./research.md)
- [Feature specification](./spec.md)
