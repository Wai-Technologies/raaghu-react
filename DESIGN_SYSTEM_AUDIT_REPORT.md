# Raaghu Design System — Audit Report

**Branch:** `user/sagar/task-design-system-audit-fixes-phase-2` @ `e2a140a3f` · **Date:** 2026-10-29
**Scope:** every file in `raaghu-elements`, `raaghu-components`, `raaghu-layouts`, `raaghu-react-themes`, `raaghu-pages` (123 SCSS files, 208 TS/TSX source files, 113 exported `Rds*` components, 1,239 tokens).
**Method:** repo lint ratchets, independent grep scans (SCSS **and** TS/TSX), the TypeScript compiler API on the real exported prop types, `tsc -p tsconfig.library.json`, full Jest run, ESLint.

---

## 1. Summary

| Area | Status | Headline |
|---|---|---|
| Hex colours | ✅ Clean | 0 unauthorized hex in source; only allowlisted exceptions remain |
| rgb/rgba | 🟡 Minor | 2 raw `rgba()` in `rds-switch.scss` |
| SCSS spacing / raw px / box-shadow / named colours | ✅ Clean | 0 |
| SCSS typography & motion literals | 🔴 | 95 literals; ratchet **fails** (baseline file never committed) |
| SCSS local custom-prop lengths | 🟡 | 564 bare px/rem in local `--x:` vars (within baseline) |
| `!important` | 🔴 **CI will fail** | 5 new in `rds-comp-layout.scss` (baseline 0) |
| TS/TSX hardcoded style values | 🔴 Not linted at all | 227 numeric + 53 px/rem string literals |
| Colour token ramps | 🔴 | Palette scales are non-monotonic (`primary.200 === primary.700`) |
| Prop API consistency | 🟠 | 7 `size` types, 32 `variant` types, 13 `onChange` signatures, show/hide polarity split |
| TypeScript | 🔴 | 360 errors with the library config (130 in shipped source) |
| Tests | 🟡 | 7,838 pass / **2 fail** / 1 skipped (123 suites) |
| ESLint | 🟡 | 0 errors, 339 warnings (45 unused vars in source, 12 hook-deps) |

---

## 2. Hex codes & hardcoded colours

**Hex — clean.** `lint:hex` and `check-hex-in-scss.sh` both pass, and an independent scan agrees. Remaining hex is intentional:

| File | Why it's OK |
|---|---|
| `rds-comp-color-picker/color-picker-components.tsx:11` | Hue-spectrum gradient (physical constant) |
| `rds-comp-color-picker/rds-comp-color-picker.tsx:166` | `#000000` sentinel comparison |
| `rds-comp-map/rds-comp-map.scss:262-263` | Attribute selectors `rect[fill="#fff"]` matching third-party SVG |
| `RaaghuThemeProvider.tsx:29`, `color-picker.types.ts:50` | JSDoc examples |

**Still to fix**
- `raaghu-elements/rds-switch/rds-switch.scss:18-19` — `rgba(255,152,0,0.24)` / `rgba(158,158,158,0.24)` → use `color-mix(in srgb, var(--rds-warning-main) 24%, transparent)` or an alpha token.
- **Stories / Figma Code Connect** (allowlisted, but they are what consumers copy): 20 `*.stories.tsx` files use raw hex; chart `*.figma.tsx` files use `rgba(0,0,0,0.1)`, `'red'`, `'blue'`, `rgb(75,192,192)`. Recommend switching demos to `chartPaletteTokens`.

---

## 3. Hardcoded (non-token) values

### 3.1 SCSS — typography & motion (95 literals) 🔴
`npm run lint:typography-motion` **fails**: `scripts/typography-motion-baseline.txt` was never committed, so baseline = 0. It is also **not wired into** `.github/workflows/style-governance.yml`.

| File | Literals | Examples |
|---|---|---|
| `rds-loader.scss` | 16 | `animation: … 1.4s ease-in-out`, `2s`, `cubic-bezier(.79,0,.47,.97)` |
| `rds-menu.scss` | 3+ | `font-size: 0.80rem`, `0.5rem`, `1.0625rem` |
| `rds-badge.scss` | 3 | `line-height: 20px`, `font-size: 0.625rem` |
| `rds-dialog.scss` | 3 | `line-height: 20px / 1.45 / 16px` |
| `rds-avatar`, `rds-bottom-navigation`, `rds-button-dropdown`, `rds-carousel`, `rds-counter`, `rds-list`, `rds-banner` … | 1–2 each | `font-size: 1.3125rem`, `0.7rem`, `1.4rem`, `line-height: 1.35`, `48px` |

Full list: `node scripts/check-typography-motion-in-scss.mjs --inventory`.

