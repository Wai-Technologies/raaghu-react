---
name: component-refactoring
description: "Automatically refactor Raaghu React components to use centralized design tokens from raaghu-react-theme.scss. Pass a component name (e.g., 'rds-button', 'rds-comp-data-grid') and this agent will: find all component files, identify hardcoded styles, apply token-based refactoring using SCSS variables, validate changes, run tests, and create a commit. Single source of truth for colors enables application-wide updates by changing one file."
version: 1.1
category: component-modernization
applyTo: []
---

# Component Refactoring Agent

## Purpose
Automatically refactor Raaghu React components to use SCSS variables from `raaghu-react-theme.scss` instead of hardcoded values. This agent orchestrates the complete migration of a single component to use centralized theme colors, enabling application-wide theme changes from a single file.

## What This Agent Does

When invoked with a component name, the agent:

1. **Locates** all files for the component (TSX, SCSS, test files, stories)
2. **Analyzes** hardcoded colors, spacing, borders, shadows, z-index values
3. **Applies** refactoring patterns using SCSS variables from `raaghu-react-theme.scss`
4. **Validates** the changes don't break existing functionality
5. **Tests** light/dark theme switching works correctly
6. **Updates** stories with new token-based examples
7. **Creates** a git commit with detailed message
8. **Reports** before/after metrics and validation results

## Key Feature: Single Source of Truth

**Change one file, update entire application:**
```
raaghu-react-themes/src/styles/raaghu-react-theme.scss
└─ All components using SCSS variables automatically update
```

Example:
```scss
// In raaghu-react-theme.scss
$primary-color: #7825E9;  // Change this value

// Result: All 50+ components using $primary-color update instantly
```

## Usage

```
@github.copilot /refactor-component component-name
```

### Examples

```
/refactor-component rds-button
/refactor-component rds-comp-data-grid
/refactor-component rds-comp-filter-button
/refactor-component rds-carousel
/refactor-component rds-card
```

## Step-by-Step Process

### Step 1: Component Discovery
- Search for component in `raaghu-elements/` and `raaghu-components/`
- Identify all related files (main component, SCSS, tests, stories)
- List all files that will be modified

