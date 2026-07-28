# Raaghu Design System — Architecture Overview

## Package Layout

```
@waiin/raaghu-react/                  ← root package (npm: @waiin/raaghu-react)
├── raaghu-elements/                  ← atoms (button, input, card, sidebar, appbar …)
├── raaghu-components/                ← molecules (charts, kanban, details-pane, chat …)
├── raaghu-layouts/                   ← app-shell, layout compositions
├── raaghu-react-themes/              ← token source of truth + MUI themes + provider
│   ├── tokens/
│   │   ├── design-tokens.ts          ← human-edited token definitions
│   │   └── build-rds-css-vars.ts     ← converts tokens → CSS custom properties
│   └── src/
│       ├── mui/                      ← MUI light/dark themes (palette mirrors tokens)
│       ├── provider/
│       │   ├── RaaghuThemeProvider.tsx
│       │   └── theme-utils.ts        ← applyRaaghuTheme / initializeRaaghuTheme
│       └── styles/
│           └── index.scss            ← global resets (uses var(--rds-*))
├── raaghu-pages/                     ← Vite demo app (client showcase)
│   └── src/
│       ├── main.tsx                  ← RaaghuThemeProvider bootstrap
│       └── pages/DashboardPage.tsx   ← RdsCompAppShell demo
├── utils/                            ← shared helpers (performance exported; a11y/i18n/quality reference)
└── .storybook/                       ← component documentation (primary demo today)
```

Root `package.json` declares `"workspaces": ["raaghu-pages"]` so raaghu-pages
resolves all deps from root `node_modules` — no duplicate React.

---

## Theme Pipeline (how tokens become styles)

```
design-tokens.ts          ← single source of truth for all values
       │
       ▼
build-rds-css-vars.ts
  injectTokens(mode)       ← called by RaaghuThemeProvider on every mode change
       │
       ▼
document.documentElement   ← --rds-* CSS custom properties written to <html>
       │
       ├── Component SCSS  ← var(--rds-primary-main), var(--rds-text-secondary) …
       └── MUI ThemeProvider ← palette.ts manually mirrors the same token values
```

**Key files:**

| File | Role |
|---|---|
| `tokens/design-tokens.ts` | The only place humans edit color/spacing/typography values |
| `tokens/build-rds-css-vars.ts` | `injectTokens(mode, overrides?)` — writes `--rds-*` vars to `<html>` |
| `src/provider/RaaghuThemeProvider.tsx` | React context; wraps MUI `ThemeProvider` + calls `injectTokens` |
| `src/provider/theme-utils.ts` | `applyRaaghuTheme`, `initializeRaaghuTheme`, `getRaaghuThemeMode` |
| `src/styles/index.scss` | Global resets referencing `var(--rds-*)` — import once at app root |
| `src/mui/palette.ts` | MUI palette — must stay in sync with `design-tokens.ts` by hand |

Supported modes: `'light'` | `'dark'`.
(`'semi-dark'` appears in older docs but is **not implemented**.)

---

## App Bootstrap (any consumer)

```tsx
// 1. Import global resets (once, at app entry)
import '@waiin/raaghu-react/raaghu-react-themes/src/styles/index.scss';

// 2. Wrap at the app root — this is the only provider needed
import { RaaghuThemeProvider } from '@waiin/raaghu-react/raaghu-react-themes/src/provider/RaaghuThemeProvider';

<RaaghuThemeProvider defaultMode="light">
  <App />
</RaaghuThemeProvider>
```

`RaaghuThemeProvider` initialises from `localStorage` on mount (key: `raaghu-theme`),
falls back to `prefers-color-scheme`, then to `defaultMode`.

Do not introduce a separate Griffel app-root provider. `RaaghuThemeProvider` already covers MUI, CSS vars, and `CssBaseline`. `@griffel/react` remains an optional dependency for atomic CSS-in-JS where needed, but there is no `utils/griffel` package in this repo.

---

## Theme Hook

```tsx
import { useRaaghuTheme } from 'raaghu-react-themes/src/provider/RaaghuThemeProvider';

const { mode, setMode, toggleMode, isDark } = useRaaghuTheme();
```

---

## Package Structure

### raaghu-elements / raaghu-components

Each component follows:

```
rds-{component}/
├── rds-{component}.tsx        ← React component + TypeScript props interface
├── rds-{component}.scss       ← BEM styles using var(--rds-*) tokens
└── rds-{component}.stories.tsx
```

### raaghu-layouts

```
rds-comp-{layout}/
├── rds-comp-{layout}.tsx
├── rds-comp-{layout}.scss
└── rds-comp-{layout}.stories.tsx
```

### raaghu-pages (demo app)

Vite + React app that imports components via `@raaghu/*` path aliases
configured in `raaghu-pages/vite.config.ts` and `tsconfig.app.json`.

```
raaghu-pages/
├── vite.config.ts             ← @raaghu/* aliases via fileURLToPath
├── tsconfig.app.json          ← paths mirrors vite aliases (TS type resolution)
└── src/
    ├── main.tsx               ← RaaghuThemeProvider + BrowserRouter
    └── pages/DashboardPage.tsx ← RdsCompAppShell + sidebar + KPI demo
```

---

## Component Hierarchy

```
raaghu-pages          ← page-level composition
      ↓
raaghu-layouts        ← RdsCompAppShell, RdsCompLayout
      ↓
raaghu-elements       ← RdsButton, RdsSidebar, RdsAppBar, RdsCard …
raaghu-components     ← RdsCompChartBar, RdsCompKanban, RdsCompChat …
      ↓
raaghu-react-themes   ← design-tokens.ts → CSS vars → MUI theme
```

---

## BEM Naming Convention

```scss
.rds-{component}                       /* Block  */
.rds-{component}__element              /* Element */
.rds-{component}--modifier             /* Modifier */
.rds-{component}__element--modifier    /* Element modifier */
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Components | React 19, TypeScript 5.8 |
| Base UI | Material UI 7 |
| CSS-in-JS (optional) | Griffel (`@griffel/react`) — no dedicated provider folder |
| Styling | SCSS/Sass (`sass`) |
| Build | Vite 7 |
| Docs / Visual tests | Storybook 10, Vitest (story tests) |
| Testing | Jest, React Testing Library, Vitest (Storybook) |
| Package manager | npm |

---

## Token Adoption Status

Component SCSS token adoption is **partial**:

- **109 SCSS files** use `var(--rds-*)` tokens correctly
- **60 SCSS files** still contain hardcoded hex values (~1,510 occurrences)

Top files to migrate: `rds-comp-date-and-time-picker.scss` (104 hex),
`rds-comp-details-pane.scss` (102), `rds-comp-e-signature.scss` (90).

New components and page files must use only `var(--rds-*)` — never hardcode hex.

---

## Development Workflow

1. Edit tokens in `tokens/design-tokens.ts`
2. No build step — `injectTokens()` applies changes at runtime via `RaaghuThemeProvider`
3. If MUI-themed values changed, mirror them manually in `src/mui/palette.ts`
4. Export new components from the relevant `index.ts` barrel
5. Write a Storybook story; verify light/dark with the toolbar toggle
6. For raaghu-pages: `npm run pages:dev` from repo root

---

*Update this file when the token pipeline, provider API, or package structure changes.*
