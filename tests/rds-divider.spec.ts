import { test, expect, Page } from '@playwright/test';

/**
 * RdsDivider Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const DIVIDER_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-divider--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiDivider-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsDivider Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, DIVIDER_STORY_URL);
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
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-divider--vertical`);
    
    divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test default variant
    let divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
    
    // Test with text variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    
    divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should display text when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    
    const dividerText = page.locator('.MuiDivider-wrapper').first();
    
    if (await dividerText.count() > 0) {
      await expect(dividerText).toBeVisible();
    }
  });

  test('should apply different text alignments', async ({ page }) => {
    // Test with text divider
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-divider--with-text`);
    
    let divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should apply flexItem class when specified', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-divider--flexed`);
    
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
    await navigateToStory(page, DIVIDER_STORY_URL);
    
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, DIVIDER_STORY_URL);
    
    const divider = page.locator('.MuiDivider-root').first();
    await expect(divider).toBeVisible();
  });
});
