# Griffel Integration Guide

> **Status: superseded.** This repo no longer ships a `utils/griffel` package or `GriffelProvider`.
> Use [`RaaghuThemeProvider`](./THEME_INTEGRATION_GUIDE.md) for theming (MUI + `--rds-*` CSS variables).

## Current recommendation

1. Wrap your app with `RaaghuThemeProvider` from `raaghu-react-themes`.
2. Style components with SCSS using `var(--rds-*)` tokens (see [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)).
3. Prefer MUI `sx` / styled APIs when you need inline theme-aware styles.

## Optional: `@griffel/react`

`@griffel/react` remains available as a dependency for atomic CSS-in-JS in isolated cases. If you use `makeStyles` / `mergeClasses` directly:

- Do **not** add a custom Griffel app-root provider.
- Prefer design tokens via CSS variables (`var(--rds-primary-main)`, etc.) rather than hard-coded values.
- Keep Griffel usage local to the component that needs it.

## Historical note

Earlier drafts described `utils/griffel/GriffelProvider`, `RdsButtonGriffel`, and related demos. Those paths are **not present** in the current tree. Treat any references to them as outdated.

For theming, start with [THEME_INTEGRATION_GUIDE.md](./THEME_INTEGRATION_GUIDE.md).
