# Design Specification — Segurança Digital para Estudantes

> **Document purpose:** binding design and implementation brief for an AI coding agent.
>
> **Project URL:** https://seguranca-digital-estudantes.vercel.app/
>
> **Visual reference:** https://appycamper.com/
>
> **Project type:** responsive, single-page educational website for a college extension project.
>
> **Primary language of the interface:** Portuguese (Brazil), `pt-BR`.
>
> **Existing stack:** Next.js, TypeScript, Tailwind CSS, Motion (`motion/react`), deployed on Vercel.

---

## 1. Instructions to the implementation agent

This file is the source of truth for the redesign. Treat statements using **must**, **must not**, **required**, and **do not** as hard constraints.

Before modifying code:

1. Inspect the existing repository structure, global styles, font setup, content data, image assets, and reusable components.
2. Preserve the existing educational content and its order unless this document explicitly authorizes shortening or restructuring it.
3. Preserve the current data-driven architecture. Do not hardcode five independent topic sections when they can be generated from `@/data/content`.
4. Reuse the existing stack. Do not introduce another animation framework, component library, CSS-in-JS library, WebGL library, or page builder.
5. Implement progressively. The page must remain readable and functional without scroll animation.
6. Do not copy AppyCamper’s brand assets, exact composition, typography treatment, source code, or illustrations. Translate its design principles into an original educational experience.
7. After implementation, report:
   - files changed;
   - components added or removed;
   - design decisions made;
   - accessibility checks completed;
   - responsive viewport checks completed;
   - any known limitations.

### Priority order

When requirements compete, use this order:

1. Content clarity and semantic structure.
2. Accessibility and reduced-motion behavior.
3. Responsive layout and touch usability.
4. Visual hierarchy.
5. Animation and decorative effects.

Never sacrifice the first three priorities to preserve an animation.

---

## 2. Project context

The website teaches students practical digital-safety habits. Its audience is approximately 16–25 years old, with varied educational backgrounds, so the experience must be visually engaging without becoming difficult to understand.

The content is organized into five topics:

1. **Senhas e autenticação em duas etapas**
2. **Cyberbullying e ética nos grupos de turma**
3. **Computadores da biblioteca e laboratório**
4. **Proteção de trabalhos no Google Drive ou OneDrive**
5. **Golpes de estágio, cursos e links falsos**

Each topic follows the existing educational model:

1. **O problema** — explains the risk.
2. **Como se proteger / Como agir** — presents three practical actions.
3. **Checklist rápido** — summarizes the behavior to remember.

This model must remain recognizable throughout the redesign.

---

## 3. Design objective

Transform the current sequence of informational blocks into a coherent, scroll-driven visual journey.

The desired experience should feel:

- editorial rather than dashboard-like;
- playful but credible;
- modern but understandable;
- atmospheric without becoming visually noisy;
- clearly organized into five chapters;
- inspired by the pacing and hierarchy of AppyCamper, not copied from it.

The visitor should always understand:

- what the website is about;
- which topic they are currently reading;
- how many topics remain;
- what action they should remember from each section;
- how to move to the next topic or the evaluation form.

---

## 4. Core visual concept

### 4.1 Design character

Use an **editorial cybersecurity journey** with a subtle mix of:

- large, expressive typography;
- Ink Black dark-mode backgrounds with Ghost White text;
- low-poly or softly pixelated decorative objects;
- thin technical borders and counters;
- clear educational layouts;
- slow, deliberate scroll motion.

The low-poly and pixel influences are decorative accents, not the primary reading style. The site must not look like a retro game.

### 4.2 Avoid these visual clichés

Do not use:

- green “Matrix” code rain;
- hooded hacker stock photography;
- excessive neon glows;
- a dashboard full of small widgets;
- fake terminal windows as the main content container;
- glowing borders on every element;
- five unrelated topic colors;
- random 3D objects without narrative purpose;
- glassmorphism over large text-heavy surfaces;
- animations that make the visitor wait before reading.

### 4.3 Translating the AppyCamper reference

| AppyCamper principle | Adaptation for this project |
|---|---|
| Oversized editorial headings | Large Portuguese topic headings with controlled line breaks |
| Numbered progression such as `1 — 5` | Persistent topic labels such as `01 / 05` |
| Long scroll narrative | One clear educational chapter per topic |
| Dramatic section transitions | Restrained image, text, and sticky-card transitions |
| Strong use of empty space | Fewer elements per viewport and wider separation between ideas |
| Project/service panels | Problem, guidance steps, and checklist panels |
| Playful visual identity | Low-poly/pixel objects and Silkscreen labels |

---

## 5. Non-goals

The redesign must not:

- turn the page into an application dashboard;
- add authentication, user accounts, or a backend;
- convert the content into a long quiz;
- replace the academic evaluation form;
- invent security statistics or unsupported claims;
- hide essential information behind hover-only interactions;
- require horizontal scrolling;
- require a high-end device to render smoothly;
- use sound, autoplay video, WebGL, or canvas for essential content;
- split the page into separate routes unless the existing project already requires that architecture.

---

## 6. Information architecture

Use the following page order.

```text
01. Skip link
02. Site header
03. Scroll-driven hero
04. Project introduction
05. Five-topic overview / navigation
06. Topic 01
    06.1 Topic problem
    06.2 Guidance heading
    06.3 Three-card sticky sequence
    06.4 Checklist
    06.5 Next-topic transition
07. Topic 02 — same pattern
08. Topic 03 — same pattern
09. Topic 04 — same pattern
10. Topic 05 — same pattern
11. Final summary
12. Evaluation call to action
13. Acknowledgment
14. Footer
```

Do not place all five sections inside one visually indistinguishable dark column. Each chapter needs a clear beginning and ending.

