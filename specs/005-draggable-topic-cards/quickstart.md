# Quickstart: Validate Draggable Topic Card Redesign

## Prerequisites

- Current feature artifacts under `specs/005-draggable-topic-cards/`
- Dependencies installed
- Browser supporting responsive, touch, keyboard, and reduced-motion testing

## Start Site

```powershell
npm run dev
```

Open the local URL printed by Next.js.

## Automated Checks

```powershell
npm run lint
npm run build
```

Expected: both exit successfully with no TypeScript, JSX accessibility, or
production-build errors.

## Scenario 1: Content and visual continuity

1. Load homepage at 1280x720.
2. Complete existing Hero-to-Content expansion.
3. Confirm original problem introduction remains the lead-in.
4. Confirm chooser continues inside Content on `#09112A` dark surface.
5. Confirm five neutral portrait cards, topic icons, simplified copy, and no
   `Ver orientações` button.
6. Confirm Hero and Conclusion are unchanged.

## Scenario 2: Desktop rail

1. Keep viewport at 1280x720.
2. Confirm at least four cards are visible simultaneously.
3. Drag rail left/right with mouse, including slow and fast releases.
4. Confirm rail follows pointer, stays within first/last boundaries, and snaps
   to a valid card within 350 ms.
5. Confirm release after drag never navigates.
6. Hover every card; confirm blue state, readable content, and smooth transition.

## Scenario 3: Mobile rail

1. Set viewport to 390x844.
2. Confirm centered card occupies about 82% of rail width.
3. Confirm neighbor peeks appear where neighbors exist.
4. Swipe through all five cards with touch emulation.
5. Confirm five status markers remain visible and current marker tracks nearest
   card.
6. Confirm vertical page scrolling still works from the chooser.

## Scenario 4: Click versus drag

1. Perform ten card clicks/taps without dragging; confirm all ten reach matching
   fragments.
2. Perform ten mouse/touch drags ending over cards; confirm zero navigations.
3. Test tiny pointer movement below threshold; confirm it remains a click.
4. Test first/last boundaries; confirm no blank end area or stuck state.

## Scenario 5: Keyboard and focus

1. Reload and Tab through all five cards.
2. Confirm each focus state is visible, blue, and fully readable.
3. Confirm partially hidden focused cards align into view.
4. Press Enter on each card; confirm matching same-section destination.
5. Confirm focus outline is not clipped.

## Scenario 6: Reduced motion, zoom, and overflow

1. Enable `prefers-reduced-motion: reduce`.
2. Confirm card colors and snap positions change immediately without inertia.
3. Set browser zoom to 200% and repeat keyboard navigation.
4. Confirm no title, description, icon, outline, or marker clips.
5. At mobile, tablet, and desktop widths, confirm body has zero horizontal
   overflow; only rail moves horizontally.

## Contract References

- [UI contract](./contracts/topic-rail-ui.md)
- [Data model](./data-model.md)
- [Research decisions](./research.md)
- [Feature specification](./spec.md)
