---
name: component-refactoring
description: "Enterprise Design System Refactoring Platform for Raaghu React. Audits and refactors components to use centralized design tokens covering colors, spacing, typography, breakpoints, MUI sx props, shadows, z-index, and transitions. Detects duplicate styles, scores token coverage, generates dependency graphs, and enforces lint rules to prevent future regressions. Single source of truth enables application-wide updates from one file."
version: 2.0
category: component-modernization
applyTo: []
---

# Component Refactoring Agent v2.0
## Enterprise Design System Refactoring Platform

## Purpose

Fully audit and refactor Raaghu React components to use centralized design tokens covering:

- **Colors** — hex/RGB/HSL -> SCSS variables + CSS custom properties
- **Spacing** — hardcoded px/rem -> design tokens (`$spacing-*`, `--rds-spacing-*`)
- **Typography** — hardcoded font sizes, weights, families -> typography tokens
- **Breakpoints** — hardcoded `@media` queries -> `$breakpoint-*` tokens
- **MUI `sx` props** — inline styles bypassing the MUI theme -> `theme.*` accessors
- **Shadows / z-index / transitions** — hardcoded values -> centralized tokens
- **Duplicate styles** — repeated `sx` objects / SCSS blocks -> shared components or mixins
- **Component variants** — custom one-off styles -> standardized `variant=` props

This agent produces measurable output:
- Token Coverage Report (per category, per file)
- Design System Health Score (A-F grade)
- Theme Dependency Graph
- Lint rule scaffolding to prevent future regressions

## What This Agent Does

When invoked with a component name, the agent:

1. **Locates** all files for the component (TSX, SCSS, test files)
2. **Audits** hardcoded values across all 8 style categories
3. **Detects** MUI `sx` props that bypass theme tokens
4. **Detects** duplicate style blocks across the codebase
5. **Detects** components that should use standardized variants instead of custom styles
6. **Applies** refactoring using SCSS variables, CSS custom properties, and MUI theme accessors
7. **Scores** token coverage before and after (per category + overall grade)
8. **Validates** the changes compile and pass tests
9. **Reports** the Theme Dependency Graph impact
10. **Creates** a git commit with full before/after metrics

## Usage

```
@github.copilot /refactor-component rds-button
@github.copilot /refactor-component rds-comp-data-grid
@github.copilot /refactor-component rds-card
```

---

## STRICT SAFETY RULES (NEVER VIOLATE)

> These rules prevent codebase corruption. Violating them has previously caused broken builds and SCSS syntax errors.

1. **NEVER modify `*.stories.tsx` files** — Story files are managed separately by the development team.
2. **NEVER run bulk regex replacements via shell scripts** — No PowerShell, sed, awk, or scripted mass-replace on SCSS files. Use only targeted, line-specific file edits.
3. **NEVER inject non-SCSS code into `.scss` files** — PowerShell blocks (`param($m)`, `$var = switch(...)`) in SCSS files corrupt the build.
4. **NEVER use `Nvar()` syntax** — `6var(--token)` is invalid CSS. Use `calc(N * var(--token))`.
5. **NEVER leave `var()` with empty parentheses** — Always include the token name: `var(--rds-primary-main)`.
6. **Always use targeted, line-specific edits** — Replace one block at a time, include 3+ lines of context before/after.
7. **Validate each change before moving to the next file** — Check SCSS compiles cleanly after every edit.

---

## Step-by-Step Process

### Step 1: Component Discovery

- Search for component in `raaghu-elements/` and `raaghu-components/`
- Identify all related files: `.tsx`, `.scss`, `.test.tsx`
- List every file that will be modified before making any changes

---

### Step 2: Full-Spectrum Hardcoded Value Audit

Run all detection scans and report counts per category:

#### 2a. Colors (SCSS + TSX)

Patterns to detect:
- `#[0-9a-fA-F]{3,8}` — hex colors
- `rgb\(` — rgb() colors
- `rgba\(` — rgba() colors
- `hsl\(` / `hsla\(` — hsl colors

