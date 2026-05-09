---
description: "Create a new Raaghu design system COMPONENT (composite UI) by wrapping MUI components. Example: /create-component Menubar"
mode: agent
---

# Create Raaghu Component

You are creating a new **component** (composite/feature-rich UI) for the Raaghu design system. Components live in `raaghu-components/` and compose multiple MUI components + existing raaghu-elements.

User input: $ARGUMENTS

If no input was provided, ask the user: "What component should I create? (e.g., Menubar, DataGrid, SearchBar, BreadcrumbNav)"

## Naming Rules

From the user's component name, derive ALL names before doing anything:

- **kebab**: `kanban-board` (lowercase, hyphenated)
- **rdsKebab** (folder + file prefix): `rds-comp-kanban-board`
- **rdsPascal** (component name): `RdsCompKanbanBoard`
- **propsName**: `RdsCompKanbanBoardProps`
- **storyTitle**: `Components/Kanban Board`

**Key difference from elements:** Components always use `rds-comp-` prefix.

## Execution Steps

### Step 1 — Verify it doesn't exist

Read `raaghu-components/index.ts` and search for the component name. If found, tell the user it already exists and stop.

### Step 2 — Research MUI components to compose

A component typically combines 2+ MUI components. Identify which ones to use.

**Fetch the relevant MUI documentation pages:**
- For each MUI component you plan to use, fetch BOTH:
  - Usage page: `https://mui.com/material-ui/react-{kebab}/`
  - API reference: `https://mui.com/material-ui/api/{pascal}/`

**For each MUI component, extract:**
1. **Exact import**: Confirm it exists in `@mui/material` (not `@mui/lab` or `@mui/x-*`)
2. **TypeScript props type name**: e.g., `MenuProps`, `MenuItemProps`, `AppBarProps`
3. **Key props and their exact types**: Especially `variant`, `color`, `size`, `open`, `onClose`, `anchorEl`
4. **Controlled patterns**: `open`/`onClose` for Menu, `value`/`onChange` for Tabs, etc.
5. **Composition patterns**: How MUI intends these components to work together (e.g., Menu+MenuItem, Tabs+Tab, AppBar+Toolbar)
6. **ARIA attributes**: What MUI auto-handles vs what you must add manually
7. **CSS class names**: From the API page (e.g., `.MuiMenu-root`, `.MuiMenuItem-root`)

**Also identify reusable raaghu-elements:**
- Check `raaghu-elements/index.ts` for elements that can be used instead of raw MUI components
- Import from `../../raaghu-elements` (e.g., `RdsButton`, `RdsInput`, `RdsIcon`)
- Prefer raaghu-elements over raw MUI when one exists for the same purpose

### Step 3 — Read existing components for code style reference

Read these files to match the EXACT code style, patterns, and conventions:
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.tsx` — complex component with multiple MUI components, enums, ARIA
- `raaghu-components/rds-comp-notification/rds-comp-notification.tsx` — another reference

Also read for reference:
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.stories.tsx` — story with enum argTypes
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.test.tsx` — test with defaultProps, event testing
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.figma.tsx` — figma connect

### Step 4 — Create folder with 5 files

Create `raaghu-components/{rdsKebab}/` containing exactly these 5 files:

#### 4a. `{rdsKebab}.tsx` — Main component

**MUI Integration Rules (CRITICAL — follow these exactly):**

1. **Import MUI components individually**: `import { AppBar, Toolbar, Menu, MenuItem, Button } from '@mui/material';`

2. **Import MUI icons when needed**: `import { ArrowDropDown, MoreVert } from '@mui/icons-material';`

3. **Import raaghu-elements**: `import { RdsButton, RdsInput } from '../../raaghu-elements';`

4. **Use MUI components correctly per their API docs**:
   - Use MUI's controlled patterns properly (e.g., `Menu` needs `anchorEl`, `open`, `onClose`)
   - Use MUI's composition patterns (e.g., `AppBar` > `Toolbar` > children, not `AppBar` > children)
   - Use MUI's `sx` prop for inline styling, NOT React `style` prop
   - Pass MUI's `variant`, `color`, `size` props with their EXACT valid values from the API page
   - Handle MUI event handlers with correct signatures (e.g., `onClick: (event: React.MouseEvent<HTMLElement>) => void`)

