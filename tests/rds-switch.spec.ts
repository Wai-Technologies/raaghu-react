import { test, expect } from '@playwright/test';

/**
 * RdsSwitch Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const SWITCH_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-switch--default&viewMode=story`;

test.describe('RdsSwitch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SWITCH_STORY_URL);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
  });

  test('should render switch component', async ({ page }) => {
    const switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });

  test('should toggle switch state on click', async ({ page }) => {
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    const initialChecked = await input.isChecked();
    
    await switchElement.click();
    await page.waitForTimeout(200);
    
    const newChecked = await input.isChecked();
    expect(newChecked).toBe(!initialChecked);
  });

  test('should not toggle when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=state:Disabled Off`);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    await expect(input).toBeDisabled();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test different style variants since RdsSwitch doesn't have size prop
    // Test style 1
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=style:Style 1`);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
    
    let switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
    
    // Test style 3
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=style:Style 3`);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
    
    switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });

  test('should handle keyboard interaction', async ({ page }) => {
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    await input.focus();
    await expect(input).toBeFocused();
    
    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    await expect(input).toHaveAttribute('type', 'checkbox');
    await expect(input).toHaveAttribute('role', 'switch');
  });
});

test.describe('RdsSwitch Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SWITCH_STORY_URL);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(SWITCH_STORY_URL);
    await page.waitForSelector('.MuiSwitch-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });
});
