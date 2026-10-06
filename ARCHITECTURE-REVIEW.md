# Raaghu React — architecture review

First fix pass is in the tree. It covers contrast text, the date-picker raw overrides, file-uploader fallbacks, the button `sx` bug, Strict Mode motion callbacks, z-index literals, and the global focus ring. Still open: the 5,526 `!important` sweep, splitting `primary[200]` / `primary[700]` into two brand colors, moving `RdsCompSpinner` out of the elements→components import, exporting component prop types, and layout tests.

Reviewed against the tree in this workspace (`@waiin/raaghu-react` 2.0.0).
Style and script scans covered 125 `.scss`/`.css` files. TypeScript findings are from source under `raaghu-elements`, `raaghu-components`, `raaghu-layouts`, `raaghu-react-themes`, and `raaghu-pages` (tests and stories excluded from the `any` count).

Token source of truth:

- TypeScript tokens: `raaghu-react-themes/tokens/design-tokens.ts`
- CSS custom properties emitted from those tokens: `raaghu-react-themes/tokens/build-rds-css-vars.ts` (`injectTokens()`)
- Runtime injection and brand overrides: `raaghu-react-themes/src/provider/theme-utils.ts`, `RaaghuThemeProvider.tsx`
- MUI themes: `raaghu-react-themes/src/mui/palette.ts`, `light.theme.ts`, `dark.theme.ts`

There is no `tokens.scss` / `tokens.json`. SCSS is expected to consume `var(--rds-*)`.

---

## 1. Summary

**Token compliance: 4 / 10.** The pipeline shape is right: one TypeScript module feeds both CSS variables and the MUI palette. Most color declarations already go through `var(--rds-*)`, which is why bare hex (a color written outside a `var()` fallback) is limited to 120 hits in 4 files. The scale itself is not trustworthy. Brand colors were written into numeric Material slots so that light and dark “normal” are the same hex, `!important` is used 5,526 times to beat MUI, and `brandOverrides` update CSS variables only. MUI `createTheme()` objects are frozen at module scope, so a consumer rebrand does not reach MUI components.

**React 19 readiness: 7 / 10.** Library peers are `react` / `react-dom` `^19.0.0` (`package.json` lines 197–199). The app workspace pins `19.2.5`. There is no `propTypes`, no `ReactDOM.render`, no `react-test-renderer`, and no head-management library. What is left is leftover `forwardRef`, one `<Context.Provider>`, and motion transitions whose effects call enter/exit callbacks with no cleanup, so React Strict Mode’s double-invoke will fire them twice in development.

---

## 2. Critical issues