---

## 7. Global layout system

### 7.1 Containers

Use a small set of consistent widths.

| Token | Value | Usage |
|---|---:|---|
| `--page-max` | `1440px` | Large page-level compositions |
| `--content-max` | `1344px` | Existing main content grid |
| `--stack-max` | `1120px` | Guidance card stack |
| `--reading-max` | `720px` | Long paragraphs |
| `--compact-max` | `560px` | Short supporting copy |

Do not allow headings or body copy to expand across the full viewport width.

### 7.2 Page gutters

Use fluid but predictable horizontal gutters:

```css
--gutter: clamp(1.5rem, 5vw, 5rem);
```

Equivalent targets:

- mobile: `24px`;
- tablet: `40–48px`;
- desktop: `64–80px`;
- very large screens: do not exceed `96px` unless part of a deliberate full-bleed composition.

### 7.3 Grid

- Mobile: 4 conceptual columns.
- Tablet: 8 conceptual columns.
- Desktop: 12 conceptual columns.
- Standard grid gap: `24px` mobile, `32px` desktop.
- Full-bleed imagery may leave the content grid, but text must remain aligned to the grid.

### 7.4 Vertical rhythm

Use this spacing scale:

```text
4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160px
```

Recommended section padding:

- compact section: `64–80px`;
- standard section: `96–128px`;
- major chapter boundary: `128–160px`;
- mobile values may be reduced by approximately 25–35%, but must not become cramped.

Use space and borders to separate ideas. Do not wrap every block in a rounded card.

---

## 8. Design tokens

Define the palette once in global CSS variables and expose it through Tailwind CSS variables. Do not repeat arbitrary hex values throughout components, and do not apply palette colors as inline component styles.

```css
:root {
  --palette-ink-black: #0E1116;
  --palette-dusk-blue: #374A67;
  --palette-rosy-copper: #DB504A;
  --palette-saffron: #E3B505;
  --palette-ghost-white: #F0EFF4;

  --role-page: var(--palette-ink-black);
  --role-page-deep: var(--palette-ink-black);
  --role-surface: color-mix(in srgb, var(--palette-dusk-blue) 30%, var(--palette-ink-black));
  --role-surface-elevated: var(--palette-dusk-blue);
  --role-copy: var(--palette-ghost-white);
  --role-muted: color-mix(in srgb, var(--palette-ghost-white) 74%, var(--palette-dusk-blue));
  --role-accent: var(--palette-saffron);
  --role-support-blue: var(--palette-dusk-blue);
  --role-support-copper: var(--palette-rosy-copper);
  --role-support-saffron: var(--palette-saffron);
  --role-danger: var(--palette-rosy-copper);
  --role-line: color-mix(in srgb, var(--palette-ghost-white) 18%, transparent);
  --role-line-strong: color-mix(in srgb, var(--palette-ghost-white) 34%, transparent);
  --role-shadow: color-mix(in srgb, var(--palette-ink-black) 72%, transparent);
}

@theme inline {
  --color-page: var(--role-page);
  --color-page-deep: var(--role-page-deep);
  --color-surface: var(--role-surface);
  --color-surface-elevated: var(--role-surface-elevated);
  --color-copy: var(--role-copy);
  --color-muted: var(--role-muted);
  --color-accent: var(--role-accent);
  --color-danger: var(--role-danger);
  --color-support-blue: var(--role-support-blue);
  --color-support-copper: var(--role-support-copper);
  --color-support-saffron: var(--role-support-saffron);
  --color-line: var(--role-line);
  --color-line-strong: var(--role-line-strong);
  --color-shadow: var(--role-shadow);
}
```

These combinations provide strong contrast on the dark background when used in their defined roles. If any role is changed, retest all text and control states.

### 8.1 Color usage

- `--color-bg`: Ink Black primary page background.
- `--color-bg-deep`: Ink Black hero depth and section transition background.
- `--color-surface`: derived dark surface for image placeholders, cards, and secondary panels.
- `--color-surface-elevated`: Dusk Blue active sticky card or emphasized panel.
- `--color-text`: Ghost White headings and primary information.
- `--color-text-muted`: muted Ghost White body copy and secondary labels.
- `--color-accent`: Saffron progress, topic numbers, focus, and primary CTA emphasis.
- `--color-support-blue`: Dusk Blue depth, panels, and cool hierarchy.
- `--color-support-copper`: Rosy Copper caution, contrast accents, and educational emphasis.
- `--color-support-saffron`: Saffron highlights, progress, and CTA priority.
- `--color-danger`: Rosy Copper warnings and suspicious behavior only.
- `--color-border`: structural separators.

Do not use Rosy Copper as a blanket decoration. It may support hierarchy, but warning or danger meaning must remain clear when it is used for caution states.

### 8.2 Borders, radii, and shadows

- Standard divider: `1px solid var(--color-border)`.
- Strong divider: `1px solid var(--color-border-strong)`.
- Standard card radius: `24px` desktop, `18px` mobile.
- Small control radius: `999px` for pills, `12px` for buttons.
- Use shadows sparingly and only to separate stacked cards.

Suggested sticky-card shadow:

```css
box-shadow: 0 24px 80px var(--color-shadow);
```

Do not combine a strong shadow, glow, translucent background, and heavy border on the same element.

---

## 9. Typography

### 9.1 Font roles

Preserve the existing font direction:

- **Display and major headings:** Space Grotesk.
- **Small technical labels and counters:** Silkscreen.
- **Body:** use the existing readable sans-serif, preferably Inter if it is already loaded. Do not add a fourth font.

### 9.2 Type scale

