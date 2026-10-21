import { emojiSkinToneColors } from '../../raaghu-react-themes/tokens/design-tokens';
import { useMemo, useRef, useState, type KeyboardEvent, type MouseEvent, type Ref } from "react";
import clsx from 'clsx';
import {
    Box,
    TextField,
    InputAdornment,
    Chip,
    Typography,
    Popover,
    IconButton,
    type SxProps,
    type Theme,
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
import { getEmojiLabel, getEmojisByCategory, searchEmojis } from './rds-comp-emoji-data';
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

/** Default CDN folder (pinned) used to load flag images. */
const DEFAULT_FLAG_BASE_URL = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/';

const handleActivationKey = (e: KeyboardEvent<HTMLElement>, activate: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
    }
};

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
                aria-label={`Skin tone: ${o.label}`}
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

export interface RdsCompEmojiGeneratorProps {
    Type?: EmojiGeneratorType;
    "Show Skin Tone"?: boolean;
    "Show Footer"?: boolean;
    State?: SkinToneState;
    Category?: EmojiCategory;
    /** camelCase alias of `Type`; wins when defined. */
    variant?: EmojiGeneratorType;
    /** camelCase alias of `Category`; wins when defined. */
    category?: EmojiCategory;
    /** camelCase alias of `"Show Skin Tone"`; wins when defined. */
    showSkinTone?: boolean;
    /** camelCase alias of `"Show Footer"`; wins when defined. */
    showFooter?: boolean;
    onEmojiSelect?: (emoji: string) => void;
    maxEmojis?: number;
    /** Called when the user picks a category tab. */
    onCategoryChange?: (category: EmojiCategory) => void;
    /** Quick reactions mode: called when the "+" button is clicked. When omitted, `onEmojiSelect('+')` is called. */
    onMoreClick?: () => void;
    /** Emojis shown in quick reactions mode. Defaults to the built-in set. */
    quickReactions?: string[];
    /** Base URL (folder, with 72x72 PNGs named by codepoints) for flag images. Defaults to a pinned Twemoji 14.0.2 CDN URL. */
    flagBaseUrl?: string;
    /** MUI system styles for the root element. */
    sx?: SxProps<Theme>;
    /** Extra class name(s) merged onto the root element. */
    className?: string;
    /** Ref forwarded to the root element. */
    ref?: Ref<HTMLDivElement>;
}

/** @deprecated Use `RdsCompEmojiGeneratorProps` instead. */
export type RdsEmojiGeneratorProps = RdsCompEmojiGeneratorProps;


