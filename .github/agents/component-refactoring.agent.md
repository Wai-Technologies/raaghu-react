---
name: component-refactoring
description: "Enterprise Design System Refactoring Agent for Raaghu React. Audits and refactors components to use centralized design tokens. Pipeline: design-tokens.ts -> build-rds-css-vars.ts -> injectTokens() -> --rds-* CSS vars -> SCSS + MUI palette."
version: 3.0
category: component-modernization
applyTo: []
---

# Component Refactoring Agent v3.0
## Enterprise Design System Refactoring Platform

---

## ARCHITECTURE (read this first - do not assume old file structure)

The Raaghu design token pipeline works like this:

design-tokens.ts          <- human-edited source of truth (TypeScript)
       |
build-rds-css-vars.ts     <- pure projection, zero raw hex (TypeScript)
       |
injectTokens(mode)        <- sets --rds-* on document.documentElement
       |
       +---> SCSS files   <- consume var(--rds-*)
       +---> MUI palette  <- palette entries use var(--rds-*) strings
       +---> brandOverrides <- applied on top for white-labeling

## ACTUAL SOURCE OF TRUTH FILES

| File | Purpose |
|---|---|
| `raaghu-react-themes/tokens/design-tokens.ts` | All token values - edit here only |
| `raaghu-react-themes/tokens/build-rds-css-vars.ts` | Injects --rds-* vars at runtime |
| `raaghu-react-themes/src/provider/RaaghuThemeProvider.tsx` | React provider |
| `raaghu-react-themes/src/provider/theme-utils.ts` | applyRaaghuTheme(), RaaghuThemeMode type |
| `raaghu-react-themes/src/mui/light.theme.ts` | MUI light theme |
| `raaghu-react-themes/src/mui/dark.theme.ts` | MUI dark theme |
| `raaghu-react-themes/src/mui/overrides.ts` | MUI component overrides |
| `scripts/check-hex-in-scss.sh` | CI hex gate script |
| `scripts/hex-baseline.txt` | Current allowed hex count |

DO NOT reference or look for:
- raaghu-react-theme.scss (removed)
- custom-properties.scss (removed)
- color-variables.scss (removed)
- _tokens.scss (removed)
- css-vars/light-vars.scss (removed)

---

## STRICT SAFETY RULES (NEVER VIOLATE)