```css
--text-label: clamp(0.68rem, 0.8vw, 0.8rem);
--text-body: clamp(1rem, 1.1vw, 1.18rem);
--text-body-large: clamp(1.12rem, 1.5vw, 1.4rem);
--text-card-title: clamp(2rem, 5vw, 5rem);
--text-section-title: clamp(2.8rem, 7vw, 7rem);
--text-hero: clamp(3.4rem, 10vw, 10rem);
```

### 9.3 Typography rules

- Hero heading line height: `0.84–0.92`.
- Topic heading line height: `0.88–0.96`.
- Body line height: `1.55–1.75`.
- Body paragraph width: ideally `55–70ch`.
- Avoid all caps for long text.
- Silkscreen labels may use uppercase, but must remain short.
- Use deliberate line breaks in hero and topic titles only when necessary.
- Do not distort individual letters to the point that Portuguese words become difficult to read.
- Do not use `text-align: justify`.
- Do not reduce body copy below `16px`.

### 9.4 Recommended labels

Use consistent labels rather than vague repeated words:

- `PROJETO DE EXTENSÃO`
- `01 / 05`
- `O PROBLEMA`
- `COMO SE PROTEGER`
- `CHECKLIST`
- `PRÓXIMO TEMA`
- `AVALIAÇÃO`

The current labels `etapa` and `pronto?` may be replaced by the clearer terms above.

---

## 10. Header

### 10.1 Desktop

The header should be fixed or sticky at the top and remain visually quiet.

Structure:

```text
[Segurança Digital]       [Temas] [Sobre] [Avaliação ↗]
```

Requirements:

- maximum height: `72px`;
- horizontal gutter must align with the page grid;
- initial hero state may be transparent;
- after scrolling, use an opaque or nearly opaque dark background with a bottom border;
- do not use a large blur layer across the full viewport;
- the evaluation link is the primary navigation action;
- active topic state may be shown as `03 / 05` or an accent underline;
- anchors must account for header height using `scroll-margin-top`.

### 10.2 Mobile

Use a compact header:

```text
[Segurança Digital]       [Temas]
```

The `Temas` control may open a small accessible panel or jump to the topic overview. Do not build a complex full-screen navigation unless the current project already has one.

Touch targets must be at least `44px` high even when the visible icon or label is smaller.

### 10.3 Keyboard behavior

- Include a visible “Pular para o conteúdo” skip link.
- Every navigation item needs a visible focus state.
- Escape must close any mobile menu.
- Focus must return to the trigger after closing the menu.

---

## 11. Hero section

### 11.1 Purpose

The hero must immediately communicate that the site provides practical digital-safety guidance for students. It should establish the visual world without delaying access to content.

### 11.2 Content

Recommended structure:

```text
PROJETO DE EXTENSÃO · UNIFBV WYDEN

PROTEJA SUA
VIDA DIGITAL.

Orientações práticas para proteger contas,
trabalhos acadêmicos e interações online.

[EXPLORAR OS 5 TEMAS ↓]
```

The exact headline may be refined, but it must remain short, direct, and in Portuguese.

### 11.3 Layout

Desktop:

- full viewport sticky scene;
- hero scroll track: approximately `320–400svh`;
- sticky scene: `100svh`;
- text occupies roughly 6–7 columns;
- decorative object field occupies the remaining space and may overlap the composition without obscuring text;
- headline should dominate the first viewport;
- CTA must be visible before scrolling.

Mobile:

- hero scroll track: approximately `220–280svh`;
- sticky scene: `100svh`;
- text remains in the upper or middle safe area;
- use fewer objects and smaller motion ranges;
- CTA remains accessible and must not be covered by decorative objects;
- account for mobile browser bars using `svh` rather than only `vh`.

### 11.4 Decorative art direction

Use the Ink Black dark-mode, low-poly/pixel direction. Possible objects:

- three to five clouds at different depths;
- a key;
- a shield;
- a small virus shape;
- a lock;
- a laptop;
- a router or network node;
- a satellite.

Constraints:

- do not show every object at the same time;
- maximum of approximately seven visible objects on desktop and four on mobile;
- clouds should feel distant and slow;
- objects must have a shared lighting, edge softness, and color treatment;
- objects are decorative and must use `alt=""` and `aria-hidden="true"`;
- do not use photorealistic assets mixed with low-poly objects;
- avoid large high-frequency particle fields.

### 11.5 Hero motion sequence

A suggested narrative sequence:

1. **0–18%:** title and distant clouds establish the scene.
2. **18–38%:** key and shield enter slowly.
3. **38–58%:** virus or suspicious link object appears; title support text becomes more prominent.
4. **58–78%:** laptop, router, or network nodes form a small digital ecosystem.
5. **78–100%:** objects drift outward and the page transitions into the project introduction.

Motion constraints:

- use `transform` and `opacity` for most movement;
- no object should travel across the entire screen rapidly;
- vertical movement should generally remain below `20vh`;
- rotation should be slow and subtle;
- do not use infinite attention-grabbing loops on major objects;
- the hero must have a static reduced-motion state.

### 11.6 Hero exit

The transition into the introduction should feel continuous. Use one of:

- a background-color blend;
- a large cloud or dark shape acting as a wipe;
- the hero title moving slightly upward while the intro enters;
- a simple opacity crossfade.

Do not use a hard white flash or abrupt page jump.

---

## 12. Project introduction

### 12.1 Purpose

Explain why digital safety matters in college before asking the visitor to choose a topic.

### 12.2 Layout

Desktop:

```text
[Small label / chapter context]   [Large 2–3 line statement]
                                 [Short supporting paragraph]
```

Use a two-column editorial layout, approximately 4 columns / 8 columns.

Mobile:

- stack vertically;
- label above statement;
- supporting copy below;
- avoid centered long paragraphs.

### 12.3 Content constraints

