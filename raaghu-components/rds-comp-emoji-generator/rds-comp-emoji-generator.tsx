import React, { useState } from "react";
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

export interface RdsEmojiGeneratorProps {
    Type?: EmojiGeneratorType;
    "Show Skin Tone"?: boolean;
    "Show Footer"?: boolean;
    State?: SkinToneState;
    Category?: EmojiCategory;
    onEmojiSelect?: (emoji: any) => void;
    maxEmojis?: number;
    sx?: any;
}


const RdsEmojiGenerator: React.FC<RdsEmojiGeneratorProps> = ({
    Type = EmojiGeneratorType.Default,
    "Show Skin Tone": showSkinTone = true,
    "Show Footer": showFooter = true,
    State = SkinToneState.Default,
    Category = EmojiCategory.SmileysAndPeople,
    onEmojiSelect,
    maxEmojis = 80,

    ...props
}) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(Category);
    React.useEffect(() => {
        setSelectedCategory(Category);
    }, [Category]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkinTone, setSelectedSkinTone] = useState(0); 
    const [skinToneAnchorEl, setSkinToneAnchorEl] = useState<HTMLElement | null>(null);

    const skinToneOptions = [
        { value: 0, color: "#FFD700", label: "Default" },
        { value: 1, color: "#F7E7CE", label: "Light" },
        { value: 2, color: "#F3D2A2", label: "Medium Light" },
        { value: 3, color: "#D08B5B", label: "Medium" },
        { value: 4, color: "#AE7242", label: "Medium Dark" },
        { value: 5, color: "#7C4A2E", label: "Dark" },
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

    const handleEmojiClick = (e: any) => onEmojiSelect?.(e);
    const handleCategoryChange = (c: EmojiCategory) => setSelectedCategory(c);
    const handleSkinToneClick = (e: React.MouseEvent<HTMLElement>) => setSkinToneAnchorEl(e.currentTarget);
    const handleSkinToneClose = () => setSkinToneAnchorEl(null);
    const handleSkinToneSelect = (t: number) => { setSelectedSkinTone(t); handleSkinToneClose(); };
    const skinTonePopoverOpen = Boolean(skinToneAnchorEl);

    if (Type === EmojiGeneratorType.QuickReactions) {
        const quickEmojis = ["👍", "😊", "😞", "💯", "😎"];
        return (
            <Box className="rds-emoji-generator rds-emoji-generator--quick" {...props}>
                {quickEmojis.map((e, i) => (
                    <Box
                        key={i}
                        className="rds-emoji-generator__emoji rds-emoji-generator__emoji--quick"
                        onClick={() => handleEmojiClick(e)}
                    >
                        {e}
                    </Box>
                ))}
                <IconButton
                    className="rds-emoji-generator__plus"
                    onClick={() => onEmojiSelect?.('+')}
                    size="small"
                >
                    <AddIcon />
                </IconButton>
            </Box>
        );
    }

    const filteredEmojis = searchTerm
        ? searchEmojis(searchTerm, selectedCategory, selectedSkinTone)
        : getEmojisByCategory(selectedCategory, selectedSkinTone);
    const displayEmojis = maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis;

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
                                    className="rds-emoji-generator__skin-tone-button"
                                    onClick={handleSkinToneClick}
                                    style={{ backgroundColor: skinToneOptions[selectedSkinTone].color }}
                                />

                                {State === SkinToneState.Expanded && (
                                    <Box className="rds-emoji-generator__skin-tone-inline">
                                        {skinToneOptions.map(o => (
                                            <IconButton
                                                key={o.value}
                                                onClick={() => handleSkinToneSelect(o.value)}
                                                className="rds-emoji-generator__skin-tone-option"
                                                style={{
                                                    backgroundColor: o.color,
                                                    border: selectedSkinTone === o.value ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                                    boxShadow: selectedSkinTone === o.value ? '0 0 0 1px rgba(59,130,246,0.3)' : 'none'
                                                }}
                                                title={o.label}
                                                size="small"
                                            />
                                        ))}
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
                            PaperProps={{ className: 'rds-emoji-generator__skin-tone-popover' }}
                            disableAutoFocus
                            disableEnforceFocus
                            container={() => rootRef.current?.closest('.rds-comp-toolbar__dropdown') || rootRef.current || document.body}
                        >
                            <Box className="rds-emoji-generator__skin-tone-dropdown">
                                {skinToneOptions.map(o => (
                                    <IconButton
                                        key={o.value}
                                        onClick={() => handleSkinToneSelect(o.value)}
                                        className="rds-emoji-generator__skin-tone-option"
                                        style={{
                                            backgroundColor: o.color,
                                            border: selectedSkinTone === o.value ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                            boxShadow: selectedSkinTone === o.value ? '0 0 0 1px rgba(59,130,246,0.3)' : 'none'
                                        }}
                                        title={o.label}
                                    />
                                ))}
                            </Box>
                        </Popover>
                    )}
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
                        {categoryTabs.find(t => t.id === selectedCategory)?.title || "Emojis"}
                    </Typography>
                </Box>
                <Box className="rds-emoji-generator__grid-container">
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
RdsEmojiGenerator.displayName = 'RdsEmojiGenerator';
export default RdsEmojiGenerator;
export { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-data';
