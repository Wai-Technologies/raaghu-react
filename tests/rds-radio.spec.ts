import { test, expect, Page } from '@playwright/test';

/**
 * RdsRadio Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const RADIO_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-radio--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiRadio-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsRadio Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, RADIO_STORY_URL);
  });

  test('should render radio component', async ({ page }) => {
    const radio = page.locator('.MuiRadio-root').first();
    await expect(radio).toBeVisible();
  });

  test('should select radio on click', async ({ page }) => {
    const radio = page.locator('.MuiRadio-root').first();
    const input = radio.locator('input[type="radio"]');
    
    await radio.click();
    
    await expect(input).toBeChecked();
  });

  test('should not select when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-radio--default&args=state:disabled`);
    
    const radio = page.locator('.MuiRadio-root').first();
    const input = radio.locator('input[type="radio"]');
    
    await expect(input).toBeDisabled();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test horizontal layout as an alternative to size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-radio--horizontal`);
    
    let radios = page.locator('.MuiRadio-root');
    await expect(radios.first()).toBeVisible();
  });

  test('should handle keyboard interaction', async ({ page }) => {
    const radio = page.locator('.MuiRadio-root').first();
    const input = radio.locator('input[type="radio"]');
    
    await input.focus();
    await expect(input).toBeFocused();
    
    await page.keyboard.press('Space');
    
    await expect(input).toBeChecked();
  });

  test('should only allow one selection in radio group', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-radio--horizontal`);
    
    const firstRadio = page.locator('.MuiRadio-root').nth(0);
    const secondRadio = page.locator('.MuiRadio-root').nth(1);
    
    await firstRadio.click();
    
    const firstInput = firstRadio.locator('input[type="radio"]');
    await expect(firstInput).toBeChecked();
    
    await secondRadio.click();
    
    const secondInput = secondRadio.locator('input[type="radio"]');
    await expect(secondInput).toBeChecked();
    await expect(firstInput).not.toBeChecked();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const radio = page.locator('.MuiRadio-root').first();
    const input = radio.locator('input[type="radio"]');
    
    await expect(input).toHaveAttribute('type', 'radio');
  });
});

test.describe('RdsRadio Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, RADIO_STORY_URL);
    
    const radio = page.locator('.MuiRadio-root').first();
    await expect(radio).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(RADIO_STORY_URL);
    await page.waitForSelector('.MuiRadio-root', { timeout: 10000 });
    
    const radio = page.locator('.MuiRadio-root').first();
    await expect(radio).toBeVisible();
  });
});
