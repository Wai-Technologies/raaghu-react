import { emojiSkinToneColors } from '../../raaghu-react-themes/tokens/design-tokens';
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import clsx from 'clsx';
import {
    Box,
    TextField,
    InputAdornment,
    Chip,
    Typography,
    Popover,
    IconButton,
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

const SKIN_TONE_OPTIONS = [
    { value: 0, color: emojiSkinToneColors.default, label: "Default" },
    { value: 1, color: emojiSkinToneColors.light, label: "Light" },
    { value: 2, color: emojiSkinToneColors.mediumLight, label: "Medium Light" },
    { value: 3, color: emojiSkinToneColors.medium, label: "Medium" },
    { value: 4, color: emojiSkinToneColors.mediumDark, label: "Medium Dark" },
    { value: 5, color: emojiSkinToneColors.dark, label: "Dark" },
];

const CATEGORY_TABS = [
    { id: EmojiCategory.SmileysAndPeople, icon: EmojiEmotionsIcon, title: "Smileys & People" },
    { id: EmojiCategory.AnimalsAndNature, icon: PetsIcon, title: "Animals & Nature" },
    { id: EmojiCategory.FoodAndDrink, icon: RestaurantIcon, title: "Food & Drink" },
    { id: EmojiCategory.TravelAndPlaces, icon: FlightIcon, title: "Travel & Places" },
    { id: EmojiCategory.Activities, icon: SportsFootballIcon, title: "Activities" },
    { id: EmojiCategory.Objects, icon: LightbulbIcon, title: "Objects" },
    { id: EmojiCategory.Symbols, icon: FavoriteIcon, title: "Symbols" },
    { id: EmojiCategory.Flags, icon: FlagIcon, title: "Flags" },
];

const QUICK_EMOJIS = ["👍", "😊", "😞", "💯", "😎"];

interface SkinTonePickerProps {
    skinToneOptions: typeof SKIN_TONE_OPTIONS;
    selectedSkinTone: number;
    onSelect: (tone: number) => void;
    buttonSize?: "small" | "medium";
}

const SkinTonePicker = ({
    skinToneOptions,
    selectedSkinTone,
    onSelect,
    buttonSize,
}: SkinTonePickerProps) => (
    <>
        {skinToneOptions.map((o) => (
            <IconButton
                aria-label="Select emoji"
                key={o.value}
                onClick={() => onSelect(o.value)}
                className="rds-emoji-generator__skin-tone-option"
                style={{
                    backgroundColor: o.color,
                    border: selectedSkinTone === o.value ? '2px solid var(--rds-primary-main)' : '1px solid var(--rds-border-default)',
                    boxShadow: selectedSkinTone === o.value ? '0 0 0 1px var(--rds-primary-light)' : 'none'
                }}
                title={o.label}
                size={buttonSize}
            />
        ))}
    </>
);

SkinTonePicker.displayName = 'SkinTonePicker';

export interface RdsEmojiGeneratorProps {
    Type?: EmojiGeneratorType;
    "Show Skin Tone"?: boolean;
    "Show Footer"?: boolean;
    State?: SkinToneState;
    Category?: EmojiCategory;
    onEmojiSelect?: (emoji: string) => void;
    maxEmojis?: number;
    sx?: Record<string, unknown>;
}


const RdsCompEmojiGenerator = ({
    Type = EmojiGeneratorType.Default,
    "Show Skin Tone": showSkinTone = true,
    "Show Footer": showFooter = true,
    State = SkinToneState.Default,
    Category = EmojiCategory.SmileysAndPeople,
    onEmojiSelect,
    maxEmojis = 80,

    ...props
}) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(Category);
    useEffect(() => {
        setSelectedCategory(Category);
    }, [Category]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkinTone, setSelectedSkinTone] = useState(0); 
    const [skinToneAnchorEl, setSkinToneAnchorEl] = useState<HTMLElement | null>(null);

    const handleEmojiClick = (e: string) => onEmojiSelect?.(e);
    const handleCategoryChange = (c: EmojiCategory) => setSelectedCategory(c);
    const handleSkinToneClick = (e: MouseEvent<HTMLElement>) => setSkinToneAnchorEl(e.currentTarget);
    const handleSkinToneClose = () => setSkinToneAnchorEl(null);
    const handleSkinToneSelect = (t: number) => { setSelectedSkinTone(t); handleSkinToneClose(); };
    const skinTonePopoverOpen = Boolean(skinToneAnchorEl);

    if (Type === EmojiGeneratorType.QuickReactions) {
        return (
            <Box className="rds-emoji-generator rds-emoji-generator--quick" {...props}>
                {QUICK_EMOJIS.map((e, i) => (
                    <Box
                        key={i}
                        className="rds-emoji-generator__emoji rds-emoji-generator__emoji--quick"
                        onClick={() => handleEmojiClick(e)}
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

    const filteredEmojis = useMemo(
        () => (
            searchTerm
                ? searchEmojis(searchTerm, selectedCategory, selectedSkinTone)
                : getEmojisByCategory(selectedCategory, selectedSkinTone)
        ),
        [searchTerm, selectedCategory, selectedSkinTone]
    );
    const displayEmojis = useMemo(
        () => (maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis),
        [filteredEmojis, maxEmojis]
    );

    const isFlagEmoji = (emoji: string) => {
        return /[\u{1F1E6}-\u{1F1FF}]{2}/u.test(emoji);
    };

    const twemojiUrl = (emoji: string) => {
        const codepoints = Array.from(emoji).map(c => c.codePointAt(0)!.toString(16)).join('-');
        return `https://twemoji.maxcdn.com/v/latest/72x72/${codepoints}.png`;
    };

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
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                  aria-label="Select emoji"
                                    className="rds-emoji-generator__skin-tone-button"
                                    onClick={handleSkinToneClick}
                                    style={{ backgroundColor: SKIN_TONE_OPTIONS[selectedSkinTone].color }}
                                />

                                {State === SkinToneState.Expanded && (
                                    <Box className="rds-emoji-generator__skin-tone-inline">
                                        <SkinTonePicker
                                            skinToneOptions={SKIN_TONE_OPTIONS}
                                            selectedSkinTone={selectedSkinTone}
                                            onSelect={handleSkinToneSelect}
                                            buttonSize="small"
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                    {State !== SkinToneState.Expanded && (
                        <Popover
                            open={skinTonePopoverOpen}
                            anchorEl={skinToneAnchorEl}
                            onClose={handleSkinToneClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            slotProps={{ paper: { className: 'rds-emoji-generator__skin-tone-popover' } }}
                            disableAutoFocus
                            disableEnforceFocus
                            container={() => rootRef.current?.closest('.rds-comp-toolbar__dropdown') || rootRef.current || document.body}
                        >
                            <Box className="rds-emoji-generator__skin-tone-dropdown">
                                <SkinTonePicker
                                    skinToneOptions={SKIN_TONE_OPTIONS}
                                    selectedSkinTone={selectedSkinTone}
                                    onSelect={handleSkinToneSelect}
                                />
                            </Box>
                        </Popover>
                    )}
                </Box>
            )}

            <Box className="rds-emoji-generator__categories">
                <Box className="rds-emoji-generator__categories-container">
                    {CATEGORY_TABS.map(t => {
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
                                className={clsx(
                                  "rds-emoji-generator__category-chip",
                                  selectedCategory === t.id && "rds-emoji-generator__category-chip--selected"
                                )}
                            />
                        );
                    })}
                </Box>
            </Box>

            <Box className="rds-emoji-generator__grid">
                <Box className="rds-emoji-generator__category-title">
                    <Typography variant="h6" className="rds-emoji-generator__category-title-text">
                        {CATEGORY_TABS.find(t => t.id === selectedCategory)?.title || "Emojis"}
                    </Typography>
                </Box>
                <Box className="rds-emoji-generator__grid-container" tabIndex={0}>
                    {displayEmojis.map((e, i) => (
                        <Box
                            key={i}
                            className="rds-emoji-generator__emoji"
                            onClick={() => handleEmojiClick(e)}
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
                    <Typography className="rds-emoji-generator__footer-text" variant="body2">
                        What's your mood?
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
RdsCompEmojiGenerator.displayName = 'RdsCompEmojiGenerator';
export default RdsCompEmojiGenerator;
export { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-data';
