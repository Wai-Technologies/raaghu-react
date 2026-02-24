import { test, expect, Page } from '@playwright/test';

/**
 * RdsCheckbox Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const CHECKBOX_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-checkbox--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiCheckbox-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsCheckbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, CHECKBOX_STORY_URL);
  });

  test('should render checkbox component', async ({ page }) => {
    const checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toBeVisible();
  });

  test('should toggle checkbox state on click', async ({ page }) => {
    const checkbox = page.locator('.MuiCheckbox-root').first();
    const input = checkbox.locator('input[type="checkbox"]');
    
    // Check initial state
    const initialChecked = await input.isChecked();
    
    // Click to toggle
    await checkbox.click();
    
    // Verify state changed
    const newChecked = await input.isChecked();
    expect(newChecked).toBe(!initialChecked);
  });

  test('should not toggle when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-checkbox--default&args=isDisabled:true`);
    
    const checkbox = page.locator('.MuiCheckbox-root').first();
    const input = checkbox.locator('input[type="checkbox"]');
    
    await expect(input).toBeDisabled();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-checkbox--default&args=size:small`);
    
    let checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toHaveClass(/MuiCheckbox-sizeSmall/);
    
    // Test medium size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-checkbox--default&args=size:medium`);
    
    checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toHaveClass(/MuiCheckbox-sizeMedium/);
  });

  test('should handle keyboard interaction', async ({ page }) => {
    const checkbox = page.locator('.MuiCheckbox-root').first();
    const input = checkbox.locator('input[type="checkbox"]');
    
    await input.focus();
    await expect(input).toBeFocused();
    
    await page.keyboard.press('Space');
    
    await expect(input).toBeChecked();
  });

  test('should display indeterminate state', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-checkbox--indeterminate`);
    
    const checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toHaveClass(/MuiCheckbox-indeterminate/);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const checkbox = page.locator('.MuiCheckbox-root').first();
    const input = checkbox.locator('input[type="checkbox"]');
    
    await expect(input).toHaveAttribute('type', 'checkbox');
  });
});

test.describe('RdsCheckbox Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, CHECKBOX_STORY_URL);
    
    const checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(CHECKBOX_STORY_URL);
    await page.waitForSelector('.MuiCheckbox-root', { timeout: 10000 });
    
    const checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(CHECKBOX_STORY_URL);
    await page.waitForSelector('.MuiCheckbox-root', { timeout: 10000 });
    
    const checkbox = page.locator('.MuiCheckbox-root').first();
    await expect(checkbox).toBeVisible();
  });
});
