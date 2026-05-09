---
name: create-element
description: Create a new Raaghu design system ELEMENT (primitive UI) by wrapping a MUI component. Generates all 5 required files (.tsx, .scss, .stories.tsx, .test.tsx, .figma.tsx), validates against MUI API docs, runs tests, and iterates until everything passes.
argument-hint: "MUI component name to wrap, e.g. Slider, Rating, ImageList, LinearProgress"
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'todo']
---

# Raaghu Element Creator Agent

You are an expert agent that creates new **elements** (primitive UI components) for the Raaghu design system by wrapping MUI components. Elements live in `raaghu-elements/`.

## Your Input

The user provides a MUI component name: **$ARGUMENTS**

If no input was provided, ask: "Which MUI component should I create as an element? (e.g., Slider, Rating, ImageList, LinearProgress)"

## Naming Convention

From the MUI component name, derive ALL names before doing anything:
- **kebab**: `linear-progress` (lowercase, hyphenated)
- **pascal** (MUI import): `LinearProgress`
- **rdsKebab** (folder + files): `rds-linear-progress`
- **rdsPascal** (component name): `RdsLinearProgress`
- **propsName**: `RdsLinearProgressProps`
- **storyTitle**: `Elements/Linear Progress`

---

## Step 1 — Check it doesn't already exist

Read `raaghu-elements/index.ts`. If the component name already appears, tell the user and stop.

## Step 2 — Research MUI API (CRITICAL — do NOT skip)

You MUST fetch and study the MUI documentation BEFORE writing any code.

**Fetch BOTH pages:**
- Usage & examples: `https://mui.com/material-ui/react-{kebab}/`
- Full API reference: `https://mui.com/material-ui/api/{pascal}/`

**Extract from the API page:**
1. **Exact import** — verify the component is in `@mui/material` (some are in `@mui/lab` or `@mui/x-*`)
2. **TypeScript props type** — usually `{pascal}Props`; confirm exact name (some use `{pascal}BaseProps` or require generics like `AutocompleteProps<T, ...>`)
3. **All props with types and defaults** — list every prop
4. **`variant` prop EXACT values** — e.g., Button: `'text' | 'outlined' | 'contained'` (NOT `'filled'`); TextField: `'filled' | 'outlined' | 'standard'`. Each MUI component uses different variant names!
5. **`color` prop values** — e.g., `'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'`
6. **`size` prop values** — e.g., `'small' | 'medium' | 'large'` (some only support `'small' | 'medium'`)
7. **Slots/slotProps** — if the component uses MUI's Slots API
8. **CSS classes** — MUI class names (e.g., `.MuiSlider-root`, `.MuiSlider-thumb`)
9. **Inherited props** — which HTML/component props are inherited
10. **Controlled vs uncontrolled** — `value`/`onChange` patterns
11. **Ref forwarding** — whether `ref` is supported

**MUI → Raaghu prop mapping rules:**
- MUI `variant` → Raaghu `style` (rename to avoid React `style` collision; use `Omit<Props, 'variant' | 'style'>`)
- MUI `color` → keep as `color` (pass through directly)
- MUI `size` → keep as `size` (pass through, or remap if MUI values differ)
- MUI `disabled` → combine with Raaghu `state`: `isDisabled = disabled || state === 'disabled'`
- All other MUI props → pass through via `{...props}` spread
- DO NOT duplicate MUI props — only create Raaghu props when renaming, remapping values, or adding new behavior

## Step 3 — Study existing elements for code style

Read these files to match the EXACT code style, patterns, and conventions used in this project:

**Component files:**
- `raaghu-elements/rds-button/rds-button.tsx` — complex element: MUI alias import, `Omit<ButtonProps, 'variant' | 'style'>`, variant→style mapping, sx merging, icon handling, `getStateClassName()`, `displayName`
- `raaghu-elements/rds-badge/rds-badge.tsx` — simpler element: custom rendering logic, BEM class string construction

**Story file:**
- `raaghu-elements/rds-button/rds-button.stories.tsx` — argTypes with `control: { type: 'select' }`, excluded MUI internal controls (`component`, `slots`, `slotProps`), `tags: ['autodocs']`

