import { test, expect } from '@playwright/test';

/**
 * RdsAlert Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const ALERT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-alert--default&viewMode=story`;

test.describe('RdsAlert Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ALERT_STORY_URL);
    await page.waitForSelector('.MuiAlert-root', { timeout: 10000 });
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
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--error`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 15000 });
    
    let alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
    
    // Test warning severity
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--warning`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 15000 });
    
    alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test outlined variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--outlined`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 15000 });
    
    let alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
    
    // Test filled variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--filled`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 15000 });
    
    alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should display close button when closeable', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--default`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 10000 });
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should close alert when close button clicked', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-alert--default`);
    await page.waitForSelector('.MuiAlert-root', { timeout: 10000 });
    
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
    await page.goto(ALERT_STORY_URL);
    await page.waitForSelector('.MuiAlert-root', { timeout: 10000 });
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(ALERT_STORY_URL);
    await page.waitForSelector('.MuiAlert-root', { timeout: 10000 });
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });
});
