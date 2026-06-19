# Theme Integration Guide

## How the Theme System Works

Theming in Raaghu is **entirely runtime** — there are no compiled SCSS theme files
to import. Instead, `RaaghuThemeProvider` calls `injectTokens(mode)` on every
mode change, which writes `--rds-*` CSS custom properties directly onto
`document.documentElement`. Component SCSS reads those variables.

```
RaaghuThemeProvider
  └── applyRaaghuTheme(mode)
        └── injectTokens(mode)              ← build-rds-css-vars.ts
              └── document.documentElement  ← --rds-* vars updated
```

MUI's `ThemeProvider` is also updated simultaneously — `RaaghuThemeProvider`
switches between `lightTheme` and `darkTheme` (from `src/mui/`) which both
mirror the token values.

---

## Quick Start

### 1. Install / import

```tsx
// main.tsx or app entry
import 'raaghu-react-themes/src/styles/index.scss';
import { RaaghuThemeProvider } from 'raaghu-react-themes';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <RaaghuThemeProvider defaultMode="light">
    <App />
  </RaaghuThemeProvider>
);
```

`index.scss` only contains global resets (box-sizing, body font, scrollbar).
It uses `var(--rds-*)` and does not define any colors by itself.

### 2. Toggle the theme from any component

```tsx
import { useRaaghuTheme } from 'raaghu-react-themes';

function ThemeToggle() {
  const { toggleMode, isDark, mode } = useRaaghuTheme();

  return (
    <button onClick={toggleMode}>
      {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
    </button>
  );
}
```

`toggleMode()` cycles through `light -> dark -> system -> light`.
Use it when you want a quick inline toggle that can also return to system mode.

### 3. Set a specific mode

```tsx
const { setMode } = useRaaghuTheme();
setMode('dark');
setMode('light');
setMode('system');
```

For client applications, prefer explicit `System`, `Light`, and `Dark` actions in
settings menus or profile menus. That keeps manual mode selection predictable while
still allowing the app to follow `prefers-color-scheme` when `system` is selected.

### 4. Controlled mode (parent drives the theme)

```tsx
<RaaghuThemeProvider mode={userPreference} onModeChange={savePreference}>
  <App />
</RaaghuThemeProvider>
```

### 5. Brand overrides (white-label)

Pass `brandOverrides` to replace specific tokens for a client theme:

```tsx
<RaaghuThemeProvider
  brandOverrides={{
    '--rds-primary-main':  '#FF6600',
    '--rds-primary-light': '#FF8533',
    '--rds-primary-dark':  '#CC5200',
  }}
>
  <App />
</RaaghuThemeProvider>
```

---

## Available CSS Custom Properties

All `--rds-*` variables are injected at runtime. The canonical list is in
`tokens/build-rds-css-vars.ts`. Key categories:

### Colors
```css
--rds-primary-main          /* brand primary */
--rds-primary-light
--rds-primary-dark
--rds-primary-50  …  --rds-primary-900
--rds-secondary-main
--rds-success-main
--rds-warning-main
--rds-error-main
--rds-text-primary
--rds-text-secondary
--rds-text-disabled
--rds-background-default    /* page background */
--rds-background-paper      /* card / panel surface */
--rds-background-surface
--rds-divider
--rds-action-hover
--rds-action-disabled
```

### Typography
```css
--rds-font-family-base
--rds-font-size-xs   --rds-font-size-sm   --rds-font-size-base
--rds-font-size-lg   --rds-font-size-xl
--rds-line-height-base
```

### Spacing
```css
--rds-spacing-xs    /* 4px  */
--rds-spacing-sm    /* 8px  */
--rds-spacing-md    /* 16px */
--rds-spacing-lg    /* 24px */
--rds-spacing-xl    /* 32px */
```

### Shape
```css
--rds-border-radius-sm   --rds-border-radius-md
--rds-border-radius-lg   --rds-border-radius-full
```

### Elevation
```css
--rds-elevation-1  …  --rds-elevation-5
```

### Z-index
```css
--rds-z-index-dropdown   --rds-z-index-modal
--rds-z-index-tooltip    --rds-z-index-portal
```

---

## Writing Component SCSS

Always use tokens. Never hardcode hex values.

```scss
// Good
.rds-my-component {
  background-color: var(--rds-background-paper);
  color:            var(--rds-text-primary);
  border:           1px solid var(--rds-divider);
  border-radius:    var(--rds-border-radius-md);
  padding:          var(--rds-spacing-md);
  box-shadow:       var(--rds-elevation-2);
  transition:       background-color 200ms ease;

  &:hover {
    background-color: var(--rds-action-hover);
  }

  &--primary {
    background-color: var(--rds-primary-main);
    color:            var(--rds-primary-contrast-text);
  }
}
```

```scss
// Bad — these will not switch in dark mode
.rds-my-component {
  background-color: #ffffff;
  color: #212121;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
```

---

## Extending the Token Set

To add a new token:

1. Add the value to the appropriate export in `tokens/design-tokens.ts`
2. Map it to a `--rds-*` CSS variable name in `tokens/build-rds-css-vars.ts`
   (add entries to both the light and dark maps)
3. If the token affects MUI components, add it to `src/mui/palette.ts`
4. Use `var(--rds-your-new-token)` in SCSS

**Only edit `design-tokens.ts`** for the raw values — the build script and
the SCSS are downstream consumers of that file.

---

## Persistence and Initialization

On mount, `RaaghuThemeProvider` reads from `localStorage` key `'raaghu-theme'`.
If absent, it falls back to `prefers-color-scheme`. If that is unavailable,
it uses `defaultMode` (default: `'light'`).

To programmatically clear the stored preference:

```ts
localStorage.removeItem('raaghu-theme');
```

---

## Storybook

Storybook uses `RaaghuThemeProvider` in `.storybook/preview.ts`. Use the
light/dark toolbar toggle to verify both modes. No extra setup is needed
in individual story files.

---

## What NOT to Do

| Avoid | Use instead |
|---|---|
| Importing `themes/light.scss` | These files do not exist |
| Importing `themes/dark.scss` | These files do not exist |
| `setMode('semi-dark')` | Only `'light'` and `'dark'` are supported |
| Wrapping with `GriffelProvider` | Use `RaaghuThemeProvider` |
| Hardcoding hex in SCSS | Use `var(--rds-*)` tokens |
| Importing individual color variables | Use CSS custom properties at runtime |
