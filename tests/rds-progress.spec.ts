import { test, expect, Page } from '@playwright/test';

/**
 * RdsProgress Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const PROGRESS_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiCircularProgress-root, .MuiLinearProgress-root, .rds-progress') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  // Wait for either circular or linear progress to be visible
  await page.waitForFunction(() => 
    document.querySelector('.MuiCircularProgress-root') || 
    document.querySelector('.MuiLinearProgress-root') ||
    document.querySelector('.rds-progress'),
    { timeout: 15000 }
  );
}

test.describe('RdsProgress Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, PROGRESS_STORY_URL);
  });

  test('should render progress component', async ({ page }) => {
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });

  test('should apply different variants for circular progress', async ({ page }) => {
    // Test determinate variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=variant:determinate`);
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toHaveClass(/MuiCircularProgress-determinate/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test size prop for circular progress
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=size:80`);
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should show progress value for determinate', async ({ page }) => {
    // Use semicolon to separate multiple Storybook args
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=variant:determinate;value:75`);
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should render linear progress', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-progress--linear`);
    
    const progress = page.locator('.MuiLinearProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should apply determinate variant for linear progress', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-progress--linear&args=variant:determinate`);
    
    const progress = page.locator('.MuiLinearProgress-root').first();
    await expect(progress).toHaveClass(/MuiLinearProgress-determinate/);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const progress = page.locator('.MuiCircularProgress-root, .MuiLinearProgress-root').first();
    await expect(progress).toHaveAttribute('role', 'progressbar');
  });
});

test.describe('RdsProgress Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, PROGRESS_STORY_URL);
    
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, PROGRESS_STORY_URL);
    
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });
});
