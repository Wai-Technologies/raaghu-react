# Changelog

All notable changes to `@waiin/raaghu-react` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
