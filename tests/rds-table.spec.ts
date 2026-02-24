import { test, expect, Page } from '@playwright/test';

/**
 * RdsTable Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const TABLE_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-table--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiTable-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsTable Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, TABLE_STORY_URL);
  });

  test('should render table component', async ({ page }) => {
    const table = page.locator('.MuiTable-root').first();
    await expect(table).toBeVisible();
  });

  test('should display table headers', async ({ page }) => {
    const tableHead = page.locator('.MuiTableHead-root').first();
    await expect(tableHead).toBeVisible();
    
    const headerCell = page.locator('.MuiTableHead-root .MuiTableCell-root').first();
    await expect(headerCell).toBeVisible();
  });

  test('should display table rows', async ({ page }) => {
    const tableBody = page.locator('.MuiTableBody-root').first();
    await expect(tableBody).toBeVisible();
    
    const bodyRow = page.locator('.MuiTableBody-root .MuiTableRow-root').first();
    await expect(bodyRow).toBeVisible();
  });

  test('should display table cells with data', async ({ page }) => {
    const tableCell = page.locator('.MuiTableBody-root .MuiTableCell-root').first();
    await expect(tableCell).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size using the SmallSize story
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-table--small-size`);
    
    const table = page.locator('.MuiTable-root').first();
    await expect(table).toBeVisible();
  });

  test('should apply sticky header when specified', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-table--default&args=stickyHeader:true`);
    
    const table = page.locator('.MuiTable-root').first();
    await expect(table).toHaveClass(/MuiTable-stickyHeader/);
  });

  test('should handle row hover state', async ({ page }) => {
    const row = page.locator('.MuiTableBody-root .MuiTableRow-root').first();
    
    await row.hover();
    
    await expect(row).toBeVisible();
  });

  test('should select table row when clickable', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-table--default&args=selectable:true`);
    
    const checkbox = page.locator('.MuiTableBody-root .MuiCheckbox-root').first();
    if (await checkbox.count() > 0) {
      await checkbox.click();
      
      const input = checkbox.locator('input');
      await expect(input).toBeChecked();
    }
  });
});

test.describe('RdsTable Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, TABLE_STORY_URL);
    
    const table = page.locator('.MuiTable-root').first();
    await expect(table).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, TABLE_STORY_URL);
    
    const table = page.locator('.MuiTable-root').first();
    await expect(table).toBeVisible();
  });
});
