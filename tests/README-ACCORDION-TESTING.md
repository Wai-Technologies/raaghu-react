## Prerequisites 

1. **Dependencies Install:**
   ```powershell
   npm install
   ```

2. **Playwright Browsers Install :**
   ```powershell
   npx playwright install
   ```

## Testing Commands (Test Run Commands)

### Option 1: Automatic Storybook Start  Tests 

```powershell
npx playwright test
npx playwright test rds-accordion
npx playwright test --ui
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Option 2: Manual Storybook Tests

```powershell
npm run storybook
npx playwright test
```

## Test Results 

### HTML Report
```powershell
npx playwright show-report
```

### Debug Tests

Debug mode tests run :

```powershell
npx playwright test rds-accordion --debug

# Specific test case debug 
npx playwright test -g "should expand accordion on click" --debug
```

## Test Structure (Test File Structure)

```
tests/
  └── rds-accordion.spec.ts
```

### Test Categories

1. **Basic Functionality Tests**
   - Rendering
   - Expand/Collapse
   - Click interactions
   - Keyboard navigation

2. **Visual & State Tests**
   - Icon display
   - Size variants (small, medium, large)
   - Style variants (border, bottomline, borderhide)
   - Disabled state
   - Hover state

3. **Accessibility Tests**
   - ARIA attributes
   - Keyboard navigation
   - Focus management

4. **Responsive Tests**
   - Mobile viewport
   - Tablet viewport
   - Desktop viewport

5. **Visual Regression Tests**
   - Screenshot comparisons
   - Collapsed state
   - Expanded state

## Common Test Patterns

### 1. Basic Render Test
```typescript
test('should render accordion with title', async ({ page }) => {
  const accordionTitle = page.locator('.rds-accordion__title').first();
  await expect(accordionTitle).toBeVisible();
  await expect(accordionTitle).toContainText('Accordion Title');
});
```

### 2. Interaction Test
```typescript
test('should expand accordion on click', async ({ page }) => {
  const accordion = page.locator('.rds-accordion').first();
  const accordionSummary = accordion.locator('.rds-accordion__summary');
  
  await accordionSummary.click();
  await page.waitForTimeout(300);
  
  await expect(accordion).toHaveClass(/Mui-expanded/);
});
```

### 3. Accessibility Test
```typescript
test('should have proper ARIA attributes', async ({ page }) => {
  const accordionButton = page.locator('[role="button"]').first();
  await expect(accordionButton).toHaveAttribute('aria-expanded');
});
```

## Configuration (Playwright Config)

`playwright.config.ts` configuration :

```typescript
webServer: {
  command: 'npm run storybook',
  url: 'http://localhost:6006',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

- **command**: Storybook automatically
- **url**: Storybook
- **reuseExistingServer**:
- **timeout**

## Updating Tests

```typescript
test('functionality test', async ({ page }) => {
  // Your test code here
});
```

### Test URLs Customize

```typescript
const STORYBOOK_URL = 'http://localhost:6006';
const ACCORDION_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default`;
```

## Troubleshooting

### 1. Storybook
```powershell
netstat -ano | findstr :6006
```

### 2. Tests Fail
```powershell
# Playwright browsers update
npx playwright install

# Clear cache reinstall
rm -rf node_modules
npm install
```

### 3. Screenshot Tests Fail 

```powershell
# Screenshots update 
npx playwright test --update-snapshots
```

### 4. Timeout Errors
```typescript
// playwright.config.ts
use: {
  actionTimeout: 10000, // 10 seconds
  navigationTimeout: 30000, // 30 seconds
}
```

## CI/CD Integration

GitHub Actions tests run

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      - name: Run Playwright tests
        run: npx playwright test
      
      - name: Upload test report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

1. **Wait for Animations**: Accordion expand/collapse animations `waitForTimeout`
2. **Specific Locators**: Generic locators specific CSS classes
3. **Independent Tests**: test independent
4. **Clean State**: `beforeEach` fresh state
5. **Meaningful Names**: Test names descriptive clear

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)
- [Testing Guide](../docs/TESTING_GUIDE.md)