5. **MUI Styling via `sx` prop**:
   - Use MUI's `sx` prop for theme-aware styling: `sx={{ bgcolor: 'background.paper', p: 2 }}`
   - Use MUI's theme shorthand: `sx={{ color: 'primary.main', typography: 'body1' }}`
   - Use MUI's spacing system: `sx={{ m: 1, p: 2 }}` (1 unit = 8px)
   - Use MUI's responsive values: `sx={{ display: { xs: 'none', md: 'flex' } }}`
   - You may also apply design token overrides via SCSS; the `sx` prop is for MUI-native theming

6. **MUI Accessibility**: MUI components have built-in a11y, but you MUST still:
   - Add `role` attributes for custom containers
   - Add `aria-label` and `aria-haspopup` where MUI doesn't auto-add them
   - Use `aria-expanded` for toggleable components
   - Ensure keyboard navigation works (MUI handles this for Menu, Tabs, etc.)

**Raaghu Conventions:**
- `import './{rdsKebab}.scss';`
- Use **enums** for Layout, Style, State options (NOT union types):
  ```ts
  export enum {Name}Layout { Default = "default", Compact = "compact" }
  export enum {Name}Style { Filled = "filled", Outlined = "outlined", Transparent = "transparent" }
  export enum {Name}State { Default = "default", Disabled = "disabled" }
  ```
- Export **data interfaces** for items/entries alongside the props interface
- `const {rdsPascal}: React.FC<{propsName}> = ({ ... }) => { ... }`
- BEM class construction: `[baseClass, modifierClass].filter(Boolean).join(" ")`
- `{rdsPascal}.displayName = '{rdsPascal}'`
- `export default {rdsPascal}`

#### 4b. `{rdsKebab}.scss` — Styles

**MUI + Raaghu Styling Rules:**
- Override MUI's generated CSS classes by nesting MUI selectors inside the Raaghu root:
  ```scss
  .{rdsKebab} {
    .MuiAppBar-root { /* override AppBar */ }
    .MuiToolbar-root { /* override Toolbar */ }
    .MuiButton-root { /* override buttons within this component */ }
    .MuiMenuItem-root { /* override menu items */ }
  }
  ```
- `:root` block with CSS custom properties: `--{rdsKebab}-*` referencing `var(--rds-*)`
- `.{rdsKebab}` root class with BEM modifiers:
  - `&--layout-default`, `&--layout-compact`
  - `&--filled`, `&--outlined`, `&--transparent`
  - `&--disabled`
  - `&__header`, `&__body`, `&__item` for sub-elements
- SCSS enhances MUI theming — avoid `!important` unless necessary
- Use MUI CSS variables where available (`--mui-palette-primary-main`)

#### 4c. `{rdsKebab}.stories.tsx` — Storybook story

**Story Rules:**
- `import type { Meta, StoryObj } from '@storybook/react-vite';`
- Hide MUI internal props from Storybook controls:
  ```ts
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['component', 'slots', 'slotProps'],
    },
  },
  ```
- Use `satisfies Meta<typeof {rdsPascal}>` pattern
- Map each enum prop in `argTypes` with `control: { type: 'select' }` and `options: Object.values({Name}Layout)` etc.
- Create meaningful story variants: Default, Outlined, Transparent, Disabled, Compact, etc.
- Include realistic sample data in `args.items`
- Add `controls.include` on each story to show only relevant props

#### 4d. `{rdsKebab}.test.tsx` — Jest + RTL tests

**Test Rules:**
- `jest.mock('./{rdsKebab}.scss', () => ({}));`
- `import '@testing-library/jest-dom';`
- Define `defaultProps` with realistic sample data
- Test:
  - Renders without crashing
  - Correct `displayName`
  - Renders all items from props
  - BEM layout/style/state classes applied correctly
  - Event handlers fire (use `fireEvent.click()` and verify callback)
  - Disabled state prevents interaction
  - ARIA attributes are present
