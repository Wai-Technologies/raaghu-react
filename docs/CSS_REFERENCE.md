# CSS/SCSS Reference Guide

## Component File Checklist

When creating a new RDS component, ensure you have:

- [ ] `rds-{component}.tsx` - React component
- [ ] `rds-{component}.scss` - Component styles
- [ ] `rds-{component}.stories.tsx` - Storybook stories

## SCSS Template

```scss
// RDS {Component Name} Component Styles
.rds-{component-name} {
  // Base styles
  display: block;
  
  // Elements
  &__element {
    // Element styles
  }
  
  // Modifiers
  &--variant {
    // Variant styles
  }
  
  // States
  &:hover { }
  &:focus { }
  &:disabled { }
}
```

## BEM Naming Examples

```scss
// ✅ Correct
.rds-button { }
.rds-button__icon { }
.rds-button--primary { }
.rds-button__icon--start { }

// ❌ Incorrect
.rdsButton { }
.rds-button-icon { }
.rds-button.primary { }
.button { }
```

## Common Patterns

### Size Variants
```scss
&--small { }
&--medium { }
&--large { }
```

### Color Variants
```scss
&--primary { }
&--secondary { }
&--success { }
&--warning { }
&--error { }
```

### State Variants
```scss
&--disabled { }
&--loading { }
&--active { }
&--selected { }
```

## Design Tokens Usage

```scss
// Use CSS custom properties
background-color: var(--rds-color-primary);
padding: var(--rds-spacing-md);
border-radius: var(--rds-border-radius);
box-shadow: var(--rds-elevation-2);
```

## Animation Standards

```scss
// Transitions
transition: all 0.2s ease;
transition: background-color 0.2s ease, box-shadow 0.2s ease;

// Keyframes naming
@keyframes rds-{component}-{animation-name} {
  from { }
  to { }
}
```

## Accessibility Helpers

```scss
// Focus styles
&:focus-visible {
  outline: 2px solid var(--rds-color-primary);
  outline-offset: 2px;
}

// Screen reader only
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## File Organization Quick Check

```
raaghu-elements/
└── rds-button/
    ├── rds-button.tsx        ✅ Component
    ├── rds-button.scss       ✅ Styles  
    └── rds-button.stories.tsx ✅ Stories
```

## Import/Export Pattern

```tsx
// In component file
import './rds-{component}.scss';

// In package index.ts
export { default as Rds{Component} } from './rds-{component}/rds-{component}';
```

## Common Mistakes to Avoid

❌ **Don't:**
- Use generic class names without RDS prefix
- Create global styles in component files
- Use inline styles for complex styling
- Forget to add hover/focus states
- Use hardcoded colors instead of design tokens

✅ **Do:**
- Follow BEM naming consistently
- Use design tokens for consistency
- Include all interactive states
- Add meaningful comments
- Test across different themes
