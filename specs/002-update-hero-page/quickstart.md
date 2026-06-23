# Quickstart: Validate Update Hero Page

## Prerequisites

- Dependencies installed with `npm install`.
- Feature implemented from `specs/002-update-hero-page/plan.md`.

## Commands

```powershell
npm run lint
npm run build
npm run dev
```

## Manual Validation

1. Open the homepage in a desktop viewport around `1440x900`.
2. Confirm the hero stage touches all viewport edges.
3. Confirm the title is exactly `Seguranca Digital para Estudantes`.
4. Confirm the subtitle is exactly `UNIFBV Wyden - Matheus Maranhao`.
5. Confirm the design visibly follows the reference image: centered composition, large split display title, soft cloudy background, subtle retro texture, and compact supporting accents if used.
6. Resize to a mobile viewport around `390x844`.
7. Confirm the title/subtitle are readable, not clipped, and no horizontal scroll appears.
8. Enable reduced motion in the browser or OS.
9. Reload the page and confirm motion is minimized while content stays visible.

## Expected Result

The homepage opens as a full-screen responsive hero that copies the reference design direction, preserves only the required current title/subtitle, passes lint/build, and remains readable with reduced motion.
