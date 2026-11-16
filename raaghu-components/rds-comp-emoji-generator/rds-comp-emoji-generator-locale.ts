/** Overridable UI strings of `RdsCompEmojiGenerator`. */
export interface RdsCompEmojiGeneratorLocaleText {
    /** Placeholder of the search field. */
    searchPlaceholder: string;
    /** Prompt shown above the quick reactions. */
    moodPrompt: string;
    /** Accessible label of the "more emojis" button. */
    moreEmojisLabel: string;
    /** Accessible label of a skin tone button; receives the tone name. */
    skinToneLabel: (toneName: string) => string;
    /** Names of the six skin tones, in order from default to dark. */
    skinToneNames: string[];
    /** Titles of the eight category tabs, in tab order. */
    categoryTitles: string[];
    /** Fallback title when the current category is unknown. */
    emojisTitle: string;
    /** Title shown while a search term is entered. */
    searchResults: string;
}

export const DEFAULT_RDS_COMP_EMOJI_GENERATOR_LOCALE_TEXT: RdsCompEmojiGeneratorLocaleText = {
    searchPlaceholder: 'Search',
    moodPrompt: "What's your mood?",
    moreEmojisLabel: 'More emojis',
    skinToneLabel: (toneName) => `Skin tone: ${toneName}`,
    skinToneNames: ['Default', 'Light', 'Medium Light', 'Medium', 'Medium Dark', 'Dark'],
    categoryTitles: ['Smileys & People', 'Animals & Nature', 'Food & Drink', 'Travel & Places', 'Activities', 'Objects', 'Symbols', 'Flags'],
    emojisTitle: 'Emojis',
    searchResults: 'Search Results',
};
