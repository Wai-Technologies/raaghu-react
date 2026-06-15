# Raaghu Design System — Documentation

This folder contains all technical guides for the Raaghu Design System. Start with the Architecture Overview if you're new to the repo.

---

## Core Architecture

| Guide | What It Covers |
|-------|---------------|
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | Package layout, component hierarchy, design token pipeline, tech stack |
| [CSS_ARCHITECTURE.md](./CSS_ARCHITECTURE.md) | SCSS file organization, BEM methodology, naming conventions |
| [CSS_IMPLEMENTATION_GUIDE.md](./CSS_IMPLEMENTATION_GUIDE.md) | Development workflow, integration checklist, production readiness |
| [CSS_REFERENCE.md](./CSS_REFERENCE.md) | Quick-reference cheat sheet for naming, patterns, and common class structures |

## Theming & Design Tokens

| Guide | What It Covers |
|-------|---------------|
| [THEME_INTEGRATION_GUIDE.md](./THEME_INTEGRATION_GUIDE.md) | How to integrate `raaghu-react-themes` into a consuming app |
| [GRIFFEL_INTEGRATION_GUIDE.md](./GRIFFEL_INTEGRATION_GUIDE.md) | CSS-in-JS integration with Griffel |
| [DESIGN_TOKENS_CHANGELOG.md](./DESIGN_TOKENS_CHANGELOG.md) | History of token additions, renames, and removals; guidelines for token authors |

## Testing

| Guide | What It Covers |
|-------|---------------|
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Jest, Vitest, and Playwright — what each is for, how to run them, and which to use when |
| [CHROMATIC_GUIDE.md](./CHROMATIC_GUIDE.md) | Visual regression testing with Chromatic |

## Quality & Lifecycle

| Guide | What It Covers |
|-------|---------------|
| [COMPONENT_DEPRECATION_POLICY.md](./COMPONENT_DEPRECATION_POLICY.md) | How to deprecate and remove components; current deprecation register |
| [PERFORMANCE_MONITORING.md](./PERFORMANCE_MONITORING.md) | Bundle size budgets and performance monitoring utilities |

## Internationalization

| Guide | What It Covers |
|-------|---------------|
| [LOCALIZATION_GUIDE.md](./LOCALIZATION_GUIDE.md) | i18next setup, supported locales, RTL support |

---

## Quick Start for New Contributors

1. Read [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) — understand the package structure and token pipeline
2. Read [CSS_ARCHITECTURE.md](./CSS_ARCHITECTURE.md) — understand how SCSS files are organized and named
3. Check [TESTING_GUIDE.md](./TESTING_GUIDE.md) — know which test framework to reach for
4. Use the plop generator to scaffold a new component: see [`/plop-templates/README.md`](../plop-templates/README.md)

## Component File Structure

Every component follows this exact structure:

```
rds-{name}/
├── rds-{name}.tsx            # React component + TypeScript props
├── rds-{name}.scss           # BEM styles using var(--rds-*) CSS variables
├── rds-{name}.test.tsx       # Jest unit tests
├── rds-{name}.stories.tsx    # Storybook stories with play() tests
└── rds-{name}.figma.tsx      # Figma Code Connect metadata
```

## BEM Naming Convention

```scss
.rds-{component}                       // Block
.rds-{component}__element              // Element
.rds-{component}--modifier             // Modifier
.rds-{component}__element--modifier    // Element + Modifier
```

All color and spacing values come from CSS custom properties injected by `raaghu-react-themes`:

```scss
color: var(--rds-primary-700);
background: var(--rds-neutral-50);
```

Never use hardcoded hex values in component SCSS.
