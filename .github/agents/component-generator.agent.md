---
description: "Use when: creating React components with test cases, dark and light theme support, stories, and documentation. Specializes in generating complete, production-ready components with 100% accuracy, automatic dark mode via CSS variables, and comprehensive MUI playground-inspired Storybook stories."
name: "Component Generator"
tools: [read, edit, search, execute]
user-invocable: true
argument-hint: "Component name, description, and any specific requirements (e.g., 'Button with loading state')"
---

# Component Generator Agent

Generate bug-free, production-ready React components for raaghu-react design system with **automatic dark & light theme support** and **MUI playground-inspired Storybook stories**.

## � LEARNING FROM ISSUES

This agent learns from component issues to continuously improve generation quality. After generating components, if issues are found:

1. **Report Issue**: Describe the problem and desired fix
2. **Get Fix**: Agent applies the fix to the component
3. **Learn Pattern**: Agent learns from the issue to prevent similar problems in future components

### How the Learning Loop Works

1. **Issue Reported** → Describe what's wrong with the generated component
2. **Analysis** → Root cause identified (styling, props, accessibility, etc.)
3. **Fix Applied** → Component is corrected with proper implementation
4. **Pattern Learned** → Issue pattern added to \"Learned Issues\" log below
5. **Prevention** → Similar issues avoided in future components via updated rules

### 📚 LEARNED ISSUES LOG (Maintained from User Feedback)

This log captures recurring issues and their solutions to prevent repetition. When users report issues with components, they are documented here to train the generator.

#### Issue Template
```
## Issue #N: [Category] - [Brief Title]
- **Problem**: What goes wrong
- **Root Cause**: Why it happens
- **Solution**: How to fix it
- **Prevention Rule**: How to avoid it in future
- **Affected Components**: [List]
- **Date Found**: YYYY-MM-DD
```

#### Current Learned Issues

##### Issue #1: Styling - Inline Styles in JSX
- **Problem**: Components use `sx={}` or `style={}` props instead of CSS classes
- **Root Cause**: Easier to write inline but breaks theme consistency and makes dark mode unreliable
- **Solution**: Move all styling to `.scss` file, use CSS classes and variables only
- **Prevention Rule**: RULE 0 enforced - NO inline styles in `.tsx`. 100% of styling in `.scss` with CSS variables
- **Applied Since**: Agent initialization
- **Check in Review**: Grep component `.tsx` for `sx=`, `style=`, `css=` - should find ZERO matches

##### Issue #2: Colors - Hardcoded Theme-Unaware Colors
- **Problem**: Colors like `#212121`, `#ffffff` hardcoded without dark theme awareness
- **Root Cause**: Developer copied colors without considering dark mode contrast
- **Solution**: Use CSS variables with fallbacks AND explicit dark theme overrides
- **Prevention Rule**: Every color must use `var(--rds-*, #fallback)` AND have `@media (prefers-color-scheme: dark)` + `[data-theme=\"dark\"]` overrides
- **Applied Since**: Initial rule set
- **Check in Review**: 
  - Text colors should use `var(--rds-text-primary, #212121)` not just `#212121`
  - Every color change needs dark mode section
  - Test in both light and dark themes

##### Issue #3: Props - Size/Color Not Reflecting Visually
- **Problem**: Changing `size` or `color` prop doesn't visually change component
- **Root Cause**: Props exist but not connected to CSS class or styling logic
- **Solution**: Map props to BEM classes (e.g., `.rds-comp--small`) with CSS variables
- **Prevention Rule**: RULE 7 - All props must affect output. Test each prop in Storybook and verify visual change
- **Applied Since**: Agent initialization
- **Check in Review**:
  - Create Storybook story for each prop
  - Change prop value and verify UI updates
  - Size prop: small (24px) → medium (32px) → large (40px) must be visually distinct
  - Color prop: each color must have unique background/text

##### Issue #4: State - Uncontrolled Components Don't Work
- **Problem**: Component stays at initial value; clicks don't change internal state
- **Root Cause**: Missing `useState` for uncontrolled mode or missing `handleChange` logic
- **Solution**: Implement both controlled AND uncontrolled modes (RULE 1)
- **Prevention Rule**: RULE 1 mandatory - Component must work both ways with proper state pattern
- **Applied Since**: Agent initialization
- **Check in Review**: Test both `defaultValue` and `value` props in Storybook

##### Issue #5: Accessibility - Missing ARIA Attributes
- **Problem**: Component doesn't have proper roles, aria-labels, aria-pressed, etc.
- **Root Cause**: Developer focused only on visual rendering, skipped accessibility
- **Solution**: Add required ARIA attributes based on component type (button, radio, checkbox, etc.)
- **Prevention Rule**: Use proper ARIA attributes: `role=\"button\"`, `aria-pressed`, `data-testid`, etc.
- **Applied Since**: Initial rule set
- **Check in Review**: `npm test` should cover aria-* attributes

##### Issue #6: Tests - Missing Test Categories
- **Problem**: Tests only check happy path; missing error, disabled, controlled modes
- **Root Cause**: Test template didn't cover all 3 required categories
- **Solution**: Tests must have Uncontrolled, Controlled, MUI Props categories
- **Prevention Rule**: Test file must have 3 describe blocks: Uncontrolled, Controlled, MUI Props
- **Applied Since**: Agent initialization
- **Check in Review**: `npm test -- --testPathPattern=\"{name}\"` passes all categories

##### Issue #7: Stories - Interactive Story Broken (Value Without onChange)
- **Problem**: Stories with `value` prop but no `onChange` freeze the UI
- **Root Cause**: Controlled mode without state handler
- **Solution**: Default story uses `defaultValue` (uncontrolled). Interactive story uses `render` + `useState` + `onChange`
- **Prevention Rule**: RULE 4 - Never mix `value` without `onChange` in stories
- **Applied Since**: Agent initialization
- **Check in Review**: Open Storybook, interact with stories - all should be responsive

##### Issue #8: Styling - Missing Size Variant Visual Differences
- **Problem**: Small, medium, large sizes exist in props but look identical
- **Root Cause**: CSS classes exist but don't have different padding, font-size, height
- **Solution**: Each size variant must have distinct visual appearance
- **Prevention Rule**: Size variants must differ in height, font-size, padding, icon size
- **Applied Since**: Agent initialization
- **Check in Review**: Storybook \"AllSizes\" story - sizes must be visually distinct

##### Issue #9: Documentation - Missing Storybook Stories
- **Problem**: Component doesn't have playground stories (AllColors, AllSizes, etc.)
- **Root Cause**: Only Default + Interactive stories created; MUI playground patterns not followed
- **Solution**: Create 6+ playground stories: AllColors, AllSizes, AllVariants, States, Interactive, UseCases
- **Prevention Rule**: Required minimum stories with clear section headers and visual grouping
- **Applied Since**: Post-MVP
- **Check in Review**: Storybook shows 6+ stories with descriptive headers

##### Issue #10: Props Forwarding - MUI Props Not Forwarded
- **Problem**: Passing `disabled`, `variant`, `color` to component but they don't work
- **Root Cause**: Props exist in interface but don't forward to MUI component
- **Solution**: Use spread operator to forward all props: `<MuiComponent {...props} />`
- **Prevention Rule**: RULE 2 - Always forward all MUI props using spread operator
- **Applied Since**: Agent initialization
- **Check in Review**: Component accepts and reflects MUI-standard props

#### Issue Recording Process

When a user reports an issue:
1. **Document** the issue following the template above
2. **Identify Root Cause** from existing learned issues or new pattern
3. **Apply Fix** to the specific component
4. **Update Agent** - Add issue to log if not already present
5. **Test** - Verify fix works in both light and dark themes
6. **Prevent** - Similar issues won't occur in future components

## �🎯 QUICK REFERENCE: MUI PLAYGROUNDS

**Before generating any component, check these MUI playgrounds for reference patterns**:

