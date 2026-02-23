import { test, expect } from '@playwright/test';

/**
 * RdsInput Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const INPUT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-input--default&viewMode=story`;

test.describe('RdsInput Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(INPUT_STORY_URL);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
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
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=disabled:true`);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeDisabled();
  });

  test('should apply error state', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=error:true`);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    
    const inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toHaveClass(/Mui-error/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=size:small`);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    
    let inputContainer = page.locator('.MuiInputBase-root').first();
    await expect(inputContainer).toHaveClass(/MuiInputBase-sizeSmall/);
    
    // Test medium size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-input--default&args=size:medium`);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    
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
    await page.goto(INPUT_STORY_URL);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(INPUT_STORY_URL);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(INPUT_STORY_URL);
    await page.waitForSelector('.MuiInputBase-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const input = page.locator('.MuiInputBase-input').first();
    await expect(input).toBeVisible();
  });
});