- Keep the existing meaning.
- Maximum two short paragraphs.
- Do not repeat the full hero message.
- Emphasize daily student contexts: academic platforms, shared computers, cloud documents, and class groups.

---

## 13. Topic overview

### 13.1 Purpose

Provide an understandable map of the five-topic journey and allow direct navigation.

### 13.2 Desktop layout

Use five full-width rows inside `--content-max`:

```text
01   SENHAS E AUTENTICAÇÃO                     →
02   CYBERBULLYING E ÉTICA DIGITAL              →
03   COMPUTADORES COMPARTILHADOS                →
04   TRABALHOS NA NUVEM                         →
05   GOLPES E LINKS FALSOS                      →
```

Requirements:

- each row is an anchor link;
- row height: approximately `96–128px`;
- number uses Silkscreen and accent color;
- title uses Space Grotesk;
- arrow moves no more than `4–8px` on hover;
- a subtle image or object preview may appear on hover, but the row must remain understandable without it;
- use top borders, not five disconnected floating cards;
- last row includes a bottom border.

### 13.3 Mobile layout

- vertical list only;
- no horizontal carousel;
- row height: at least `80px`;
- allow title to wrap to two lines;
- arrow remains visible;
- no hover-dependent information.

### 13.4 Current-topic progress

During topic sections, a compact progress indicator may be fixed near the screen edge:

```text
03 / 05
```

or:

```text
01 ━ 02 ━ 03 ━ 04 ━ 05
```

On mobile, prefer the compact numeric form. Do not let the indicator overlap content or system safe areas.

---

## 14. Topic chapter structure

Every topic must use the same structural system so visitors learn the pattern once.

Each topic consists of:

1. Problem introduction.
2. Guidance heading.
3. Three sticky guidance cards.
4. Checklist.
5. Next-topic transition.

The chapter number must be visible near the title as `01 / 05`, `02 / 05`, and so on.

---

## 15. Topic problem section

### 15.1 Desktop composition

Use a split layout:

```text
┌────────────────────────────┬────────────────────────────┐
│ 01 / 05                    │                            │
│ LARGE TOPIC TITLE          │        TOPIC IMAGE         │
│                            │                            │
│ ─────────────────────────  │                            │
│ O PROBLEMA                 │                            │
│ Short paragraphs           │                            │
└────────────────────────────┴────────────────────────────┘
```

Requirements:

- minimum height may be `100svh` on large screens;
- text side: approximately 50%;
- image side: approximately 50%;
- title begins near the top and problem copy anchors the lower portion;
- image is full-bleed within its half;
- use an opaque background under text;
- do not place long paragraphs over the image.

### 15.2 Mobile composition

Use this order:

1. topic image, approximately `42–52svh`;
2. chapter number and title;
3. problem heading and paragraphs.

Do not force the desktop split into a cramped two-column mobile layout.

### 15.3 Topic imagery

Every topic should have one strong visual with a consistent treatment.

Art direction:

- student-centered rather than generic corporate imagery;
- similar aspect ratio across all topics;
- slightly reduced saturation;
- dark blue overlay or color grade;
- consistent border or crop behavior;
- enough negative space to fit within the composition;
- no text embedded inside image files.

Suggested visual subjects:

- passwords: device, key, lock, authentication prompt;
- cyberbullying: class-group messages or abstracted communication tension;
- shared computers: library or laboratory workstation;
- cloud work: collaborative document and file organization;
- scams: suspicious opportunity message, link, or false form.

Use `next/image` with correct `sizes`, intrinsic dimensions, and lazy loading except for any image that is actually the LCP asset.

---

## 16. Guidance section — required redesign

This is the highest-priority structural change.

### 16.1 Existing implementation problem

The current `TopicDetailSection.tsx` uses:

- an `absolute inset-0` card layer;
- clip-path reveal and removal;
- opacity and vertical transforms;
- a two-column sticky layout with the heading on the left.

This makes cards visually replace each other inside the same layer and can make a new card appear mixed with the previous card. It also keeps the guidance title at the side when the desired layout places it above the sequence.

### 16.2 Required composition

The section title must be above the cards, centered within the main content width.

```text
                    COMO SE PROTEGER
          Três cuidados que reduzem este risco.

       ┌─────────────────────────────────────┐
       │ 01                                  │
       │ USE SENHAS DIFERENTES               │
       │ Supporting text                     │
       └─────────────────────────────────────┘

            [02 card visible below / approaching]
            [03 card visible later in sequence]
```

Desktop header:

- centered container, but text may remain left-aligned inside it;
- maximum width: `--stack-max`;
- padding top: `112–144px`;
- padding bottom: `48–72px`;
- label above heading;
- heading should not occupy a permanent left column.

Mobile header:

- left-aligned;
- standard mobile gutters;
- padding top: `80–96px`;
- padding bottom: `32–48px`.

### 16.3 Required sticky-card model

Replace the absolute clip-path sequence with cards in normal document flow using CSS sticky positioning.

Every card must use the **same sticky top value**.

Example structure:

```tsx
<section aria-labelledby={headingId}>
  <header className="...">
    <p>COMO SE PROTEGER</p>
    <h3 id={headingId}>{heading}</h3>
  </header>

  <ol className="mx-auto max-w-[1120px] px-[var(--gutter)]">
    {entries.map((entry, index) => (
      <motion.li
        key={entry.id}
        style={{ zIndex: index + 1 }}
        className="sticky top-[clamp(5rem,10vh,7rem)] min-h-[68svh] ..."
      >
        ...
      </motion.li>
    ))}
  </ol>
</section>
```

Hard constraints:

