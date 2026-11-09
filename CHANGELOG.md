# Changelog

All notable changes to `@waiin/raaghu-react` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking

- The npm package now ships only the build output: `dist/`, `raaghu-react-themes/src/styles/index.scss`, the AI docs (`AGENTS.md`, `llms.txt`, `docs/ai/`, `docs/TOKENS.md`), `README.md`, `CHANGELOG.md` and `LICENSE`. The source folders (`raaghu-elements/`, `raaghu-components/`, `raaghu-layouts/`, `raaghu-react-themes/`, `utils/`, `index.ts`) are no longer published. **Migration:** replace deep imports such as `@waiin/raaghu-react/raaghu-elements/...` or `raaghu-react-themes/...` with imports from the package root (`@waiin/raaghu-react`), and load styles with `import '@waiin/raaghu-react/styles.css'`. The optional global resets stay available at `@waiin/raaghu-react/raaghu-react-themes/src/styles/index.scss`.

### Added

- `localeText` prop on exported components to override built-in English text (`aria-label`s, placeholders, button labels). Types and `DEFAULT_*_LOCALE_TEXT` constants live in `*-locale.ts` files and are exported from the package root.
- `prefers-reduced-motion` support: `RaaghuThemeProvider` sets the duration and transition tokens to `0.01ms` (and follows changes of the OS setting), loaders and spinners keep moving, `RdsSkeleton` stops pulsing and `RdsCarousel` autoplay does not start.
- `:focus-visible` rings (`--rds-focus-ring-width`, `--rds-focus-ring-offset`) on 20 focusable elements that had no keyboard focus indicator; see `docs/ACCESSIBILITY_FOCUS_AUDIT.md`.
- Lint ratchets `lint:media-queries`, `lint:hardcoded-text` and `lint:data-theme`, wired into `npm run lint` and the style-governance workflow.
- `docs/DARK_MODE_SELECTOR_AUDIT.md`: which `[data-theme]` overrides moved to mode tokens and why the rest stay.

### Changed

- SCSS media queries use the `bp` helpers from `_breakpoints.scss` instead of literal px; the compiled CSS is identical.
- `react-player` is no longer bundled into `dist`; it is a runtime dependency. Packed size 6.4 MB to 2.1 MB, unpacked 26.6 MB to 9.5 MB.
- 5 dark-mode overrides (`RdsMenu` header, divider and shortcut, the datepicker header select and the e-signature file text) moved from `[data-theme='dark']` rules to mode tokens with identical values.
- **Color tokens (visible change).** Light mode: the `dark` (hover/pressed) shade of `primary`, `secondary`, `error`, `warning` and `success` moves from step 600 to 750, and `info.dark` from 600 to 800. The secondary scale mixes pink and blue steps, so the old `secondary.dark` (600, pink) turned blue buttons red on hover. `text.secondary` (`--rds-text-secondary`) moves from neutral 600 to 700 for better contrast. Dark mode: `secondary.dark` moves from step 400 (pink) to 750 (blue). Card hover/selected/filled surfaces and the alert/status colors were also retuned (see `docs/TOKENS.md`).
- **Dark styles follow the app theme, not the OS.** `RdsToggleButton` group borders used `@media (prefers-color-scheme: dark)`, so a light-mode app showed dark-mode borders to users whose OS was in dark mode. They now follow `data-theme`, which `RaaghuThemeProvider` sets.
- `RdsCarousel`: `onActiveIndexChange` now fires on every slide change (arrows, dots, keyboard and autoplay), in both controlled and uncontrolled mode. It used to fire only when `activeIndex` was controlled. Autoplay now pauses while the carousel is hovered or has focus.
- `RdsCounter`: `onChange` now fires in uncontrolled mode as well (it used to fire only when `value` was controlled).
- `RdsInput` with `layout="phone number"`: the digit-only sanitising now runs in `onChange` instead of `onInput`, so the value passed to `onChange` is already sanitised.

### Deprecated

- `RdsRating` `color="info"`: use `color="primary"`. It still renders as primary and warns in development.
- `RdsDialog` `showDissmiss`: use `showCloseButton`.
- `RdsAvatar` `activeDotBottom`: use `status="online"` with `statusPosition="bottom"`.
- `RdsAppBar` `actions`: use `endSlot`.

### Removed

