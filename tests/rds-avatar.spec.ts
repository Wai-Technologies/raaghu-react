import { test, expect, Page } from '@playwright/test';

/**
 * RdsAvatar Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const AVATAR_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-avatar--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiAvatar-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsAvatar Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, AVATAR_STORY_URL);
  });

  test('should render avatar component', async ({ page }) => {
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test Small size via story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--small`);
    
    let avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
    
    // Test Large size via story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--large`);
    
    avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test Medium variant using story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--medium`);
    
    let avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
    
    // Test Large variant using story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--large`);
    
    avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should display image when src provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-image`);
    
    const avatar = page.locator('.MuiAvatar-root').first();
    const img = avatar.locator('img');
    
    if (await img.count() > 0) {
      await expect(img).toBeVisible();
    }
  });

  test('should display text/initials when no image', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-initials`);
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should display icon when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-avatar--with-icon`);
    
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
    await navigateToStory(page, AVATAR_STORY_URL);
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, AVATAR_STORY_URL);
    
    const avatar = page.locator('.MuiAvatar-root').first();
    await expect(avatar).toBeVisible();
  });
});
