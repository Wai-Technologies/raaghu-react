import { test, expect, Page } from '@playwright/test';

/**
 * RdsAccordion Component E2E Tests
 * 
 * Tests the accordion component in a real browser environment
 * Prerequisites: Ensure Storybook or dev server is running
 */

// Update this URL based on your setup
const STORYBOOK_URL = 'http://localhost:6006';
const ACCORDION_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&viewMode=story`;

/**
 * Helper function to navigate to a story and wait for it to be ready
 */
async function navigateToStory(page: Page, storyUrl: string, selector: string = '.rds-accordion') {
  await page.goto(storyUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector(selector, { timeout: 15000, state: 'visible' });
}

test.describe('RdsAccordion Component', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToStory(page, ACCORDION_STORY_URL);
  });

  test('should render accordion with title', async ({ page }) => {
    // Check if accordion title is visible
    const accordionTitle = page.locator('.rds-accordion__title').first();
    await expect(accordionTitle).toBeVisible({ timeout: 10000 });
  });

  test('should expand accordion on click', async ({ page }) => {
    // Find the first accordion
    const accordion = page.locator('.MuiAccordion-root').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Click to expand
    await accordionSummary.click();
    
    // Verify expanded state
    await expect(accordion).toHaveClass(/Mui-expanded/);
    
    // Check if content is visible
    const accordionContent = accordion.locator('.rds-accordion__details');
    await expect(accordionContent).toBeVisible();
  });

  test('should collapse accordion when clicking again', async ({ page }) => {
    const accordion = page.locator('.MuiAccordion-root').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Expand accordion
    await accordionSummary.click();
    await expect(accordion).toHaveClass(/Mui-expanded/);
    
    // Collapse accordion
    await accordionSummary.click();
    
    // Verify collapsed state
    await expect(accordion).not.toHaveClass(/Mui-expanded/);
  });

  test('should show expand/collapse icon', async ({ page }) => {
    const accordion = page.locator('.MuiAccordion-root').first();
    const expandIcon = accordion.locator('.MuiSvgIcon-root').first();
    
    await expect(expandIcon).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const accordionSummary = page.locator('.rds-accordion__summary').first();
    
    // Focus on accordion
    await accordionSummary.focus();
    
    // Verify focus
    await expect(accordionSummary).toBeFocused();
    
    // Press Enter to expand
    await page.keyboard.press('Enter');
    
    // Verify expansion
    const accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/Mui-expanded/);
  });

  test('should display left icon when ShowLeftIcon is true', async ({ page }) => {
    // Navigate to a story with left icon enabled
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=ShowLeftIcon:true;changeleftIcon:Add`);
    
    const leftIcon = page.locator('.rds-accordion__icon').first();
    await expect(leftIcon).toBeVisible();
  });

  test('should hide left icon when ShowLeftIcon is false', async ({ page }) => {
    // Navigate to a story with left icon disabled
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=ShowLeftIcon:false;changeleftIcon:Add`);
    
    const leftIcon = page.locator('.rds-accordion__icon').first();
    await expect(leftIcon).toHaveCount(0);
  });

  test('should apply correct size classes', async ({ page }) => {
    // Test small size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=size:small`);
    
    let accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--small/);
    
    // Test medium size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=size:medium`);
    
    accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--medium/);
    
    // Test large size
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=size:large`);
    
    accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--large/);
  });

  test('should apply correct style variants', async ({ page }) => {
    // Test border style
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=accordionStyle:border`);
    
    let accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--border/);
    
    // Test bottomline style
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=accordionStyle:bottomline`);
    
    accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--bottomline/);
    
    // Test borderhide style
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=accordionStyle:borderhide`);
    
    accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toHaveClass(/rds-accordion--borderhide/);
  });

  test('should not expand when disabled', async ({ page }) => {
    // Navigate to disabled accordion
    await navigateToStory(page, `${STORYBOOK_URL}/iframe.html?id=elements-accordion--default&args=disabled:true`);
    
    const accordion = page.locator('.MuiAccordion-root').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Verify disabled state
    await expect(accordion).toHaveClass(/Mui-disabled/);
    
    // Try to click (should not expand)
    await accordionSummary.click({ force: true });
    
    // Verify it remains collapsed
    await expect(accordion).not.toHaveClass(/Mui-expanded/);
  });

  test('should handle multiple accordions independently', async ({ page }) => {
    const firstAccordion = page.locator('.rds-accordion').nth(0);
    const secondAccordion = page.locator('.rds-accordion').nth(1);
    const thirdAccordion = page.locator('.rds-accordion').nth(2);
    
    // Expand first accordion
    await firstAccordion.locator('.rds-accordion__summary').click();
    
    // Verify only first is expanded
    await expect(firstAccordion).toHaveClass(/Mui-expanded/);
    await expect(secondAccordion).not.toHaveClass(/Mui-expanded/);
    await expect(thirdAccordion).not.toHaveClass(/Mui-expanded/);
    
    // Expand second accordion
    await secondAccordion.locator('.rds-accordion__summary').click();
    
    // Verify both first and second are expanded
    await expect(firstAccordion).toHaveClass(/Mui-expanded/);
    await expect(secondAccordion).toHaveClass(/Mui-expanded/);
    await expect(thirdAccordion).not.toHaveClass(/Mui-expanded/);
  });

  test('should render custom content inside accordion', async ({ page }) => {
    const accordion = page.locator('.rds-accordion').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Expand to reveal content
    await accordionSummary.click();
    
    // Check for content
    const content = accordion.locator('.rds-accordion__details-panel');
    await expect(content).toBeVisible();
    await expect(content).toContainText('Replace with your content component');
  });

  test('should have proper ARIA attributes for accessibility', async ({ page }) => {
    const accordion = page.locator('.MuiAccordion-root').first();
    const accordionButton = accordion.locator('.rds-accordion__summary');
    
    // Check ARIA attributes
    await expect(accordionButton).toHaveAttribute('aria-expanded');
    
    // Check initial state
    let ariaExpanded = await accordionButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    
    // Expand and check again
    await accordionButton.click();
    
    ariaExpanded = await accordionButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');
  });

  test('should apply hover state styling', async ({ page }) => {
    const accordion = page.locator('.rds-accordion').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Hover over accordion
    await accordionSummary.hover();
    
    // Check if hover effects are applied (you can verify specific styles if needed)
    await expect(accordionSummary).toBeVisible();
  });

  test('should handle rapid expand/collapse clicks', async ({ page }) => {
    const accordion = page.locator('.rds-accordion').first();
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Rapidly click multiple times
    await accordionSummary.click();
    await accordionSummary.click();
    await accordionSummary.click();
    
    // Component should still be functional
    await expect(accordion).toBeVisible();
  });
});

