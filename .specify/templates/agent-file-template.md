# Raaghu Design System Development Guidelines

Auto-generated from all feature plans. Last updated: [DATE]

## Active Technologies

### Core Stack
- **React 19.1.0**: Component framework with concurrent features
- **TypeScript 5.8.3**: Strict type safety with latest features
- **Material-UI 7.2.0**: Base component library foundation
- **SCSS/Sass**: Styling with BEM methodology and design tokens
- **Vite 7.0.4**: Fast build tool with HMR and optimizations

### Development Tools
- **Storybook 10**: Component documentation and visual testing
- **Jest + Testing Library**: Unit and integration testing
- **ESLint 9.30.1**: Code quality and consistency
- **Million.js 3.1.11**: React performance optimization
- **Storybook + Vitest**: Visual and interaction smoke testing
- **i18next**: Internationalization with 8 language support

## Project Structure
```
@waiin/raaghu-react/
├── raaghu-elements/           # Atomic UI components (buttons, inputs, etc.)
│   └── rds-{component}/
│       ├── rds-{component}.tsx
│       ├── rds-{component}.scss
│       ├── rds-{component}.stories.tsx
│       └── rds-{component}.test.tsx
├── raaghu-components/         # Molecular components (cards, forms, etc.)
│   └── rds-comp-{component}/
│       ├── rds-comp-{component}.tsx
│       ├── rds-comp-{component}.scss
│       ├── rds-comp-{component}.stories.tsx
│       └── rds-comp-{component}.test.tsx
├── raaghu-layouts/            # Layout compositions and templates
│   └── rds-comp-{layout}/
│       ├── rds-comp-{layout}.tsx
│       ├── rds-comp-{layout}.css
│       ├── rds-comp-{layout}.stories.tsx
│       └── rds-comp-{layout}.test.tsx
├── raaghu-pages/              # Complete page implementations
├── raaghu-react-themes/       # Centralized theme system
│   └── src/styles/
│       ├── index.scss
│       ├── custom-properties.scss
│       ├── variables/
│       └── themes/
├── stories/                   # Storybook configuration
├── docs/                      # Architecture documentation
└── utils/                     # Shared utilities and helpers
```

## Commands

### Development
```bash
# Start development with Storybook
npm run storybook

# Build all packages
npm run build

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint and fix code
npm run lint:fix

# Type check
npm run type-check
```

### Component Development
```bash
# Generate new component
npm run generate:component rds-{name}

# Run visual regression tests
npm run test:storybook

# Build Storybook for production
npm run build-storybook

# Run accessibility tests
npm run test:a11y
```

### Theme Development
```bash
# Build theme assets
npm run build:themes

# Watch theme changes
npm run watch:themes

# Validate design tokens
npm run validate:tokens
```

## Code Style

### TypeScript Standards
- **Strict Mode**: Enable all strict TypeScript options
- **No Any Types**: Use proper typing, avoid `any`
- **Interface Definitions**: Use interfaces for props and data structures
- **Generic Constraints**: Properly constrain generic types
- **Export Conventions**: Named exports for components, default for utilities

### React Component Patterns
```typescript
// Component interface
interface RdsButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Component implementation
export const RdsButton: React.FC<RdsButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`rds-button rds-button--${variant} rds-button--${size}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
```

### SCSS/CSS Standards
```scss
// Use BEM with RDS prefix
.rds-button {
  // Use theme variables only
  background-color: var(--rds-button-primary-bg);
  color: var(--rds-button-primary-text);
  border-radius: var(--rds-border-radius-md);
  padding: var(--rds-spacing-sm) var(--rds-spacing-md);
  
  // Element styles
  &__icon {
    margin-right: var(--rds-spacing-xs);
  }
  
  // Modifier styles
  &--large {
    padding: var(--rds-spacing-md) var(--rds-spacing-lg);
    font-size: var(--rds-font-size-lg);
  }
  
  // State styles
  &:hover:not(:disabled) {
    background-color: var(--rds-button-primary-bg-hover);
  }
  
  &:disabled {
    opacity: var(--rds-opacity-disabled);
    cursor: not-allowed;
  }
}
```

### Testing Standards
```typescript
// Component testing template
import { render, screen, fireEvent } from '@testing-library/react';
import { RdsButton } from './rds-button';

describe('RdsButton', () => {
  it('renders with correct label', () => {
    render(<RdsButton label="Click Me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<RdsButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<RdsButton label="Test" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('rds-button--secondary');
  });
});
```

## Recent Changes
[LAST 3 FEATURES AND WHAT THEY ADDED]

<!-- MANUAL ADDITIONS START -->

## Component Development Checklist

### Before Starting
- [ ] Design approved in Figma
- [ ] Component fits atomic design hierarchy
- [ ] API props documented
- [ ] Accessibility requirements defined

### Implementation
- [ ] TypeScript interface with proper types
- [ ] SCSS using only theme variables
- [ ] BEM methodology with RDS prefix
- [ ] Responsive design considerations
- [ ] Theme support (light/dark)
- [ ] Internationalization ready

### Testing & Documentation  
- [ ] Unit tests with 85%+ coverage
- [ ] Accessibility tests passing
- [ ] Storybook stories with all variants
- [ ] Storybook / Vitest visual smoke tests
- [ ] Performance impact < 10KB bundle size

### Quality Gates
- [ ] TypeScript compilation without errors
- [ ] ESLint rules passing
- [ ] Tests passing in CI/CD
- [ ] Storybook visual review approved
- [ ] Bundle size within limits

<!-- MANUAL ADDITIONS END -->