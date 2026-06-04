---
name: refactor-component
description: "Automatically refactor any Raaghu React component to use colors from raaghu-react-theme.scss. Just pass the component name (e.g., 'rds-button', 'rds-comp-data-grid') and the agent handles all refactoring, validation, testing, and commits automatically. Update the theme file once to change all components instantly."
parameters:
  - name: component
    description: "Component name (e.g., 'rds-button', 'rds-comp-data-grid', 'rds-carousel')"
    required: true
    examples: ["rds-button", "rds-comp-data-grid", "rds-comp-filter-button", "rds-carousel", "rds-card"]
  - name: priority
    description: "Priority level (optional). Default: auto-detect from audit. Options: critical, high, medium"
    required: false
  - name: create-pr
    description: "Create pull request after refactoring (optional). Default: false"
    required: false
    type: boolean
  - name: skip-tests
    description: "Skip validation tests (optional, not recommended). Default: false"
    required: false
    type: boolean
---

# Refactor Component Prompt

## Quick Start

Simply pass a component name and the agent does everything:

```
/refactor-component rds-button
```

The agent will:
1. ✓ Find all component files
2. ✓ Analyze hardcoded values
3. ✓ Apply token-based refactoring using raaghu-react-theme.scss
4. ✓ Run validation tests
5. ✓ Create a git commit
6. ✓ Report results

## Single Source of Truth

Once refactoring is complete, update the theme file to change entire application:

```scss
// File: raaghu-react-themes/src/styles/raaghu-react-theme.scss
$primary-color: #7825E9;  // Change this

// Result: All 50+ components using $primary-color update instantly ✨
```

## Available Components

### 🔴 CRITICAL (Recommended First)
- `rds-button` - Color mismatch, blocks others
- `rds-comp-data-grid` - 100% hardcoded, high visibility

### 🟠 HIGH (Next Priority)
- `rds-comp-filter-button` - 80% hardcoded
- `rds-carousel` - Mixed hardcoded/tokens
- `rds-card` - Spacing magic numbers

### 🟡 MEDIUM (After Core)
- `rds-banner` - Spacing issues
- `rds-avatar` - Background color
- `rds-backdrop` - Color hardcoded
- `rds-spinner` - Size hardcoded
- `rds-notification` - Colors hardcoded

### 🟢 STANDARD
- Any other component name in `raaghu-elements/` or `raaghu-components/`

## Examples

### Refactor button component
```
/refactor-component rds-button
```

### Refactor data grid with PR creation
```
/refactor-component rds-comp-data-grid --create-pr
```

### Refactor carousel, skip tests (not recommended)
```
/refactor-component rds-carousel --skip-tests
```

### Refactor badge with priority override
```
/refactor-component rds-badge --priority high
```

## What Gets Fixed

The agent automatically migrates components to use SCSS variables from `raaghu-react-theme.scss`:

### Replaces Hardcoded Colors
```scss
// Before
background-color: #1976d2;

// After
background-color: $primary-color;  // From raaghu-react-theme.scss
```

### Replaces Hardcoded Spacing
```scss
// Before
padding: 16px;
margin: 8px;

// After
padding: $spacing-md;    // From raaghu-react-theme.scss
margin: $spacing-xs;     // From raaghu-react-theme.scss
```

### Replaces Hardcoded Border Radius
```scss
// Before
border-radius: 6px;

// After
border-radius: $border-radius-md;  // From raaghu-react-theme.scss
```

### Adds Theme Support
```typescript
// Before - No theme support
sx={{ backgroundColor: '#ffffff' }}

// After - Backed by raaghu-react-theme.scss
sx={{ backgroundColor: 'var(--rds-bg-light)' }}  // Updates with theme file
```

## Key Benefit

**One file to rule them all:**

```
┌─────────────────────────────────────────┐
│  raaghu-react-theme.scss                │
│  (THE SOURCE OF TRUTH)                  │
│                                         │
│  $primary-color: #7825E9                │
│  $background-light: #f5f5f5             │
│  $text-dark: #424242                    │
│  ... 50+ more variables ...             │
└─────────────────────────────────────────┘
          │
          │ All components reference these
          │ Change = Entire app updates
          ▼
    50+ Components
    ├─ rds-button ✨
    ├─ rds-card
    ├─ rds-badge
    ├─ rds-carousel
    └─ ... (all automatically update)
```

## Validation Steps

The agent validates:

✓ **Build** - Component compiles  
✓ **Tests** - All tests pass  
✓ **Theme** - Light/dark switching works  
✓ **Appearance** - Visual regression approved  
✓ **Propagation** - Theme file changes apply  

## Output Report

After completion, you get:

