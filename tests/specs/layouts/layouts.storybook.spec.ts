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
let layoutStories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  allStories = await loadStorybookStories(request);
  layoutStories = withStoryLimit(filterStoriesByTitlePrefix(allStories, 'Layouts'));
});

test('renders all layout stories without runtime errors', async ({ page }) => {
  expect(layoutStories.length).toBeGreaterThan(0);

  for (const story of layoutStories) {
    const runtime = trackRuntimeErrors(page);
    await test.step(`render ${story.title} / ${story.name}`, async () => {
      await openStory(page, story.id, 'light');
      await expect(page.locator('#storybook-root, #root')).toBeVisible();
    });
    runtime.assertNoErrors(`Layout story runtime errors: ${story.title} / ${story.name}`);
    runtime.dispose();
  }
});

test('layout variants render across breakpoints and themes', async ({ page }) => {
  const dashboardId = findStoryId(allStories, 'Layouts', 'Dashboard');
  const matrixId = findStoryId(allStories, 'Layouts', 'Matrix');
  const relaxedId = findStoryId(allStories, 'Layouts', 'Relaxed');

  const stories = [dashboardId, matrixId, relaxedId];

  for (const width of [375, 768, 1280]) {
    for (const storyId of stories) {
      const runtime = trackRuntimeErrors(page);
      await page.setViewportSize({ width, height: 900 });
      await openStory(page, storyId, width <= 768 ? 'dark' : 'light');
      await expect(page.locator('#storybook-root, #root')).toBeVisible();

      const primaryToken = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--rds-primary-main').trim(),
      );
      expect(primaryToken).not.toEqual('');

      runtime.assertNoErrors(`Layout responsive runtime errors for story id: ${storyId}`);
      runtime.dispose();
    }
  }
});
