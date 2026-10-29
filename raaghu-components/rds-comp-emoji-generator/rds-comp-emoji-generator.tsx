import { emojiSkinToneColors } from '../../raaghu-react-themes/tokens/design-tokens';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent, type Ref, type SyntheticEvent } from "react";
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
import { ensureEmojiData, getEmojiLabel, getEmojisByCategory, isEmojiDataReady, searchEmojis } from './rds-comp-emoji-data';
import { EmojiCategory, EmojiGeneratorType } from './rds-comp-emoji-data';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

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
    size?: "small" | "medium";
    /** @deprecated Use `size`. */
    buttonSize?: "small" | "medium";
}

const SkinTonePicker = ({
    skinToneOptions,
    selectedSkinTone,
    onSelect,
    size,
    buttonSize,
}: SkinTonePickerProps) => (
    <>
        {skinToneOptions.map((o) => {
            const selected = selectedSkinTone === o.value;
            return (
            <IconButton
                aria-label={`Skin tone: ${o.label}`}
                aria-pressed={selected}
                key={o.value}
                onClick={() => onSelect(o.value)}
                className={clsx(
                    'rds-emoji-generator__skin-tone-option',
                    selected && 'rds-emoji-generator__skin-tone-option--selected'
                )}
                style={{ backgroundColor: o.color }}
                title={o.label}
                size={size ?? buttonSize}
            />
            );
        })}
    </>
);

SkinTonePicker.displayName = 'SkinTonePicker';

export interface RdsCompEmojiGeneratorProps {
    /** Type of emoji generator. Defaults to `EmojiGeneratorType.Default`. */
    type?: EmojiGeneratorType;
    /** Shows the skin tone picker. @default true */
    showSkinTone?: boolean;
    /** Shows the footer (default type only). @default true */
    showFooter?: boolean;
    /** Keeps the skin tone picker open inline. */
    skinTonePickerOpen?: boolean;
    /** Alias of `type`; `type` wins when both are passed. */
    variant?: EmojiGeneratorType;
    /** Category of emojis to display. */
    category?: EmojiCategory;
    /** Called with the event and the emoji when one is picked. */
    onChange?: (event: SyntheticEvent, emoji: string) => void;
    /** @deprecated Use `onChange` instead. */
    onEmojiSelect?: (emoji: string) => void;
    /** Maximum number of emojis rendered in the grid. @default 80 */
    maxEmojis?: number;
    /** Called when the user picks a category tab. */
    onCategoryChange?: (category: EmojiCategory) => void;
    /** Quick reactions mode: called when the "+" button is clicked. When omitted, `onEmojiSelect('+')` is called. */
    onMoreClick?: () => void;
    /** Emojis shown in quick reactions mode. Defaults to the built-in set. */
    quickReactions?: string[];
    /** Base URL (folder, with 72x72 PNGs named by codepoints) for flag images. Defaults to a pinned Twemoji 14.0.2 CDN URL. */
    flagBaseUrl?: string;
    /** Overridable UI strings. */
    localeText?: {
        searchPlaceholder?: string;
        moodPrompt?: string;
    };
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
    type: typeProp,
    skinTonePickerOpen,
    variant,
    category,
    showSkinTone = true,
    showFooter = true,
    onChange,
    onEmojiSelect,
    maxEmojis = 80,
    onCategoryChange,
    onMoreClick,
    quickReactions = QUICK_EMOJIS,
    flagBaseUrl = DEFAULT_FLAG_BASE_URL,
    localeText,
    sx,
    className,
    ref,
    ...props
}: RdsCompEmojiGeneratorProps) => {
    if (onEmojiSelect !== undefined) warnDeprecatedProp('RdsCompEmojiGenerator', 'onEmojiSelect', '`onChange`');
    const searchPlaceholder = localeText?.searchPlaceholder ?? 'Search';
    const moodPrompt = localeText?.moodPrompt ?? "What's your mood?";
    const resolvedType = typeProp ?? variant ?? EmojiGeneratorType.Default;
    const skinToneExpanded = skinTonePickerOpen ?? false;
    const categoryProp = category;
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
    const [emojiDataReady, setEmojiDataReady] = useState(() => isEmojiDataReady());

    useEffect(() => {
        let cancelled = false;
        void ensureEmojiData().then(() => {
            if (!cancelled) setEmojiDataReady(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const handleEmojiClick = (e: string, event: SyntheticEvent) => {
        onEmojiSelect?.(e);
        onChange?.(event, e);
    };

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
            !emojiDataReady
                ? []
                : searchTerm
                    ? searchEmojis(searchTerm, currentCategory, selectedSkinTone)
                    : getEmojisByCategory(currentCategory, selectedSkinTone)
        ),
        [emojiDataReady, searchTerm, currentCategory, selectedSkinTone]
    );
    const displayEmojis = useMemo(
        () => (maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis),
        [filteredEmojis, maxEmojis]
    );

    if (resolvedType === EmojiGeneratorType.QuickReactions) {
        return (
            <Box ref={setRootRef} className={clsx("rds-emoji-generator rds-emoji-generator--quick", className)} sx={sx} {...props}>
                {quickReactions.map((e) => (
                    <Box
                        key={e}
                        className="rds-emoji-generator__emoji rds-emoji-generator__emoji--quick"
                        role="button"
                        tabIndex={0}
                        aria-label={getEmojiLabel(e) ?? e}
                        onClick={(ev) => handleEmojiClick(e, ev)}
                        onKeyDown={(ev: KeyboardEvent<HTMLElement>) => handleActivationKey(ev, () => handleEmojiClick(e, ev))}
                    >
                        {e}
                    </Box>
                ))}
                <IconButton
                  aria-label="More emojis"
                    className="rds-emoji-generator__plus"
                    onClick={(ev) => (onMoreClick ? onMoreClick() : handleEmojiClick('+', ev))}
                    size="small"
                >
                    <AddIcon />
                </IconButton>
            </Box>
        );
    }

    return (
    <Box ref={setRootRef} className={clsx("rds-emoji-generator", className)} sx={sx} {...props}>
            {resolvedType === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__search">
                    <Box className="rds-emoji-generator__search-container">
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={searchPlaceholder}
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

                                {skinToneExpanded && (
                                    <Box className="rds-emoji-generator__skin-tone-inline">
                                        <SkinTonePicker
                                            skinToneOptions={SKIN_TONE_OPTIONS}
                                            selectedSkinTone={selectedSkinTone}
                                            onSelect={handleSkinToneSelect}
                                            size="small"
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                    {!skinToneExpanded && (
                        <Popover
                            open={skinTonePopoverOpen}
                            anchorEl={skinToneAnchorEl}
                            onClose={handleSkinToneClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            container={() => rootRef.current || document.body}
                            slotProps={{ paper: { className: 'rds-emoji-generator__skin-tone-popover' } }}
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
                            onClick={(ev) => handleEmojiClick(e, ev)}
                            onKeyDown={(ev: KeyboardEvent<HTMLElement>) => handleActivationKey(ev, () => handleEmojiClick(e, ev))}
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

            {showFooter && resolvedType === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__footer">
                    <Typography className="rds-emoji-generator__footer-emoji">🙂</Typography>
                    <Typography className="rds-emoji-generator__footer-text" variant="body2">
                        {moodPrompt}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
RdsCompEmojiGenerator.displayName = 'RdsCompEmojiGenerator';
export default RdsCompEmojiGenerator;
export const RdsCompEmojiPicker = RdsCompEmojiGenerator;
export { EmojiCategory, EmojiGeneratorType } from './rds-comp-emoji-data';

function normalizeEmojiForTwemoji(emoji: string): string {
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
