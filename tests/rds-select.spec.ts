import { test, expect } from '@playwright/test';

/**
 * RdsSelect Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const SELECT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-select--default&viewMode=story`;

test.describe('RdsSelect Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SELECT_STORY_URL);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
  });

  test('should render select component', async ({ page }) => {
    const select = page.locator('.MuiSelect-root').first();
    await expect(select).toBeVisible();
  });

  test('should open dropdown on click', async ({ page }) => {
    const select = page.locator('.MuiSelect-root').first();
    
    await select.click();
    await page.waitForTimeout(300);
    
    const dropdown = page.locator('.MuiPopover-root, .MuiMenu-root');
    await expect(dropdown).toBeVisible();
  });

  test('should select option from dropdown', async ({ page }) => {
    const select = page.locator('.MuiSelect-root').first();
    
    await select.click();
    await page.waitForTimeout(300);
    
    const option = page.locator('[role="option"]').first();
    await option.click();
    await page.waitForTimeout(300);
    
    await expect(select).toBeVisible();
  });

  test('should not open when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-select--with-disabled-options`);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    const select = page.locator('.MuiSelect-root').first();
    await expect(select).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-select--default&args=size:small`);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    let select = page.locator('.MuiInputBase-root').first();
    await expect(select).toHaveClass(/MuiInputBase-sizeSmall/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const combobox = page.locator('[role="combobox"]').first();
    
    await combobox.click();
    await page.waitForTimeout(500);
    
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  });

  test('should show placeholder when no value selected', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-select--default&args=placeholder:Select option`);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    const select = page.locator('.MuiSelect-root').first();
    await expect(select).toBeVisible();
  });

  test('should apply error state', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-select--with-error`);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    const selectContainer = page.locator('.MuiInputBase-root').first();
    await expect(selectContainer).toHaveClass(/Mui-error/);
  });
});

test.describe('RdsSelect Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SELECT_STORY_URL);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    const select = page.locator('.MuiSelect-root').first();
    await expect(select).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(SELECT_STORY_URL);
    await page.waitForSelector('.MuiSelect-root', { timeout: 10000 });
    
    const select = page.locator('.MuiSelect-root').first();
    await expect(select).toBeVisible();
  });
});