| File | Line | Issue | Rule violated | Suggested fix |
| --- | --- | --- | --- | --- |
| `raaghu-react-themes/tokens/design-tokens.ts` | 11–19, 28–35, 44–51, 59–66, 74–81 | Numeric ramps are overwritten with brand colors, and the light and dark “normal” slots are the same hex. `primary[200]` and `primary[700]` are both `#3C98FF`. The same pattern is on `secondary` (`#2534E9`), `success` (`#1F7630`), `warning` (`#C2510C`), and `error` (`#BD0D1D`). `primary[500]` is still `#2196f3`, so the scale is not a luminance ramp. | A color scale step must be a single role. Light and dark theme colors must differ when the design calls for it. | Keep a real 50–900 ramp. Put theme roles in semantic aliases (`primary.main`, `primary.on`, `primary.container`) and point both the CSS vars and `palette.ts` at those aliases. |
| `raaghu-react-themes/src/mui/palette.ts` | 27, 94, 30 | Light `primary.main` is `p[700]` and dark `primary.main` is `p[200]`. Both resolve to `#3C98FF`, with `contrastText: white` (lines 25, 30). White on `#3C98FF` is about **2.95:1**, under the WCAG 2.1 AA 3:1 bar for UI components and the 4.5:1 bar for text. The global focus ring uses the same color (`raaghu-react-themes/src/styles/index.scss` line 29). | WCAG 2.1 AA contrast for text and for non-text UI (focus, buttons). | Pick a primary whose contrast against its `contrastText` is at least 4.5:1, and a focus color at least 3:1 against adjacent surfaces. Do not reuse one hex for both theme modes. |
| `raaghu-react-themes/src/mui/palette.ts` | 4–5, 73–76, 139–143 | `white` / `black` and every `action.*` color are raw hex or `rgba(...)`. They are not read from `colorTokens`. `build-rds-css-vars.ts` already uses `colorTokens.neutral[0]` and `neutral[1000]`. | One source of truth for color. | `const white = colorTokens.neutral[0]` and the same for black. Add `action` tokens and read them here. |
| `raaghu-react-themes/src/mui/light.theme.ts` | 7–8, 10, 25 | Line 7 says the palette is resolved hex. Line 8 says the palette uses runtime CSS variables. The code matches line 7: `lightTheme` is a module-level `createTheme()` and never rebuilds when `brandOverrides` change. `fontSize: 14` is a raw number. Token comments treat `0.875rem` as 14px at a 16px root, so MUI `pxToRem` and CSS `rem` will disagree. `dark.theme.ts` line 25 repeats `fontSize: 14`. | Theme objects and CSS variables must move together. Magic numbers do not. | Delete the contradictory comment. Build the MUI theme inside the provider from the same token object after overrides, or document that MUI cannot be rebranded. Set `fontSize` from a named token, and decide whether the root is 14px or 16px. |
| `raaghu-react-themes/src/provider/RaaghuThemeProvider.tsx` | 30–33, 72–73, 89 | `brandOverrides` are applied by `applyRaaghuTheme()` as `--rds-*` variables. `muiTheme` is still the frozen `lightTheme` or `darkTheme`. SCSS-styled components rebrand; MUI-styled components do not. | A consuming app must be able to override the theme without forking SCSS or the MUI theme file. | Pass overrides into a `createTheme` factory so palette, typography, and CSS variables share one resolved map. |
| `raaghu-components/rds-comp-date-and-time-picker/rds-comp-date-and-time-picker.scss` | 632–656 | Token-based rules are immediately overridden by raw values, so the tokens never win: `background-color: #2196F3`, `color: #fff`, `border: 2px solid #2196F3`, `border-radius: 4px`, `font-weight: 400`. `#2196F3` is `primary[500]`, while MUI primary main is `#3C98FF`. Same override pattern continues at line 1044 (`border: 2px solid #2196F3 !important`). | No raw color, radius, or weight when a token exists. Later declarations must not cancel the token line above them. | Delete the second block. Keep `var(--rds-color-primary)`, `var(--rds-color-on-primary)`, `var(--rds-border-radius-sm)`, `var(--rds-font-weight-normal)`. |
| `raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss` | 1224, 1229, 1235–1236, 1257, 1262 | Dark-theme header text and the select chevron are raw `#ffffff`, several of them with `!important`. Nearby backgrounds already use `var(--rds-background-paper, …)`. | Color comes from a token. `!important` is not a theming strategy. | `color: var(--rds-color-on-surface)` (or the on-paper token). Build the chevron gradient from that same variable. |
| `raaghu-elements/rds-button/rds-button.tsx` | 6, 208–214 | An element imports a component: `RdsCompSpinner` from `raaghu-components`. The DOM `style` prop then spreads `...(sx as any)`. MUI `sx` is a style-callback/object, not `CSSProperties`, so selectors can land on the DOM style attribute. | Elements do not import components. `sx` stays on the `sx` prop. | Move the spinner to `raaghu-elements`, or accept a `loadingIndicator` node. Remove `sx` from the `style` object; it is already applied on `sx` at line 200. |
| `raaghu-react-themes/src/motion/MotionDialogTransition.tsx` | 21–24 | `useEffect` calls `onEnter` and `onEntered` (or exit pair) whenever `isIn` changes, with no cleanup. `MotionMenuTransition.tsx` lines 21–24 are the same. Strict Mode runs the effect twice in development, so those callbacks fire twice. `durationMs` and `timeout` are accepted and ignored. | Effects must be idempotent under double-invoke. A transition reports enter and entered on the animation, not in the same tick. | Cleanup the effect, or key the callback so a strict-mode remount does not emit a second enter. Drive `onEntered` from `transitionend`. |
| Systemic SCSS | 5,526 hits in 125 files | `!important` is the default way to beat MUI. Highest files: `rds-app-bar.scss` 629, `rds-comp-app-shell.scss` 629, `rds-comp-adaptive-cards.scss` 510, `rds-comp-comments-box.scss` 457, `rds-comp-datepicker.scss` 348, `rds-comp-kanban-board.scss` 193, `rds-comp-product-tour.scss` 186, `rds-switch.scss` 141, `rds-comp-date-and-time-picker.scss` 138, `rds-tabs.scss` 136. Example: `raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss` line 172 (`background: var(--rds-surface-dark, #1f2123) !important`). | Specificity is solved with a layer or a MUI `styleOverrides` slot, not `!important`. | Add `@layer rds, mui` (or style the MUI slot) and delete `!important` file by file, starting with app bar and app shell. |

