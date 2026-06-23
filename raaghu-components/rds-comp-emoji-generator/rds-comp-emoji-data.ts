import type { Emoji } from 'emojibase';
import data from 'emojibase-data/en/data.json';

export enum EmojiGeneratorType {
  Default = "Default",
  QuickReactions = "Quick Reactions",
}

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

export enum SkinToneState {
  Default = "Default",
  Expanded = "Expanded",
}

const allEmojis: Emoji[] = (data as unknown as Emoji[])
  .filter(e => !!e.emoji && !(e.version && parseFloat(e.version.toString()) >= 12.0) && e.emoji.length <= 7);

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

const emojiCache: Partial<Record<EmojiCategory, string[]>> = {};

const emojiByLabelMap = new Map<string, Emoji>();
for (const emoji of allEmojis) {
  const label = (emoji.label || '').toLowerCase();
  if (label && !emojiByLabelMap.has(label)) {
    emojiByLabelMap.set(label, emoji);
  }
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const skinToneModifiers = [
  '',
  '\u{1F3FB}',
  '\u{1F3FC}',
  '\u{1F3FD}',
  '\u{1F3FE}',
  '\u{1F3FF}',
];

export const applySkinTone = (emoji: string, skinTone: number): string => {
  if (skinTone === 0 || !skinToneModifiers[skinTone]) {
    return emoji;
  }
  
  const emojiData = allEmojis.find(e => e.emoji === emoji);
  if (emojiData && emojiData.skins && emojiData.skins.length > skinTone) {
    return emojiData.skins[skinTone].emoji;
  }
  
  return emoji;
};

export const getEmojisByCategory = (category: EmojiCategory, skinTone: number = 0): string[] => {
  const cacheKey = `${category}_${skinTone}` as keyof typeof emojiCache;
  
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

export const getQuickReactionEmojis = (): string[] => {
  const quickReactionNames = [
    'grinning face',
    'smiling face with heart-eyes', 
    'star-struck',
    'pouting face',
    'thumbs up'
  ];

  const quickEmojis: string[] = [];
  for (const name of quickReactionNames) {
    const match = emojiByLabelMap.get(name);
    if (match) {
      quickEmojis.push(match.emoji);
    }
  }

  if (quickEmojis.length < 5) {
    return getEmojisByCategory(EmojiCategory.SmileysAndPeople).slice(0, 5);
  }
  
  return quickEmojis;
};
