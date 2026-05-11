---
name: create-element
description: Create a new Raaghu design system ELEMENT (primitive UI) by wrapping a MUI component. Generates all 6 required files (.tsx, .scss, .stories.tsx, .test.tsx, .figma.tsx, .spec.ts), validates against MUI API docs, runs unit + Playwright QA tests, and iterates until everything passes.
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

Create folder `raaghu-elements/{rdsKebab}/` with exactly these 6 files:

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

  // ⚠️ Do NOT add blanket .Mui{pascal}-root overrides for background-color or color here!
  // Only override MUI theme properties INSIDE specific BEM style-variant selectors below.
  // MUI's color/variant props handle theming for the default/filled style.

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

**⚠️ CRITICAL — MUI Theme Color Safety Rules:**
- **NEVER** add blanket `.Mui{pascal}-root { background-color: ...; color: ...; }` inside the element root class — this overrides MUI's theme system and causes invisible text (e.g., white text on white background)
- **ONLY** override `background-color`, `color` inside **specific BEM style-variant** selectors (e.g., for an outlined or transparent variant)
- For the **default/filled** style, let MUI handle theming via its `variant` and `color` props
- If the element uses MUI's `sx` prop for conditional styling, do NOT duplicate those overrides in SCSS

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

### 4f. `{rdsKebab}.spec.ts` — Playwright QA Tests

This file runs real-browser QA validation against Storybook stories — the same checks a QA engineer would perform manually.

**Derive the Storybook story ID** from the story title:
- Story title `Elements/Linear Progress` → storyId = `elements-linear-progress`
- Pattern: lowercase title, `/` → `-`, spaces → `-`

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const STORY_URL = 'http://localhost:6006/iframe.html';
const COMPONENT = '{rdsKebab}';
const STORY_ID = 'elements-{kebab}';  // derived from storyTitle

