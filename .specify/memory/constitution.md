<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0
Modified principles:
- Previous principle I -> I. Portuguese Website, English Documentation
- Previous principle II -> II. Three-Section Structure and Data Files
- Previous principle III -> III. Clean Motion and theme-vibe.md
- Previous principle IV -> IV. Next.js Discipline and Approved Dependencies
- Previous principle V -> V. Academic and Responsible Cybersecurity
Added sections:
- Explicit Google Forms requirement for the Conclusion section
- English documentation rule across docs, specs, plans, tasks, and README
- Data-file content ownership rule
Removed sections:
- Portuguese-language documentation wording from v1.0.0
Templates requiring updates:
- updated: .specify/templates/plan-template.md
- updated: .specify/templates/spec-template.md
- updated: .specify/templates/tasks-template.md
- reviewed/no update needed: .specify/templates/checklist-template.md
- not present: .specify/templates/commands/*.md
- updated: README.md
Follow-up TODOs:
- None.
-->
# Seguranca Digital para Estudantes Constitution

## Core Principles

### I. Portuguese Website, English Documentation

All public website content MUST be written in clear Brazilian Portuguese for
students and cybersecurity beginners. All project documentation MUST be written
in English, including specs, plans, tasks, README files, governance notes, and
implementation guidance. Cybersecurity terms used on the website MUST be
explained in context without assuming prior knowledge.

Rationale: the academic audience reads the site in Portuguese, while the project
documents remain consistent with the repository workflow and agent tooling.

### II. Three-Section Structure and Data Files

The main website experience MUST preserve exactly three top-level sections:
Hero, Content, and Conclusion. Cybersecurity topics MUST live inside the Content
section and MUST be divided through typed content files under `data/`, such as
`data/*.ts`. The Conclusion section MUST include the project closing content and
a connected Google Forms entry point through a link or embed, without requiring
a backend integration.

Rationale: the project is a simple academic website, so content ownership stays
clear and the page remains easy to present.

### III. Clean Motion and theme-vibe.md

All visual decisions MUST follow `theme-vibe.md`: 80% modern UI, 20% retro
computing influence, educational tone, trustworthy presentation, and accessible
reading. Animations MUST be clean, purposeful, and lightweight. Motion MUST NOT
reduce readability, keyboard navigation, responsiveness, performance, or WCAG AA
contrast.

Rationale: animation supports comprehension and polish, but the educational
content remains the priority.

### IV. Next.js Discipline and Approved Dependencies

Implementation MUST respect the installed Next.js version and the instructions
in `AGENTS.md`: before changing Next.js code, read the relevant guide under
`node_modules/next/dist/docs/`. Extra dependencies MUST NOT be added without
explicit user approval. The project MUST use the current stack when it is enough
for static content, styling, animation, and the Google Forms connection.

Rationale: the site has a narrow scope and does not need technical churn unless
the user approves it.

### V. Academic and Responsible Cybersecurity

Cybersecurity content MUST be framed as academic digital literacy, prevention,
and critical thinking. Examples about threats, phishing, malware, passwords, or
social engineering MUST avoid operational instructions that enable abuse. The
site MUST emphasize safe habits, source verification, privacy, and responsible
technology use.

Rationale: the project teaches students without romanticizing attacks or turning
the site into offensive security material.

## Product Scope and Constraints

This is an academic Next.js website using the repository's existing React,
TypeScript, and Tailwind CSS setup. The core experience is one clear page with:

- Hero: introduces the website and its academic purpose.
- Content: presents cybersecurity themes for students, sourced from `data/*.ts`
  files.
- Conclusion: closes the presentation and connects to Google Forms.

The project MUST stay focused on static/editorial content, responsive layout,
accessibility, and clean animations. Authentication, databases, admin panels,
complex quizzes, course platforms, simulators, and external service integrations
beyond the Google Forms entry point MUST remain out of scope unless explicitly
approved.

## Development Workflow and Quality

Before planning or implementing a feature, work MUST check this constitution,
`theme-vibe.md`, `AGENTS.md`, and the current plan when one exists. Specs and
plans MUST state how they preserve the Hero, Content, and Conclusion structure,
keep website copy in Brazilian Portuguese, keep docs in English, use `data/*.ts`
for content, avoid unapproved dependencies, and connect Google Forms only from
the Conclusion section.

Code changes MUST run `npm run lint` and `npm run build` when the scope touches
components, pages, styles, configuration, dependencies, or content imports. If a
command cannot run in the current environment, the delivery summary MUST record
the limitation.

## Governance

This constitution governs project scope, content, design, documentation, and
implementation decisions. In case of conflict, it supersedes informal
preferences, generic templates, and boilerplate documentation.

Amendments MUST document the change, rationale, impacted files, and version
classification:

- MAJOR for redefining or removing core principles.
- MINOR for adding principles, required sections, or product constraints.
- PATCH for wording, clarification, or correction without changing rules.

Every relevant spec, plan, or task list MUST include a compliance check against
these principles. Reviews MUST reject changes that add unnecessary complexity,
move documentation back to Portuguese, ignore `theme-vibe.md`, break the three
section structure, bypass the `data/*.ts` content model, or add dependencies
without approval.

**Version**: 1.1.0 | **Ratified**: 2026-06-16 | **Last Amended**: 2026-06-16
