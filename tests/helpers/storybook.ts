import { expect, type APIRequestContext, type Page } from '@playwright/test';

export interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: string;
  tags: string[];
}

export type ThemeMode = 'light' | 'dark';

const STORY_INDEX_PATHS = ['/index.json', '/stories.json'];

export async function loadStorybookStories(request: APIRequestContext): Promise<StoryEntry[]> {
  for (const path of STORY_INDEX_PATHS) {
    const response = await request.get(path);
    if (!response.ok()) {
      continue;
    }

    const json = (await response.json()) as {
      entries?: Record<string, Partial<StoryEntry>>;
      stories?: Record<string, Partial<StoryEntry>>;
    };

    const records = json.entries ?? json.stories;
    if (!records) {
      continue;
    }

    const stories = Object.values(records)
      .filter((entry): entry is Partial<StoryEntry> => Boolean(entry?.id && entry?.title && entry?.name))
      .map((entry) => ({
        id: entry.id as string,
        title: entry.title as string,
        name: entry.name as string,
        type: entry.type ?? 'story',
        tags: Array.isArray(entry.tags) ? entry.tags : [],
      }))
      .filter((entry) => entry.type === 'story');

    if (stories.length > 0) {
      return stories;
    }
  }

  throw new Error('Unable to load Storybook index from /index.json or /stories.json');
}

export function filterStoriesByTitlePrefix(stories: StoryEntry[], titlePrefix: string): StoryEntry[] {
  return stories.filter((story) => story.title.startsWith(titlePrefix));
}

export function findStoryId(stories: StoryEntry[], title: string, name: string): string {
  const story = stories.find(
    (entry) => entry.title.toLowerCase() === title.toLowerCase() && entry.name.toLowerCase() === name.toLowerCase(),
  );

  if (!story) {
    throw new Error(`Missing story: ${title} / ${name}`);
  }

  return story.id;
}

export function withStoryLimit(stories: StoryEntry[]): StoryEntry[] {
  const configuredLimit = process.env.PW_STORY_LIMIT;
  if (!configuredLimit) {
    return stories;
  }

  const parsedLimit = Number.parseInt(configuredLimit, 10);
  if (Number.isNaN(parsedLimit) || parsedLimit <= 0) {
    return stories;
  }

  return stories.slice(0, parsedLimit);
}

export function createStoryIframeUrl(storyId: string, theme: ThemeMode = 'light'): string {
  return `/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&globals=theme:${theme}`;
}

export async function openStory(page: Page, storyId: string, theme: ThemeMode = 'light'): Promise<void> {
  await page.goto(createStoryIframeUrl(storyId, theme), { waitUntil: 'domcontentloaded' });

  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('#storybook-root, #root')).toBeVisible();
  await expect(page.getByText(/story not found/i)).toHaveCount(0);
}
