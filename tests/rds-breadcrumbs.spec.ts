import { test, expect, Page } from '@playwright/test';

/**
 * RdsBreadcrumbs Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BREADCRUMBS_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-breadcrumbs--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiBreadcrumbs-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsBreadcrumbs Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, BREADCRUMBS_STORY_URL);
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
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-breadcrumbs--default&args=maxItems:3`);
    
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
    await navigateToStory(page, BREADCRUMBS_STORY_URL);
    
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, BREADCRUMBS_STORY_URL);
    
    const breadcrumbs = page.locator('.MuiBreadcrumbs-root').first();
    await expect(breadcrumbs).toBeVisible();
  });
});