- Test MUI component behavior:
  - If using Menu: test that clicking opens menu, selecting item calls callback
  - If using Tabs: test tab switching
  - If using Dialog: test open/close

#### 4e. `{rdsKebab}.figma.tsx` — Figma Code Connect

- `import figma from "@figma/code-connect"`
- `figma.connect({rdsPascal}, "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=TODO", { ... })`
- Map each enum to figma.enum with emoji-prefixed labels: `"📱 Layout"`, `"✨ Style"`, `"💡 State"`

### Step 5 — Update barrel export

In `raaghu-components/index.ts`:
- After the LAST `export { default as ... }` line, insert:
  ```ts
  export { default as {rdsPascal} } from './{rdsKebab}/{rdsKebab}';
  ```
- After the LAST `export type { ... }` line, insert:
  ```ts
  export type { {propsName}, {Name}Item } from './{rdsKebab}/{rdsKebab}';
  ```
- Also export any other data interfaces (sub-item types, enum types if needed by consumers)

### Step 6 — Validate against MUI API

Before running tests, cross-check your implementation:

1. **Re-fetch the API pages** for each MUI component used
2. **Verify controlled patterns**: `Menu` needs `anchorEl`+`open`+`onClose`, `Dialog` needs `open`+`onClose`, `Tabs` needs `value`+`onChange`
3. **Verify event handler signatures**: e.g., `onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void` for Dialog
4. **Verify MUI prop values are exact**: `'contained'` not `'filled'` for Button variant, `'elevation'` not `'raised'` for Paper variant
5. **Verify MUI composition patterns**: `AppBar` wraps `Toolbar`, `Tabs` wraps `Tab`, `List` wraps `ListItem`
6. **Verify imports**: All MUI components are from `@mui/material`, icons from `@mui/icons-material`

### Step 7 — Test, fix, and retest until everything works

This is the most critical step. You MUST iterate until there are zero errors. DO NOT skip any sub-step.

#### 7a. Check for TypeScript / lint errors

Use the editor diagnostics (get_errors) on all 5 generated files. If ANY errors exist:
1. Read the error messages carefully
2. If the error is about a MUI type mismatch, **re-fetch the MUI API page** and find the correct type
3. Fix each error in the source file
4. Re-check errors again
5. Repeat until all files show zero errors

Common MUI-related TypeScript issues:
- Wrong MUI variant value → check the API page for exact strings
- Wrong MUI event handler type → check the API page for exact callback signatures
- MUI component doesn't accept a prop → it may be on a child component (e.g., `disableElevation` is on `Button`, not `AppBar`)
- Enum not compatible with MUI prop → your enum `string` values must match MUI's expected literal types

#### 7b. Run the unit tests

```
bun run jest --testPathPattern="raaghu-components/{rdsKebab}" --no-coverage
```

If ANY tests fail:
1. Read the failure output carefully
2. Determine if the issue is in the **component code** or the **test code**
3. Fix the root cause (prefer fixing the component; only fix the test if the test expectation is wrong)
4. Re-run the tests
5. Repeat until ALL tests pass

Common test issues:
- BEM class not found → check the class construction logic
- MUI component renders differently than expected → `console.log(container.innerHTML)` to inspect actual DOM
- Event not firing → ensure the click target is the right DOM element (MUI may wrap elements)
- MUI Menu not rendering in tests → Menu renders in a Portal; use `screen.getByRole('menu')` instead of `container.querySelector`
- Raaghu-elements SCSS imports failing → mock them: `jest.mock('../../raaghu-elements/rds-button/rds-button.scss', () => ({}))`

#### 7c. Build verification

```
bunx tsc --noEmit --pretty
```
Confirms barrel export and all types compile cleanly.

#### 7d. Report

Only after ALL checks pass, report:
- List of all 5 created files
- MUI components used (with API page links)
- Raaghu-elements reused
- Enums and data interfaces defined
- Key props and their types
- Test results (X tests passed)
- Next steps: update Figma `node-id=TODO`, preview in Storybook (`bun run storybook`)