- all cards use one identical `top` value;
- do not increase `top` by card index;
- cards must not be `absolute inset-0`;
- cards must have an opaque background;
- each later card receives a greater `z-index`;
- each later card must fully cover the previous card when it reaches the sticky point;
- all cards have the same width and general minimum height;
- the section heading is outside the sticky card viewport;
- do not use clip-path to remove the previous card;
- the stack must remain centered;
- the next card should naturally become visible beneath the current card before it reaches the sticky point;
- do not place unrelated content beside the cards.

### 16.4 Card sizing

Desktop:

- maximum width: `1120px`;
- minimum height: approximately `68svh`;
- maximum practical height: content must fit without clipping at `768px` viewport height;
- sticky top: approximately `80–112px`, accounting for the header;
- gap between cards in document flow: `24–32px`;
- padding: `48–72px`;
- radius: `24px`.

Mobile:

- width: viewport minus `24px` gutters on each side;
- minimum height: approximately `68–74svh` when content fits;
- allow height to become `auto` for longer content;
- sticky top: approximately `64–80px`;
- gap: `16px`;
- padding: `24–32px`;
- radius: `18px`.

Do not set a fixed height that clips body copy. Use `min-height`.

### 16.5 Card internal layout

Desktop recommended layout:

```text
┌────────────────────────────────────────────────────┐
│ 01 / 03                               small icon   │
│                                                    │
│ USE SENHAS                                        │
│ DIFERENTES                                        │
│                                                    │
│ Supporting paragraph limited to a readable width. │
│                                                    │
│ ─────────────────────────────────────────────────  │
│ topic 01                       próximo cuidado ↓   │
└────────────────────────────────────────────────────┘
```

Internal rules:

- number in Silkscreen, accent color;
- title in Space Grotesk;
- paragraph width: maximum `60–65ch`;
- use only one small decorative icon or object per card;
- optional bottom metadata line may reinforce progress;
- do not put multiple tiny badges inside the card;
- do not center long body text;
- cards may alternate subtle object placement, but text alignment remains stable.

### 16.6 Card motion

Sticky positioning provides the primary transition. Motion should only enhance the content:

- title: fade from `0.65` to `1` and move `16–24px` upward;
- paragraph: fade with a small delay;
- decorative object: slight scale or rotation;
- previous card may darken subtly as it becomes covered;
- do not move the whole card sideways;
- do not animate height, width, top, or large blur values;
- do not make the cards transparent while overlapping.

### 16.7 Reduced motion

When `useReducedMotion()` is true:

- render the same content as a normal static list;
- remove sticky behavior if it causes long scroll or overlapping;
- remove entry transforms and rotations;
- preserve all headings, numbering, and borders;
- do not duplicate visible and screen-reader content unnecessarily.

### 16.8 Semantic structure

Use one visible `<ol>` with one `<li>` per guidance step. The animated element should remain semantic.

Avoid this pattern unless strictly necessary:

- one `sr-only` list for assistive technology;
- one separate `aria-hidden` visual list.

Prefer one source of content in the DOM to reduce duplication and maintenance risk.

---

## 17. Checklist section

### 17.1 Purpose

The checklist is the conclusion of a topic, not another guidance-card sequence.

### 17.2 Layout

Desktop:

```text
[CHECKLIST / title]       [01 Item]
                          [02 Item]
                          [03 Item]
                          [04 Item]
                          [05 Item]
```

Use the existing two-column editorial relationship, but make the left title column smaller and the right list dominant.

Mobile:

- title first;
- list below;
- full-width rows;
- numbers aligned consistently.

### 17.3 Visual rules

- use top and bottom borders;
- row padding: `20–28px`;
- number circle may remain, but it should not look like an unchecked checkbox;
- checklist text should be smaller than the guidance-card title;
- line height must allow two-line items comfortably;
- use accent only on the number or a small check symbol;
- do not make the items interactive unless the implementation genuinely stores local completion state and clearly communicates that behavior.

Default behavior should remain a static, readable summary.

### 17.4 Next-topic action

After the checklist, include a clear next-topic transition:

```text
PRÓXIMO TEMA · 02 / 05
Cyberbullying e ética digital                  →
```

The transition should be a large anchor row, not a small button floating after a long section.

Topic 05 should instead lead to the final summary.

---

## 18. Chapter transitions

Each topic needs a clear boundary. Use one primary transition device consistently:

- a large next-topic row;
- a full-width topic number;
- an image crop moving into the next section;
- a background tone shift within the same palette.

Do not use a different transition style after every topic.

A subtle full-screen chapter marker may appear between topics:

```text
02 / 05
CYBERBULLYING E ÉTICA DIGITAL
```

If used, it should last only as part of natural scrolling and must not block navigation.

---

## 19. Final summary

### 19.1 Visual break

After Topic 05, use a high-contrast section to signal completion.

Recommended treatment:

- background: `--color-support-saffron` or `--color-accent`;
- text: `--color-bg`;
- generous vertical padding;
- large summary headline;
- five short takeaway lines.

Example structure:

```text
PEQUENOS CUIDADOS
FAZEM DIFERENÇA.

01 Senhas diferentes
02 Autenticação em duas etapas
03 Sessões encerradas
04 Arquivos compartilhados com cuidado
05 Links verificados antes do clique
```

Keep the wording aligned with the existing conclusion. Do not introduce new technical claims.

---

## 20. Evaluation call to action

The evaluation form is academically important and must receive stronger visual priority than the current small link.

Structure:

```text
AVALIAÇÃO

Este conteúdo foi útil no seu dia a dia?
Responda ao formulário e ajude a avaliar o projeto.

[RESPONDER AO FORMULÁRIO ↗]
```

Requirements:

- place it immediately after the final summary;
- use a visually distinct panel or background;
- primary button height: at least `48px`, preferably `52–56px`;
- external-link behavior must be clear;
- do not open a new tab without indicating it;
- maintain the statement that answers are used for academic purposes;
- ensure the button remains obvious at 200% zoom.

