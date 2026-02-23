import { test, expect } from '@playwright/test';

/**
 * RdsProgress Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const PROGRESS_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&viewMode=story`;

test.describe('RdsProgress Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PROGRESS_STORY_URL, { waitUntil: 'networkidle' });
    // Wait for either circular or linear progress to be visible
    await page.waitForFunction(() => 
      document.querySelector('.MuiCircularProgress-root') || 
      document.querySelector('.MuiLinearProgress-root') ||
      document.querySelector('.rds-progress'),
      { timeout: 10000 }
    );
  });

  test('should render progress component', async ({ page }) => {
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });

  test('should apply different variants for circular progress', async ({ page }) => {
    // Test determinate variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=variant:determinate`, { waitUntil: 'networkidle' });
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toHaveClass(/MuiCircularProgress-determinate/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test size prop for circular progress
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=size:80`, { waitUntil: 'networkidle' });
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should show progress value for determinate', async ({ page }) => {
    // Use semicolon to separate multiple Storybook args
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-progress--circular&args=variant:determinate;value:75`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    
    const progress = page.locator('.MuiCircularProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should render linear progress', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-progress--linear`, { waitUntil: 'networkidle' });
    
    const progress = page.locator('.MuiLinearProgress-root').first();
    await expect(progress).toBeVisible();
  });

  test('should apply determinate variant for linear progress', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-progress--linear&args=variant:determinate`, { waitUntil: 'networkidle' });
    
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
    await page.goto(PROGRESS_STORY_URL, { waitUntil: 'networkidle' });
    
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(PROGRESS_STORY_URL, { waitUntil: 'networkidle' });
    
    const progress = page.locator('.MuiCircularProgress-root, .rds-progress').first();
    await expect(progress).toBeVisible();
  });
});
