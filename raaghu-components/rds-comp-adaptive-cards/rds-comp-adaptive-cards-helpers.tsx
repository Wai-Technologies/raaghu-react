import RdsRadio from "../../raaghu-elements/rds-radio/rds-radio";
import React, { useState } from "react";
import RdsCard from "../../raaghu-elements/rds-card/rds-card";
import RdsStack from "../../raaghu-elements/rds-stack/rds-stack";
import RdsBox from "../../raaghu-elements/rds-box/rds-box";
import RdsTypography from "../../raaghu-elements/rds-typography/rds-typography";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import RdsChip from "../../raaghu-elements/rds-chip/rds-chip";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CardHeader, CardContent, CardActions } from "@mui/material";
import RdsButtonDropdown from "../../raaghu-elements/rds-button-dropdown/rds-button-dropdown";
import './rds-comp-adaptive-cards.scss';

export interface InputFormCardProps {
  label?: string;
  smallText?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  requiredText?: string;
  onChange?: (data: { name: string; email: string; phone: string }) => void;
  nameValue?: string;
  emailValue?: string;
  phoneValue?: string;
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameError?: string;
  emailError?: string;
  phoneError?: string;
}

export interface ImageGalleryCardProps {
  cardTitle?: string;
  smallText?: string;
  images?: string[];
  showHeader?: boolean;
  closeIcon?: boolean;
  showDismiss?: boolean;
  onImageClick?: (index: number) => void;
}

export interface FootballScorecardCardProps {
  leagueName?: string;
  leagueAvatar?: string;
  isLive?: boolean;
  date?: string;
  isFinal?: boolean;
  homeTeam?: { name: string; logo: string; status: string };
  awayTeam?: { name: string; logo: string; status: string };
  homeScore?: number;
  awayScore?: number;
  time?: string;
  finalText?: string;
}

export interface ActivityUpdateCardProps {
  avatar?: string;
  name?: string;
  date?: string;
  cardText?: string;
  radioOptions?: { value: string; label: string; desc: string }[];
}

export interface AdaptiveCardProps extends InputFormCardProps, ImageGalleryCardProps, FootballScorecardCardProps, ActivityUpdateCardProps {
  onBtn1Click?: () => void;
  showBtn1?: boolean;
  entreeValue?: string;
  sideValue?: string;
  drinkValue?: string;
  onEntreeChange?: (e: SelectChangeEvent<string>) => void;
  onSideChange?: (e: SelectChangeEvent<string>) => void;
  onDrinkChange?: (e: SelectChangeEvent<string>) => void;
  showBtn2?: boolean;
  btn1style?: string;
  btn2style?: string;
  btn1Label?: string;
  btn2Label?: string;
  smallText?: string;
  cardText?: string;
  cardTitle?: string;
  showHeader?: boolean;
  showDismiss?: boolean;
  type?: string;
  closeIcon?: boolean;
  label?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  requiredText?: string;
  block?: boolean;
  images?: string[];
  leagueName?: string;
  leagueAvatar?: string;
  isLive?: boolean;
  matchDate?: string;
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
  footballProps?: Partial<{
    leagueName?: string;
    leagueAvatar?: string;
    isLive?: boolean;
    date?: string;
    isFinal?: boolean;
    homeTeam?: {
      name?: string;
      logo?: string;
      status?: string;
    };
    awayTeam?: {
      name?: string;
      logo?: string;
      status?: string;
    };
    homeScore?: number;
    awayScore?: number;
    time?: string;
    finalText?: string;
  }>;
  activityProps?: Partial<{
    avatar?: string;
    name?: string;
    date?: string;
    radioOptions?: { value: string; label: string; desc: string }[];
  }>;
  name?: string;
  date?: string;
  calendarReminderPlaceholder?: string;
  calendarReminderLabel?: string;
  entreeLabel?: string;
  entreePlaceholder?: string;
  entreeOptions?: { value: string; label: string }[];
  sideLabel?: string;
  sidePlaceholder?: string;
  sideOptions?: { value: string; label: string }[];
  drinkLabel?: string;
  drinkPlaceholder?: string;
  drinkOptions?: { value: string; label: string }[];
  snoozeLabel?: string;
  lateLabel?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  avatar?: string;
  radioOptions?: { value: string; label: string; desc: string }[];
  homeTeam?: { name: string; logo: string; status: string };
  awayTeam?: { name: string; logo: string; status: string };
  onChange?: (data: { name: string; email: string; phone: string }) => void;
}