Report: N hardcoded color values found in X files

#### 2b. Spacing (SCSS + TSX)

Patterns to detect (NOT already using var()):
- `padding:\s*\d+px` — direct pixel padding
- `margin:\s*\d+px` — direct pixel margin
- `gap:\s*\d+px` — direct pixel gap
- `\d+(\.\d+)?rem` — non-token rem values

Report: N hardcoded spacing values found

#### 2c. Typography

Patterns to detect:
- `font-size:\s*\d` — hardcoded font size
- `font-weight:\s*[4-9]\d\d` — hardcoded numeric weight
- `font-family:[^;$v]` — hardcoded font family string
- `line-height:\s*\d` — hardcoded line height
- `letter-spacing:\s*[\d.]` — hardcoded letter spacing

Report: N hardcoded typography values found

#### 2d. Breakpoints

Patterns to detect:
- `@media.*max-width:\s*\d+px` — hardcoded max-width breakpoint
- `@media.*min-width:\s*\d+px` — hardcoded min-width breakpoint

Report: N hardcoded breakpoints found

#### 2e. MUI sx Props Bypassing Theme

Patterns to detect in TSX files:
- `sx={{...color: "#` — hardcoded color in sx
- `sx={{...backgroundColor: "#` — hardcoded bg in sx
- `sx={{...borderRadius: "\d` — hardcoded radius string in sx
- `sx={{...fontSize: "\d` — hardcoded font size string in sx
- `sx={{...fontWeight: \d` — hardcoded numeric weight in sx
- `sx={{...boxShadow: "` — hardcoded shadow string in sx
- `sx={{...zIndex: \d` — hardcoded z-index number in sx

Report: N sx props bypassing theme found

#### 2f. Shadows, z-index, Transitions

Patterns to detect:
- `box-shadow:\s*\d` — hardcoded shadow (not a variable)
- `z-index:\s*\d+` — hardcoded z-index
- `transition:[^$v]` — transition not using a token variable

#### 2g. Duplicate Style Blocks

Strategy:
- Collect all sx={{ ... }} object literals from TSX files across the codebase
- Collect repeated SCSS class blocks (same property+value combos in 3+ files)
- Flag any sx object or SCSS block appearing in 3 or more places

Report: N duplicate style patterns found across X files  
Suggestion: extract to shared component or SCSS mixin

#### 2h. Non-Standardized Component Variants

Strategy:
- Find Button/Badge/Alert/Card with inline overrides instead of variant prop
- Flag: `<Button style={{color:'#d32f2f'}}>` where `variant="danger"` should be used
- Flag: `<Card sx={{p:2, borderRadius:2}}>` that duplicates default RdsCard styling

Report: N variant standardization opportunities found

---

### Step 3: Token Coverage Score (Before)

Calculate and display the pre-refactoring score:

```
TOKEN COVERAGE REPORT - BEFORE
Component: <component-name>

  Colors:      [X]%   ([tokenized] / [total] values)
  Spacing:     [X]%
  Typography:  [X]%
  Breakpoints: [X]%
  MUI sx:      [X]%   ([compliant props] / [total sx props])
  Shadows:     [X]%
  Transitions: [X]%
  z-index:     [X]%

  Overall:     [weighted avg]%

DESIGN SYSTEM HEALTH SCORE
  Centralization:      [X]%
  Hardcoded Styles:    [X]%
  Theme Compliance:    [X]%
  MUI Compliance:      [X]%
  Responsive Tokens:   [X]%

  Overall Grade: [A+/A/A-/B+/B/B-/C/D/F]
```

Grading scale:

| Score   | Grade |
|---------|-------|
| 95-100% | A+    |
| 90-94%  | A     |
| 85-89%  | A-    |
| 80-84%  | B+    |
| 75-79%  | B     |
| 70-74%  | B-    |
| 60-69%  | C     |
| 50-59%  | D     |
| < 50%   | F     |

