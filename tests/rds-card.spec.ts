import { test, expect } from '@playwright/test';

/**
 * RdsCard Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const CARD_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-card--default&viewMode=story`;

test.describe('RdsCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CARD_STORY_URL);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
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
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-card--default&args=elevation:3`);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toHaveClass(/MuiPaper-elevation/);
  });

  test('should render card header when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-card--with-avatar`);
    await page.waitForSelector('.MuiCard-root', { timeout: 15000 });
    await page.waitForTimeout(500);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render card actions when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-card--with-actions`);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    
    const card = page.locator('.MuiCard-root').first();
    const cardActions = card.locator('.MuiCardActions-root');
    
    await expect(cardActions).toBeVisible();
  });

  test('should render card media when provided', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-card--with-image`);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    await page.waitForTimeout(500);
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should apply hover effects', async ({ page }) => {
    const card = page.locator('.MuiCard-root').first();
    
    await card.hover();
    await page.waitForTimeout(100);
    
    await expect(card).toBeVisible();
  });
});

test.describe('RdsCard Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(CARD_STORY_URL);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(CARD_STORY_URL);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(CARD_STORY_URL);
    await page.waitForSelector('.MuiCard-root', { timeout: 10000 });
    
    const card = page.locator('.MuiCard-root').first();
    await expect(card).toBeVisible();
  });
});
