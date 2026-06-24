# Quickstart: Page.tsx Refactor Validation

**Date**: 2026-06-24

## Prerequisites

- Node.js installed
- `npm install` completed

## Setup

No setup needed — refactoring only moves/reorganizes existing code.

## Validation Commands

Run these in order after implementing the changes:

### 1. TypeScript & Lint

```bash
npm run lint
```

Expected: zero new errors or warnings.

### 2. Build

```bash
npm run build
```

Expected: `✓ Compiled successfully` (or equivalent success message).

### 3. CSS Cleanliness

```bash
rg '\.hero-' app/globals.css
```

Expected: zero matches (all `.hero-*` selectors removed).

### 4. page.tsx Composition

```bash
rg '<(HeroSection|ContentSection|ConclusionSection)' app/page.tsx
```

Expected: exactly 3 matches — one each for HeroSection, ContentSection, ConclusionSection.
And:
```bash
rg '(contentIntro|topicChooser|topicDetails)' app/page.tsx
```
Expected: zero matches (data imports moved to ContentSection).

### 5. Manual Visual Check

| Viewport | Check |
|----------|-------|
| 360px wide | Hero fills width, title readable, no clipping |
| 390px wide | Same as above on iPhone-ish size |
| 768px wide | Tablet: hero frame, grain, clouds visible |
| 1280px wide | Desktop: full hero layout, title rows aligned |
| Any + prefers-reduced-motion: reduce | Entry animations disabled |

### 6. Accessibility

- `aria-labelledby="hero-title"` still present on hero section
- `aria-hidden="true"` on decorative divs (grain, clouds, frame)
- Focus outline still visible (unchanged)

## Rollback

```bash
git checkout -- app/page.tsx app/globals.css
rm app/components/HeroSection.tsx app/components/ContentSection.tsx
```

Reverts all refactoring changes.
