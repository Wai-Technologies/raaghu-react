# Raaghu Design System — CSS/SCSS Architecture

## Overview

Component styles are co-located SCSS files that use `var(--rds-*)` CSS custom
properties for all theme-sensitive values. Those custom properties are injected
at runtime by `RaaghuThemeProvider` — there are no compiled SCSS theme files.

---

## File Layout

### Elements and Components

```
raaghu-elements/
└── rds-{component}/
    ├── rds-{component}.tsx
    ├── rds-{component}.scss      ← BEM styles, var(--rds-*) tokens
    └── rds-{component}.stories.tsx

raaghu-components/
└── rds-comp-{component}/
    ├── rds-comp-{component}.tsx
    ├── rds-comp-{component}.scss
    └── rds-comp-{component}.stories.tsx
```

### Theme System

```
raaghu-react-themes/
├── tokens/
│   ├── design-tokens.ts          ← all raw values (colors, spacing, radius …)
│   └── build-rds-css-vars.ts     ← maps tokens to --rds-* CSS custom properties
└── src/
    ├── provider/
    │   ├── RaaghuThemeProvider.tsx
    │   └── theme-utils.ts
    ├── mui/
    │   ├── palette.ts            ← MUI palette (mirrors design-tokens.ts manually)
    │   ├── light.theme.ts
    │   └── dark.theme.ts
    └── styles/
        └── index.scss            ← global resets only (box-sizing, body, scrollbar)
```

There are **no** `variables/`, `themes/light.scss`, `themes/dark.scss`,
or `custom-properties.scss` files. All token-to-variable mapping happens
in TypeScript via `injectTokens()`.

---

## BEM Naming

```scss
.rds-{component}                       /* Block  */
.rds-{component}__element              /* Element */
.rds-{component}--modifier             /* Modifier */
.rds-{component}__element--modifier    /* Element modifier */
```

**Examples:**
```scss
.rds-button { }
.rds-button__icon { }
.rds-button--primary { }
.rds-button--large { }

.rds-card { }
.rds-card__header { }
.rds-card__content { }
.rds-card--outlined { }
```

---

## Component SCSS Template

```scss
.rds-{component} {
  // Structural / layout properties — can use static values
  display: flex;
  align-items: center;
  position: relative;

  // Theme-sensitive values — always use tokens
  background-color: var(--rds-background-paper);
  color:            var(--rds-text-primary);
  border:           1px solid var(--rds-divider);
  border-radius:    var(--rds-border-radius-md);
  padding:          var(--rds-spacing-sm) var(--rds-spacing-md);
  box-shadow:       var(--rds-elevation-1);
  font-family:      var(--rds-font-family-base);
  font-size:        var(--rds-font-size-sm);
  transition:       background-color 200ms ease, color 200ms ease;

  // Elements
  &__icon {
    color: var(--rds-text-secondary);
  }

  // Modifiers
  &--primary {
    background-color: var(--rds-primary-main);
    color:            var(--rds-primary-contrast-text);
  }

  // Interactive states
  &:hover {
    background-color: var(--rds-action-hover);
  }

  &:focus-visible {
    outline:        2px solid var(--rds-primary-main);
    outline-offset: 2px;
  }

  &:disabled,
  &--disabled {
    color:  var(--rds-text-disabled);
    cursor: not-allowed;
  }
}
```

---

## Token Reference (most-used)

| Category | Token | Usage |
|---|---|---|
| Surface | `--rds-background-default` | Page background |
| Surface | `--rds-background-paper` | Card / panel background |
| Surface | `--rds-background-surface` | Secondary surface |
| Text | `--rds-text-primary` | Main body text |
| Text | `--rds-text-secondary` | Muted / caption text |
| Text | `--rds-text-disabled` | Disabled text |
| Border | `--rds-divider` | Borders, separators |
| Brand | `--rds-primary-main` | Primary accent |
| Brand | `--rds-primary-light` | Lighter primary |
| Brand | `--rds-primary-dark` | Darker primary |
| Brand | `--rds-primary-contrast-text` | Text on primary bg |
| State | `--rds-action-hover` | Hover background |
| State | `--rds-action-disabled` | Disabled background |
| Semantic | `--rds-success-main` | Success color |
| Semantic | `--rds-warning-main` | Warning color |
| Semantic | `--rds-error-main` | Error color |
| Spacing | `--rds-spacing-xs/sm/md/lg/xl` | 4/8/16/24/32px |
| Radius | `--rds-border-radius-sm/md/lg/full` | Border radius scale |
| Elevation | `--rds-elevation-1` … `--rds-elevation-5` | Box shadows |
| Z-index | `--rds-z-index-dropdown/modal/tooltip` | Layer management |

Full list: see `tokens/build-rds-css-vars.ts`.

---

## Adding a New Component

1. Create `rds-{component}/rds-{component}.tsx` with TypeScript props interface
2. Create `rds-{component}/rds-{component}.scss` using BEM + `var(--rds-*)` tokens
3. Create `rds-{component}/rds-{component}.stories.tsx`
4. Export from `raaghu-elements/index.ts` (or `raaghu-components/index.ts`)
5. Verify light and dark rendering in Storybook

---

## Migrating Hardcoded Colors

When you encounter hardcoded hex in an existing SCSS file:

1. Find the matching semantic token in `tokens/build-rds-css-vars.ts`
2. Replace `#3C98FF` → `var(--rds-primary-main)` (etc.)
3. Test in Storybook with both light and dark toggle active
4. Verify light/dark in Storybook before merging

Current status: ~60 SCSS files still have hardcoded values.
See `docs/THEME_INTEGRATION_COMPLETE.md` for the priority list.

---

## SCSS Conventions

- **Max nesting depth:** 3 levels
- **No global overrides** — styles must be scoped to the component block
- **No hardcoded hex, rgb, or hsl** — use `var(--rds-*)` for any color
- **No hardcoded pixel spacing** for theme-sensitive values — use spacing tokens
- **Comments:** only when the WHY is non-obvious (workarounds, known browser bugs)