---

## 21. Acknowledgment and footer

### 21.1 Acknowledgment

Keep this short and warm:

- thank the visitor;
- encourage sharing the guidance;
- avoid repeating the entire conclusion.

### 21.2 Footer

Include:

- project name;
- academic extension-project statement;
- institution / author attribution already present in the project;
- link to return to the top;
- optional compact list of topic anchors.

Do not turn the footer into another full navigation experience.

---

## 22. Responsive behavior

### 22.1 Breakpoint philosophy

Use content-driven breakpoints rather than device names. Existing Tailwind breakpoints may be used, but verify the layout at intermediate widths.

Recommended behavior ranges:

| Range | Layout behavior |
|---|---|
| `< 640px` | Single-column mobile, reduced decorative density |
| `640–899px` | Larger single-column or compact tablet grid |
| `900–1199px` | Two-column problem sections where space allows |
| `>= 1200px` | Full editorial desktop composition |

Do not rely on a single `lg` breakpoint to fix every layout issue.

### 22.2 Required test viewports

At minimum, manually verify:

- `360 × 800`;
- `390 × 844`;
- `768 × 1024`;
- `1024 × 768`;
- `1280 × 800`;
- `1440 × 900`;
- `1920 × 1080`.

### 22.3 Mobile constraints

- no horizontal overflow at any point;
- no heading clipped by viewport edges;
- sticky cards must not obscure the browser’s safe area;
- text must not be hidden behind decorative objects;
- cards must fit long Portuguese words using wrapping and, where appropriate, `hyphens-auto`;
- avoid layouts that require hover;
- avoid rendering separate duplicated desktop and mobile content trees through JavaScript viewport checks;
- prefer responsive CSS so content remains stable during hydration.

### 22.4 Landscape and short-height screens

On screens with height below approximately `700px`:

- reduce sticky-card vertical padding;
- let cards become taller than the viewport when needed;
- do not vertically center content if it causes clipping;
- reduce decorative hero density;
- ensure the header does not consume excessive height.

---

## 23. Motion system

### 23.1 Motion principles

Motion must explain hierarchy or progression. It must not exist only to prove that an animation library is present.

Use these motion categories:

1. **Reveal:** text or image enters once.
2. **Progression:** sticky cards replace each other through scrolling.
3. **Atmosphere:** slow clouds and object drift in the hero.
4. **Feedback:** button, link, and focus interaction.

### 23.2 Durations

For direct interactions:

- hover/focus: `150–220ms`;
- button arrow movement: `180–240ms`;
- small reveal: `350–600ms`;
- avoid interface transitions above `800ms`.

Scroll-linked motion uses scroll progress rather than fixed duration, but the visual change must remain gradual.

### 23.3 Easing

Suggested easing:

```css
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
```

Do not use a bouncy spring for serious warning content.

### 23.4 Performance constraints

- prioritize `transform` and `opacity`;
- avoid animating `width`, `height`, `top`, `left`, large shadows, and large blur values;
- do not assign `will-change` globally;
- use `will-change` only during or shortly before a relevant animation;
- avoid continuous JavaScript animation loops;
- avoid multiple full-screen elements with `backdrop-filter`;
- avoid animating every paragraph independently;
- keep scroll-linked transformations simple enough for mid-range mobile devices.

---

## 24. Accessibility requirements

Target WCAG 2.2 Level AA for the implemented page.

### 24.1 Semantics

- one `<h1>` for the page;
- logical heading order after the `<h1>`;
- each topic should be an `<article>` or clearly labeled `<section>`;
- guidance steps use `<ol>`;
- checklist uses `<ol>` or `<ul>` depending on whether order matters;
- links remain links and buttons remain buttons;
- decorative images use empty alt text;
- informative images use concise Portuguese alt text.

### 24.2 Contrast

- normal text: minimum `4.5:1`;
- large text: minimum `3:1`;
- interactive outlines, icons, and important non-text boundaries: minimum `3:1` where required;
- do not place muted gray text over photography without a solid overlay.

### 24.3 Focus

- never remove focus outlines without a replacement;
- use a clearly visible accent focus ring;
- recommended focus style: at least a `2–3px` outline with offset;
- focus must not be hidden under the sticky header;
- topic anchors with `tabIndex={-1}` should receive visible focus when navigated programmatically.

### 24.4 Reduced motion

Support both:

- Motion’s `useReducedMotion()` for component logic;
- CSS `@media (prefers-reduced-motion: reduce)` for transitions and decorative animation.

Reduced-motion behavior must:

- remove scroll-scrubbed object travel;
- convert guidance cards into a static sequence when necessary;
- keep essential state changes visible;
- avoid long blank scroll tracks;
- preserve all content.

### 24.5 Zoom and text resizing

At 200% browser zoom:

- navigation remains usable;
- no content overlaps;
- sticky cards do not clip text;
- the evaluation CTA remains visible;
- no two-dimensional scrolling is required for ordinary reading.

### 24.6 Touch targets

- interactive target minimum: `44 × 44px` preferred;
- do not place small arrow-only links too close together;
- entire topic rows should be clickable, not only the arrow.

---

## 25. Content constraints

### 25.1 Language

- All interface text remains in Portuguese (Brazil).
- Use plain, direct language.
- Avoid untranslated design or security jargon.
- Use “autenticação em duas etapas” consistently unless the existing project intentionally uses another term.

### 25.2 Editing permission

The agent may:

- shorten repetitive paragraphs;
- split overly long paragraphs;
- create shorter display headings while preserving full meaning;
- replace vague labels such as `etapa` with clearer labels;
- add navigational microcopy such as `Próximo tema`.

The agent must not:

