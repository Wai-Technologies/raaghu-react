import React, { useState } from "react";
import './rds-comp-adaptive-cards.scss';
import {
  Card, CardHeader, CardContent, CardActions,
  IconButton, Button, Typography, Box, Stack
} from "@mui/material";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon
} from "@mui/icons-material";
import {
  FootballScorecardCard,
  ActivityUpdateCard,
  CalendarReminderForm,
  RestaurantOrderForm,
  ImageGalleryCard,
  InputFormCard,
  capitalizeFirstWord,
  RdsCompAdaptiveCardsProps,
  getDefaultPropsForType
} from "./rds-comp-adaptive-cards-helpers";

 
// =========================
// Default Props
// =========================


const defaultRdsCompAdaptiveCardsProps: Partial<RdsCompAdaptiveCardsProps> = {
  showHeader: true,
  showDismiss: true,
  cardTitle: '',
  showBtn1: true,
  showBtn2: true,
  btn1style: 'filled',
  btn2style: 'outlined',
  btn1Label: 'Button 1',
  btn2Label: 'Click Here',
  smallText: '',
  cardText: '',
  type: 'Default',
  closeIcon: false,
  label: '',
  block: false,
  images: [],
  footballProps: {},
  activityProps: {},
};


// =========================
// Main Component
// =========================

