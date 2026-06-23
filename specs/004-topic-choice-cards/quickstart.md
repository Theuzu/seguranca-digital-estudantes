# Quickstart: Validate Content Topic Choice Cards

## Prerequisites

- Current feature artifacts under `specs/004-topic-choice-cards/`
- Project dependencies installed
- Modern browser with responsive viewport and keyboard testing support

## Start Local Site

```powershell
npm run dev
```

Open the local URL printed by Next.js.

## Automated Checks

```powershell
npm run lint
npm run build
```

Expected: both commands exit successfully with no TypeScript, JSX accessibility, or build errors.

## Scenario 1: Content continuity

1. Load the homepage at 1280x720.
2. Complete the existing Hero-to-Content scroll expansion.
3. Continue downward.
4. Confirm the original two-paragraph problem statement remains unchanged.
5. Confirm `Escolha um tema` and the card field continue inside the same Content surface.
6. Confirm existing expansion timing and reduced-motion behavior remain unchanged.

## Scenario 2: Desktop layout

1. Keep viewport at 1280x720.
2. Confirm all five cards form one equal-width row.
3. Confirm every title, description, and `Ver orientações` link is complete.
4. Confirm no card is pre-highlighted.
5. Confirm no icon, illustration, number, badge, decorative shape, or horizontal scrollbar appears.

## Scenario 3: Mobile and zoom

1. Set viewport to 390x844.
2. Confirm cards form one column in supplied order.
3. Confirm long titles wrap without clipping or covering links.
4. Increase browser zoom to 200%.
5. Confirm all copy and controls remain visible and page has no horizontal scrolling.

## Scenario 4: In-page destinations

Repeat for every card:

1. Activate `Ver orientações`.
2. Confirm URL fragment matches the topic ID defined in [data-model.md](./data-model.md).
3. Confirm viewport reaches the matching heading farther down the same Content section.
4. Confirm destination contains the matching heading only and no fabricated guidance copy.
5. Use browser Back and confirm prior position/history remains usable.

## Scenario 5: Keyboard and touch

1. Reload and navigate cards using Tab.
2. Confirm each link receives a visible, unclipped focus indicator.
3. Press Enter and confirm matching fragment destination.
4. Repeat with pointer and touch emulation.
5. Confirm card feedback does not move, scale, or animate.

## Contract References

- [UI contract](./contracts/topic-chooser-ui.md)
- [Data model](./data-model.md)
- [Feature specification](./spec.md)