export function capitalizeFirstWord(text: string) {
  if (!text) return '';
  const [first, ...rest] = text.split(' ');
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() + (rest.length ? ' ' + rest.join(' ').toLowerCase() : '');
}

export const renderSelectValue = (placeholder?: string) => (selected: unknown) =>
  selected === "" ? (
    <span className="rds-adaptive-cards__placeholder">{placeholder}</span>
  ) : (typeof selected === 'string' ? selected : '');

export function InputFormCard(props: InputFormCardProps) {
  const {
    label = '',
    smallText = '',
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    phoneLabel,
    phonePlaceholder,
    requiredText,
    onChange,
    nameValue,
    emailValue,
    phoneValue,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    nameError,
    emailError,
    phoneError
  } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  React.useEffect(() => {
    if (onChange) onChange({ name, email, phone });
  }, [name, email, phone, onChange]);
  return (
    <div>
      <div className="rds-adaptive-cards__input-form-label">{label}</div>
      <div className="rds-adaptive-cards__input-form-small-text">{smallText}</div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{nameLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input 
          className={`rds-adaptive-cards__action-btn--input-form${nameError ? ' rds-adaptive-cards__input-error' : ''}`} 
          placeholder={namePlaceholder} 
          required 
          value={nameValue !== undefined ? nameValue : name} 
          onChange={onNameChange ? onNameChange : (e => setName(e.target.value))} 
          name="name" 
        />
        {nameError && <div className="rds-adaptive-cards__error-message">{nameError}</div>}
      </div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{emailLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input 
          className={`rds-adaptive-cards__action-btn--input-form${emailError ? ' rds-adaptive-cards__input-error' : ''}`} 
          placeholder={emailPlaceholder} 
          required 
          type="email" 
          value={emailValue !== undefined ? emailValue : email} 
          onChange={onEmailChange ? onEmailChange : (e => setEmail(e.target.value))} 
          name="email" 
        />
        {emailError && <div className="rds-adaptive-cards__error-message">{emailError}</div>}
      </div>
      <div className="rds-adaptive-cards__input-form-field">
        <label className="rds-adaptive-cards__input-form-field-label">{phoneLabel} <span className="rds-adaptive-cards__required">{requiredText}</span></label>
        <input 
          className={`rds-adaptive-cards__action-btn--input-form${phoneError ? ' rds-adaptive-cards__input-error' : ''}`} 
          placeholder={phonePlaceholder} 
          required 
          type="tel" 
          value={phoneValue !== undefined ? phoneValue : phone} 
          onChange={onPhoneChange ? onPhoneChange : (e => setPhone(e.target.value))} 
          name="phone" 
        />
        {phoneError && <div className="rds-adaptive-cards__error-message">{phoneError}</div>}
      </div>
    </div>
  );
}

export function ImageGalleryCard({ cardTitle, smallText, images, showHeader, closeIcon, showDismiss, onImageClick }: ImageGalleryCardProps) {
  return (
    <RdsCard className="rds-adaptive-cards rds-adaptive-cards--image-gallery" showIcon={false} showIndicator={false}>
      {showHeader && (
        <div className="rds-adaptive-cards__header">
          <RdsStack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
            {showDismiss && <RdsBox className="rds-adaptive-cards__title-icon" />}
            <RdsTypography variant="h6" className="rds-adaptive-cards__title">{cardTitle}</RdsTypography>
            {closeIcon && (
              <IconButton aria-label="Close" size="small" className="rds-adaptive-cards__close-btn"><CloseIcon /></IconButton>
            )}
          </RdsStack>
        </div>
      )}
      <div className="rds-adaptive-cards__content">
        <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__small-text">{smallText}</RdsTypography>
        <ImageList cols={4} className="rds-adaptive-cards__image-list">
          {(images ?? []).filter(src => !!src).map((src, index) => (
            <ImageListItem
              key={src}
              className="rds-adaptive-cards__image-list-item"
              role="button"
              tabIndex={0}
              onClick={() => onImageClick?.(index)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onImageClick?.(index); } }}
            >
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
  finalText,
}: FootballScorecardCardProps) {
  return (
    <RdsCard className={`rds-adaptive-cards rds-adaptive-cards--football-scorecard${isLive ? ' is-live' : ''} football-scorecard-stable`} showIcon={false} showIndicator={false}>
      <div className="rds-adaptive-cards__content">
        <RdsStack className="rds-adaptive-cards__football-header" alignItems="center">
          <RdsStack direction="row" spacing={1} alignItems="center" justifyContent="space-between" className="rds-adaptive-cards__football-header-row">
            <div className="rds-adaptive-cards__football-header-left">
              <RdsAvatar src={leagueAvatar} className="rds-adaptive-cards__football-league-avatar" />
              <RdsTypography
                variant="subtitle1"
                className="rds-adaptive-cards__football-league"
                align="center"
              >
                {leagueName}
              </RdsTypography>
            </div>
            {isLive && (
              <RdsChip
                label="Live"
                color="error"
                size="small"
                icon={<svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="2" fill="currentColor" /></svg>}
                className="rds-adaptive-cards__football-live rds-adaptive-cards__football-live--aligned"
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
            {homeTeam?.logo ? (
              <RdsBox className="rds-adaptive-cards__football-logo rds-adaptive-cards__football-logo--home">
                <img src={homeTeam.logo} alt={homeTeam.name} className="rds-adaptive-cards__football-img" />
              </RdsBox>
            ) : null}
            <RdsTypography variant="body1" className="rds-adaptive-cards__football-team-name">{homeTeam?.name}</RdsTypography>
            <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{homeTeam?.status}</RdsTypography>
          </RdsStack>

          <RdsStack alignItems="center" className="rds-adaptive-cards__football-score-section">
            <RdsStack direction="row" spacing={1} alignItems="center" className="rds-adaptive-cards__football-score-row">
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score">{homeScore}</RdsTypography>
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score rds-adaptive-cards__football-score-colon">:</RdsTypography>
              <RdsTypography variant="h3" className="rds-adaptive-cards__football-score">{awayScore}</RdsTypography>
            </RdsStack>
            <RdsChip label={time} className="rds-adaptive-cards__football-time" />
          </RdsStack>

          <RdsStack alignItems="center" className="rds-adaptive-cards__football-team rds-adaptive-cards__football-team--away">
             {awayTeam?.logo ? (
                <RdsBox className="rds-adaptive-cards__football-logo rds-adaptive-cards__football-logo--away">
                  <img src={awayTeam.logo} alt={awayTeam.name} className="rds-adaptive-cards__football-img rds-adaptive-cards__football-img--barca" />
                </RdsBox>
              ) : null}
            <RdsTypography variant="body1" className="rds-adaptive-cards__football-team-name">{awayTeam?.name}</RdsTypography>
            <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{awayTeam?.status}</RdsTypography>
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
  sideOptions?: CalendarReminderOption[];
  selectPlaceholder?: string;
  snoozeLabel?: string;
  lateLabel?: string;
  showBtn1?: boolean;
  showBtn2?: boolean;
  btn1Label?: string;
  btn2Label?: string;
};

export function CalendarReminderForm({
  label,
  smallText,
  placeholder,
  calendarReminderLabel,
  selectPlaceholder,
  snoozeLabel,
  lateLabel,
  sideOptions = [],
  showBtn1,
  showBtn2,
  btn1Label,
  btn2Label,
}: CalendarReminderFormProps) {
  const [selected, setSelected] = React.useState("");
  return (
    <RdsStack spacing={2} className="rds-adaptive-cards__calendar-reminder">
      <RdsBox className="rds-adaptive-cards__calendar-reminder-labels">
        <RdsTypography variant="subtitle1" className="rds-adaptive-cards__calendar-reminder-label">{label}</RdsTypography>
        <RdsTypography variant="body2" color="text.secondary" className="rds-adaptive-cards__calendar-reminder-small-text">{smallText}</RdsTypography>
      </RdsBox>
      <div className="rds-adaptive-cards__calendar-reminder-select-form">
        <RdsStack direction="row" spacing={0.5} alignItems="center">
          <RdsTypography variant="subtitle2" className="rds-adaptive-cards__calendar-reminder-label">{calendarReminderLabel || "Snooze for"}</RdsTypography>
          <InfoOutlined className="rds-adaptive-cards__calendar-reminder-info-icon" />
        </RdsStack>
        <FormControl fullWidth size="small">
          <Select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            size="small"
            displayEmpty
            renderValue={selected =>
              selected === ""
                ? <span className="rds-adaptive-cards__calendar-reminder-placeholder">{placeholder || selectPlaceholder}</span>
                : (sideOptions.find(opt => opt.value === selected)?.label || selected)
            }
            IconComponent={props => <ExpandMoreIcon {...props} className="rds-adaptive-cards__calendar-reminder-select-icon" />}
          >
            <MenuItem value="" disabled>{selectPlaceholder}</MenuItem>
            {sideOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> 
      <RdsStack direction="row" spacing={1} justifyContent="flex-end" className="rds-adaptive-cards__calendar-reminder-actions">
        {showBtn1 && (
          <RdsBox className="rds-adaptive-cards__calendar-reminder-action-box rds-adaptive-cards__calendar-reminder-action-box--btn1">
            <RdsButton style="outlined" className="rds-adaptive-cards__action-btn" text={snoozeLabel || btn1Label} />
          </RdsBox>
        )}
        {showBtn2 && (
          <RdsBox className="rds-adaptive-cards__calendar-reminder-action-box rds-adaptive-cards__calendar-reminder-action-box--btn2">
            <RdsButton style="outlined" className="rds-adaptive-cards__action-btn" text={lateLabel || btn2Label} />
          </RdsBox>
        )}
      </RdsStack>
    </RdsStack>
  );
}

export function ActivityUpdateCard({ avatar, name, date, cardText, radioOptions }: ActivityUpdateCardProps) {
  const [selectedValue, setSelectedValue] = React.useState('');
  const radioOptionsMapped = radioOptions?.map(opt => ({ value: opt.value, text: `${opt.label} : ${opt.desc}` })) ?? [];
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
      <RdsRadio
        options={radioOptionsMapped}
        value={selectedValue}
        onChange={e => setSelectedValue(e.target.value)}
        direction="column"
        layout="icon with label"
        className="rds-adaptive-cards__activity-update-radio-group"
      />
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
  entreeValue?: string;
  sideValue?: string;
  drinkValue?: string;
  onEntreeChange?: (e: SelectChangeEvent<string>) => void;
  onSideChange?: (e: SelectChangeEvent<string>) => void;
  onDrinkChange?: (e: SelectChangeEvent<string>) => void;
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
  entreeValue,
  sideValue,
  drinkValue,
  onEntreeChange,
  onSideChange,
  onDrinkChange,
  entreeLabel,
  entreePlaceholder,
  entreeOptions = [],
  sideLabel,
  sidePlaceholder,
  sideOptions = [],
  drinkLabel,
  drinkPlaceholder,
  drinkOptions = [], 
}: RestaurantOrderFormProps) {
  return (
    <RdsStack spacing={1} component="form" className="rds-adaptive-cards__restaurant-order">
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsStack direction="row" spacing={0.5} alignItems="center">
          <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
            {entreeLabel}<span className="rds-adaptive-cards__required">*</span>
          </RdsTypography>
          <InfoOutlined className="rds-adaptive-cards__restaurant-order-info-icon" />
        </RdsStack>
        <Select
          value={entreeValue !== undefined ? entreeValue : entree}
          onChange={onEntreeChange ? onEntreeChange : (e => setEntree(e.target.value as string))}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(entreePlaceholder)}
          IconComponent={ExpandMoreIcon}
          name="entree"
        >
          <MenuItem value="" disabled>{entreePlaceholder}</MenuItem>
          {entreeOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsStack direction="row" spacing={0.5} alignItems="center">
          <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
            {sideLabel}<span className="rds-adaptive-cards__required">*</span>
          </RdsTypography>
          <InfoOutlined className="rds-adaptive-cards__restaurant-order-info-icon" />
        </RdsStack>
        <Select
          value={sideValue !== undefined ? sideValue : side}
          onChange={onSideChange ? onSideChange : (e => setSide(e.target.value as string))}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(sidePlaceholder)}
          IconComponent={ExpandMoreIcon}
          name="side"
        >
          <MenuItem value="" disabled>{sidePlaceholder}</MenuItem>
          {sideOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <RdsStack direction="row" spacing={0.5} alignItems="center">
          <RdsTypography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">
            {drinkLabel}<span className="rds-adaptive-cards__required">*</span>
          </RdsTypography>
          <InfoOutlined className="rds-adaptive-cards__restaurant-order-info-icon" />
        </RdsStack>
        <Select
          value={drinkValue !== undefined ? drinkValue : drink}
          onChange={onDrinkChange ? onDrinkChange : (e => setDrink(e.target.value as string))}
          displayEmpty
          size="small"
          renderValue={renderSelectValue(drinkPlaceholder)}
          IconComponent={ExpandMoreIcon}
          name="drink"
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

InputFormCard.displayName = 'InputFormCard';
ImageGalleryCard.displayName = 'ImageGalleryCard';
FootballScorecardCard.displayName = 'FootballScorecardCard';
CalendarReminderForm.displayName = 'CalendarReminderForm';
ActivityUpdateCard.displayName = 'ActivityUpdateCard';
RestaurantOrderForm.displayName = 'RestaurantOrderForm';

const allowedButtonStyles = ['filled', 'outlined', 'transparent'] as const;

export const getRdsButtonStyle = (style: string) =>
  allowedButtonStyles.includes(style as typeof allowedButtonStyles[number]) ? style as typeof allowedButtonStyles[number] : 'filled';

export type DefaultAdaptiveCardProps = {
  showDismiss: boolean;
  showHeader: boolean;
  cardTitle: string;
  closeIcon: boolean;
  smallText?: string;
  cardText?: string;
  showBtn1: boolean;
  showBtn2: boolean;
  btn1style: string;
  btn2style: string;
  btn1Label: string;
  btn2Label: string;
  onClose: () => void;
};

export function DefaultAdaptiveCard({
  showDismiss,
  showHeader,
  cardTitle,
  closeIcon,
  smallText,
  cardText,
  showBtn1,
  showBtn2,
  btn1style,
  btn2style,
  btn1Label,
  btn2Label,
  onClose,
}: DefaultAdaptiveCardProps) {
  return (
    <RdsBox className="custom-box">
      <RdsStack direction="row" alignItems="center" spacing={1} className="custom-box__title-stack">
        {showDismiss && <RdsBox className="custom-box__circle" />}
        {showHeader && (
          <RdsTypography variant="h5" className="custom-box__title-text">{cardTitle}</RdsTypography>
        )}
        <RdsBox sx={{ flex: 1 }} />
        {closeIcon && (
          <IconButton aria-label="Close" size="small" className="custom-box__close-icon" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </RdsStack>
      {smallText && (
        <RdsTypography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{smallText}</RdsTypography>
      )}
      <RdsBox className="custom-box__slot">
        <RdsTypography variant="body1" color="text.secondary">{cardText || 'Instance Slot'}</RdsTypography>
      </RdsBox>
      <RdsStack direction="row" justifyContent="flex-end" spacing={2} className="custom-box__actions">
        {showBtn1 && (
          <RdsButton
            style={getRdsButtonStyle(btn1style)}
            className={`custom-box__button--cancel${getRdsButtonStyle(btn1style) === 'filled' ? ' rds-button__primary' : ''}`}
            text={btn1Label}
          />
        )}
        {showBtn2 && (
          <RdsButton
            style={getRdsButtonStyle(btn2style)}
            className={`custom-box__button--done${getRdsButtonStyle(btn2style) === 'filled' ? ' rds-button__primary' : ''}`}
            text={btn2Label}
          />
        )}
      </RdsStack>
    </RdsBox>
  );
}

export type AdaptiveTypedCardProps = {
  type: string;
  props: AdaptiveCardProps;
  showHeader: boolean;
  showDismiss: boolean;
  cardTitle: string;
  closeIcon: boolean;
  calendarLabel?: string;
  calendarSmallText?: string;
  inputFormLabel?: string;
  inputFormSmallText?: string;
  showBtn1: boolean;
  showBtn2: boolean;
  btn1Label: string;
  btn2Label: string;
  activityProps?: Partial<{ avatar?: string; name?: string; date?: string; radioOptions?: { value: string; label: string; desc: string }[] }>;
  entree: string;
  setEntree: (v: string) => void;
  side: string;
  setSide: (v: string) => void;
  drink: string;
  setDrink: (v: string) => void;
  onClose: () => void;
};

export function AdaptiveTypedCard({
  type,
  props,
  showHeader,
  showDismiss,
  cardTitle,
  closeIcon,
  calendarLabel,
  calendarSmallText,
  inputFormLabel,
  inputFormSmallText,
  showBtn1,
  showBtn2,
  btn1Label,
  btn2Label,
  activityProps,
  entree,
  setEntree,
  side,
  setSide,
  drink,
  setDrink,
  onClose,
}: AdaptiveTypedCardProps) {
  return (
    <>
      <CardHeader
        className="rds-adaptive-cards__header"
        title={showHeader && (
          <RdsStack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
            {showDismiss && <RdsBox className="rds-adaptive-cards__title-icon" />}
            <RdsTypography variant="h5" className="rds-adaptive-cards__title" fontWeight={600}>{cardTitle}</RdsTypography>
          </RdsStack>
        )}
        action={closeIcon && (
          <IconButton aria-label="Close" size="small" className="rds-adaptive-cards__close-btn" onClick={onClose}><CloseIcon /></IconButton>
        )}
      />

      <CardContent className="rds-adaptive-cards__content">
        {type === "CalenderReminder" && (
          <CalendarReminderForm
            label={calendarLabel}
            smallText={calendarSmallText}
            placeholder={props.calendarReminderPlaceholder}
            calendarReminderLabel={props.calendarReminderLabel}
            sideOptions={props.options || props.sideOptions}
            selectPlaceholder={props.sidePlaceholder}
            snoozeLabel={props.snoozeLabel}
            lateLabel={props.lateLabel}
            showBtn1={showBtn1}
            showBtn2={showBtn2}
            btn1Label={props.snoozeLabel ? undefined : btn1Label}
            btn2Label={props.lateLabel ? undefined : btn2Label}
          />
        )}
        {type === "InputForm" && (
          <InputFormCard
            label={inputFormLabel}
            smallText={inputFormSmallText}
            nameLabel={props.nameLabel}
            namePlaceholder={props.namePlaceholder}
            emailLabel={props.emailLabel}
            emailPlaceholder={props.emailPlaceholder}
            phoneLabel={props.phoneLabel}
            phonePlaceholder={props.phonePlaceholder}
            requiredText={props.requiredText}
            nameValue={props.nameValue}
            emailValue={props.emailValue}
            phoneValue={props.phoneValue}
            onNameChange={props.onNameChange}
            onEmailChange={props.onEmailChange}
            onPhoneChange={props.onPhoneChange}
            nameError={props.nameError}
            emailError={props.emailError}
            phoneError={props.phoneError}
          />
        )}
        {type === "ActivityUpdateCard" && (
          <div className="rds-adaptive-cards__activity-update-wrapper">
            <ActivityUpdateCard
              avatar={activityProps?.avatar ?? ''}
              name={props.name ?? activityProps?.name ?? ''}
              date={props.date ?? activityProps?.date ?? ''}
              cardText={props.cardText}
              radioOptions={activityProps?.radioOptions ?? []}
            />
          </div>
        )}
        {type === "RestaurantOrder" && (
          <RestaurantOrderForm
            entree={entree} setEntree={setEntree}
            side={side} setSide={setSide}
            drink={drink} setDrink={setDrink}
            entreeLabel={props.entreeLabel}
            entreePlaceholder={props.entreePlaceholder}
            entreeOptions={props.entreeOptions}
            sideLabel={props.sideLabel}
            sidePlaceholder={props.sidePlaceholder}
            sideOptions={props.sideOptions}
            drinkLabel={props.drinkLabel}
            drinkPlaceholder={props.drinkPlaceholder}
            drinkOptions={props.drinkOptions}
            entreeValue={props.entreeValue}
            sideValue={props.sideValue}
            drinkValue={props.drinkValue}
            onEntreeChange={props.onEntreeChange}
            onSideChange={props.onSideChange}
            onDrinkChange={props.onDrinkChange}
          />
        )}
      </CardContent>
    </>
  );
}

export type AdaptiveCardActionsProps = {
  type: string;
  showBtn1: boolean;
  showBtn2: boolean;
  btn1style: string;
  btn2style: string;
  btn1Label: string;
  btn2Label: string;
  activityProps?: Partial<{ radioOptions?: { value: string; label: string; desc: string }[] }>;
  onBtn1Click?: () => void;
};

export function AdaptiveCardActions({
  type,
  showBtn1,
  showBtn2,
  btn1style,
  btn2style,
  btn1Label,
  btn2Label,
  activityProps,
  onBtn1Click,
}: AdaptiveCardActionsProps) {
  return (
    <CardActions
      className={`rds-adaptive-cards__actions${type === "RestaurantOrder" ? ' rds-adaptive-cards__actions--restaurant-order' : ''}${type === "ActivityUpdateCard" ? ' rds-adaptive-cards__actions--activity-update' : ''}`}
    >
      {type === "RestaurantOrder" ? (
        showBtn1 ? (
          <RdsButton
            style="filled"
            className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--restaurant-order rds-button__primary"
            fullWidth
            text={btn1Label}
            onClick={onBtn1Click}
          />
        ) : null
      ) : type === "CalenderReminder" ? null : (
        <>
          {showBtn1 && (
            type === "InputForm" ? (
              <RdsButton
                style="filled"
                className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--input-form-button rds-button__primary"
                fullWidth
                text={btn1Label}
                onClick={onBtn1Click}
              />
            ) : type === "ActivityUpdateCard" ? (
              <RdsButtonDropdown
                buttonText={btn1Label}
                styleType="outline"
                options={(activityProps?.radioOptions ?? []).map((opt, idx) => ({
                  id: opt.value ?? idx,
                  label: opt.label,
                  size: "small",
                  styleType: "outline",
                  avatarSrc: undefined,
                  checked: undefined,
                  disabled: undefined
                }))}
                onChange={() => {}}
                state="default"
                showRadio={true}
                showUserAvatar={true}
                multiSelect={false}
                isShowLeftIcon={false}
                rightIcon={<ExpandMoreIcon />}
              />
            ) : (
              <RdsButton
                style={getRdsButtonStyle(btn1style)}
                className={`rds-adaptive-cards__action-btn${type === "RestaurantOrder" ? " rds-adaptive-cards__action-btn--restaurant-order" : ""}${type === "ActivityUpdateCard" ? " rds-adaptive-cards__action-btn--activity" : ""}${getRdsButtonStyle(btn1style) === 'filled' ? ' rds-button__primary' : ''}`}
                size={type === "RestaurantOrder" ? "small" : undefined}
                text={btn1Label}
              />
            )
          )}
          {showBtn2 && (
            type !== "InputForm" && (
              <RdsButton
                style={getRdsButtonStyle(btn2style)}
                className={`rds-adaptive-cards__action-btn${type === "ActivityUpdateCard" ? " rds-adaptive-cards__action-btn--activity" : ""}${getRdsButtonStyle(btn2style) === 'filled' ? ' rds-button__primary' : ''}`}
                size="medium"
                text={capitalizeFirstWord(btn2Label)}
              />
            )
          )}
        </>
      )}
    </CardActions>
  );
}

DefaultAdaptiveCard.displayName = 'DefaultAdaptiveCard';
AdaptiveTypedCard.displayName = 'AdaptiveTypedCard';
AdaptiveCardActions.displayName = 'AdaptiveCardActions';
