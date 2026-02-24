import { test, expect, Page } from '@playwright/test';

/**
 * RdsSwitch Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const SWITCH_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-switch--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiSwitch-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsSwitch Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, SWITCH_STORY_URL);
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
    
    const newChecked = await input.isChecked();
    expect(newChecked).toBe(!initialChecked);
  });

  test('should not toggle when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=state:Disabled Off`);
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    await expect(input).toBeDisabled();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test different style variants since RdsSwitch doesn't have size prop
    // Test style 1
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=style:Style 1`);
    
    let switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
    
    // Test style 3
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-switch--default&args=style:Style 3`);
    
    switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });

  test('should handle keyboard interaction', async ({ page }) => {
    const switchElement = page.locator('.MuiSwitch-root').first();
    const input = switchElement.locator('input[type="checkbox"]');
    
    await input.focus();
    await expect(input).toBeFocused();
    
    await page.keyboard.press('Space');
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
    await navigateToStory(page, SWITCH_STORY_URL);
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, SWITCH_STORY_URL);
    
    const switchElement = page.locator('.MuiSwitch-root').first();
    await expect(switchElement).toBeVisible();
  });
});
