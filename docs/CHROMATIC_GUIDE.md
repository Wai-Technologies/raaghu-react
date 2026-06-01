# Chromatic Visual Testing Guide

## Overview

Chromatic is integrated into the Raaghu React project to provide automated visual regression testing for all UI components. This ensures that visual changes are caught early and components maintain their expected appearance across different environments and viewports.

## What Chromatic Does

- **Visual Regression Testing**: Captures screenshots of components and compares them against baseline images
- **Cross-browser Testing**: Tests components across different browsers and viewports
- **Theme Testing**: Tests components in both light and dark themes
- **Responsive Testing**: Tests components at mobile, tablet, and desktop resolutions
- **CI/CD Integration**: Automatically runs tests on pull requests and deployments

## Setup Requirements

### Environment Variables

Set the following environment variable:

```bash
export CHROMATIC_PROJECT_TOKEN="your_chromatic_project_token"
```

### GitHub Secrets

Add to your GitHub repository secrets:
- `CHROMATIC_PROJECT_TOKEN`: Your Chromatic project token

## Available Scripts

### Basic Chromatic Commands

```bash
# Run Chromatic with default settings
npm run chromatic

# Build Storybook and run Chromatic
npm run chromatic:build

# Run Chromatic tests and exit after upload
npm run chromatic:test
```

### Environment-Specific Commands

```bash
# Development environment (only changed stories, exit on changes)
npm run chromatic:dev

# Production environment (all stories, fail on changes)
npm run chromatic:prod

# CI environment (only changed stories, exit on changes)
npm run chromatic:ci
```

### Component-Specific Testing

```bash
# Test specific component
npm run chromatic:component rds-button

# Test multiple components
npm run chromatic:component "rds-button|rds-card"
```

## Configuration Files

### 1. chromatic.config.json

Main Chromatic configuration file with project settings:

```json
{
  "onlyChanged": true,
  "projectId": "Project:66a8f18d990fbbe63359f25e",
  "zip": true,
  "exitZeroOnChanges": true,
  "autoAcceptChanges": false,
  "storybookBuildDir": "storybook-static",
  "buildScriptName": "build-storybook",
  "storybookUrl": "https://storybookreact.azurewebsites.net",
  "externalUrl": "https://react.raaghu.ai"
}
```

### 2. chromatic-test.config.js

Environment-specific test configurations:

```javascript
module.exports = {
  testConfigs: {
    development: {
      exitZeroOnChanges: true,
      onlyChanged: true,
      // ... other settings
    },
    production: {
      exitZeroOnChanges: false,
      onlyChanged: false,
      // ... other settings
    }
  }
};
```

## Storybook Integration

### Enhanced Preview Configuration

The Storybook preview includes Chromatic-specific parameters:

```typescript
parameters: {
  chromatic: {
    viewports: [375, 768, 1920],
    delay: 1000,
    diffThreshold: 0.2,
    pauseAnimationAtEnd: true,
  }
}
```

### Story-Level Configuration

You can add Chromatic parameters to individual stories:

```typescript
export const ButtonStory = {
  args: { /* ... */ },
  parameters: {
    chromatic: {
      viewports: [375, 768], // Only test specific viewports
      delay: 2000, // Wait longer for this story
      diffThreshold: 0.1, // Stricter diff threshold
    }
  }
};
```

## CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/chromatic.yml` file automatically:

1. Triggers on pushes to main/development/production branches
2. Triggers on pull requests
3. Builds Storybook
4. Runs Chromatic tests
5. Comments results on PRs
6. Fails builds on visual regressions in production

### Workflow Triggers

```yaml
on:
  push:
    branches: [main, development, production]
  pull_request:
    branches: [main, development, production]
  workflow_dispatch: # Manual trigger
```

## Best Practices

### 1. Story Organization

- Group related stories together
- Use consistent naming conventions
- Include all component variants
- Test edge cases and error states

### 2. Visual Testing Strategy

- **Critical Components**: Test all viewports and themes
- **Layout Components**: Focus on responsive behavior
- **Interactive Components**: Test hover, focus, and disabled states

### 3. Performance Optimization

- Use `onlyChanged: true` for development
- Test all stories in production builds
- Set appropriate delays for animations
- Use viewport filtering for large component libraries

### 4. Change Management

- Review visual changes before accepting
- Document intentional visual updates
- Use Chromatic's change review interface
- Set appropriate diff thresholds

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Storybook build output
   - Verify environment variables
   - Check network connectivity

2. **Visual Regression Failures**
   - Review diff images in Chromatic
   - Check for intentional changes
   - Verify test environment consistency

3. **Performance Issues**
   - Reduce viewport count for testing
   - Optimize story complexity
   - Use appropriate delays

### Debug Commands

```bash
# Run with verbose output
npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --debug

# Test specific story
npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --story-filter="Button"

# Run interactively
npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --interactive
```

## Monitoring and Reporting

### Chromatic Dashboard

- View test results and trends
- Compare builds across branches
- Analyze visual changes over time
- Set up notifications for failures

### Integration with Other Tools

- **Slack/Teams**: Get notifications on test results
- **Jira/GitHub**: Link visual changes to issues
- **Analytics**: Track visual regression trends

## Advanced Features

### 1. Custom Viewports

```typescript
parameters: {
  chromatic: {
    viewports: [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ]
  }
}
```

### 2. Conditional Testing

```typescript
parameters: {
  chromatic: {
    disable: process.env.NODE_ENV === 'test',
    viewports: process.env.CHROMATIC_VIEWPORTS?.split(',') || [375, 768, 1920]
  }
}
```

### 3. Story Filtering

```bash
# Test only button components
npm run chromatic:component "rds-button"

# Test multiple component types
npm run chromatic:component "rds-button|rds-card|rds-modal"
```

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook Visual Testing](https://storybook.js.org/docs/react/writing-tests/visual-testing)
- [Visual Regression Testing Best Practices](https://www.chromatic.com/docs/visual-testing)
- [Chromatic GitHub Action](https://github.com/chromaui/chromatic-action)
