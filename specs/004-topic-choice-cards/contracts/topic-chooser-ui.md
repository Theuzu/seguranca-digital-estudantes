# UI Contract: Content Topic Chooser

## Component Contracts

### `ScrollExpandingSection`

```ts
type ScrollExpandingSectionProps = {
  content: ContentIntro;
  children: React.ReactNode;
};
```

- Remains the client boundary for existing Motion behavior.
- Owns the single semantic Content `<section>`.
- Measures only its inner transition track.
- Renders server-provided children after the transition track.
- Does not import topic data or chooser presentation.

### `TopicChooser`

```ts
type TopicChooserProps = {
  content: TopicChooserContent;
};
```

- Remains a Server Component with no `"use client"` directive.
- Renders static semantic HTML and Tailwind classes only.
- Receives all visible public copy through its prop.

## Composition Contract

- `app/page.tsx` remains a Server Component.
- Page passes `<TopicChooser content={topicChooser} />` as child content to `ScrollExpandingSection`.
- Existing Hero stays first and unchanged.
- Scroll-expanding intro and chooser remain parts of one second top-level Content section.
- Conclusion remains third-section scope and is not added or modified here.

## Content Contract

- Visible chooser heading is exactly `Escolha um tema`.
- Five topics appear exactly once in supplied order.
- Each card contains only title, description, and visible label `Ver orientações`.
- Destination heading reuses corresponding topic title.
- Destination contains no detailed guidance copy.
- No visible text is hardcoded in presentation components.

## Navigation Contract

- Each card contains one native same-document link with `href="#<topic-id>"`.
- Each topic ID maps to exactly one matching destination `id`.
- Whole card is not clickable.
- No button click handler, router transition, `scrollIntoView`, smooth-scroll animation, or new history state is used.
- Invalid or duplicate IDs fail validation because they create dead or ambiguous controls.

## Layout Contract

- Chooser uses an asymmetric, left-aligned editorial heading area followed by the card field.
- Card grid uses one column on narrow screens, two at intermediate widths, and five equal columns at 1280px and above.
- Cards use flexible height and consistent internal structure; CTA stays easy to locate without truncating copy.
- Page never gains horizontal scrolling.
- Destinations follow cards in matching order and use sufficient scroll margin/spacing for visible fragment arrival.

## Styling Contract

- Reuse `#C9CBD8`, `#F5F6FA`, `#09112A`/`#141826`, `#4E5568`, and `#4F7CFF` through current theme language.
- Use Space Grotesk for the main chooser heading and Inter for card body/control copy; pixel influence stays restrained.
- Cards use modern rounded surfaces, firm borders, and no icon, image, badge, number, decorative shape, or new texture.
- Hover, focus, and active feedback changes color/border/emphasis immediately; no transform or transition is added.
- Static styles stay in literal JSX Tailwind classes. No topic-specific global CSS selector is added.

## Accessibility Contract

- One `h2` names the chooser; topic titles and destinations follow a valid heading order.
- Each link exposes the visible label plus enough accessible context to distinguish its topic.
- Native links support Enter, pointer, and touch without custom handlers.
- `focus-visible` treatment meets WCAG AA contrast and is not clipped.
- Text remains complete at 200% zoom.
- Layout remains usable without hover and with JavaScript unavailable for chooser behavior.

## Existing Transition Contract

- Existing `10svh` to `100svh` expansion, `8vw` inset, top-corner radius, opacity mapping, Hero pinning, and reduced-motion behavior do not change.
- Adding chooser height does not alter `useScroll` progress because Motion measures only the original transition track.

