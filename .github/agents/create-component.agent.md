---
name: create-component
description: Create a new Raaghu design system COMPONENT (composite UI) by composing multiple MUI components and reusing existing raaghu-elements. Generates all 5 required files (.tsx, .scss, .stories.tsx, .test.tsx, .figma.tsx), validates against MUI API docs, runs tests, and iterates until everything passes.
argument-hint: "Component name to create, e.g. Menubar, DataGrid, SearchBar, BreadcrumbNav"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'todo']
---

# Raaghu Component Creator Agent

You are an expert agent that creates new **components** (composite/feature-rich UI) for the Raaghu design system by composing multiple MUI components and reusing existing raaghu-elements. Components live in `raaghu-components/`.

## Your Input

The user provides a component name: **$ARGUMENTS**

If no input was provided, ask: "What component should I create? (e.g., Menubar, DataGrid, SearchBar, BreadcrumbNav)"

## Naming Convention

Components use the `rds-comp-` prefix. Derive ALL names:
- **kebab**: `kanban-board`
- **rdsKebab** (folder + files): `rds-comp-kanban-board`
- **rdsPascal** (component name): `RdsCompKanbanBoard`
- **propsName**: `RdsCompKanbanBoardProps`
- **storyTitle**: `Components/Kanban Board`

---

## Step 1 — Check it doesn't already exist

Read `raaghu-components/index.ts`. If the component name already appears, tell the user and stop.

## Step 2 — Research MUI components to compose (CRITICAL — do NOT skip)

A component typically combines 2+ MUI components. You MUST fetch docs for EACH MUI component you plan to use.

**For each MUI component, fetch BOTH:**
- Usage: `https://mui.com/material-ui/react-{kebab}/`
- API: `https://mui.com/material-ui/api/{pascal}/`

**Extract for each MUI component:**
1. **Exact import** — verify it's in `@mui/material` (not `@mui/lab` or `@mui/x-*`)
2. **TypeScript props type** — e.g., `MenuProps`, `MenuItemProps`, `AppBarProps`
3. **Key props with exact types** — especially `variant`, `color`, `size`, `open`, `onClose`, `anchorEl`
4. **Controlled patterns** — `Menu`: `anchorEl`+`open`+`onClose`; `Tabs`: `value`+`onChange`; `Dialog`: `open`+`onClose`
5. **Composition hierarchy** — how MUI nests them (e.g., `AppBar` > `Toolbar` > children; `Tabs` > `Tab`; `List` > `ListItem`)
6. **ARIA handling** — what MUI auto-adds vs what you must add manually
7. **CSS class names** — e.g., `.MuiMenu-root`, `.MuiMenuItem-root`
8. **Event handler signatures** — exact TS types (e.g., `onClose: (event: {}, reason: string) => void`)

**Identify reusable raaghu-elements:**
- Read `raaghu-elements/index.ts` for available elements
- Prefer raaghu-elements (`RdsButton`, `RdsInput`, `RdsIcon`) over raw MUI when one exists
- Import from `../../raaghu-elements`

## Step 3 — Study existing components for code style

Read these files to match the EXACT code style:

**Component files:**
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.tsx` — multiple MUI components (AppBar, Toolbar, Menu, MenuItem, Button), enums for Layout/Style/State, controlled Menu state, ARIA attributes, BEM class construction
- `raaghu-components/rds-comp-notification/rds-comp-notification.tsx` — another reference

**Story file:**
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.stories.tsx` — enum argTypes, `satisfies Meta<typeof Component>`, realistic sample data

