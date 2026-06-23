# Quickstart: Validate Responsive Conclusion Section

## Prerequisites

- Feature implementation follows [plan.md](./plan.md).
- Content shape follows [data-model.md](./data-model.md).
- UI behavior follows [contracts/conclusion-ui.md](./contracts/conclusion-ui.md).
- Node dependencies are already installed; add no package.

## 1. Confirm Configuration State

Inspect `data/conclusion.ts`.

- During development, `formUrl: null` must produce a visible unavailable CTA
  with no `href`.
- Before release, replace null with the approved HTTPS Google Forms URL.
- Never use `[INSERIR LINK DO GOOGLE FORMS]`, an empty string, or `#` as an
  `href`.

## 2. Run Deterministic Checks

```powershell
npm run lint
npm run build
git diff --check
```

Expected:

- All commands exit successfully.
- Build reports the page without a new API route or backend.
- No dependency manifest changes are required by this feature.

## 3. Start Local Validation

```powershell
npm run dev
```

Open the local page and scroll through Hero, Content, and Conclusion.

## 4. Verify Content and Structure

Confirm:

- Conclusion appears once after all existing Content destinations.
- Label, title, two safety paragraphs, evaluation copy, thank-you copy, and
  academic-purpose note exactly match the approved pt-BR content.
- Academic-purpose note appears in the nested dark footer.
- No fourth top-level section, new route, form embed, client-logo strip, badge,
  or extra navigation appears.

## 5. Verify Responsive Layout

Check at minimum:

| Viewport | Expected outcome |
|----------|------------------|
| 390x844 | One-column order, 24px padding, readable CTA, no clipping |
| 768x1024 | Comfortable reflow, no compressed/overlapping callout |
| 1280x720 | Spacious editorial grid, readable measures, 48px container padding |
| 200% zoom | Same DOM order, no content loss or body overflow |

At each size, confirm `document.documentElement.scrollWidth` does not exceed
`document.documentElement.clientWidth`.

## 6. Verify Google Forms States

### Pending URL

- CTA remains visible but unavailable.
- No focusable broken link exists.
- Activating the visual treatment performs no navigation.

### Valid URL

- Pointer activation and Enter open the intended form in the current tab.
- Five pointer attempts and five keyboard attempts reach the same approved URL.
- Website does not show a submission-success message or retain form data.

## 7. Verify Accessibility

- Tab order reaches the enabled CTA at the correct reading position.
- Focus outline is visible against every surrounding surface.
- Section, evaluation heading, thank-you heading, and footer note are announced
  in logical order.
- Decorative retro marks are absent from the accessibility tree.
- Default, hover, focus, active, and disabled treatments retain readable
  contrast.

## 8. Verify Motion

With standard motion:

- Closing, evaluation, and thank-you blocks reveal once as units.
- Entrance completes within 300ms and moves no more than 16px.
- CTA interaction feedback completes within 250ms.

With reduced motion enabled:

- All content appears immediately.
- No entrance translation or stagger occurs.
- CTA and external navigation remain usable.

## 9. Regression Check

- Hero appearance and behavior remain unchanged.
- Scroll-expanding Content introduction remains unchanged.
- Topic rail dragging, snapping, keyboard access, and destinations remain
  unchanged.
- Existing smooth scrolling does not trap users before or inside Conclusion.

