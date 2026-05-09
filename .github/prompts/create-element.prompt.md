---
description: "Create a new Raaghu design system ELEMENT (primitive UI) by wrapping a MUI component. Example: /create-element Slider"
mode: agent
---

# Create Raaghu Element

You are creating a new **element** (primitive UI component) for the Raaghu design system by wrapping a MUI component. Elements live in `raaghu-elements/`.

User input: $ARGUMENTS

If no input was provided, ask the user: "Which MUI component should I create as an element? (e.g., Slider, Rating, ImageList, LinearProgress)"

## Naming Rules

From the user's MUI component name, derive ALL names before doing anything:

- **kebab**: `linear-progress` (lowercase, hyphenated)
- **pascal** (MUI import name): `LinearProgress`
- **rdsKebab** (folder + file prefix): `rds-linear-progress`
- **rdsPascal** (component name): `RdsLinearProgress`
- **propsName**: `RdsLinearProgressProps`
- **storyTitle**: `Elements/Linear Progress`

## Execution Steps

### Step 1 — Verify it doesn't exist

Read `raaghu-elements/index.ts` and search for the component name. If found, tell the user it already exists and stop.

### Step 2 — Research the MUI component API thoroughly

This is a critical step. You MUST fetch and study the MUI documentation before writing any code.

**Fetch BOTH of these MUI pages:**
- Usage & examples: `https://mui.com/material-ui/react-{kebab}/`
- Full API reference: `https://mui.com/material-ui/api/{pascal}/`

**Extract and note from the API page:**
1. **Exact import**: `import { {pascal} } from '@mui/material'` — verify the component exists in `@mui/material` (some are in `@mui/lab` or `@mui/x-*`)
2. **TypeScript props type name**: Usually `{pascal}Props` — confirm the exact name from the API page (some MUI components use `{pascal}BaseProps`, `{pascal}TypeMap`, or require generics like `AutocompleteProps<T, ...>`)
3. **All props with their types**: List every prop, its TypeScript type, and its default value
4. **MUI `variant` prop**: Note the EXACT variant values (e.g., Button uses `'text' | 'outlined' | 'contained'`, NOT `'filled'`)
5. **MUI `color` prop**: Note supported color values (e.g., `'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'`)
6. **MUI `size` prop**: Note the EXACT supported size values (e.g., `'small' | 'medium' | 'large'` — some components only support `'small' | 'medium'`)
7. **Slots and slotProps**: Note if the component uses the MUI Slots API pattern
8. **CSS classes**: Note MUI CSS class names listed on the API page (e.g., `.MuiSlider-root`, `.MuiSlider-thumb`)
9. **Inherited props**: Note which HTML element/component props it inherits from
10. **Controlled vs uncontrolled**: Check if the component has `value`/`onChange` controlled patterns
11. **Ref forwarding**: Check if the component supports `ref`

