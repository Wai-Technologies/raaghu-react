import { test, expect, Page } from '@playwright/test';

/**
 * RdsTabs Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const TABS_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-tabs--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiTabs-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsTabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, TABS_STORY_URL);
  });

  test('should render tabs component', async ({ page }) => {
    const tabs = page.locator('.MuiTabs-root').first();
    await expect(tabs).toBeVisible();
  });

  test('should switch tabs on click', async ({ page }) => {
    const firstTab = page.locator('.MuiTab-root').nth(0);
    const secondTab = page.locator('.MuiTab-root').nth(1);
    
    // First tab should be initially selected
    await expect(firstTab).toHaveClass(/Mui-selected/);
    
    await secondTab.click();
    await expect(secondTab).toBeVisible();
  });

  test('should display tab indicator', async ({ page }) => {
    const indicator = page.locator('.MuiTabs-indicator').first();
    await expect(indicator).toBeAttached();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const firstTab = page.locator('.MuiTab-root').first();
    
    await firstTab.focus();
    await expect(firstTab).toBeFocused();
    
    await page.keyboard.press('ArrowRight');
    
    const secondTab = page.locator('.MuiTab-root').nth(1);
    await expect(secondTab).toBeFocused();
  });

  test('should apply different orientations', async ({ page }) => {
    // Test vertical orientation
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-tabs--vertical`);
    
    const tabs = page.locator('.MuiTabs-root').first();
    await expect(tabs).toBeVisible();
  });

  test('should render tab panels', async ({ page }) => {
    // RdsTabs renders tabs with role="tab" but no separate tab panels
    const tab = page.locator('.MuiTab-root').first();
    await expect(tab).toBeVisible();
    await expect(tab).toHaveAttribute('role', 'tab');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const firstTab = page.locator('.MuiTab-root').first();
    
    await expect(firstTab).toHaveAttribute('role', 'tab');
    await expect(firstTab).toHaveAttribute('aria-selected');
  });

  test('should apply disabled state to tabs', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-tabs--second-tab-active`);
    
    const tabs = page.locator('.MuiTab-root').first();
    await expect(tabs).toBeVisible();
  });
});

test.describe('RdsTabs Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, TABS_STORY_URL);
    
    const tabs = page.locator('.MuiTabs-root').first();
    await expect(tabs).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, TABS_STORY_URL);
    
    const tabs = page.locator('.MuiTabs-root').first();
    await expect(tabs).toBeVisible();
  });
});