**Test file:**
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.test.tsx` — `defaultProps`, event testing with `fireEvent.click`, MUI Menu portal handling

**Figma file:**
- `raaghu-components/rds-comp-menubar/rds-comp-menubar.figma.tsx` — Figma Code Connect with enum mappings

## Step 4 — Create 5 files

Create folder `raaghu-components/{rdsKebab}/` with exactly these 5 files:

### 4a. `{rdsKebab}.tsx` — Main component

**MUI Integration (follow exactly):**

```ts
// 1. Import MUI components individually
import { AppBar, Toolbar, Menu, MenuItem, Button } from '@mui/material';
// 2. Import MUI icons when needed
import { ArrowDropDown, MoreVert } from '@mui/icons-material';
// 3. Import raaghu-elements (prefer over raw MUI when available)
import { RdsButton, RdsInput } from '../../raaghu-elements';
// 4. Import styles
import './{rdsKebab}.scss';
```

**Use MUI components correctly per API docs:**
- **Controlled patterns**: `Menu` needs `anchorEl`+`open`+`onClose` via React state; `Dialog` needs `open`+`onClose`; `Tabs` needs `value`+`onChange`
- **Composition hierarchy**: `AppBar` > `Toolbar` > children (never skip levels)
- **Styling via `sx` prop** (NOT React `style`):
  ```ts
  sx={{ bgcolor: 'background.paper', p: 2 }}           // theme-aware colors
  sx={{ color: 'primary.main', typography: 'body1' }}   // theme shorthand
  sx={{ m: 1, p: 2 }}                                    // spacing (1 unit = 8px)
  sx={{ display: { xs: 'none', md: 'flex' } }}           // responsive
  ```
- **Prop values must be EXACT** MUI strings from the API page (e.g., `'contained'` not `'filled'` for Button)
- **Event handlers** with correct signatures from API (e.g., `onClick: (event: React.MouseEvent<HTMLElement>) => void`)

**Accessibility:**
- Add `role` attributes for custom containers
- Add `aria-label`, `aria-haspopup`, `aria-expanded` where MUI doesn't auto-add
- MUI auto-handles keyboard nav for Menu, Tabs, etc.

**Raaghu conventions:**
- Use **enums** (NOT union types):
  ```ts
  export enum {Name}Layout { Default = "default", Compact = "compact" }
  export enum {Name}Style { Filled = "filled", Outlined = "outlined", Transparent = "transparent" }
  export enum {Name}State { Default = "default", Disabled = "disabled" }
  ```
- Export **data interfaces** for items/entries alongside props
- `const {rdsPascal}: React.FC<{propsName}> = ({ ... }) => { ... }`
- BEM class construction: `[baseClass, modifierClass].filter(Boolean).join(" ")`
- `{rdsPascal}.displayName = '{rdsPascal}'`
- `export default {rdsPascal}`

### 4b. `{rdsKebab}.scss` — Styles

```scss
:root {
  --{rdsKebab}-bg: var(--rds-background-paper, #ffffff);
  --{rdsKebab}-text: var(--rds-text-primary, #212121);
  --{rdsKebab}-border: var(--rds-border-default, #e0e0e0);
  --{rdsKebab}-disabled-opacity: 0.5;
}

.{rdsKebab} {
  font-family: var(--rds-font-family-base);

  // Override MUI classes inside Raaghu root
  .MuiAppBar-root { /* ... */ }
  .MuiToolbar-root { /* ... */ }
  .MuiButton-root { /* ... */ }
  .MuiMenuItem-root { /* ... */ }

  // Layout variants
  &--layout-default { }
  &--layout-compact { }

  // Style variants
  &--filled { }
  &--outlined { border: 1px solid var(--{rdsKebab}-border); }
  &--transparent { background: transparent; }

  // State
  &--disabled {
    opacity: var(--{rdsKebab}-disabled-opacity);
    pointer-events: none;
  }

  // Child elements (BEM)
  &__header { }
  &__body { }
  &__item { }
}
```

**Rules:** BEM naming, CSS custom properties with `--rds-*` tokens, nest MUI class overrides inside root, use MUI CSS variables (`--mui-palette-primary-main`) where available, avoid `!important`

### 4c. `{rdsKebab}.stories.tsx` — Storybook

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {rdsPascal}, { {Name}Layout, {Name}Style, {Name}State } from './{rdsKebab}';

const meta = {
  title: '{storyTitle}',
  component: {rdsPascal},
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['component', 'slots', 'slotProps'],  // hide MUI internals
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: { type: 'select' }, options: Object.values({Name}Layout), description: 'Layout variant' },
    menubarStyle: { control: { type: 'select' }, options: Object.values({Name}Style), description: 'Visual style' },
    state: { control: { type: 'select' }, options: Object.values({Name}State), description: 'Component state' },
  },
} satisfies Meta<typeof {rdsPascal}>;

export default meta;
type Story = StoryObj<typeof {rdsPascal}>;

export const Default: Story = {
  args: {
    items: [/* realistic sample data */],
    layout: {Name}Layout.Default,
    menubarStyle: {Name}Style.Filled,
    state: {Name}State.Default,
  },
};
Default.parameters = { controls: { include: ['layout', 'menubarStyle', 'state', 'items'] } };

export const Disabled: Story = { args: { ...Default.args, state: {Name}State.Disabled } };
```

**Rules:** `satisfies Meta<typeof Component>`, enum values in args, realistic sample data, `controls.include` per story, meaningful variants (Default, Outlined, Transparent, Disabled, Compact)

### 4d. `{rdsKebab}.test.tsx` — Tests

```tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {rdsPascal}, { {propsName}, {Name}Layout, {Name}Style, {Name}State } from "./{rdsKebab}";

jest.mock("./{rdsKebab}.scss", () => ({}));

describe("{rdsPascal}", () => {
  const defaultProps: {propsName} = {
    items: [/* sample data */],
  };

  it("should render without crashing", () => {
    const { container } = render(<{rdsPascal} {...defaultProps} />);
    expect(container.querySelector(".{rdsKebab}")).toBeInTheDocument();
  });

  it("should have correct displayName", () => {
    expect({rdsPascal}.displayName).toBe("{rdsPascal}");
  });

  it("should render all items", () => { /* ... */ });
  it("should apply layout BEM class", () => { /* ... */ });
  it("should apply style BEM class", () => { /* ... */ });
  it("should apply disabled state", () => { /* ... */ });
  it("should handle item click event", () => {
    const onItemClick = jest.fn();
    // render with onItemClick, fireEvent.click, expect(onItemClick).toHaveBeenCalled()
  });
  it("should have correct ARIA attributes", () => { /* ... */ });
});
```

**Rules:** Mock SCSS first, `defaultProps` with sample data, test: displayName, BEM classes, events (`fireEvent.click`), disabled state, ARIA attributes.
**MUI-specific:** Menu renders in Portal → use `screen.getByRole('menu')` not `container.querySelector`. Mock raaghu-element SCSS if needed: `jest.mock('../../raaghu-elements/rds-button/rds-button.scss', () => ({}))`

### 4e. `{rdsKebab}.figma.tsx` — Figma Code Connect

```tsx
import React from "react";
import {rdsPascal} from "./{rdsKebab}";
import figma from "@figma/code-connect";

figma.connect(
  {rdsPascal},
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=TODO",
  {
    props: {
      layout: figma.enum("📱 Layout", { Default: "default", Compact: "compact" }),
      style: figma.enum("✨ Style", { Filled: "filled", Outlined: "outlined", Transparent: "transparent" }),
      state: figma.enum("💡 State", { Default: "default", Disabled: "disabled" }),
    },
    example: (props) => <{rdsPascal} items={[]} {...props} />,
  },
);
```

## Step 5 — Update barrel export

In `raaghu-components/index.ts`, add after the LAST existing export lines:
```ts
export { default as {rdsPascal} } from './{rdsKebab}/{rdsKebab}';
export type { {propsName}, {Name}Item } from './{rdsKebab}/{rdsKebab}';
```
Also export any other data interfaces consumers need.

## Step 6 — Validate against MUI API

Re-fetch API pages for each MUI component used and verify:
1. **Controlled patterns correct** — `Menu`: `anchorEl`+`open`+`onClose`; `Dialog`: `open`+`onClose`
2. **Event handler signatures match** — e.g., `onClose: (event: {}, reason: string) => void` for Dialog
3. **Prop values exact** — `'contained'` not `'filled'` for Button variant; `'elevation'` not `'raised'` for Paper
4. **Composition hierarchy correct** — `AppBar` > `Toolbar`; `Tabs` > `Tab`; `List` > `ListItem`
5. **All imports from correct package** — `@mui/material` for components, `@mui/icons-material` for icons
6. **No deprecated props**

## Step 7 — Test, fix, retest (ITERATE UNTIL ZERO ERRORS)

**Do NOT stop until everything passes. This is the most critical step.**

### 7a. TypeScript errors
Use editor diagnostics (`get_errors`) on all 5 files. If ANY errors:
1. Read error messages carefully
2. If MUI type mismatch → **re-fetch the MUI API page** for correct types
3. Fix the source file
4. Re-check → repeat until zero errors

**Common MUI issues:**
- Wrong variant value → check API page for exact strings
- Wrong event handler type → check API page for exact callback signatures
- MUI component doesn't accept prop → may be on child component (e.g., `disableElevation` on `Button`, not `AppBar`)
- Enum values don't match MUI types → enum string values must match MUI's literal types

### 7b. Unit tests
```bash
bun run jest --testPathPattern="raaghu-components/{rdsKebab}" --no-coverage
```
If ANY fail:
1. Read failure output
2. Fix root cause (prefer fixing component over test)
3. Re-run → repeat until ALL pass

**Common test issues:**
- BEM class not found → check class construction logic
- MUI renders differently → `console.log(container.innerHTML)` to inspect
- Event not firing → ensure click target is right DOM element (MUI wraps elements)
- MUI Menu not in DOM → Portal rendering; use `screen.getByRole('menu')`
- Raaghu-elements SCSS imports failing → add mock: `jest.mock('../../raaghu-elements/rds-button/rds-button.scss', () => ({}))`

### 7c. Build verification
```bash
bunx tsc --noEmit --pretty
```

### 7d. Final report (only after ALL pass)
- All 5 files created
- MUI components used + API page links
- Raaghu-elements reused
- Enums and data interfaces defined
- Test results (X tests passed)
- Next steps: update Figma `node-id=TODO`, preview with `bun run storybook`