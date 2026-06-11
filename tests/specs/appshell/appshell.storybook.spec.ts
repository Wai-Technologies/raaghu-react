import { expect, test } from '@playwright/test';
import { findStoryId, loadStorybookStories, openStory, type StoryEntry } from '../../helpers/storybook';
import { trackRuntimeErrors } from '../../helpers/runtime-errors';

let allStories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  allStories = await loadStorybookStories(request);
});

test('app shell variants render in light and dark themes', async ({ page }) => {
  const variantNames = ['DoubleNav', 'Relaxing', 'SideNav', 'Standard', 'TopNav', 'TriPane'];

  for (const name of variantNames) {
    const storyId = findStoryId(allStories, 'Application Shells', name);
    const runtime = trackRuntimeErrors(page);

    await openStory(page, storyId, 'light');
    await expect(page.getByText(/Add Layout/i).first()).toBeVisible();

    await openStory(page, storyId, 'dark');
    await expect(page.getByText(/Add Layout/i).first()).toBeVisible();

    runtime.assertNoErrors(`App shell runtime errors: ${name}`);
    runtime.dispose();
  }
});

test('double nav and tri-pane support mobile toolbar interactions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const name of ['DoubleNav', 'TriPane']) {
    const storyId = findStoryId(allStories, 'Application Shells', name);
    const runtime = trackRuntimeErrors(page);

    await openStory(page, storyId, 'light');

    const toolbarToggle = page.getByRole('button', { name: /toggle toolbar/i });
    await expect(toolbarToggle).toBeVisible();
    await toolbarToggle.click();

    await expect(page.getByText(/Agent Information|Toolbar/i).first()).toBeVisible();

    const backdrop = page.locator('.doublenav-toolbar-backdrop, .tripane-toolbar-backdrop');
    if ((await backdrop.count()) > 0) {
      await backdrop.first().click();
    }

    runtime.assertNoErrors(`App shell mobile interaction runtime errors: ${name}`);
    runtime.dispose();
  }
});

test('top nav supports keyboard navigation and accessible navigation roles', async ({ page }) => {
  const storyId = findStoryId(allStories, 'Application Shells', 'TopNav');
  const runtime = trackRuntimeErrors(page);

  await openStory(page, storyId, 'light');

  await expect(page.getByRole('navigation')).toBeVisible();
  const homeTab = page.getByRole('button', { name: /Dashboard/i });
  await expect(homeTab).toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await homeTab.click();
  await expect(homeTab).toBeVisible();

  const primaryToken = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--rds-primary-main').trim(),
  );
  expect(primaryToken).not.toEqual('');

  runtime.assertNoErrors('TopNav keyboard and accessibility runtime errors');
  runtime.dispose();
});