test.describe('RdsAccordion Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToStory(page, ACCORDION_STORY_URL);
    
    // Wait for accordion to be visible with longer timeout for Firefox
    const accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toBeVisible({ timeout: 15000 });
    
    // Test expand functionality on mobile
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    await accordionSummary.click();
    
    await expect(accordion).toHaveClass(/Mui-expanded/, { timeout: 10000 });
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateToStory(page, ACCORDION_STORY_URL);
    
    const accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await navigateToStory(page, ACCORDION_STORY_URL);
    
    // Wait for accordion to be visible with longer timeout for Firefox
    const accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toBeVisible({ timeout: 15000 });
  });
});

test.describe('RdsAccordion Visual Regression', () => {
  test('should match screenshot in collapsed state', async ({ page }) => {
    await navigateToStory(page, ACCORDION_STORY_URL);
    
    const accordion = page.locator('.rds-accordion').first();
    
    // Take screenshot
    await expect(accordion).toHaveScreenshot('accordion-collapsed.png');
  });

  test('should match screenshot in expanded state', async ({ page }) => {
    await navigateToStory(page, ACCORDION_STORY_URL);
    
    const accordion = page.locator('.rds-accordion').first();
    await expect(accordion).toBeVisible({ timeout: 15000 });
    
    const accordionSummary = accordion.locator('.rds-accordion__summary');
    
    // Expand accordion
    await accordionSummary.click();
    
    // Verify expanded state before taking screenshot
    await expect(accordion).toHaveClass(/Mui-expanded/, { timeout: 10000 });
    
    // Take screenshot with higher tolerance for Firefox rendering differences
    await expect(accordion).toHaveScreenshot('accordion-expanded.png', { 
      maxDiffPixelRatio: 0.1,
      timeout: 15000
    });
  });
});
