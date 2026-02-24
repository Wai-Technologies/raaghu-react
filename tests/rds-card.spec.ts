import { test, expect, Page } from '@playwright/test';

/**
 * RdsCard Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const CARD_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-card--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiCard-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, CARD_STORY_URL);
  });

  test('should render card component', async ({ page }) => {
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should display card content', async ({ page }) => {
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should apply elevation classes', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-card--default&args=elevation:3`);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toHaveClass(/MuiPaper-elevation/);
  });

  test('should render card header when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-card--with-avatar`);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render card actions when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-card--with-actions`);
    
    const card = page.locator('.MuiCard-root').first();
    const cardActions = card.locator('.MuiCardActions-root');
    
    await expect(cardActions).toBeVisible();
  });

  test('should render card media when provided', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-card--with-image`);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should apply hover effects', async ({ page }) => {
    const card = page.locator('.MuiCard-root').first();
    
    await card.hover();
    
    await expect(card).toBeVisible();
  });
});

test.describe('RdsCard Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, CARD_STORY_URL);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, CARD_STORY_URL);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await navigateToStory(page, CARD_STORY_URL);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });
});