1. NEVER modify *.stories.tsx files
2. NEVER run bulk regex via shell scripts (no PowerShell sed/awk mass replace)
3. NEVER inject non-SCSS code into .scss files
4. NEVER use Nvar() syntax - use calc(N * var(--token))
5. NEVER leave var() with empty parentheses
6. NEVER add raw hex inside build-rds-css-vars.ts - if a color is needed, add it to design-tokens.ts first
7. Always use targeted line-specific edits with 3+ lines context
8. Validate after every file - not at the end of a batch
9. NEVER replace var(--rds-*, #fallback) - the fallback hex is intentional

---

## Usage

@github-copilot refactor rds-button
@github-copilot refactor rds-comp-data-grid
@github-copilot refactor rds-badge

---

## Step 1: Component Discovery

Search in raaghu-elements/ and raaghu-components/
List all related files: .tsx, .scss, .test.tsx
DO NOT list *.stories.tsx - they will not be modified

---

## Step 2: Full Audit - All 8 Categories

### 2a. Colors

Scan for bare hex NOT inside var():
  Pattern: #[0-9a-fA-F]{3,8}
  Exclude: lines matching var(--rds-*, #hex) - those are valid fallbacks
  Exclude: lines starting with // or /* (comments)

Also scan for bare rgba() not inside var():
  Pattern: rgba\(\d

Report: N bare hex, M bare rgba found

### 2b. Spacing

Scan for hardcoded px NOT already using var(--rds-spacing-*):
  padding:\s*\d+px
  margin:\s*\d+px
  gap:\s*\d+px
  width:\s*\d+px (fixed widths only, not percentages)

Report: N hardcoded spacing values found

### 2c. Typography

Scan for:
  font-size:\s*\d+px  (not using var(--rds-font-size-*))
  font-weight:\s*[4-9]\d\d  (not using var(--rds-font-weight-*))
  font-family:[^v;] (not using var(--rds-font-family-*))

Report: N hardcoded typography values found

### 2d. Breakpoints

Scan for:
  @media.*max-width:\s*\d+px  (not using var(--rds-breakpoint-*))
  @media.*min-width:\s*\d+px

Report: N hardcoded breakpoints found

### 2e. MUI sx Props

Scan .tsx files for sx props with literal values:
  sx={{.*color.*"#    <- hardcoded hex color
  sx={{.*fontSize.*"  <- hardcoded font size string
  sx={{.*fontWeight.*\d  <- hardcoded numeric weight
  sx={{.*borderRadius.*"  <- hardcoded radius
  sx={{.*boxShadow.*"  <- hardcoded shadow string
  sx={{.*zIndex.*\d   <- hardcoded z-index number

Report: N sx props bypassing theme tokens

### 2f. Shadows / z-index / Transitions

Scan for:
  box-shadow:\s*\d  (not var(--rds-elevation-*))
  z-index:\s*\d+    (not var(--rds-z-index-*))

  ALSO CHECK: z-index values in range 100-700
  (old scale - should be 1000+ in new scale)

Report: N hardcoded shadows, M hardcoded z-index values
Flag any z-index below 1000 as CRITICAL

### 2g. Legacy Variable Check (CRITICAL)

Scan for any --txt-* variable usage:
  var(--txt-

Expected: 0 results
If found: CRITICAL - these vars are never injected
Flag: replace with --rds-text-primary / --rds-text-secondary

### 2h. Missing Injected Vars Check

For any var(--rds-*) used in the component SCSS,
verify the variable name exists in build-rds-css-vars.ts.

If a var(--rds-xyz) is used but not injected:
  Flag as: UNINJECTED VAR - will silently fall back to browser default

### 2i. Duplicate Style Check

Collect sx={{...}} object literals from the component TSX.
Check if the same object appears in 3+ other files.
If yes: flag for extraction to shared component or hook.

---

## Step 3: Token Coverage Score (Before)

```
TOKEN COVERAGE REPORT - BEFORE
Component: <name>

  Colors:      X%  (tokenized / total bare values)
  Spacing:     X%
  Typography:  X%
  Breakpoints: X%
  MUI sx:      X%
  Shadows:     X%
  z-index:     X%
  Legacy vars: PASS / FAIL (--txt-* found or not)
  Missing vars: N vars used but not injected

  Overall: X%
  Grade: [A+/A/A-/B+/B/B-/C/D/F]
```

Grading:
  95-100% = A+
  90-94%  = A
  85-89%  = A-
  80-84%  = B+
  75-79%  = B
  70-74%  = B-
  60-69%  = C
  50-59%  = D
  < 50%   = F

---

## Step 4: Refactoring Strategy

Primary target: CSS custom properties (runtime theming)
Secondary: SCSS variables only if custom property not available
Never: hardcoded values

| Value type | Use this |
|---|---|
| Any color | var(--rds-primary-main) etc |
| Spacing | var(--rds-spacing-sm/md/lg) |
| Font size | var(--rds-font-size-sm/md/lg) |
| Font weight | var(--rds-font-weight-regular/medium/bold) |
| Border radius | var(--rds-border-radius-sm/md/lg) |
| Shadow | var(--rds-elevation-1/2/3/4) |
| z-index | var(--rds-z-index-dropdown/modal/tooltip) |
| Breakpoint | var(--rds-breakpoint-sm/md/lg/xl) |

If no --rds-* var exists for a value:
  1. Add token to design-tokens.ts
  2. Add injection in build-rds-css-vars.ts
  3. THEN use var(--rds-new-token) in the component
  NEVER hardcode the value directly in the component

---

## Step 5: Apply Changes

### SCSS Colors
```scss
/* Before */
background-color: #3C98FF;
color: #424242;
border: 1px solid rgba(0,0,0,0.12);

/* After */
background-color: var(--rds-primary-main);
color: var(--rds-text-primary);
border: 1px solid var(--rds-border-default);
```

### SCSS Spacing
```scss
/* Before */
padding: 16px;
margin: 8px 16px;
gap: 4px;

/* After */
padding: var(--rds-spacing-md);
margin: var(--rds-spacing-sm) var(--rds-spacing-md);
gap: var(--rds-spacing-xs);
```

### SCSS Typography
```scss
/* Before */
font-size: 14px;
font-weight: 500;

/* After */
font-size: var(--rds-font-size-md);
font-weight: var(--rds-font-weight-medium);
```

### SCSS Breakpoints
```scss
/* Before */
@media (max-width: 768px) { ... }

/* After */
@media (max-width: var(--rds-breakpoint-md)) { ... }
```

Note: var() in @media has limited browser support in older Safari.
If targeting older Safari, use the static px value from
breakpointTokens as a comment reference:
/* --rds-breakpoint-md = 900px */
@media (max-width: 900px) { ... }

### SCSS z-index
```scss
/* Before - OLD SCALE */
z-index: 500;

/* Before - raw number */
z-index: 1300;

/* After - always use var() */
z-index: var(--rds-z-index-modal);
```

### MUI sx Props
```tsx
/* Before */
<Box sx={{
  color: "#3C98FF",
  backgroundColor: "#f5f5f5",
  fontSize: "14px",
  fontWeight: 500,
  zIndex: 1300
}} />

/* After - MUI theme tokens */
<Box sx={{
  color: "primary.main",
  backgroundColor: "background.default",
  fontSize: "body2.fontSize",
  fontWeight: "fontWeightMedium",
  zIndex: "modal"
}} />
```

### Legacy --txt-* Variables
```scss
/* Before - CRITICAL, these vars are never injected */
color: var(--txt-neutral-default);
background: var(--txt-primary-bg);

/* After */
color: var(--rds-text-primary);
background: var(--rds-surface-default);
```

---

## Step 6: Token Coverage Score (After)

```
TOKEN COVERAGE REPORT - AFTER
Component: <name>

              BEFORE  AFTER   CHANGE
  Colors:      X%  ->  Y%    +Z%
  Spacing:     X%  ->  Y%    +Z%
  Typography:  X%  ->  Y%    +Z%
  Breakpoints: X%  ->  Y%    +Z%
  MUI sx:      X%  ->  Y%    +Z%
  Shadows:     X%  ->  Y%    +Z%
  z-index:     X%  ->  Y%    +Z%
  Legacy vars: FAIL -> PASS
  Missing vars: N  ->  0

  Overall: X% -> Y%
  Grade: [before] -> [after]
```

---

## Step 7: Theme Dependency Graph

Show the actual pipeline impact:

```
design-tokens.ts
       |
build-rds-css-vars.ts
       |
injectTokens() -> :root { --rds-* }
       |
       +---> <component>.scss (just refactored)
       |       +---> rds-comp-*.scss (dependents)
       |
       +---> MUI palette var(--rds-primary-main)
               +---> MuiButton, MuiTextField, etc.

Impact: changing colorTokens.primary[700] in design-tokens.ts
now propagates to this component automatically.
```

---

## Step 8: Validation

After all changes confirm:

1. TypeScript compiles:
   tsc --noEmit
   Expected: zero errors

2. Zero bare hex in modified files:
   grep -n '#[0-9a-fA-F]\{3,8\}' <component>.scss \
   | grep -v 'var(--rds'
   Expected: 0 results

3. Zero legacy --txt-* vars:
   grep -n 'var(--txt-' <component>.scss
   Expected: 0 results

4. Zero old z-index scale values:
   grep -n 'z-index:' <component>.scss \
   | grep -v 'var(--rds' \
   | grep -E '[1-9][0-9]{2}$'
   Expected: 0 results (no values below 1000)

5. All var(--rds-*) used are actually injected:
   For each var(--rds-xyz) in the component,
   confirm --rds-xyz exists in build-rds-css-vars.ts

6. CI hex gate still passes:
   bash scripts/check-hex-in-scss.sh
   Expected: exits 0

---

## Step 9: Testing

tsc --noEmit
npm run test -- <component-name> --watch=false

---

## Step 10: Stories - DO NOT MODIFY

*.stories.tsx files must NEVER be changed by this agent.

---

## Step 11: Lint Rule Scaffolding

Only add if project already uses the tool.

### Stylelint - SCSS bare hex only
```js
// stylelint.config.js
// NOTE: do NOT use "color-no-hex: true" - it flags valid fallbacks
// Use a custom regex pattern instead:
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "color":            ["/^#[0-9a-fA-F]/"],
      "background-color": ["/^#[0-9a-fA-F]/"],
      "border-color":     ["/^#[0-9a-fA-F]/"],
      "background":       ["/^#[0-9a-fA-F]/"]
    }
  }
}
// This blocks bare hex assignments but not var(--rds-*, #fallback)
```

### ESLint - MUI sx hardcoded values
```js
{
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='color'] > Literal[value=/^#/]",
        message: "Use theme token e.g. 'primary.main' not a hex in sx"
      },
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='backgroundColor'] > Literal[value=/^#/]",
        message: "Use theme token instead of hardcoded backgroundColor in sx"
      },
      {
        selector: "JSXAttribute[name.name='sx'] ObjectExpression > Property[key.name='zIndex'] > Literal[value=/^[0-9]/]",
        message: "Use theme.zIndex token string e.g. 'modal' instead of number"
      }
    ]
  }
}
```

---

## Step 12: Commit Message

```
refactor(<component>): migrate to centralized design tokens (v3)

TOKEN COVERAGE:
  Colors:      X% -> Y%  (+Z%)
  Spacing:     X% -> Y%  (+Z%)
  Typography:  X% -> Y%  (+Z%)
  Breakpoints: X% -> Y%  (+Z%)
  MUI sx:      X% -> Y%  (+Z%)
  Overall:     X% -> Y%  (+Z%)
  Grade: [F] -> [A+]

FIXED:
  - N bare hex -> var(--rds-*)
  - N bare px spacing -> var(--rds-spacing-*)
  - N MUI sx props -> theme tokens
  - N legacy --txt-* -> --rds-text-*  (if applicable)
  - N uninjected vars added to build-rds-css-vars.ts (if applicable)

PIPELINE:
  design-tokens.ts -> build-rds-css-vars.ts -> injectTokens()
  -> --rds-* -> this component now auto-updates on token change

NOT MODIFIED: *.stories.tsx
NO BREAKING CHANGES. Visual appearance unchanged. Tests pass.
```

---

## Token Reference Map (matches actual design-tokens.ts)

### Colors - use var(--rds-*) directly

```
var(--rds-primary-main)          <- colorTokens.primary[700]
var(--rds-primary-light)         <- colorTokens.primary[300]
var(--rds-primary-dark)          <- colorTokens.primary[900]
var(--rds-secondary-main)        <- colorTokens.secondary[700]
var(--rds-text-primary)          <- dark text
var(--rds-text-secondary)        <- medium grey text
var(--rds-text-disabled)         <- muted/disabled text
var(--rds-surface-default)       <- page background
var(--rds-surface-subtle)        <- card/panel background
var(--rds-border-default)        <- standard border
var(--rds-border-light)          <- subtle border/divider
var(--rds-neutral-0)             <- pure white (#fff)
var(--rds-neutral-900)           <- near black
var(--rds-semantic-success-main) <- success green
var(--rds-success-light)         <- light success background
var(--rds-success-dark)          <- dark success text
var(--rds-semantic-error-main)   <- error red
var(--rds-error-light)           <- light error background
var(--rds-error-dark)            <- dark error text
var(--rds-semantic-warning-main) <- warning orange/yellow
var(--rds-warning-light)         <- light warning background
var(--rds-warning-dark)          <- dark warning text
var(--rds-info-main)             <- info blue
var(--rds-info-light)            <- light info background
var(--rds-info-dark)             <- dark info text
```

### Spacing
```
var(--rds-spacing-xs)    <- 4px
var(--rds-spacing-sm)    <- 8px
var(--rds-spacing-md)    <- 16px
var(--rds-spacing-lg)    <- 24px
var(--rds-spacing-xl)    <- 32px
var(--rds-spacing-2xl)   <- 48px
var(--rds-spacing-3xl)   <- 64px
```

### Typography
```
var(--rds-font-size-xs)            <- 10px
var(--rds-font-size-sm)            <- 12px
var(--rds-font-size-md)            <- 14px
var(--rds-font-size-lg)            <- 16px
var(--rds-font-size-xl)            <- 20px
var(--rds-font-size-2xl)           <- 24px
var(--rds-font-weight-regular)     <- 400
var(--rds-font-weight-medium)      <- 500
var(--rds-font-weight-bold)        <- 700
var(--rds-font-family-base)        <- Poppins/Roboto
```

### Elevation / Shadows
```
var(--rds-elevation-0)   <- none
var(--rds-elevation-1)   <- subtle shadow
var(--rds-elevation-2)   <- card shadow
var(--rds-elevation-3)   <- modal shadow
var(--rds-elevation-4)   <- overlay shadow
var(--rds-elevation-5)   <- maximum shadow
```

### Z-index (1000+ scale only)
```
var(--rds-z-index-dropdown)  <- 1000
var(--rds-z-index-sticky)    <- 1100
var(--rds-z-index-banner)    <- 1200
var(--rds-z-index-modal)     <- 1400
var(--rds-z-index-popover)   <- 1500
var(--rds-z-index-tooltip)   <- 1800
```

### Border Radius
```
var(--rds-border-radius-sm)    <- 4px
var(--rds-border-radius-md)    <- 8px
var(--rds-border-radius-lg)    <- 12px
var(--rds-border-radius-xl)    <- 16px
var(--rds-border-radius-full)  <- 9999px
```

### Breakpoints
```
var(--rds-breakpoint-xs)          <- 0px
var(--rds-breakpoint-sm)          <- 600px
var(--rds-breakpoint-md)          <- 900px
var(--rds-breakpoint-lg)          <- 1200px
var(--rds-breakpoint-xl)          <- 1536px
var(--rds-breakpoint-mobile-sm)   <- mobile small
var(--rds-breakpoint-mobile-md)   <- mobile medium
var(--rds-breakpoint-tablet-sm)   <- tablet small
var(--rds-breakpoint-tablet-md)   <- tablet medium
```

---

## Priority Queue

### CRITICAL
1. rds-comp-time-picker    <- highest bare hex remaining
2. rds-comp-product-tour   <- second highest
3. rds-fab
4. rds-comp-datepicker

### HIGH
5. rds-button
6. rds-input
7. rds-comp-data-grid

### MEDIUM
8. rds-checkbox, rds-radio
9. rds-avatar, rds-badge, rds-banner
10. rds-backdrop, rds-tooltip

---

## Rollback

If validation fails:
  git restore <component>.scss
  git restore <component>.tsx

Report: which step failed, which specific value caused the issue.

---

Agent Version: 3.0
Last Updated: May 2026
Architecture: design-tokens.ts -> build-rds-css-vars.ts -> injectTokens() -> --rds-* -> SCSS + MUI
Status: Production Ready
