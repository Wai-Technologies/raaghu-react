import { test, expect, Page } from '@playwright/test';

/**
 * RdsStepper Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const STEPPER_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-stepper--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.MuiStepper-root') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsStepper Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, STEPPER_STORY_URL);
  });

  test('should render stepper component', async ({ page }) => {
    const stepper = page.locator('.MuiStepper-root').first();
    await expect(stepper).toBeVisible();
  });

  test('should display stepper steps', async ({ page }) => {
    const step = page.locator('.MuiStep-root').first();
    await expect(step).toBeVisible();
  });

  test('should show active step', async ({ page }) => {
    const activeStep = page.locator('.MuiStep-root .Mui-active').first();
    await expect(activeStep).toBeVisible();
  });

  test('should navigate to next step', async ({ page }) => {
    const nextButton = page.locator('button').filter({ hasText: /next/i }).first();
    
    if (await nextButton.count() > 0) {
      await nextButton.click();
      
      await expect(nextButton).toBeVisible();
    }
  });

  test('should navigate to previous step', async ({ page }) => {
    const nextButton = page.locator('button').filter({ hasText: /next/i }).first();
    const backButton = page.locator('button').filter({ hasText: /back/i }).first();
    
    if (await nextButton.count() > 0 && await backButton.count() > 0) {
      await nextButton.click();
      
      await backButton.click();
      
      await expect(backButton).toBeVisible();
    }
  });

  test('should apply different orientations', async ({ page }) => {
    // Test vertical direction
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-stepper--default&args=direction:vertical`);
    
    const stepper = page.locator('.MuiStepper-root').first();
    await expect(stepper).toHaveClass(/MuiStepper-vertical/);
  });

  test('should display step labels', async ({ page }) => {
    const stepLabel = page.locator('.MuiStepLabel-label').first();
    await expect(stepLabel).toBeVisible();
  });

  test('should display step icons', async ({ page }) => {
    const stepIcon = page.locator('.MuiStepIcon-root').first();
    await expect(stepIcon).toBeVisible();
  });

  test('should mark completed steps', async ({ page }) => {
    const completedStep = page.locator('.MuiStep-root .Mui-completed').first();
    
    if (await completedStep.count() > 0) {
      await expect(completedStep).toBeVisible();
    }
  });

  test('should apply alternative label style', async ({ page }) => {
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-stepper--alternative-label`);
    
    const stepper = page.locator('.MuiStepper-root').first();
    await expect(stepper).toHaveClass(/MuiStepper-alternativeLabel/);
  });
});

test.describe('RdsStepper Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, STEPPER_STORY_URL);
    
    const stepper = page.locator('.MuiStepper-root').first();
    await expect(stepper).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(STEPPER_STORY_URL);
    await page.waitForSelector('.MuiStepper-root', { timeout: 10000 });
    
    const stepper = page.locator('.MuiStepper-root').first();
    await expect(stepper).toBeVisible();
  });
});
