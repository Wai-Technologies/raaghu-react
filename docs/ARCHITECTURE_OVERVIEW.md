# Raaghu Design System - Architecture Overview

## System Architecture

The Raaghu Design System is built as a monorepo containing multiple packages that work together to provide a comprehensive React component library.

```
@waiin/raaghu-react/
├── raaghu-elements/          # Atomic UI components
├── raaghu-layouts/           # Layout compositions  
├── raaghu-pages/            # Page Solution
├── raaghu-react-themes/     # Theme system
├── stories/                 # Storybook documentation
└── docs/                    # Architecture documentation
```

## Package Structure

### 1. Raaghu Elements and Components (`raaghu-elements/` and `raaghu-components/`)

**Purpose**: Atomic, reusable UI components

**Components**: Base components including:
- Form Controls: button, input, select, checkbox, radio, etc.
- Display: card, avatar, badge, chip, tooltip, etc.
- Navigation: tabs, breadcrumbs, pagination, etc.
- Feedback: alert, modal, snackbar, dialog, etc.
- Layout: box, container, stack, grid, etc.

**Structure**:
```
rds-{component}/
├── rds-{component}.tsx       # React component
├── rds-{component}.scss      # Component styles  
└── rds-{component}.stories.tsx # Storybook stories
```

### 2. Raaghu Layouts (`raaghu-layouts/`)

**Purpose**: Complex layout components that compose multiple elements

**Components**:
- `rds-comp-app-shell`: Main application shell with header, sidebar, content
- `rds-comp-layout`: Base page layout structure

**Structure**:
```
rds-comp-{layout}/
├── rds-comp-{layout}.tsx     # Layout component
├── rds-comp-{layout}.css     # Layout styles
└── rds-comp-{layout}.stories.tsx # Storybook stories
```

### 3. Raaghu Pages (`raaghu-pages/`)

**Purpose**: Complete page templates and examples

**Structure**:
```
raaghu-pages/
├── src/                      # Page components
├── public/                   # Static assets
├── package.json             # Page-specific dependencies
└── vite.config.ts           # Build configuration
```

### 4. Raaghu React Themes (`raaghu-react-themes/`)

**Purpose**: Theme system with design tokens and color schemes

**Themes**:
- Light theme
- Dark theme  
- Semi-dark theme

**Structure**:
```
src/styles/
├── index.scss               # Main theme entry
├── variables/
│   └── color-variables.scss # Design tokens
└── themes/
    ├── light.scss          # Light theme
    ├── dark.scss           # Dark theme
    └── semi-dark.scss      # Semi-dark theme
```

## Design Principles

### 1. Atomic Design Methodology

We follow Brad Frost's Atomic Design principles:

- **Atoms**: Basic elements (button, input, icon)
- **Molecules**: Groups of atoms (search bar, card header)
- **Organisms**: Groups of molecules (header, product grid)
- **Templates**: Layout structures (page templates)
- **Pages**: Specific instances of templates

### 2. Component Hierarchy

```
Pages (raaghu-pages)
    ↓
Layouts (raaghu-layouts)  
    ↓
Elements (raaghu-elements)
    ↓
Themes (raaghu-react-themes)
```

### 3. Separation of Concerns

- **Structure**: React components (.tsx)
- **Styling**: SCSS files (.scss/.css)
- **Documentation**: Storybook stories (.stories.tsx)
- **Logic**: Custom hooks and utilities
- **Theming**: Centralized theme system

## Technology Stack

### Core Technologies

- **React 19.1.0**: Component framework
- **TypeScript 5.8.3**: Type safety
- **Material-UI 7.2.0**: Base component library
- **SCSS/Sass**: Styling preprocessor
- **Vite 7.0.4**: Build tool and dev server

### Development Tools

- **Storybook 9.0.16**: Component documentation
- **ESLint 9.30.1**: Code linting
- **Million.js 3.1.11**: Performance optimization

### Build System

- **Vite**: Fast build tool with HMR
- **TypeScript Compiler**: Type checking and compilation
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility

## Styling Architecture

### BEM Methodology

We use BEM (Block Element Modifier) with RDS prefixes:

```scss
.rds-{component}                    // Block
.rds-{component}__element          // Element  
.rds-{component}--modifier         // Modifier
.rds-{component}__element--modifier // Element modifier
```

### Design Tokens

Centralized design system tokens:

```scss
:root {
  // Colors
  --rds-color-primary: #1976d2;
  --rds-color-secondary: #dc004e;
  
  // Spacing
  --rds-spacing-xs: 4px;
  --rds-spacing-sm: 8px;
  --rds-spacing-md: 16px;
  
  // Typography
  --rds-font-family: 'Roboto', sans-serif;
  --rds-font-size-body: 14px;
  
  // Elevation
  --rds-elevation-1: 0 1px 3px rgba(0,0,0,0.12);
  --rds-elevation-2: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Theme System

Three built-in themes with consistent token mapping:

1. **Light Theme**: Default bright interface
2. **Dark Theme**: Dark interface for low-light environments  
3. **Semi-Dark Theme**: Balanced theme with dark sidebar

## Component Standards

### TypeScript Interface Pattern

```tsx
export interface Rds{Component}Props extends BaseProps {
  // Component-specific props
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  // ... other props
}
```

### Component Structure Template

```tsx
import React from 'react';
import './rds-{component}.scss';

export interface Rds{Component}Props {
  // Props definition
}

const Rds{Component}: React.FC<Rds{Component}Props> = ({
  // Props destructuring
  ...props
}) => {
  return (
    <div className="rds-{component}">
      {/* Component JSX */}
    </div>
  );
};

export default Rds{Component};
```

## Development Workflow

### 1. Component Development

1. Create component directory in appropriate package
2. Implement React component with TypeScript
3. Create SCSS styles following BEM conventions
4. Write Storybook stories for documentation
5. Add component to package index exports

### 2. Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **Visual Tests**: Storybook visual regression
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: axe-core testing

### 3. Documentation

- **Code Comments**: TSDoc for components
- **Storybook**: Interactive component documentation  
- **Architecture Docs**: Markdown documentation
- **README Files**: Package-specific documentation

## Performance Considerations

### Bundle Optimization

- **Tree Shaking**: ES modules for selective imports
- **Code Splitting**: Lazy loading for large components
- **Million.js**: React performance optimization
- **Vite**: Fast bundling and HMR

### Runtime Performance

- **Memoization**: React.memo for expensive components
- **Virtualization**: For large lists and tables
- **Debouncing**: For search and input components
- **Efficient Selectors**: CSS performance optimization

## Accessibility Standards

### WCAG 2.1 Compliance

- **AA Level**: Minimum compliance target
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Visible focus indicators

### Implementation

- **Semantic HTML**: Proper HTML elements
- **ARIA Attributes**: When semantic HTML isn't sufficient
- **Focus Trapping**: For modals and dropdowns
- **Announcements**: Live regions for dynamic content

## Migration and Versioning

### Semantic Versioning

- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

### Breaking Change Strategy

1. Deprecation warnings in minor releases
2. Migration guides and codemods
3. Gradual migration path
4. Clear communication timeline

---

*This architecture documentation is maintained by the Raaghu Design System team and updated with each major release.*
