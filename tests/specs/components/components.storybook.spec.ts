import { expect, test } from '@playwright/test';
import {
  filterStoriesByTitlePrefix,
  findStoryId,
  loadStorybookStories,
  openStory,
  withStoryLimit,
  type StoryEntry,
} from '../../helpers/storybook';
import { trackRuntimeErrors } from '../../helpers/runtime-errors';

let allStories: StoryEntry[] = [];
let componentStories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  allStories = await loadStorybookStories(request);
  componentStories = withStoryLimit(filterStoriesByTitlePrefix(allStories, 'Components/'));
});

test('renders all component stories without runtime errors', async ({ page }) => {
  expect(componentStories.length).toBeGreaterThan(0);

  for (const story of componentStories) {
    const runtime = trackRuntimeErrors(page);
    await test.step(`render ${story.title} / ${story.name}`, async () => {
      await openStory(page, story.id, 'light');
      await expect(page.locator('#storybook-root, #root')).toBeVisible();
    });
    runtime.assertNoErrors(`Component story runtime errors: ${story.title} / ${story.name}`);
    runtime.dispose();
  }
});

test('component state stories for loading/disabled/error render in both themes', async ({ page }) => {
  const stateStories = withStoryLimit(
    componentStories.filter((story) => /(loading|disabled|error)/i.test(story.name)),
  );

  for (const story of stateStories) {
    const runtime = trackRuntimeErrors(page);
    await openStory(page, story.id, 'light');
    await expect(page.locator('#storybook-root, #root')).toBeVisible();

    await openStory(page, story.id, 'dark');
    await expect(page.locator('#storybook-root, #root')).toBeVisible();

    runtime.assertNoErrors(`Component state story runtime errors: ${story.title} / ${story.name}`);
    runtime.dispose();
  }
});

test('empty state supports keyboard/action flow, responsive layout, and theme tokens', async ({ page }) => {
  const emptyStateId = findStoryId(allStories, 'Components/Empty State', 'Standard');
  const runtime = trackRuntimeErrors(page);

  await openStory(page, emptyStateId, 'light');
  await expect(page.getByRole('heading', { name: /No Data Available/i })).toBeVisible();

  const actionButton = page.getByRole('button', { name: /Add New Data/i });
  await expect(actionButton).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(actionButton).toBeFocused();
  await page.keyboard.press('Enter');

  const lightThemeToken = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--rds-color-on-surface').trim(),
  );

  await openStory(page, emptyStateId, 'dark');
  await expect(page.getByRole('heading', { name: /No Data Available/i })).toBeVisible();

  const darkThemeToken = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--rds-color-on-surface').trim(),
  );

  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await openStory(page, emptyStateId, width < 768 ? 'dark' : 'light');
    await expect(page.getByRole('button', { name: /Add New Data/i })).toBeVisible();
  }

  expect(lightThemeToken).not.toEqual('');
  expect(darkThemeToken).not.toEqual('');

  runtime.assertNoErrors('Empty state interactions produced runtime errors');
  runtime.dispose();
});
