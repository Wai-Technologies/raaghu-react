import { expect, test } from '@playwright/test';
import {
  filterStoriesByTitlePrefix,
  loadStorybookStories,
  openStory,
  type StoryEntry,
} from '../../helpers/storybook';

/**
 * Branch-Compare Visual Regression Suite
 *
 * Captures a full-page screenshot of every Default story (light + dark) and
 * compares it against the stored snapshot baseline.
 *
 * FIRST RUN  → generates the baseline snapshots (stored under tests/snapshots/)
 * SUBSEQUENT → diffs against the baseline and fails on pixel deviation > threshold
 *
 * Usage:
 *   npm run test:e2e -- tests/specs/visual/branch-compare.spec.ts
 *
 * Update snapshots after intentional visual changes:
 *   npm run test:e2e -- --update-snapshots tests/specs/visual/branch-compare.spec.ts
 *
 * Environment variables:
 *   STORYBOOK_URL   — point at a running Storybook (default: http://127.0.0.1:6006)
 *   VR_THRESHOLD    — max pixel diff ratio (default: 0.01 = 1%)
 *   VR_STORY_FILTER — substring to filter story titles (default: all stories)
 */

const DIFF_THRESHOLD = Number(process.env.VR_THRESHOLD ?? 0.01);
const STORY_FILTER   = process.env.VR_STORY_FILTER ?? '';
const THEMES         = ['light', 'dark'] as const;

// Stories whose visual output is inherently dynamic (charts, maps, animations)
// are compared with a relaxed threshold.
const RELAXED_TITLES = [
  'Components/Charts',
  'Components/Map',
  'Components/Audio Player',
  'Components/Video Player',
  'Components/Emoji Generator',
  'Components/Contribution',
];

function isRelaxed(title: string): boolean {
  return RELAXED_TITLES.some((prefix) => title.startsWith(prefix));
}

// Only snapshot Default stories to keep baseline count manageable
function isDefaultStory(story: StoryEntry): boolean {
  return story.name === 'Default';
}

let allStories: StoryEntry[] = [];

test.beforeAll(async ({ request }) => {
  allStories = await loadStorybookStories(request);
});

for (const theme of THEMES) {
  test.describe(`Visual regression — ${theme} theme`, () => {
    test(`all Default stories match snapshot [${theme}]`, async ({ page }) => {
      const targets = allStories
        .filter(isDefaultStory)
        .filter((s) => !STORY_FILTER || s.title.includes(STORY_FILTER));

      expect(targets.length).toBeGreaterThan(0);

      for (const story of targets) {
        await test.step(`${story.title} / ${story.name} [${theme}]`, async () => {
          await openStory(page, story.id, theme);

          // Let animations settle
          await page.waitForTimeout(300);

          const root = page.locator('#storybook-root, #root');
          await expect(root).toBeVisible();

          const threshold = isRelaxed(story.title) ? 0.05 : DIFF_THRESHOLD;

          await expect(root).toHaveScreenshot(
            `${story.id}--${theme}.png`,
            {
              maxDiffPixelRatio: threshold,
              animations: 'disabled',
            },
          );
        });
      }
    });
  });
}

// Focused smoke test — a small curated set of high-value components
// that should always be visually verified, even on fast CI runs.
test.describe('Visual smoke test — key components', () => {
  const KEY_STORIES: Array<{ title: string; name: string }> = [
    { title: 'Elements/Button',   name: 'Default' },
    { title: 'Elements/Input',    name: 'Default' },
    { title: 'Elements/Badge',    name: 'Default' },
    { title: 'Elements/Card',     name: 'Default' },
    { title: 'Elements/Modal',    name: 'Default' },
    { title: 'Elements/Alert',    name: 'Default' },
    { title: 'Elements/Checkbox', name: 'Default' },
    { title: 'Elements/Switch',   name: 'Default' },
  ];

  for (const theme of THEMES) {
    test(`key components match snapshot [${theme}]`, async ({ page }) => {
      for (const { title, name } of KEY_STORIES) {
        const story = allStories.find(
          (s) => s.title === title && s.name === name,
        );
        if (!story) {
          test.skip(true, `Story not found: ${title} / ${name}`);
          return;
        }

        await test.step(`${title} [${theme}]`, async () => {
          await openStory(page, story.id, theme);
          await page.waitForTimeout(200);

          const root = page.locator('#storybook-root, #root');
          await expect(root).toBeVisible();
          await expect(root).toHaveScreenshot(
            `smoke--${story.id}--${theme}.png`,
            {
              maxDiffPixelRatio: DIFF_THRESHOLD,
              animations: 'disabled',
            },
          );
        });
      }
    });
  }
});
