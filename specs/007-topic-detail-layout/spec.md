# Feature Specification: Reusable Topic Detail Layout

**Feature Branch**: `[007-topic-detail-layout]`

**Created**: 2026-06-23

**Status**: Ready for Planning

**Input**: User description: "Build the spec for the website topic section. Each topic needs three parts: problem presentation, guidance to resolve it, and a practical checklist. Create a reusable layout for different topics. Follow the supplied dark editorial references. The problem presentation is text. The guidance area is a sequential sticky animation where the last item is smoothly cut and the next appears. The checklist is simple like the first reference. Text lives in data.ts, handles a different number of topics, inline Tailwind CSS is required, and Topic 3 about shared library and lab computers is the base content."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read One Complete Topic (Priority: P1)

A student opens a selected cybersecurity topic and sees one coherent learning flow with the problem first, the protection guidance second, and a practical checklist last.

**Why this priority**: The layout must teach the topic before any animation or visual variation matters.

**Independent Test**: Open the shared-computer topic and confirm that the three required parts appear in the approved order, use Brazilian Portuguese copy, and remain readable without needing another page or account.

**Acceptance Scenarios**:

1. **Given** the student chooses "Computadores compartilhados", **When** the topic detail section enters view, **Then** the first part presents the problem with the approved title and problem paragraphs.
2. **Given** the student continues through the topic, **When** the guidance and checklist become visible, **Then** the guidance appears after the problem and the checklist appears after the guidance.
3. **Given** a topic has more or fewer guidance or checklist entries than another topic, **When** it is rendered, **Then** the same three-part layout adapts without missing headings, broken spacing, or empty placeholders.

---

### User Story 2 - Follow Sequential Protection Guidance (Priority: P2)

A student scrolls through the guidance part and sees each protection step take focus in a sticky editorial layout, with a smooth cut transition from one step to the next.

**Why this priority**: The sticky sequential animation is the defining interaction of this topic-detail variation.

**Independent Test**: Scroll forward and backward through the guidance part on desktop and mobile and confirm that each step becomes readable, transitions cleanly, and returns predictably.

**Acceptance Scenarios**:

1. **Given** the guidance part has multiple entries, **When** the student scrolls through it, **Then** the active entry remains in a sticky reading position while the previous entry is visually clipped or cut away and the next entry takes its place.
2. **Given** the student scrolls backward, **When** a previous guidance entry becomes active again, **Then** the transition reverses without jumping, overlapping text, or hiding content.
3. **Given** reduced motion is enabled, **When** the student reaches the guidance part, **Then** all guidance entries remain accessible in order without the cut transition.

---

### User Story 3 - Use the Practical Checklist (Priority: P3)

A student reaches the end of the topic and can scan a concise checklist of actions to perform before leaving the context described by the topic.

**Why this priority**: The checklist turns the educational explanation into concrete behavior the student can apply immediately.

**Independent Test**: Review the checklist for the shared-computer topic and confirm that every required action appears once, is visually scannable, and does not behave like a form submission or data-collection control.

**Acceptance Scenarios**:

1. **Given** the student has read the problem and guidance, **When** the checklist appears, **Then** it shows each practical item as a clear completion statement.
2. **Given** the checklist has a different number of items for another topic, **When** that topic renders, **Then** the checklist spacing and visual rhythm remain stable.
3. **Given** the page is viewed at 200% zoom, **When** the checklist is inspected, **Then** no checklist text, marker, or focus outline is clipped.

### Edge Cases

- A topic with only one guidance entry must still show the guidance part without creating a fake scroll animation.
- A topic with many guidance entries must preserve readable step length, stable sticky positioning, and predictable scroll progress.
- Adding, removing, or reordering topics in the content data must not require duplicating the reusable layout.
- Long Portuguese titles, paragraphs, guidance entries, or checklist items must wrap without horizontal page overflow.
- Fast scrolling must not leave two guidance entries incoherently overlapping.
- The sticky guidance part must not trap scroll, keyboard navigation, or screen-reader reading order.
- Reduced-motion preferences must remove or simplify motion while preserving all content in the same order.
- The layout must still make sense if images are not used for a topic.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feature MUST add a reusable topic-detail layout inside the existing Content section without changing the Hero or Conclusion top-level sections.
- **FR-002**: Every rendered topic detail MUST contain exactly three ordered content parts: problem presentation, protection guidance, and practical checklist.
- **FR-003**: The problem presentation MUST be text-led and MUST introduce the topic's real-life student risk before giving instructions.
- **FR-004**: The protection guidance MUST support a sequential sticky reading experience where guidance entries become active one at a time during scroll.
- **FR-005**: The sequential guidance transition MUST visually clip or cut the outgoing entry while the incoming entry replaces it, matching the supplied editorial reference behavior without copying its brand.
- **FR-006**: The practical checklist MUST present concise action statements in a simple list treatment inspired by the first supplied reference.
- **FR-007**: Topic detail content MUST be centrally owned in a typed file under `data/`, such as `data/*.ts`, rather than duplicated in presentation markup.
- **FR-008**: The content model MUST support a variable number of topics without changing the reusable topic-detail layout.
- **FR-009**: Each topic MUST support a variable number of guidance entries and checklist entries while keeping all three parts valid.
- **FR-010**: The shared-computer topic MUST use this approved public copy:

  **TEMA 3 -- COMPUTADORES DA BIBLIOTECA E LABORATÓRIO**

  **O problema**

  Computadores de bibliotecas e laboratórios são utilizados por várias pessoas. Deixar uma conta conectada, salvar uma senha no navegador ou esquecer um arquivo na pasta de downloads pode expor informações pessoais e acadêmicas.

  Fechar apenas a janela do navegador nem sempre encerra a sessão. O próximo usuário pode encontrar a conta ainda conectada.

  **Como se proteger**

  Evite salvar senhas em computadores compartilhados. Ao terminar uma atividade, utilize a opção "Sair" ou "Encerrar sessão" em todas as contas acessadas.

  Apague arquivos pessoais baixados no computador e verifique a lixeira quando necessário. Também evite acessar serviços bancários ou outras informações sensíveis nesses dispositivos.

  Antes de sair do local, confira se o e-mail, o armazenamento em nuvem e a plataforma acadêmica foram realmente desconectados.

  **Checklist rápido**

  - Não salvei minha senha no navegador.
  - Encerrei todas as sessões.
  - Apaguei os arquivos que baixei.
  - Retirei meu pendrive.
  - Conferi se nenhuma conta permaneceu aberta.

