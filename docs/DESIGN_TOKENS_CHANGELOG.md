# Design Tokens Changelog

This file tracks meaningful changes to design tokens in `raaghu-react-themes/tokens/design-tokens.ts`.

Token changes can affect every component that uses `var(--rds-*)` CSS variables. Record all additions, renames, removals, and value changes here so consuming teams can plan upgrades.

---

## Format

Each entry follows this structure:

```
## [version] — YYYY-MM-DD
### Added / Changed / Removed / Deprecated
- token name: description of change
```

---

## [1.3.x] — 2025–2026

### Changed
- `--rds-primary-*`: Updated primary color palette shades (50–900) to align with updated brand guidelines
- `--rds-secondary-*`: Adjusted secondary color contrast ratios to meet WCAG 2.1 AA at all shade levels
- `--rds-neutral-*`: Expanded neutral scale; added `neutral-25` and `neutral-975` for edge case backgrounds

### Added
- `--rds-info-*`: New info color scale (50–900) added alongside existing success/warning/error
- `--rds-success-*`, `--rds-warning-*`, `--rds-error-*`: Now include semantic `light` / `dark` mode variants at `200–250` and `700–750` shade bands

### Internal
- MUI palette (`raaghu-react-themes/src/mui/palette.ts`) now imports resolved token values directly from `colorTokens` rather than duplicating hex strings

---

## [1.2.x] — 2025

### Added
- Initial breakpoint tokens extracted to `raaghu-react-themes/tokens/_breakpoints.scss`
- CSS variable injection via `build-rds-css-vars.ts` — all components migrated from hardcoded hex to `var(--rds-*)`

### Changed
- Token pipeline formalized: `design-tokens.ts` → `build-rds-css-vars.ts` → `injectTokens()` → CSS custom properties

---

## Guidelines for Token Authors

### Adding a Token

1. Add the value to `design-tokens.ts` under the appropriate category
2. Re-run `build-rds-css-vars.ts` (or it runs automatically on build)
3. Reference it in SCSS with `var(--rds-{category}-{shade})`
4. Add an entry to this changelog under the current version

### Renaming a Token

Token renames are breaking changes. Before renaming:

1. Add the new token name
2. Keep the old name as a CSS alias: `--rds-old-name: var(--rds-new-name);`
3. Mark the old name as `@deprecated` in a comment in `design-tokens.ts`
4. Remove the alias in the next major version
5. Document both the deprecation and removal in this changelog

### Removing a Token

1. Grep for all usages: `grep -r "rds-{token-name}" --include="*.scss" --include="*.tsx"`
2. Migrate all usages to the replacement token
3. Remove from `design-tokens.ts` and `build-rds-css-vars.ts`
4. Add a `### Removed` entry to this changelog

### Value-only Changes

Changes to token values (not names) are not breaking at the API level, but they are visual breaking changes. Always:
- Check contrast ratios with `utils/accessibility/index.ts → ColorContrastUtils`
- Note the change here so UI reviewers know what to look for in Storybook
