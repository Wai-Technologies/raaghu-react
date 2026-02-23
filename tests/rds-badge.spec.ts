import { test, expect } from '@playwright/test';

/**
 * RdsBadge Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BADGE_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-badge--default&viewMode=story`;

test.describe('RdsBadge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BADGE_STORY_URL);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
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
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--dot`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    let badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
    
    // Test default variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--default`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should apply different colors', async ({ page }) => {
    // Test default badge
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--default`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    let badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
    
    // Test with avatar badge (different color variant)
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--with-avatar`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should apply different anchor origins', async ({ page }) => {
    // Test top-right
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--default&args=anchorOrigin.vertical:top;anchorOrigin.horizontal:right`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    const badge = page.locator('.MuiBadge-badge').first();
    await expect(badge).toHaveClass(/MuiBadge-anchorOriginTopRight/);
  });

  test('should show max value when content exceeds', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--default&args=badgeContent:100;max:99`);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    const badgeContent = page.locator('.MuiBadge-badge').first();
    await expect(badgeContent).toContainText('99+');
  });

  test('should be hidden when showZero is false and content is 0', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-badge--show-zero-false`);
    // When showZero is false and content is 0, the component renders children without MuiBadge wrapper
    await page.waitForSelector('svg', { timeout: 10000 });
    
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
    await page.goto(BADGE_STORY_URL);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    const badge = page.locator('.MuiBadge-root').first();
    await expect(badge).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BADGE_STORY_URL);
    await page.waitForSelector('.MuiBadge-root', { timeout: 10000 });
    
    const badge = page.locator('.MuiBadge-root').first();
    await expect(badge).toBeVisible();
  });
});