A line-by-line table of all 5,526 `!important` uses would hide the actual defect: the cascade is patched globally. The counts above are the inventory.

---

## 3. Moderate issues

### Colors that bypass the token even when a variable is present

Scan method: strip balanced `var(...)` calls, then count remaining `#hex` and `rgb()/rgba()`.

| Kind | Count | Where |
| --- | --- | --- |
| Hex used as a `var()` fallback | 432 | Across component SCSS. The variable is correct; the fallback is a second palette. |
| Bare hex (not inside `var()`) | 120 in 4 files | Date-and-time picker, datepicker dark block, `.storybook/custom-theme.css`, map attribute selectors |
| Bare `rgb()` / `rgba()` | 78 | Shadows, loader keyframes, Storybook, MUI `action` colors |

Fallback drift, all meaning “primary” or “on-surface”, in `raaghu-elements/rds-file-uploader/rds-file-uploader.scss`:

| Line | Fallback | Actual token it should match |
| --- | --- | --- |
| 42, 58, 73, 126, 132, 145, 315, 331 | `#3390e6` | Not in `colorTokens` at all |
| 97, 234 | `#2196F3` | `colorTokens.primary[500]`, which is not theme `main` |
| 201 | `#3C98FF` | `colorTokens.primary[700]`, the light-theme main |
| 391 | `#1976d2` | `colorTokens.info[600]`, not primary |
| 179, 294 | `#d32f2f` | Not in `colorTokens.error` (`error[500]` is `#f44336`) |
| 14, 164, 175, 376 | `#222` | `neutral[900]` is `#212121` |

If `injectTokens()` has not run, one component paints five different blues. Drop the fallbacks, or generate them from `design-tokens.ts` so they cannot diverge.

Other bare colors verified in source:

