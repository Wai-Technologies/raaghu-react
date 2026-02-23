# Raaghu Elements Test Suite

## Overview
Comprehensive E2E test files have been created for all major Raaghu elements using Playwright.

## Test Files Created

### Basic Elements (5)
- ✅ `rds-accordion.spec.ts` - Accordion component tests
- ✅ `rds-button.spec.ts` - Button component tests
- ✅ `rds-card.spec.ts` - Card component tests
- ✅ `rds-avatar.spec.ts` - Avatar component tests
- ✅ `rds-divider.spec.ts` - Divider component tests

### Form Elements (8)
- ✅ `rds-input.spec.ts` - Input field tests
- ✅ `rds-checkbox.spec.ts` - Checkbox tests
- ✅ `rds-switch.spec.ts` - Switch toggle tests
- ✅ `rds-radio.spec.ts` - Radio button tests
- ✅ `rds-select.spec.ts` - Select dropdown tests
- ✅ `rds-text-area.spec.ts` - Text area tests
- ✅ `rds-slider.spec.ts` - Slider tests
- ✅ `rds-rating.spec.ts` - Rating component tests

### Navigation Elements (4)
- ✅ `rds-tabs.spec.ts` - Tabs navigation tests
- ✅ `rds-breadcrumbs.spec.ts` - Breadcrumbs tests
- ✅ `rds-pagination.spec.ts` - Pagination tests
- ✅ `rds-menu.spec.ts` - Menu/Dropdown tests

### Data Display Elements (4)
- ✅ `rds-table.spec.ts` - Table component tests
- ✅ `rds-list.spec.ts` - List component tests
- ✅ `rds-chip.spec.ts` - Chip/Tag tests
- ✅ `rds-badge.spec.ts` - Badge indicator tests

### Feedback Elements (5)
- ✅ `rds-alert.spec.ts` - Alert message tests
- ✅ `rds-dialog.spec.ts` - Dialog/Modal tests
- ✅ `rds-snackbar.spec.ts` - Snackbar notification tests
- ✅ `rds-progress.spec.ts` - Progress indicator tests
- ✅ `rds-tooltip.spec.ts` - Tooltip tests

### Additional Components (1)
- ✅ `rds-stepper.spec.ts` - Stepper/Wizard tests

## Total: 27 Test Files

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Component Tests
```bash
npx playwright test tests/rds-button.spec.ts
npx playwright test tests/rds-accordion.spec.ts
```

### Run Tests by Category
```bash
# Run all form element tests
npx playwright test tests/rds-input.spec.ts tests/rds-checkbox.spec.ts tests/rds-switch.spec.ts

# Run all navigation tests
npx playwright test tests/rds-tabs.spec.ts tests/rds-menu.spec.ts tests/rds-pagination.spec.ts
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Only Failed Tests
```bash
npx playwright test --last-failed
```

## Test Structure

Each test file includes:

1. **Component Rendering Tests**
   - Verify component renders correctly
   - Check visibility of main elements

2. **Interaction Tests**
   - Click interactions
   - Keyboard navigation
   - Hover states

3. **Variant Tests**
   - Different sizes (small, medium, large)
   - Different styles/variants
   - Different colors

4. **State Tests**
   - Disabled state
   - Error state
   - Active/Selected state

5. **Accessibility Tests**
   - ARIA attributes
   - Keyboard navigation
   - Focus management

6. **Responsive Tests**
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)
   - Desktop viewport (1920x1080)

## Prerequisites

Before running tests, ensure:

1. **Storybook is Running**
   ```bash
   npm run storybook
   ```
   Tests expect Storybook to be available at `http://localhost:6006`

2. **Playwright is Installed**
   ```bash
   npm install
   npx playwright install
   ```

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Debugging Tests

### Debug Specific Test
```bash
npx playwright test tests/rds-button.spec.ts --debug
```

### Show Trace Viewer
```bash
npx playwright show-trace trace.zip
```

## Common Test Patterns

### Waiting for Elements
```typescript
await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
```

### Testing Click Interactions
```typescript
const button = page.locator('.MuiButton-root').first();
await button.click();
await page.waitForTimeout(300);
```

### Testing Keyboard Navigation
```typescript
await page.keyboard.press('Enter');
await page.keyboard.press('ArrowRight');
```

### Testing Hover States
```typescript
await element.hover();
await page.waitForTimeout(100);
```

## Customizing Tests

### Update Storybook URL
If your Storybook runs on a different port, update the URL in each test file:
```typescript
const STORYBOOK_URL = 'http://localhost:YOUR_PORT';
```

### Adjust Timeouts
Modify wait times if tests are flaky:
```typescript
await page.waitForTimeout(500); // Increase from 300ms
await page.waitForSelector('.element', { timeout: 15000 }); // Increase from 10000ms
```

## Best Practices

1. **Run Tests Regularly** - Run tests after making changes to components
2. **Review Failed Tests** - Check screenshots and traces for failed tests
3. **Update Tests** - Keep tests in sync with component changes
4. **Add New Tests** - Add tests for new features or edge cases
5. **Parallel Execution** - Tests run in parallel by default for speed

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run Playwright Tests
  run: |
    npm run storybook &
    npx playwright test
```

## Troubleshooting

### Tests Timeout
- Increase timeout values
- Ensure Storybook is running
- Check network connectivity

### Element Not Found
- Verify selector is correct
- Add proper wait conditions
- Check if element exists in story

### Flaky Tests
- Add proper wait conditions
- Increase animation timeouts
- Use more specific selectors

## Next Steps

1. Run all tests to verify setup
2. Review failing tests and adjust selectors
3. Add tests for additional components as needed
4. Integrate tests into CI/CD pipeline
5. Monitor test results regularly

## Support

For issues or questions:
- Check Playwright documentation: https://playwright.dev
- Review MUI testing guides
- Check component Storybook stories
