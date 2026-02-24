import { test, expect, Page } from '@playwright/test';

/**
 * RdsTextArea Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const TEXTAREA_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-text-area--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = 'textarea') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsTextArea Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, TEXTAREA_STORY_URL);
  });

  test('should render textarea component', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
  });

  test('should allow multiline text input', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    const multilineText = 'Line 1\nLine 2\nLine 3';
    await textarea.fill(multilineText);
    await expect(textarea).toHaveValue(multilineText);
  });

  test('should show placeholder text', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-text-area--default&args=placeholder:Enter description`);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toHaveAttribute('placeholder', 'Enter description');
  });

  test('should not accept input when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-text-area--default&args=state:Disabled`);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeDisabled();
  });

  test('should respect row count', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-text-area--default&args=rows:5`);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toHaveAttribute('rows', '5');
  });

  test('should apply error state', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-text-area--default&args=state:error`);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
  });

  test('should handle keyboard input', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    await textarea.focus();
    await page.keyboard.type('Hello World');
    
    await expect(textarea).toHaveValue('Hello World');
  });

  test('should apply focus state', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    await textarea.focus();
    await expect(textarea).toBeFocused();
  });
});

test.describe('RdsTextArea Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, TEXTAREA_STORY_URL);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, TEXTAREA_STORY_URL);
    
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
  });
});
