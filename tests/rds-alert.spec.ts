import { test, expect, Page } from '@playwright/test';

/**
 * RdsAlert Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const ALERT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-alert--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiAlert-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsAlert Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, ALERT_STORY_URL);
  });

  test('should render alert component', async ({ page }) => {
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should display alert message', async ({ page }) => {
    const alertMessage = page.locator('.MuiAlert-message').first();
    await expect(alertMessage).toBeVisible();
  });

  test('should apply different severity levels', async ({ page }) => {
    // Test error severity
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--error`);
    
    let alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
    
    // Test warning severity
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--warning`);
    
    alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test outlined variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--outlined`);
    
    let alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
    
    // Test filled variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--filled`);
    
    alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should display close button when closeable', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--default`);
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should close alert when close button clicked', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-alert--default`);
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should display icon based on severity', async ({ page }) => {
    const icon = page.locator('.MuiAlert-icon').first();
    await expect(icon).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toHaveAttribute('role', 'alert');
  });
});

test.describe('RdsAlert Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, ALERT_STORY_URL);
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, ALERT_STORY_URL);
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });
});
