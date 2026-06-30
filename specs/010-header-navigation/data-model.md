# Data Model: Header Navigation

## Existing Source Entities

### TopicChoice

Owned by `data/content.ts`.

Fields used by the header:

- `id`: Stable fragment destination shared with `TopicDetailSection`.
- `title`: Portuguese topic label shown in the topics panel.
- `description`: Optional supporting copy for compact topic previews.
- `icon`: Optional visual cue if the implementation reuses the existing icon
  mapping.

Validation rules:

- The order of `topicChooser.topics` defines the visible topic navigation
  order.
- Every `TopicChoice.id` must match a rendered topic chapter destination.
- Header copy must not introduce alternate topic meanings.

### TopicDetailContent

Owned by `data/content.ts`.

Fields used by the header:

- `id`: Topic chapter anchor target.
- `eyebrow`: Existing topic number label such as `TEMA 1`.
- `title`: Full Portuguese chapter title for accessible labels.

Validation rules:

- Every rendered topic chapter must expose a focusable or clearly scrollable
  destination that is not hidden by the header.
- Long titles must remain readable in the destination region after navigation.

### ConclusionContent

Owned by `data/conclusion.ts`.

Fields used by the header:

- `id`: Final/evaluation area anchor root.
- `evaluation.title`: Accessible destination meaning for the evaluation action.
- `evaluation.formUrl`: Existing Google Forms URL, used only by the evaluation
  CTA, not duplicated as a direct header external link unless implementation
  explicitly keeps the final section context.

Validation rules:

- The header's `Avaliação` action should route to the in-page evaluation region
  so students see the academic context before opening the form.

## Planned View Model

### HeaderNavItem

Derived by implementation from existing content and static page-part labels.

Fields:

- `id`: Stable internal identifier for the navigation item.
- `label`: Brazilian Portuguese visible label.
- `href`: Fragment destination such as `#topic-chooser`, `#senhas-autenticacao`,
  or `#conclusao`.
- `kind`: One of `page-part`, `topic`, or `evaluation`.
- `shortLabel`: Optional compact label for mobile or active state.
- `ariaLabel`: Optional expanded accessible label when visible text is short.
- `isPrimary`: True only for the evaluation action.

Validation rules:

- `href` must match an existing rendered destination.
- Links remain links; buttons are only used for opening/closing a panel.
- `isPrimary` must not be applied to secondary topic or about links.

### HeaderNavigationState

Browser-derived state for the client header.

Fields:

- `activeId`: Current observed page part or topic ID; nullable fallback.
- `isPastHero`: Whether the header should use its stronger scrolled contrast
  state.
- `isTopicsPanelOpen`: Whether the compact topics panel is open.
- `lastFocusedTrigger`: Focus return target after closing the panel.
- `prefersReducedMotion`: Whether motion enhancements should be bypassed.

Validation rules:

- Navigation links remain usable when `activeId` is null.
- Escape closes the panel only when the panel is open.
- Closing the panel returns focus to the trigger when possible.
- Reduced motion removes nonessential transition/scroll animation.

## State Transitions

```text
Initial load
  -> Header visible in hero state
  -> Topics panel closed
  -> Active ID may be null until observation runs

Scroll past hero threshold
  -> Header scrolled contrast state active

Open topics panel
  -> Panel visible
  -> Topic links keyboard reachable

Choose a destination
  -> Native hash destination changes or scroll target is reached
  -> Panel closes on compact/mobile layouts
  -> Target heading/region visible below header
  -> Active ID updates when observation catches up

Press Escape while panel open
  -> Panel closes
  -> Focus returns to trigger

Reduced motion enabled
  -> Same destinations
  -> No decorative smooth-scroll or panel motion required
```

## Relationships

- `HeaderNavigation` renders `HeaderNavItem[]`.
- Topic `HeaderNavItem[]` are derived from `TopicChoice[]` and must match
  `TopicDetailContent[]` IDs.
- The evaluation `HeaderNavItem` targets `ConclusionContent.id`.
- `HeaderNavigationState.activeId` references one of the rendered
  `HeaderNavItem.id` values or remains null.
