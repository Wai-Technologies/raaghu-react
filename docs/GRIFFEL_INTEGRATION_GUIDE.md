# Griffel Integration Guide

## Overview

This guide explains how Griffel CSS-in-JS has been integrated into the Raaghu Design System. Griffel is Microsoft's CSS-in-JS solution that provides atomic CSS generation, better performance, and enhanced styling capabilities while maintaining compatibility with existing MUI components.

## What is Griffel?

Griffel is a CSS-in-JS library that:
- Generates atomic CSS classes for optimal performance
- Provides ahead-of-time compilation
- Offers excellent TypeScript support
- Integrates seamlessly with React and MUI
- Supports RTL languages out of the box
- Reduces CSS bundle size through optimization

## Installation

Griffel has been installed with the following packages:

```bash
npm install @griffel/react @griffel/webpack-loader @griffel/vite-plugin
```

## Configuration

### Vite Configuration

The Griffel Vite plugin has been added to both main and pages configurations:

```typescript
// vite.config.ts
import { griffel } from '@griffel/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    griffel()
  ],
  // ... other config
})
```

### Griffel Provider Setup

The `GriffelProvider` component wraps the application and provides:
- Theme context integration
- Design tokens access
- Theme toggle functionality
- SSR support

```typescript
import { GriffelProvider } from '../utils/griffel/GriffelProvider';

function App() {
  return (
    <GriffelProvider initialTheme="light">
      {/* Your app content */}
    </GriffelProvider>
  );
}
```

## Component Integration

### New Griffel Components

#### RdsButtonGriffel

A new button component built entirely with Griffel:

```typescript
import { RdsButtonGriffel } from '../raaghu-elements';

<RdsButtonGriffel 
  variant="primary" 
  size="medium"
  icon="🚀"
  iconPosition="left"
>
  Launch App
</RdsButtonGriffel>
```

**Features:**
- Multiple variants: primary, secondary, outlined, text, ghost
- Three sizes: small, medium, large
- Icon support with positioning
- Loading states with spinner
- Enhanced animations and hover effects
- Full accessibility support

#### RdsButtonGriffelEnhanced

An enhanced version of the existing RDS Button with Griffel integration:

```typescript
import { RdsButtonGriffelEnhanced } from '../raaghu-elements';

<RdsButtonGriffelEnhanced 
  text="Enhanced Button"
  useGriffel={true}
  griffelVariant="primary"
  animated={true}
  shape="pill"
/>
```

**Features:**
- Backward compatible with existing API
- Optional Griffel styling via `useGriffel` prop
- Advanced animations and effects
- Hybrid approach combining MUI and Griffel

### Using Griffel in Custom Components

#### Basic Usage

```typescript
import { makeStyles, mergeClasses } from '@griffel/react';
import { useGriffelContext } from '../utils/griffel/GriffelProvider';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#7825E9',
    color: '#FFFFFF',
    padding: '16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#340071',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(120, 37, 233, 0.3)',
    }
  }
});

const MyComponent = () => {
  const classes = useStyles();
  const { theme, designTokens } = useGriffelContext();
  
  return (
    <div className={classes.container}>
      Content with Griffel styling
    </div>
  );
};
```

#### Advanced Features

```typescript
const useStyles = makeStyles({
  // Keyframe animations
  '@keyframes slideIn': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' }
  },
  
  // Media queries
  '@media (max-width: 768px)': {
    responsive: {
      padding: '8px',
      fontSize: '14px'
    }
  },
  
  // Pseudo-selectors
  button: {
    '&:hover': { backgroundColor: 'blue' },
    '&:active': { transform: 'scale(0.95)' },
    '&:focus-visible': { outline: '2px solid blue' }
  },
  
  // Complex selectors
  card: {
    '& .title': { fontWeight: 'bold' },
    '& + .card': { marginTop: '16px' }
  }
});
```

## Design Tokens Integration

Griffel integrates with the existing design system tokens:

```typescript
import { useDesignTokens } from '../utils/griffel/GriffelProvider';

const MyComponent = () => {
  const designTokens = useDesignTokens();
  
  return (
    <div style={{ 
      backgroundColor: designTokens.colors.primary.main,
      padding: designTokens.spacing.md,
      borderRadius: designTokens.borderRadius.lg
    }}>
      Using design tokens
    </div>
  );
};
```

## Theme Integration

### Theme Toggle

```typescript
import { useThemeToggle } from '../utils/griffel/GriffelProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme, isLight } = useThemeToggle();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {isLight ? 'Dark' : 'Light'} theme
    </button>
  );
};
```

### Theme-Aware Styles