---

### Step 4: Refactoring Strategy

**CSS Variable First Architecture (preferred for runtime theming):**

```
raaghu-react-theme.scss     <- SCSS variables (build-time source of truth)
         |
custom-properties.scss      <- CSS custom properties (runtime theming, dark/light)
         |
MUI theme adapter            <- theme.palette / theme.spacing / theme.typography
         |
Components                   <- SCSS files + TSX sx props consuming all of the above
```

This layered approach enables:
- Build-time theming via SCSS variables
- Runtime dark/light switching via CSS custom properties (zero rebuild)
- MUI component consistency via the MUI theme adapter
- User/brand customization at the CSS variable layer

Identify the correct refactoring target for each hardcoded value:

| Value Type    | SCSS Variable          | CSS Custom Property          | MUI Accessor                      |
|---------------|------------------------|------------------------------|-----------------------------------|
| Brand color   | `$primary-color`       | `var(--rds-primary-main)`    | `theme.palette.primary.main`      |
| Background    | `$background-light`    | `var(--rds-bg-light)`        | `theme.palette.background.default`|
| Text color    | `$text-dark`           | `var(--rds-text-dark)`       | `theme.palette.text.primary`      |
| Spacing       | `$spacing-md`          | `var(--rds-spacing-md)`      | `theme.spacing(2)`                |
| Font size     | `$font-size-md`        | `var(--rds-font-size-md)`    | `theme.typography.body1.fontSize` |
| Font weight   | `$font-weight-medium`  | `var(--rds-font-weight-med)` | `theme.typography.fontWeightMedium`|
| Border radius | `$border-radius-md`    | `var(--rds-border-radius-md)`| `theme.shape.borderRadius`        |
| Shadow        | `$elevation-2`         | `var(--rds-elevation-2)`     | `theme.shadows[2]`                |
| z-index       | `$z-index-modal`       | `var(--rds-z-index-modal)`   | `theme.zIndex.modal`              |
| Breakpoint    | `$breakpoint-md`       | —                            | `theme.breakpoints.down("md")`    |

---

### Step 5: Apply Changes

#### 5a. SCSS File - Colors

```scss
// Before
background-color: #1976d2;
color: #424242;
border-color: rgba(0,0,0,0.12);

// After
background-color: $primary-color;
color: $text-dark;
border-color: $border-light;
```

#### 5b. SCSS File - Spacing

```scss
// Before
padding: 16px;
margin: 8px 16px;
gap: 4px;

// After
padding: $spacing-md;
margin: $spacing-sm $spacing-md;
gap: $spacing-xs;
```

#### 5c. SCSS File - Typography

```scss
// Before
font-size: 14px;
font-weight: 500;
font-family: "Roboto", sans-serif;
line-height: 1.5;
letter-spacing: 0.02em;

// After
font-size: $font-size-md;
font-weight: $font-weight-medium;
font-family: $font-family-base;
line-height: $line-height-base;
letter-spacing: $letter-spacing-normal;
```

#### 5d. SCSS File - Breakpoints

```scss
// Before
@media (max-width: 768px) { ... }
@media (min-width: 1024px) { ... }

// After
@media (max-width: $breakpoint-md) { ... }
@media (min-width: $breakpoint-lg) { ... }
```

#### 5e. SCSS File - Shadows / z-index / Transitions

```scss
// Before
box-shadow: 0 2px 8px rgba(0,0,0,0.15);
z-index: 1000;
transition: all 0.3s ease;

// After
box-shadow: $elevation-2;
z-index: $z-index-dropdown;
transition: $transition-base;
```

#### 5f. MUI sx Props - Replace All Inline Values

