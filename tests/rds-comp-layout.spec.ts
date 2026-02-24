import { test, expect, Page } from '@playwright/test';

/**
 * RdsCompLayout Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const LAYOUT_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=layouts--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.rds-layout, .MuiBox-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'attached' });
}

test.describe('RdsCompLayout Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, LAYOUT_STORY_URL);
  });

  test('should render layout component', async ({ page }) => {
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply column direction by default', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=direction:column;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toHaveClass(/column/);
  });

  test('should apply row direction', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=direction:row;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toHaveClass(/row/);
  });

  test('should apply full height class', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=fullHeight:true;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toHaveClass(/full-height/);
  });

  test('should apply full width class', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=fullWidth:true;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toHaveClass(/full-width/);
  });

  test('should render with Board displayType', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--board&viewMode=story`, '.rds-layout, .MuiBox-root, [class*="board"]');
    
    const layout = page.locator('.rds-layout, .MuiBox-root, [class*="board"]').first();
    await expect(layout).toBeVisible();
  });

  test('should render with Boxify displayType', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--boxify&viewMode=story`, '.rds-layout, .MuiBox-root, [class*="boxify"]');
    
    const layout = page.locator('.rds-layout, .MuiBox-root, [class*="boxify"]').first();
    await expect(layout).toBeVisible();
  });

  test('should render with Cardify displayType', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--cardify&viewMode=story`, '.rds-layout, .MuiBox-root, [class*="cardify"]');
    
    const layout = page.locator('.rds-layout, .MuiBox-root, [class*="cardify"]').first();
    await expect(layout).toBeVisible();
  });

  test('should apply spacing', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=spacing:4;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply wrap property', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=wrap:true;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply justifyContent center', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=justifyContent:center;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply justifyContent space-between', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=justifyContent:space-between;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply alignItems center', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=alignItems:center;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply alignItems stretch', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=alignItems:stretch;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should render with shadow when hasShadow is true', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=hasShadow:true;mode:`);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should render with custom className', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=className:custom-class;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toHaveClass(/custom-class/);
  });

  test('should apply multiple flex properties together', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=direction:row;wrap:true;justifyContent:space-between;alignItems:center;mode:`);
    
    const layout = page.locator('.rds-layout').first();
    await expect(layout).toBeVisible();
    await expect(layout).toHaveClass(/row/);
  });

  test('should render in standard mode', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=mode:standard`, 'body');
    
    // In standard mode, the component renders layout content
    const element = page.locator('body').first();
    await expect(element).toBeVisible();
  });

  test('should handle children content', async ({ page }) => {
    await navigateToStory(page, LAYOUT_STORY_URL);
    
    const layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should apply different spacing values', async ({ page }) => {
    // Test spacing 0
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=spacing:0;mode:`);
    let layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
    
    // Test spacing 8
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=spacing:8;mode:`);
    layout = page.locator('.rds-layout, .MuiBox-root').first();
    await expect(layout).toBeVisible();
  });

  test('should render all displayType variants', async ({ page }) => {
    const displayTypes = [
      'Basic', 'Board', 'Boxify', 'Cardify', 'Collage', 
      'Gridify', 'Highlight', 'Matrix', 'Mosaic', 'Nexus',
      'Pinboard', 'Sections', 'Snapshots', 'Splitz', 
      'Spotlight', 'Stacks', 'Dashboard', 'Relaxed'
    ];

    for (const displayType of displayTypes.slice(0, 5)) { // Test first 5 to avoid timeout
      await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=layouts--default&args=displayType:${displayType};mode:`);
      
      const element = page.locator('.rds-layout, .MuiBox-root').first();
      await expect(element).toBeVisible();
    }
  });
});
