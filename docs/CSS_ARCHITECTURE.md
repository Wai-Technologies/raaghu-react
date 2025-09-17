# Raaghu Design System - CSS/SCSS Architecture Documentation

## Overview

This document outlines the CSS/SCSS architecture and organization for the Raaghu Design System. Our architecture ensures consistency, maintainability, and scalability across all components.

## File Organization Structure

### Component-Level Styles

Each RDS component follows a strict naming convention and file organization:

```
raaghu-elements/
├── rds-{component-name}/
│   ├── rds-{component-name}.tsx          # React component
│   ├── rds-{component-name}.stories.tsx  # Storybook stories
│   └── rds-{component-name}.scss         # Component-specific styles
```

### Layout-Level Styles

Layout components follow the same pattern:

```
raaghu-layouts/
├── rds-comp-{layout-name}/
│   ├── rds-comp-{layout-name}.tsx
│   ├── rds-comp-{layout-name}.stories.tsx
│   └── rds-comp-{layout-name}.css        # Layout-specific styles
```

### Theme Styles

Global theme styles are centralized:

```
raaghu-react-themes/
├── src/
│   └── styles/
│       ├── index.scss                    # Main theme entry
│       ├── variables/
│       │   └── color-variables.scss      # Color tokens
│       └── themes/
│           ├── light.scss               # Light theme
│           ├── dark.scss                # Dark theme
│           └── semi-dark.scss           # Semi-dark theme
```

## Naming Conventions

### CSS Class Naming

We follow the **BEM (Block Element Modifier)** methodology with RDS prefixes:

```scss
// Block
.rds-{component-name} { }

// Elements
.rds-{component-name}__element { }

// Modifiers
.rds-{component-name}--modifier { }
.rds-{component-name}__element--modifier { }
```

### Examples

```scss
// Button component
.rds-button { }
.rds-button__icon { }
.rds-button--primary { }
.rds-button--large { }
.rds-button__icon--start { }

// Card component
.rds-card { }
.rds-card__header { }
.rds-card__content { }
.rds-card__actions { }
.rds-card--elevation-2 { }
```

## SCSS Structure Standards

### Component SCSS Template

Each component SCSS file should follow this structure:

```scss
// RDS {Component Name} Component Styles
.rds-{component-name} {
  // Base component styles
  
  // Element styles
  &__element {
    // Element-specific styles
  }
  
  // State modifiers
  &--state {
    // State-specific styles
  }
  
  // Size variants
  &--small { }
  &--medium { }
  &--large { }
  
  // Color variants
  &--primary { }
  &--secondary { }
  
  // Interactive states
  &:hover { }
  &:focus { }
  &:active { }
  &:disabled { }
}

// Animations (if needed)
@keyframes rds-{component-name}-animation {
  // Keyframes
}
```

### Variables and Tokens

Use centralized design tokens:

```scss
// Use theme variables
background-color: var(--rds-color-primary);
color: var(--rds-color-on-primary);
border-radius: var(--rds-border-radius);
box-shadow: var(--rds-elevation-2);
```

## File Naming Standards

### Component Files

- **React Component**: `rds-{component-name}.tsx`
- **Styles**: `rds-{component-name}.scss` 
- **Stories**: `rds-{component-name}.stories.tsx`

### Layout Files

- **React Component**: `rds-comp-{layout-name}.tsx`
- **Styles**: `rds-comp-{layout-name}.css`
- **Stories**: `rds-comp-{layout-name}.stories.tsx`

## Component Categories

### Elements (`raaghu-elements/`)

Basic UI components that serve as building blocks:
- Form controls (button, input, select, etc.)
- Display components (card, avatar, badge, etc.)
- Navigation components (tabs, breadcrumbs, etc.)
- Feedback components (alert, modal, snackbar, etc.)

### Layouts (`raaghu-layouts/`)

Complex layout components that compose multiple elements:
- App shell layouts
- Page layouts
- Navigation layouts

### Themes (`raaghu-react-themes/`)

Global theming and design tokens:
- Color schemes
- Typography scales
- Spacing systems
- Elevation levels

## Best Practices

### 1. Isolation and Encapsulation

- Each component's styles should be self-contained
- Avoid global styles that affect other components
- Use specific class names with RDS prefix

### 2. Consistency

- Follow the established naming conventions
- Use consistent spacing and sizing patterns
- Leverage design tokens for colors and measurements

### 3. Maintainability

- Document complex styles with comments
- Use meaningful class names
- Keep styles organized within each file

### 4. Performance

- Minimize CSS specificity conflicts
- Use efficient selectors
- Avoid deep nesting (max 3 levels)

### 5. Accessibility

- Include focus states for interactive elements
- Ensure sufficient color contrast
- Support screen readers with appropriate styling

## Implementation Guidelines

### Adding New Components

1. Create component directory: `rds-{component-name}/`
2. Create React component: `rds-{component-name}.tsx`
3. Create SCSS file: `rds-{component-name}.scss`
4. Follow the established class naming pattern
5. Create Storybook stories: `rds-{component-name}.stories.tsx`
6. Update the main index.ts export file

### Modifying Existing Components

1. Update the SCSS file in the component's directory
2. Test across different themes
3. Ensure backward compatibility
4. Update documentation if needed

### Theme Customization

1. Modify variables in `raaghu-react-themes/src/styles/variables/`
2. Update theme files in `raaghu-react-themes/src/styles/themes/`
3. Test all components with the new theme

## Tools and Setup

### Required Dependencies

```json
{
  "sass": "^1.x.x",
  "postcss": "^8.x.x",
  "autoprefixer": "^10.x.x"
}
```

### Build Configuration

The build system should be configured to:
- Process SCSS files
- Apply autoprefixer for cross-browser compatibility
- Minify production CSS
- Generate source maps for development

---

*This document is maintained by the Raaghu Design System team. For questions or contributions, please refer to the project's contribution guidelines.*
