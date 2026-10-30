# AGENTS.md — Raaghu Design System (`@waiin/raaghu-react`)

Guidance for AI coding assistants (Claude, Copilot, Cursor, v0…) that use or change this library.

## Machine-readable references

| File | What it holds |
|---|---|
| `docs/ai/components.json` | Every exported component: import line, source file, props (type, default, description), the MUI props it inherits, deprecated props and their replacements |
| `docs/ai/tokens.json` | Every `--rds-*` CSS variable with its light and dark value |
| `docs/TOKENS.md` | The same tokens as a readable table |
| `llms.txt` | Short index of this repository for LLMs |

Regenerate all three after changing props or tokens: `npm run docs:ai`.

## Using the library

```tsx
import { RaaghuThemeProvider, RdsButton } from '@waiin/raaghu-react';
import '@waiin/raaghu-react/styles.css';

export function App() {
  return (
    <RaaghuThemeProvider defaultMode="light">
      <RdsButton variant="filled">Save</RdsButton>
    </RaaghuThemeProvider>
  );
}
```

- Import everything from the package root. Wrap the app once in `RaaghuThemeProvider`; it injects the `--rds-*` variables and switches light/dark.
- React 19 only: pass `ref` as a normal prop (no `forwardRef`).
- Components forward `className`, `sx`, `ref` and other DOM props to their root.
- Never use a prop listed under `deprecatedProps` in `components.json`; use the replacement it names.

## Which component to use

| Need | Use | Not |
|---|---|---|
| Dialog with icon/image header and actions | `RdsModal` | |
| Confirm dialog with primary/secondary buttons | `RdsDialog` | |
| Side panel with built-in trigger, or embedded panel | `RdsDrawer` | |
| Side panel with title, Save/Restore footer | `RdsCompOffcanvas` | |
| Short transient message | `RdsSnackbar` | |
| Rich toast (download progress, chat reply, request) | `RdsCompToast` | |
| List of notifications with accept/dismiss | `RdsCompNotification` | |
| MUI-style chip (input, filter, action) | `RdsChip` | |
| Simple label, optionally removable | `RdsTag` | |
| Section or page loading indicator | `RdsLoader` | |
| Inline spinner with label | `RdsCompSpinner` | |
| Plain MUI text field | `RdsTextField` | |
| Labelled input with icons, shapes and layouts | `RdsInput` | |
| Multi-line text | `RdsTextArea` | |
| Pick one option from a short list | `RdsSelect` | |
| Searchable or multi-select list | `RdsAutocomplete` | |
| Button that opens a list of options | `RdsButtonDropdown` | `RdsMenu` for context menus |
| Date / time | `RdsCompDatepicker`, `RdsCompTimePicker` | |
| App frame (top bar + side nav) | `RdsCompAppShell` | `RdsLayout` is a simple header + content page |

Internal (not exported, do not import): `rds-comp-grid` (paid enterprise), `rds-comp-adaptive-cards`, `rds-comp-chat`, `rds-comp-code-snippet`, `rds-comp-comments-box`, `rds-comp-date-and-time-picker`, `rds-comp-details-pane`, `rds-comp-navtabs`, `rds-comp-tree-structure`.

## Changing the library

### Repository layout

```
raaghu-elements/rds-{name}/          basic elements (MUI wrappers)
raaghu-components/rds-comp-{name}/   composite components
raaghu-layouts/                      app shell and layout
raaghu-react-themes/tokens/          design-tokens.ts (raw values) → build-rds-css-vars.ts (--rds-* vars)
```

Each folder holds `rds-x.tsx`, `rds-x.scss`, `rds-x.stories.tsx`, `rds-x.test.tsx` and optionally `rds-x.figma.tsx`.

### Token rules (enforced by `npm run lint`)

- Raw values live only in `raaghu-react-themes/tokens/design-tokens.ts`. Map them to CSS variables in `build-rds-css-vars.ts`.
- In SCSS and `sx`, use `var(--rds-*)`: no hex, `rgb()`/`rgba()`, named colors, `!important` or bare px spacing.
- Font size, weight, line height, letter spacing and durations have scale tokens. Look them up in `docs/TOKENS.md`. If no token matches exactly, add one centrally; don't hardcode the value.
- Translucent colors: `color-mix(in srgb, var(--rds-color-black) 12%, transparent)`.
- Dark mode comes from tokens with different light and dark values. Don't add `[data-theme='dark']` selectors.
- Scope every selector under the component's BEM block (`.rds-x`, `.rds-x__el`, `.rds-x--mod`). Portalled MUI parts (poppers, menus) get a class through `slotProps`; never style a bare `.Mui*` class globally.
- Media queries in TS use `extendedBreakpointTokens` from `design-tokens.ts`.

### Props conventions

- Interface name: `Rds{Name}Props` (elements) / `RdsComp{Name}Props` (components), exported from the barrel with `export type`.
- Names: `disabled`, `required`, `open`/`defaultOpen`, `value`/`defaultValue`, `variant`, `size: 'small' | 'medium' | 'large'`, `color` from the MUI palette, `orientation`, `placement`, `severity`, `children` for content.
- Renames are additive: keep the old prop, mark it `/** @deprecated Use \`x\`. */` and call `warnDeprecatedProp` from `raaghu-elements/shared/utils/deprecation.ts`.
- Document every public prop with a `/** */` comment, including `@default` when it has one.

### Checks

```bash
npm run lint
npx tsc -p tsconfig.app.json --noEmit
npx jest raaghu-elements/rds-x
npm run docs:ai
```
