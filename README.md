# Seguranca Digital para Estudantes

Academic Next.js website for explaining cybersecurity themes to students. The
website copy is in Brazilian Portuguese; project documentation is in English.

## Scope

The main experience preserves three sections:

1. Hero: introduces the site and its academic purpose.
2. Content: presents cybersecurity topics sourced from typed `data/*.ts` files.
3. Conclusion: closes the presentation and connects to Google Forms.

The visual direction follows `theme-vibe.md`: modern, educational, accessible,
and lightly inspired by retro computing. Animations must stay clean and must not
hurt readability, responsiveness, or keyboard navigation.

## Development

```bash
npm run dev
npm run lint
npm run build
```

Before changing Next.js code, read the relevant guide under
`node_modules/next/dist/docs/`, as required by `AGENTS.md`.

Do not add dependencies without explicit user approval.
