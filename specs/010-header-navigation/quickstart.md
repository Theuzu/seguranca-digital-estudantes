# Quickstart: Header Navigation Validation

## Prerequisites

- Dependencies installed.
- Feature implemented according to `specs/010-header-navigation/plan.md`.
- Browser with responsive viewport tools and reduced-motion emulation.

## Static Checks

1. Run lint:

   ```bash
   npm run lint
   ```

2. Run build:

   ```bash
   npm run build
   ```

Expected result: both commands complete without errors.

## Local Runtime

1. Start the app:

   ```bash
   npm run dev
   ```

2. Open the local URL shown by Next.js.

Expected result: the single-page website loads with the header visible and no
runtime console errors related to header navigation.

## Scenario 1: First Viewport Orientation

1. Load the page at the top on a desktop viewport.
2. Confirm the header shows `Segurança Digital`, `Temas`, `Sobre`, and a
   visually primary `Avaliação` action.
3. Confirm the header does not visually dominate the hero.
4. Scroll below the hero and confirm the header gains enough contrast and a
   subtle divider.

Expected result: a student can identify the project and navigation path from
the first viewport.

## Scenario 2: Topic Navigation

1. Activate the topics entry point.
2. Confirm all five topics are visible in this order:
   - Senhas e autenticação em duas etapas
   - Cyberbullying e ética digital
   - Computadores compartilhados
   - Trabalhos na nuvem
   - Golpes e links falsos
3. Navigate to each topic.
4. Confirm the matching chapter heading and number are visible below the
   header.

Expected result: every topic is reachable from the header or panel in no more
than two interactions.

## Scenario 3: Evaluation Navigation

1. Activate the header `Avaliação` action.
2. Confirm the page reaches the final evaluation region.
3. Confirm the evaluation text and Google Forms CTA remain visible and are not
   hidden under the header.
4. Confirm the header does not bypass the academic context by opening the form
   directly unless explicitly designed and labeled that way.

Expected result: evaluation is prominent and accessible while preserving the
final-section context.

## Scenario 4: Keyboard and Focus

1. Reload the page.
2. Use Tab from the top of the page.
3. Confirm the skip link appears and reaches main content.
4. Continue through every header item.
5. Open the compact topics panel with keyboard.
6. Navigate topic links with keyboard.
7. Press Escape.
8. Confirm focus returns to the `Temas` trigger.

Expected result: no keyboard trap, visible focus throughout, and correct focus
return.

## Scenario 5: Reduced Motion

1. Enable `prefers-reduced-motion: reduce`.
2. Reload the page.
3. Activate `Temas`, a topic link, `Sobre`, and `Avaliação`.
4. Confirm destinations are reached without decorative smooth-scroll or panel
   motion.

Expected result: navigation remains complete and readable without motion.

## Scenario 6: Responsive Matrix

Check these viewports:

- 360 x 800
- 390 x 844
- 768 x 1024
- 1024 x 768
- 1280 x 800
- 1440 x 900
- 1920 x 1080

For each viewport:

1. Confirm header labels fit or collapse intentionally.
2. Confirm touch/click targets are usable.
3. Navigate to Topic 01, Topic 05, and Evaluation.
4. Confirm no destination is covered by the header.
5. Confirm no horizontal page scrollbar appears.

Expected result: the header remains usable across the design-required viewport
matrix.

## Scenario 7: 200% Zoom

1. Set browser zoom to 200%.
2. Test desktop and mobile-like widths.
3. Confirm header controls remain reachable and text does not overlap.
4. Open the topics panel and navigate to a long topic title.

Expected result: no two-dimensional scrolling is required for normal reading,
and all navigation remains usable.

## Scenario 8: Failure-Safe Anchors

1. Temporarily disable JavaScript in the browser or use a no-script validation
   profile.
2. Reload the page.
3. Use header/topic links that are still rendered as anchors.

Expected result: anchors still reach page regions in document order, even
without enhanced scrolling or active state.

## Completion Criteria

The feature is ready for implementation acceptance when:

- `npm run lint` passes.
- `npm run build` passes.
- All scenarios above pass.
- No new dependency is introduced.
- Topic order and labels match `data/content.ts`.
- Header does not obscure topic or evaluation targets.
- Reduced-motion and keyboard behavior are verified.

## Implementation Notes

- 2026-06-30: `npm run lint` passed.
- 2026-06-30: `npm run build` passed.
- 2026-06-30: Browser smoke passed on the existing local Next server at
  `http://localhost:3000/`.
- 2026-06-30: Checked desktop header at 1280 x 800: identity, `Temas`,
  `Sobre`, and primary `Avaliação` present; header height stayed at 72px and
  no horizontal overflow was detected.
- 2026-06-30: Checked `Temas` panel order and hrefs for all five topics; topic
  05 navigation reached `#golpes-links-falsos`, closed the panel, and left the
  target below the header.
- 2026-06-30: Checked mobile compact header at 390 x 844: identity and
  `Temas` remained visible, no horizontal overflow, Escape closed the panel,
  and focus returned to the trigger.
- 2026-06-30: Checked viewport matrix 360 x 800, 390 x 844, 768 x 1024,
  1024 x 768, 1280 x 800, 1440 x 900, and 1920 x 1080 for 72px header height,
  visible controls, and no horizontal overflow.
- Reduced-motion and no-JavaScript behavior were validated from implementation:
  links remain native hash anchors, smooth scrolling is skipped when
  `useReducedMotion()` is true, and global CSS disables smooth scroll under
  `prefers-reduced-motion: reduce`.