**Test file:**
- `raaghu-elements/rds-badge/rds-badge.test.tsx` — `jest.mock` SCSS, `@testing-library/jest-dom`, `container.querySelector` pattern, displayName test

**Figma file:**
- `raaghu-elements/rds-badge/rds-badge.figma.tsx` — `figma.connect()` with emoji-prefixed labels

## Step 4 — Create 5 files

Create folder `raaghu-elements/{rdsKebab}/` with exactly these 5 files:

### 4a. `{rdsKebab}.tsx` — Main component

**MUI Integration (follow exactly):**

```ts
// 1. Import MUI with alias
import { {MuiName} as Mui{MuiName}, type {MuiName}Props } from '@mui/material';

// 2. Extend MUI props — only Omit what you replace
export interface {propsName} extends Omit<{MuiName}Props, 'variant' | 'style'> {
  style?: 'filled' | 'outlined' | 'transparent';
  state?: 'default' | 'disabled';
  // ... other Raaghu props as needed
}

// 3. Map Raaghu style → MUI variant (EXACT MUI values!)
const getMuiVariant = () => {
  switch (style) {
    case 'filled': return 'contained';   // VERIFY: check MUI API for this component's variant values
    case 'outlined': return 'outlined';
    case 'transparent': return 'text';
    default: return 'contained';
  }
};

// 4. Pass through all MUI props
<Mui{MuiName}
  variant={getMuiVariant()}
  color={color}
  disabled={isDisabled}
  className={`{rdsKebab} ${getStateClassName()}`.trim()}
  sx={{ ...customSx, ...sx }}
  {...props}
>
```

**Key rules:**
- `{...props}` spread MUST come last to forward all remaining MUI props
- Merge `sx` prop: `sx={{ ...yourStyles, ...sx }}` to let consumers override
- Use `React.forwardRef` if MUI component supports `ref`
- Use MUI Icons from `@mui/icons-material` when needed
- Respect controlled/uncontrolled: expose `value`/`onChange` if MUI component has them
- `import './{rdsKebab}.scss';`

**Raaghu conventions:**
- Custom props: `size`, `state`, `style`, `layout`, `shape` as appropriate
- Destructure with sensible defaults
- `getStateClassName()` → returns BEM class `{rdsKebab}--state-{value}`
- `isDisabled = disabled || state === 'disabled'`
- `{rdsPascal}.displayName = '{rdsPascal}'`
- `export default {rdsPascal}`

### 4b. `{rdsKebab}.scss` — Styles

```scss
:root {
  --{rdsKebab}-bg: var(--rds-background-paper, #ffffff);
  --{rdsKebab}-text: var(--rds-text-primary, #212121);
  --{rdsKebab}-border: var(--rds-border-default, #e0e0e0);
  --{rdsKebab}-disabled-opacity: 0.6;
}

.{rdsKebab} {
  font-family: var(--rds-font-family-base);
  transition: all var(--rds-transition-base);

  // Override MUI defaults when needed
  .Mui{pascal}-root { /* ... */ }

  &:focus-visible {
    outline: var(--rds-focus-ring);
    outline-offset: var(--rds-focus-ring-offset);
  }

  &--state-default { }
  &--state-disabled {
    opacity: var(--{rdsKebab}-disabled-opacity);
    pointer-events: none;
  }
  &--size-small { }
  &--size-medium { }
  &--size-large { }
  &__child-element { }
}
```

**Rules:** BEM naming, CSS custom properties with `--rds-*` design tokens, nest MUI class overrides inside Raaghu root, avoid `!important`

### 4c. `{rdsKebab}.stories.tsx` — Storybook

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {rdsPascal} from './{rdsKebab}';

