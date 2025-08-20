import React, { useState } from "react";
import './rds-comp-adaptive-cards.scss';
import { Card, CardHeader, CardContent, CardActions, IconButton, Button, Typography, Box, Stack } from "@mui/material";
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  FootballScorecardCard,
  ActivityUpdateCard,
  CalendarReminderForm,
  RestaurantOrderForm,
  ImageGalleryCard,
  CustomChevronIcon,
  capitalizeFirstWord,
  renderSelectValue,
  RdsCompAdaptiveCardsProps,
  getDefaultPropsForType,
  InputFormCard
} from "./rds-comp-adaptive-cards-helpers";

// =========================
// Main Component
// =========================

const defaultRdsCompAdaptiveCardsProps: Partial<RdsCompAdaptiveCardsProps> = {
  showHeader: false,
  showDismiss: false,
  cardTitle: '',
  showBtn1: false,
  showBtn2: false,
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

const RdsCompAdaptiveCards = (props: RdsCompAdaptiveCardsProps) => {
  const type = props.type || 'Default';
  const variantDefaults = getDefaultPropsForType(type);
  let merged = { ...variantDefaults, ...props };
  // Always set smallText for ImageGallery type
  if (type === 'ImageGallery') {
    merged = { ...merged, smallText: 'Sorry some of them are repeats' };
  }
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
    footballProps,
    activityProps,
  } = merged;

  // Use default label and smallText for CalenderReminder if empty
  const calendarLabel = type === "CalenderReminder" ? (label || variantDefaults.label) : label;
  const calendarSmallText = type === "CalenderReminder" ? (smallText || variantDefaults.smallText) : smallText;
    // Show label and smallText only when InputForm is selected
    const inputFormLabel = type === "InputForm" ? (label || variantDefaults.label) : undefined;
    const inputFormSmallText = type === "InputForm" ? (smallText || variantDefaults.smallText) : undefined;
  // State for RestaurantOrder select values
  const [entree, setEntree] = useState("");
  const [side, setSide] = useState("");
  const [drink, setDrink] = useState("");

  if (type === "ImageGallery") {
    return <ImageGalleryCard cardTitle={cardTitle} smallText={smallText} images={images || []} />;
  }
  if (type === "FootballScorecard") {
    const fp = footballProps || {};
    return (
      <FootballScorecardCard
        leagueName={fp.leagueName ?? ''}
        leagueAvatar={fp.leagueAvatar ?? ''}
        isLive={fp.isLive ?? false}
        date={fp.date ?? ''}
        isFinal={fp.isFinal ?? false}
        homeTeam={fp.homeTeam ?? { name: '', logo: '', status: '' }}
        awayTeam={fp.awayTeam ?? { name: '', logo: '', status: '' }}
        homeScore={fp.homeScore ?? 0}
        awayScore={fp.awayScore ?? 0}
        time={fp.time ?? ''}
      />
    );
  }
  return (
  <Card className={`rds-adaptive-cards rds-adaptive-cards--default${type === 'Default' ? ' is-default-selected' : ''}`}> 
        {type === 'Default' ? (
          <Box className="custom-box">
            <Stack direction="row" alignItems="center" spacing={1} className="custom-box__title-stack">
              <Box className="custom-box__circle" />
              <Typography variant="h5" className="custom-box__title-text">Title</Typography>
              {closeIcon && (
                <IconButton size="small" className="custom-box__close-icon">
                  <CloseIcon />
                </IconButton>
              )}
            </Stack>
            <Box className="custom-box__slot">
              <Typography variant="body1" color="text.secondary">Instance Slot</Typography>
            </Box>
            <Stack direction="row" justifyContent="flex-end" spacing={2} className="custom-box__actions">
              <Button variant="text" className="custom-box__button--cancel">Cancel</Button>
              <Button variant="contained" className="custom-box__button--done">Done</Button>
            </Stack>
          </Box>
        ) : (
        <>
          <CardHeader
            className="rds-adaptive-cards__header"
            title={showHeader && (
              <Stack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
                {showDismiss && <Box className="rds-adaptive-cards__title-icon" />}
                <Typography variant="h5" className="rds-adaptive-cards__title">{cardTitle}</Typography>
              </Stack>
            )}
            action={closeIcon && (
              <IconButton size="small" className="rds-adaptive-cards__close-btn"><CloseIcon /></IconButton>
            )}
          />

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
                name={activityProps?.name ?? ''}
                date={activityProps?.date ?? ''}
                cardText={activityProps?.cardText}
                radioOptions={activityProps?.radioOptions ?? []}
              />
            )}
            {type === "RestaurantOrder" && (
              <RestaurantOrderForm entree={entree} setEntree={setEntree} side={side} setSide={setSide} drink={drink} setDrink={setDrink} />
            )}
          </CardContent>

          <CardActions
            className={
              `rds-adaptive-cards__actions${type === "RestaurantOrder" ? ' rds-adaptive-cards__actions--restaurant-order' : ''}`
            }
          >
            {type === "RestaurantOrder" ? (
              <Button
                variant="contained"
                color="primary"
                className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--restaurant-order"
                fullWidth
              >
                Place Order
              </Button>
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
                      Submit
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
  );
};

export default RdsCompAdaptiveCards;