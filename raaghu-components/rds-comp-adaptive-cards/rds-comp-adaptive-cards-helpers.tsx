// =========================
// Imports
// =========================
import React, { useState } from "react";
import { Default } from "./rds-comp-adaptive-cards.stories";
import {
  Select, MenuItem, FormControl, FormControlLabel, RadioGroup, ImageList, Button, IconButton, ImageListItem
} from "@mui/material";
import RdsCard from "../../raaghu-elements/rds-card-detail/rds-card-detail";
import {
  RdsBox,
  RdsTypography,
  RdsRadio,
  RdsChip,
  RdsStack,
  RdsAvatar
} from "../../raaghu-elements";
import { Close as CloseIcon, Add as AddIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

// =========================
// Type Definitions
// =========================
export type FootballScorecardCardProps = {
  leagueName: string;
  leagueAvatar: string;
  isLive: boolean;
  date: string;
  isFinal: boolean;
  homeTeam: { name: string; logo: string; status: string };
  awayTeam: { name: string; logo: string; status: string };
  homeScore: number;
  awayScore: number;
  time: string;
  finalText?: string;
};

export type ActivityUpdateCardProps = {
  avatar: string;
  name: string;
  date: string;
  cardText?: string;
  radioOptions: { value: string; label: string; desc: string }[];
};

export type ImageGalleryCardProps = {
  cardTitle?: string;
  smallText?: string;
  images: string[];
};

export type RdsCompAdaptiveCardsProps = {
  showHeader?: boolean;
  showDismiss?: boolean;
  cardTitle?: string;
  showBtn1?: boolean;
  showBtn2?: boolean;
  btn1style?: string;
  btn2style?: string;
  btn1Label?: string;
  btn2Label?: string;
  smallText?: string;
  cardText?: string;
  type?: string;
  closeIcon: boolean;
  label?: string;
  // InputForm customizations 
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  requiredText?: string;
  block?: boolean;
  images?: string[];
  // FootballScorecard direct props
  leagueName?: string;
  leagueAvatar?: string;
  isLive?: boolean;
  matchDate?: string; // renamed to avoid duplicate
  isFinal?: boolean;
  homeTeamName?: string;
  homeTeamLogo?: string;
  homeTeamStatus?: string;
  awayTeamName?: string;
  awayTeamLogo?: string;
  awayTeamStatus?: string;
  homeScore?: number;
  awayScore?: number;
  time?: string;
  finalText?: string;
  footballProps?: Partial<FootballScorecardCardProps>; // keep for backward compatibility
  activityProps?: Partial<ActivityUpdateCardProps>;
  name?: string;
  date?: string;
  calendarReminderPlaceholder?: string;
  calendarReminderLabel?: string;
  // RestaurantOrder customizations
  entreeLabel?: string;
  entreePlaceholder?: string;
  entreeOptions?: { value: string; label: string }[];
  sideLabel?: string;
  sidePlaceholder?: string;
  sideOptions?: { value: string; label: string }[];
  drinkLabel?: string;
  drinkPlaceholder?: string;
  drinkOptions?: { value: string; label: string }[];
};

// =========================
// Helpers & Constants
// =========================
export const CustomChevronIcon = (props: any) => (
  <svg
    width="18"
    height="12"
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rds-adaptive-cards__chevron-icon"
    {...props}
  >
    <polyline points="3,4 9,10 15,4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function capitalizeFirstWord(text: string) {
  if (!text) return '';
  const [first, ...rest] = text.split(' ');
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() + (rest.length ? ' ' + rest.join(' ').toLowerCase() : '');
}

export const renderSelectValue = (placeholder: string) => (selected: unknown) =>
  selected === "" ? (
    <span
      className="rds-adaptive-cards__placeholder"
    >
      {placeholder}
    </span>
  ) : (typeof selected === 'string' ? selected : '');

// =========================
// Default Props Helper
// =========================
export function getDefaultPropsForType(type: string): Partial<RdsCompAdaptiveCardsProps> {
  switch (type) {
    case 'ActivityUpdateCard':
      return Default.activityUpdate;
    case 'CalenderReminder':
      return Default.calenderReminder;
    case 'ImageGallery':
      return Default.imageGallery;
    case 'InputForm':
      return Default.inputForm;
    case 'RestaurantOrder':
      return Default.restaurantOrder;
    case 'FootballScorecard':
      return Default.footballScorecard;
    default:
      return {
        cardTitle: 'Title',
        showHeader: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'transparent',
        btn2style: 'filled',
        btn1Label: 'Cancel',
        btn2Label: 'Done',
        type: 'Default',
        showDismiss: true,
        closeIcon: true,
      };
  }
}

// =========================
// Component Definitions
// =========================
export function InputFormCard({
  label,
  smallText,
  nameLabel = 'Name (Last, First)',
  namePlaceholder = 'Enter Name',
  emailLabel = 'Email',
  emailPlaceholder = 'Enter Email',
  phoneLabel = 'Phone Number',
  phonePlaceholder = 'Enter Phone Number',
  requiredText = '*',
}: {
  label?: string,
  smallText?: string,
  nameLabel?: string,
  namePlaceholder?: string,
  emailLabel?: string,
  emailPlaceholder?: string,
  phoneLabel?: string,
  phonePlaceholder?: string,
  requiredText?: string,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <div>
      <div className="rds-adaptive-cards__input-form-label">{label}</div>
      <div className="rds-adaptive-cards__input-form-small-text">{smallText}</div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{nameLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input className="rds-adaptive-cards__action-btn--input-form" placeholder={namePlaceholder} required value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{emailLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input className="rds-adaptive-cards__action-btn--input-form" placeholder={emailPlaceholder} required type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{phoneLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input className="rds-adaptive-cards__action-btn--input-form" placeholder={phonePlaceholder} required type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
    </div>
  );
}

export function ImageGalleryCard({ cardTitle, smallText, images, showHeader = true, closeIcon = false, showDismiss = false }: ImageGalleryCardProps & { showHeader?: boolean; closeIcon?: boolean; showDismiss?: boolean }) {
  return (
    <RdsCard className="rds-adaptive-cards rds-adaptive-cards--image-gallery">
      {/* Header, subtitle, and description outside card */}
      {showHeader && (
        <div className="rds-adaptive-cards__header">
          <RdsStack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
            {showDismiss && <RdsBox className="rds-adaptive-cards__title-icon" />}
            <RdsTypography variant="h6" className="rds-adaptive-cards__title">{cardTitle}</RdsTypography>
            {closeIcon && (
              <IconButton size="small" className="rds-adaptive-cards__close-btn"><CloseIcon /></IconButton>
            )}
          </RdsStack>
        </div>
      )}
      <div className="rds-adaptive-cards__content">
        <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__small-text">{smallText}</RdsTypography>
        <ImageList cols={4} className="rds-adaptive-cards__image-list">
          {images && images.map((src, index) => (
            <ImageListItem key={index} className="rds-adaptive-cards__image-list-item">
              <img src={src} alt={`image${index + 1}`} loading="lazy" className="rds-adaptive-cards__image" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </RdsCard>
  );
}

export function FootballScorecardCard({
  leagueName,
  leagueAvatar,
  isLive,
  date,
  isFinal,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  time,
  finalText = "Final",
}: FootballScorecardCardProps) {
  return (
    <RdsCard className="rds-adaptive-cards rds-adaptive-cards--football-scorecard">
      {/* Header, subtitle, and description outside card */}
      <div className="rds-adaptive-cards__content">
        <RdsStack className="rds-adaptive-cards__football-header" alignItems="center">
          <RdsStack direction="row" spacing={1} alignItems="center" justifyContent="center" className="rds-adaptive-cards__football-header-row">
           <RdsAvatar src={leagueAvatar} className="rds-adaptive-cards__football-league-avatar" sx={{ marginLeft: "40px" }} />
            <RdsTypography
              variant="subtitle1"
              className="rds-adaptive-cards__football-league"
              align="center"
              sx={{ fontSize: '26px', fontWeight: 600 }} 
            >
              {leagueName}
            </RdsTypography>
            {isLive && (
                <RdsChip
                  label="Live"
                  color="error"
                  size="small"
                  icon={<svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="2" fill="currentColor" /></svg>}
                  className="rds-adaptive-cards__football-live"
                />
              )}
          </RdsStack>
          <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-date" align="center">
            {date}
          </RdsTypography>
          {isFinal && (
            <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-final" align="center">
              {finalText}
            </RdsTypography>
          )}
        </RdsStack>

        <RdsStack direction="row" alignItems="center" justifyContent="center" className="rds-adaptive-cards__football-body">
          <RdsStack alignItems="center" className="rds-adaptive-cards__football-team rds-adaptive-cards__football-team--home">
            <RdsBox className="rds-adaptive-cards__football-logo">
              <img src={homeTeam.logo} alt={homeTeam.name} className="rds-adaptive-cards__football-img" />
            </RdsBox>
            <RdsTypography variant="body1" className="rds-adaptive-cards__football-team-name">{homeTeam.name}</RdsTypography>
            <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{homeTeam.status}</RdsTypography>
          </RdsStack>

          <RdsStack alignItems="center" className="rds-adaptive-cards__football-score-section">
            <RdsStack direction="row" spacing={1} alignItems="center">
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score">{homeScore}</RdsTypography>
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score">:</RdsTypography>
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score">{awayScore}</RdsTypography>
            </RdsStack>
            <RdsChip label={time} className="rds-adaptive-cards__football-time" />
          </RdsStack>

          <RdsStack alignItems="center" className="rds-adaptive-cards__football-team rds-adaptive-cards__football-team--away">
            <RdsBox className="rds-adaptive-cards__football-logo">
              <img src={awayTeam.logo} alt={awayTeam.name} className="rds-adaptive-cards__football-img rds-adaptive-cards__football-img--barca" />
            </RdsBox>
            <RdsTypography variant="body1" className="rds-adaptive-cards__football-team-name">{awayTeam.name}</RdsTypography>
            <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{awayTeam.status}</RdsTypography>
          </RdsStack>
        </RdsStack>
      </div>
    </RdsCard>
  );
}

export type CalendarReminderOption = {
  value: string;
  label: string;
};

export type CalendarReminderFormProps = {
  label?: string;
  smallText?: string;
  placeholder?: string;
  calendarReminderLabel?: string;
  options?: CalendarReminderOption[];
  selectPlaceholder?: string;
  snoozeLabel?: string;
  lateLabel?: string;
};

export function CalendarReminderForm({
  label,
  smallText,
  placeholder,
  calendarReminderLabel,
  options = [
    { value: "5min", label: "5 Minutes" },
    { value: "15min", label: "15 Minutes" },
    { value: "30min", label: "30 Minutes" }
  ],
  selectPlaceholder = "Select duration",
  snoozeLabel = "Snooze",
  lateLabel = "I'll be Late"
}: CalendarReminderFormProps) {
  const [selected, setSelected] = React.useState("");
  return (
    <RdsStack spacing={2} className="rds-adaptive-cards__calendar-reminder">
      <RdsBox className="rds-adaptive-cards__calendar-reminder-labels">
        <RdsTypography variant="subtitle1" className="rds-adaptive-cards__calendar-reminder-label">{label}</RdsTypography>
        <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__calendar-reminder-small-text">{smallText}</RdsTypography>
      </RdsBox>
      <div className="rds-adaptive-cards__calendar-reminder-select-form">
        <RdsTypography variant="subtitle2" className="rds-adaptive-cards__calendar-reminder-label">{calendarReminderLabel || "Snooze for"}</RdsTypography>
        <FormControl fullWidth size="small">
          <Select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            size="small"
            displayEmpty
            renderValue={selected =>
              selected === ""
                ? <span className="rds-adaptive-cards__calendar-reminder-placeholder">{placeholder || selectPlaceholder}</span>
                : (options.find(opt => opt.value === selected)?.label || selected)
            }
            IconComponent={props => <CustomChevronIcon {...props} className="rds-adaptive-cards__calendar-reminder-select-icon" />}
          >
            <MenuItem value="" disabled>{selectPlaceholder}</MenuItem>
            {options.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <RdsStack direction="row" spacing={1} justifyContent="flex-end" className="rds-adaptive-cards__calendar-reminder-actions">
          <RdsBox className="rds-adaptive-cards__calendar-reminder-action-box rds-adaptive-cards__calendar-reminder-action-box--snooze">
            <Button variant="outlined" className="rds-adaptive-cards__action-btn">
              {snoozeLabel}
            </Button>
          </RdsBox>
          <RdsBox className="rds-adaptive-cards__calendar-reminder-action-box rds-adaptive-cards__calendar-reminder-action-box--late">
            <Button variant="outlined" className="rds-adaptive-cards__action-btn">
              {lateLabel}
            </Button>
          </RdsBox>
      </RdsStack>
    </RdsStack>
  );
}

export function ActivityUpdateCard({ avatar, name, date, cardText, radioOptions }: ActivityUpdateCardProps) {
  return (
    <RdsStack spacing={2} className="rds-adaptive-cards__activity-update">
      <RdsStack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__activity-update-header">
        <RdsAvatar src={avatar} className="rds-adaptive-cards__activity-update-avatar" />
        <RdsStack>
          <RdsTypography variant="subtitle1" className="rds-adaptive-cards__activity-update-name">{name}</RdsTypography>
          <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__activity-update-date">{date}</RdsTypography>
        </RdsStack>
      </RdsStack>
      <RdsTypography variant="body1" color="text.secondary" className="rds-adaptive-cards__activity-update-text">{cardText}</RdsTypography>
      <RadioGroup className="rds-adaptive-cards__activity-update-radio-group">
          {radioOptions && radioOptions.map(opt => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<RdsRadio options={[{ value: opt.value, text: '' }]} />}
              label={<span className="rds-adaptive-cards__activity-update-radio-label">{opt.label} : <span className="rds-adaptive-cards__activity-update-radio-desc">{opt.desc}</span></span>}
              className="rds-adaptive-cards__activity-update-radio"
            />
          ))}
      </RadioGroup>
    </RdsStack>
  );
}

export type RestaurantOrderFormProps = {
  entree: string;
  setEntree: (v: string) => void;
  side: string;
  setSide: (v: string) => void;
  drink: string;
  setDrink: (v: string) => void;
  entreeLabel?: string;
  entreePlaceholder?: string;
  entreeOptions?: { value: string; label: string }[];
  sideLabel?: string;
  sidePlaceholder?: string;
  sideOptions?: { value: string; label: string }[];
  drinkLabel?: string;
  drinkPlaceholder?: string;
  drinkOptions?: { value: string; label: string }[];
};

export function RestaurantOrderForm({
  entree,
  setEntree,
  side,
  setSide,
  drink,
  setDrink,
  entreeLabel = "Which entree would you like?",
  entreePlaceholder = "Select an entree",
  entreeOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  sideLabel = "Which side would you like?",
  sidePlaceholder = "Select a side",
  sideOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  drinkLabel = "Which drink would you like?",
  drinkPlaceholder = "Select a drink",
  drinkOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ], 
}: RestaurantOrderFormProps) {
  return (
  <RdsStack spacing={1} component="form" className="rds-adaptive-cards__restaurant-order">
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
          {entreeLabel}<span className="rds-adaptive-cards__required">*</span>
        </RdsTypography>
        <Select
          value={entree}
          onChange={e => setEntree(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(entreePlaceholder)}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>{entreePlaceholder}</MenuItem>
          {entreeOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
          {sideLabel}<span className="rds-adaptive-cards__required">*</span>
        </RdsTypography>
        <Select
          value={side}
          onChange={e => setSide(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(sidePlaceholder)}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>{sidePlaceholder}</MenuItem>
          {sideOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
          {drinkLabel}<span className="rds-adaptive-cards__required">*</span>
        </RdsTypography>
        <Select
          value={drink}
          onChange={e => setDrink(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(drinkPlaceholder)}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>{drinkPlaceholder}</MenuItem>
          {drinkOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
  </RdsStack>
  );
}