**IMPORTANT — Mapping MUI props to Raaghu props:**
- MUI `variant` → Raaghu `style` (rename to avoid collision with React's `style` attribute; use `Omit<{MuiName}Props, 'variant' | 'style'>`)
- MUI `color` → keep as `color` (pass through directly to the MUI component)
- MUI `size` → keep as `size` (pass through, or remap if MUI values differ from `small|medium|large`)
- MUI `disabled` → combine with Raaghu `state` prop: `isDisabled = disabled || state === 'disabled'`
- DO NOT duplicate MUI props unnecessarily — only create a Raaghu-specific prop when you need to rename it, remap its values, or add new behavior
- All remaining MUI props MUST be passed through via `{...props}` spread

### Step 3 — Read existing elements for code style reference

Read these files to match the EXACT code style, patterns, and conventions:
- `raaghu-elements/rds-button/rds-button.tsx` — complex element with MUI variant→style mapping, `sx` prop merging, icon handling
- `raaghu-elements/rds-badge/rds-badge.tsx` — element with custom rendering logic, BEM class construction

Also read for reference:
- `raaghu-elements/rds-button/rds-button.stories.tsx` — story with argTypes, excluded MUI internal controls
- `raaghu-elements/rds-badge/rds-badge.test.tsx` — test pattern
- `raaghu-elements/rds-badge/rds-badge.figma.tsx` — figma connect pattern

### Step 4 — Create folder with 5 files

Create `raaghu-elements/{rdsKebab}/` containing exactly these 5 files:

#### 4a. `{rdsKebab}.tsx` — Main component

**MUI Integration Rules (CRITICAL — follow these exactly):**

1. **Import with alias**: `import { {MuiName} as Mui{MuiName}, type {MuiName}Props } from '@mui/material';`

2. **Extend MUI props properly**:
   ```ts
   export interface {propsName} extends Omit<{MuiName}Props, 'variant' | 'style' | ...> {
     // Only Omit props you are replacing with Raaghu equivalents
   }
   ```

3. **Map Raaghu `style` back to MUI `variant`** — the values MUST match what MUI actually accepts:
   ```ts
   const getMuiVariant = () => {
     switch (style) {
       case 'filled': return 'contained';  // CHECK: what does MUI call the filled variant?
       case 'outlined': return 'outlined';
       case 'transparent': return 'text';
       default: return 'contained';
     }
   };
   ```
   VERIFY: Re-check the MUI API page for the exact `variant` values this component accepts. Different MUI components use different variant names (Button: `contained`, TextField: `filled`, Chip: `filled`, etc.)

4. **Preserve MUI props pass-through**:
   - `color` → pass directly to MUI component
   - `sx` → merge with any custom sx: `sx={{ ...customSx, ...sx }}`
   - `ref` → use `React.forwardRef` if the MUI component supports it
   - `{...props}` spread MUST come last on the MUI component to forward all remaining MUI props

5. **Use MUI Icons from `@mui/icons-material`** when the component needs icons

6. **Respect controlled/uncontrolled patterns** — if MUI component has `value`/`onChange`, expose them in the interface

**Raaghu Conventions:**
- `import './{rdsKebab}.scss';`
- Custom Raaghu props: `size`, `state`, `style`, `layout`, `shape` as appropriate for the component
- Destructure props with sensible defaults
- `getStateClassName()` helper returning BEM class `{rdsKebab}--state-{value}`
- `isDisabled = disabled || state === 'disabled'`
- Construct className: `` className={`{rdsKebab} ${getStateClassName()}`.trim()} ``
- Set `{rdsPascal}.displayName = '{rdsPascal}'`
- `export default {rdsPascal}`

#### 4b. `{rdsKebab}.scss` — Styles

**MUI + Raaghu Styling Rules:**
- Override MUI's generated CSS classes by nesting MUI selectors inside the Raaghu root:
  ```scss
  .{rdsKebab} {
    // Override MUI defaults when needed
    .Mui{pascal}-root { /* ... */ }
    .Mui{pascal}-thumb { /* ... */ }
  }
  ```
- `:root` block with CSS custom properties: `--{rdsKebab}-*` referencing `var(--rds-*)`
- `.{rdsKebab}` root class with BEM modifiers:
  - `&--state-default`, `&--state-disabled`
  - `&--size-small/medium/large` if applicable
  - `&__child-element` for sub-elements
- Design tokens: `var(--rds-font-family-base)`, `var(--rds-transition-base)`, `var(--rds-focus-ring)`
- SCSS should enhance MUI, not fight it — avoid `!important` unless necessary

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
- Map each Raaghu custom prop in `argTypes` with `control: { type: 'select' }` and `options` matching the EXACT values from the interface
- Include `description` for each argType
- Add `controls.include` on each story variant to show only relevant props
- Create meaningful variants: Default, Disabled, each size, each style, each layout
- If the component has MUI `color` prop, include color variants

#### 4d. `{rdsKebab}.test.tsx` — Jest + RTL tests

**Test Rules:**
- `jest.mock('./{rdsKebab}.scss', () => ({}));`
- `import '@testing-library/jest-dom';`
- Test: renders without crashing, correct displayName, default state BEM class, disabled state BEM class, each custom prop
- Use `container.querySelector('.{rdsKebab}')` pattern
- Test MUI prop forwarding: verify `color`, `size`, etc. are forwarded (check rendered DOM attributes)
- Test controlled behavior if applicable (`value`/`onChange`)

#### 4e. `{rdsKebab}.figma.tsx` — Figma Code Connect

- `import figma from "@figma/code-connect"`
- `figma.connect({rdsPascal}, "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=TODO", { props: { ... }, example: (props) => <{rdsPascal} {...props} /> })`
- Use emoji-prefixed labels: `"💡 State"`, `"📏 Size"`, `"📱 Layout"`, `"✨ Style"`, `"⚠️ Shape"`

### Step 5 — Update barrel export

In `raaghu-elements/index.ts`:
- After the LAST `export { default as ... }` line, insert: `export { default as {rdsPascal} } from './{rdsKebab}/{rdsKebab}';`
- After the LAST `export type { ... }` line, insert: `export type { {propsName} } from './{rdsKebab}/{rdsKebab}';`

### Step 6 — Validate against MUI API

Before running tests, cross-check your implementation against the MUI docs one more time:

1. **Re-fetch the API page**: `https://mui.com/material-ui/api/{pascal}/`
2. **Prop types match**: Confirm every MUI prop you used exists on the component and the value types match exactly
3. **Variant values are correct**: Verify your `getMuiVariant()` mapping uses the EXACT strings MUI expects (e.g., `'contained'` not `'filled'` for Button)
4. **Import is valid**: Confirm the component is in `@mui/material` not `@mui/lab`
5. **No deprecated props**: Check if any props you used are marked deprecated
6. **Default values align**: Your defaults should match MUI's defaults unless intentionally overridden

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
- `Type '"filled"' is not assignable to type '"text" | "outlined" | "contained"'` → you used the wrong MUI variant value; check the API page
- `Property 'X' does not exist on type '{pascal}Props'` → prop name may differ; re-check the API page
- `Type '{pascal}Props' is not generic` → some MUI prop types need generics
- `Omit` includes a prop that doesn't exist on MUI's type → remove it from Omit

#### 7b. Run the unit tests

```
bun run jest --testPathPattern="raaghu-elements/{rdsKebab}" --no-coverage
```

If ANY tests fail:
1. Read the failure output carefully
2. Determine if the issue is in the **component code** or the **test code**
3. Fix the root cause (prefer fixing the component; only fix the test if the test expectation is wrong)
4. Re-run the tests
5. Repeat until ALL tests pass

Common test issues:
- Component doesn't render the expected CSS class → check className logic
- `displayName` mismatch → ensure `.displayName = '{rdsPascal}'`
- MUI component renders differently than expected → `console.log(container.innerHTML)` to inspect actual DOM
- MUI component needs ThemeProvider → wrap in `<ThemeProvider theme={createTheme()}>`

#### 7c. Build verification

```
bunx tsc --noEmit --pretty
```
Confirms barrel export and all types compile cleanly.

#### 7d. Report

Only after ALL checks pass, report:
- List of all 5 created files
- MUI component wrapped (name + import source)
- MUI API page consulted: `https://mui.com/material-ui/api/{pascal}/`
- Raaghu props created and their MUI equivalents
- MUI props preserved via pass-through
- Test results (X tests passed)
- Next steps: update Figma `node-id=TODO`, preview in Storybook (`bun run storybook`)