| File | Line | Value | Replacement |
| --- | --- | --- | --- |
| `.storybook/custom-theme.css` | 19, 31, 32, 37, 41, 42 | `#2a2a2a`, `#1b1b1b`, `#e0e0e0`, `#c8c8c8`, `#1a2f42` | Storybook chrome. Map to `neutral[900]`, `neutral[800]`, `neutral[300]`, or leave as docs-only and say so. |
| `.storybook/custom-theme.css` | 70 | `box-shadow: rgba(0, 0, 0, 0.3) 0 3px 10px 0 !important` | No `shadowTokens` entry matches. Coverage gap (see section 5). |
| `raaghu-components/rds-comp-map/rds-comp-map.scss` | 266–267 | `svg rect[fill="#fff"]` | Attribute selectors must match the SVG source. Tokenize the map fill in the component that emits the SVG, then select a class. |
| `raaghu-elements/rds-badge/rds-badge.scss` | 323–326 | `box-shadow: 0 1px 4px rgba(108, 46, 183, 0.08)`; `padding: … 18px`; `min-width: 60px` | Purple is not in `colorTokens`. `18px` is `--rds-spacing-18` (`spacingExact['18']`). `60px` is `--rds-spacing-60`. Shadow: no token. |
| `raaghu-elements/rds-loader/rds-loader.scss` | 145, 158–167 | Fallback `z-index: var(--rds-z-index-tooltip, 9999)` while the token is **1800** (`zIndexTokens.tooltip`). Keyframe shadows use `rgba(225, 20, 98, …)`, `rgba(111, 202, 220, …)`, `rgba(61, 184, 143, …)`, `rgba(233, 169, 32, …)`. | Fix the fallback to `1800` or remove it. Those four animation colors are a coverage gap. |
| `raaghu-elements/rds-app-bar/rds-app-bar.scss` | 2560 | `box-shadow: 0 -4px 12px rgba(0,0,0,0.08)` | No upward shadow in `shadowTokens`. |
| `raaghu-components/rds-comp-toast/rds-comp-toast.scss` | 348 | `box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2)` | Focus ring. `2px` is `--rds-spacing-xxs`. The blue is close to `info[600]` (`#1976D2`) but the ring itself has no token. |
| `raaghu-elements/rds-carousel/rds-carousel.scss` | 344 | `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3)` | No matching `shadowTokens` entry (`lg` is `0 10px 15px -3px …`). |
| `raaghu-pages/src/pages/DashboardPage.tsx` | 59–61, and the same pattern on the KPI cards below | `#4F46E5`, `rgba(79,70,229,0.12)`, `#059669` | Demo page bypasses tokens entirely. Use `--rds-*` or palette keys. |

### Spacing, type, radius, z-index

136 `font-size` declarations do not use a variable. Values that already have a token:

| Raw value | Token variable |
| --- | --- |
| `0.75rem`, `12px` | `--rds-font-size-xs` |
| `0.875rem`, `14px` | `--rds-font-size-sm` |
| `1rem`, `16px` | `--rds-font-size-md` (`typographyTokens.fontSize.base`) |
| `1.125rem`, `18px` | `--rds-font-size-lg` |
| `1.25rem` | `--rds-font-size-xl` |
| `1.5rem` / `1.50rem` | `--rds-font-size-2xl` |

Examples: `rds-comp-comments-box.scss` 185 (`18px !important`), 267 (`16px !important`), 283 (`12px !important`), 1528 (`10px !important`); `rds-comp-datepicker.scss` 53 and 153 (`1rem`), 256 (`0.875rem`), 411 (`0.8125rem`), 506 (`0.9rem`), 1048 (`0.95rem`); `rds-comp-date-and-time-picker.scss` 118 (`1.25rem`), 457 (`1.50rem`), 1000 (`0.8rem !important`); `rds-comp-adaptive-cards.scss` 1366 (`1.3rem !important`), 1500 (`0.8rem`).

`10px`, `0.8rem`, `0.8125rem`, `0.9rem`, `0.95rem`, and `1.3rem` have **no** font-size token. `xs` is `0.75rem` (12px). Those are coverage gaps, not “use xs”.

Hardcoded `padding` / `margin` / `gap` still in wide use. Representative lines that already have a token:

