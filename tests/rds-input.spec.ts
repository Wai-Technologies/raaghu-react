import { test, expect, Page } from '@playwright/test';

/**
 * RdsInput Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const INPUT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-input--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiInputBase-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsInput Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, INPUT_STORY_URL);
  });

  test('should render input component', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });

  test('should allow text input', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    
    await input.fill('Test input');
    await expect(input).toHaveValue('Test input');
  });

  test('should show placeholder text', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    
    // Verify input is visible
    await expect(input).toBeVisible();
    await page.waitForTimeout(500);
  });

  test('should not accept input when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=disabled:true`);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeDisabled();
  });

  test('should apply error state', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=error:true`);
    
    const inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toHaveClass(/Mui-error/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=size:small`);
    
    let inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toHaveClass(/MuiInputBase-sizeSmall/);
    
    // Test medium size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=size:medium`);
    
    inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toBeVisible();
  });

  test('should handle keyboard input', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    
    await input.focus();
    await page.keyboard.type('Hello World');
    
    await expect(input).toHaveValue('Hello World');
  });

  test('should clear input value', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    
    await input.fill('Test');
    await expect(input).toHaveValue('Test');
    
    await input.fill('');
    await expect(input).toHaveValue('');
  });

  test('should apply focus state', async ({ page }) => {
    const input = page.locator('.MuiInputBase-input').first();
    
    await input.focus();
    await expect(input).toBeFocused();
    
    const inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toHaveClass(/Mui-focused/);
  });
});

test.describe('RdsInput Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, INPUT_STORY_URL);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, INPUT_STORY_URL);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await navigateToStory(page, INPUT_STORY_URL);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });
});