// Viewports matching Storybook / Chromatic config
const VIEWPORTS = {
  mobile:  { width: 375,  height: 667  },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;

test.describe('{rdsPascal} — QA Validation', () => {

  // ─── 0. Content Visibility Validation (catches invisible text) ──
  // This section catches the #1 visual bug: CSS conflicts making content invisible.
  // It runs BEFORE snapshots so failures are caught on first run without baselines.

  test('element renders with visible, non-zero-size content (Default story)', async ({ page }) => {
    await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
    await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

    const result = await page.evaluate((selector) => {
      const root = document.querySelector(selector);
      if (!root) return { ok: false, issues: ['Element root not found in DOM'] };

      const issues: string[] = [];
      const rect = root.getBoundingClientRect();

      // Check 1: Non-zero dimensions
      if (rect.width === 0 || rect.height === 0) {
        issues.push(`Element has zero dimensions (${rect.width}×${rect.height})`);
      }

      // Check 2: Not hidden via CSS
      const style = getComputedStyle(root);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        issues.push(`Element hidden via CSS (display:${style.display}, visibility:${style.visibility}, opacity:${style.opacity})`);
      }

      // Check 3: Text content is visible with sufficient contrast
      const textEls = root.querySelectorAll(
        'button, a, span, p, label, input, [role="button"], [class*="label"]'
      );
      for (const el of Array.from(textEls)) {
        const text = el.textContent?.trim();
        if (!text) continue;
        const elStyle = getComputedStyle(el);
        const elRect = el.getBoundingClientRect();
        if (elRect.width === 0 || elRect.height === 0) {
          issues.push(`"${text}" has zero dimensions`);
          continue;
        }
        if (elStyle.display === 'none' || elStyle.visibility === 'hidden' || elStyle.opacity === '0') {
          issues.push(`"${text}" is hidden via CSS`);
          continue;
        }
        const fg = elStyle.color;
        const bg = elStyle.backgroundColor;
        if (fg && bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const fgNums = fg.match(/\d+/g)?.map(Number) as [number, number, number] | undefined;
          const bgNums = bg.match(/\d+/g)?.map(Number) as [number, number, number] | undefined;
          if (fgNums && bgNums) {
            const l1 = 0.2126 * (fgNums[0]/255) + 0.7152 * (fgNums[1]/255) + 0.0722 * (fgNums[2]/255);
            const l2 = 0.2126 * (bgNums[0]/255) + 0.7152 * (bgNums[1]/255) + 0.0722 * (bgNums[2]/255);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            if (ratio < 2.0) {
              issues.push(`"${text}" has very low contrast (${ratio.toFixed(1)}:1) — fg:${fg} bg:${bg}`);
            }
          }
        }
      }

      return { ok: issues.length === 0, issues };
    }, `.${COMPONENT}`);

    expect(result.ok, `Visual issues found:\n${result.issues.join('\n')}`).toBe(true);
  });

  // Check every style variant renders with visible content
  // Update this array with ALL exported story names from the stories file
  const allVariants = ['default', 'disabled'];
  for (const variant of allVariants) {
    test(`"${variant}" variant has visible, non-empty content`, async ({ page }) => {
      await page.goto(`${STORY_URL}?id=${STORY_ID}--${variant}&viewMode=story`);
      await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible', timeout: 10000 });

      const result = await page.evaluate((selector) => {
        const root = document.querySelector(selector);
        if (!root) return { ok: false, reason: 'Root element not found' };

        const rect = root.getBoundingClientRect();
        if (rect.height < 1) return { ok: false, reason: `Element too small: ${rect.width}×${rect.height}` };

        const style = getComputedStyle(root);
        if (style.display === 'none') return { ok: false, reason: 'Element has display:none' };
        if (style.visibility === 'hidden') return { ok: false, reason: 'Element has visibility:hidden' };

        return { ok: true, reason: `Visible at ${Math.round(rect.width)}×${Math.round(rect.height)}` };
      }, `.${COMPONENT}`);

      expect(result.ok, `Variant "${variant}": ${result.reason}`).toBe(true);
    });
  }

  // ─── 1. Responsive Rendering ─────────────────────────────────
  for (const [viewport, size] of Object.entries(VIEWPORTS)) {
    test(`renders without overflow at ${viewport} (${size.width}×${size.height})`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(`${STORY_URL}?id=${STORY_ID}--default&viewMode=story`);
      await page.locator(`.${COMPONENT}`).waitFor({ state: 'visible' });

      // No horizontal scrollbar
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow).toBe(false);

      // Element has non-zero dimensions
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

      // Check interactive children (buttons, inputs, etc.)
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
});
```

**Rules:**
- Derive `STORY_ID` from `storyTitle` — lowercase, `/` → `-`, spaces → `-`
- Update the `storyVariants` array with ALL exported story names from the stories file
- Visual snapshots use component locator (not full page) for stability
- The `maxDiffPixelRatio: 0.05` tolerates font-rendering differences across runs
- Disabled check is multi-layer: root `pointer-events`, child `disabled` attrs, `aria-disabled`

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

> **⚠️ IMPORTANT:** Unit tests mock MUI components, so they do NOT catch visual issues like:
> - White text on white background (CSS color conflicts)
> - SCSS overriding MUI theme colors incorrectly  
> - Content being invisible despite being in the DOM
>
> You MUST run Playwright QA tests (step 7d) to catch these. Do NOT skip.

### 7c. Build verification
```bash
bunx tsc --noEmit --pretty
```

### 7d. Playwright QA tests — MANDATORY (catches ALL visual/CSS bugs unit tests miss)

**This is the single most critical verification step.** Unit tests mock MUI components — they CANNOT detect visual issues like invisible text, broken layouts, or CSS conflicts. The `.spec.ts` file runs in a REAL browser and catches everything automatically.

**The spec.ts includes Section 0 (Content Visibility Validation)** which programmatically checks:
- Element has non-zero dimensions (not collapsed/hidden)
- Element is not hidden via `display:none`, `visibility:hidden`, or `opacity:0`
- Text color vs background color has sufficient contrast (catches white-on-white)
- Every story variant (default, disabled, etc.) renders with visible content
- **These checks work on FIRST RUN — no screenshot baselines needed**

If Storybook is already running on port 6006, tests reuse it. Otherwise Playwright auto-starts it via `webServer` config.

**First run (creates baseline screenshots):**
```bash
npx playwright test --grep "{rdsPascal}" --project=chromium --update-snapshots
```

**Subsequent runs (detects regressions):**
```bash
npx playwright test --grep "{rdsPascal}" --project=chromium
```

**If ANY tests fail — diagnose and fix:**

| Failure | Root Cause | Fix |
|---|---|---|
| "has very low contrast" | SCSS overrides MUI theme bg/color | Remove blanket `.MuiXxx-root { background-color }`. Let MUI variant/color props handle it |
| "has zero dimensions" | Element in DOM but not rendered | Check `display`, `overflow`, `height` in SCSS |
| "Element hidden via CSS" | CSS hiding the element | Check `display:none`, `visibility:hidden`, `opacity:0` |
| Accessibility violation | Missing ARIA / contrast | Add `aria-*`, fix color contrast, add labels |
| Keyboard nav fails | MUI component not focusable | Add `tabIndex={0}` or check MUI handles it |
| Disabled state not blocking | Missing `disabled`/`aria-disabled` | Set on interactive elements + `pointer-events: none` |
| Console errors | React/MUI warnings | Fix the warning in element code |
| Snapshot mismatch | Visual regression | Inspect `playwright-report/`. Update baseline or fix element |
| Overflow at viewport | Missing responsive CSS | Check `overflow`, `max-width`, `box-sizing` |

**Repeat until ALL pass. Do NOT skip. Do NOT report as 'next steps'.**

**What Playwright QA tests cover (full checklist):**
| Check | What it validates |
|---|---|
| **Content visibility** | Element has non-zero size, is not CSS-hidden, text has contrast > 2:1 — **catches white-on-white** |
| **Variant rendering** | Every story variant renders with visible content |
| Responsive rendering | No overflow, non-zero dimensions at 375px / 768px / 1920px |
| Visual snapshots | Pixel-level regression detection per viewport |
| Accessibility audit | WCAG 2.1 AA compliance via axe-core |
| Keyboard navigation | Tab-focusable, Enter/Space don't crash |
| Hover state | Visual hover feedback captured |
| Focus-visible | Focus ring visible on keyboard navigation |
| Disabled state | Blocks pointer events + `disabled`/`aria-disabled` set |
| Theme variants | Light and dark theme render correctly |
| No console errors | Zero uncaught JS errors |
| Story variants load | Every Storybook story renders without crash |

### 7e. Final report (only after ALL pass including Playwright QA)
- All 6 files created
- MUI component wrapped + API page link
- Raaghu props → MUI prop mapping
- MUI props preserved via pass-through
- Unit test results (X tests passed)
- Playwright QA results (X tests passed — content visibility, responsiveness, a11y, keyboard, themes)
- Baseline screenshots created in `{rdsKebab}/{rdsKebab}.spec.ts-snapshots/`
- Next steps: update Figma `node-id=TODO`