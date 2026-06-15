# Raaghu Design System - Testing Guide

## Overview

This guide covers the comprehensive testing strategy for the Raaghu Component Library, ensuring world-class quality and reliability across all components.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Stack](#testing-stack)
- [Test Types](#test-types)
- [Writing Tests](#writing-tests)
- [Coverage Requirements](#coverage-requirements)
- [Best Practices](#best-practices)
- [Accessibility Testing](#accessibility-testing)
- [Visual Testing](#visual-testing)
- [Performance Testing](#performance-testing)
- [CI/CD Integration](#cicd-integration)

## Testing Philosophy

Our testing approach follows the **Testing Trophy** methodology:

```
    /\
   /  \    E2E Tests (5%)
  /____\   
 /      \   Integration Tests (15%)
/________\  Unit Tests (80%)
```

### Principles

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **User-Centric Testing**: Write tests from the user's perspective
3. **Maintainable Tests**: Tests should be easy to read, write, and maintain
4. **Fast Feedback**: Tests should run quickly and provide immediate feedback
5. **Comprehensive Coverage**: Aim for 85%+ code coverage with meaningful tests

## Testing Stack

### Core Testing Libraries

```json
{
  "@testing-library/react": "^16.1.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.5.2",
  "jest": "^29.7.0",
  "ts-jest": "^29.2.5"
}
```

### Additional Testing Tools

```json
{
  "@storybook/test": "^8.4.7",
  "jest-axe": "^9.0.0",
  "jest-environment-jsdom": "^29.7.0",
  "jest-canvas-mock": "^2.5.2"
}
```

## Test Types

### 1. Unit Tests

**Purpose**: Test individual components in isolation

**Location**: `{component-name}/{component-name}.test.tsx`

**Example**:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsButton from './rds-button';

describe('RdsButton', () => {
  it('renders with correct label', () => {
    render(<RdsButton label="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<RdsButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Integration Tests

**Purpose**: Test component interactions and data flow

**Location**: `src/integration/{feature}.test.tsx`

**Example**:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import RdsTextField from '../rds-text-field/rds-text-field';
import RdsButton from '../rds-button/rds-button';

describe('Form Integration', () => {
  it('submits form with field values', async () => {
    const TestForm = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            <RdsTextField name="email" label="Email" />
            <RdsButton type="submit" label="Submit" />
          </form>
        </FormProvider>
      );
    };

    render(<TestForm />);
    // Test form submission logic
  });
});
```

### 3. Visual Tests (Storybook)

**Purpose**: Test visual appearance and interactions

**Location**: `{component-name}/{component-name}.stories.tsx`

**Example**:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import RdsButton from './rds-button';

const meta: Meta<typeof RdsButton> = {
  title: 'Elements/Button',
  component: RdsButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'contained'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('MuiButton-contained');
  },
};
```

## Writing Tests

### Test Structure (AAA Pattern)

```typescript
describe('Component Name', () => {
  it('should behave in expected way when given input', () => {
    // Arrange
    const props = { label: 'Test' };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Common Test Patterns

#### 1. Rendering Tests
```typescript
it('renders with default props', () => {
  render(<RdsButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

#### 2. Props Testing
```typescript
it('applies custom className', () => {
  render(<RdsButton className="custom-class" />);
  expect(screen.getByRole('button')).toHaveClass('custom-class');
});
```

#### 3. Event Handling
```typescript
it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<RdsButton onClick={handleClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 4. Conditional Rendering
```typescript
it('shows loading state', () => {
  render(<RdsButton isLoading label="Submit" />);
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});
```

#### 5. Async Testing
```typescript
it('handles async operations', async () => {
  const asyncHandler = jest.fn().mockResolvedValue('success');
  render(<RdsButton onClick={asyncHandler} />);
  
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(asyncHandler).toHaveBeenCalled();
  });
});
```

## Coverage Requirements

### Minimum Coverage Thresholds

All three test frameworks enforce the same threshold: **80%** across branches, functions, lines, and statements.

```javascript
// jest.config.js — enforced threshold
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### Coverage Commands

```bash
# Run tests with coverage
npm run test:coverage

# Generate detailed coverage report
npm run test:coverage:detailed

# View coverage in browser
npm run test:coverage:open
```

## Best Practices

### 1. Test Naming

```typescript
// ✅ Good - Descriptive and specific
it('disables button when isLoading is true')
it('calls onSubmit with form data when valid')
it('shows error message when validation fails')

// ❌ Bad - Vague or implementation-focused
it('works correctly')
it('handles state change')
it('tests the function')
```

### 2. Test Organization

```typescript
describe('RdsButton', () => {
  describe('rendering', () => {
    it('renders with label');
    it('renders with children');
  });

  describe('interactions', () => {
    it('handles click events');
    it('handles keyboard navigation');
  });

  describe('states', () => {
    it('shows loading state');
    it('shows disabled state');
  });
});
```

### 3. Custom Render Helper

```typescript
// test-utils.tsx
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>,
    options
  );
}

export * from '@testing-library/react';
export { render };
```

### 4. Mock Guidelines

```typescript
// Mock external dependencies
jest.mock('../api/client', () => ({
  fetchData: jest.fn()
}));

// Mock complex components
jest.mock('./ComplexChild', () => {
  return function MockComplexChild(props: any) {
    return <div data-testid="complex-child" {...props} />;
  };
});
```

## Accessibility Testing

### Using jest-axe

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<RdsButton label="Accessible Button" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Tests

```typescript
it('has proper ARIA attributes', () => {
  render(<RdsButton label="Submit" aria-describedby="help-text" />);
  const button = screen.getByRole('button');
  
  expect(button).toHaveAttribute('aria-describedby', 'help-text');
  expect(button).toHaveAccessibleName('Submit');
});

it('supports keyboard navigation', () => {
  const handleClick = jest.fn();
  render(<RdsButton onClick={handleClick} />);
  
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
  expect(handleClick).toHaveBeenCalled();
});
```

## Visual Testing

### Storybook Interaction Tests

```typescript
export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test initial state
    const button = canvas.getByRole('button');
    await expect(button).toBeVisible();
    
    // Test interaction
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
```

### Chromatic Integration

```yaml
# .github/workflows/chromatic.yml
name: 'Chromatic'
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install dependencies
        run: npm install
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Performance Testing

### Component Performance Tests

```typescript
import { performance } from 'perf_hooks';

describe('Performance', () => {
  it('renders quickly with large datasets', () => {
    const start = performance.now();
    const largeData = Array.from({ length: 1000 }, (_, i) => ({ id: i }));
    
    render(<DataTable data={largeData} />);
    
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // 100ms threshold
  });
});
```

### Memory Leak Testing

```typescript
it('cleans up resources on unmount', () => {
  const { unmount } = render(<ComponentWithTimer />);
  
  // Spy on cleanup functions
  const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
  
  unmount();
  
  expect(clearIntervalSpy).toHaveBeenCalled();
});
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:changed"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

## Debugging Tests

### Common Debugging Techniques

```typescript
// 1. Use screen.debug() to see rendered output
it('debugs rendering issues', () => {
  render(<Component />);
  screen.debug(); // Prints DOM to console
});

// 2. Use logRoles to see available roles
it('finds the right query', () => {
  const { container } = render(<Component />);
  logRoles(container);
});

// 3. Use queries with getAllBy for debugging
it('debugs multiple elements', () => {
  render(<ComponentWithMultipleButtons />);
  const buttons = screen.getAllByRole('button');
  console.log(buttons.map(b => b.textContent));
});
```

### Test Environment Issues

```typescript
// Mock window objects that might be missing in test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Continuous Improvement

### Metrics to Track

1. **Test Coverage**: Maintain 85%+ coverage
2. **Test Speed**: Keep test suite under 30 seconds
3. **Flaky Tests**: Track and fix unstable tests
4. **Test Maintenance**: Regular refactoring and updates

### Regular Reviews

- **Weekly**: Review failed tests and coverage reports
- **Monthly**: Analyze test performance and identify bottlenecks
- **Quarterly**: Review testing strategy and update best practices

---

## Quick Reference

### Essential Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- rds-button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders"

# Update snapshots
npm test -- --updateSnapshot
```

### Useful Queries

```typescript
// By Role (Preferred)
screen.getByRole('button')
screen.getByRole('textbox', { name: /email/i })

// By Label Text
screen.getByLabelText(/password/i)

// By Placeholder
screen.getByPlaceholderText(/search/i)

// By Text Content
screen.getByText(/submit/i)

// By Test ID (Last Resort)
screen.getByTestId('custom-element')
```

This comprehensive testing guide ensures our component library maintains world-class quality standards through rigorous testing practices.

---

## Which Test Framework Should I Use?

This repo uses three testing frameworks, each with a distinct role. Use the right one for the right job.

### Decision Table

| What you're testing | Framework to use | Config file |
|---------------------|-----------------|-------------|
| Component logic, props, events, accessibility | **Jest** + React Testing Library | `jest.config.js` |
| Storybook story interactions and UI state | **Vitest** (via Storybook addon-vitest) | `vitest.config.ts` |
| End-to-end flows and visual regression | **Playwright** | `playwright.config.ts` |

---

### Jest — Unit & Integration Tests

**When**: Writing a `.test.tsx` file colocated with a component.

**Runs via**: `npm test`

**Best for**:
- Rendering tests (`render`, `screen.getByRole`)
- Event handling (`fireEvent`, `userEvent`)
- Accessibility checks (`jest-axe`)
- Prop validation
- State and lifecycle

```bash
npm test                          # run all Jest tests
npm test -- rds-button.test.tsx   # run one file
npm run test:coverage             # run with coverage report
```

---

### Vitest — Storybook Story Tests

**When**: Adding a `play()` function to a `.stories.tsx` file.

**Runs via**: `npm run test:storybook` or the Storybook UI (addon-vitest panel)

**Best for**:
- Testing visual states defined in stories
- Interaction sequences (click, type, focus)
- Storybook-specific assertions (`within(canvasElement)`)

```bash
npm run test:storybook            # run all story tests headlessly
```

Story tests are co-located with stories (the `play` function in each `StoryObj`). They run in the Storybook preview environment, so they can test real rendered output including CSS.

---

### Playwright — E2E & Visual Regression

**When**: Testing full user journeys or catching visual regressions.

**Runs via**: `npm run test:e2e` (or the GitHub Actions `playwright.yml` workflow)

**Best for**:
- Multi-step user flows across components
- Cross-browser testing
- Screenshot-based visual regression (Chromatic is the primary tool for this)
- Accessibility audits at the page level

```bash
npm run test:e2e                  # run Playwright tests headlessly
npx playwright test --ui          # open Playwright UI runner
```

---

### Quick Rule

> Write **Jest** tests first. Add a **Storybook play function** if the interaction is better shown visually. Use **Playwright** only when the test requires a real browser or spans multiple components.