```
COMPONENT REFACTORING REPORT
Component: rds-button
Status: ✅ SUCCESS

HARDCODED VALUES FIXED
- Colors: 8
- Spacing: 5  
- Border-Radius: 1
- Total: 14

HOW TO UPDATE THEME
Edit: raaghu-react-themes/src/styles/raaghu-react-theme.scss
Change: $primary-color: #NEW_COLOR
Result: rds-button + all other components update instantly

VALIDATION
✓ Build successful
✓ Tests passing (12/12)
✓ Theme switching verified
✓ Visual regression approved
✓ No hardcoded values remaining

COMMIT
refactor(rds-button): use colors from raaghu-react-theme.scss

NEXT: rds-comp-data-grid
```

## Recommended Order

### Week 1 (Foundation)
1. `rds-button` - ⏱️ 2 hours
2. `rds-comp-data-grid` - ⏱️ 4 hours
3. Update SCSS variable references - ⏱️ 1 hour

### Week 2 (Migration)
4. `rds-comp-filter-button` - ⏱️ 2 hours
5. `rds-carousel` - ⏱️ 2 hours
6. `rds-card` - ⏱️ 2 hours

### Week 3 (Completion)
7. `rds-banner` - ⏱️ 1.5 hours
8. `rds-avatar` - ⏱️ 1.5 hours
9. `rds-backdrop` - ⏱️ 1 hour
10. Remaining components - ⏱️ 2-3 hours each

## Tips

### Tip 1: Start with Critical Components
Begin with `rds-button` and `rds-comp-data-grid` to build momentum and fix blocking issues.

### Tip 2: Create PR for Review
Use `--create-pr` to generate a pull request for team review:
```
/refactor-component rds-button --create-pr
```

### Tip 3: Verify Theme Switching
After refactoring a component, test theme changes in Storybook:
1. Open component story
2. Toggle theme in story controls
3. Verify colors change correctly
4. Check that raaghu-react-theme.scss updates apply

### Tip 4: Update Theme File
Once components are refactored, update the theme file to test everything:
```bash
# Edit raaghu-react-themes/src/styles/raaghu-react-theme.scss
$primary-color: #FF00FF;  # Change color

# Rebuild and verify all components update
npm run build
npm run storybook
```

### Tip 5: Track Progress
The agent creates commits on each component, so you can track progress:
```bash
git log --oneline | grep "refactor"
```

## Troubleshooting

### Agent not found?
Make sure you're in the raaghu-react workspace. The agent is defined in `.github/agents/`.

### Component not found?
Double-check the component name. Use:
```bash
ls raaghu-elements/ | grep component-name
ls raaghu-components/ | grep component-name
```

### Tests failing?
The agent reports which tests failed. Check:
1. Component has required dependencies
2. SCSS imports are correct
3. Theme variables are accessible
4. Mocks include theme variables

### Visual changes?
This shouldn't happen if using same values from theme file. If it does:
1. Compare theme file variables to old hardcoded values
2. Ensure color mappings are exact
3. Check for CSS specificity issues

## After Refactoring One Component

Once a component is successfully refactored:

1. **Review** - Check changes in git diff
2. **Test Theme** - Update raaghu-react-theme.scss color and verify component updates
3. **Merge** - Commit to feature branch
4. **Next** - Refactor next component

Example workflow:
```bash
# Refactor button
/refactor-component rds-button

# Review changes
git diff HEAD~1

# Test in Storybook  
npm run storybook

# Change theme color and verify update
# (Edit raaghu-react-themes/src/styles/raaghu-react-theme.scss)

# Refactor next component
/refactor-component rds-comp-data-grid
```

## Support & Documentation

- **Full Guide:** See COMPONENT_REFACTORING_GUIDE.md for detailed patterns
- **Theme Variables:** See raaghu-react-theme.scss for available variables
- **Patterns:** See DESIGN_SYSTEM_IMPLEMENTATION_GUIDE.md for common utilities
- **Audit:** See DESIGN_SYSTEM_AUDIT_REPORT.md for complete analysis

## Power Users

Update theme colors to instantly update entire application:

```bash
# 1. Edit theme file
vim raaghu-react-themes/src/styles/raaghu-react-theme.scss

# 2. Change variable
# $primary-color: #7825E9 → $primary-color: #00FF00

# 3. Rebuild and deploy
npm run build && npm run start

# 4. All 50+ refactored components instantly show green! ✨
```

---

**Prompt Version:** 1.1  
**Agent:** component-refactoring.agent.md  
**Theme File:** raaghu-react-theme.scss  
**Status:** Ready to Use

To start refactoring, just type:
```
/refactor-component rds-button
```
