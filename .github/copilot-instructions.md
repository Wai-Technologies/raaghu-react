## Raaghu Design System — Copilot Instructions

### Adding New Components/Elements

Use the VS Code Copilot slash commands:
- `/create-element <MUI Component>` — create a primitive element (e.g., `/create-element Slider`)
- `/create-component <Name>` — create a composite component (e.g., `/create-component Menubar`)

These commands will generate all required files, validate against MUI API docs, run tests, and iterate until everything passes.

### Key Conventions
- **Elements**: `raaghu-elements/rds-<name>/` — 6 files: `.tsx`, `.scss`, `.stories.tsx`, `.test.tsx`, `.figma.tsx`, `.spec.ts`
- **Components**: `raaghu-components/rds-comp-<name>/` — same 6 files
- **MUI wrapping**: All elements extend MUI props via `extends Omit<{MuiName}Props, ...>`, import MUI with alias (`Button as MuiButton`), and pass remaining props through with `{...props}` spread
- **MUI variant mapping**: Raaghu `style` prop maps back to MUI `variant` (e.g., `'filled'` → `'contained'` for Button). Always verify exact MUI variant values from the API page
- **MUI styling**: Use MUI's `sx` prop for theme-aware styling. Use SCSS + BEM (`.rds-<name>__element--modifier`) for design token overrides
- **MUI API verification**: Always fetch and check `https://mui.com/material-ui/api/<ComponentName>/` for correct prop types, variant values, and controlled patterns
- **Enums**: Components use TypeScript `enum` (not union types) for Layout, Style, State
- **displayName**: Always set `Component.displayName = 'ComponentName'`
- **Barrel exports**: Update `index.ts` with both `export { default as ... }` and `export type { ... }`
- **Testing (unit)**: `bun run jest` with SCSS mocked via `jest.mock('./<name>.scss', () => ({}))`
- **Testing (QA/E2E)**: `npx playwright test` — `.spec.ts` files test against Storybook stories for responsiveness (3 viewports), accessibility (axe WCAG 2.1 AA), keyboard navigation, hover/focus states, disabled behaviour, light/dark themes, visual regression snapshots, and console error detection
- **Storybook**: `@storybook/react-vite`, `Meta` + `StoryObj` pattern, `tags: ['autodocs']`
- **Package manager**: Bun (NOT npm) — use `bun run`, `bun add`, `bunx`
