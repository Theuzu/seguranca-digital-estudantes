# Quickstart: Update Design Palette Validation

## Prerequisites

- Work from the repository root:

```powershell
Set-Location -LiteralPath 'C:\Users\matheus\Projects\seguranca-digital-estudantes'
```

- Confirm the active Spec Kit feature:

```powershell
Get-Content -LiteralPath '.specify\feature.json'
```

Expected: `feature_directory` points to `specs/011-update-design-palette`.

## 1. Governance And Design Review

Verify the constitution, `design.md`, and app token layer are aligned:

```powershell
Select-String -LiteralPath '.specify\memory\constitution.md','design.md','app\globals.css' -Pattern '0E1116','374A67','DB504A','E3B505','F0EFF4','7edb8a','ff6b6b','dark-sky','green accent'
```

Expected:

- New palette values are present in active governance/design/token sections.
- Old green single-accent language is not active guidance.
- Old values are absent from active app styling.

## 2. Token Centralization Check

Search for raw new palette values:

```powershell
rg -n "#0E1116|#374A67|#DB504A|#E3B505|#F0EFF4" app design.md .specify\memory\constitution.md specs\011-update-design-palette
```

Expected:

- App hex usage is limited to `app/globals.css`.
- Documentation may reference the palette values.
- Components do not contain raw palette hex values.

Search for old palette values:

```powershell
rg -n "#060b1d|#09112a|#0d1425|#111b34|#f5f6fa|#c9cbd8|#7edb8a|#ff6b6b" app design.md .specify\memory\constitution.md
```

Expected:

- No active app usage remains.
- Any documentation usage is historical or explicitly says it is being
  replaced.

## 3. Inline Color Style Check

```powershell
rg -n "style=\{\{|background:|color:|border:|boxShadow|#[0-9A-Fa-f]{3,8}" app
```

Expected:

- Inline styles may still exist for Motion values, z-index, or CSS-variable
  references.
- No inline raw palette hex values exist in components.
- Color, background, border, and shadow usage points to semantic tokens or CSS
  variables.

## 4. Automated Checks

```powershell
npm run lint
npm run build
```

Expected:

- Both commands complete successfully.
- If either command fails, capture the exact error and do not claim completion.

## 5. Manual Visual Checks

Run the app using the project workflow available in the current environment,
then inspect the page at these viewports:

- `360 x 800`
- `390 x 844`
- `768 x 1024`
- `1024 x 768`
- `1280 x 800`
- `1440 x 900`
- `1920 x 1080`

Expected:

- Page reads as dark mode with Ink Black background and Ghost White text.
- Dusk Blue, Rosy Copper, and Saffron support hierarchy without making the UI
  noisy.
- Header, hero, topic overview, sticky guidance cards, checklist, final summary,
  and evaluation CTA are readable.
- No horizontal overflow appears.
- Portuguese headings wrap cleanly.
- Evaluation CTA remains prominent.

## 6. Accessibility Checks

Verify:

- Body text and primary controls meet WCAG AA contrast.
- Focus rings are visible on dark and support-color surfaces.
- Keyboard navigation works from top to bottom.
- Skip link still works.
- Topic anchors are not hidden under the sticky header.
- Sticky guidance cards remain readable.
- 200% zoom does not create overlap or two-dimensional scrolling.
- `prefers-reduced-motion` still produces readable static content.

## Expected Completion Evidence

The implementation report should list:

- Files changed
- Palette roles chosen
- Source-search results for old and new palette values
- Contrast checks completed
- Responsive viewport checks completed
- `npm run lint` result
- `npm run build` result
- Any known limitations

## Implementation Notes - 2026-06-30

### Files Changed

- `.specify/memory/constitution.md`
- `design.md`
- `app/globals.css`
- `app/components/HeroSection.tsx`
- `app/components/SiteHeader.tsx`
- `app/components/TopicChooser.tsx`
- `app/components/TopicDetailSection.tsx`
- `app/components/ConclusionSection.module.css`
- `specs/011-update-design-palette/contracts/palette-token-contract.md`
- `specs/011-update-design-palette/quickstart.md`
- `specs/011-update-design-palette/tasks.md`

Existing dirty worktree changes were present in other app/data files before the
final validation pass. They were reviewed for scope and not reverted.

### Palette Roles Implemented

- Ink Black: `--color-bg`, `--color-bg-deep`, page background.
- Ghost White: `--color-text`, primary readable copy.
- Dusk Blue: `--color-surface-elevated`, `--color-support-blue`, raised
  surfaces and depth.
- Rosy Copper: `--color-support-copper`, `--color-danger`, caution/emphasis.
- Saffron: `--color-accent`, `--color-support-saffron`, progress, focus, CTA.
- Borders and shadows are tokenized color mixes derived from the global palette.

### Source Searches

- Old active palette values across `app`, `design.md`, and constitution: no
  matches.
- New raw palette hex values: present in `app/globals.css` and approved
  documentation only.
- Component color usage: no raw palette hex values. Remaining inline style
  color references use semantic CSS variables for gradients, Motion values,
  borders, shadows, or z-index.

### Contrast Checks

- Ghost White on Ink Black: 16.53.
- Muted text on Ink Black: 10.84.
- Ghost White on Dusk Blue: 7.85.
- Ink Black on Saffron: 9.80.
- Ink Black on Rosy Copper: 4.74.
- Rosy Copper on Ink Black: 4.74.
- Ghost White on derived surface: 13.99.

### Automated Checks

- `npm run lint`: passed.
- `npm run build`: passed.

### Runtime Smoke Checks

Checked `http://localhost:3000` using the existing Next dev server.

- Viewports checked: `360 x 800`, `390 x 844`, `768 x 1024`,
  `1024 x 768`, `1280 x 800`, `1440 x 900`, `1920 x 1080`.
- Body background rendered as Ink Black `rgb(14, 17, 22)`.
- Body text rendered as Ghost White `rgb(240, 239, 244)`.
- Hero title was visible in every checked viewport.
- No horizontal overflow appeared in the checked viewports.
- Evaluation CTA was visible at the evaluation anchor after layout settled in
  every checked viewport.
- CTA rendered with Ink Black background and Ghost White text.
- Browser console error log was empty.

### Known Limitations

- The browser automation surface did not move focus with synthetic Tab input.
  Skip link, focus styles, topic anchors, and reduced-motion support were
  validated through source checks, build output, and anchor/viewport smoke
  checks rather than a full end-to-end keyboard traversal recording.
