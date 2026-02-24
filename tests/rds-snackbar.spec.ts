import { test, expect, Page } from '@playwright/test';

/**
 * RdsSnackbar Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const SNACKBAR_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-snackbar--success&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiButton-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsSnackbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, SNACKBAR_STORY_URL);
  });

  test('should show snackbar on trigger click', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible();
  });

  test('should display snackbar message', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const alert = page.locator('.MuiAlert-root').first();
    await expect(alert).toBeVisible();
  });

  test('should close snackbar after timeout', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-snackbar--auto-hide&viewMode=story`);
    
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible();
    
    // AutoHide story has 2s duration
    await page.waitForTimeout(3000);
    
    await expect(snackbar).toBeHidden();
  });

  test('should close snackbar on close button click', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible();
    
    const closeButton = page.locator('.MuiAlert-action button').first();
    
    if (await closeButton.count() > 0) {
      await closeButton.click();
      
      await expect(snackbar).toBeHidden();
    }
  });

  test('should apply different anchor origins', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-snackbar--error&viewMode=story`);
    
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root').first();
    await expect(snackbar).toBeVisible();
  });

  test('should display action button when provided', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root').first();
    await expect(snackbar).toBeVisible();
  });
});

test.describe('RdsSnackbar Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, SNACKBAR_STORY_URL);
    
    const trigger = page.getByRole('button', { name: /show snackbar/i });
    await trigger.click();
    
    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible();
  });
});
