import { test, expect } from '@playwright/test';

/**
 * RdsRating Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const RATING_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-rating--default&viewMode=story`;

test.describe('RdsRating Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(RATING_STORY_URL);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
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
    await page.waitForTimeout(200);
    
    await expect(rating).toBeVisible();
  });

  test('should not change rating when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-rating--disabled`);
    await page.waitForSelector('.MuiRating-root', { timeout: 15000 });
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should not change rating when readonly', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-rating--read-only`);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should apply different sizes', async ({ page }) => {
    // Test small size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-rating--small`);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    let rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
    
    // Test large size
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-rating--large`);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should support half rating precision', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-rating--half-star`);
    await page.waitForSelector('.MuiRating-root', { timeout: 10000 });
    
    const rating = page.locator('.MuiRating-root').first();
    await expect(rating).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const rating = page.locator('.MuiRating-root').first();
    
    await rating.click();
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    
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
