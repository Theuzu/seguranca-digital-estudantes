# Quickstart: Validate Scroll-Expanding Content Section

## Prerequisites

- Node dependencies installed
- Framer Motion dependency added with user approval
- Active feature: `specs/003-scroll-expanding-section`

## Run

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Validation Scenarios

### 1. Initial Composition

1. Load page at 1280x720.
2. Confirm existing Hero remains primary content.
3. Confirm Content preview occupies 8%-12% of viewport height with larger side insets than the previous version.
4. Confirm only top corners are rounded; bottom corners are square and no background strip appears below the card.
5. Repeat at 390x844.

### 2. Forward Scroll

1. Scroll down slowly through one viewport.
2. Confirm Hero remains stationary while the card stays pinned above it and expands.
3. Confirm card grows from `10svh` with `8vw` side insets to full viewport.
4. Confirm bottom corners stay square while top corners transition from `28px` to zero.
5. Confirm copy begins fading at 50% progress and reaches full opacity by 70%.

### 3. Reverse Scroll

1. Scroll back toward Hero.
2. Confirm copy fades out between 70% and 50% in reverse.
3. Confirm card returns smoothly to the shallow preview with rounded top corners and square bottom corners.
4. Confirm Hero remains stationary and no blank background appears.
5. Confirm no jump occurs at either boundary.

### 4. Reduced Motion

1. Enable `prefers-reduced-motion: reduce` in browser settings or emulation.
2. Reload page.
3. Reach Content section.
4. Confirm full-size card and copy appear immediately with no scaling or delayed reveal.

### 5. Responsive and Accessibility

1. Check 390x844 and 1280x720.
2. Confirm no horizontal scrollbar or clipped paragraph.
3. Increase browser text size or zoom to 200% and confirm content remains readable.
4. Confirm copy exactly matches `data/content.ts`.
5. Confirm the initial preview has no visible gap or rounded lower edge at either viewport.

## Automated Checks

```powershell
npm run lint
npm run build
```

Expected: both commands exit successfully. Existing unrelated warnings must be reported separately.

## Source-Scope Check

- New static styling appears only as Tailwind classes in `ScrollExpandingSection.tsx`.
- `app/globals.css` has no new Content-section rules.
- New copy exists only in `data/content.ts`.
