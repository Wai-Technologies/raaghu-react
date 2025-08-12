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
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PetsIcon from "@mui/icons-material/Pets";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlagIcon from "@mui/icons-material/Flag";
// NOTE: Ensure the stylesheet name matches the actual file present in the folder.
// The file created initially followed the component naming convention: rds-comp-emoji-generator.scss
// The earlier incorrect import (./rds-emoji-generator.scss) caused a module resolution failure in Storybook.
import "./rds-comp-emoji-generator.scss";
import { getEmojisByCategory, searchEmojis, getQuickReactionEmojis } from './rds-comp-emoji-data';
import { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-types';

// Define props interface
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

// Emoji data and helper functions moved to rds-comp-emoji-data.ts

const RdsEmojiGenerator: React.FC<RdsEmojiGeneratorProps> = ({
    Type = EmojiGeneratorType.Default,
    "Show Skin Tone": showSkinTone = true,
    "Show Footer": showFooter = true,
    State = SkinToneState.Default,
    Category = EmojiCategory.SmileysAndPeople,
    onEmojiSelect,
    maxEmojis = 80,
    sx = {},
    ...props
}) => {
    const [selectedCategory, setSelectedCategory] = useState(Category);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkinTone, setSelectedSkinTone] = useState(0); // 0 = default/yellow
    const [skinToneAnchorEl, setSkinToneAnchorEl] = useState<HTMLElement | null>(null);

    // Skin tone options with colors matching the wireframe
    const skinToneOptions = [
        { value: 0, color: "#FFD700", label: "Default" }, // Yellow/Default
        { value: 1, color: "#F7E7CE", label: "Light" },   // Light skin
        { value: 2, color: "#F3D2A2", label: "Medium Light" }, // Medium-light skin
        { value: 3, color: "#D08B5B", label: "Medium" },  // Medium skin
        { value: 4, color: "#AE7242", label: "Medium Dark" }, // Medium-dark skin
        { value: 5, color: "#7C4A2E", label: "Dark" },    // Dark skin
    ];

    const handleSkinToneClick = (event: React.MouseEvent<HTMLElement>) => {
        setSkinToneAnchorEl(event.currentTarget);
    };

    const handleSkinToneClose = () => {
        setSkinToneAnchorEl(null);
    };

    const handleSkinToneSelect = (skinTone: number) => {
        setSelectedSkinTone(skinTone);
        handleSkinToneClose();
    };

    const skinTonePopoverOpen = Boolean(skinToneAnchorEl);

    // Handle QuickReactions type
    if (Type === EmojiGeneratorType.QuickReactions) {
        const quickEmojis = getQuickReactionEmojis();
        
         return (
            <Box
                className="rds-emoji-generator rds-emoji-generator--quick"
                {...props}
            >
                {quickEmojis.map((emoji, index) => (
                    <Box
                        key={index}
                        className="rds-emoji-generator__emoji"
                        onClick={() => handleEmojiClick(emoji)}
                    >
                        {emoji}
                    </Box>
                ))}
                
                {/* Plus icon */}
                <Box
                    className="rds-emoji-generator__plus"
                    onClick={() => {
                        // Handle plus click - could open full emoji picker
                        console.log('Plus clicked - open full emoji picker');
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1V17M1 8.95077H17" stroke="#7D7D7D" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Box>
            </Box>
        );
    }

    // Category tabs configuration
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

    // Get filtered emojis based on category
    const getFilteredEmojis = () => {
        if (searchTerm) {
            return searchEmojis(searchTerm, selectedCategory, selectedSkinTone);
        } else {
            return getEmojisByCategory(selectedCategory, selectedSkinTone);
        }
    };

    const handleEmojiClick = (emoji: any) => {
        if (onEmojiSelect) {
            onEmojiSelect(emoji);
        }
    };

    const handleCategoryChange = (newCategory: EmojiCategory) => {
        setSelectedCategory(newCategory);
    };

    const filteredEmojis = getFilteredEmojis();
    const displayEmojis = maxEmojis ? filteredEmojis.slice(0, maxEmojis) : filteredEmojis;

    return (
        <Box
            className="rds-emoji-generator"
            {...props}
        >
            {/* Search Section - Always show for Default type */}
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
                        
                        {/* Skin Tone Selector - Single button showing current selection */}
                        {showSkinTone && (
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    className="rds-emoji-generator__skin-tone-button"
                                    onClick={handleSkinToneClick}
                                    style={{ 
                                        backgroundColor: skinToneOptions[selectedSkinTone].color,
                                        width: 29,
                                        height: 29,
                                        borderRadius: 4,
                                        border: '1px solid #e5e7eb',
                                        minWidth: '29px',
                                        padding: 0,
                                        marginLeft: 8
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Skin Tone Popover - Vertical dropdown */}
                    <Popover
                        open={skinTonePopoverOpen}
                        anchorEl={skinToneAnchorEl}
                        onClose={handleSkinToneClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            style: {
                                padding: '6px',
                                borderRadius: '8px',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                border: '1px solid #e5e7eb',
                                marginTop: '2px',
                                minWidth: 'auto',
                                width: '45px'
                            }
                        }}
                        disableAutoFocus
                        disableEnforceFocus
                    >
                        <Box className="rds-emoji-generator__skin-tone-dropdown">
                            {skinToneOptions.map((option) => (
                                <IconButton
                                    key={option.value}
                                    onClick={() => handleSkinToneSelect(option.value)}
                                    style={{
                                        backgroundColor: option.color,
                                        width: 29,
                                        height: 29,
                                        borderRadius: 4,
                                        border: selectedSkinTone === option.value ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                        boxShadow: selectedSkinTone === option.value ? '0 0 0 1px rgba(59, 130, 246, 0.3)' : 'none',
                                        minWidth: '29px',
                                        padding: 0,
                                        margin: '2px 0',
                                        display: 'block'
                                    }}
                                    title={option.label}
                                />
                            ))}
                        </Box>
                    </Popover>
                </Box>
            )}

            {/* Category Tabs */}
            <Box className="rds-emoji-generator__categories">
                <Box className="rds-emoji-generator__categories-container">
                    {categoryTabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <Chip
                                key={tab.id}
                                icon={<IconComponent />}
                                variant={selectedCategory === tab.id ? "filled" : "outlined"}
                                color={selectedCategory === tab.id ? "primary" : "default"}
                                size="small"
                                onClick={() => handleCategoryChange(tab.id)}
                                title={tab.title}
                                className={`rds-emoji-generator__category-chip ${
                                    selectedCategory === tab.id ? 'rds-emoji-generator__category-chip--selected' : ''
                                }`}
                                sx={{
                                    minWidth: '32px',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '16px',
                                    border: '1px solid #e5e7eb',
                                    backgroundColor: selectedCategory === tab.id ? '#3b82f6' : 'transparent',
                                    color: selectedCategory === tab.id ? '#ffffff' : '#6b7280',
                                    padding: '0',
                                    '&:hover': {
                                        backgroundColor: selectedCategory === tab.id ? '#2563eb' : '#f3f4f6',
                                        borderColor: '#3b82f6'
                                    },
                                    '& .MuiChip-icon': {
                                        fontSize: '16px',
                                        color: 'inherit',
                                        marginLeft: '0',
                                        marginRight: '0'
                                    },
                                    '& .MuiChip-label': {
                                        display: 'none'
                                    }
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* Emoji Grid */}
            <Box className="rds-emoji-generator__grid">
                {/* Category Title */}
                <Box className="rds-emoji-generator__category-title">
                    <Typography variant="h6" className="rds-emoji-generator__category-title-text">
                        {categoryTabs.find(tab => tab.id === selectedCategory)?.title || "Emojis"}
                    </Typography>
                </Box>
                
                <Box className="rds-emoji-generator__grid-container">
                    {displayEmojis.map((emoji, index) => (
                        <Box
                            key={index}
                            className="rds-emoji-generator__emoji"
                            onClick={() => handleEmojiClick(emoji)}
                        >
                            {emoji}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Footer Text Section - Outside of grid */}
            {showFooter && Type === EmojiGeneratorType.Default && (
                <Box className="rds-emoji-generator__footer">
                    <Typography className="rds-emoji-generator__footer-emoji">
                        🙂
                    </Typography>
                    <Typography 
                        className="rds-emoji-generator__footer-text"
                        variant="body2"
                    >
                        What's your mood?
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default RdsEmojiGenerator;
// Re-export enums for backward compatibility with stories and external consumers
export { EmojiCategory, EmojiGeneratorType, SkinToneState } from './rds-comp-emoji-types';
