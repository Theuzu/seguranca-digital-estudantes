# UI Contract: Scroll-Expanding Content Section

## Component Contract

`ScrollExpandingSection` is a dedicated client component rendered immediately after the Hero.

```ts
type ScrollExpandingSectionProps = {
  content: ContentIntro;
};
```

## Composition Contract

- `app/page.tsx` remains a Server Component.
- Existing Hero content and visual treatment remain unchanged.
- Hero stays sticky at the viewport top throughout the transition.
- Content region is part of the educational journey inside page `<main>`.
- Content section overlaps and progressively covers the Hero from a higher stacking layer.
- Conclusion/evaluation scope is not added here.

## Styling Contract

- Every static section style is written directly in JSX Tailwind `className` strings.
- No CSS module is created.
- No Content-section selector or rule is added to `app/globals.css`.
- Motion `style` props contain only scroll-driven `height`, `marginInline`, top-corner radii, and `opacity` values.

## Motion Contract

- Hero and Content viewport stay pinned over one viewport of scroll progress, with Content above Hero.
- Card expands from `10svh` and `8vw` side insets to full viewport.
- Bottom corner radii remain zero; top corner radii shrink from `28px` to zero.
- Forward and reverse scrolling use the same normalized progress.
- Copy starts revealing at `0.5` and reaches full opacity at `0.7`.
- Reduced-motion mode renders final dimensions and opacity immediately.

## Content Contract

- Copy comes only from `data/content.ts`.
- Both paragraphs remain centered and in supplied order.
- Body copy uses a modern readable font, never the pixel font.

## Responsive Contract

- Validate at 390x844 and 1280x720.
- Initial card remains visibly inset on both viewports, occupies 8%-12% of viewport height, and shows no page-background strip below it.
- Initial card shows rounded top corners and square bottom corners on both viewports.
- Final card reaches viewport edges.
- Hero remains visually stationary until the card fully covers it.
- No horizontal scroll, clipped text, unintended gap, or incoherent overlap.

## Accessibility Contract

- Section uses semantic `<section>` markup with an accessible label or heading relationship.
- Text remains present in DOM throughout animation.
- Hidden-stage opacity does not block access after transition completion.
- Browser zoom and reduced-motion settings preserve readability.
