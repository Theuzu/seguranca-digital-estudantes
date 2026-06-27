# Quickstart: Reusable Topic Detail Layout

## Prerequisites

- Use the existing project dependencies from `package.json`.
- Do not install new packages for this feature.
- Before implementation, keep `AGENTS.md` pointed at this plan and check the
  local Next.js docs referenced in `plan.md`.

## Implementation Targets

- `data/content.ts`
- `app/page.tsx`
- `app/components/TopicChooser.tsx`
- `app/components/TopicDetailSection.tsx`

## Validation Commands

```powershell
npm run lint
npm run build
git diff --check
```

## Manual Validation

Start the app:

```powershell
npm run dev
```

Open the local URL printed by Next.js and validate:

1. The page still follows the approved single-page narrative architecture.
2. The topic chooser still shows the existing topic order.
3. Activating the "Computadores compartilhados" card reaches the real topic
   detail section, not an empty placeholder.
4. The shared-computer topic displays:
   - problem presentation first
   - three guidance entries second
   - five checklist items third
5. Scroll forward and backward through the guidance sequence ten times. Each
   entry must become readable and the cut transition must not leave unreadable
   overlap.
6. Enable reduced motion and confirm guidance entries render in order without
   requiring the cut animation.
7. Test 390x844, 768x1024, and 1280x720 viewports. Confirm no horizontal body
   overflow or clipped text.
8. Test at 200% zoom. Confirm topic title, problem paragraphs, guidance entries,
   checklist items, and focus states stay visible.
9. Navigate with keyboard through chooser cards and into the detail section.
   Confirm focus remains visible and reading order matches visual order.
10. Confirm no checklist item stores state or submits data.

## Expected Result

Feature passes when the supplied Topic 3 content is fully readable in the
three-part reusable layout, the sticky guidance behaves cleanly with fallback
for reduced motion, the chooser anchors land on real details, and the page keeps
the existing academic design system and single-page narrative architecture.