```tsx
// Before - bypasses MUI theme entirely
<Box sx={{
  color: "#1976d2",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  zIndex: 1300
}} />

// After - uses MUI theme tokens throughout
<Box sx={{
  color: "primary.main",
  backgroundColor: "background.default",
  p: 2,
  borderRadius: 1,
  fontSize: "body2.fontSize",
  fontWeight: "fontWeightMedium",
  boxShadow: 2,
  zIndex: "modal"
}} />
```

MUI sx shorthand token reference:

| Category      | Hardcoded (before)   | MUI Token (after)           |
|---------------|----------------------|-----------------------------|
| Color         | `"#1976d2"`          | `"primary.main"`            |
| Background    | `"#fff"`             | `"background.paper"`        |
| Spacing       | `"16px"`             | `2` (theme.spacing units)   |
| Border radius | `"8px"`              | `1` (borderRadius units)    |
| Shadow        | `"0 2px ..."`        | `2` (theme.shadows index)   |
| z-index       | `1300`               | `"modal"`                   |
| Font size     | `"14px"`             | `"body2.fontSize"`          |
| Font weight   | `500`                | `"fontWeightMedium"`        |

#### 5g. Duplicate Style Consolidation

When the same sx object appears in 3+ files, use the shared Raaghu component:

```tsx
// Before - same pattern in 15 files
<Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }} />

// After - use the shared component (correct defaults built in)
<RdsCard />
```

When the same SCSS block appears in 3+ files, extract to a mixin in raaghu-react-theme.scss:

```scss
// Before - repeated in many files
.element { display: flex; align-items: center; gap: 8px; }

// After - shared mixin
@mixin rds-flex-row($gap: $spacing-sm) {
  display: flex;
  align-items: center;
  gap: $gap;
}
.element { @include rds-flex-row; }
```

#### 5h. Component Variant Standardization

```tsx
// Before - custom one-off red styling
<Button sx={{ backgroundColor: "#d32f2f", color: "#fff" }}>Delete</Button>

// After - standardized variant
<Button variant="danger">Delete</Button>
```

Standardized variants to enforce:
- **Button**: `primary | secondary | outlined | danger | ghost | link`
- **Badge**: `default | primary | success | warning | danger | info`
- **Alert**: `success | warning | error | info`
- **Card**: `default | elevated | outlined | flat`

---

### Step 6: Token Coverage Score (After)

Re-run the same audit and display the improvement:

```
TOKEN COVERAGE REPORT - AFTER
Component: <component-name>

                  BEFORE    AFTER     CHANGE
  Colors:          42%  ->   100%    +58%
  Spacing:         67%  ->   100%    +33%
  Typography:      20%  ->    95%    +75%
  Breakpoints:      0%  ->   100%   +100%
  MUI sx:          15%  ->    92%    +77%
  Shadows:         50%  ->   100%    +50%
  Transitions:     33%  ->   100%    +67%
  z-index:         25%  ->   100%    +75%

  Overall:         32%  ->    98%    +66%

DESIGN SYSTEM HEALTH SCORE
  Centralization:      98%   (was 32%)
  Hardcoded Styles:     2%   (was 68%)
  Theme Compliance:    98%
  MUI Compliance:      92%
  Responsive Tokens:  100%

  Overall Grade: A+  (was F)
```

---

### Step 7: Theme Dependency Graph

After refactoring, output the dependency chain to show propagation impact:

```
THEME DEPENDENCY GRAPH

raaghu-react-theme.scss
  |-- custom-properties.scss
        |-- rds-button.scss          <- component just refactored
        |     |-- rds-comp-toolbar.scss
        |     `-- rds-comp-filter-button.scss
        |-- rds-card.scss
        |     |-- rds-comp-kanban-board.scss
        |     `-- rds-comp-grid.scss
        `-- rds-input.scss
              `-- rds-comp-data-grid.scss

Impact: Changing $primary-color in raaghu-react-theme.scss
        now propagates to 7 dependent components automatically.
```

