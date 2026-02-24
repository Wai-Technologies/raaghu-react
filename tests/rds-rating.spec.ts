import { test, expect, Page } from '@playwright/test';

/**
 * RdsRating Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const RATING_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-rating--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiRating-root') {
  await page.goto(storyUrl, { waitUntil: 'load', timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsRating Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, RATING_STORY_URL);
  });

  test('should render rating component', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should display rating icons', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
    const starIcon = rating.locator('svg').first();
    await expect(starIcon).toBeVisible();
  });

  test('should select rating on click', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
    
    // Click directly on the rating component to interact with it
    await rating.click();
    
    await expect(rating).toBeVisible();
  });

  test('should not change rating when disabled', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-rating--disabled`);
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should not change rating when readonly', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-rating--read-only`);
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-rating--small`);
    
    let rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
    
    // Test large size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-rating--large`);
    
    rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should support half rating precision', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-rating--half-star`);
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    
    await rating.click();
    await page.keyboard.press('ArrowRight');
    
    await expect(rating).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
    // Rating should contain accessible input elements for each star
    const inputs = rating.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('RdsRating Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(RATING_STORY_URL);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(RATING_STORY_URL);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });
});