const RdsCompEmojiGenerator = ({
    Type: typeLegacy = EmojiGeneratorType.Default,
    "Show Skin Tone": showSkinToneLegacy = true,
    "Show Footer": showFooterLegacy = true,
    State = SkinToneState.Default,
    Category: categoryLegacy,
    variant,
    category,
    showSkinTone: showSkinToneAlias,
    showFooter: showFooterAlias,
    onEmojiSelect,
    maxEmojis = 80,
    onCategoryChange,
    onMoreClick,
    quickReactions = QUICK_EMOJIS,
    flagBaseUrl = DEFAULT_FLAG_BASE_URL,
    sx,
    className,
    ref,
    ...props
}: RdsCompEmojiGeneratorProps) => {
    const Type = variant ?? typeLegacy;
    const showSkinTone = showSkinToneAlias ?? showSkinToneLegacy;
    const showFooter = showFooterAlias ?? showFooterLegacy;
    const categoryProp = category ?? categoryLegacy;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const setRootRef = (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    };
    const initialCategory = categoryProp ?? EmojiCategory.SmileysAndPeople;
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [prevCategoryProp, setPrevCategoryProp] = useState(categoryProp);

    if (categoryProp !== prevCategoryProp) {
        setPrevCategoryProp(categoryProp);
        setSelectedCategory(categoryProp ?? EmojiCategory.SmileysAndPeople);
    }

    const currentCategory = selectedCategory;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkinTone, setSelectedSkinTone] = useState(0);
    const [skinToneAnchorEl, setSkinToneAnchorEl] = useState<HTMLElement | null>(null);

    const handleEmojiClick = (e: string) => onEmojiSelect?.(e);

    const handleCategoryChange = (c: EmojiCategory) => {
        setSelectedCategory(c);
        onCategoryChange?.(c);
    };
    const handleSkinToneClick = (e: MouseEvent<HTMLElement>) => setSkinToneAnchorEl(e.currentTarget);
    const handleSkinToneClose = () => setSkinToneAnchorEl(null);
    const handleSkinToneSelect = (t: number) => { setSelectedSkinTone(t); handleSkinToneClose(); };
    const skinTonePopoverOpen = Boolean(skinToneAnchorEl);

    const filteredEmojis = useMemo(
        () => (
            searchTerm
                ? searchEmojis(searchTerm, currentCategory, selectedSkinTone)
                : getEmojisByCategory(currentCategory, selectedSkinTone)
        ),
        [searchTerm, currentCategory, selectedSkinTone]
    );
    const displayEmojis = useMemo(
        () => (maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis),
        [filteredEmojis, maxEmojis]
    );

    if (Type === EmojiGeneratorType.QuickReactions) {
        return (
            <Box ref={setRootRef} className={clsx("rds-emoji-generator rds-emoji-generator--quick", className)} sx={sx} {...props}>
                {quickReactions.map((e) => (
                    <Box
                        key={e}
                        className="rds-emoji-generator__emoji rds-emoji-generator__emoji--quick"
                        role="button"
                        tabIndex={0}
                        aria-label={getEmojiLabel(e) ?? e}
                        onClick={() => handleEmojiClick(e)}
                        onKeyDown={(ev: KeyboardEvent<HTMLElement>) => handleActivationKey(ev, () => handleEmojiClick(e))}
                    >
                        {e}
                    </Box>
                ))}
                <IconButton
                  aria-label="More emojis"
                    className="rds-emoji-generator__plus"
                    onClick={() => (onMoreClick ? onMoreClick() : onEmojiSelect?.('+'))}
                    size="small"
                >
                    <AddIcon />
                </IconButton>
            </Box>
        );
    }

    return (
    <Box ref={setRootRef} className={clsx("rds-emoji-generator", className)} sx={sx} {...props}>
            {Type === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__search">
                    <Box className="rds-emoji-generator__search-container">
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        {showSkinTone && (
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                  aria-label={`Skin tone: ${SKIN_TONE_OPTIONS[selectedSkinTone].label}`}
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
                                                                variant={currentCategory === t.id ? 'filled' : 'outlined'}
                                                                color={currentCategory === t.id ? 'primary' : 'default'}
                                onClick={() => handleCategoryChange(t.id)}
                                title={t.title}
                                className={clsx(
                                  "rds-emoji-generator__category-chip",
                                                                    currentCategory === t.id && "rds-emoji-generator__category-chip--selected"
                                )}
                            />
                        );
                    })}
                </Box>
            </Box>

            <Box className="rds-emoji-generator__grid">
                <Box className="rds-emoji-generator__category-title">
                    <Typography variant="h6" className="rds-emoji-generator__category-title-text">
                        {CATEGORY_TABS.find(t => t.id === currentCategory)?.title || "Emojis"}
                    </Typography>
                </Box>
                <Box className="rds-emoji-generator__grid-container" tabIndex={0}>
                    {displayEmojis.map((e) => (
                        <Box
                            key={`${e}-${currentCategory}`}
                            className="rds-emoji-generator__emoji"
                            role="button"
                            tabIndex={0}
                            aria-label={getEmojiLabel(e) ?? e}
                            onClick={() => handleEmojiClick(e)}
                            onKeyDown={(ev: KeyboardEvent<HTMLElement>) => handleActivationKey(ev, () => handleEmojiClick(e))}
                        >
                            {isFlagEmoji(e) ? (
                                <img
                                    src={twemojiUrl(e, flagBaseUrl)}
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

function normalizeEmojiForTwemoji(emoji: string): string {
    // Remove common variation selectors which Twemoji filenames don't include (U+FE0F, U+FE0E)
    // Keep tag sequences and other codepoints Twemoji expects.
    return emoji.replace(/\uFE0F/g, '').replace(/\uFE0E/g, '');
}

function isFlagEmoji(emoji: string): boolean {
    const normalized = normalizeEmojiForTwemoji(emoji);
    return /[\u{1F1E6}-\u{1F1FF}]{2}/u.test(normalized) || /\u{1F3F4}/u.test(normalized) || /\uE006/u.test(normalized);
}

function twemojiUrl(emoji: string, baseUrl: string): string {
    const normalized = normalizeEmojiForTwemoji(emoji);
    const codepoints = Array.from(normalized).map(c => c.codePointAt(0)!.toString(16)).join('-');
    return `${baseUrl.replace(/\/?$/, '/')}${codepoints}.png`;
}