### 3.2 SCSS — local custom-property lengths (564, within baseline) 🟡
Component-local `--x: 20px` declarations bypass the spacing/size scale. Top files: `rds-loader` 28, `rds-comp-adaptive-cards` 28, `rds-comp-e-signature` 26, `rds-comp-details-pane` 26, `rds-app-bar` 25, `rds-popover` 22, `rds-accordion` 20, `rds-switch` 19.
Related: **202 of 444 component tokens hold raw literals** instead of aliasing a scale token (e.g. `--rds-accordion-details-margin-bottom: 20px`, `--rds-accordion-size-lg: 28px`). 20px isn't on the spacing scale — decide whether it should snap to `--rds-spacing-*`.

### 3.3 `!important` — CI blocker 🔴
`raaghu-layouts/rds-comp-layout/rds-comp-layout.scss` lines **53, 78, 80, 262, 263** (added in `2f710e69b`). Baseline is 0, so the **Style governance** workflow will fail on the next PR touching SCSS. Use scoped BEM specificity or MUI `styleOverrides`.

### 3.4 TS/TSX inline styles — not covered by any lint 🔴
All repo ratchets scan SCSS only. TS/TSX `sx`/`style`/`*.styles.ts` contain:

| File | Numeric literals | px/rem strings | Examples |
|---|---|---|---|
| `raaghu-pages/src/pages/DashboardPage.tsx` | 87 | 3 | `height: 28`, `transition: 'transform 0.15s ease'` |
| `rds-app-bar/rds-app-bar.styles.ts` | 36 | 5 | `width: 220`, `maxHeight: 360`, `padding: '4px 6px'`, `breakpoints.down(420)` |
| `rds-comp-reviews/rds-comp-review-styles.tsx` | 36 | – | |
| `rds-comp-grid/rds-comp-grid.tsx` | 21 | 25 | |
| `rds-comp-notification.tsx` / `rds-comp-filter-button.tsx` | 8 / 7 | – | |
| `rds-comp-spinner.tsx:11-14` | – | 4 | size map `30px / 15px / 35px / 45px` |
| `rds-toggle-button.tsx:148-160` | – | 5 | `border: '1px solid'` → `var(--rds-border-width-thin)` |
| `rds-autocomplete.tsx:408,413` | – | 2 | `p: '2px'` |
| `rds-carousel.tsx:71` | – | 1 | default `height = '400px'` |
| `rds-comp-ai-icon.tsx:279-280` | – | 2 | `"22px"` |
| `rds-avatar`, `rds-divider`, `rds-loader`, `rds-collapse`, `rds-backdrop` … | 1–5 each | | |

Also: hardcoded breakpoints (`theme.breakpoints.down(420)`, `down(320)`) bypass `breakpointTokens`; 55 inline `style={{…}}` usages.
**Recommendation:** add a TS/TSX ratchet (same shape as `check-raw-px-in-scss.mjs`) and move one-offs into `componentStyleTokens`.

### 3.5 Colour token ramps are broken 🔴
`raaghu-react-themes/tokens/design-tokens.ts:6-40`:

```
primary:   200 '#3C98FF' · 300 '#64b5f6' · … · 700 '#3C98FF'   ← 200 === 700, 200 darker than 300
secondary: 200 '#2534E9' (blue) inside a pink ramp; 700 === 200
success:   200 '#1F7630' (dark green at the 200 step)
```
Brand/Figma colours were inserted at the 200/250/700/750 steps of the MUI ramps, so a step number no longer implies lightness. Any consumer using `primary.200` for a light tint gets the brand blue. Recommend moving brand colours to named semantic tokens (`brand`, `brandHover`) and restoring monotonic ramps.

### 3.6 Token hygiene 🟡
- **206 tokens are never referenced** by any component (47 breakpoint, 25 colour, 16 `--rds-comp-*`, 8 motion …) — prune or document as public API.
- **Scale naming is mixed:** `sm/md/lg`, `small/medium/large`, `xxl` **and** `2xl`, `xxxl` **and** `3xl` all exist. Pick one (`xs…3xl`).
- **Dark mode:** 83 `[data-theme=dark]` selectors in 32 SCSS files still bypass mode-aware tokens (`componentModeTokens`).

### 3.7 Global class names break the BEM/`rds-` rule 🟠
`docs/CSS_ARCHITECTURE.md` requires `.rds-{block}__{element}--{modifier}`. **270 unique unprefixed classes** ship in the CSS bundle and can collide with consumer CSS: `.nav-link`, `.side-nav`, `.sidebar-layout`, `.double-nav`, `.triPane` (camelCase), `.Default`, `.relaxing`, `.theme-dark`, `.spinner-border`, `.spinner-grow`, `.offcanvas-margin`, `.kanban-board` … (third-party `.react-datepicker*` / `.rdw-*` overrides are fine).

---