- change factual meaning;
- add unsupported statistics;
- add legal or institutional procedures not present in the content;
- trivialize cyberbullying;
- imply that two-factor authentication makes an account completely secure;
- imply that a checklist guarantees safety.

### 25.3 Text density

Per viewport, prefer:

- one major heading;
- one short paragraph or two compact paragraphs;
- one primary visual idea;
- one clear action.

Do not show a large heading, long problem text, three guidance cards, and a checklist in the same viewport.

---

## 26. Component architecture

Adapt these names to the existing repository rather than restructuring the project unnecessarily.

Suggested component boundaries:

```text
components/
  Header.tsx
  HeroSection.tsx
  ProjectIntro.tsx
  TopicIndex.tsx
  TopicDetailSection.tsx
  TopicProblem.tsx
  GuidanceStack.tsx
  GuidanceCard.tsx
  TopicChecklist.tsx
  NextTopicLink.tsx
  FinalSummary.tsx
  EvaluationCTA.tsx
  SiteFooter.tsx

data/
  content.ts
```

### 26.1 Client-component boundaries

Only components that require browser APIs or Motion hooks should use `"use client"`.

Do not make the entire page a client component merely because the hero uses `useScroll`.

Potential client components:

- hero motion scene;
- current-topic progress indicator;
- guidance stack if using Motion values;
- accessible mobile menu.

Static text sections should remain server-rendered when possible.

### 26.2 Content model

Preserve the current `TopicDetailContent` and `TopicGuidanceEntry` approach. Extend it only when needed.

Suggested shape:

```ts
type TopicDetailContent = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  summary: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
  problem: {
    heading: string;
    paragraphs: readonly string[];
  };
  guidanceHeading: string;
  guidanceIntro?: string;
  guidance: readonly TopicGuidanceEntry[];
  checklistHeading: string;
  checklist: readonly {
    id: string;
    text: string;
  }[];
};
```

Do not store JSX inside the content data unless an existing pattern requires it.

---

## 27. Required refactor of `TopicDetailSection.tsx`

The current file already provides useful behavior:

- data-driven topic rendering;
- semantic article IDs;
- focus styles;
- responsive problem section;
- reduced-motion fallback;
- numbered checklist.

Preserve these strengths.

### 27.1 Remove or replace

Replace the current `GuidanceCard` behavior that uses:

- `absolute inset-0`;
- segment-based `clipPath` transitions;
- visual removal of one card while the next enters;
- side-by-side heading and card viewport.

### 27.2 Implement instead

- normal-flow ordered list;
- one sticky `<li>` per step;
- identical sticky top value;
- opaque backgrounds;
- incrementing z-index;
- heading above the ordered list;
- centered maximum width;
- static responsive fallback for reduced motion;
- subtle internal content reveal only.

### 27.3 Preserve

- `aria-labelledby` relationships;
- topic IDs and anchor navigation;
- `scroll-mt-*` or equivalent sticky-header offset;
- `focus-visible` outline;
- `useReducedMotion()`;
- data mapping from `topics` and `entries`;
- Portuguese content from the data file.

### 27.4 Avoid duplicate accessibility trees

Do not keep one full `sr-only` list and a second full visual list if a single semantic list can support the animation.

---

## 28. Images and assets

### 28.1 Asset requirements

- use WebP or AVIF when practical;
- provide sensible intrinsic dimensions;
- do not upscale small images aggressively;
- use `next/image` for raster imagery;
- inline SVG is acceptable for small original icons;
- do not embed huge base64 images in components;
- do not load all hero frames as separate full-screen images.

### 28.2 Consistency

All topic images must share:

- comparable contrast;
- similar crop logic;
- common overlay treatment;
- similar visual complexity;
- coherent lighting and color temperature.

### 28.3 Placeholders and errors

If an image is missing:

- render an intentional dark surface with a small topic-specific icon or gradient;
- preserve aspect ratio;
- do not leave an empty white box;
- do not show broken-image browser UI.

---

## 29. Performance requirements

### 29.1 General

- no unnecessary dependencies;
- no duplicate full-resolution images for desktop and mobile unless art direction genuinely requires it;
- lazy-load below-the-fold imagery;
- preload only critical fonts and the true LCP image;
- use `font-display: swap` or the Next.js font system;
- avoid layout shifts by reserving image dimensions;
- keep the hero functional before all decorative assets finish loading.

### 29.2 Scroll performance

- use one `useScroll` observer per meaningful section, not one per decorative element where avoidable;
- derive multiple transforms from shared progress values;
- avoid setting React state every animation frame;
- avoid reading layout repeatedly during scroll;
- do not render dozens of large semi-transparent layers;
- test on a throttled mid-range mobile profile.

### 29.3 Failure-safe behavior

If Motion fails or JavaScript is unavailable:

- content remains visible in document order;
- navigation anchors still work;
- no section remains at zero opacity;
- no large empty scroll track prevents access to later content.

---

## 30. SEO and document metadata

Preserve or add:

- meaningful `<title>` in Portuguese;
- concise meta description;
- `lang="pt-BR"` on the document;
- Open Graph title, description, and image if available;
- one canonical URL;
- descriptive page heading;
- no keyword stuffing.

Suggested metadata direction:

```text
Title: Segurança Digital para Estudantes
Description: Orientações práticas para proteger contas, trabalhos acadêmicos e interações online no ambiente estudantil.
```

---

## 31. Interaction details

### 31.1 Links

- default link should have a visible cue beyond color when placed in body text;
- large navigation rows can use border, arrow, and motion as cues;
- hover arrow movement: maximum `8px`;
- focus state must be at least as visible as hover;
- external form link must indicate external navigation.

### 31.2 Buttons