To build this graph:
1. Read every `.scss` file`s `@import` / `@use` statements
2. Build a directed graph: `theme.scss -> element.scss -> composite.scss`
3. For the refactored component, show its position and all downstream dependents

---

### Step 8: Validation

After all changes, confirm every item below passes:

- No SCSS syntax errors — file compiles cleanly (bun run tsc --noEmit)
- No hardcoded hex colors — grep: 0 matches for `#[0-9a-fA-F]{3,8}`
- No hardcoded px spacing — spacing properties use `$spacing-*` or `var(--rds-spacing-*)`
- No hardcoded typography — `font-size` and `font-weight` use variables
- No hardcoded breakpoints — all `@media` queries use `$breakpoint-*`
- No sx props with literal colors — grep: 0 matches for `sx.*color.*#`
- Token coverage >= 95% per category
- Design System Health Grade >= A-
- Visual appearance unchanged

---

### Step 9: Testing

```bash
bun run tsc --noEmit
npm run test -- <component-name> --watch=false
npm run build
```

---

### Step 10: Story Updates (SKIPPED - DO NOT MODIFY STORIES)

`*.stories.tsx` files must NEVER be modified by this agent.
Storybook story changes are handled separately by the development team.

---

### Step 11: Lint Rule Scaffolding

After refactoring the component, scaffold lint rules to prevent future hardcoding.
Only add these if the project already uses the relevant tool.

#### Stylelint (SCSS/CSS)

```js
// stylelint.config.js
{
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-disallowed-list": {
      "padding":       ["/^\\d+px$/"],
      "margin":        ["/^\\d+px$/"],
      "gap":           ["/^\\d+px$/"],
      "font-size":     ["/^\\d+px$/"],
      "border-radius": ["/^\\d+px$/"]
    }
  }
}
```

#### ESLint (TSX - MUI sx props)

```js
// eslint.config.js
{
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='color'] > Literal[value=/^#/]",
        message: "Use a theme.palette token string (e.g. 'primary.main') instead of a hardcoded color in sx."
      },
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='backgroundColor'] > Literal[value=/^#/]",
        message: "Use a theme.palette token string instead of a hardcoded backgroundColor in sx."
      },
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='borderRadius'] > Literal[value=/px$/]",
        message: "Use a numeric theme.shape.borderRadius multiplier instead of a px string in sx."
      },
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='fontSize'] > Literal[value=/px$/]",
        message: "Use a typography token string (e.g. 'body2.fontSize') instead of a px string in sx."
      }
    ]
  }
}
```

---

### Step 12: Commit and Report

```
refactor(<component-name>): migrate to centralized design tokens (v2)

TOKEN COVERAGE IMPROVEMENT:
  Colors:      42% -> 100%  (+58%)
  Spacing:     67% -> 100%  (+33%)
  Typography:  20% ->  95%  (+75%)
  Breakpoints:  0% -> 100% (+100%)
  MUI sx:      15% ->  92%  (+77%)
  Overall:     32% ->  98%  (+66%)

DESIGN SYSTEM HEALTH:
  Before: F (32%)
  After:  A+ (98%)

CHANGES:
  - Replaced N hardcoded colors with $primary-color / var(--rds-*)
  - Replaced N hardcoded spacing values with $spacing-* tokens
  - Replaced N hardcoded typography values with $font-size-* / $font-weight-*
  - Replaced N hardcoded @media breakpoints with $breakpoint-* tokens
  - Refactored N MUI sx props to use theme.palette / theme.spacing
  - Consolidated N duplicate style patterns
  - Standardized N component variants (variant="danger" etc.)

THEME DEPENDENCY GRAPH:
  raaghu-react-theme.scss -> custom-properties.scss -> <component>.scss
  Downstream: N dependent composite components now auto-update

ARCHITECTURE: SCSS Variables -> CSS Custom Properties -> MUI Theme -> Components

FILES MODIFIED:
  - <component>.scss
  - <component>.tsx  (sx props and useTheme() updates only)
  NOT MODIFIED: *.stories.tsx

NO BREAKING CHANGES. Visual appearance unchanged. All tests pass.
```