const meta: Meta<typeof {rdsPascal}> = {
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
    style: { control: { type: 'select' }, options: ['filled', 'outlined', 'transparent'], description: 'Visual style' },
    state: { control: { type: 'select' }, options: ['default', 'disabled'], description: 'Component state' },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'], description: 'Size variant' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { /* default props */ } };
Default.parameters = { controls: { include: ['style', 'state', 'size', /* other props */] } };

export const Disabled: Story = { args: { ...Default.args, state: 'disabled', disabled: true } };
```

**Rules:** Exclude MUI internal props from controls, include `description` per argType, create variants (Default, Disabled, sizes, styles, colors), `controls.include` per story

### 4d. `{rdsKebab}.test.tsx` — Tests

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {rdsPascal} from './{rdsKebab}';

jest.mock('./{rdsKebab}.scss', () => ({}));

describe('{rdsPascal}', () => {
  it('should render without crashing', () => {
    const { container } = render(<{rdsPascal} />);
    expect(container.querySelector('.{rdsKebab}')).toBeInTheDocument();
  });
  it('should have correct displayName', () => {
    expect({rdsPascal}.displayName).toBe('{rdsPascal}');
  });
  it('should apply default state class', () => { /* ... */ });
  it('should apply disabled state class', () => { /* ... */ });
  // Test each custom prop, MUI prop forwarding, controlled behavior
});
```

**Rules:** Mock SCSS first, test displayName, test BEM classes, test MUI prop pass-through, test controlled behavior if applicable

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
      state: figma.enum("💡 State", { Default: "default", Disabled: "disabled" }),
      size: figma.enum("📏 Size", { Small: "small", Medium: "medium", Large: "large" }),
      style: figma.enum("✨ Style", { Filled: "filled", Outlined: "outlined", Transparent: "transparent" }),
    },
    example: (props) => <{rdsPascal} {...props} />,
  },
);
```

## Step 5 — Update barrel export

In `raaghu-elements/index.ts`, add after the LAST existing export lines:
```ts
export { default as {rdsPascal} } from './{rdsKebab}/{rdsKebab}';
export type { {propsName} } from './{rdsKebab}/{rdsKebab}';
```

## Step 6 — Validate against MUI API

Before running tests, re-fetch `https://mui.com/material-ui/api/{pascal}/` and verify:
1. Every MUI prop you used actually exists on the component
2. Your `getMuiVariant()` uses the EXACT variant strings MUI expects (e.g., `'contained'` not `'filled'` for Button)
3. Import is from `@mui/material` (not `@mui/lab`)
4. No deprecated props used
5. Default values align with MUI defaults unless intentionally different

## Step 7 — Test, fix, retest (ITERATE UNTIL ZERO ERRORS)

**Do NOT stop until everything passes. This is the most critical step.**

### 7a. TypeScript errors
Use editor diagnostics (`get_errors`) on all 5 files. If ANY errors:
1. Read error messages carefully
2. If MUI type mismatch → **re-fetch the MUI API page** for correct types
3. Fix the source file
4. Re-check → repeat until zero errors

**Common MUI TypeScript issues:**
- `Type '"filled"' is not assignable to type '"text" | "outlined" | "contained"'` → wrong variant value; check API page
- `Property 'X' does not exist on type 'Props'` → prop name differs; check API page
- `Omit` includes a prop that doesn't exist → remove it from Omit

### 7b. Unit tests
```bash
bun run jest --testPathPattern="raaghu-elements/{rdsKebab}" --no-coverage
```
If ANY fail:
1. Read failure output
2. Fix root cause (prefer fixing component over test)
3. Re-run → repeat until ALL pass

**Common test issues:**
- Wrong CSS class → check className construction in `.tsx`
- `displayName` mismatch → check `.displayName = '{rdsPascal}'`
- MUI renders differently → `console.log(container.innerHTML)` to inspect
- Needs ThemeProvider → wrap in `<ThemeProvider theme={createTheme()}>`

### 7c. Build verification
```bash
bunx tsc --noEmit --pretty
```

### 7d. Final report (only after ALL pass)
- All 5 files created
- MUI component wrapped + API page link
- Raaghu props → MUI prop mapping
- MUI props preserved via pass-through
- Test results (X tests passed)
- Next steps: update Figma `node-id=TODO`, preview with `bun run storybook`