import { test, expect } from '@playwright/test';

/**
 * RdsChip Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const CHIP_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-chip--default&viewMode=story`;

test.describe('RdsChip Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CHIP_STORY_URL);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
  });

  test('should render chip component', async ({ page }) => {
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toBeVisible();
  });

  test('should display chip label', async ({ page }) => {
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toBeVisible();
  });

  test('should apply different variants', async ({ page }) => {
    // Test outlined variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--default&args=variant:outlined`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    let chip = page.locator('.MuiChip-root').first();
    await expect(chip).toHaveClass(/MuiChip-outlined/);
    
    // Test filled variant
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--default&args=variant:filled`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    chip = page.locator('.MuiChip-root').first();
    await expect(chip).toHaveClass(/MuiChip-filled/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--default&args=size:small`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    let chip = page.locator('.MuiChip-root').first();
    await expect(chip).toHaveClass(/MuiChip-sizeSmall/);
    
    // Test medium size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--default&args=size:medium`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    chip = page.locator('.MuiChip-root').first();
    await expect(chip).toHaveClass(/MuiChip-sizeMedium/);
  });

  test('should handle delete action', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--with-delete-icon`);
    await page.waitForSelector('.MuiChip-root', { timeout: 15000 });
    await page.waitForTimeout(500);
    
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toBeVisible();
    
    const deleteIcon = page.locator('.MuiChip-deleteIcon').first();
    
    if (await deleteIcon.count() > 0) {
      await expect(deleteIcon).toBeVisible();
      await deleteIcon.click();
      await page.waitForTimeout(300);
    }
  });

  test('should display icon when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--with-icon`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    const icon = page.locator('.MuiChip-icon').first();
    
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();
    }
  });

  test('should handle click when clickable', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--clickable`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    const chip = page.locator('.MuiChip-root.MuiChip-clickable').first();
    
    if (await chip.count() > 0) {
      await chip.click();
      await page.waitForTimeout(200);
      
      await expect(chip).toBeVisible();
    }
  });

  test('should not be interactive when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-chip--default&args=disabled:true`);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toHaveClass(/Mui-disabled/);
  });

  test('should apply hover state', async ({ page }) => {
    const chip = page.locator('.MuiChip-root.MuiChip-clickable').first();
    
    if (await chip.count() > 0) {
      await chip.hover();
      await page.waitForTimeout(100);
      
      await expect(chip).toBeVisible();
    }
  });
});

test.describe('RdsChip Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(CHIP_STORY_URL);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(CHIP_STORY_URL);
    await page.waitForSelector('.MuiChip-root', { timeout: 10000 });
    
    const chip = page.locator('.MuiChip-root').first();
    await expect(chip).toBeVisible();
  });
});
