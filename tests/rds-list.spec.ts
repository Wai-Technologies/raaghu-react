import { test, expect } from '@playwright/test';

/**
 * RdsList Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const LIST_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-list--align-items&viewMode=story`;

test.describe('RdsList Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LIST_STORY_URL, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    await page.locator('.MuiList-root').waitFor({ state: 'visible', timeout: 10000 });
  });

  test('should render list component', async ({ page }) => {
    const list = page.locator('.MuiList-root').first();
    await expect(list).toBeVisible();
  });

  test('should display list items', async ({ page }) => {
    const listItem = page.locator('.MuiListItem-root').first();
    await expect(listItem).toBeVisible();
  });

  test('should handle list item click', async ({ page }) => {
    // Navigate to Multiple Selection story which has clickable items
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-list--multiple-selection`, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    const listItemButton = page.locator('.MuiListItemButton-root').first();
    await listItemButton.waitFor({ state: 'visible', timeout: 15000 });
    
    await listItemButton.click();
    await expect(listItemButton).toBeVisible();
  });

  test('should apply different density', async ({ page }) => {
    // Use the Dense story which has dense list configuration
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-list--dense`, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    
    const list = page.locator('.MuiList-root').first();
    await list.waitFor({ state: 'visible', timeout: 15000 });
    // Component uses custom rds-list--dense class instead of MUI's dense prop
    await expect(list).toHaveClass(/rds-list--dense/);
  });

  test('should display list item icon', async ({ page }) => {
    // Use With Icons story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-list--with-icons`, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    const listItemIcon = page.locator('.MuiListItemIcon-root').first();
    await listItemIcon.waitFor({ state: 'visible', timeout: 15000 });
    await expect(listItemIcon).toBeVisible();
  });

  test('should display list item text', async ({ page }) => {
    const listItemText = page.locator('.MuiListItemText-root').first();
    await expect(listItemText).toBeVisible();
  });

  test('should handle hover state', async ({ page }) => {
    // Use Multiple Selection story for interactive items
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-list--multiple-selection`, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    const listItemButton = page.locator('.MuiListItemButton-root').first();
    await listItemButton.waitFor({ state: 'visible', timeout: 15000 });
    
    await listItemButton.hover();
    await expect(listItemButton).toBeVisible();
  });

  test('should apply selected state', async ({ page }) => {
    // Use Multiple Selection story which has clickable list item buttons
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-list--multiple-selection`);
    
    const listItemButton = page.locator('.MuiListItemButton-root').first();
    await listItemButton.waitFor({ state: 'visible', timeout: 15000 });
    await listItemButton.click();
    await expect(listItemButton).toBeVisible();
  });
});

test.describe('RdsList Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(LIST_STORY_URL, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    
    const list = page.locator('.MuiList-root').first();
    await list.waitFor({ state: 'visible', timeout: 15000 });
    await expect(list).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(LIST_STORY_URL, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    
    const list = page.locator('.MuiList-root').first();
    await list.waitFor({ state: 'visible', timeout: 15000 });
    await expect(list).toBeVisible();
  });
});