const RdsCompAdaptiveCards = (props: RdsCompAdaptiveCardsProps) => {
  // ----- Prop Merging -----
  const type = props.type || 'Default';
  const variantDefaults = getDefaultPropsForType(type);
  let merged = { ...variantDefaults, ...props };
  
  const {
    showHeader,
    showDismiss,
    cardTitle,
    showBtn1,
    showBtn2,
    btn1style,
    btn2style,
    btn1Label,
    btn2Label,
    smallText,
    cardText,
    closeIcon,
    label,
    block,
    images,
    // FootballScorecard direct props
    leagueName,
    leagueAvatar,
    isLive,
    matchDate,
    isFinal,
    homeTeamName,
    homeTeamLogo,
    homeTeamStatus,
    awayTeamName,
    awayTeamLogo,
    awayTeamStatus,
    homeScore,
    awayScore,
    time,
    footballProps,
    activityProps,
  } = merged;

  // ----- Derived Props -----
  const calendarLabel = type === "CalenderReminder" ? (label || variantDefaults.label) : label;
  const calendarSmallText = type === "CalenderReminder" ? (smallText || variantDefaults.smallText) : smallText;
  const inputFormLabel = type === "InputForm" ? (label || variantDefaults.label) : undefined;
  const inputFormSmallText = type === "InputForm" ? (smallText || variantDefaults.smallText) : undefined;

  // ----- State -----
  const [entree, setEntree] = useState("");
  const [side, setSide] = useState("");
  const [drink, setDrink] = useState("");
  // Card visibility state
  const [visible, setVisible] = useState(true);

  // ----- Render by Type -----
  if (!visible) return null;
  if (type === "ImageGallery") {
    return (
      <ImageGalleryCard 
        cardTitle={cardTitle} 
        smallText={smallText} 
        images={images || []}
        showHeader={showHeader}
        closeIcon={closeIcon}
        showDismiss={showDismiss}
      />
    );
  }
  if (type === "FootballScorecard") {
    // Prefer direct props, fallback to footballProps for backward compatibility
    return (
      <FootballScorecardCard
        leagueName={leagueName ?? footballProps?.leagueName ?? ''}
        leagueAvatar={leagueAvatar ?? footballProps?.leagueAvatar ?? ''}
        isLive={isLive ?? footballProps?.isLive ?? false}
        date={matchDate ?? footballProps?.date ?? ''}
        isFinal={isFinal ?? footballProps?.isFinal ?? false}
        homeTeam={{
          name: homeTeamName ?? footballProps?.homeTeam?.name ?? '',
          logo: homeTeamLogo ?? footballProps?.homeTeam?.logo ?? '',
          status: homeTeamStatus ?? footballProps?.homeTeam?.status ?? '',
        }}
        awayTeam={{
          name: awayTeamName ?? footballProps?.awayTeam?.name ?? '',
          logo: awayTeamLogo ?? footballProps?.awayTeam?.logo ?? '',
          status: awayTeamStatus ?? footballProps?.awayTeam?.status ?? '',
        }}
        homeScore={homeScore ?? footballProps?.homeScore ?? 0}
        awayScore={awayScore ?? footballProps?.awayScore ?? 0}
        time={time ?? footballProps?.time ?? ''}
      />
    );
  }

  // ----- Main Card Layout -----
  return (
    visible && (
      <Card className={`rds-adaptive-cards rds-adaptive-cards--default${type === 'Default' ? ' is-default-selected' : ''}`}>
        {/* Default Type Layout */}
        {type === 'Default' ? (
          <Box className="custom-box">
            <Stack direction="row" alignItems="center" spacing={1} className="custom-box__title-stack">
              {showDismiss && <Box className="custom-box__circle" />}
              {showHeader && (
                <Typography variant="h5" className="custom-box__title-text">{cardTitle}</Typography>
              )}
              <Box sx={{ flex: 1 }} />
              {closeIcon && (
                <IconButton size="small" className="custom-box__close-icon" onClick={() => setVisible(false)}>
                  <CloseIcon />
                </IconButton>
              )}
            </Stack>
            {smallText && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>{smallText}</Typography>
            )}
            <Box className="custom-box__slot">
              <Typography variant="body1" color="text.secondary">{cardText || 'Instance Slot'}</Typography>
            </Box>
            <Stack direction="row" justifyContent="flex-end" spacing={2} className="custom-box__actions">
              {showBtn1 && (
                <Button variant={btn1style === "filled" ? "contained" : btn1style === "outline" ? "outlined" : "text"} className="custom-box__button--cancel">{btn1Label || 'Cancel'}</Button>
              )}
              {showBtn2 && (
                <Button variant={btn2style === "filled" ? "contained" : btn2style === "outline" ? "outlined" : "text"} className="custom-box__button--done">{btn2Label || 'Done'}</Button>
              )}
            </Stack>
          </Box>
        ) : (
          <>
            {/* Card Header */}
            <CardHeader
              className="rds-adaptive-cards__header"
              title={showHeader && (
                <Stack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
                  {showDismiss && <Box className="rds-adaptive-cards__title-icon" />}
                  <Typography variant="h5" className="rds-adaptive-cards__title">{cardTitle}</Typography>
                </Stack>
              )}
              action={closeIcon && (
                <IconButton size="small" className="rds-adaptive-cards__close-btn" onClick={() => setVisible(false)}><CloseIcon /></IconButton>
              )}
            />

            {/* Card Content by Type */}
            <CardContent className="rds-adaptive-cards__content">
              {type === "CalenderReminder" && (
                <CalendarReminderForm label={calendarLabel} smallText={calendarSmallText} />
              )}
              {type === "InputForm" && (
                <InputFormCard label={inputFormLabel} smallText={inputFormSmallText} />
              )}
              {type === "ActivityUpdateCard" && (
                  <ActivityUpdateCard
                    avatar={activityProps?.avatar ?? ''}
                    name={props.name ?? activityProps?.name ?? ''}
                    date={props.date ?? activityProps?.date ?? ''}
                    cardText={props.cardText}
                    radioOptions={activityProps?.radioOptions ?? []}
                  />
              )}
              {type === "RestaurantOrder" && (
                <RestaurantOrderForm
                  entree={entree} setEntree={setEntree}
                  side={side} setSide={setSide}
                  drink={drink} setDrink={setDrink}
                />
              )}
            </CardContent>

            {/* Card Actions by Type */}
            <CardActions
              className={`rds-adaptive-cards__actions${type === "RestaurantOrder" ? ' rds-adaptive-cards__actions--restaurant-order' : ''}`}
            >
              {type === "RestaurantOrder" ? (
                showBtn1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--restaurant-order"
                    fullWidth
                  >
                    {btn1Label}
                  </Button>
                ) : null
              ) : type === "CalenderReminder" ? null : (
                <>
                  {showBtn1 && (
                    type === "InputForm" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--input-form-button"
                        fullWidth
                      >
                        {btn1Label}
                      </Button>
                    ) : type === "ActivityUpdateCard" ? (
                      <Button
                        variant="outlined"
                        endIcon={<ExpandMoreIcon />}
                        className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--activity"
                        size="small"
                      >
                        {capitalizeFirstWord(btn1Label || 'Button')}
                      </Button>
                    ) : (
                      <Button
                        variant={btn1style === "filled" ? "contained" : btn1style === "outline" ? "outlined" : "text"}
                        color="primary"
                        className={`rds-adaptive-cards__action-btn${type === "RestaurantOrder" ? " rds-adaptive-cards__action-btn--restaurant-order" : ""}`}
                        size={type === "RestaurantOrder" ? "small" : undefined}
                      >
                        {btn1Label}
                      </Button>
                    )
                  )}
                  {showBtn2 && (
                    type !== "InputForm" && (
                      <Button
                        variant={btn2style === "filled" ? "contained" : btn2style === "outline" ? "outlined" : "text"}
                        color="primary"
                        className="rds-adaptive-cards__action-btn"
                        size="small"
                      >
                        {capitalizeFirstWord(btn2Label || 'Click Here')}
                      </Button>
                    )
                  )}
                </>
              )}
            </CardActions>
          </>
        )}
      </Card>
    )
  );
};

// =========================
// Export
// =========================
RdsCompAdaptiveCards.displayName = 'RdsCompAdaptiveCards';
export default RdsCompAdaptiveCards;