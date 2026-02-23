import { test, expect } from '@playwright/test';

/**
 * RdsDialog Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const DIALOG_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-dialog--default&viewMode=story`;

test.describe('RdsDialog Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and wait for the page to be ready
    await page.goto(DIALOG_STORY_URL);
    // Use a more flexible locator that ignores leading/trailing whitespace and is case-insensitive
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.waitFor({ state: 'visible', timeout: 15000 });
  });

  test('should open dialog on trigger click', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    
    // Wait for the dialog to appear (MUI uses a portal, so we check for the root class)
    const dialog = page.locator('.MuiDialog-root');
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });

  test('should display dialog title', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    
    const dialogTitle = page.locator('.MuiDialogTitle-root').first();
    await expect(dialogTitle).toBeVisible();
  });

  test('should display dialog content', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    
    const dialogContent = page.locator('.MuiDialogContent-root').first();
    await expect(dialogContent).toBeVisible();
  });

  test('should display dialog actions', async ({ page }) => {
    // Use the "With Actions" story which explicitly provides actions
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-dialog--with-actions`);
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.waitFor({ state: 'visible', timeout: 15000 });
    await trigger.click();
    
    const dialogActions = page.locator('.MuiDialogActions-root').first();
    await expect(dialogActions).toBeVisible();
  });

  test('should close dialog on close button click', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    
    // Try to click the close icon if it exists, otherwise use a generic button in actions
    const closeIconButton = page.locator('button[aria-label="close"]');
    const actionButtons = page.locator('.MuiDialogActions-root button');
    
    if (await closeIconButton.isVisible()) {
      await closeIconButton.click();
    } else if (await actionButtons.count() > 0) {
      await actionButtons.first().click();
    }
    
    const dialog = page.locator('.MuiDialog-root');
    await expect(dialog).toBeHidden();
  });

  test('should close dialog on backdrop click', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    await page.waitForTimeout(500); // Wait for transition
    
    // Click at the top left corner of the page to trigger backdrop click
    await page.mouse.click(10, 10);
    
    const dialog = page.locator('.MuiDialog-root');
    await expect(dialog).toBeHidden();
  });

  test('should close dialog on Escape key', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    await page.waitForTimeout(500);
    
    await page.keyboard.press('Escape');
    
    const dialog = page.locator('.MuiDialog-root');
    await expect(dialog).toBeHidden();
  });

  test('should apply different sizes', async ({ page }) => {
    // In Storybook, size:small is often passed via args in the URL
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-dialog--default&args=size:small`);
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.waitFor({ state: 'visible', timeout: 15000 });
    await trigger.click();
    
    // MUI maps size="small" to paperWidthSm class
    const dialogPaper = page.locator('.MuiDialog-paper').first();
    await expect(dialogPaper).toHaveClass(/MuiDialog-paperWidthSm/);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.click();
    
    const dialog = page.locator('[role="dialog"]').first();
    await expect(dialog).toBeVisible();
  });
});

test.describe('RdsDialog Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(DIALOG_STORY_URL);
    
    const trigger = page.locator('button').filter({ hasText: /Open Dialog/i }).first();
    await trigger.waitFor({ state: 'visible', timeout: 15000 });
    await trigger.click();
    
    const dialog = page.locator('.MuiDialog-root');
    await expect(dialog).toBeVisible();
  });
});
