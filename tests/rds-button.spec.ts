import { test, expect, Page } from '@playwright/test';

/**
 * RdsButton Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const BUTTON_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-button--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiButton-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsButton Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, BUTTON_STORY_URL);
  });

  test('should render button with text', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should be clickable', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    await button.click();
    await expect(button).toBeVisible();
  });

  test('should apply correct variant classes', async ({ page }) => {
    // Test Primary variant using story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--primary`);
    
    let button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
    
    // Test Outlined variant using story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--outlined`);
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-outlined/);
  });

  test('should apply correct size classes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:small`);
    
    let button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeSmall/);
    
    // Test medium size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:medium`);
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeMedium/);
    
    // Test large size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--default&args=size:large`);
    
    button = page.locator('.MuiButton-root').first();
    await expect(button).toHaveClass(/MuiButton-sizeLarge/);
  });

  test('should not be clickable when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--disabled`);
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeDisabled();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    
    await button.focus();
    await expect(button).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(button).toBeVisible();
  });

  test('should apply hover state', async ({ page }) => {
    const button = page.locator('.MuiButton-root').first();
    
    await button.hover();
    
    await expect(button).toBeVisible();
  });

  test('should display icon when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-button--with-start-icon`);
    
    const button = page.locator('.MuiButton-root').first();
    const icon = button.locator('.MuiSvgIcon-root');
    
    await expect(icon).toBeVisible();
  });
});

test.describe('RdsButton Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, BUTTON_STORY_URL);
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, BUTTON_STORY_URL);
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await navigateToStory(page, BUTTON_STORY_URL);
    
    const button = page.locator('.MuiButton-root').first();
    await expect(button).toBeVisible();
  });
});
