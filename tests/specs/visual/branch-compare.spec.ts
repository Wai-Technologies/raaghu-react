import { expect, test } from '@playwright/test';
import {
  createStoryIframeUrl,
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
      // Override: 100+ stories × ~1.5s each → need ~5 min per theme
      test.setTimeout(300_000);

      const targets = allStories
        .filter(isDefaultStory)
        .filter((s) => !STORY_FILTER || s.title.includes(STORY_FILTER));

      expect(targets.length).toBeGreaterThan(0);

      for (const story of targets) {
        await test.step(`${story.title} / ${story.name} [${theme}]`, async () => {
          // Navigate directly — don't use openStory() which throws if the root
          // is hidden (full-page stories like AppBar set overflow/display on root)
          await page.goto(createStoryIframeUrl(story.id, theme), { waitUntil: 'domcontentloaded' });
          await expect(page.locator('body')).toBeVisible();

          // Bail if Storybook couldn't find the story
          const notFound = page.getByText(/story not found/i);
          if (await notFound.count() > 0) {
            return; // skip silently — story exists in index but not renderable
          }

          // Let decorators / animations settle
          await page.waitForTimeout(400);

          const threshold = isRelaxed(story.title) ? 0.05 : DIFF_THRESHOLD;

          // Screenshot the full viewport — captures both inline and full-screen stories
          await expect(page).toHaveScreenshot(
            `${story.id}--${theme}.png`,
            {
              maxDiffPixelRatio: threshold,
              animations: 'disabled',
              fullPage: false,
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
    // ── Primary state of each key element ───────────────────────────
    { title: 'Elements/Button',   name: 'Default' },
    { title: 'Elements/Input',    name: 'Default' },
    { title: 'Elements/Badge',    name: 'Default' },
    { title: 'Elements/Card',     name: 'Default' },
    { title: 'Elements/Modal',    name: 'Default' },
    { title: 'Elements/Alert',    name: 'Default' },
    { title: 'Elements/Checkbox', name: 'Default' },
    { title: 'Elements/Switch',   name: 'Default' },

    // ── Alert state variants (colour-coded — easy to regress) ────────
    { title: 'Elements/Alert',    name: 'Error' },
    { title: 'Elements/Alert',    name: 'Success' },
    { title: 'Elements/Alert',    name: 'Warning' },
    { title: 'Elements/Alert',    name: 'Filled' },

    // ── Button variants ──────────────────────────────────────────────
    { title: 'Elements/Button',   name: 'Disabled' },
    { title: 'Elements/Button',   name: 'Outlined' },
    { title: 'Elements/Button',   name: 'Primary' },

    // ── Input states ─────────────────────────────────────────────────
    { title: 'Elements/Input',    name: 'Disabled' },
    { title: 'Elements/Input',    name: 'With Error' },

    // ── Badge variants ───────────────────────────────────────────────
    { title: 'Elements/Badge',    name: 'Dot' },
    { title: 'Elements/Badge',    name: 'With Icon' },

    // ── Checkbox states ──────────────────────────────────────────────
    { title: 'Elements/Checkbox', name: 'Checked' },
    { title: 'Elements/Checkbox', name: 'Indeterminate' },
    { title: 'Elements/Checkbox', name: 'Disabled' },

    // ── Switch states ────────────────────────────────────────────────
    { title: 'Elements/Switch',   name: 'Checked' },
    { title: 'Elements/Switch',   name: 'Disabled' },

    // ── Card variants ────────────────────────────────────────────────
    { title: 'Elements/Card',     name: 'Elevated' },
    { title: 'Elements/Card',     name: 'With Image' },

    // ── Chip variants ────────────────────────────────────────────────
    { title: 'Elements/Chip',     name: 'Default' },
    { title: 'Elements/Chip',     name: 'Outlined' },
    { title: 'Elements/Chip',     name: 'Disabled' },

    // ── Accordion states ─────────────────────────────────────────────
    { title: 'Elements/Accordion', name: 'Expanded' },
    { title: 'Elements/Accordion', name: 'Disabled' },

    // ── Avatar variants ──────────────────────────────────────────────
    { title: 'Elements/Avatar',   name: 'With Image' },
    { title: 'Elements/Avatar',   name: 'With Initials' },
    { title: 'Elements/Avatar',   name: 'Stacking' },
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
