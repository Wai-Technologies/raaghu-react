import { test, expect, type Page } from '@playwright/test';

/**
 * RdsMenu Component E2E Tests
 */

const STORYBOOK_URL = 'http://localhost:6006';
const MENU_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=elements-menu--default&viewMode=story`;

const openMenu = async ({ page }: { page: Page }) => {
  const trigger = page.getByRole('button', { name: 'User' });
  await expect(trigger).toBeVisible();
  await trigger.click();
  await page.waitForTimeout(400);
  const menu = page.locator('[role="menu"]').first();
  await expect(menu).toBeVisible();
  return { trigger, menu };
};

test.describe('RdsMenu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(MENU_STORY_URL);
    await page.waitForTimeout(1000);
  });

  test('should open menu on trigger click', async ({ page }) => {
    const { menu } = await openMenu({ page });
    await expect(menu).toBeVisible();
  });

  test('should display menu items', async ({ page }) => {
    await openMenu({ page });
    const menuItem = page.getByRole('menuitem').first();
    await expect(menuItem).toBeVisible();
  });

  test('should select menu item on click', async ({ page }) => {
    const { menu } = await openMenu({ page });
    const menuItem = page.getByRole('menuitem').first();
    await menuItem.click();
    await page.waitForTimeout(300);

    await expect(menu).toBeHidden();
  });

  test('should close menu on outside click', async ({ page }) => {
    const { menu } = await openMenu({ page });
    await page.click('body', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);

    await expect(menu).toBeHidden();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await openMenu({ page });
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeHidden();
  });

  test('should close menu on Escape key', async ({ page }) => {
    const { menu } = await openMenu({ page });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await expect(menu).toBeHidden();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const { menu } = await openMenu({ page });
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('role', 'menu');
  });
});

test.describe('RdsMenu Responsive Behavior', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(MENU_STORY_URL);
    await page.waitForTimeout(1000);

    const { menu } = await openMenu({ page });
    await expect(menu).toBeVisible();
  });
});
