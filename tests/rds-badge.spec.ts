import { test, expect, Page } from '@playwright/test';

/**
 * RdsBadge Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BADGE_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-badge--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiBadge-root') {
  await page.goto(storyUrl, { waitUntil: 'load', timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsBadge Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, BADGE_STORY_URL);
  });

  test('should render badge component', async ({ page }) => {
    const badge = page.locator('.MuiBadge-root').first();
    await expect(badge).toBeVisible();
  });

  test('should display badge content', async ({ page }) => {
    const badgeContent = page.locator('.MuiBadge-badge').first();
    await expect(badgeContent).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test dot variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--dot`);
    
    let badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
    
    // Test default variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--default`);
    
    badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should apply different colors', async ({ page }) => {
    // Test default badge
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--default`);
    
    let badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
    
    // Test with avatar badge (different color variant)
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--with-avatar`);
    
    badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should apply different anchor origins', async ({ page }) => {
    // Test top-right
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--default&args=anchorOrigin.vertical:top;anchorOrigin.horizontal:right`);
    
    const badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toHaveClass(/MuiBadge-anchorOriginTopRight/);
  });

  test('should show max value when content exceeds', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--default&args=badgeContent:100;max:99`);
    
    const badgeContent = page.locator('.MuiBadge-badge').first();
    await expect(badgeContent).toContainText('99+');
  });

  test('should be hidden when showZero is false and content is 0', async ({ page }) => {
    // When showZero is false and content is 0, the component renders children without MuiBadge wrapper
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-badge--show-zero-false`, 'svg');
    
    // Children (Mail icon) should still render
    const icon = page.locator('svg').first();
    await expect(icon).toBeVisible();
    
    // Badge content element should not be present
    const badge = page.locator('.MuiBadge-badge');
    await expect(badge).toHaveCount(0);
  });
});

test.describe('RdsBadge Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, BADGE_STORY_URL);
    
    const badge = page.locator('.MuiBadge-root').first();
    await expect(badge).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, BADGE_STORY_URL);
    
    const badge = page.locator('.MuiBadge-root').first();
    await expect(badge).toBeVisible();
  });
});
