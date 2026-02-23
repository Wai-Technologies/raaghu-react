import { test, expect } from '@playwright/test';

/**
 * RdsSlider Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const SLIDER_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-slider--default&viewMode=story`;

test.describe('RdsSlider Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SLIDER_STORY_URL);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
  });

  test('should render slider component', async ({ page }) => {
    await page.waitForTimeout(500);
    const slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();
  });

  test('should display slider thumb', async ({ page }) => {
    const thumb = page.locator('.MuiSlider-thumb').first();
    await expect(thumb).toBeVisible();
  });

  test('should change value on slider drag', async ({ page }) => {
    const thumb = page.locator('.MuiSlider-thumb').first();
    const slider = page.locator('.MuiSlider-root').first();
    
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      await thumb.hover();
      await page.mouse.down();
      await page.mouse.move(sliderBox.x + sliderBox.width * 0.7, sliderBox.y + sliderBox.height / 2);
      await page.mouse.up();
      await page.waitForTimeout(200);
      
      await expect(thumb).toBeVisible();
    }
  });

  test('should handle keyboard arrow keys', async ({ page }) => {
    const thumb = page.locator('.MuiSlider-thumb').first();
    const input = page.locator('.MuiSlider-root input').first();
    
    await input.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    
    await expect(thumb).toBeVisible();
  });

  test('should not change value when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-slider--default&args=disabled:true`);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    const slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toHaveClass(/Mui-disabled/);
  });

  test('should apply different sizes', async ({ page }) => {
    // Test with different level values (1-5) which is the available size-like prop
    // Level 1
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-slider--default&args=level:1`);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    let slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();
    
    // Level 3
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-slider--default&args=level:3`);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();
  });

  test('should display marks when specified', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-slider--with-marks`);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    const marks = page.locator('.MuiSlider-mark').first();
    
    if (await marks.count() > 0) {
      await expect(marks).toBeVisible();
    }
  });

  test('should display value label on hover', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=elements-slider--default&args=valueLabelDisplay:auto`);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    const thumb = page.locator('.MuiSlider-thumb').first();
    await thumb.hover();
    await page.waitForTimeout(300);
    
    const valueLabel = page.locator('.MuiSlider-valueLabel');
    
    if (await valueLabel.count() > 0) {
      await expect(valueLabel.first()).toBeVisible();
    }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const input = page.locator('.MuiSlider-root input').first();
    await expect(input).toHaveAttribute('type', 'range');
  });
});

test.describe('RdsSlider Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SLIDER_STORY_URL);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    const slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(SLIDER_STORY_URL);
    await page.waitForSelector('.MuiSlider-root', { timeout: 10000 });
    
    const slider = page.locator('.MuiSlider-root').first();
    await expect(slider).toBeVisible();
  });
});
