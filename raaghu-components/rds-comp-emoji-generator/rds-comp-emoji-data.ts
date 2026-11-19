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
  .filter(e => !!e.emoji)
  .filter(e => {
    if (e.version && Number.parseFloat(e.version.toString()) >= 12.0) {
      return false;
    }
    if (e.emoji.length > 7) {
      return false;
    }
    return true;
  });

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

const skinToneModifiers = [
  '',
  '\u{1F3FB}',
  '\u{1F3FC}',
  '\u{1F3FD}',
  '\u{1F3FE}',
  '\u{1F3FF}',
];

const emojiByChar = new Map<string, Emoji>();
const stripVariation = (emoji: string): string => emoji.replace(/️/g, '').replace(/︎/g, '');
for (const e of allEmojis) {
  if (!emojiByChar.has(e.emoji)) emojiByChar.set(e.emoji, e);
  const stripped = stripVariation(e.emoji);
  if (!emojiByChar.has(stripped)) emojiByChar.set(stripped, e);
}

const matchesTone = (tone: number | number[] | undefined, skinTone: number): boolean =>
  Array.isArray(tone) ? tone.length > 0 && tone.every(t => t === skinTone) : tone === skinTone;

export const applySkinTone = (emoji: string, skinTone: number): string => {
  if (skinTone === 0 || !skinToneModifiers[skinTone]) {
    return emoji;
  }

  const skin = (emojiByChar.get(emoji) ?? emojiByChar.get(stripVariation(emoji)))?.skins?.find(s => matchesTone(s.tone, skinTone));
  return skin ? skin.emoji : emoji;
};

export const getEmojisByCategory = (category: EmojiCategory, skinTone: number = 0): string[] => {
  const cacheKey = `${category}_${skinTone}` as keyof typeof emojiCache;
  
  if (!emojiCache[cacheKey]) {
    const groups = categoryGroupMap[category] || [];
    const baseEmojis = allEmojis
      .filter(e => groups.includes(e.group as number))
      .map(e => applySkinTone(e.emoji, skinTone))
      .filter(Boolean);
    
    emojiCache[cacheKey] = baseEmojis;
  }
  return emojiCache[cacheKey] as string[];
};

export const searchEmojis = (searchTerm: string, category?: EmojiCategory, skinTone: number = 0): string[] => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return [];
  const pool = category ? getEmojisByCategory(category, skinTone) : allEmojis.map(e => applySkinTone(e.emoji, skinTone));
  return allEmojis
    .filter(e => (category ? pool.includes(applySkinTone(e.emoji, skinTone)) : true))
    .filter(e => {
      const label = (e.label || '').toLowerCase();
      const tags = (e.tags || []).join(' ').toLowerCase();
      return label.includes(term) || tags.includes(term) || e.emoji === searchTerm;
    })
    .map(e => applySkinTone(e.emoji, skinTone))
    .slice(0, 200);
};

export const getQuickReactionEmojis = (): string[] => {
  const quickReactionNames = [
    'grinning face',
    'smiling face with heart-eyes', 
    'star-struck',
    'pouting face',
    'thumbs up'
  ];
  
  const quickEmojis = quickReactionNames
    .map(name => allEmojis.find(e => (e.label || '').toLowerCase().includes(name)))
    .filter(Boolean)
    .map(e => e!.emoji);
  
  if (quickEmojis.length < 5) {
    return getEmojisByCategory(EmojiCategory.SmileysAndPeople).slice(0, 5);
  }
  
  return quickEmojis;
};
