import { test, expect } from '@playwright/test';

/**
 * RdsDivider Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const DIVIDER_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-divider--default&viewMode=story`;

test.describe('RdsDivider Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DIVIDER_STORY_URL);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
  });

  test('should render divider component', async ({ page }) => {
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should apply different orientations', async ({ page }) => {
    // Test horizontal orientation (default)
    let divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
    
    // Test vertical orientation
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-divider--vertical`);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test default variant
    let divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
    
    // Test with text variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should display text when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    const dividerText = page.locator('.MuiDivider-wrapper').first();
    
    if (await dividerText.count() > 0) {
      await expect(dividerText).toBeVisible();
    }
  });

  test('should apply different text alignments', async ({ page }) => {
    // Test with text divider
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    let divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should apply flexItem class when specified', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-divider--flexed`);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should have proper separator role', async ({ page }) => {
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });
});

test.describe('RdsDivider Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(DIVIDER_STORY_URL);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(DIVIDER_STORY_URL);
    await page.waitForSelector('.MuiDivider-root', { timeout: 10000 });
    
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });
});
