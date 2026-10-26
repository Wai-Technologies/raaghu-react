import type { Emoji } from 'emojibase';

export const EmojiGeneratorType = {
  Default: 'Default',
  QuickReactions: 'Quick Reactions',
} as const;
export type EmojiGeneratorType = (typeof EmojiGeneratorType)[keyof typeof EmojiGeneratorType];

export enum EmojiCategory {
  SmileysAndPeople = "SmileysAndPeople",
  AnimalsAndNature = "AnimalsAndNature",
  FoodAndDrink = "FoodAndDrink",
  TravelAndPlaces = "TravelAndPlaces",
  Activities = "Activities",
  Objects = "Objects",
  Symbols = "Symbols",
  Flags = "Flags",
}

const categoryGroupMap: Record<EmojiCategory, number[]> = {
  [EmojiCategory.SmileysAndPeople]: [0, 1],
  [EmojiCategory.AnimalsAndNature]: [3],
  [EmojiCategory.FoodAndDrink]: [4],
  [EmojiCategory.TravelAndPlaces]: [5],
  [EmojiCategory.Activities]: [6],
  [EmojiCategory.Objects]: [7],
  [EmojiCategory.Symbols]: [8],
  [EmojiCategory.Flags]: [9],
};

let allEmojis: Emoji[] = [];
const emojiCache: Partial<Record<string, string[]>> = {};
const emojiByCharMap = new Map<string, Emoji>();
let loadPromise: Promise<void> | null = null;

const indexEmojis = (data: Emoji[]) => {
  allEmojis = data.filter(
    (e) => !!e.emoji && !(e.version && parseFloat(e.version.toString()) >= 12.0) && e.emoji.length <= 7,
  );
  emojiByCharMap.clear();
  for (const key of Object.keys(emojiCache)) {
    delete emojiCache[key];
  }
  for (const emoji of allEmojis) {
    if (!emojiByCharMap.has(emoji.emoji)) {
      emojiByCharMap.set(emoji.emoji, emoji);
    }
    const stripped = emoji.emoji.replace(/\uFE0F/g, '').replace(/\uFE0E/g, '');
    if (stripped !== emoji.emoji && !emojiByCharMap.has(stripped)) {
      emojiByCharMap.set(stripped, emoji);
    }
  }
};

/** Lazy-loads the 735 KB emojibase dataset (G5-028). Safe to call repeatedly. */
export const ensureEmojiData = (): Promise<void> => {
  if (allEmojis.length > 0) return Promise.resolve();
  if (!loadPromise) {
    loadPromise = import('emojibase-data/en/data.json').then((mod) => {
      indexEmojis(mod.default as unknown as Emoji[]);
    });
  }
  return loadPromise;
};

export const isEmojiDataReady = (): boolean => allEmojis.length > 0;

/** Returns the human readable label of an emoji character (undefined when unknown). */
export const getEmojiLabel = (emoji: string): string | undefined => emojiByCharMap.get(emoji)?.label;

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const skinToneModifiers = [
  '',
  '\u{1F3FB}',
  '\u{1F3FC}',
  '\u{1F3FD}',
  '\u{1F3FE}',
  '\u{1F3FF}',
];

const lookupEmoji = (emoji: string): Emoji | undefined =>
  emojiByCharMap.get(emoji) ?? emojiByCharMap.get(emoji.replace(/\uFE0F/g, '').replace(/\uFE0E/g, ''));

export const applySkinTone = (emoji: string, skinTone: number): string => {
  if (skinTone === 0 || !skinToneModifiers[skinTone]) {
    return emoji;
  }

  const skin = lookupEmoji(emoji)?.skins?.find(s => s.tone === skinTone);
  if (skin) {
    return skin.emoji;
  }

  return emoji;
};

export const getEmojisByCategory = (category: EmojiCategory, skinTone: number = 0): string[] => {
  if (allEmojis.length === 0) return [];
  const cacheKey = `${category}_${skinTone}`;

  if (!emojiCache[cacheKey]) {
    const groups = new Set(categoryGroupMap[category] || []);
    const baseEmojis = allEmojis.reduce<string[]>((acc, emoji) => {
      if (groups.has(emoji.group as number)) {
        acc.push(applySkinTone(emoji.emoji, skinTone));
      }
      return acc;
    }, []).filter(Boolean);

    emojiCache[cacheKey] = baseEmojis;
  }
  return emojiCache[cacheKey] as string[];
};

export const searchEmojis = (searchTerm: string, category?: EmojiCategory, skinTone: number = 0): string[] => {
  if (allEmojis.length === 0) return [];
  const term = searchTerm.trim().toLowerCase();
  if (!term) return [];
  const pool = category ? new Set(getEmojisByCategory(category, skinTone)) : null;
  const termPattern = new RegExp(escapeRegExp(term));
  const matches: string[] = [];
  for (const emoji of allEmojis) {
    const renderedEmoji = applySkinTone(emoji.emoji, skinTone);
    if (pool && !pool.has(renderedEmoji)) {
      continue;
    }
    const label = (emoji.label || '').toLowerCase();
    const tags = (emoji.tags || []).join(' ').toLowerCase();
    if (termPattern.test(label) || termPattern.test(tags) || emoji.emoji === searchTerm) {
      matches.push(renderedEmoji);
      if (matches.length >= 200) {
        break;
      }
    }
  }
  return matches;
};
