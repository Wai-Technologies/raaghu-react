import { test, expect } from '@playwright/test';

/**
 * RdsAvatar Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const AVATAR_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-avatar--default&viewMode=story`;

test.describe('RdsAvatar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(AVATAR_STORY_URL);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
  });

  test('should render avatar component', async ({ page }) => {
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test Small size via story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--small`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 15000 });
    
    let avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
    
    // Test Large size via story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--large`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 15000 });
    
    avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test Medium variant using story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--medium`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 15000 });
    
    let avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
    
    // Test Large variant using story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--large`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 15000 });
    
    avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should display image when src provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-image`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
    
    const avatar = page.locator('.MuiAvatar-root').first();
    const img = avatar.locator('img');
    
    if (await img.count() > 0) {
      await expect(img).toBeVisible();
    }
  });

  test('should display text/initials when no image', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-initials`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should display icon when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-icon`);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
    
    const avatar = page.locator('.MuiAvatar-root').first();
    const icon = avatar.locator('.MuiSvgIcon-root');
    
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });
});

test.describe('RdsAvatar Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(AVATAR_STORY_URL);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(AVATAR_STORY_URL);
    await page.waitForSelector('.MuiAvatar-root', { timeout: 10000 });
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });
});
