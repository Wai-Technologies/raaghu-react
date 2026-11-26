import { emojiSkinToneColors } from '../../raaghu-react-themes/tokens/design-tokens';
import React, { useState } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    InputBase,
    Chip,
    Typography,
    IconButton,
    ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PetsIcon from "@mui/icons-material/Pets";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";

import "./rds-comp-emoji-generator.scss";
import { getEmojisByCategory, searchEmojis } from './rds-comp-emoji-data';
import { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-data';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

export interface RdsCompEmojiGeneratorProps {
    Type?: EmojiGeneratorType;
    "Show Skin Tone"?: boolean;
    "Show Footer"?: boolean;
    /** Keeps the skin tone palette permanently open below the skin tone button. */
    expanded?: boolean;
    /** @deprecated Use `expanded` instead. */
    State?: SkinToneState;
    Category?: EmojiCategory;
    onEmojiSelect?: (emoji: string) => void;
    onMoodChange?: (mood: string) => void;
    maxEmojis?: number;
    sx?: Record<string, unknown>;
}

const RdsCompEmojiGenerator: React.FC<RdsCompEmojiGeneratorProps> = ({
    Type = EmojiGeneratorType.Default,
    "Show Skin Tone": showSkinTone = true,
    "Show Footer": showFooter = true,
    expanded: expandedProp,
    State,
    Category = EmojiCategory.SmileysAndPeople,
    onEmojiSelect,
    onMoodChange,
    maxEmojis = 80,

    ...props
}) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(Category);
    React.useEffect(() => {
        setSelectedCategory(Category);
    }, [Category]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [mood, setMood] = useState("");
    const [selectedSkinTone, setSelectedSkinTone] = useState(0); 
    const [skinToneOpen, setSkinToneOpen] = useState(false);

    if (State !== undefined) {
        warnDeprecatedProp('RdsCompEmojiGenerator', 'State', '`expanded`');
    }
    const isExpanded = expandedProp ?? State === SkinToneState.Expanded;

    const skinToneOptions = [
        { value: 0, color: emojiSkinToneColors.default, label: "Default" },
        { value: 1, color: emojiSkinToneColors.light, label: "Light" },
        { value: 2, color: emojiSkinToneColors.mediumLight, label: "Medium Light" },
        { value: 3, color: emojiSkinToneColors.medium, label: "Medium" },
        { value: 4, color: emojiSkinToneColors.mediumDark, label: "Medium Dark" },
        { value: 5, color: emojiSkinToneColors.dark, label: "Dark" },
    ];

    const categoryTabs = [
        { id: EmojiCategory.SmileysAndPeople, icon: EmojiEmotionsIcon, title: "Smileys & People" },
        { id: EmojiCategory.AnimalsAndNature, icon: PetsIcon, title: "Animals & Nature" },
        { id: EmojiCategory.FoodAndDrink, icon: RestaurantIcon, title: "Food & Drink" },
        { id: EmojiCategory.TravelAndPlaces, icon: FlightIcon, title: "Travel & Places" },
        { id: EmojiCategory.Activities, icon: SportsFootballIcon, title: "Activities" },
        { id: EmojiCategory.Objects, icon: LightbulbIcon, title: "Objects" },
        { id: EmojiCategory.Symbols, icon: FavoriteIcon, title: "Symbols" },
        { id: EmojiCategory.Flags, icon: FlagIcon, title: "Flags" },
    ];

    const handleEmojiClick = (e: string) => onEmojiSelect?.(e);
    const handleCategoryChange = (c: EmojiCategory) => setSelectedCategory(c);
    const handleSkinToneClick = () => setSkinToneOpen((open) => !open);
    const handleSkinToneClose = () => setSkinToneOpen(false);
    const handleSkinToneSelect = (t: number) => { setSelectedSkinTone(t); handleSkinToneClose(); };
    const showSkinTonePalette = isExpanded || skinToneOpen;

    if (Type === EmojiGeneratorType.QuickReactions) {
        const quickEmojis = ["👍", "😊", "😞", "💯", "😎"];
        return (
            <Box className="rds-emoji-generator rds-emoji-generator--quick" {...props}>
                {quickEmojis.map((e) => (
                    <Box
                        key={e}
                        className="rds-emoji-generator__emoji rds-emoji-generator__emoji--quick"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleEmojiClick(e)}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleEmojiClick(e); } }}
                    >
                        {e}
                    </Box>
                ))}
                <IconButton
                  aria-label="Filter"
                    className="rds-emoji-generator__plus"
                    onClick={() => onEmojiSelect?.('+')}
                    size="small"
                >
                    <AddIcon />
                </IconButton>
            </Box>
        );
    }

    const filteredEmojis = mood.trim()
        ? searchEmojis(mood, undefined, selectedSkinTone)
        : searchTerm
            ? searchEmojis(searchTerm, selectedCategory, selectedSkinTone)
            : getEmojisByCategory(selectedCategory, selectedSkinTone);
    const displayEmojis = maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis;

    return (
    <Box ref={rootRef} className="rds-emoji-generator" {...props}>
            {Type === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__search">
                    <Box className="rds-emoji-generator__search-container">
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {showSkinTone && (
                            <ClickAwayListener onClickAway={handleSkinToneClose}>
                                <Box className="rds-emoji-generator__skin-tone">
                                    <IconButton
                                        aria-label="Select skin tone"
                                        aria-expanded={showSkinTonePalette}
                                        className="rds-emoji-generator__skin-tone-button"
                                        onClick={handleSkinToneClick}
                                        style={{ backgroundColor: skinToneOptions[selectedSkinTone].color }}
                                    />
                                    {showSkinTonePalette && (
                                        <Box
                                            className={`rds-emoji-generator__skin-tone-inline${isExpanded ? ' rds-emoji-generator__skin-tone-inline--expanded' : ''}`}
                                            role="listbox"
                                            aria-label="Skin tones"
                                        >
                                            {skinToneOptions.map(o => (
                                                <IconButton
                                                    aria-label={o.label}
                                                    aria-selected={selectedSkinTone === o.value}
                                                    role="option"
                                                    key={o.value}
                                                    onClick={() => handleSkinToneSelect(o.value)}
                                                    className={`rds-emoji-generator__skin-tone-option${selectedSkinTone === o.value ? ' rds-emoji-generator__skin-tone-option--selected' : ''}`}
                                                    style={{ backgroundColor: o.color }}
                                                    title={o.label}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </ClickAwayListener>
                        )}
                    </Box>
                </Box>
            )}

            <Box className="rds-emoji-generator__categories">
                <Box className="rds-emoji-generator__categories-container">
                    {categoryTabs.map(t => {
                        const I = t.icon;
                        return (
                            <Chip
                                key={t.id}
                                icon={<I />}
                                size="small"
                                variant={selectedCategory === t.id ? 'filled' : 'outlined'}
                                color={selectedCategory === t.id ? 'primary' : 'default'}
                                onClick={() => handleCategoryChange(t.id)}
                                title={t.title}
                                className={`rds-emoji-generator__category-chip ${selectedCategory === t.id ? 'rds-emoji-generator__category-chip--selected' : ''}`}
                            />
                        );
                    })}
                </Box>
            </Box>

            <Box className="rds-emoji-generator__grid">
                <Box className="rds-emoji-generator__category-title">
                    <Typography variant="h6" className="rds-emoji-generator__category-title-text">
                        {mood.trim() ? "Search Results" : categoryTabs.find(t => t.id === selectedCategory)?.title || "Emojis"}
                    </Typography>
                </Box>
                <Box className="rds-emoji-generator__grid-container">
                    {displayEmojis.map((e) => (
                        <Box
                            key={e}
                            className="rds-emoji-generator__emoji"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleEmojiClick(e)}
                            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleEmojiClick(e); } }}
                        >
                            {isFlagEmoji(e) ? (
                                <img
                                    src={twemojiUrl(e)}
                                    alt={e}
                                    className="rds-emoji-generator__emoji-image"
                                    draggable={false}
                                />
                            ) : (
                                e
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>

            {showFooter && Type === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__footer">
                    <Typography className="rds-emoji-generator__footer-emoji">🙂</Typography>
                    <InputBase
                        className="rds-emoji-generator__footer-input"
                        placeholder="What's your mood?"
                        value={mood}
                        onChange={(e) => {
                            setMood(e.target.value);
                            onMoodChange?.(e.target.value);
                        }}
                        fullWidth
                        slotProps={{ input: { 'aria-label': "What's your mood?" } }}
                    />
                </Box>
            )}
        </Box>
    );
};
RdsCompEmojiGenerator.displayName = 'RdsCompEmojiGenerator';
export default RdsCompEmojiGenerator;
export { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-data';

function normalizeEmojiForTwemoji(emoji: string): string {
    return emoji.replace(/\uFE0F/g, '').replace(/\uFE0E/g, '');
}

function isFlagEmoji(emoji: string): boolean {
    const normalized = normalizeEmojiForTwemoji(emoji);
    return /[\u{1F1E6}-\u{1F1FF}]{2}/u.test(normalized)
        || /\u{1F3F4}/u.test(normalized)
        || /\uE006/u.test(normalized);
}

// Pinned: the twemoji repo is archived, so `@latest` is not a stable reference.
const TWEMOJI_BASE_URL = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.3/assets/72x72';

function twemojiUrl(emoji: string): string {
    // Twemoji file names keep U+FE0F inside ZWJ sequences (e.g. pirate / rainbow flag)
    // and drop it everywhere else.
    const forFileName = emoji.includes('‍') ? emoji.replace(/︎/g, '') : normalizeEmojiForTwemoji(emoji);
    const codepoints = Array.from(forFileName).map(c => c.codePointAt(0)!.toString(16)).join('-');
    return `${TWEMOJI_BASE_URL}/${codepoints}.png`;
}
