# Changelog

All notable changes to `@waiin/raaghu-react` are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — versions follow [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Storybook a11y addon (`@storybook/addon-a11y`) enabled globally across all stories
- `@storybook/addon-interactions` and `@storybook/test` for interaction testing
- `parameters.status.type` stable badge on all 116 story files
- `.raaghu/rules.json` AI rules engine (no-hardcoded-hex, no-hardcoded-spacing, story-must-have-status)
- `scripts/check-spacing-in-scss.sh` spacing governance gate wired into CI
- `metadata.json` for 10 elements: accordion, badge, button, card, checkbox, input, list, menu, modal, pagination
- 11 spacing sub-tokens (`micro`, `tight`, `compact`, `cozy`, and exact px aliases for 7–52px)
- `sideEffects: false` in package.json for full tree-shaking support
- Health dashboard (`HealthDashboard.tsx`, `collect-health-data.ts`, `health-data.json`)

### Changed
- Storybook bumped to v10 with `storybookTest` Vitest plugin
- 134 missing CSS variables injected into `sharedCssVars()` in `build-rds-css-vars.ts`
- 0 hardcoded hex literals remain in `build-rds-css-vars.ts` (was 21)
- 0 hardcoded px spacing values remain in SCSS (was 106)
- Spacing baseline locked at 0; CI gate enforces no regressions

### Fixed
- App-bar responsive spacing and badge alignment
- App-shell layout spacing and topnav styles
- Chart accessibility labels added to all chart stories

---

## [1.3.1] — 2026-05-01

### Added
- AI components: `rds-comp-ai-chat-bot`, `rds-comp-ai-typing-section`, `rds-comp-ai-fab-menu`, `rds-comp-ai-gradient-text-with-icon`
- Axe accessibility tests added to `RdsGrid` and core component stories
- Motion tokens for animation timing and easing

### Changed
- CSS vars replace bare hex values across all SCSS files
- Typography tokens applied via `var(--rds-typography-*)` in component styles
- App-bar uses `var(--rds-spacing-*)` throughout

### Fixed
- `RdsButton` last bare `#ffffff` replaced with `var(--rds-neutral-0)`
- Branch-compare visual regression spec stabilized

---

## [1.3.0] — 2026-04-01

### Added
- Component generator scaffolding (`scripts/generate-component.mjs`)
- Bundle gate script for size enforcement
- Phase B health-check infrastructure
- `design-tokens.ts` → `build-rds-css-vars.ts` → `injectTokens()` pipeline
- `syntaxTokens` export for syntax-highlight color tokens

### Changed
- Raaghu Pages app integrated into monorepo
- Font standardization across all layouts
- Tab tokens added to design system

---

## [1.2.0] — 2025-12-01

### Added
- Initial Storybook 8 setup with autodocs
- `spacingTokens`, `spacingExact`, `colorTokens`, `elevationTokens` in `design-tokens.ts`
- Light and dark theme CSS variable injection

### Changed
- MUI and Griffel peer dependency versions pinned
- Bootstrap removed from element-level SCSS

---
