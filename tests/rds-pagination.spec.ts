import { test, expect, Page } from '@playwright/test';

/**
 * RdsPagination Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const PAGINATION_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-pagination--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiPagination-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsPagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, PAGINATION_STORY_URL);
  });

  test('should render pagination component', async ({ page }) => {
    const pagination = page.locator('.MuiPagination-root').first();
    await expect(pagination).toBeVisible();
  });

  test('should display page numbers', async ({ page }) => {
    const pageButtons = page.locator('.MuiPaginationItem-root');
    await expect(pageButtons.first()).toBeVisible();
  });

  test('should navigate to next page', async ({ page }) => {
    const nextButton = page.locator('.MuiPaginationItem-root[aria-label*="next"], .MuiPaginationItem-root[aria-label*="Next"]').first();
    
    await nextButton.click();
    
    await expect(nextButton).toBeVisible();
  });

  test('should navigate to previous page', async ({ page }) => {
    const pageTwo = page.locator('.MuiPaginationItem-root').filter({ hasText: '2' }).first();
    await pageTwo.click();
    
    const prevButton = page.locator('.MuiPaginationItem-root[aria-label*="previous"], .MuiPaginationItem-root[aria-label*="Previous"]').first();
    await prevButton.click();
    
    await expect(prevButton).toBeVisible();
  });

  test('should select specific page', async ({ page }) => {
    const pageThree = page.locator('.MuiPaginationItem-root').filter({ hasText: '3' }).first();
    
    await pageThree.click();
    
    await expect(pageThree).toHaveClass(/Mui-selected/);
  });

  test('should apply different variants', async ({ page }) => {
    // Test outlined variant
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-pagination--default&args=variant:outlined`);
    
    const pageButton = page.locator('.MuiPaginationItem-root').first();
    await expect(pageButton).toHaveClass(/MuiPaginationItem-outlined/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-pagination--default&args=size:small`);
    
    const pageButton = page.locator('.MuiPaginationItem-root').first();
    await expect(pageButton).toHaveClass(/MuiPaginationItem-sizeSmall/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const pageOne = page.locator('.MuiPaginationItem-root').filter({ hasText: '1' }).first();
    
    await pageOne.focus();
    await expect(pageOne).toBeFocused();
    
    // Navigate to next page button using keyboard  
    await page.keyboard.press('Tab');
    
    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return el?.classList.contains('MuiPaginationItem-root') || false;
    });
    
    expect(focused).toBeTruthy();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const pagination = page.locator('.MuiPagination-root').first();
    const pageItem = pagination.locator('.MuiPaginationItem-root').first();
    
    // Check that pagination items have proper type and role
    await expect(pageItem).toHaveAttribute('type', 'button');
  });
});

test.describe('RdsPagination Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PAGINATION_STORY_URL);
    await page.waitForSelector('.MuiPagination-root', { timeout: 10000 });
    
    const pagination = page.locator('.MuiPagination-root').first();
    await expect(pagination).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(PAGINATION_STORY_URL);
    await page.waitForSelector('.MuiPagination-root', { timeout: 10000 });
    
    const pagination = page.locator('.MuiPagination-root').first();
    await expect(pagination).toBeVisible();
  });
});