---

## Token Reference Map

### Colors

```scss
$primary-color:    #7825E9;   -> var(--rds-primary-main)       -> theme.palette.primary.main
$primary-light:    #9d4edd;   -> var(--rds-primary-light)      -> theme.palette.primary.light
$primary-dark:     #5a189a;   -> var(--rds-primary-dark)       -> theme.palette.primary.dark
$secondary-color:  #FF6B6B;   -> var(--rds-secondary-main)     -> theme.palette.secondary.main
$background-light: #f5f5f5;   -> var(--rds-bg-light)           -> theme.palette.background.default
$background-dark:  #1a1a1a;   -> var(--rds-bg-dark)            -> theme.palette.background.paper
$text-dark:        #424242;   -> var(--rds-text-dark)           -> theme.palette.text.primary
$text-light:       #ffffff;   -> var(--rds-text-light)          -> theme.palette.text.secondary
$border-light:     #e0e0e0;   -> var(--rds-border-light)        -> theme.palette.divider
$border-dark:      #424242;   -> var(--rds-border-dark)
$error-color:      #d32f2f;   -> var(--rds-error-main)          -> theme.palette.error.main
$success-color:    #388e3c;   -> var(--rds-success-main)        -> theme.palette.success.main
$warning-color:    #f57c00;   -> var(--rds-warning-main)        -> theme.palette.warning.main
$info-color:       #0288d1;   -> var(--rds-info-main)           -> theme.palette.info.main
```

### Spacing

```scss
$spacing-xs:   4px;  -> var(--rds-spacing-xs)   -> theme.spacing(0.5)
$spacing-sm:   8px;  -> var(--rds-spacing-sm)   -> theme.spacing(1)
$spacing-md:  16px;  -> var(--rds-spacing-md)   -> theme.spacing(2)
$spacing-lg:  24px;  -> var(--rds-spacing-lg)   -> theme.spacing(3)
$spacing-xl:  32px;  -> var(--rds-spacing-xl)   -> theme.spacing(4)
$spacing-2xl: 48px;  -> var(--rds-spacing-2xl)  -> theme.spacing(6)
$spacing-3xl: 64px;  -> var(--rds-spacing-3xl)  -> theme.spacing(8)
```

### Typography

```scss
$font-family-base:       "Roboto", "Helvetica Neue", sans-serif;
$font-size-xs:    10px;  -> var(--rds-font-size-xs)   -> theme.typography.caption.fontSize
$font-size-sm:    12px;  -> var(--rds-font-size-sm)   -> theme.typography.body2.fontSize
$font-size-md:    14px;  -> var(--rds-font-size-md)   -> theme.typography.body1.fontSize
$font-size-lg:    16px;  -> var(--rds-font-size-lg)   -> theme.typography.subtitle1.fontSize
$font-size-xl:    20px;  -> var(--rds-font-size-xl)   -> theme.typography.h5.fontSize
$font-size-2xl:   24px;  -> var(--rds-font-size-2xl)  -> theme.typography.h4.fontSize

$font-weight-regular: 400; -> var(--rds-font-weight-regular) -> theme.typography.fontWeightRegular
$font-weight-medium:  500; -> var(--rds-font-weight-medium)  -> theme.typography.fontWeightMedium
$font-weight-bold:    700; -> var(--rds-font-weight-bold)    -> theme.typography.fontWeightBold

$line-height-base:       1.5;
$line-height-tight:      1.25;
$letter-spacing-normal:  0.02em;
$letter-spacing-wide:    0.05em;
```

### Breakpoints

```scss
$breakpoint-xs:    0px;
$breakpoint-sm:  600px;   -> theme.breakpoints.down("sm")
$breakpoint-md:  900px;   -> theme.breakpoints.down("md")
$breakpoint-lg: 1200px;   -> theme.breakpoints.down("lg")
$breakpoint-xl: 1536px;   -> theme.breakpoints.down("xl")
```