- use buttons only for actions, not anchor navigation;
- primary button uses accent background and dark text;
- minimum height: `48px`;
- avoid pill buttons with overly small text;
- include disabled states only if a disabled action genuinely exists.

### 31.3 Scroll-to-section behavior

- smooth scrolling may be used for pointer interactions;
- disable smooth scroll under reduced motion;
- focus the target heading or article when navigation requires context for keyboard users;
- ensure the sticky header does not cover the target.

---

## 32. Visual states

Define states for every interactive component:

- default;
- hover;
- focus-visible;
- active/pressed;
- visited where appropriate;
- expanded/collapsed for mobile navigation;
- reduced-motion;
- loading image;
- image unavailable.

Do not leave browser-default focus while heavily styling all other states unless the default remains clearly visible.

---

## 33. Acceptance criteria

The redesign is complete only when all items below are true.

### 33.1 Overall experience

- [ ] The first viewport clearly identifies the subject and audience.
- [ ] The page feels like one continuous journey rather than unrelated blocks.
- [ ] All five topics are easy to find and directly navigable.
- [ ] The current chapter number is visually clear.
- [ ] The evaluation form has a prominent final CTA.

### 33.2 Guidance stack

- [ ] Guidance title is above the cards, not in a permanent left column.
- [ ] Cards are horizontally centered.
- [ ] All cards use the same sticky top position.
- [ ] The second card fully covers the first card at the sticky point.
- [ ] The third card fully covers the second card at the sticky point.
- [ ] No previous-card text remains visibly mixed over the next card.
- [ ] Future cards become visible naturally below the active card.
- [ ] Cards use opaque backgrounds.
- [ ] Long Portuguese text is not clipped.
- [ ] Mobile reproduces the intended stack without horizontal overflow.
- [ ] Reduced-motion mode produces a readable static list.

### 33.3 Accessibility

- [ ] Correct heading hierarchy.
- [ ] Keyboard navigation works from top to bottom.
- [ ] Skip link works.
- [ ] Focus is always visible.
- [ ] Images have correct alt behavior.
- [ ] Text contrast passes WCAG AA.
- [ ] Controls meet practical touch-target sizing.
- [ ] Page remains usable at 200% zoom.
- [ ] Reduced motion does not leave large blank tracks.

### 33.4 Responsive behavior

- [ ] Tested at every viewport listed in Section 22.2.
- [ ] No horizontal scrollbar.
- [ ] Hero text is not covered by objects.
- [ ] Topic headings wrap intentionally.
- [ ] Short landscape screens do not clip card content.
- [ ] Header does not obscure anchor targets.

### 33.5 Performance

- [ ] Images reserve dimensions and do not cause layout shift.
- [ ] Below-the-fold images lazy-load.
- [ ] Animations primarily use transform and opacity.
- [ ] No continuous unnecessary animation loops.
- [ ] No new heavy dependency was introduced.
- [ ] Essential content is visible without animation.

---

## 34. Recommended implementation sequence

Implement in this order to reduce regressions:

### Phase 1 — Foundation

1. Define global design tokens.
2. Confirm fonts and body typography.
3. Set containers, gutters, and section spacing.
4. Add skip link and header focus behavior.

### Phase 2 — Page hierarchy

1. Refine the hero copy and layout.
2. Create project introduction.
3. Redesign the topic overview.
4. Add chapter numbering and next-topic links.

### Phase 3 — Topic component

1. Refine problem split layout.
2. Add or normalize topic images.
3. Refactor guidance section to the required sticky-card model.
4. Refine checklist hierarchy.
5. Validate one complete topic before applying the pattern to all five.

### Phase 4 — Ending

1. Create high-contrast final summary.
2. Promote evaluation CTA.
3. Simplify acknowledgment and footer.

### Phase 5 — Motion and polish

1. Add hero scroll motion.
2. Add internal sticky-card reveals.
3. Add topic progress indicator.
4. Add hover and focus feedback.
5. Implement reduced-motion alternatives.

### Phase 6 — Validation

1. Keyboard test.
2. Screen-size matrix test.
3. 200% zoom test.
4. Reduced-motion test.
5. Slow-device performance test.
6. Content and link review.

Do not begin with complex hero animation before the page hierarchy and guidance-card layout are stable.

---

## 35. Definition of done for the AI agent

The agent must not declare completion after changing only colors or adding animation.

Completion requires:

- the full page hierarchy described in this file;
- a working responsive header and topic navigation;
- a redesigned hero with a functional static state;
- all five topics using the shared chapter pattern;
- the guidance stack refactored away from absolute clip-path replacement;
- consistent imagery or intentional placeholders;
- a clear final summary and evaluation CTA;
- reduced-motion behavior;
- accessibility and responsive checks;
- no TypeScript, lint, or build errors.

Run the project’s available validation commands, typically:

```bash
npm run lint
npm run typecheck
npm run build
```

If a script does not exist, report that fact rather than inventing success.

---

## 36. Reference resources

Use these references for principles, not for direct copying:

- Current project: https://seguranca-digital-estudantes.vercel.app/
- Visual inspiration: https://appycamper.com/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- Animation performance: https://web.dev/articles/animations-guide

---

## 37. Final design summary

The finished website should communicate cybersecurity through a clear educational narrative rather than a collection of generic cards.

Its visual signature should come from:

- oversized but readable typography;
- numbered five-part progression;
- Ink Black low-poly/pixel atmosphere;
- centered sticky guidance cards;
- consistent Dusk Blue, Rosy Copper, and Saffron support accents;
- strong editorial spacing;
- student-centered imagery;
- restrained motion;
- a clear problem → action → checklist rhythm.

The design should feel memorable enough for a college presentation while remaining accessible, fast, and simple enough for the target audience to apply the guidance immediately.
