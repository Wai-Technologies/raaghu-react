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
let elementStories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  allStories = await loadStorybookStories(request);
  elementStories = withStoryLimit(filterStoriesByTitlePrefix(allStories, 'Elements/'));
});

test('renders all element stories without runtime errors', async ({ page }) => {
  expect(elementStories.length).toBeGreaterThan(0);

  for (const story of elementStories) {
    const runtime = trackRuntimeErrors(page);
    await test.step(`render ${story.title} / ${story.name}`, async () => {
      await openStory(page, story.id, 'light');
      await expect(page.locator('#storybook-root, #root')).toBeVisible();
    });
    runtime.assertNoErrors(`Element story runtime errors: ${story.title} / ${story.name}`);
    runtime.dispose();
  }
});

test('button variants support keyboard, disabled/loading states, and tokenized theme changes', async ({ page }) => {
  const defaultId = findStoryId(allStories, 'Elements/Button', 'Default');
  const disabledId = findStoryId(allStories, 'Elements/Button', 'Disabled');
  const loadingId = findStoryId(allStories, 'Elements/Button', 'Loading');
  const primaryId = findStoryId(allStories, 'Elements/Button', 'Primary');

  const runtime = trackRuntimeErrors(page);

  await openStory(page, defaultId, 'light');
  const defaultButton = page.getByRole('button', { name: /Default Button/i });
  await expect(defaultButton).toBeVisible();
  await expect(defaultButton).toBeEnabled();

  await page.keyboard.press('Tab');
  await expect(defaultButton).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');

  await defaultButton.hover();
  await expect(defaultButton).toBeVisible();

  await openStory(page, disabledId, 'light');
  await expect(page.getByRole('button', { name: /Disabled Button/i })).toBeDisabled();

  await openStory(page, loadingId, 'light');
  await expect(page.getByRole('button', { name: /Loading Button/i })).toBeDisabled();
  await expect(page.getByRole('progressbar')).toBeVisible();

  await openStory(page, primaryId, 'light');
  const lightTheme = await page.evaluate(() => ({
    primaryVar: getComputedStyle(document.documentElement).getPropertyValue('--rds-primary-main').trim(),
    buttonBackground: getComputedStyle(document.querySelector('button') as HTMLButtonElement).backgroundColor,
  }));

  await openStory(page, primaryId, 'dark');
  const darkTheme = await page.evaluate(() => ({
    primaryVar: getComputedStyle(document.documentElement).getPropertyValue('--rds-primary-main').trim(),
    buttonBackground: getComputedStyle(document.querySelector('button') as HTMLButtonElement).backgroundColor,
  }));

  expect(lightTheme.primaryVar).not.toEqual('');
  expect(darkTheme.primaryVar).not.toEqual('');
  expect(lightTheme.buttonBackground).not.toEqual('rgba(0, 0, 0, 0)');
  expect(darkTheme.buttonBackground).not.toEqual('rgba(0, 0, 0, 0)');
  expect(lightTheme.primaryVar).not.toEqual(darkTheme.primaryVar);

  runtime.assertNoErrors('Element button interactions produced runtime errors');
  runtime.dispose();
});

test('text field supports accessibility, interaction states, and responsive rendering', async ({ page }) => {
  const defaultId = findStoryId(allStories, 'Elements/Text Field', 'Default');
  const requiredId = findStoryId(allStories, 'Elements/Text Field', 'Required');
  const errorId = findStoryId(allStories, 'Elements/Text Field', 'WithError');
  const disabledId = findStoryId(allStories, 'Elements/Text Field', 'Disabled');
  const multilineId = findStoryId(allStories, 'Elements/Text Field', 'Multiline');

  const runtime = trackRuntimeErrors(page);

  await openStory(page, defaultId, 'light');
  const defaultTextbox = page.getByRole('textbox', { name: /Default TextField/i });
  await expect(defaultTextbox).toBeVisible();
  await defaultTextbox.click();
  await defaultTextbox.fill('Playwright coverage');
  await expect(defaultTextbox).toHaveValue('Playwright coverage');

  await openStory(page, requiredId, 'dark');
  const requiredTextbox = page.getByRole('textbox', { name: /Required Field/i });
  await expect(requiredTextbox).toBeRequired();

  await openStory(page, errorId, 'light');
  await expect(page.getByText(/valid email address/i)).toBeVisible();

  await openStory(page, disabledId, 'light');
  await expect(page.getByRole('textbox', { name: /Disabled Field/i })).toBeDisabled();

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await openStory(page, multilineId, width < 768 ? 'dark' : 'light');
    await expect(page.getByRole('textbox', { name: /Multiline TextField/i })).toBeVisible();
  }

  runtime.assertNoErrors('Element text field story interactions produced runtime errors');
  runtime.dispose();
});
