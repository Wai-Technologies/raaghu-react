# MUI v7 Baseline

Recorded after the MUI v7 stabilization pass (July 2026).

## Resolved versions

| Package | Version |
|---------|---------|
| `@mui/material` | 7.3.11 |
| `@mui/icons-material` | 7.3.11 |
| `@mui/system` | 7.3.11 |
| `@mui/lab` | 7.0.0 |
| `@mui/x-date-pickers` | 8.28.7 |

`@mui/x-data-grid` was removed — no imports in the codebase; `rds-comp-grid` is a custom table.

## Dependency layout

- `@mui/material` — `devDependencies` + `peerDependencies` (`>=7.0.0`)
- `@mui/icons-material`, `@mui/system`, `@mui/lab` — `dependencies` (aligned to v7.3.x / lab 7.0.0)
- MUI X v8 remains compatible with Material UI v7 per package peer deps

## Completed in this pass

- Core `@mui/*` version pins aligned to `^7.3.11` (lab `^7.0.0`)
- Removed unused `@mui/x-data-grid`
- Removed `postinstall` / `scripts/ensure-package-manifests.js` (no longer needed at icons-material 7.3.11)
- Replaced `@mui/x-date-pickers/internals/demo` in `DatePickerDemo` with `Box` / `Stack` / `Typography`
- Migrated element wrappers to `slotProps`:
  - `rds-text-field` — `slotProps.formHelperText` (legacy `FormHelperTextProps` still accepted)
  - `rds-input` — `slotProps.input` + `slotProps.htmlInput` (legacy `InputProps` still accepted)
  - `rds-search` — `slotProps.input` (legacy `InputProps` still accepted)
- Migrated components layer to `slotProps.input` / `slotProps.htmlInput`:
  - `rds-comp-grid`
  - `rds-comp-date-and-time-picker`
  - `rds-comp-emoji-generator`
  - `rds-comp-comments-logic-combined`

## Remaining deprecated API references (non-blocking)

- Storybook argTypes in `rds-text-field.stories.tsx` and `rds-search.stories.tsx` still list legacy prop names as disabled controls (cosmetic only)
- Element wrappers still accept legacy `InputProps` / `FormHelperTextProps` for backward compatibility

## Next major upgrade

Material UI has no v8 — next core major is **v9**. Plan a coordinated upgrade of `@mui/material` and MUI X when ready.
