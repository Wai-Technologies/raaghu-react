---
name: create-component
description: Create a new Raaghu design system COMPONENT (composite UI) by composing multiple MUI components and reusing existing raaghu-elements. Generates all 6 required files (.tsx, .scss, .stories.tsx, .test.tsx, .figma.tsx, .spec.ts), validates against MUI API docs, runs unit + Playwright QA tests, and iterates until everything passes.
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

Create folder `raaghu-components/{rdsKebab}/` with exactly these 6 files:

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

### 4f. `{rdsKebab}.spec.ts` — Playwright QA Tests

This file runs real-browser QA validation against Storybook stories — the same checks a QA engineer would perform manually.

**Derive the Storybook story ID** from the story title:
- Story title `Components/Kanban Board` → storyId = `components-kanban-board`
- Pattern: lowercase title, `/` → `-`, spaces → `-`

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const STORY_URL = 'http://localhost:6006/iframe.html';
const COMPONENT = '{rdsKebab}';
const STORY_ID = 'components-{kebab}';  // derived from storyTitle

const VIEWPORTS = {
  mobile:  { width: 375,  height: 667  },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;

test.describe('{rdsPascal} — QA Validation', () => {

  // ─── 1. Responsive Rendering ─────────────────────────────────
  for (const [viewport, size] of Object.entries(VIEWPORTS)) {
    test(`renders without overflow at ${viewport} (${size.width}×${size.height})`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
      await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow).toBe(false);

      const box = await page.locator(`.${COMPONENT}`).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    });

    test(`visual snapshot at ${viewport}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
      await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

      await expect(page.locator(`.${COMPONENT}`)).toHaveScreenshot(
        `${COMPONENT}-${viewport}.png`,
        { maxDiffPixelRatio: 0.05 }
      );
    });
  }

  // ─── 2. Accessibility (WCAG 2.1 AA) ──────────────────────────
  test('passes axe accessibility audit', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  // ─── 3. Keyboard Navigation ──────────────────────────────────
  test('is focusable via Tab key', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    const activeTag = await page.evaluate(() =>
      document.activeElement?.tagName?.toLowerCase() ?? 'body'
    );
    expect(activeTag).not.toBe('body');
  });

  test('Enter / Space activation does not throw', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');

    expect(errors).toEqual([]);
  });

  // ─── 4. Hover & Focus States ─────────────────────────────────
  test('hover state visual snapshot', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    const el = page.locator(`.${COMPONENT}`);
    await el.waitFor({ state: 'visible' });
    await el.hover();

    await expect(el).toHaveScreenshot(
      `${COMPONENT}-hover.png`,
      { maxDiffPixelRatio: 0.05 }
    );
  });

  test('focus-visible state visual snapshot', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');

    await expect(page.locator(`.${COMPONENT}`)).toHaveScreenshot(
      `${COMPONENT}-focus.png`,
      { maxDiffPixelRatio: 0.05 }
    );
  });

  // ─── 5. Disabled State ────────────────────────────────────────
  test('disabled state blocks interaction', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--disabled&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    const isNonInteractive = await page.evaluate((selector) => {
      const root = document.querySelector(selector);
      if (!root) return false;
      const rootStyle = getComputedStyle(root);
      if (rootStyle.pointerEvents === 'none') return true;

      const els = root.querySelectorAll(
        'button, input, select, textarea, [role="button"]'
      );
      if (els.length > 0) {
        return Array.from(els).every(
          (el) =>
            el.hasAttribute('disabled') ||
            el.getAttribute('aria-disabled') === 'true'
        );
      }
      return (
        root.hasAttribute('disabled') ||
        root.getAttribute('aria-disabled') === 'true'
      );
    }, `.${COMPONENT}`);

    expect(isNonInteractive).toBe(true);
  });

  test('disabled state visual snapshot', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--disabled&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    await expect(page.locator(`.${COMPONENT}`)).toHaveScreenshot(
      `${COMPONENT}-disabled.png`,
      { maxDiffPixelRatio: 0.05 }
    );
  });

  // ─── 6. Theme Variants (Light / Dark) ─────────────────────────
  for (const theme of ['light', 'dark'] as const) {
    test(`${theme} theme renders correctly`, async ({ page }) => {
      await page.goto(
        `${STORY_URL}?id=${STORY_ID}--default&viewMode=story&globals=theme:${theme}`
      );
      await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

      await expect(page.locator(`.${COMPONENT}`)).toHaveScreenshot(
        `${COMPONENT}-theme-${theme}.png`,
        { maxDiffPixelRatio: 0.05 }
      );
    });
  }

  // ─── 7. No Console Errors ─────────────────────────────────────
  test('renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    expect(errors).toEqual([]);
  });

  // ─── 8. All Story Variants Load ────────────────────────────────
  // Update this array with every exported story name (lowercase, hyphenated)
  const storyVariants = ['default', 'disabled'];
  for (const variant of storyVariants) {
    test(`story "${variant}" loads without crashing`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.goto(`${STORY_URL}?id=${STORY_ID}--${variant}&viewMode=story`);
      await page.waitForLoadState('networkidle');

      expect(errors).toEqual([]);
    });
  }

  // ─── 9. Multi-element Interaction Sequences ───────────────────
  // Components compose multiple UI elements — test their coordination:
  // - Open a menu, select an item, verify callback
  // - Tab through multiple interactive children in correct order
  // - Open/close controlled sub-components (dialogs, menus, popovers)
  // Add component-specific interaction tests here based on the elements used.
});
```

**Rules:**
- Derive `STORY_ID` from `storyTitle` — lowercase, `/` → `-`, spaces → `-`
- Update the `storyVariants` array with ALL exported story names from the stories file
- Add component-specific interaction tests in section 9 (e.g., Menu open/close, Tab order through items, Dialog dismiss with Escape)
- Disabled check is multi-layer: root `pointer-events`, child `disabled` attrs, `aria-disabled`

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
Use editor diagnostics (`get_errors`) on all 6 files. If ANY errors:
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

### 7d. Playwright QA tests (CRITICAL — treat like a QA sign-off)

**Prerequisites:** Storybook must be running. The Playwright config auto-starts it, but if it's already running on port 6006, tests reuse it.

```bash
npx playwright test --grep "{rdsPascal}" --project=chromium
```

If this is the **first run** for this component (no baseline screenshots exist), run with `--update-snapshots` first to create baselines:
```bash
npx playwright test --grep "{rdsPascal}" --project=chromium --update-snapshots
```

If ANY Playwright tests fail:
1. **Visual snapshot mismatch** → inspect the diff in `playwright-report/`. If the new rendering is correct, update baselines with `--update-snapshots`. If not, fix the component.
2. **Accessibility violation** → read the axe violation details. Fix the component (add missing `aria-*`, fix contrast, add labels). Re-run.
3. **Keyboard navigation fails** → ensure MUI components are focusable. Check Tab order across composed elements.
4. **Disabled state not blocking** → verify `disabled` or `aria-disabled` is set on ALL interactive children. Check `pointer-events: none` in SCSS.
5. **Overflow at a viewport** → check SCSS for `overflow`, `max-width`, `box-sizing`. MUI `sx` responsive values may help.
6. **Console errors** → fix the React warning or MUI error in the component code.
7. **Theme issue** → verify MUI `sx` uses theme tokens (`'primary.main'`, `'background.paper'`) not hardcoded colors.
8. **Interaction sequence fails** → check controlled state (e.g., Menu `anchorEl`, Dialog `open`) and event handler wiring.

Repeat until ALL Playwright tests pass.

**What these tests cover (QA checklist):**
| Check | What it validates |
|---|---|
| Responsive rendering | No overflow, non-zero dimensions at 375px / 768px / 1920px |
| Visual snapshots | Pixel-level regression detection per viewport |
| Accessibility audit | WCAG 2.1 AA compliance via axe-core |
| Keyboard navigation | Tab-focusable, Enter/Space don't crash |
| Hover state | Visual hover feedback captured |
| Focus-visible | Focus ring visible on keyboard navigation |
| Disabled state | Blocks pointer events + `disabled`/`aria-disabled` on all children |
| Theme variants | Light and dark theme render correctly |
| No console errors | Zero uncaught JS errors |
| Story variants load | Every Storybook story renders without crash |
| Multi-element interactions | Composed elements coordinate correctly |

### 7e. Final report (only after ALL pass)
- All 6 files created
- MUI components used + API page links
- Raaghu-elements reused
- Enums and data interfaces defined
- Unit test results (X tests passed)
- Playwright QA results (X tests passed — responsiveness, a11y, keyboard, themes)
- Baseline screenshots created in `{rdsKebab}/{rdsKebab}.spec.ts-snapshots/`
- Next steps: update Figma `node-id=TODO`, preview with `bun run storybook`