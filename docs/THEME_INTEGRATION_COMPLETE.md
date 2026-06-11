# Raaghu Design System — Theme Integration Status

## Current State

Theme integration is **partially complete**. The token pipeline and provider are
fully implemented and working in Storybook and raaghu-pages. Component SCSS
adoption is in progress.

---

## What Works

### Token pipeline
The full pipeline is implemented and live:

```
tokens/design-tokens.ts
       ↓  (injectTokens called by RaaghuThemeProvider)
tokens/build-rds-css-vars.ts
       ↓
--rds-* CSS custom properties on <html>
       ↓
Component SCSS reads var(--rds-*)
MUI ThemeProvider reads palette.ts (mirrors token values)
```

### RaaghuThemeProvider
- Controlled and uncontrolled modes
- `localStorage` persistence (key: `raaghu-theme`)
- `prefers-color-scheme` fallback on first load
- Optional brand override via `brandOverrides` prop
- Wraps MUI `ThemeProvider` + injects `CssBaseline`
- `useRaaghuTheme()` hook: `{ mode, setMode, toggleMode, isDark }`

### Storybook
- All stories wrapped in `RaaghuThemeProvider` via `.storybook/preview.ts`
- Light/dark toolbar toggle switches tokens and MUI theme simultaneously

### raaghu-pages demo app
- `main.tsx` bootstraps with `RaaghuThemeProvider` and `index.scss`
- `DashboardPage` demonstrates live theme toggle across the full app shell

---

## Partial: Component SCSS token adoption

As of the last audit:

| Metric | Count |
|---|---|
| SCSS files using `var(--rds-*)` | 109 |
| SCSS files with hardcoded hex values | 60 |
| Total hardcoded hex occurrences | ~1,510 |

**Top files to migrate (by hex count):**

| File | Occurrences |
|---|---|
| `rds-comp-date-and-time-picker.scss` | 104 |
| `rds-comp-details-pane.scss` | 102 |
| `rds-comp-e-signature.scss` | 90 |
| `rds-comp-comments-box.scss` | 84 |
| `rds-app-bar.scss` | 64 |
| `rds-comp-code-snippet.scss` | 60 |

Components with hardcoded hex will not theme-switch cleanly until migrated.

---

## What Does NOT Exist (despite older docs)

These files were referenced in earlier documentation but **do not exist**:

- `raaghu-react-themes/src/styles/custom-properties.scss`
- `raaghu-react-themes/src/styles/variables/color-variables.scss`
- `raaghu-react-themes/src/styles/themes/light.scss`
- `raaghu-react-themes/src/styles/themes/dark.scss`
- `raaghu-react-themes/src/styles/themes/semi-dark.scss`

There are no SCSS theme files. Theming is **entirely runtime** via
`injectTokens()` writing `--rds-*` CSS custom properties to `<html>`.
Do not import these paths — they will 404.

`semi-dark` mode is **not implemented**. Only `'light'` and `'dark'` are supported.

---

## Correct App Setup

```tsx
// Entry file (e.g. main.tsx)
import 'raaghu-react-themes/src/styles/index.scss';   // global resets only
import { RaaghuThemeProvider } from 'raaghu-react-themes';

createRoot(document.getElementById('root')!).render(
  <RaaghuThemeProvider defaultMode="light">
    <App />
  </RaaghuThemeProvider>
);
```

```tsx
// Any component that needs theme access
import { useRaaghuTheme } from 'raaghu-react-themes';

function ThemeToggle() {
  const { toggleMode, isDark } = useRaaghuTheme();
  return <button onClick={toggleMode}>{isDark ? 'Light' : 'Dark'}</button>;
}
```

```scss
// Component SCSS — always use tokens, never hardcode hex
.rds-my-component {
  background-color: var(--rds-background-paper);
  color:            var(--rds-text-primary);
  border:           1px solid var(--rds-divider);
  border-radius:    var(--rds-border-radius-md);

  &:hover {
    background-color: var(--rds-action-hover);
  }
}
```

---

## Migration Path for Hardcoded Components

To migrate a component from hardcoded hex to tokens:

1. Open the `.scss` file
2. For each hardcoded color, find the equivalent `--rds-*` token in
   `tokens/design-tokens.ts` or `tokens/build-rds-css-vars.ts`
3. Replace the hex with `var(--rds-{token-name})`
4. Test in Storybook with both light and dark toolbar toggle
5. Verify no visual regression via Chromatic

Common mappings:

| Hex (light theme) | Token |
|---|---|
| `#3C98FF` | `var(--rds-primary-main)` |
| `#2534E9` | `var(--rds-secondary-main)` |
| `#ffffff` (surface) | `var(--rds-background-paper)` |
| `#f5f5f5` (page bg) | `var(--rds-background-default)` |
| `#212121` (text) | `var(--rds-text-primary)` |
| `#757575` (muted) | `var(--rds-text-secondary)` |
| `rgba(0,0,0,0.12)` | `var(--rds-divider)` |

---

*Last updated: 2026-05-30*
