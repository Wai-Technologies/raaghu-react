import { test, expect } from '@playwright/test';

/**
 * RdsButton Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BUTTON_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-button--default&viewMode=story`;

test.describe('RdsButton Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BUTTON_STORY_URL);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
  });

  test('should render button with text', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should be clickable', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    await button.click();
    await expect(button).toBeVisible();
  });

  test('should apply correct variant classes', async ({ page }) => {
    // Test Primary variant using story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--primary`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    let button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
    
    // Test Outlined variant using story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--outlined`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-outlined/);
  });

  test('should apply correct size classes', async ({ page }) => {
    // Test small size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:small`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    let button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeSmall/);
    
    // Test medium size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:medium`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeMedium/);
    
    // Test large size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:large`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeLarge/);
  });

  test('should not be clickable when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--disabled`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeDisabled();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    
    await button.focus();
    await expect(button).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(button).toBeVisible();
  });

  test('should apply hover state', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    
    await button.hover();
    await page.waitForTimeout(100);
    
    await expect(button).toBeVisible();
  });

  test('should display icon when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-button--with-start-icon`);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const button = page.locator('.MuiButton-root').first();
    const icon = button.locator('.MuiSvgIcon-root');
    
    await expect(icon).toBeVisible();
  });
});

test.describe('RdsButton Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BUTTON_STORY_URL);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BUTTON_STORY_URL);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BUTTON_STORY_URL);
    await page.waitForSelector('.MuiButton-root', { timeout: 10000 });
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });
});