| File | Line | Value | Token |
| --- | --- | --- | --- |
| `rds-comp-comments-box.scss` | 261 | `gap: 2px` | `--rds-spacing-xxs` (`semanticAliasTokens.rdsSpacingXxs`, `design-tokens.ts` line 1185) |
| `rds-comp-comments-box.scss` | 276, 1933 | `padding: 2px 4px`, `padding: 2px` | `--rds-spacing-xxs`, `--rds-spacing-xs-px` |
| `rds-comp-color-picker.scss` | 291 | `gap: 8px` | `--rds-spacing-sm-px` |
| `rds-comp-date-and-time-picker.scss` | 725, 762, 863, 974, 1082 | `16px`, `8px`, `12px` | `--rds-spacing-md-px`, `--rds-spacing-sm-px`, `--rds-spacing-3` (`0.75rem`) |
| `rds-comp-datepicker.scss` | 63, 88, 174 | `0.5rem`, `0.16rem`, `0.25rem 1rem` | `0.5rem` is spacing step 2; `0.25rem` is step 1; `0.16rem` has no token |
| `raaghu-react-themes/src/styles/index.scss` | 29–30, 39–40 | focus `2px`, scrollbar `8px` | `--rds-spacing-xxs`, `--rds-spacing-sm-px` |
| `rds-badge.scss` | 310 | `font-size: 0.875rem !important` | `--rds-font-size-sm` |

Z-index literals (a variable exists for each):

| File | Line | Value | Token |
| --- | --- | --- | --- |
| `rds-comp-datepicker.scss` | 233 | `z-index: 1` | `--rds-z-index-layer-1` |
| `rds-accordion.scss` | 318 | `z-index: 1` | `--rds-z-index-layer-1` |
| `rds-form-control.scss` | 66 | `z-index: 2` | `--rds-z-index-layer-2` (also `--rds-z-index-above`, which is `zIndexTokens.above` = 2) |
| `rds-input.scss` | 456, 482 | `z-index: 1` and `z-index: 2` | `--rds-z-index-layer-1`, `--rds-z-index-layer-2` |

`--rds-z-index-layer-1` is the string `'1'` in `build-rds-css-vars.ts` line 102. It is not a field on `zIndexTokens` (`design-tokens.ts` lines 390–405). The CSS map and the TypeScript scale have already drifted.

`rds-comp-datepicker.scss` lines 624–625 also hardcode popper offsets `left: 17px` and `top: 90px` with `!important`. No spacing token is 17px or 90px.

### MUI shadow tuple is not a scale

`light.theme.ts` lines 46–60 copy `shadowTokens['2xl']` into every slot after `xl` so the array is 25 long (MUI’s requirement). Elevations 7 through 24 are the same shadow. `shadowTokens` (`design-tokens.ts` lines 350–358) only defines `none` through `2xl` plus `inner`. Either add the missing steps or stop exposing MUI elevation as if it were a 25-step scale.

### TypeScript

84 `any` / `as any` hits in non-test source. The ones on public surfaces:

| File | Line | Issue |
| --- | --- | --- |
| `design-tokens.ts` | 674 | `componentTokens` is `… & Record<string, any>` via `as any`, then mutated (`componentTokens.toolbar = …` at line 677). The token object is not a closed type. |
| `rds-comp-grid.tsx` | 270–278, 427–429 | Cell `value`, `row`, and action callbacks are `any`. |
| `rds-comp-datepicker-utils.tsx` | 27–28, 66–70, 163–167 | `props: any`, `date: any`, `RefObject<any>`. |
| `rds-comp-date-and-time-picker.tsx` | 175, 251, 255, 268, 272 | `[key: string]: any` and `as any` on MUI day slots. This file is commented out of the public barrel (components `index.ts` line 55) as an incomplete implementation, and the SCSS matches that. |
| `rds-comp-chart-stacked.tsx` | 12–14 | `labels`, `options`, and `dataSets` are `any`. Same pattern on scatter (`rds-comp-chart-scatter.tsx` lines 25, 60, 100). |
| `rds-comp-notification.tsx` | 84, 89 | Dismiss handlers are `(event: any, notification: any, …)`. |
| `rds-range.tsx` | 161 | `slotProps={… as any}` to pass a custom value-label formatter. |
| `rds-comp-chat-utils.tsx` | 100 | `currentUser: any`, `addCommentFn: any`. |

