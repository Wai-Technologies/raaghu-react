# raaghu-design-tokens

Design token definitions and the build pipeline that converts them into runtime CSS custom properties consumed by both SCSS and MUI.

---

## How theming works

The token pipeline flows in one direction:

```
design-tokens.ts
      │
      ▼
build-rds-css-vars.ts          ← compiles token objects into --rds-* declarations
      │
      ▼
injectTokens()                 ← called at app bootstrap; writes vars to :root
      │
      ▼
--rds-* CSS custom properties  ← available globally in the browser
      │
      ├──▶ SCSS files          ← consume via var(--rds-color-primary), etc.
      └──▶ MUI theme           ← palette resolved from design-tokens.ts at build time
                                  (MUI requires static hex values for color math;
                                   runtime vars are layered on top for SCSS)
```

**Key files**

| File | Role |
|---|---|
| `raaghu-react-themes/src/tokens/design-tokens.ts` | Single source of truth for all token values |
| `raaghu-react-themes/src/tokens/build-rds-css-vars.ts` | Converts token objects to `--rds-*` CSS variable declarations |
| `raaghu-react-themes/src/tokens/injectTokens.ts` | Writes the declarations to `:root` at runtime |
| `raaghu-react-themes/src/mui/light.theme.ts` | MUI theme — reads resolved hex from design-tokens.ts |
| `raaghu-react-themes/src/mui/palette.ts` | MUI palette — maps token values to MUI palette slots |

---

## Mandatory setup

Every application consuming this design system **must** do two things:

### 1. Wrap with `RaaghuThemeProvider`

```tsx
import { RaaghuThemeProvider } from 'raaghu-react-themes';

function App() {
  return (
    <RaaghuThemeProvider>
      {/* your app */}
    </RaaghuThemeProvider>
  );
}
```

`RaaghuThemeProvider` calls `injectTokens()` on mount, which writes all `--rds-*` CSS custom properties to `:root`. Without this step, SCSS components will fall back to their hardcoded defaults and theming will not work.

### 2. Import `styles/index.scss`

```ts
// In your app entry point (e.g. main.tsx or index.ts)
import 'raaghu-react-themes/styles/index.scss';
```

This import pulls in the base SCSS layer that references `var(--rds-*)` properties. Skipping it means component styles will be missing or broken.

---

## Token types and current propagation status

| Token type | Propagation status | Notes |
|---|---|---|
| **Colors** | ✅ Full | All color tokens emit `--rds-color-*` vars; SCSS and MUI palette both consume them |
| **Spacing** | ⚠️ Partial | Core spacing scale (`--rds-spacing-*`) is wired; component-level margin/padding still uses hardcoded values in several elements |
| **Typography** | 🔴 Rebuild required | Font-size and line-height tokens exist but SCSS components largely use hardcoded `px`/`rem` values; a systematic pass is needed |
| **Border radius** | ⚠️ Mismatched | Token values and MUI `shape.borderRadius` are out of sync; components use a mix of token vars and literal values |
| **Shadows** | ⚠️ Partial | Shadow tokens are defined and wired into the MUI `shadows` array; SCSS `box-shadow` usage is inconsistent |
| **Z-index** | 🔴 Conflicting | Z-index values are defined in tokens but several components override them with hardcoded integers, causing stacking conflicts |

### Recommended remediation order

1. **Typography** — highest visual impact; audit all `font-size` / `line-height` literals in `raaghu-elements/`
2. **Z-index** — causes runtime bugs; centralise all z-index values through `--rds-z-*` vars
3. **Border radius** — align `shape.borderRadius` in MUI theme with `--rds-radius-*` token values
4. **Spacing / Shadows** — lower risk; complete the partial wiring incrementally

> **Governance note:** The CI job `style-governance` (`.github/workflows/style-governance.yml`) tracks hardcoded hex color debt via `scripts/hex-baseline.txt`. A similar baseline check for spacing and z-index literals is planned.

---

## Supported theme modes

The Raaghu Design System supports two theme modes:

| Mode | Status | Notes |
|---|---|---|
| `'light'` | ✅ Supported | Default mode |
| `'dark'` | ✅ Supported | Full dark token set |
| `'semi-dark'` | ❌ Not supported | Previously accepted but never implemented. Removed from `RaaghuThemeMode`. Pass `'light'` or `'dark'` explicitly. |

**Decision record:** `semi-dark` was present in the `RaaghuThemeMode` type and accepted by `injectTokens()`, but no dedicated token map was ever created for it. It silently fell back to `light` mode, which was misleading. The type has been narrowed to `'light' | 'dark'` and the fallback now resolves to `dark` with a console warning if a legacy `'semi-dark'` value is encountered at runtime.

---

## SSR Usage (Next.js / Remix)

```ts
import { buildStaticCssSnapshot } from '@raaghu/design-tokens'

// In your _document.tsx or root.tsx:
const criticalCss = buildStaticCssSnapshot('light')

// Inject as: <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
```

This prevents FOUC (flash of unstyled content) before `RaaghuThemeProvider` hydrates on the client.

`buildStaticCssSnapshot` is fully SSR-safe — it does not reference `document` or `window` and works in any Node.js environment.

---

## White-label / Brand Overrides

Override individual `--rds-*` tokens to apply custom brand colors without forking the design system.

```tsx
// Option 1: via provider
<RaaghuThemeProvider
  mode="light"
  brandOverrides={{
    '--rds-primary-main': '#FF6600',
    '--rds-primary-dark': '#CC5200',
    '--rds-primary-light': '#FF8533',
  }}
>
  <App />
</RaaghuThemeProvider>

// Option 2: direct call
import { injectTokens } from '@raaghu/design-tokens'

injectTokens('light', {
  '--rds-primary-main': '#FF6600',
})
```

Note: Override keys must exactly match a known `--rds-*` CSS variable name. Unknown keys will log a `console.warn` and still be applied (to support forward-compatibility), but should be treated as a configuration error.