- **FR-011**: The layout MUST preserve the existing site visual direction: modern educational interface, restrained retro influence, dark editorial sections where appropriate, readable typography, and accessible contrast.
- **FR-012**: The supplied references MUST guide composition, spacing, list rhythm, and sticky row behavior, but the feature MUST NOT copy the reference logo, navigation, brand text, or unrelated imagery.
- **FR-013**: The topic-detail layout MUST remain responsive on mobile, tablet, and desktop viewports.
- **FR-014**: The page MUST NOT introduce horizontal body overflow, clipped text, or incoherent overlap in any of the three topic parts.
- **FR-015**: Motion MUST be clean, purposeful, reversible where scroll-driven, and must not reduce readability.
- **FR-016**: Reduced-motion users MUST receive all topic content in order with no required animation to understand the guidance.
- **FR-017**: Keyboard and assistive-technology users MUST encounter the topic title, problem text, guidance entries, and checklist items in the same logical order as visual users.
- **FR-018**: The checklist MUST be presentational and educational; it MUST NOT collect user data or require persistence.
- **FR-019**: Public website copy MUST remain Brazilian Portuguese, and project documentation for this feature MUST remain English.
- **FR-020**: Cybersecurity content MUST remain preventive, practical, and appropriate for students.
- **FR-021**: The implementation plan MUST keep styling for this layout inline with Tailwind CSS utilities and MUST NOT add unrelated global style expansion for this feature.
- **FR-022**: The feature MUST NOT add new dependencies unless the user explicitly approves them.
- **FR-023**: The existing topic chooser and existing topic order MUST remain compatible with the new topic-detail content.

### Key Entities

- **Topic Detail**: A complete cybersecurity topic presentation made of one problem presentation, one guidance sequence, and one practical checklist.
- **Problem Presentation**: The text-led opening part that explains the student risk and why the topic matters.
- **Guidance Entry**: One protection instruction shown as part of the sequential sticky guidance flow.
- **Guidance Sequence**: The ordered collection of guidance entries and the active scroll position that determines which entry is emphasized.
- **Checklist Item**: One practical action statement the student can use to verify safe behavior.
- **Topic Content Collection**: The typed source of all topic details, including topic IDs, order, titles, problem copy, guidance entries, and checklist items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The shared-computer topic displays 100% of the approved Portuguese copy, with the three required parts in the order problem, guidance, checklist.
- **SC-002**: A reviewer can add, remove, or reorder at least one topic in the content data and see the rendered topic set update without changing the reusable layout structure.
- **SC-003**: A topic with one guidance entry and a topic with at least three guidance entries both render without empty animation states or missing headings.
- **SC-004**: On a 390-pixel mobile viewport, a 768-pixel tablet viewport, and a 1280-pixel desktop viewport, the topic detail shows no horizontal page overflow or clipped text.
- **SC-005**: During ten forward and backward scroll passes through a multi-entry guidance sequence, every guidance entry becomes readable and no pass leaves overlapping text in the sticky area.
- **SC-006**: In reduced-motion mode, all guidance entries and checklist items are readable in the correct order without relying on clipping or scroll animation.
- **SC-007**: At 200% browser zoom, the problem text, guidance entries, and checklist items remain readable without content being hidden behind sticky elements.
- **SC-008**: A visual review recognizes the supplied references' dark editorial layout, row/list spacing, and sticky cut transition while still matching the current cybersecurity education theme.
- **SC-009**: The checklist for the shared-computer topic shows exactly five checklist items, each once, and no item requires user data storage.
- **SC-010**: The feature can be navigated by keyboard and read by assistive technology in the same order as the visible content.

## Assumptions

- This feature is a topic-detail variation inside the Content section, not a new route or a fourth top-level page section.
- The current five topic IDs remain valid, and "computadores-compartilhados" is the first complete topic-detail content used for planning.
- Other topic details will follow the same data shape but may have different counts of guidance entries and checklist items.
- The sticky guidance sequence may be skipped or flattened for reduced-motion users and for topics with only one guidance entry.
- Inline Tailwind CSS utilities are an explicit implementation constraint from the user and will be handled during planning without adding a new styling dependency.
- Images are optional accents for future topic details; the base shared-computer content does not require image assets to be understandable.
- Existing approved packages and browser capabilities are expected to cover the sticky scroll behavior; no new dependency is approved by this specification.