`raaghu-elements/index.ts` exports prop interfaces (`RdsButtonProps` at line 65 and following). `raaghu-components/index.ts` exports components only. Consumers of charts, grid, and datepicker cannot import the public prop types from the package entry.

### Component API

`RdsButtonProps` (`rds-button.tsx` lines 34–47) omits MUI `variant` and uses `style: 'filled' | 'outlined' | 'transparent'`, then maps that onto `variant` at line 197. `color` is the MUI color union. `size` is only available because `ButtonProps` is spread through. The design-system word for visual treatment is `style` on the button and `variant` on MUI. That split will keep happening at every wrapper.

`textCase` defaults to `'uppercase'` (line 64). Uppercase button text is a WCAG 2.1 concern for letter-spacing and for users who read by shape; it should default to the token already set on the MUI button, which is `textTransform: 'none'` (`light.theme.ts` line 38).

Loading state (`rds-button.tsx` lines 143–150, 185) sets `disabled` and swaps in a spinner. There is no `aria-busy`. A disabled control is removed from the accessibility tree’s action list, so the loading label is easy to miss. Set `aria-busy={isLoading}` and prefer `aria-disabled` when the control must stay focusable during the request.

### Layering

The only upward import found: `raaghu-elements/rds-button/rds-button.tsx` line 6 imports `raaghu-components/rds-comp-spinner`. Nothing in elements or components imports `raaghu-pages`. Layouts compose elements, which is the direction you want. The button dependency inverts elements → components.

`package.json` `files` (lines 53–69) publishes all of `raaghu-components/`. Components commented out of `raaghu-components/index.ts` (tree, adaptive cards, chat, code snippet, comments, details pane, navtabs, grid, date-and-time picker, lines 31–37 and 45 and 55) are still importable by path. “Not part of the public API” is true only for the barrel file.

### Theming extensibility

CSS variables plus `brandOverrides` (`RaaghuThemeProvider` lines 25–34) are a real extension point for SCSS. They are not an extension point for MUI, as covered above. There is no SCSS variable override path (`!default` tokens). A consumer who does not mount `RaaghuThemeProvider` gets fallbacks, and those fallbacks disagree with each other.

### Accessibility inventory

80 of 161 non-story `.tsx` files contain an `aria-*` or `role` attribute. Many of the other files are helpers, so that ratio is not “half the components are inaccessible.” The concrete gaps tied to tokens and APIs are the primary contrast failure above, the uppercase button default, and the missing `aria-busy` on the loading button.

---

## 4. Minor / nitpicks

- `design-tokens.ts` lines 195–205: `typographyTokens.fontSize.popover` stores widths (`containerMaxWidth: '400px'`, and so on). Those are layout tokens filed under font size.
- `design-tokens.ts` line 240: a comment reading “Secondary Colors (blue/indigo brand palette)” sits inside `letterSpacing`. Copy-paste damage in the token module.
- `typographyTokens.fontFamily.monospace` (line 186) is `'"Poppins", sans-serif'`. `build-rds-css-vars.ts` lines 130–131 then set `--rds-font-family-monospace` and `--rds-font-family-mono` to that same stack. Code blocks have no monospace family.
- `extendedBreakpointTokens` (`design-tokens.ts` lines 136–179) duplicates `breakpointTokens` and then adds one-off widths (`833`, `835`, `1112`, …). The breakpoint scale has the same “token per legacy pixel” problem as `spacingExact`.
- `spacingExact` (`design-tokens.ts` lines 285–333) documents itself as “legacy SCSS only — avoid in new components” and then lists `7px`, `13px`, `157px`, `235px`, `neg-80`, and similar. Promoting every magic number to a token makes lint-clean CSS that is still not a scale.
- `RdsCompAiAttachement` (`raaghu-components/index.ts` lines 47–48) is a deprecated typo alias. Fine as a shim; do not use it in new stories.
- `tests/jest-setup.ts` line 44 filters the string `Warning: ReactDOM.render`. Nothing in the library calls `ReactDOM.render`. The filter is dead.
- `raaghu-components/rds-comp-code-snippet` stories embed an HTML document string with `<title>` and `<meta>`. That is sample content, not app head management. `raaghu-pages` does not set `document.title`. React 19’s native `<title>` / `<meta>` hoisting is unused because no page needs it yet.
- Story coverage: every `rds-*` directory under elements (63), components (52), and layouts (2) has a `.stories` file. Pages are a demo app and have none.