## 4. Prop consistency (113 exported components, resolved with the TS compiler)

### 4.1 Same prop name, different value sets 🟠

| Prop | # distinct types | Detail |
|---|---|---|
| `size` | 7 | 13 use `'small'\|'medium'\|'large'`; **RdsSelect** only `'small'\|'medium'`; **RdsProgress** `number`; **RdsCompSpinner** `number \| SpinnerSize \| SpinnerSizeLegacy`; Avatar / AppBar / ChatHeader own enums |
| `variant` | 32 | Overlapping vocab: **RdsButtonDropdown** accepts both `'outline'` **and** `'outlined'` plus `'primary'/'secondary'` (colours, not variants); Card `'default'\|'elevation'`; Dialog `'standard'\|'default'` |
| `color` | 13 | **RdsBadge** & **RdsCompAiFabMenu** use Bootstrap names `'danger'\|'light'\|'dark'\|'tertiary'` vs MUI `'error'` elsewhere; **RdsCompSpinner** `string` |
| `shape` | 3 | `'pill'\|'rectangle'` (4 comps) vs **RdsInput** `'pill'\|'default'\|'bottom outline'` (space in a union value) |
| `labelPlacement` | 4 | Switch `'top'\|'bottom'\|'start'\|'end'`, Input `'top'\|'inline'`, Select `'top'\|'floating'`, Radio `'bottom'\|'none'\|'end'` |
| `placement` | 5 | **RdsCompAiFabMenu** `'left'\|'right'` vs **RdsCompAiAttachment** `'start'\|'end'` (RTL-safe) |
| `orientation` | 2 | **RdsCompNotification** uses `NotificationLayout` instead of `'horizontal'\|'vertical'` |

### 4.2 Callback signatures 🟠
- **`onChange` — 13 signatures.** Value-first: Range, Search, Counter, TextArea, ColorPicker, TimePicker, Toolbar, Datepicker, ButtonDropdown. Event-first (MUI): FileUploader, EmojiGenerator/Picker, StandaloneToggleButton. *(Breaking — on the Phase 2 deferred list.)*
- **`onClose` — 6 signatures.** Sidebar, Snackbar, Banner, TimePicker, ProductTour are `() => void` and drop MUI's `(event, reason)`; Offcanvas `(event?, reason?)` all optional.
- **RdsCompOffcanvas `onClick: (data: boolean) => void`** — not a click handler; should be `onOpenChange` or similar.

### 4.3 Close-button polarity & aliases not marked deprecated 🟠
- `showCloseButton`: Dialog, Drawer, Popover · `hideCloseButton`: Modal, Snackbar — opposite polarity for the same feature on sibling components.
- **RdsModal** (`rds-modal.tsx:24-35`): `isOpen` ("Legacy open flag") and `showCloseButton` ("Legacy flag") are described as legacy but have **no `@deprecated` tag**, so IDEs don't strike them through and `docs/ai` lists them as live. Both `open`+`isOpen` and `show…`+`hide…` are live today.
- **RdsDialog `showDissmiss`** (typo; `rds-dialog.tsx:26`) — "superseded by `showCloseButton`" but not `@deprecated`; still used in the story and Figma file.
- **`RdsCompAiAttachement`** typo export is correctly `@deprecated` — schedule removal.

### 4.4 Missing standard props
| Prop | Missing on |
|---|---|
| `sx` | RdsCompAreaChart, RdsCompAudioPlayer |
| `ref` | RdsChip, RdsCompFilterButton |
| `id` | RdsChip, RdsCompSpinner, RdsCompColorPicker, RdsCompToast, RdsCompAiChatBot, RdsCompAudioPlayer, RdsCompTimePicker, RdsCompEmojiGenerator, RdsCompEmojiPicker, RdsCompAiAttachment |
| `style` | RdsButtonDropdown, RdsCompSpinner, RdsCompToast, RdsCompScrollbar, RdsCompTruncatedText, RdsCompTextEditor, RdsCompDatepicker, RdsCompEmojiGenerator/Picker |
| `aria-label` | RdsChip, RdsCompSpinner, RdsCompToast, RdsCompTimePicker, RdsCompEmojiGenerator/Picker |

`className` is present on all 113. ✅

### 4.5 Other naming issues
- **RdsBanner `Icon`** — PascalCase prop name; should be `icon`.
- **RdsCompAiIcon** exposes Bootstrap attributes as props (`data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`) — Bootstrap isn't a dependency.
- 115 `show*`/`hide*` boolean flags (Figma-driven; kept by policy) — note only.
- **420 deprecated props** across ~100 components — needs a removal plan for the next major (see `COMPONENT_DEPRECATION_POLICY.md`).

---

## 5. Other issues