- 9 `:global(...)` rules in `rds-banner.scss` that browsers never applied (plain SCSS, not CSS Modules).
- A never-matching `max-width: 0px` media block in `rds-comp-ai-message-box.scss`.

### Changed (packaging)

- Moved `@mui/material`, `@mui/system`, `@mui/icons-material`, `@mui/lab`, `@mui/x-date-pickers`, `@emotion/react`, and `@emotion/styled` from runtime `dependencies` to `peerDependencies` (kept in `devDependencies` for this repo) so consuming apps install one MUI/Emotion copy.
- `npm run type-check` now runs against `tsconfig.library.json` (same as `type-check:all`).

### Fixed

- Excluded `*.figma.*`, `rds-carousel-figma-slide.tsx`, and `rds-file-uploader-render.tsx` from the published npm tarball; declaration emit also skips the two helpers.
- Removed obsolete `@types/react-datepicker` (react-datepicker 8 ships its own types).
- Standard MUI Alert text uses palette `.dark` on light backgrounds for readable contrast.
- Single MUI `raaghuTheme` with light/dark `colorSchemes` + CSS variables (`data-theme`); `brandOverrides` now update MUI palette channels as well as `--rds-*`.

## [2.0.0] - 2026-09-04

### Changed

- Dropped React 18 support on this branch: `peerDependencies` now require `react` / `react-dom` `^19.0.0` only (previously `>=18.0.0 || ^19.0.0`). React 18 consumers should use the dedicated React 18 branch/release line.
- Bumped dev/build environment to React `19.2.5` (`react`, `react-dom`, `@types/react`, `@types/react-dom`).
- Fixed two React 19 type-definition regressions surfaced by the `@types/react` 19 upgrade: `RdsIconButton`'s `cloneElement` call now types its cloned icon element explicitly, and `color-picker-components.tsx` updated its `colorModeDropdownRef` prop types from `RefObject<HTMLDivElement>` to `RefObject<HTMLDivElement | null>` to match `useRef`'s React 19 return type.

### Fixed

- Exported bundled CSS for consumers: `style` field plus `@waiin/raaghu-react/styles.css` / `./raaghu-react.css` package exports (maps to `dist/raaghu-react.css`).
- Set `sideEffects` for `*.css` / `*.scss` so bundlers do not tree-shake library styles away.
- Kept `react` / `react-dom` as peers only (host app must provide React).
- Bundled `@mui/material`, `@emotion/react`, and `@emotion/styled` as runtime `dependencies` so `npm install @waiin/raaghu-react` installs them automatically.
- Moved `rimraf` and `@types/react-datepicker` / `@types/react-measure` out of runtime `dependencies`.
- SPDX license field set to `Apache-2.0`.
- Declaration emit script supports `--strict` (fails on TypeScript errors). Soft emit remains default for `npm run build`; `type-check:declarations` and publish use strict mode.
- Cleared remaining public-path TypeScript declaration errors (charts helpers, icons, props/imports) so strict type-check exits 0.
- Excluded INTERNAL (non-public) component folders from declaration emit.
- npm publish workflow now runs unit tests, library build, and strict type-check before publish.
- Wired TypeScript declaration emit into `build` / `build:lib` via `npm run build:types` (`scripts/emit-declarations.js`) so `dist/index.d.ts` is generated for npm consumers.
- Root package entry `index.ts` re-exports without `.ts` extensions so published declaration files resolve cleanly.
- Stopped ignoring `dist/` in `.npmignore` so the built package entry and types can publish with `package.json` `files`.
- Excluded contributor tooling and non-library folders from the npm package (`.github/`, `.specify/`, `.raaghu/`, `.vscode/`, `scripts/`, `stories/`, `tests/`, `assets/`).
- Aligned README license badge and license section with the Apache License 2.0 `LICENSE` file.
- Renamed mistyped Figma Code Connect filenames (`emty` → `empty`, `genrator` → `generator`, `rda-` → `rds-`, `proudct` → `product`). No runtime component changes.

### Added

- `CHANGELOG.md` and install/CSS usage notes in README + theme integration guide.
- GitHub Actions: Jest unit tests, strict declaration type-check (advisory `continue-on-error` until type debt is cleared).

### Removed

- Empty unused root `assets/` placeholder directory.

## [1.3.2] - 2026-07-13

### Notes

- Baseline release prior to the packaging and documentation hygiene fixes listed under Unreleased.
