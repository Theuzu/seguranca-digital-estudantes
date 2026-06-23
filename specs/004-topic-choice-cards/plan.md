# Implementation Plan: Content Topic Choice Cards

**Branch**: `[004-topic-choice-cards]` | **Date**: 2026-06-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-topic-choice-cards/spec.md`

## Summary

Extend the existing second top-level Content section after its scroll-expanding introduction with a server-rendered topic chooser. The chooser uses one asymmetric editorial heading area, a responsive five-card grid, native same-page fragment links styled as controls, and five matching heading-only destinations. Typed copy remains in `data/content.ts`; static styling remains in JSX Tailwind utilities; no new dependency, animation, icon, route, backend, or detailed guidance copy is added.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js, React, Tailwind CSS 4; existing Motion and Lenis remain unchanged

**Storage**: Static typed Content-section copy in `data/content.ts`; no runtime storage

**Testing**: `npm run lint`, `npm run build`, browser checks at 390x844 and 1280x720, 200% zoom, keyboard navigation, pointer/touch interaction, and fragment-target checks

**Target Platform**: Static web presentation for modern browsers

**Project Type**: Next.js App Router academic website

**Performance Goals**: Chooser ships as server-rendered markup with no new client state, effects, animation, route fetch, or dependency; all five cards remain immediately readable after the existing transition completes

**Constraints**: Brazilian Portuguese public copy; English documentation; exactly one Hero, one Content section, and one Conclusion; five ordered topics; heading-only in-page destinations; no icons, illustrations, decorative elements, carousel, animation choreography, detailed guidance, or dead controls; responsive at 390px and 1280px; WCAG AA contrast; no new dependencies; no changes to Conclusion or Google Forms scope

**Scale/Scope**: One five-item typed content tuple, one server component, one existing client component adjusted to accept server-rendered children, and page composition updates

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Card, heading, and CTA copy remain pt-BR in `data/content.ts`; plan artifacts remain English.
- **Three-section structure**: Chooser and destinations stay inside the existing Content section. Hero and Conclusion remain untouched.
- **Data-file content model**: `data/content.ts` owns chooser ID, heading, CTA label, five stable topic IDs, titles, and descriptions.
- **Theme compliance**: Layout uses current cloud-gray, light surface, dark text, educational blue, Space Grotesk/Inter hierarchy, rounded cards, firm borders, and restrained retro control treatment.
- **Clean animation**: No chooser or card animation is introduced. Native fragment navigation is used; existing scroll-expansion and reduced-motion behavior remain unchanged.
- **Next.js discipline**: Checked local Next.js 16 guides for Linking and Navigating, Server and Client Components, CSS, and Accessibility under `node_modules/next/dist/docs/`.
- **Dependency restraint**: Existing platform features and Tailwind utilities cover the feature. No package change is planned.
- **Google Forms scope**: Conclusion is not modified. Google Forms remains reserved for the Conclusion feature.
- **Responsible cybersecurity framing**: Supplied titles and descriptions teach preventive academic digital literacy and contain no offensive instructions.
- **Static-content restraint**: No auth, database, API, telemetry, form submission, or runtime content mutation is introduced.

## Project Structure

### Documentation (this feature)

```text
specs/004-topic-choice-cards/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- topic-chooser-ui.md
|-- spec.md
|-- checklists/
|   |-- requirements.md
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- page.tsx
|-- components/
|   |-- ScrollExpandingSection.tsx
|   |-- TopicChooser.tsx

data/
|-- content.ts

AGENTS.md
```

**Structure Decision**: Keep `app/page.tsx` as the Server Component composition root. It creates `TopicChooser` as server-rendered content and passes it as `children` to the existing `ScrollExpandingSection` client boundary. `ScrollExpandingSection` keeps Motion and its scroll ref on a dedicated transition track so following chooser content does not alter progress calculations. `TopicChooser.tsx` contains semantic static markup and literal Tailwind utilities. `data/content.ts` remains the single Content-section copy source. No global CSS rule or new route is required.

## Implementation Design

- Extend `ContentIntro` ownership in `data/content.ts` with `TopicId`, `TopicChoice`, and `TopicChooserContent` types plus one five-item `topicChooser` export.
- Use stable ASCII topic IDs as both data identity and fragment target. Derive each destination heading from the topic title rather than duplicating text.
- Add `TopicChooser.tsx` as a Server Component. Props accept `TopicChooserContent`; no `"use client"`, state, effects, Motion, or Lenis API is used.
- Render one visible `h2` for "Escolha um tema", five text-only cards, and one native `<a href="#topic-id">` per card. Links look like buttons but retain link semantics because they navigate within the document.
- Render five destinations after the card grid in the same supplied order. Each destination contains only its unique `id` and matching heading, with enough scroll offset/spacing to make fragment navigation observable without inventing guidance copy.
- Use one column by default, two columns at intermediate widths, and five equal columns at 1280px and above. Keep cards auto-height, align actions consistently, and avoid horizontal overflow.
- Apply immediate color, border, and focus-visible changes only. Do not add transform, transition, scroll-behavior, or new animation classes.
- Update `ScrollExpandingSection` to accept `children: React.ReactNode`. Keep the outer semantic Content section, move the scroll target/ref and current `h-[200svh]` transition classes to an inner track, then render server-provided children after that track.
- Compose `<TopicChooser content={topicChooser} />` inside `ScrollExpandingSection` from `app/page.tsx`. Existing Hero, intro copy, Motion mappings, reduced-motion branch, SmoothScroll configuration, and Conclusion scope stay unchanged.
- Use Tailwind utilities directly in components. Do not add topic-specific selectors to `app/globals.css`.

## Complexity Tracking

No constitution violation. Design reuses existing files, dependencies, one-page structure, and Server/Client boundaries.