### 5.1 TypeScript 🔴
- **`tsconfig.app.json` includes only `utils`** (4 files) — anyone running it sees "0 errors".
- `npm run type-check` (`tsconfig.library.json`): **360 errors** — 130 in shipped source, 190 tests, 27 stories, 13 Figma. CI only runs `type-check:declarations`, so these never block.
- Worst source files: `rds-comp-chart-mixed` 77, `rds-comp-chart-boolean` 74, `rds-comp-grid` 38, `rds-comp-details-pane` 32 (implicit `any` props), `rds-table` 18, `rds-comp-date-and-time-picker` 17.
- **Real bug smell:** `rds-comp-date-and-time-picker.tsx:28-33` imports `DateRangePreset`, `formatRangeText`, `RangeCalendar`, `RangeTime`, `RangeDateTime`, `CustomDateRangeLayout` from `RangeComponents.tsx` **and** still declares them locally (TS2440); `RangeComponents.tsx:3,6` imports `PickersDayProps` twice. The extraction was left half-done — duplicated code.
- `RdsIconComponent` type rejects MUI icons (`OverridableComponent<SvgIconTypeMap>`) — 12 errors across ai-attachment, ai-fab-menu, ai-icon, ai-typing-section, audio-player.

### 5.2 Tests 🟡
123 suites — **7,838 passed, 2 failed, 1 skipped.**
- `rds-skeleton.test.tsx:236` expects `/12px/`, the component now emits `var(--rds-spacing-md)` → stale test after tokenization; update the assertion.
- `use-chart.test.tsx:40` (`#123456`) — known, also fails at earlier HEADs.
- `rds-comp-app-shell` and `rds-comp-layout` have **no unit tests**.

### 5.3 ESLint 🟡
0 errors, 339 warnings: 310 `no-unused-vars` (45 in shipped source), 12 `react-hooks/exhaustive-deps` (`rds-comp-e-signature.tsx:225-284` ×5, `rds-comp-grid.tsx:903,1779`, `RangeComponents.tsx:147`, `rds-carousel.tsx:125`), 2 `no-console` (`rds-comp-grid.tsx:1512`, `build-rds-css-vars.ts:1593`).

### 5.4 Accessibility & robustness
- 6 SCSS files animate without a `prefers-reduced-motion` guard: `rds-loader`, `rds-button`, `rds-modal`, `rds-comp-spinner`, `rds-comp-color-picker`, `rds-comp-date-and-time-picker`.
- `kanban-board-helpers.ts:160` generates ids with `Math.random()` → use `useId` / `crypto.randomUUID()` (SSR/hydration-safe).
- `rds-comp-adaptive-cards-helpers.tsx:20` `@ts-ignore` for a stylesheet import — add a `*.css` module declaration to `global.d.ts` instead.
- React 19 idioms ✅: no `forwardRef`, `defaultProps`, `propTypes`, `Context.Provider`, `console.log`, or `debugger` in source.

---

## 6. Recommended fix order

| # | Fix | Breaking? | Effort |
|---|---|---|---|
| 1 | Remove 5 `!important` in `rds-comp-layout.scss` (unblocks CI) | No | S |
| 2 | Commit `typography-motion-baseline.txt` (95) and add the step to `style-governance.yml` | No | S |
| 3 | Update stale `rds-skeleton` test; fix `use-chart` test | No | S |
| 4 | Finish the date-time-picker extraction (remove duplicated local declarations) | No | M |
| 5 | Add `@deprecated` to Modal `isOpen`/`showCloseButton`, Dialog `showDissmiss` | No | S |
| 6 | Add a TS/TSX hardcoded-value ratchet; tokenize app-bar, reviews, spinner, toggle-button, autocomplete | No (visual-zero) | M |
| 7 | Tokenize 95 typography/motion literals + 2 rgba; add `prefers-reduced-motion` to 6 files | No | M |
| 8 | Fix `RdsIconComponent` typing; clear the 130 source TS errors; point `tsconfig.app.json` at the library | No | M |
| 9 | Add missing `sx`/`ref`/`id`/`aria-label` (§4.4); alias `Banner.Icon` → `icon` | No (additive) | M |
| 10 | Normalize `size`/`color`/`labelPlacement`/`placement` unions via additive aliases | No (additive) | L |
| 11 | Rename/prefix 270 global classes to `rds-` BEM | Visual-risk | L |
| 12 | Repair colour ramps; separate brand semantic tokens | **Visual change** | M |
| 13 | Unify `onChange`/`onClose` signatures; remove 420 deprecated props | **Breaking (v3)** | L |

---

### How to reproduce
```
npm run lint:hex && npm run lint:rgba && npm run lint:important && npm run lint:typography-motion
npm run type-check
npx jest
npx eslint raaghu-elements raaghu-components raaghu-layouts raaghu-react-themes
```
