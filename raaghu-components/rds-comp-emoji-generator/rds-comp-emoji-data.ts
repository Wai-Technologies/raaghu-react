import type { Emoji } from 'emojibase';
import data from 'emojibase-data/en/data.json';



// Shared types/enums for RdsEmojiGenerator to avoid circular import issues

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


// Build maps once (data.json format: array of Emoji objects with group/subgroup info)
// Filter out newer Unicode emojis that don't render well across all systems
const allEmojis: Emoji[] = (data as unknown as Emoji[])
  .filter(e => !!e.emoji)
  .filter(e => {
    // Filter out emojis with Unicode version 12.0 or higher to avoid rendering issues
    if (e.version && parseFloat(e.version.toString()) >= 12.0) {
      return false;
    }
    // Filter out complex multi-codepoint emojis that might not render properly
    if (e.emoji.length > 7) {
      return false;
    }
    // Filter out regional indicator symbols (flag components) that appear as blank squares
    const codePoint = e.emoji.codePointAt(0);
    if (codePoint && codePoint >= 0x1F1E6 && codePoint <= 0x1F1FF) {
      return false;
    }
    return true;
  });

// Map our local categories to emojibase groups (corrected alignment)
const categoryGroupMap: Record<EmojiCategory, number[]> = {
  [EmojiCategory.SmileysAndPeople]: [0, 1],       // Smileys & People + People & Body  
  [EmojiCategory.AnimalsAndNature]: [3],          // Animals & Nature
  [EmojiCategory.FoodAndDrink]: [4],              // Food & Drink
  [EmojiCategory.TravelAndPlaces]: [5],           // Travel & Places
  [EmojiCategory.Activities]: [6],                // Activities
  [EmojiCategory.Objects]: [7],                   // Objects
  [EmojiCategory.Symbols]: [8],                   // Symbols
  [EmojiCategory.Flags]: [9],                     // Flags
};

const emojiCache: Partial<Record<EmojiCategory, string[]>> = {};

// Skin tone modifiers (Unicode combining characters)
const skinToneModifiers = [
  '', // Default (no modifier)
  '\u{1F3FB}', // Light skin tone
  '\u{1F3FC}', // Medium-light skin tone
  '\u{1F3FD}', // Medium skin tone
  '\u{1F3FE}', // Medium-dark skin tone
  '\u{1F3FF}', // Dark skin tone
];

// Apply skin tone to emoji if it supports skin tone modification
export const applySkinTone = (emoji: string, skinTone: number): string => {
  if (skinTone === 0 || !skinToneModifiers[skinTone]) {
    return emoji; // Return original emoji for default or invalid skin tone
  }
  
  // Check if emoji supports skin tone (has skin tone modifier support)
  const emojiData = allEmojis.find(e => e.emoji === emoji);
  if (emojiData && emojiData.skins && emojiData.skins.length > skinTone) {
    return emojiData.skins[skinTone].emoji;
  }
  
  return emoji; // Return original if no skin tone support
};

export const getEmojisByCategory = (category: EmojiCategory, skinTone: number = 0): string[] => {
  const cacheKey = `${category}_${skinTone}` as keyof typeof emojiCache;
  
  if (!emojiCache[cacheKey]) {
    const groups = categoryGroupMap[category] || [];
    const baseEmojis = allEmojis
      .filter(e => groups.includes(e.group as number))
      .map(e => applySkinTone(e.emoji, skinTone))
      .filter(Boolean); // Remove any undefined/null values
    
    emojiCache[cacheKey] = baseEmojis;
  }
  return emojiCache[cacheKey] as string[];
};

export const searchEmojis = (searchTerm: string, category?: EmojiCategory, skinTone: number = 0): string[] => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return [];
  const pool = category ? getEmojisByCategory(category, skinTone) : allEmojis.map(e => applySkinTone(e.emoji, skinTone));
  // Basic substring match against annotation / tags if available
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

// Get quick reaction emojis from emojibase package
export const getQuickReactionEmojis = (): string[] => {
  // Find specific emojis for quick reactions from the package
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
  
  // Fallback to first 5 smileys if not found
  if (quickEmojis.length < 5) {
    return getEmojisByCategory(EmojiCategory.SmileysAndPeople).slice(0, 5);
  }
  
  return quickEmojis;
};