---

## 5. Token coverage gaps

Values that show up repeatedly and have no token. Do not “fix” these by adding another one-off key next to `spacingExact['157']` unless the value is a real role (focus ring, overlay, chart series).

| Value | Where it shows up | What to add |
| --- | --- | --- |
| `#3390e6`, `#d32f2f`, `#222`, `#1e1e2e`, `#4a4a4a` | File uploader and dark fallbacks | Nothing new if the semantic token already exists. Delete the fallback. `#3390e6` and `#d32f2f` and `#222` are not in `colorTokens`. |
| `#4F46E5`, `#059669` | `DashboardPage.tsx` KPI accents | No indigo or emerald in `colorTokens`. Either add semantic chart/KPI accents or use `primary` / `success`. |
| `rgba(225, 20, 98)`, `rgba(111, 202, 220)`, `rgba(61, 184, 143)`, `rgba(233, 169, 32)` | `rds-loader.scss` keyframes 158–167 | Loader accent colors. Not in `colorTokens`. |
| `rgba(108, 46, 183, 0.08)` | `rds-badge.scss` line 323 | No purple in the palette (`tertiary[500]` is `#DA25E9`). |
| `rgba(0, 0, 0, 0.04)` and the other `action.*` alphas | `palette.ts` lines 73–76 and 139–143 | No action-state tokens. |
| `0 0 0 2px` focus ring, `0 -4px 12px rgba(0,0,0,0.08)`, `0 2px 12px rgba(0,0,0,0.3)`, `0 3px 10px rgba(0,0,0,0.3)` | Toast, app bar, carousel, Storybook | `shadowTokens` has no focus ring and no upward shadow. |
| `10px`, `0.8rem`, `0.8125rem`, `0.9rem`, `0.95rem`, `1.3rem` | Comments box, date pickers, adaptive cards | Below or between the type scale. Snap to `xs`/`sm`/`md` or add a named role (`caption-tight`, `datepicker-day`) if the size is intentional. |
| `0.16rem`, `17px`, `90px`, `3.25rem`, `1.375rem` | `rds-comp-datepicker.scss` padding and popper offsets | No spacing token. |
| A real monospace stack | `--rds-font-family-mono` currently resolves to Poppins | Add `fontFamily.monospace` as an actual mono family. |
| Z-index `1` | Used in input, accordion, datepicker | CSS var exists; `zIndexTokens` has no `1`. Add it to the TypeScript scale or stop emitting a parallel map in `build-rds-css-vars.ts`. |

`spacingExact` already contains a long list of odd pixels. That is coverage by accumulation, not a gap. New components should use the 4px-based `spacingTokens` (lines 246–267) and the named aliases `hairline` through `3xl`.

---

## 6. React 19 upgrade opportunities

These still work on React 19. They are leftovers, not breakages.