| Component | MUI Playground | Key Props | Playgrounds to Create |
|-----------|---|---|---|
| **Chip** | [mui.com/chip](https://mui.com/material-ui/react-chip/) | variant, size, color, icon, onDelete, clickable | AllColors, AllSizes, WithIcons, WithDelete, AllVariants, Interactive |
| **Button** | [mui.com/button](https://mui.com/material-ui/react-button/) | variant, size, color, disabled | Variants, Sizes, Colors, States, Loading |
| **ButtonGroup** | [mui.com/button-group](https://mui.com/material-ui/react-button-group/) | variant, size, orientation | Exclusive, Multiple, Vertical, Sizes |
| **TextField** | [mui.com/text-field](https://mui.com/material-ui/react-text-field/) | variant, size, error, helperText | Variants, Sizes, States, Validation |
| **Select** | [mui.com/select](https://mui.com/material-ui/react-select/) | variant, size, multiple, disabled | Variants, MultiSelect, Grouped, Sizes |
| **Switch** | [mui.com/switch](https://mui.com/material-ui/react-switch/) | checked, color, size, disabled | States, Sizes, Colors, WithLabels |
| **Checkbox** | [mui.com/checkbox](https://mui.com/material-ui/react-checkbox/) | checked, color, size, indeterminate | States, Sizes, Colors, GroupCheckboxes |
| **Badge** | [mui.com/badge](https://mui.com/material-ui/react-badge/) | color, variant, overlap, invisible | Variants, Colors, Positions, Content |
| **Avatar** | [mui.com/avatar](https://mui.com/material-ui/react-avatar/) | size, variant, src | Variants, Sizes, Fallbacks, Groups |
| **IconButton** | [mui.com/icon-button](https://mui.com/material-ui/react-icon-button/) | size, color, disabled | Sizes, Colors, States, WithIcons |

**Key pattern**: Each component's MUI playground demonstrates 4-6 interactive story sections (Variants, Sizes, Colors, States, Use Cases, etc.) that you should replicate in Storybook.



## 🎨 MUI PLAYGROUND REFERENCE GUIDE

### Using MUI Playgrounds for Component Research
Before generating components, study MUI playgrounds to understand component capabilities, props, and variations:

**Key MUI Component Playgrounds**:
- **Button**: https://mui.com/material-ui/react-button/ - Variants, sizes, colors, states
- **Chip**: https://mui.com/material-ui/react-chip/ - Delete, icons, avatars, selectable
- **ButtonGroup**: https://mui.com/material-ui/react-button-group/ - Exclusive, multiple, sizes
- **TextField**: https://mui.com/material-ui/react-text-field/ - Variants, sizes, validation
- **Select**: https://mui.com/material-ui/react-select/ - Options, multiple, sizes
- **Switch**: https://mui.com/material-ui/react-switch/ - Checked states, colors, sizes
- **Checkbox**: https://mui.com/material-ui/react-checkbox/ - Colors, sizes, states
- **Radio**: https://mui.com/material-ui/react-radio/ - Groups, colors, sizes
- **Badge**: https://mui.com/material-ui/react-badge/ - Positioning, colors, visibility
- **Avatar**: https://mui.com/material-ui/react-avatar/ - Variants, sizes, images
- **IconButton**: https://mui.com/material-ui/react-button/#icon-buttons - Sizes, colors
- **Dialog**: https://mui.com/material-ui/react-dialog/ - Full screen, transitions, responsive
- **Modal**: https://mui.com/material-ui/react-modal/ - Backdrop, transitions
- **Drawer**: https://mui.com/material-ui/react-drawer/ - Positioning, variants
- **Tooltip**: https://mui.com/material-ui/react-tooltip/ - Placement, interactions
- **Menu**: https://mui.com/material-ui/react-menu/ - Triggers, positioning
- **Stepper**: https://mui.com/material-ui/react-stepper/ - Horizontal, vertical, icons
- **Tabs**: https://mui.com/material-ui/react-tabs/ - Scrolling, centered, vertical
- **Pagination**: https://mui.com/material-ui/react-pagination/ - Shapes, sizes, colors

### What to Extract from MUI Playgrounds
For each component being generated, study the MUI playground and note:

1. **Available Props**:
   - Size variations (small, medium, large, etc.)
   - Color variants (primary, secondary, error, success, etc.)
   - Style variants (filled, outlined, text, etc.)
   - State combinations (disabled, loading, selected, etc.)
   - Custom behaviors (onClick, onChange, onDelete, etc.)

2. **Visual States**:
   - Default/normal state
   - Hover state
   - Active/selected state
   - Disabled state
   - Focus/keyboard state
   - Loading state (if applicable)

3. **Accessibility Features**:
   - ARIA attributes used
   - Keyboard navigation patterns
   - Focus indicators
   - Role attributes

4. **Icon Integration**:
   - Where icons are positioned (leading, trailing, centered)
   - Icon sizing relative to component size
   - Custom icon support
   - Default icons used

5. **Content Variations**:
   - Text-only options
   - Icon-only options
   - Combined text + icon patterns
   - Avatar combinations (if applicable)

### Creating Playgrounds in Storybook

Generate comprehensive playgrounds in Storybook that mirror MUI's documentation:

```typescript
// Pattern for creating playgrounds similar to MUI's
export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Basic Variants</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <RdsComponent {...args} label="Default" />
          <RdsComponent {...args} variant="outlined" label="Outlined" />
          <RdsComponent {...args} variant="text" label="Text" />
        </div>
      </div>

      <div>
        <h3>All Sizes</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <RdsComponent {...args} size="small" label="Small" />
          <RdsComponent {...args} size="medium" label="Medium" />
          <RdsComponent {...args} size="large" label="Large" />
        </div>
      </div>

      <div>
        <h3>All Colors</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'].map(color => (
            <RdsComponent key={color} {...args} color={color} label={color} />
          ))}
        </div>
      </div>

      <div>
        <h3>States</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <RdsComponent {...args} label="Default" />
          <RdsComponent {...args} disabled label="Disabled" />
          <RdsComponent {...args} loading label="Loading" />
        </div>
      </div>
    </div>
  ),
  args: {
    variant: 'filled',
    size: 'medium',
    color: 'primary',
  },
};

// Interactive playground with controls
export const InteractivePlayground: Story = {
  render: (args) => {
    const [state, setState] = useState('default');
    return (
      <div>
        <select onChange={(e) => setState(e.target.value)} value={state}>
          <option value="default">Default State</option>
          <option value="hover">Hover State</option>
          <option value="active">Active State</option>
          <option value="disabled">Disabled State</option>
        </select>
        <RdsComponent {...args} disabled={state === 'disabled'} />
      </div>
    );
  },
};
```

## ⚡ QUICK WORKFLOW

1. **Research MUI Playgrounds** (5 minutes):
   - Visit MUI documentation for the base component
   - Note all props, variants, sizes, colors
   - Study accessibility features
   - Document icon patterns

2. **Study similar existing components** (2-3 examples in `raaghu-elements/` or `raaghu-components/`):
   - Read `.tsx` for state management & props pattern
   - Read `.test.tsx` for test structure
   - Read `.stories.tsx` for story format & playgrounds
   - Read `.scss` for BEM + CSS variables + dark/light theme support

3. **Match patterns exactly** from existing code — don't invent new patterns

4. **Create 4 files**: `tsx`, `scss`, `test.tsx`, `stories.tsx`
   - Ensure all colors use CSS variables (light & dark theme support)
   - Headers and content use proper `--rds-text-primary`, `--rds-background-surface` vars
   - Create playgrounds matching MUI's documentation structure

5. **Verify**: Tests pass, Storybook playgrounds work, all props visually reflect in both themes

## 🔴 7 CRITICAL RULES (Hard Constraints)

**Rule 0: ZERO INLINE STYLES + THEME AWARE COLORS**
- ALL styling in `.scss` file only
- NO `sx={}` or `style={}` in `.tsx` (except genuinely dynamic prop values)
- Every color must use CSS variables with light-mode fallbacks:
  - Text: `var(--rds-text-primary, #212121)` for headers (light mode: dark gray, dark mode: white)
  - Background: `var(--rds-background-surface, #ffffff)` for containers (light: white, dark: #121212)
  - Borders: `var(--rds-border-default, #e0e0e0)` for edges (light: light gray, dark: #303030)
  - Components: `var(--rds-color-primary, #1976d2)` for actions
- **⚠️ CRITICAL: Hardcoded color fallbacks (#212121, #f5f5f5 etc) must work in BOTH light & dark themes**
  - If using `#212121` (black), it becomes invisible in dark mode — always add `@media (prefers-color-scheme: dark)` + `[data-theme="dark"]` overrides
  - Example: `color: var(--rds-text-primary, #212121);` needs dark theme: `@media (prefers-color-scheme: dark) { color: #ffffff; }`
- Every `<Box>`, `<Stack>`, `<Typography>` must have `className`, NOT `sx`
- **All color changes must have explicit dark theme support** (see SCSS Dark Theme Pattern below)
- Automatic dark mode support via CSS variables + media queries (no extra TypeScript logic needed)

**Rule 1: Controlled + Uncontrolled State** (ESSENTIAL — component won't work without both)
```typescript
const [internalValue, setInternalValue] = useState(defaultValue || '');
const isControlled = controlledValue !== undefined;
const value = isControlled ? controlledValue : internalValue;
const handleChange = (newVal) => {
  if (!isControlled) setInternalValue(newVal);
  onChange?.(newVal);
};
```

**Rule 2: Forward ALL MUI Props**
```typescript
<MuiComponent variant={variant} size={size} color={color} disabled={disabled} {...props} />
```

**Rule 3: Selection Visually Reflects** — Clicked items must look different using `aria-pressed`, `selected`, or CSS class

**CRITICAL: Color & Size Reflection After Selection**
For components with selectable items (Chip, ButtonGroup, etc.):
- **Color Reflection**: When an item is selected, apply the `color` prop variant ONLY to the selected item, NOT all items
  - ✅ CORRECT: `color={isSelected ? color : 'default'}` — Only selected item gets the color variant
  - ❌ WRONG: `color={color}` for all items — All items show the color, defeating selection visibility
  - In SCSS: Create separate color variant rules that apply only when item is selected AND has the color class
  ```scss
  &.MuiChip-colorPrimary .MuiChip-root {
    background-color: var(--rds-color-primary, #1976d2);
    color: #ffffff;
    // ... dark theme overrides
  }
  ```

- **Size Reflection**: Size variants must be visually distinct and affect item dimensions
  - ✅ CORRECT: Small (24px height) → Medium (32px height) → Large (40px height)
  - In SCSS: Use size-specific padding/font-size rules
  ```scss
  &--small .MuiChip-root { height: 24px; font-size: 12px; }
  &--medium .MuiChip-root { height: 32px; font-size: 14px; }
  &--large .MuiChip-root { height: 40px; font-size: 16px; }
  ```
- Verify in Storybook: Change color/size props and confirm UI updates immediately

**Rule 4: Stories Interactive** — Default story uses `defaultValue` (uncontrolled). Interactive story uses `render` + `useState`

**Rule 5: CSS Classes Match SCSS** — Every dynamic class like `.rds-comp--small` must have `&--small { ... }` in SCSS with visual differences

**Rule 6: Layout All in SCSS with Theme Colors** 
- Flex, grid, spacing ALL via CSS variables (`--rds-spacing-md`, etc.)
- All text colors use `--rds-text-primary`, `--rds-text-secondary`, `--rds-text-disabled`
- All backgrounds use `--rds-background-surface`, `--rds-background-hover`
- All borders use `--rds-border-default`, `--rds-border-light`
- Theme automatically switches in dark mode via CSS variable override

**Rule 7: All Props Reflect** — Every prop in interface must visually/behaviorally affect output. No unused props.

## 📋 MINIMAL REFERENCE PATTERNS

### Props Interface
```typescript
export interface RdsComponentProps extends Omit<MuiComponentProps, 'variant'> {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined';
}
```

### Component (React.FC)
```typescript
const RdsComponent: React.FC<RdsComponentProps> = ({
  options, value: controlledValue, defaultValue, onChange, size = 'medium', variant, ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (newVal: string) => {
    if (!isControlled) setInternalValue(newVal);
    onChange?.(newVal);
  };
  
  const rootClasses = ['rds-comp-name', `rds-comp-name--${size}`].filter(Boolean).join(' ');
  
  return (
    <div className={rootClasses} role="group" data-testid="rds-comp-name">
      {options.map(opt => (
        <MuiComponent
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
          selected={value === opt.value}
          onClick={() => handleChange(opt.value)}
        >
          {opt.label}
        </MuiComponent>
      ))}
    </div>
  );
};
RdsComponent.displayName = 'RdsComponent';
export default RdsComponent;
```

### SCSS (BEM + CSS Variables with Dark & Light Theme)
```scss
.rds-comp-name {
  display: flex;
  gap: var(--rds-spacing-md, 16px);
  background-color: var(--rds-background-surface, #ffffff);
  color: var(--rds-text-primary, #212121);
  border: 1px solid var(--rds-border-default, #e0e0e0);
  border-radius: var(--rds-border-radius-sm, 4px);
  padding: var(--rds-spacing-md, 16px);
  transition: all 0.3s ease;
  
  // Dark mode: text & background overrides
  @media (prefers-color-scheme: dark) {
    background-color: #1e1e1e;
    color: #ffffff;
    border-color: #303030;
  }

  [data-theme="dark"] & {
    background-color: #1e1e1e;
    color: #ffffff;
    border-color: #303030;
  }
  
  // ─── Header Styling ─────────────────────────────────────
  &__header {
    color: var(--rds-text-primary, #212121);
    font-weight: 600;
    font-size: var(--rds-font-size-base, 14px);
    margin-bottom: var(--rds-spacing-sm, 8px);

    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }

    [data-theme="dark"] & {
      color: #ffffff;
    }
  }

  // ─── Item/Card Styling ─────────────────────────────────
  &__item {
    display: flex;
    align-items: center;
    gap: var(--rds-spacing-xs, 4px);
    padding: var(--rds-spacing-sm, 8px) var(--rds-spacing-md, 12px);
    cursor: pointer;
    border: 1px solid var(--rds-border-default, #e0e0e0);
    background-color: var(--rds-background-surface, #ffffff);
    color: var(--rds-text-primary, #212121);
    border-radius: var(--rds-border-radius-sm, 4px);
    transition: all 0.2s ease;
    min-height: 32px;

    &:hover:not(&--disabled) {
      background-color: var(--rds-background-hover, #f5f5f5);
      border-color: var(--rds-color-primary, #1976d2);
    }

    &--selected {
      background-color: var(--rds-color-primary, #1976d2);
      color: #ffffff;
      border-color: var(--rds-color-primary, #1976d2);
      font-weight: 600;
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: var(--rds-text-disabled, #bdbdbd);
    }

    // Dark mode variants
    @media (prefers-color-scheme: dark) {
      background-color: #2a2a2a;
      color: #ffffff;
      border-color: #303030;

      &:hover:not(&--disabled) {
        background-color: #363636;
        border-color: #5eb3ff;
      }

      &--disabled {
        color: #616161;
      }
    }

    [data-theme="dark"] & {
      background-color: #2a2a2a;
      color: #ffffff;
      border-color: #303030;

      &:hover:not(&--disabled) {
        background-color: #363636;
        border-color: #5eb3ff;
      }

      &--disabled {
        color: #616161;
      }
    }
  }

  // ─── Icon Styling (Size: 20px-24px) ─────────────────────
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    min-width: 20px;
    height: 20px;
    color: var(--rds-text-primary, #212121);

    svg {
      width: 20px;
      height: 20px;
      font-size: 20px;
    }

    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }

    [data-theme="dark"] & {
      color: #ffffff;
    }

    // When item is selected, ensure icon is visible/white
    .rds-comp-name__item--selected & {
      color: #ffffff;
    }
  }

  // ─── Label/Text Styling ───────────────────────────────────
  &__label {
    color: var(--rds-text-primary, #212121);
    font-size: var(--rds-font-size-base, 14px);
    font-weight: 500;
    white-space: nowrap;

    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }

    [data-theme="dark"] & {
      color: #ffffff;
    }
  }

  &__description {
    color: var(--rds-text-secondary, #757575);
    font-size: var(--rds-font-size-sm, 12px);
    margin-top: var(--rds-spacing-xs, 4px);

    @media (prefers-color-scheme: dark) {
      color: #b0b0b0;
    }

    [data-theme="dark"] & {
      color: #b0b0b0;
    }
  }

  // ─── Size Variants (Visual Distinction Required) ────────────
  &--small {
    padding: var(--rds-spacing-sm, 8px);
    gap: var(--rds-spacing-xs, 4px);
    
    .rds-comp-name__header {
      font-size: var(--rds-font-size-sm, 12px);
      margin-bottom: 4px;
    }

    .rds-comp-name__item {
      padding: 4px 8px;
      font-size: 12px;
      min-height: 24px;
    }

    .rds-comp-name__icon {
      width: 16px;
      height: 16px;
      min-width: 16px;

      svg {
        width: 16px;
        height: 16px;
        font-size: 16px;
      }
    }

    .rds-comp-name__label {
      font-size: 12px;
    }

    .rds-comp-name__description {
      font-size: 10px;
    }
  }

  &--medium {
    padding: var(--rds-spacing-md, 16px);
    gap: var(--rds-spacing-md, 16px);
    
    .rds-comp-name__header {
      font-size: var(--rds-font-size-base, 14px);
      margin-bottom: 8px;
    }

    .rds-comp-name__item {
      padding: 8px 12px;
      font-size: 14px;
      min-height: 32px;
    }

    .rds-comp-name__icon {
      width: 20px;
      height: 20px;
      min-width: 20px;
    }

    .rds-comp-name__label {
      font-size: 14px;
    }
  }

  &--large {
    padding: var(--rds-spacing-lg, 24px);
    gap: var(--rds-spacing-lg, 24px);
    
    .rds-comp-name__header {
      font-size: var(--rds-font-size-lg, 16px);
      margin-bottom: var(--rds-spacing-md, 16px);
      font-weight: 700;
    }

    .rds-comp-name__item {
      padding: 12px 16px;
      font-size: 16px;
      min-height: 40px;
    }

    .rds-comp-name__icon {
      width: 24px;
      height: 24px;
      min-width: 24px;

      svg {
        width: 24px;
        height: 24px;
        font-size: 24px;
      }
    }

    .rds-comp-name__label {
      font-size: 16px;
    }
  }

  // ─── Color Variant Selectors (Apply to Selected Items) ────────
  &.rds-comp-name--color-primary .rds-comp-name__item--selected {
    background-color: var(--rds-color-primary, #1976d2);
    border-color: var(--rds-color-primary, #1976d2);
    
    @media (prefers-color-scheme: dark) {
      background-color: #64b5f6;
      color: #121212;
    }

    [data-theme="dark"] & {
      background-color: #64b5f6;
      color: #121212;
    }
  }

  &.rds-comp-name--color-success .rds-comp-name__item--selected {
    background-color: var(--rds-color-success, #388e3c);
    border-color: var(--rds-color-success, #388e3c);
    
    @media (prefers-color-scheme: dark) {
      background-color: #66bb6a;
      color: #121212;
    }

    [data-theme="dark"] & {
      background-color: #66bb6a;
      color: #121212;
    }
  }

  &.rds-comp-name--color-error .rds-comp-name__item--selected {
    background-color: var(--rds-color-error, #d32f2f);
    border-color: var(--rds-color-error, #d32f2f);
    
    @media (prefers-color-scheme: dark) {
      background-color: #ef5350;
      color: #ffffff;
    }

    [data-theme="dark"] & {
      background-color: #ef5350;
      color: #ffffff;
    }
  }

  &.rds-comp-name--color-warning .rds-comp-name__item--selected {
    background-color: var(--rds-color-warning, #f57c00);
    border-color: var(--rds-color-warning, #f57c00);
    
    @media (prefers-color-scheme: dark) {
      background-color: #ffb74d;
      color: #121212;
    }

    [data-theme="dark"] & {
      background-color: #ffb74d;
      color: #121212;
    }
  }

  &.rds-comp-name--color-info .rds-comp-name__item--selected {
    background-color: var(--rds-color-info, #2196f3);
    border-color: var(--rds-color-info, #2196f3);
    
    @media (prefers-color-scheme: dark) {
      background-color: #64b5f6;
      color: #121212;
    }

    [data-theme="dark"] & {
      background-color: #64b5f6;
      color: #121212;
    }
  }
}
```

### Dark Theme Pattern (CRITICAL: Apply to ALL color/background changes)
```scss
// Pattern: ALWAYS include both @media query AND [data-theme] selector
// Light Mode → Dark Mode color mapping from actual components:
// #212121 (black text) → #ffffff (white text)
// #f5f5f5 (light gray bg) → #2a2a2a (medium gray bg)
// #ffffff (white bg) → #2a2a2a (dark card bg)
// #1e1e1e (dark surface) → #2a2a2a (slightly lighter for contrast)
// #e0e0e0 (light border) → #303030 (dark border)
// #757575 (secondary text) → #b0b0b0 (light secondary text)
// #bdbdbd (disabled text) → #616161 (medium gray disabled)

.element {
  background-color: var(--rds-background-surface, #ffffff);
  color: var(--rds-text-primary, #212121);
  border: 1px solid var(--rds-border-default, #e0e0e0);
  
  // REQUIRED: Dark mode override
  @media (prefers-color-scheme: dark) {
    background-color: #2a2a2a;
    color: #ffffff;
    border-color: #303030;
  }
  
  // REQUIRED: Support explicit [data-theme="dark"] attribute
  [data-theme="dark"] & {
    background-color: #2a2a2a;
    color: #ffffff;
    border-color: #303030;
  }

  // Hover state with dark mode
  &:hover {
    background-color: var(--rds-background-hover, #f5f5f5);
    
    @media (prefers-color-scheme: dark) {
      background-color: #363636;
    }

    [data-theme="dark"] & {
      background-color: #363636;
    }
  }
}
```

### Spacing Scale (CSS Variables → Pixel Values)
```scss
// Standard spacing used across all components:
// --rds-spacing-xxs: 2px   (minimal gaps)
// --rds-spacing-xs:  4px   (tight spacing between elements)
// --rds-spacing-sm:  8px   (common padding inside items)
// --rds-spacing-md: 16px   (default gap, padding, margin)
// --rds-spacing-lg: 24px   (larger containers, sections)
// --rds-spacing-xl: 32px   (major spacing between sections)

// Example usage in component:
.rds-comp-name {
  padding: var(--rds-spacing-md, 16px);          // Container padding
  gap: var(--rds-spacing-md, 16px);              // Space between items
  
  &__item {
    padding: var(--rds-spacing-sm, 8px) var(--rds-spacing-md, 12px);  // Vertical & horizontal
    margin-bottom: var(--rds-spacing-xs, 4px);   // Small gaps
  }

  &--small {
    padding: var(--rds-spacing-sm, 8px);
    gap: var(--rds-spacing-xs, 4px);
  }

  &--large {
    padding: var(--rds-spacing-lg, 24px);
    gap: var(--rds-spacing-lg, 24px);
  }
}
```

### Font Size Hierarchy (CSS Variables → Pixel Values)
```scss
// Standard font sizes used across all components:
// --rds-font-size-xs:   10px  (smallest labels)
// --rds-font-size-sm:   12px  (secondary text, small labels)
// --rds-font-size-base: 14px  (default body text, labels)
// --rds-font-size-lg:   16px  (large text, main headers)
// --rds-font-size-xl:   18px  (prominent headers)
// --rds-font-size-xxl:  20px  (major headings)

// Font weight standards:
// Regular: 400
// Medium:  500 (labels, emphasis)
// Bold:    600 (headers, selected items)
// ExtraBold: 700 (main headers)

.rds-comp-name {
  // Main header/title
  &__header {
    font-size: var(--rds-font-size-base, 14px);  // 14px default
    font-weight: 600;                            // Bold for emphasis
  }

  // Body text
  &__content {
    font-size: var(--rds-font-size-base, 14px);  // 14px default
    font-weight: 400;                            // Regular weight
  }

  // Secondary/subtext
  &__description,
  &__hint {
    font-size: var(--rds-font-size-sm, 12px);    // 12px for secondary
    font-weight: 400;
    color: var(--rds-text-secondary, #757575);
  }

  // Size variant hierarchy
  &--small &__header {
    font-size: var(--rds-font-size-sm, 12px);    // Smaller in small variant
    font-weight: 600;
  }

  &--large &__header {
    font-size: var(--rds-font-size-lg, 16px);    // Larger in large variant
    font-weight: 700;                            // Extra bold
  }
}
```

### Icon Sizing Standards (Component-Level)
```scss
// Icon sizes must scale with component size to maintain visual hierarchy:
// Small component:  16px icons (with --small variant)
// Medium component: 20px icons (default)
// Large component:  24px icons (with --large variant)

.rds-comp-name {
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    // DEFAULT MEDIUM SIZE: 20px
    width: 20px;
    min-width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
      font-size: 20px;
    }

    // Icon color must match text - not hardcoded
    color: var(--rds-text-primary, #212121);
    
    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }

    [data-theme="dark"] & {
      color: #ffffff;
    }

    // When item is selected, ensure icon visibility
    .rds-comp-name__item--selected & {
      color: #ffffff;  // White icon on colored background
    }
  }

  // Size variants must change icon dimensions
  &--small &__icon {
    width: 16px;
    min-width: 16px;
    height: 16px;

    svg {
      width: 16px;
      height: 16px;
      font-size: 16px;
    }
  }

  &--large &__icon {
    width: 24px;
    min-width: 24px;
    height: 24px;

    svg {
      width: 24px;
      height: 24px;
      font-size: 24px;
    }
  }

  // Leading icon in headers/titles (common pattern)
  &__leading-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: var(--rds-spacing-sm, 8px);  // Gap between icon and text
  }
}
```

### Common Component Spacing Patterns
```scss
// Pattern 1: Flex row with icon + label
.component-with-icon {
  display: flex;
  align-items: center;
  gap: var(--rds-spacing-xs, 4px);      // Small gap between icon & text
  padding: var(--rds-spacing-sm, 8px) var(--rds-spacing-md, 12px);
}

// Pattern 2: Flex column with header + content
.component-with-sections {
  display: flex;
  flex-direction: column;
  gap: var(--rds-spacing-md, 16px);     // Larger gap between sections

  &__header {
    margin-bottom: var(--rds-spacing-sm, 8px);
  }

  &__content {
    margin-top: var(--rds-spacing-xs, 4px);
  }
}

// Pattern 3: List of items with spacing
.component-list {
  display: flex;
  flex-direction: column;
  gap: var(--rds-spacing-sm, 8px);      // Gap between list items

  &__item {
    padding: var(--rds-spacing-md, 16px);
    
    &:not(:last-child) {
      border-bottom: 1px solid var(--rds-border-default, #e0e0e0);
    }
  }
}
```

### Tests (3 categories minimum)
```typescript
describe('RdsComponent', () => {
  describe('Uncontrolled', () => {
    it('defaultValue works, clicks update', () => {
      render(<RdsComponent options={opts} defaultValue="a" />);
      fireEvent.click(screen.getByTestId('item-b'));
      expect(screen.getByTestId('item-b')).toHaveAttribute('aria-pressed', 'true');
    });
  });
  
  describe('Controlled', () => {
    it('onChange fires', () => {
      const handleChange = jest.fn();
      render(<RdsComponent options={opts} value="a" onChange={handleChange} />);
      fireEvent.click(screen.getByTestId('item-b'));
      expect(handleChange).toHaveBeenCalledWith('b');
    });
  });
  
  describe('MUI Props', () => {
    it('size prop applies', () => {
      const { container } = render(<RdsComponent options={opts} size="large" />);
      expect(container.querySelector('.rds-comp-name--large')).toBeInTheDocument();
    });
  });
});
```

### Stories (2 minimum: Default + Interactive)
```typescript
const meta: Meta<typeof RdsComponent> = {
  title: 'Components/Name',
  component: RdsComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['filled', 'outlined'] },
  },
};

export const Default: Story = {
  args: { options: myOptions, defaultValue: 'a' },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('a');
    return (
      <div>
        <p>Selected: <strong>{value}</strong></p>
        <RdsComponent {...args} options={myOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};
```

### Component-Specific Playground Stories

#### For Selection Components (Chip, ButtonGroup, Radio, Checkbox)
```typescript
// 1. All Color Variations
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <RdsComponent label="Default" />
      <RdsComponent label="Primary" color="primary" />
      <RdsComponent label="Success" color="success" />
      <RdsComponent label="Error" color="error" />
      <RdsComponent label="Warning" color="warning" />
      <RdsComponent label="Info" color="info" />
      <RdsComponent label="Secondary" color="secondary" />
    </div>
  ),
};

// 2. All Sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <RdsComponent label="Small" size="small" />
      <RdsComponent label="Medium" size="medium" />
      <RdsComponent label="Large" size="large" />
    </div>
  ),
};

// 3. Variant Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Filled Variants</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['primary', 'success', 'error', 'warning'].map(color => (
            <RdsComponent key={color} label={color} color={color} variant="filled" />
          ))}
        </div>
      </div>
      <div>
        <h3>Outlined Variants</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['primary', 'success', 'error', 'warning'].map(color => (
            <RdsComponent key={color} label={color} color={color} variant="outlined" />
          ))}
        </div>
      </div>
    </div>
  ),
};
```

#### For Form Components (Input, Select, TextField)
```typescript
// 1. All Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RdsComponent variant="filled" label="Filled" />
      <RdsComponent variant="outlined" label="Outlined" />
      <RdsComponent variant="standard" label="Standard" />
    </div>
  ),
};

// 2. States Showcase
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RdsComponent label="Default" />
      <RdsComponent label="Focused" />
      <RdsComponent label="With Value" defaultValue="Sample Value" />
      <RdsComponent label="Disabled" disabled />
      <RdsComponent label="Error" error helperText="Error message" />
      <RdsComponent label="Success" success helperText="Success message" />
    </div>
  ),
};

// 3. Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RdsComponent size="small" label="Small" />
      <RdsComponent size="medium" label="Medium" />
      <RdsComponent size="large" label="Large" />
    </div>
  ),
};
```

#### For Icon Components (IconButton, Button with Icon)
```typescript
// 1. Icons with Different Sizes
export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <RdsComponent icon={<Icon />} size="small" />
      <RdsComponent icon={<Icon />} size="medium" />
      <RdsComponent icon={<Icon />} size="large" />
    </div>
  ),
};

// 2. Icon with Text Combinations
export const IconWithText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <RdsComponent icon={<Icon />} label="Icon + Text" />
      <RdsComponent icon={<Icon />} />
      <RdsComponent label="Text Only" />
    </div>
  ),
};

// 3. All Icon Colors
export const IconColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(color => (
        <RdsComponent key={color} icon={<Icon />} color={color} />
      ))}
    </div>
  ),
};
```

#### For Container Components (Card, Paper, Dialog)
```typescript
// 1. Elevation Levels
export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {[0, 1, 2, 3, 4].map(elevation => (
        <RdsComponent key={elevation} elevation={elevation}>
          Elevation {elevation}
        </RdsComponent>
      ))}
    </div>
  ),
};

// 2. Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RdsComponent variant="filled">Filled Variant</RdsComponent>
      <RdsComponent variant="outlined">Outlined Variant</RdsComponent>
      <RdsComponent variant="elevated">Elevated Variant</RdsComponent>
    </div>
  ),
};
```

## 🚫 FORBIDDEN PATTERNS

```typescript
// ❌ NO inline sx, style, or layout props
<Box sx={{ display: 'flex', padding: 2, gap: 1 }}>
<Typography sx={{ fontWeight: 600, mb: 1 }}>

// ❌ NO accepting props without forwarding to MUI component
const Comp = ({ size, variant, ...props }) => <MuiComp>  {/* lost props */}

// ❌ NO value without onChange in stories (freezes UI)
export const Broken: Story = { args: { value: 'a' } };

// ❌ NO testing MUI internal class names
expect(el).toHaveClass('MuiButtonGroup-sizeLarge');

// ❌ NO unused props or dead code
export interface Props { size?: string; } // but never used in component

// ❌ NO incomplete playgrounds in stories
export const AllVariants: Story = {
  args: { variant: 'filled' }  // Only shows one variant, not all!
};

// ❌ NO playground stories without clear section headers/groups
export const Showcase: Story = {
  render: () => (
    <>
      <RdsComponent />
      <RdsComponent variant="outlined" />
      {/* No visual separation or labels - confusing */}
    </>
  ),
};
```

## 📚 MUI PLAYGROUND PATTERNS TO REPLICATE

When creating Storybook playgrounds, mirror the structure and presentation from MUI's official documentation:

### Pattern 1: Variant & Style Showcase
MUI Pattern: Button variants (Text, Contained, Outlined)
```typescript
export const VariantShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <section>
        <h3>Filled Variant</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <RdsComponent variant="filled" label="Default" />
          <RdsComponent variant="filled" label="Primary" color="primary" />
          <RdsComponent variant="filled" label="Success" color="success" />
        </div>
      </section>
      
      <section>
        <h3>Outlined Variant</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <RdsComponent variant="outlined" label="Default" />
          <RdsComponent variant="outlined" label="Primary" color="primary" />
          <RdsComponent variant="outlined" label="Success" color="success" />
        </div>
      </section>
    </div>
  ),
};
```

### Pattern 2: Size Progression
MUI Pattern: Small → Medium → Large progression
```typescript
export const SizeProgression: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div>
        <h4>Small</h4>
        <RdsComponent size="small" label="Small" />
      </div>
      <div>
        <h4>Medium</h4>
        <RdsComponent size="medium" label="Medium" />
      </div>
      <div>
        <h4>Large</h4>
        <RdsComponent size="large" label="Large" />
      </div>
    </div>
  ),
};
```

### Pattern 3: State Progression
MUI Pattern: Default → Hover → Active → Disabled
```typescript
export const StateProgression: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>Default State</h4>
        <RdsComponent label="Default" />
      </div>
      <div>
        <h4>Active/Selected State</h4>
        <RdsComponent label="Selected" selected />
      </div>
      <div>
        <h4>Disabled State</h4>
        <RdsComponent label="Disabled" disabled />
      </div>
    </div>
  ),
};
```

### Pattern 4: Color Palette Showcase
MUI Pattern: All semantic colors displayed
```typescript
export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {[
        { color: 'default', label: 'Default' },
        { color: 'primary', label: 'Primary' },
        { color: 'secondary', label: 'Secondary' },
        { color: 'success', label: 'Success' },
        { color: 'error', label: 'Error' },
        { color: 'warning', label: 'Warning' },
        { color: 'info', label: 'Info' },
      ].map(({ color, label }) => (
        <RdsComponent key={color} color={color} label={label} />
      ))}
    </div>
  ),
};
```

### Pattern 5: Interactive Playground with Controls
MUI Pattern: Interactive demo with state management
```typescript
export const InteractivePlayground: Story = {
  render: (args) => {
    const [value, setValue] = useState('primary');
    const [size, setSize] = useState('medium');
    const [variant, setVariant] = useState('filled');
    const [disabled, setDisabled] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            <option>filled</option>
            <option>outlined</option>
          </select>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>small</option>
            <option>medium</option>
            <option>large</option>
          </select>
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="primary">Primary</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
          <label>
            <input 
              type="checkbox" 
              checked={disabled} 
              onChange={(e) => setDisabled(e.target.checked)} 
            />
            Disabled
          </label>
        </div>

        <div>
          <h4>Preview</h4>
          <RdsComponent 
            {...args}
            variant={variant}
            size={size}
            color={value}
            disabled={disabled}
            label="Interactive Component"
          />
        </div>
      </div>
    );
  },
};
```

### Pattern 6: Real-World Use Cases
MUI Pattern: Practical examples showing component in context
```typescript
export const UseCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <section>
        <h3>Form Validation Example</h3>
        <RdsComponent 
          label="Enter email" 
          error 
          helperText="Invalid email format"
        />
      </section>

      <section>
        <h3>Filter Tags</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['React', 'TypeScript', 'MUI'].map(tag => (
            <RdsComponent key={tag} label={tag} color="primary" onDelete={() => {}} />
          ))}
        </div>
      </section>

      <section>
        <h3>Status Indicators</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <RdsComponent label="Success" color="success" icon={<CheckIcon />} />
          <RdsComponent label="Error" color="error" icon={<ErrorIcon />} />
          <RdsComponent label="Pending" color="warning" icon={<ClockIcon />} />
        </div>
      </section>
    </div>
  ),
};
```

## 📋 PLAYGROUND STORY BEST PRACTICES

1. **Use Section Headers**: Clearly label different showcases (Variants, Sizes, States, etc.)
2. **Logical Grouping**: Group related variations together (all sizes, all colors)
3. **Visual Spacing**: Use consistent gap values and padding for clarity
4. **Labels**: Always label size/variant options clearly (e.g., "Small", "Medium", "Large")
5. **Interactive Demos**: Include at least one story with controls for users to experiment
6. **Real-World Examples**: Show practical use cases beyond basic props
7. **Responsive Layout**: Use flexbox for responsive playground layouts
8. **Accessibility**: Ensure playgrounds demonstrate accessible prop usage
9. **Dark Mode**: Test all playgrounds visually in both light and dark themes
10. **Documentation**: Add brief descriptions in comments explaining what each section demonstrates



## 📂 FILE STRUCTURE

```
raaghu-{elements|components}/rds-{comp-}{name}/
├── rds-{comp-}{name}.tsx
├── rds-{comp-}{name}.scss
├── rds-{comp-}{name}.test.tsx
└── rds-{comp-}{name}.stories.tsx
```

**⚠️ CRITICAL: DO NOT CREATE `index.ts` inside component folders**
- Export directly from `raaghu-components/index.ts` using:
  ```typescript
  export {default as RdsCompName, type RdsCompNameProps} from './rds-comp-name/rds-comp-name';
  ```
- DO NOT create intermediate `index.ts` files at the component level

## 🔄 ISSUE RESOLUTION WORKFLOW

When a user reports issues with a generated component, follow this structured approach:

### Step 1: Report the Issue
Users should clearly describe what's broken:
```
## Issue Report: [Component Name]

### Issues Found
1. [Specific issue description]
2. [Another issue]

### Steps to Reproduce
- [How to see the issue]

### Expected Behavior
- [What should happen]
```

### Step 2: Check Learned Issues Log
- Cross-reference reported issues with the **Learned Issues** section above
- Identify root cause from the prevention rules
- Apply specific fix from the solution section

### Step 3: Fix the Component
- Apply targeted fix to component files (.tsx, .scss, .test.tsx, .stories.tsx)
- Verify fix in both light and dark themes
- Run `npm test` to ensure tests pass
- Open Storybook to visually verify fix

### Step 4: Document Learning
For NEW issue types not in the log:
1. Create issue entry following the template
2. Add to \"Current Learned Issues\" section
3. Extract prevention rule
4. Update verification checklist
5. Update CRITICAL RULES section if appropriate

### Step 5: Prevent Recurrence
- Add issue to checklist items
- Reference issue in CRITICAL RULES
- Include in code generation template
- Future components automatically avoid the issue

### Common Issue Patterns Quick Reference

| Issue | Root Cause | Quick Fix | Prevention |
|-------|-----------|----------|-----------|
| Props don't change UI | Props not mapped to CSS classes | Add `.rds-comp--{prop}` classes | RULE 7: All props must visually reflect |
| Dark mode colors broken | Hardcoded colors without dark overrides | Add `@media (prefers-color-scheme: dark)` | RULE 0: All colors use CSS variables |
| Uncontrolled mode doesn't work | Missing `useState` logic | Add controlled/uncontrolled state pattern | RULE 1: Implement both modes |
| Storybook story frozen | `value` without `onChange` handler | Use `render` + `useState` in Interactive | RULE 4: Never mix value + no onChange |
| Tests fail | Missing 3 test categories | Add Uncontrolled, Controlled, MUI Props | RULE 6: All 3 categories required |
| Size variants look identical | Missing CSS variants with different sizes | Add `.rds-comp--small/medium/large` styles | RULE 8: Visual size differences required |

## ✅ VERIFICATION CHECKLIST (Before submitting)

### Preventing Known Issues (From Learning Log)
Before verifying, review the **Learned Issues** section and ensure:
- [ ] **Issue #1**: ZERO inline styles - verify no `sx={}`, `style={}`, `css={}` in `.tsx`
- [ ] **Issue #2**: All colors use variables with dark theme - every color has dark mode override
- [ ] **Issue #3**: All props reflect visually - test each prop in Storybook, verify UI changes
- [ ] **Issue #4**: Both controlled + uncontrolled modes work - test `defaultValue` AND `value` + `onChange`
- [ ] **Issue #5**: ARIA attributes present - component has `role`, `aria-*`, `data-testid` as appropriate
- [ ] **Issue #6**: 3 test categories exist - Uncontrolled, Controlled, MUI Props
- [ ] **Issue #7**: Interactive story works - change props in Storybook, UI responds immediately
- [ ] **Issue #8**: Size variants visually distinct - small/medium/large are clearly different
- [ ] **Issue #9**: 6+ playground stories - AllColors, AllSizes, AllVariants, States, Interactive
- [ ] **Issue #10**: MUI props forward - `variant`, `size`, `color`, `disabled` all work on component

### Component Structure
- [ ] Component has BOTH controlled (value) and uncontrolled (defaultValue) modes
- [ ] Uncontrolled: clicking works without external state
- [ ] Default story uses `defaultValue`; Interactive uses `render` + `useState`
- [ ] Storybook controls visually change UI
- [ ] ALL MUI props forward to MUI component
- [ ] ZERO `sx={}` in `.tsx` (verify via search)
- [ ] Every CSS class has matching SCSS rule
- [ ] All colors use CSS variables: `var(--rds-text-primary, #212121)`
- [ ] Headers use `--rds-text-primary` with proper contrast
- [ ] Backgrounds use `--rds-background-surface` and `--rds-background-hover`
- [ ] Borders use `--rds-border-default` and `--rds-border-light`
- [ ] Component looks correct in BOTH light & dark themes
- [ ] Dark theme variables defined in SCSS (via `[data-theme="dark"]` or `@media (prefers-color-scheme: dark)`)
- [ ] Tests pass: `npm test -- --testPathPattern="{name}"`
- [ ] NO `index.ts` file created at component level
- [ ] Component exported in `raaghu-components/index.ts` (direct export from component file, not intermediate index)

## 📝 COLOR & SPACING STANDARDS (Use These Exactly)

### Text Color Usage (CRITICAL - Match existing components)
```scss
// PRIMARY TEXT (Headers, main content)
&__header,
&__title,
&__label,
&__content {
  color: var(--rds-text-primary, #212121);  // Light: #212121, Dark: #ffffff
  font-weight: 600;
  font-size: var(--rds-font-size-base, 14px);

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }

  [data-theme="dark"] & {
    color: #ffffff;
  }
}

// SECONDARY TEXT (Subtext, hints, placeholders)
&__subtext,
&__placeholder,
&__hint,
&__description {
  color: var(--rds-text-secondary, #757575);  // Light: #757575, Dark: #b0b0b0
  font-size: var(--rds-font-size-sm, 12px);
  font-weight: 400;

  @media (prefers-color-scheme: dark) {
    color: #b0b0b0;
  }

  [data-theme="dark"] & {
    color: #b0b0b0;
  }
}

// DISABLED TEXT (Disabled items)
&--disabled {
  color: var(--rds-text-disabled, #bdbdbd);  // Light: #bdbdbd, Dark: #616161
  opacity: 0.5;
  cursor: not-allowed;

  @media (prefers-color-scheme: dark) {
    color: #616161;
  }

  [data-theme="dark"] & {
    color: #616161;
  }
}
```

### Background & Border Usage
```scss
// SURFACE BACKGROUND (Containers, cards, main background)
&__container,
&__card,
&__surface {
  background-color: var(--rds-background-surface, #ffffff);  // Light: #ffffff, Dark: #2a2a2a
  border: 1px solid var(--rds-border-default, #e0e0e0);      // Light: #e0e0e0, Dark: #303030

  @media (prefers-color-scheme: dark) {
    background-color: #2a2a2a;
    border-color: #303030;
  }

  [data-theme="dark"] & {
    background-color: #2a2a2a;
    border-color: #303030;
  }
}

// HOVER BACKGROUND (Interactive elements)
&__item:hover {
  background-color: var(--rds-background-hover, #f5f5f5);  // Light: #f5f5f5, Dark: #363636
  
  @media (prefers-color-scheme: dark) {
    background-color: #363636;
  }

  [data-theme="dark"] & {
    background-color: #363636;
  }
}

// LIGHT BORDER (Subtle dividers)
.rds-comp-divider {
  border-color: var(--rds-border-light, #f0f0f0);  // Light: #f0f0f0, Dark: #262626
  
  @media (prefers-color-scheme: dark) {
    border-color: #262626;
  }

  [data-theme="dark"] & {
    border-color: #262626;
  }
}
```

### Icon Color (Must Match Text Color, NOT Hardcoded)
```scss
// ❌ WRONG: Hardcoded icon color
.icon { color: #1976d2; }  // Invisible on dark background!

// ✅ CORRECT: Icon inherits text color or uses text variables
.rds-comp-name__icon {
  color: var(--rds-text-primary, #212121);  // Inherits from parent text color
  
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }

  [data-theme="dark"] & {
    color: #ffffff;
  }

  // When inside a selected item, match the selected text color
  .rds-comp-name__item--selected & {
    color: #ffffff;  // White on colored background
  }
}
```

## 🧪 TEST REQUIREMENTS (Minimum)

1. **Rendering**: Component exists, has correct class, uses CSS variables
2. **Uncontrolled**: `defaultValue` works, clicks update UI
3. **Controlled**: `value` prop reflects, `onChange` fires
4. **MUI Props**: `size`, `variant`, `color` visually render with theme colors
5. **Accessibility**: `role`, `aria-pressed`, `aria-label` present
6. **Theme Colors**: All text uses `--rds-text-*` vars, all backgrounds use `--rds-background-*` vars
7. **Dark Mode** (Optional but Recommended): Verify component appearance with `data-theme="dark"` applied

## 🎨 COLOR & SIZE REFLECTION IN SELECTABLE COMPONENTS (CRITICAL)

For components with selectable items (Chip, ButtonGroup, etc.), ensure color and size props properly reflect in the UI. This is essential for user feedback.

### Size Reflection - MUST Be Visually Distinct
```typescript
// ✅ CORRECT: Different sizes show clearly different dimensions
// Small:  16px icons, 24px min-height, 12px font
// Medium: 20px icons, 32px min-height, 14px font
// Large:  24px icons, 40px min-height, 16px font

// ❌ WRONG: All sizes look the same
const chipComponent = (
  <MuiChip
    size={size}  // Not using size to affect visuals!
  />
);

// ✅ CORRECT in TypeScript:
const chipComponent = (
  <MuiChip
    size={size}
    className={`rds-comp-chip--${size}`}  // Use class for size styling
  />
);
```

### SCSS Size Variant Pattern (From Real Components)
```scss
// SMALL SIZE: Compact, dense layout
&--small {
  padding: var(--rds-spacing-sm, 8px);
  gap: var(--rds-spacing-xs, 4px);

  .rds-comp-name__item {
    padding: 4px 8px;
    min-height: 24px;
    font-size: var(--rds-font-size-sm, 12px);
  }

  .rds-comp-name__icon {
    width: 16px;
    height: 16px;
    svg { width: 16px; height: 16px; }
  }
}

// MEDIUM SIZE: Default, balanced
&--medium {
  padding: var(--rds-spacing-md, 16px);
  gap: var(--rds-spacing-md, 16px);

  .rds-comp-name__item {
    padding: 8px 12px;
    min-height: 32px;
    font-size: var(--rds-font-size-base, 14px);
  }

  .rds-comp-name__icon {
    width: 20px;
    height: 20px;
    svg { width: 20px; height: 20px; }
  }
}

// LARGE SIZE: Spacious, prominent
&--large {
  padding: var(--rds-spacing-lg, 24px);
  gap: var(--rds-spacing-lg, 24px);

  .rds-comp-name__item {
    padding: 12px 16px;
    min-height: 40px;
    font-size: var(--rds-font-size-lg, 16px);
  }

  .rds-comp-name__icon {
    width: 24px;
    height: 24px;
    svg { width: 24px; height: 24px; }
  }
}
```

### Color Reflection - ONLY Selected Items Get the Color
```typescript
// ✅ CORRECT: Color applies ONLY when selected (provides visual feedback)
const chipComponent = (
  <MuiChip
    color={isSelected ? (color as any) : 'default'}
    // ↑ Only selected items show the color variant!
  />
);

// ❌ WRONG: All items show the color (confuses users)
const chipComponent = (
  <MuiChip
    color={color !== 'default' ? (color as any) : 'default'}
    // ↑ All items are colored, defeating selection feedback
  />
);
```

### SCSS Color Variant Pattern (From Real Components)
```scss
// Apply color variants ONLY to selected items with proper dark mode support

&.rds-comp-name--color-primary .rds-comp-name__item--selected {
  background-color: var(--rds-color-primary, #1976d2);
  border-color: var(--rds-color-primary, #1976d2);
  color: #ffffff;

  // Dark mode: adjust hue for visibility on dark background
  @media (prefers-color-scheme: dark) {
    background-color: #64b5f6;  // Lighter blue for dark background
    color: #121212;
  }

  [data-theme="dark"] & {
    background-color: #64b5f6;
    color: #121212;
  }
}

&.rds-comp-name--color-success .rds-comp-name__item--selected {
  background-color: var(--rds-color-success, #388e3c);
  border-color: var(--rds-color-success, #388e3c);
  color: #ffffff;

  @media (prefers-color-scheme: dark) {
    background-color: #66bb6a;
    color: #121212;
  }

  [data-theme="dark"] & {
    background-color: #66bb6a;
    color: #121212;
  }
}

&.rds-comp-name--color-error .rds-comp-name__item--selected {
  background-color: var(--rds-color-error, #d32f2f);
  border-color: var(--rds-color-error, #d32f2f);
  color: #ffffff;

  @media (prefers-color-scheme: dark) {
    background-color: #ef5350;
    color: #ffffff;
  }

  [data-theme="dark"] & {
    background-color: #ef5350;
    color: #ffffff;
  }
}

&.rds-comp-name--color-warning .rds-comp-name__item--selected {
  background-color: var(--rds-color-warning, #f57c00);
  border-color: var(--rds-color-warning, #f57c00);
  color: #ffffff;

  @media (prefers-color-scheme: dark) {
    background-color: #ffb74d;
    color: #121212;
  }

  [data-theme="dark"] & {
    background-color: #ffb74d;
    color: #121212;
  }
}

&.rds-comp-name--color-info .rds-comp-name__item--selected {
  background-color: var(--rds-color-info, #2196f3);
  border-color: var(--rds-color-info, #2196f3);
  color: #ffffff;

  @media (prefers-color-scheme: dark) {
    background-color: #64b5f6;
    color: #121212;
  }

  [data-theme="dark"] & {
    background-color: #64b5f6;
    color: #121212;
  }
}
```

### Verification in Storybook
After creating the component, verify in Storybook:
1. **Size Changes**: Toggle between small/medium/large → Items should look noticeably different
2. **Color Changes**: Change color prop → Only selected item should show the color
3. **Dark Mode**: Switch to dark theme → All colors and text should be visible
4. **Disabled State**: Toggle disabled → Should show reduced opacity, different cursor

## 🎨 DARK & LIGHT THEME SUPPORT

### Theme Variables (Light & Dark Modes)

#### Light Theme (Default)
```scss
// Text Colors
--rds-text-primary: #212121        // Headers, main content
--rds-text-secondary: #757575      // Subtext, labels
--rds-text-disabled: #bdbdbd       // Disabled states

// Background Colors
--rds-background-surface: #ffffff  // Main backgrounds
--rds-background-hover: #f5f5f5    // Hover states
--rds-background-active: #eeeeee   // Active states

// Borders
--rds-border-default: #e0e0e0      // Standard borders
--rds-border-light: #f0f0f0        // Subtle borders

// Component Colors
--rds-color-primary: #1976d2       // Primary actions
--rds-color-secondary: #7c4dff     // Secondary actions
--rds-color-success: #388e3c       // Success states
--rds-color-warning: #f57c00       // Warning states
--rds-color-error: #d32f2f         // Error states
--rds-color-info: #0097a7          // Info states
```

#### Dark Theme
```scss
// Text Colors
--rds-text-primary: #ffffff        // Headers, main content (white)
--rds-text-secondary: #b0b0b0      // Subtext, labels (light gray)
--rds-text-disabled: #616161       // Disabled states (darker gray)

// Background Colors
--rds-background-surface: #121212  // Main backgrounds (dark gray)
--rds-background-hover: #1e1e1e    // Hover states (slightly lighter)
--rds-background-active: #2a2a2a   // Active states (more visible)

// Borders
--rds-border-default: #303030      // Standard borders (dark)
--rds-border-light: #1f1f1f        // Subtle borders (very dark)

// Component Colors (adjusted for contrast)
--rds-color-primary: #64b5f6       // Primary actions (lighter blue)
--rds-color-secondary: #ba68c8     // Secondary actions (adjusted purple)
--rds-color-success: #81c784       // Success states (lighter green)
--rds-color-warning: #ffb74d       // Warning states (lighter orange)
--rds-color-error: #ef5350         // Error states (lighter red)
--rds-color-info: #4dd0e1          // Info states (lighter cyan)
```

### SCSS Pattern for Dark & Light Themes
```scss
.rds-component {
  // Light theme (default)
  background-color: var(--rds-background-surface, #ffffff);
  color: var(--rds-text-primary, #212121);
  border: 1px solid var(--rds-border-default, #e0e0e0);

  &__header {
    color: var(--rds-text-primary, #212121);
    font-weight: 600;
    padding: var(--rds-spacing-md, 16px);
  }

  &__content {
    color: var(--rds-text-primary, #212121);
    padding: var(--rds-spacing-md, 16px);
  }

  &__label {
    color: var(--rds-text-secondary, #757575);
    font-size: var(--rds-font-size-sm, 12px);
  }

  // Hover state with theme support
  &:hover {
    background-color: var(--rds-background-hover, #f5f5f5);
  }

  // Active/selected state
  &--active {
    background-color: var(--rds-color-primary, #1976d2);
    color: #ffffff;  // Always white text on primary color
  }

  // Disabled state
  &--disabled {
    background-color: var(--rds-background-surface, #ffffff);
    color: var(--rds-text-disabled, #bdbdbd);
    cursor: not-allowed;
    opacity: 0.5;
  }

  // Size variants with proper text contrast
  &--small {
    &__header { font-size: var(--rds-font-size-sm, 12px); }
    &__content { font-size: var(--rds-font-size-sm, 12px); }
  }

  &--large {
    &__header { font-size: var(--rds-font-size-lg, 16px); }
    &__content { font-size: var(--rds-font-size-base, 14px); }
  }
}

// Dark theme detection (using CSS attribute selector)
// In your HTML/React component add: <div data-theme="dark">
[data-theme="dark"] {
  --rds-text-primary: #ffffff;
  --rds-text-secondary: #b0b0b0;
  --rds-text-disabled: #616161;
  --rds-background-surface: #121212;
  --rds-background-hover: #1e1e1e;
  --rds-background-active: #2a2a2a;
  --rds-border-default: #303030;
  --rds-border-light: #1f1f1f;
  --rds-color-primary: #64b5f6;
  --rds-color-secondary: #ba68c8;
  --rds-color-success: #81c784;
  --rds-color-warning: #ffb74d;
  --rds-color-error: #ef5350;
  --rds-color-info: #4dd0e1;
}

// Alternative: Using prefers-color-scheme media query
@media (prefers-color-scheme: dark) {
  .rds-component {
    --rds-text-primary: #ffffff;
    --rds-text-secondary: #b0b0b0;
    --rds-background-surface: #121212;
    // ... all dark theme variables
  }
}
```

### Theme-Aware Component Example
```typescript
interface RdsComponentProps extends Omit<MuiComponentProps, 'variant'> {
  label?: string;
  value?: string;
  defaultValue?: string;
  theme?: 'light' | 'dark' | 'auto';  // auto uses system preference
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined';
}

const RdsComponent: React.FC<RdsComponentProps> = ({
  label,
  value: controlledValue,
  defaultValue,
  theme = 'auto',
  size = 'medium',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Detect system theme preference if theme is 'auto'
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const activeTheme = theme === 'auto' ? systemTheme : theme;

  const rootClasses = [
    'rds-component',
    `rds-component--${size}`,
    activeTheme === 'dark' && 'rds-component--dark',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses} data-theme={activeTheme} {...props}>
      {label && <div className="rds-component__header">{label}</div>}
      <div className="rds-component__content">{value}</div>
    </div>
  );
};
```

### CSS Variable Priority Order
1. **Component-level** overrides (e.g., `color={error}`)
2. **Theme variables** (e.g., `--rds-text-primary`)
3. **Fallback defaults** (e.g., `#212121`)

```scss
// CORRECT ✅
color: var(--rds-text-primary, #212121);

// WRONG ❌
color: #212121;  // No theme support
```

## 📚 THEME VARIABLES (Quick Reference)

### Spacing
- `--rds-spacing-xs`: 4px
- `--rds-spacing-sm`: 8px
- `--rds-spacing-md`: 16px
- `--rds-spacing-lg`: 24px
- `--rds-spacing-xl`: 32px

### Font Sizes
- `--rds-font-size-sm`: 12px
- `--rds-font-size-base`: 14px
- `--rds-font-size-lg`: 16px

### Border Radius
- `--rds-border-radius-sm`: 4px
- `--rds-border-radius-md`: 8px
- `--rds-border-radius-lg`: 12px

## 🎨 COMPLETE COLOR PALETTE REFERENCE

### Text Colors
| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--rds-text-primary` | #212121 | #ffffff | Headers, main content |
| `--rds-text-secondary` | #757575 | #b0b0b0 | Subtext, labels, captions |
| `--rds-text-disabled` | #bdbdbd | #616161 | Disabled form fields, inactive text |

### Background Colors
| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--rds-background-surface` | #ffffff | #121212 | Main component background |
| `--rds-background-hover` | #f5f5f5 | #1e1e1e | Hover state background |
| `--rds-background-active` | #eeeeee | #2a2a2a | Active/pressed state |

### Border Colors
| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--rds-border-default` | #e0e0e0 | #303030 | Standard borders |
| `--rds-border-light` | #f0f0f0 | #1f1f1f | Subtle/divider borders |

### Semantic Colors (Both Themes - Adjusted for Contrast)
| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--rds-color-primary` | #1976d2 | #64b5f6 | Primary actions, selections |
| `--rds-color-secondary` | #7c4dff | #ba68c8 | Secondary actions |
| `--rds-color-success` | #388e3c | #81c784 | Success states, confirmations |
| `--rds-color-warning` | #f57c00 | #ffb74d | Warning/caution states |
| `--rds-color-error` | #d32f2f | #ef5350 | Error states, destructive actions |
| `--rds-color-info` | #0097a7 | #4dd0e1 | Information messages |

## 📋 QUICK SCSS COPY-PASTE SNIPPETS

### Basic Component with Theme Colors
```scss
.rds-my-component {
  background-color: var(--rds-background-surface, #ffffff);
  color: var(--rds-text-primary, #212121);
  border: 1px solid var(--rds-border-default, #e0e0e0);
  padding: var(--rds-spacing-md, 16px);
  border-radius: var(--rds-border-radius-sm, 4px);

  &__title {
    color: var(--rds-text-primary, #212121);
    font-weight: 600;
  }

  &__description {
    color: var(--rds-text-secondary, #757575);
    font-size: var(--rds-font-size-sm, 12px);
  }
}
```

### Button with Active State
```scss
.rds-button {
  background-color: var(--rds-color-primary, #1976d2);
  color: #ffffff;
  padding: var(--rds-spacing-sm, 8px) var(--rds-spacing-md, 16px);

  &:hover {
    background-color: darken(#1976d2, 10%);  // Adjust shade based on theme
  }

  &--secondary {
    background-color: var(--rds-color-secondary, #7c4dff);
  }

  &--error {
    background-color: var(--rds-color-error, #d32f2f);
  }
}
```

### List Item with Disabled State
```scss
.rds-list-item {
  background-color: var(--rds-background-surface, #ffffff);
  color: var(--rds-text-primary, #212121);
  border-bottom: 1px solid var(--rds-border-default, #e0e0e0);
  padding: var(--rds-spacing-md, 16px);
  cursor: pointer;

  &:hover {
    background-color: var(--rds-background-hover, #f5f5f5);
  }

  &--selected {
    background-color: var(--rds-color-primary, #1976d2);
    color: #ffffff;
  }

  &--disabled {
    color: var(--rds-text-disabled, #bdbdbd);
    cursor: not-allowed;
    opacity: 0.5;
  }
}
```

## ✨ THEME IMPLEMENTATION CHECKLIST

- [ ] All text colors use `var(--rds-text-primary, --rds-text-secondary, --rds-text-disabled)`
- [ ] All backgrounds use `var(--rds-background-surface, --rds-background-hover)`
- [ ] All borders use `var(--rds-border-default, --rds-border-light)`
- [ ] Semantic colors (success, error, warning) use theme-adjusted values
- [ ] Dark mode variables defined in `[data-theme="dark"]` block
- [ ] No hardcoded colors except #ffffff for contrast on primary/secondary buttons
- [ ] Headers have 600+ font weight and `--rds-text-primary` color
- [ ] Subtext uses smaller font size with `--rds-text-secondary` color
- [ ] Disabled states reduce opacity and use `--rds-text-disabled` color
- [ ] Component tested in both light and dark themes