### Shadows, z-index, Transitions

```scss
$elevation-0: none;
$elevation-1: 0 1px 3px rgba(0,0,0,0.12);    -> var(--rds-elevation-1)  -> theme.shadows[1]
$elevation-2: 0 3px 6px rgba(0,0,0,0.16);     -> var(--rds-elevation-2)  -> theme.shadows[2]
$elevation-3: 0 10px 20px rgba(0,0,0,0.19);   -> var(--rds-elevation-3)  -> theme.shadows[4]
$elevation-4: 0 14px 28px rgba(0,0,0,0.25);   -> var(--rds-elevation-4)  -> theme.shadows[8]

$z-index-dropdown:  1000;  -> var(--rds-z-index-dropdown) -> theme.zIndex.tooltip - 300
$z-index-sticky:    1020;
$z-index-modal:     1300;  -> var(--rds-z-index-modal)    -> theme.zIndex.modal
$z-index-popover:   1400;  -> var(--rds-z-index-popover)  -> theme.zIndex.popover
$z-index-tooltip:   1500;  -> var(--rds-z-index-tooltip)  -> theme.zIndex.tooltip

$transition-fast:   all 0.1s ease-in-out;
$transition-base:   all 0.2s ease-in-out;
$transition-slow:   all 0.3s ease-in-out;
$transition-colors: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
```

### Border Radius

```scss
$border-radius-none: 0;
$border-radius-sm:    4px;    -> var(--rds-border-radius-sm)   -> theme.shape.borderRadius * 0.5
$border-radius-md:    8px;    -> var(--rds-border-radius-md)   -> theme.shape.borderRadius
$border-radius-lg:   12px;    -> var(--rds-border-radius-lg)   -> theme.shape.borderRadius * 1.5
$border-radius-xl:   16px;    -> var(--rds-border-radius-xl)   -> theme.shape.borderRadius * 2
$border-radius-full: 9999px;  -> var(--rds-border-radius-full)
```

---

## Component Refactoring Priority

### CRITICAL (Phase 1)
1. **rds-button** — Used everywhere, blocks all other work
2. **rds-input** — Foundation of all form components
3. **rds-select** — Foundation of all form components
4. **rds-comp-data-grid** — 100% hardcoded, high visibility

### HIGH (Phase 2)
5. **rds-card** — Used inside most composite components
6. **rds-modal** — z-index and spacing issues
7. **rds-comp-filter-button** — 80% hardcoded
8. **rds-carousel** — Mixed hardcoded/tokens

### MEDIUM (Phase 3+)
9. **rds-checkbox, rds-radio** — Border and color
10. **rds-avatar, rds-badge, rds-banner** — Background color
11. **rds-backdrop, rds-tooltip** — Color and z-index
12. All remaining elements and composite components

---

## Reference Files

| File | Purpose |
|---|---|
| `raaghu-react-themes/src/styles/raaghu-react-theme.scss` | Primary source of truth - all SCSS tokens |
| `raaghu-react-themes/src/styles/custom-properties.scss` | CSS custom properties (runtime theming) |
| `raaghu-react-themes/src/styles/variables/color-variables.scss` | Color palette definitions |
| `raaghu-react-themes/src/mui-theme-adapter.ts` | MUI ThemeProvider config |
| `raaghu-react-themes/tokens/design-tokens.ts` | TypeScript token definitions |
| `utils/griffel/GriffelProvider.tsx` | Griffel CSS-in-JS wrapper |

---

## Rollback

If validation fails at any step:

```bash
git restore <component>.scss
git restore <component>.tsx
```

Then report: which detection category failed, which specific value caused the issue, and the recommended manual intervention point.

---

**Agent Version:** 2.0
**Last Updated:** May 2026
**Status:** Production Ready - Enterprise Design System Refactoring Platform
