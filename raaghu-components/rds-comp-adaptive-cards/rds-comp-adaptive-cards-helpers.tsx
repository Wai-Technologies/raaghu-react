export function getDefaultPropsForType(type: string): Partial<RdsCompAdaptiveCardsProps> {
  switch (type) {
    case 'ActivityUpdateCard':
      return {
        cardTitle: 'Title',
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'outline',
        btn2style: 'filled',
        btn1Label: 'Button',
        btn2Label: 'Click Here',
        titleIcon: false,
        closeIcon: false,
        activityProps: {
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU',
          name: 'Jane Doe',
          date: 'Created Wed, 30 Apr 2025',
          cardText: 'Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.',
          radioOptions: [
            { value: 'option1', label: 'Sub - Title 1', desc: 'Description' },
            { value: 'option2', label: 'Sub - Title 2', desc: 'Description' },
          ],
        },
      };
    case 'CalenderReminder':
      return {
        cardTitle: 'Title',
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'outline',
        btn2style: 'outline',
        btn1Label: 'Snooze',
        btn2Label: 
          "I'll be Late",
        block: false,
        smallText: '20:30 - 09:30',
        label: 'Conf Room 112/3377 (10)',
        titleIcon: false,
        closeIcon: false,
      };
    case 'ImageGallery':
      return {
        cardTitle: 'Here are some cool photos',
        smallText: 'Sorry some of them are repeats',
        images: [
          '/assets/Image1.png', '/assets/Image2.png', '/assets/Image3.png', '/assets/Image4.png', '/assets/Image5.png', '/assets/Image6.png', '/assets/Image7.png', '/assets/Image8.png', '/assets/Image9.png', '/assets/Image10.png', '/assets/Image11.png', '/assets/Image12.png',
        ],
      };
    case 'InputForm':
      return {
        cardTitle: 'Tell us about yourself',
        title: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Submit',
        block: true,
        smallText: "Don't worry, we'll never share or sell your information.",
        label: 'We just need a few more details to get you booked for the trip of a lifetime!',
        titleIcon: false,
        closeIcon: false,
  // inputForm removed
      };
    case 'RestaurantOrder':
      return {
        cardTitle: 'Malt & Vine Order Form',
        title: true,
        showBtn1: true,
        showBtn2: false,
        btn1style: 'filled',
        btn1Label: 'Place Order',
        block: true,
        titleIcon: false,
        closeIcon: false,
      };
    case 'FootballScorecard':
      return {
        closeIcon: true,
        footballProps: {
          leagueName: 'La Liga',
          leagueAvatar: 'assets/scorecard1.png',
          isLive: true,
          date: '30th Apr 2025',
          isFinal: true,
          homeTeam: { name: 'Real Madrid', logo: 'assets/scorecard1.png', status: 'Home' },
          awayTeam: { name: 'Barcelona', logo: 'assets/scorecard2.png', status: 'Away' },
          homeScore: 2,
          awayScore: 2,
          time: '90:00',
        },
      };
    default:
      return {
        cardTitle: 'Title',
        title: true,
        showBtn1: true,
        showBtn2: true,
        btn1style: 'transparent',
        btn2style: 'filled',
        btn1Label: 'Cancel',
        btn2Label: 'Done',
        block: false,
        type: 'Default',
        titleIcon: true,
        closeIcon: true,
      };
  }
}
import React from "react";
import {
  Box, Card, CardContent, CardHeader, CardActions, Typography, Avatar, IconButton, Button, TextField, Select, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup, Chip, ImageList, ImageListItem, Stack
} from "@mui/material";
  import { useState } from 'react';
  // InputFormCard: visually matches the provided image
  export function InputFormCard({ label, smallText }: { label?: string, smallText?: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    return (
      <div >
        <h2 className="rds-adaptive-cards__input-form-title">Tell us about yourself</h2>
        <div className="rds-adaptive-cards__input-form-label">{label}</div>
        <div className="rds-adaptive-cards__input-form-small-text">{smallText}</div>
        <div className="rds-adaptive-cards__input-form-field">
          <label className="rds-adaptive-cards__input-form-field-label">Name (Last, First) <span className="rds-adaptive-cards__required">*</span></label>
          <input className="rds-adaptive-cards__action-btn--input-form" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="rds-adaptive-cards__input-form-field">
          <label className="rds-adaptive-cards__input-form-field-label">Email <span className="rds-adaptive-cards__required">*</span></label>
          <input className="rds-adaptive-cards__action-btn--input-form" placeholder="Enter Email" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="rds-adaptive-cards__input-form-field">
          <label className="rds-adaptive-cards__input-form-field-label">Phone Number <span className="rds-adaptive-cards__required">*</span></label>
          <input className="rds-adaptive-cards__action-btn--input-form" placeholder="Enter Phone Number" required type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>
    );
  }
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
  title?: boolean;
  titleIcon: boolean;
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
  // inputForm removed
  block?: boolean;
  images?: string[];
  footballProps?: Partial<FootballScorecardCardProps>;
  activityProps?: Partial<ActivityUpdateCardProps>;
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
// Subcomponents
// =========================
export function ImageGalleryCard({ cardTitle, smallText, images }: ImageGalleryCardProps) {
  return (
    <Card className="rds-adaptive-cards rds-adaptive-cards--image-gallery">
      <CardHeader
        className="rds-adaptive-cards__header"
    title={<Typography variant="h6" className="rds-adaptive-cards__title" sx={{ fontWeight: 400 }}>{cardTitle}</Typography>}
      />
      <CardContent className="rds-adaptive-cards__content">
        <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__small-text">{smallText}</Typography>
        <ImageList cols={4} rowHeight={164} className="rds-adaptive-cards__image-list">
          {images && images.map((src, index) => (
            <ImageListItem key={index} className="rds-adaptive-cards__image-list-item">
              <img src={src} alt={`image${index + 1}`} loading="lazy" className="rds-adaptive-cards__image" />
            </ImageListItem>
          ))}
        </ImageList>
      </CardContent>
    </Card>
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
}: FootballScorecardCardProps) {
  return (
    <Card className="rds-adaptive-cards rds-adaptive-cards--football-scorecard">
      <CardContent className="rds-adaptive-cards__content">
        <Stack className="rds-adaptive-cards__football-header" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ width: '100%', position: 'relative' }}>
            <Avatar src={leagueAvatar} className="rds-adaptive-cards__football-league-avatar" />
              <Typography variant="subtitle1" className="rds-adaptive-cards__football-league" align="center" sx={{ ml: 0.5, position: 'relative', fontWeight: 400 }}>
              {leagueName}
              {isLive && (
                <Chip
                  label="Live"
                  color="error"
                  size="small"
                  icon={<svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="2" fill="currentColor" /></svg>}
                  className="rds-adaptive-cards__football-live"
                  sx={{
                    position: 'absolute',
                    right: -90,
                    top: 2,
                    minWidth: '36px',
                    height: '16px',
                    fontSize: '8px',
                    padding: '0 4px',
                    borderRadius: '8px',
                  }}
                />
              )}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-date" align="center">
            {date}
          </Typography>
          {isFinal && (
            <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-final" align="center">
              Final
            </Typography>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" className="rds-adaptive-cards__football-body">
          <Stack alignItems="center" className="rds-adaptive-cards__football-team rds-adaptive-cards__football-team--home">
            <Box className="rds-adaptive-cards__football-logo" sx={{ border: 'none', boxShadow: 'none' }}>
              <img src={homeTeam.logo} alt={homeTeam.name} className="rds-adaptive-cards__football-img" />
            </Box>
            <Typography variant="body1" className="rds-adaptive-cards__football-team-name">{homeTeam.name}</Typography>
            <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{homeTeam.status}</Typography>
          </Stack>

          <Stack alignItems="center" className="rds-adaptive-cards__football-score-section">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h3" className="rds-adaptive-cards__football-score">{homeScore}</Typography>
              <Typography variant="h3" className="rds-adaptive-cards__football-score">:</Typography>
              <Typography variant="h3" className="rds-adaptive-cards__football-score">{awayScore}</Typography>
            </Stack>
            <Chip label={time} className="rds-adaptive-cards__football-time" />
          </Stack>

          <Stack alignItems="center" className="rds-adaptive-cards__football-team rds-adaptive-cards__football-team--away">
            <Box className="rds-adaptive-cards__football-logo" sx={{ border: 'none', boxShadow: 'none' }}>
              <img src={awayTeam.logo} alt={awayTeam.name} className="rds-adaptive-cards__football-img rds-adaptive-cards__football-img--barca" />
            </Box>
            <Typography variant="body1" className="rds-adaptive-cards__football-team-name">{awayTeam.name}</Typography>
            <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__football-team-status">{awayTeam.status}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function CalendarReminderForm({ label, smallText }: { label?: string, smallText?: string }) {
  return (
    <Stack spacing={2} className="rds-adaptive-cards__calendar-reminder">
      <Box className="rds-adaptive-cards__calendar-reminder-labels">
        <Typography variant="subtitle1" className="rds-adaptive-cards__calendar-reminder-label">{label}</Typography>
        <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__calendar-reminder-small-text">{smallText}</Typography>
      </Box>
      <div className="rds-adaptive-cards__calendar-reminder-select-form">
        <Typography variant="subtitle2" className="rds-adaptive-cards__calendar-reminder-label">Snooze for</Typography>
        <FormControl fullWidth size="small">
          <Select
            defaultValue=""
            size="small"
            displayEmpty
            renderValue={(selected) => selected === '' ? (
              <span className="rds-adaptive-cards__calendar-reminder-placeholder">Select duration</span>
            ) : (selected === '5min' ? '5 Minutes' : selected === '15min' ? '15 Minutes' : selected === '30min' ? '30 Minutes' : '')}
            IconComponent={props => <CustomChevronIcon {...props} className="rds-adaptive-cards__calendar-reminder-select-icon" />}
          >
            <MenuItem value="" disabled>Select duration</MenuItem>
            <MenuItem value="5min">5 Minutes</MenuItem>
            <MenuItem value="15min">15 Minutes</MenuItem>
            <MenuItem value="30min">30 Minutes</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Stack direction="row" spacing={1} justifyContent="flex-end" className="rds-adaptive-cards__calendar-reminder-actions">
        <Button variant="outlined" color="primary" className="rds-adaptive-cards__action-btn" size="small">
          Snooze
        </Button>
        <Button variant="outlined" color="primary" className="rds-adaptive-cards__action-btn" size="small">
          I'll be Late
        </Button>
      </Stack>
    </Stack>
  );
}

export function ActivityUpdateCard({ avatar, name, date, cardText, radioOptions }: ActivityUpdateCardProps) {
  return (
    <Stack spacing={2} className="rds-adaptive-cards__activity-update">
      <Stack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__activity-update-header">
        <Avatar src={avatar} className="rds-adaptive-cards__activity-update-avatar" />
        <Stack>
          <Typography variant="subtitle1" className="rds-adaptive-cards__activity-update-name" sx={{ fontWeight: 400 }}>{name}</Typography>
          <Typography variant="body2" color="text.secondary" className="rds-adaptive-cards__activity-update-date">{date}</Typography>
        </Stack>
      </Stack>
      <Typography variant="body1" color="text.secondary" className="rds-adaptive-cards__activity-update-text">{cardText}</Typography>
      <RadioGroup className="rds-adaptive-cards__activity-update-radio-group">
        {radioOptions && radioOptions.map(opt => (
          <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={<span>{opt.label}: <span className="rds-adaptive-cards__activity-update-radio-desc">{opt.desc}</span></span>} className="rds-adaptive-cards__activity-update-radio" />
        ))}
      </RadioGroup>
    </Stack>
  );
}

export function RestaurantOrderForm({ entree, setEntree, side, setSide, drink, setDrink }: { entree: string, setEntree: (v: string) => void, side: string, setSide: (v: string) => void, drink: string, setDrink: (v: string) => void }) {
  return (
    <Stack spacing={1} component="form" className="rds-adaptive-cards__restaurant-order">
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <Typography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">Which entree would you like?<span className="rds-adaptive-cards__required">*</span></Typography>
        <Select
          value={entree}
          onChange={e => setEntree(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue("Select an entree")}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>Select an entree</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <Typography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">Which side would you like?<span className="rds-adaptive-cards__required">*</span></Typography>
        <Select
          value={side}
          onChange={e => setSide(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue("Select a side")}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>Select a side</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth required className="rds-adaptive-cards__restaurant-order-form">
        <Typography variant="subtitle2" className="rds-adaptive-cards__restaurant-order-label">Which drink would you like?<span className="rds-adaptive-cards__required">*</span></Typography>
        <Select
          value={drink}
          onChange={e => setDrink(e.target.value as string)}
          displayEmpty
          size="small"
          renderValue={renderSelectValue("Select a drink")}
          IconComponent={CustomChevronIcon}
        >
          <MenuItem value="" disabled>Select a drink</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