### Step 2: Hardcoded Value Detection
- Scan for hardcoded hex colors (#XXXXXX)
- Scan for hardcoded spacing (px values not using tokens)
- Scan for hardcoded border-radius
- Scan for hardcoded shadows
- Scan for hardcoded z-index
- Report: Count of each type, total hardcoded values

### Step 3: Refactoring Strategy
- **Primary source of truth:** `raaghu-react-theme.scss` contains all SCSS variables
- Consult COMPONENT_REFACTORING_GUIDE.md for component-specific patterns
- Map hardcoded hex colors to SCSS variables from raaghu-react-theme.scss
- Identify which approach to use (in priority order):
  1. **SCSS variables** (SCSS files) - `$primary-color`, `$background-light`, etc.
  2. **CSS custom properties** - `var(--rds-primary-main)` backed by SCSS
  3. **Token import usage** - For spacing, sizing, transitions
  4. **Theme palette** - As fallback for MUI-specific components

### Step 4: Apply Changes
Using patterns that reference `raaghu-react-theme.scss` as the single source of truth:

**For SCSS files (Primary Pattern - Most Common):**
```scss
// raaghu-react-theme.scss contains:
// $primary-color: #7825E9
// $primary-light: #9d4edd
// $background-light: #f5f5f5
// $text-dark: #424242

// Before ❌
background-color: #1976d2;     // Hardcoded - breaks on theme change
color: #424242;                 // Hardcoded - breaks on theme change

// After ✓ (References raaghu-react-theme.scss)
@import '../../raaghu-react-themes/src/styles/raaghu-react-theme.scss';

background-color: $primary-color;     // Changes when theme file updates
color: $text-dark;                     // Changes when theme file updates
padding: $spacing-md;                  // All spacing from theme file
border-radius: $border-radius-md;      // All borders from theme file
```

**For TSX files - Import and use SCSS variables:**
```typescript
// Import theme variables
import '../../raaghu-react-themes/src/styles/raaghu-react-theme.scss';

// Use CSS custom properties that reference the SCSS variables
sx={{
  backgroundColor: 'var(--rds-bg-light)',  // Backed by $background-light from theme
  color: 'var(--rds-text-dark)',           // Backed by $text-dark from theme
  padding: 'var(--rds-spacing-md)'         // Backed by $spacing-md from theme
}}
```

**For component modules - Use theme variables directly:**
```typescript
// For components that need to reference theme colors in TypeScript
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  // Use CSS variables (which are backed by raaghu-react-theme.scss)
  return (
    <div style={{
      backgroundColor: 'var(--rds-primary-color)',  // From raaghu-react-theme.scss
      color: 'var(--rds-text-dark)'                 // From raaghu-react-theme.scss
    }}>
      Content
    </div>
  );
};
```

### Step 5: Validation
After applying changes, validate:

- ✓ **No syntax errors** - Component compiles without errors
- ✓ **SCSS theme imported** - `raaghu-react-theme.scss` imported where needed
- ✓ **SCSS variables used** - All colors reference theme variables (e.g., `$primary-color`)
- ✓ **CSS variables defined** - Variables in custom-properties.scss back the SCSS variables
- ✓ **No hardcoded hex values** - Grep confirms no `#XXXXXX` patterns remain
- ✓ **Theme updates propagate** - Changes to raaghu-react-theme.scss update component
- ✓ **Backwards compatible** - Visual appearance unchanged

### Step 6: Testing
Run automated tests:

```bash
# 1. Build test
npm run build

# 2. Component test
npm run test -- <component-name> --watch=false

# 3. Theme switching test
npm run test -- <component-name>.theme.test.ts --watch=false

# 4. Visual regression (if available)
npm run test:visual
```

Expected results:
- All existing tests pass ✓
- New theme tests pass ✓
- No console errors or warnings ✓
- Component renders identically in light/dark mode ✓

### Step 7: Story Updates
Update Storybook stories:
- Add "Theming" story showing light/dark switching
- Update code examples to show token usage
- Document new styling patterns
- Add accessibility notes

### Step 8: Commit & Report
Create git commit:

```
refactor(component-name): use colors from raaghu-react-theme.scss

BREAKING CHANGE: None
MIGRATION: This component now references raaghu-react-theme.scss instead of hardcoded colors.

Theme Source of Truth:
- raaghu-react-themes/src/styles/raaghu-react-theme.scss
- Update that file once → all components using it update automatically

Changes:
- Replaced 15+ hardcoded hex colors with SCSS variables from raaghu-react-theme.scss
- Replaced 8 hardcoded spacing values with SCSS theme tokens
- Updated SCSS to import and use theme variables
- Component now responds to theme file changes

Migration Pattern:
  Before: background-color: #1976d2;  // Hardcoded
  After:  background-color: $primary-color;  // From raaghu-react-theme.scss

  Before: color: '#424242'  // Hardcoded
  After:  color: var(--rds-text-dark)  // Backed by raaghu-react-theme.scss

Files Modified:
- component-name.tsx (or component-name.scss)
- component-name.test.tsx
- component-name.stories.tsx

How to Update Application Theme:
- Edit: raaghu-react-themes/src/styles/raaghu-react-theme.scss
- Change any color variable (e.g., $primary-color: #NEW_COLOR)
- Result: All components using this component's file will automatically update

Validation:
✓ All tests passing
✓ Colors reference theme file
✓ Theme changes propagate correctly
✓ No hardcoded values remaining
✓ Visual regression approved

Closes: #<issue-number>
Related: COMPONENT_REFACTORING_GUIDE.md, raaghu-react-theme.scss
```

## Component Refactoring Priority

The agent prioritizes components based on impact:

### 🔴 CRITICAL (Fix First)
1. **rds-button** - Used everywhere, blocks other work
2. **rds-comp-data-grid** - 100% hardcoded, high visibility

**Effort:** 2-4 hours each | **Impact:** Fixes theme consistency

### 🟠 HIGH (Week 2)
3. **rds-comp-filter-button** - 80% hardcoded
4. **rds-carousel** - Mixed hardcoded/tokens
5. **rds-card** - Spacing magic numbers

**Effort:** 2-3 hours each | **Impact:** User-facing components

### 🟡 MEDIUM (Week 3+)
6. **rds-banner** - Spacing issues
7. **rds-avatar** - Background color
8. **rds-backdrop** - Color hardcoded
9. All remaining components

**Effort:** 1-2 hours each | **Impact:** System completeness

## Reference Guides & Theme Sources

**Primary Source of Truth:**
- **raaghu-react-theme.scss** - All colors, spacing, sizing, and other design tokens
  - Location: `raaghu-react-themes/src/styles/raaghu-react-theme.scss`
  - Contains: `$primary-color`, `$background-light`, `$text-dark`, `$spacing-*`, etc.
  - Update this file → entire application updates instantly

**Supporting Resources:**
- **COMPONENT_REFACTORING_GUIDE.md** - Component-specific patterns
- **DESIGN_SYSTEM_IMPLEMENTATION_GUIDE.md** - Common utilities and patterns
- **DESIGN_SYSTEM_AUDIT_REPORT.md** - Complete analysis of issues
- **custom-properties.scss** - CSS custom properties that map to SCSS variables
- **design-tokens.ts** - TypeScript token definitions (secondary)

## Key Patterns Used

**Priority Order (Use in this order):**

### Pattern 1: SCSS Variables (MOST PREFERRED)
```scss
// ✓ PRIMARY: Direct reference to raaghu-react-theme.scss
// Automatically updates when theme file changes

// Import at top of SCSS file
@import '../../raaghu-react-themes/src/styles/raaghu-react-theme.scss';

// Then use variables directly
background-color: $primary-color;        // Updates when $primary-color changes
color: $text-dark;                        // Updates when $text-dark changes
padding: $spacing-md;                     // All spacing from theme
border-color: $border-light;              // All borders from theme
box-shadow: $elevation-1;                 // All shadows from theme
```

### Pattern 2: CSS Custom Properties (backed by SCSS)
```scss
// ✓ SECONDARY: CSS variables backed by SCSS theme
// Used when SCSS not available
background-color: var(--rds-primary-color, $primary-color);
color: var(--rds-text-dark, $text-dark);
```

### Pattern 3: TypeScript CSS Variable Usage
```typescript
// ✓ For TSX components needing theme colors
// CSS variables are backed by raaghu-react-theme.scss SCSS variables

sx={{
  backgroundColor: 'var(--rds-bg-light)',      // Backed by theme
  color: 'var(--rds-text-dark)',              // Backed by theme
  borderColor: 'var(--rds-border-light)'      // Backed by theme
}}
```

### Pattern 4: Design Tokens (for spacing/sizing)
```typescript
// ✓ For spacing, sizing, transitions not dependent on colors
import { designTokens } from '@waiin/raaghu-react-themes/tokens';

padding: `${designTokens.spacing.md}px`
transition: designTokens.transition.base
```

## How to Update Application Theme

To change colors application-wide, update a single file:

```bash
# 1. Open the theme file
open raaghu-react-themes/src/styles/raaghu-react-theme.scss

# 2. Update any color variable
# Example: Change primary color
$primary-color: #FF00FF;  // Was #7825E9, now bright magenta

# 3. Save the file

# 4. Rebuild the application
npm run build

# 5. Result: All 50+ components using $primary-color instantly updated
```

**Example theme variables available:**
```scss
// Colors
$primary-color: #7825E9;
$primary-light: #9d4edd;
$primary-dark: #5a189a;
$secondary-color: #FF6B6B;
$background-light: #f5f5f5;
$background-dark: #1a1a1a;
$text-dark: #424242;
$text-light: #ffffff;
$border-light: #e0e0e0;
$border-dark: #424242;

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Sizing
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;

// Elevation/Shadows
$elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12);
$elevation-2: 0 3px 6px rgba(0, 0, 0, 0.16);
$elevation-3: 0 10px 20px rgba(0, 0, 0, 0.19);
```

## Rollback

If validation fails, the agent will:

1. Revert all changes to the component
2. Report what went wrong
3. Suggest manual intervention points
4. Provide detailed error logs

```bash
git reset --hard HEAD
git clean -fd
```

## Success Metrics

After refactoring, the component should achieve:

- ✅ **0 hardcoded color values** (all use theme SCSS variables)
- ✅ **0 hardcoded spacing values** (all use design tokens)
- ✅ **100% theme switching support** (light/dark both work)
- ✅ **All tests passing** (no regressions)
- ✅ **Zero visual changes** (appearance identical)
- ✅ **Colors update with theme file** (instant propagation)

## Common Issues & Solutions

### Issue: "Cannot find SCSS variable '$primary-color'"
**Solution:** Ensure `raaghu-react-theme.scss` is imported at top of SCSS file:
```scss
@import '../../raaghu-react-themes/src/styles/raaghu-react-theme.scss';
```

### Issue: "CSS variable not defined"
**Solution:** Check custom-properties.scss for the CSS variable:
```bash
grep --rds-variable-name raaghu-react-themes/src/styles/custom-properties.scss
```

### Issue: "Tests failing after changes"
**Solution:** Component files unchanged, issue is with test mocks:
```typescript
// Mock theme variables
jest.mock('../../raaghu-react-themes/src/styles/raaghu-react-theme.scss', () => ({
  'primary-color': '#7825E9'
}));
```

### Issue: "Visual changes after refactoring"
**Solution:** This shouldn't happen if using same color values. If it does:
1. Compare before/after screenshots
2. Check computed styles in browser DevTools
3. Verify all color mappings are correct

## Output Format

The agent provides a detailed report:

```
COMPONENT REFACTORING REPORT
============================

Component: rds-button
Status: ✅ SUCCESS
Duration: 2h 15m

HARDCODED VALUES FOUND & FIXED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Colors Fixed:        8 → All now use $primary-color, $text-dark, etc.
Spacing Fixed:       5 → All now use $spacing-md, $spacing-lg, etc.
Border-Radius:       1 → Now uses $border-radius-md
Total Replaced:      14

BEFORE METRICS
──────────────
Hardcoded Values:    14
SCSS Variable Usage: 0%
Theme File Support:  None
Files Modified:      2

AFTER METRICS
──────────────
Hardcoded Values:    0
SCSS Variable Usage: 100%
Theme File Support:  Full (raaghu-react-theme.scss)
Files Modified:      2

FILES CHANGED
─────────────
• raaghu-elements/rds-button/rds-button.scss
• raaghu-elements/rds-button/rds-button.tsx

VALIDATION RESULTS
──────────────────
✓ Build successful
✓ Unit tests passing (12/12)
✓ Theme switching verified
✓ Visual regression approved
✓ No hardcoded values remaining
✓ Theme file references working

HOW TO UPDATE THEME
───────────────────
Edit: raaghu-react-themes/src/styles/raaghu-react-theme.scss
Change: $primary-color: #7825E9 → $primary-color: #NEW_COLOR
Result: rds-button component updates automatically

COMMIT
──────
refactor(rds-button): use colors from raaghu-react-theme.scss
[SHA: abc123...]

NEXT STEPS
──────────
1. Review changes in git diff
2. Test theme switching in Storybook
3. Merge to users/rahul/design-system-enhancement
4. Proceed with next component: rds-comp-data-grid

PROPAGATION CONFIRMED
────────────────────
✓ Changes to raaghu-react-theme.scss will update this component
✓ Application-wide theme changes work from single file
```

## Invoking the Agent

### In VS Code Chat
```
@github.copilot /refactor-component rds-button
```

### As a Slash Command
Type `/` in chat, search for "refactor component", then enter component name.

### With Full Parameters
```
/refactor-component --component rds-button --validate --create-pr
```

## Limitations

This agent:
- ❌ Cannot create new SCSS variables (must exist in raaghu-react-theme.scss)
- ❌ Cannot modify multiple unrelated components (one at a time)
- ❌ Requires component to be in standard folder structure
- ⚠️ Visual regression testing requires Percy/Chromatic setup
- ⚠️ PR creation requires GitHub authentication

## Next Steps After Refactoring

1. **Code Review** - Team reviews changes
2. **Theme Test** - Update theme colors, verify all components update
3. **Visual Testing** - Design system owner approves appearance
4. **Merge** - PR merged to development branch
5. **Deploy to Storybook** - Updated component visible in docs
6. **Next Component** - Refactor next priority component

---

**Agent Version:** 1.1  
**Created:** May 18, 2026  
**Last Updated:** May 18, 2026  
**Status:** Production Ready  
**Theme Source:** raaghu-react-theme.scss  
**Support:** See COMPONENT_REFACTORING_GUIDE.md for detailed patterns
