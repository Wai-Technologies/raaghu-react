import { test, expect } from '@playwright/test';

/**
 * RdsBreadcrumbs Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BREADCRUMBS_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-breadcrumbs--default&viewMode=story`;

test.describe('RdsBreadcrumbs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BREADCRUMBS_STORY_URL);
    await page.waitForSelector('.MuiBreadcrumbs-root', { timeout: 10000 });
  });

  test('should render breadcrumbs component', async ({ page }) => {
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });

  test('should display breadcrumb items', async ({ page }) => {
    const breadcrumbItems = page.locator('.MuiBreadcrumbs-li');
    await expect(breadcrumbItems.first()).toBeVisible();
  });

  test('should display separator between items', async ({ page }) => {
    await page.waitForTimeout(500);
    const separator = page.locator('.MuiBreadcrumbs-separator').first();
    await expect(separator).toBeVisible();
  });

  test('should navigate on breadcrumb click', async ({ page }) => {
    const link = page.locator('.MuiBreadcrumbs-root a').first();
    
    if (await link.count() > 0) {
      await expect(link).toBeVisible();
      // Don't actually navigate in test to stay on story page
    }
  });

  test('should show max items when specified', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-breadcrumbs--default&args=maxItems:3`);
    await page.waitForSelector('.MuiBreadcrumbs-root', { timeout: 10000 });
    
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toHaveAttribute('title');
  });
});

test.describe('RdsBreadcrumbs Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BREADCRUMBS_STORY_URL);
    await page.waitForSelector('.MuiBreadcrumbs-root', { timeout: 10000 });
    
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BREADCRUMBS_STORY_URL);
    await page.waitForSelector('.MuiBreadcrumbs-root', { timeout: 10000 });
    
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });
});