```typescript
import { useLightThemeStyles, useDarkThemeStyles } from '../utils/griffel/griffel-config';
import { useGriffelContext } from '../utils/griffel/GriffelProvider';

const MyComponent = () => {
  const { theme } = useGriffelContext();
  const lightClasses = useLightThemeStyles();
  const darkClasses = useDarkThemeStyles();
  const classes = theme === 'light' ? lightClasses : darkClasses;
  
  return (
    <div className={classes.themedBackground}>
      Theme-aware content
    </div>
  );
};
```

## Performance Benefits

### Atomic CSS Generation

Griffel generates atomic CSS classes, which means:
- Smaller CSS bundles
- Better caching
- Reduced style conflicts
- Improved performance

### Ahead-of-Time Compilation

Styles are compiled at build time, resulting in:
- Faster runtime performance
- Better tree-shaking
- Optimized CSS output

## Migration Strategy

### Gradual Adoption

1. **New Components**: Use Griffel for all new components
2. **Enhanced Components**: Add Griffel variants to existing components
3. **Legacy Support**: Maintain existing SCSS-based components
4. **Hybrid Approach**: Use both systems where beneficial

### Example Migration

```typescript
// Before (SCSS only)
const OldComponent = () => (
  <button className="rds-button rds-button--primary">
    Click me
  </button>
);

// After (Griffel enhanced)
const NewComponent = () => {
  const classes = useStyles();
  return (
    <button className={mergeClasses(classes.button, classes.primary)}>
      Click me
    </button>
  );
};
```

## Best Practices

### 1. Use Design Tokens

Always use design tokens instead of hardcoded values:

```typescript
// ❌ Don't
const useStyles = makeStyles({
  button: { backgroundColor: '#7825E9' }
});

// ✅ Do
const useStyles = makeStyles({
  button: { backgroundColor: designTokens.colors.primary.main }
});
```

### 2. Leverage Common Styles

Use the provided common styles for consistency:

```typescript
import { commonStyles } from '../utils/griffel/griffel-config';

const useStyles = makeStyles({
  myButton: {
    ...commonStyles.buttonPrimary,
    // Add custom styles
    fontSize: '18px'
  }
});
```

### 3. Optimize for Performance

```typescript
// ✅ Good - styles defined outside component
const useStyles = makeStyles({
  container: { /* styles */ }
});

const MyComponent = () => {
  const classes = useStyles();
  // ...
};

// ❌ Avoid - styles defined inside component
const MyComponent = () => {
  const classes = makeStyles({
    container: { /* styles */ }
  })();
  // ...
};
```

### 4. Use mergeClasses for Conditional Styling

```typescript
const useStyles = makeStyles({
  base: { padding: '8px' },
  primary: { backgroundColor: 'blue' },
  disabled: { opacity: 0.5 }
});

const MyComponent = ({ variant, disabled }) => {
  const classes = useStyles();
  
  return (
    <div className={mergeClasses(
      classes.base,
      variant === 'primary' && classes.primary,
      disabled && classes.disabled
    )}>
      Content
    </div>
  );
};
```

## Storybook Integration

Griffel components are fully integrated with Storybook:

```typescript
// rds-button-griffel.stories.tsx
export default {
  title: 'Elements/Button Griffel',
  component: RdsButtonGriffel,
  decorators: [
    (Story) => (
      <GriffelProvider>
        <Story />
      </GriffelProvider>
    )
  ]
};
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure GriffelProvider wraps your component
2. **Build errors**: Check Vite configuration includes Griffel plugin
3. **TypeScript errors**: Import types from Griffel packages
4. **Performance issues**: Avoid defining styles inside render functions

### Debug Mode

Enable Griffel debug mode in development:

```typescript
// In your GriffelProvider
<RendererProvider renderer={renderer} debug={process.env.NODE_ENV === 'development'}>
```

## Examples

### Complete Component Example

```typescript
import React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useGriffelContext, useDesignTokens } from '../utils/griffel/GriffelProvider';

const useStyles = makeStyles({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#202020',
    marginBottom: '12px'
  },
  content: {
    color: '#666666',
    lineHeight: 1.5
  }
});

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const GriffelCard: React.FC<CardProps> = ({ title, children, className }) => {
  const classes = useStyles();
  const { theme } = useGriffelContext();
  const designTokens = useDesignTokens();
  
  return (
    <div className={mergeClasses(classes.card, className)}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default GriffelCard;
```

## Resources

- [Griffel Documentation](https://griffel.js.org/)
- [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui)
- [CSS-in-JS Best Practices](https://cssinjs.org/best-practices/)
- [Atomic CSS Benefits](https://acss.io/faq.html)

## Support

For questions or issues with Griffel integration:
1. Check this documentation
2. Review the demo components in `raaghu-pages/src/GriffelDemo.tsx`
3. Examine the Storybook stories
4. Consult the Griffel official documentation
