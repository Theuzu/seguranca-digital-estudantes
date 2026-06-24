# Data Model: Page.tsx Refactor

**Date**: 2026-06-24

## Overview

No data model changes. This feature is a pure structural refactor with zero new entities, data fields, or state. Documented here are the component interface contracts for traceability.

## Component Contracts

### HeroSection

```
Component: HeroSection
Type: Client Component ("use client")
Props: none
Imports:
  - useReducedMotion (from motion/react)
  - FaGithub (from react-icons/fa6)
Responsible for:
  - Hero stage layout, grain overlay, cloud decoration, frame
  - Title (smooth + pixel spans), subtitle, description, GitHub icon
  - Entry animations via inline style (keyframes from globals.css)
  - Reduced motion via useReducedMotion()
Output: <section aria-labelledby="hero-title">...</section>
```

### ContentSection

```
Component: ContentSection
Type: Server Component (no "use client")
Props: none
Imports:
  - contentIntro, topicChooser, topicDetails (from @/data/content)
  - ScrollExpandingSection (from @/app/components/ScrollExpandingSection)
  - TopicChooser (from @/app/components/TopicChooser)
  - TopicDetailSection (from @/app/components/TopicDetailSection)
Responsible for:
  - Composing ScrollExpandingSection wrapping TopicChooser + TopicDetailSection
  - Data wiring from data/content.ts to child components
Output: <ScrollExpandingSection content={contentIntro}>
          <TopicChooser content={topicChooser} />
          <TopicDetailSection topics={topicDetails} />
        </ScrollExpandingSection>
```

### page.tsx (post-refactor)

```
Component: Home (page)
Type: Server Component
Props: none
Imports:
  - FaGithub (from react-icons/fa6) — kept by user preference
  - conclusionContent (from @/data/conclusion)
  - HeroSection (from @/app/components/HeroSection)
  - ContentSection (from @/app/components/ContentSection)
  - ConclusionSection (from @/app/components/ConclusionSection)
Responsible for:
  - Top-level section assembly
Output: <main>
          <HeroSection />
          <ContentSection />
          <ConclusionSection content={conclusionContent} />
        </main>
```

## Data Flow

```
data/content.ts ──contentIntro──┐
data/content.ts ──topicChooser──┤──> ContentSection (server)
data/content.ts ──topicDetails──┘       │
                                        ▼
                              ScrollExpandingSection (client)
                                        │
                                   ┌────┴────┐
                                   ▼         ▼
                            TopicChooser  TopicDetailSection
                            (client)      (client)

data/conclusion.ts ──conclusionContent ──> ConclusionSection (client)

page.tsx ──FaGithub import──> (unused in page, kept per preference)
```

## Files Removed/Modified

| File | Change |
|------|--------|
| `app/page.tsx` | Remove inline hero markup, remove ContentSection wrapping, remove data imports for contentIntro/topicChooser/topicDetails |
| `app/globals.css` | Remove `.hero-stage`, `.hero-grain`, `.hero-clouds`, `.hero-frame`, `.hero-content`, `.hero-title`, `.hero-title-row`, `.hero-title-smooth`, `.hero-title-pixel`, `.hero-subtitle`, `.hero-github`, and related pseudos. Keep `@keyframes`. Keep `@media (max-width:720px)` if not fully covered by Tailwind responsive. |
| `app/components/HeroSection.tsx` | NEW |
| `app/components/ContentSection.tsx` | NEW |