| Location | What to change |
| --- | --- |
| `raaghu-react-themes/src/motion/MotionDialogTransition.tsx` line 14, and the same `forwardRef` wrapper in `MotionMenuTransition.tsx`, `MotionDrawerTransition.tsx`, `MotionSnackbarTransition.tsx`, `MotionPopoverTransition.tsx`, `MotionTooltipTransition.tsx`, `MotionCollapse.tsx` | React 19 function components accept `ref` as a prop. Drop `forwardRef` once the MUI slot type accepts a function component with a `ref` prop. Keep the effect fix in the critical section either way. |
| `raaghu-components/rds-comp-grid/rds-comp-grid.tsx` line 519 | `forwardRef` + `useImperativeHandle` can take `ref` as a normal prop on React 19. |
| `rds-comp-datepicker/ExampleCustomInput.tsx`, `CustomInputWithClear.tsx`, `CustomButtons.tsx`, `RangeComponents.tsx` line 102, `rds-comp-date-and-time-picker.tsx` line 106 | `react-datepicker` still clones a custom input and passes `ref`. Confirm the installed `react-datepicker@8` uses a normal `ref` prop before removing `forwardRef`. Until then, leave these. |
| `RaaghuThemeProvider.tsx` lines 112–117 | `<RaaghuThemeContext.Provider value={contextValue}>` can be `<RaaghuThemeContext value={contextValue}>`. |
| Form hooks | `useActionState`, `useOptimistic`, and `useTransition` are unused. That is appropriate for leaf inputs: they should stay controlled. Do not rewrite `RdsInput` onto `useActionState`. Use those hooks in an application form that submits, if one is added under `raaghu-pages`. |
| Suspense | `rds-comp-video-player.tsx` line 108 and `rds-comp-text-editor.tsx` line 142 already lazy-load behind `Suspense`. Chart components mount Chart.js in `useEffect`, which matches a canvas library. A manual `isLoading` prop on `RdsButton` is the right API for a button. |
| `package.json` lines 118–120 and 189–192 | `draft-js`, `html-to-draftjs`, and `react-draft-wysiwyg` are pre-19 libraries. The `overrides` block forces them onto this repo’s React, so npm will not install a second React 18. The text editor is still the compatibility risk; `rds-comp-text-editor.tsx` is the place to watch, not a reason to change peer ranges. |
| Removed APIs | No `propTypes` on function components, no string refs, no `ReactDOM.render`, no `react-test-renderer` in dependencies. Peer range `^19.0.0` is correct on the library. `raaghu-pages/package.json` lines 13–14 depend on `19.2.5` directly, which is correct for an application. |

---

## 7. Recommended next steps

1. Repair `colorTokens` so each step is one role, give light and dark distinct `main` colors, and re-check contrast of `primary.main` against its contrast text and against the focus ring in `index.scss`.
2. Make `createTheme` a function of the resolved tokens, and apply `brandOverrides` to that theme and to the CSS variables in one place. Delete the comment at `light.theme.ts` line 8.
3. In `rds-comp-date-and-time-picker.scss` lines 632–656, delete the raw `#2196F3` / `#fff` / `4px` block that overrides the token rules. Do the same for the `#ffffff` rules in `rds-comp-datepicker.scss` around lines 1224–1262.
4. Remove hex fallbacks that are not generated from `design-tokens.ts`, starting with `rds-file-uploader.scss`. A missing variable should fail visibly, not paint `#3390e6`.
5. Stop spreading `sx` onto the DOM `style` prop in `rds-button.tsx` line 214, and move `RdsCompSpinner` down into elements (or inject it) so elements do not import components.
6. Add a cleanup path to the motion `useEffect`s so Strict Mode does not double-fire `onEnter` / `onEntered`.
7. Burn down `!important` from the top of the count list: app bar, app shell, adaptive cards, comments box, datepicker. Prefer `@layer` or MUI `styleOverrides`.
8. Replace raw `font-size` and spacing with the variables in section 3 where a token exists. Leave `10px`, `0.8rem`, `0.8125rem`, `0.9rem`, `0.95rem`, and `1.3rem` as an explicit design decision before adding tokens.
9. Export component prop types from `raaghu-components/index.ts`, and close `componentTokens` so it is not `Record<string, any>`.
10. Add tests for `raaghu-layouts/rds-comp-app-shell` and `rds-comp-layout`. Both have stories and zero tests. Existing tests do not use `toMatchSnapshot` (no matches in the repo); keep it that way and assert behavior.

Storybook coverage for public `rds-*` folders is complete. Do not spend the next cycle adding stories. Spend it on the token scale, the MUI/CSS split, and the `!important` cascade.
