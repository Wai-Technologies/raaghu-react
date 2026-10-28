# Raaghu Design System — Theme Integration Status

## Current State

Theme integration is **operational**. The token pipeline and provider are fully
implemented and working in Storybook and raaghu-pages. **Hex colors in component
SCSS are solved** (baseline `0`, allowlisted map SVG selectors only). Remaining
hardcoding debt is **rgb()/rgba() literals** and **bare px/rem inside
component-local `--rds-*` custom properties** — gated by CI baselines and
scheduled for Phase A component-by-component cleanup.

**Phase B (cascade)** is a separate track: pervasive `!important` fighting MUI
Emotion, Bootstrap leftovers, and third-party CSS. Gated by
`scripts/important-baseline.txt` / `lint:important`. See override hierarchy in
`docs/CSS_ARCHITECTURE.md`.

---

## What Works

### Token pipeline
The full pipeline is implemented and live:

```
tokens/design-tokens.ts
       ↓
tokens/semantic-palette.ts          ← shared semantic roles
       ├── build-rds-css-vars.ts → injectTokens → --rds-* on <html>
       │                              └── Component SCSS: var(--rds-*)
       └── src/mui/palette.ts → MUI ThemeProvider
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

### Hex governance (complete)
- Stylelint `color-no-hex` + `npm run lint:hex` (`scripts/check-no-hex.mjs`)
- SCSS debt ceiling `scripts/hex-baseline.txt` = **0** (map SCSS allowlisted)
- Legitimate exceptions: `design-tokens.ts`, color-picker spectrum/API, map SVG
  attribute selectors, stories/tests/figma fixtures

---

## Remaining hardcoding debt (Phase A)

Frozen by CI; **do not raise** baselines. Ratchet down in component PRs.

| Gate | Script | Baseline | npm script |
|---|---|---|---|
| `rgb()` / `rgba()` in SCSS | `scripts/check-no-rgba-in-scss.mjs` | **203** | `lint:rgba` |
| Bare `px`/`rem` in `--…:` defs | `scripts/check-local-dim-px-in-scss.mjs` | **572** | `lint:local-dim-px` |
| Hex in SCSS | `scripts/check-hex-in-scss.sh` | **0** | (CI + `lint:hex`) |
| `!important` in SCSS (Phase B) | `scripts/check-no-important-in-scss.mjs` | **0** | `lint:important` |

---

## Phase B — `!important` cascade debt

Frozen by CI; **do not raise** the baseline. Ratchet down in cleanup PRs.
Independent of Phase A token migrations.

Root causes: MUI Emotion + dual theme/SCSS channels, Bootstrap legacy classes,
react-datepicker defaults, cross-component layout overrides, and habitual
`!important` on owned BEM.

### Top files by `!important` count

Opened at **~3337**; current baseline **0** (Phase B debt cleared in component SCSS).

Heavy files cleared via BEM specificity, `--flush` / `--docked` modifiers, and
`mui/overrides.ts` (Switch, Badge, Accordion, Button skins). New `!important`
fails CI (`lint:important`). Re-seed only if a documented third-party escape is
intentionally added:

```bash
node scripts/check-no-important-in-scss.mjs --set-baseline
```

### Top files by `rgb()`/`rgba()` count

| File | Occurrences |
|---|---|
| `rds-loader.scss` | 20 |
| `rds-app-bar.scss` | 13 |
| `rds-toggle-button.scss` | 13 |
| `rds-comp-datepicker.scss` | 13 |
| `rds-carousel.scss` | 11 |
| `rds-comp-adaptive-cards.scss` | 11 |
| `rds-comp-audio-player.scss` | 10 |
| `rds-comp-details-pane.scss` | 10 |
| `rds-comp-toast.scss` | 10 |

Prefer `var(--rds-*)`, `color-mix(in srgb, var(--rds-*) …)`, or tokens from
`alphaTokens` in `design-tokens.ts`.

### Local custom-property lengths — Phase A inventory

Classification from `node scripts/check-local-dim-px-in-scss.mjs --inventory`
(against current spacing/size token pixel values):

| Class | Count | Action in Phase A |
|---|---|---|
| **Map to existing token** | ~277 | Replace bare `Npx` with `var(--rds-spacing-*)` / `var(--rds-size-*)` |
| **Keep local, rename** | ~295 | True one-offs; rename numbered `dim-N` → semantic names |

**Examples — map to token:**

| Local | Value | Prefer |
|---|---|---|
| `--rds-ai-fab-menu-dim-1` | `200px` | `var(--rds-spacing-200)` |
| `--rds-chat-dim-11` | `240px` | `var(--rds-spacing-240)` |
| `--rds-component-button-height-small` | `32px` | `var(--rds-size-xl)` |
| `--rds-football-league-avatar-size` | `24px` | `var(--rds-size-lg)` |

**Examples — keep local (rename off `dim-N`):**

| Local | Value | Suggested rename direction |
|---|---|---|
| `--rds-app-bar-dim-2` | `26px` | e.g. icon / control chrome width |
| `--rds-chat-dim-2` | `26px` | same pattern |
| `--rds-popover-dim-1` | `285px` | popover min/max width |
| `--rds-adaptive-cards-dim-2` | `350px` | card width |

Policy (pragmatic): component-local lengths are allowed for true one-offs.
Prefer central tokens on exact match. **Do not author new numbered `dim-N`
names** — use semantic locals (`--rds-app-bar-logo-min-width`).

### Minor: bare border-radius rem (Phase A)

Non-zero rem radii not yet on `--rds-border-radius-*` (e.g. `0.375rem` ≡
`radiusTokens.md`, `0.5rem` ≡ `lg`). `0` resets and `50%` circles are fine.

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

`toggleMode()` cycles `light -> dark -> system -> light`. For production apps,
prefer explicit `setMode('system')`, `setMode('light')`, and `setMode('dark')`
actions so users can choose between following the device theme and forcing a
manual light or dark mode.

```scss
// Component SCSS — always use tokens
.rds-my-component {
  background-color: var(--rds-background-paper);
  color:            var(--rds-text-primary);
  border:           var(--rds-border-width-thin) solid var(--rds-divider);
  border-radius:    var(--rds-border-radius-md);

  &:hover {
    background-color: var(--rds-action-hover);
  }
}
```

---

## Phase A migration (per component)

1. Replace `rgb()`/`rgba()` with `var(--rds-*)` / `color-mix` / alpha tokens;
   ratchet `scripts/rgba-baseline.txt` down.
2. For each bare length in a `--rds-*:` definition: map exact matches to
   spacing/size tokens; rename remaining `dim-N` to semantic locals; ratchet
   `scripts/local-dim-px-baseline.txt` down.
3. Map non-zero bare `border-radius` rem to `--rds-border-radius-*`.
4. Verify light + dark in Storybook before merging.

Re-run inventory anytime:

```bash
node scripts/check-local-dim-px-in-scss.mjs --inventory
```

Common color mappings:

| Literal (light) | Token |
|---|---|
| `#3C98FF` | `var(--rds-primary-main)` |
| `#ffffff` (surface) | `var(--rds-background-paper)` |
| `#212121` (text) | `var(--rds-text-primary)` |
| `rgba(0,0,0,0.12)` | `var(--rds-divider)` / border alpha tokens |
| `rgba(0,0,0,0.5)` | `var(--rds-*)` overlay / `alphaTokens.overlayDark` |

---

*Last updated: 2026-10-28*
