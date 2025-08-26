import React, { useState } from "react";
import './rds-comp-adaptive-cards.scss';
import {RdsBox,RdsTypography,RdsStack} from "../../raaghu-elements";
import RdsCardDetail from "../../raaghu-elements/rds-card-detail/rds-card-detail";
import { CardHeader, CardContent,Button, CardActions, IconButton} from "@mui/material";
import {  Close as CloseIcon,ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import { 
  FootballScorecardCard,
  ActivityUpdateCard,
  CalendarReminderForm, 
  RestaurantOrderForm,
  ImageGalleryCard,
  InputFormCard,
  capitalizeFirstWord,
  AdaptiveCardProps,
} from "./rds-comp-adaptive-cards-helpers";

// Types for backward compatibility props
type FootballProps = {
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
};
type ActivityProps = {
  avatar?: string;
  name?: string;
  date?: string;
  radioOptions?: { value: string; label: string; desc: string }[];
};

const RdsCompAdaptiveCards = (props: AdaptiveCardProps) => {
  const type = props.type || 'Default';
  const variantDefaults = {
    cardTitle: 'Title',
    showHeader: false,
    showBtn1: false,
    showBtn2: false,
    btn1style: 'transparent',
    btn2style: 'filled',
    btn1Label: 'Cancel',
    btn2Label: 'Done',
    type: 'Default',
    showDismiss: false,
    closeIcon: false,
    label: '',
    smallText: '',
  };
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
    footballProps = {} as Partial<FootballProps>,
    activityProps = {} as Partial<ActivityProps>,
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
        finalText={merged.finalText ?? footballProps?.finalText ?? 'Final'} closeIcon={false}      />
    );
  }

  // ----- Main Card Layout -----
  return (
    visible && (
      <RdsCardDetail className={`rds-adaptive-cards rds-adaptive-cards--default${type === 'Default' ? ' is-default-selected' : ''}`}>
        
        {/* Default Type Layout */}
        {type === 'Default' ? (
          <RdsBox className="custom-box">
            <RdsStack direction="row" alignItems="center" spacing={1} className="custom-box__title-stack">
              {showDismiss && <RdsBox className="custom-box__circle" />}
              {showHeader && (
                <RdsTypography variant="h5" className="custom-box__title-text">{cardTitle}</RdsTypography>
              )}
              <RdsBox sx={{ flex: 1 }} />
              {closeIcon && (
                <IconButton size="small" className="custom-box__close-icon" onClick={() => setVisible(false)}>
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
                <Button variant={btn1style === "filled" ? "contained" : btn1style === "outline" ? "outlined" : "text"} className="custom-box__button--cancel">{btn1Label || 'Cancel'}</Button>
              )}
              {showBtn2 && (
                <Button variant={btn2style === "filled" ? "contained" : btn2style === "outline" ? "outlined" : "text"} className="custom-box__button--done">{btn2Label || 'Done'}</Button>
              )}
            </RdsStack>
          </RdsBox>
        ) : (
          <>
            {/* Card Header */}
            <CardHeader
              className="rds-adaptive-cards__header"
              title={showHeader && ( 
                <RdsStack direction="row" spacing={2} alignItems="center" className="rds-adaptive-cards__header-title-row">
                  {showDismiss && <RdsBox className="rds-adaptive-cards__title-icon" />}
                  <RdsTypography variant="h5" className="rds-adaptive-cards__title" fontWeight={600}>{cardTitle}</RdsTypography>
                </RdsStack>
              )}
              action={closeIcon && (
                <IconButton size="small" className="rds-adaptive-cards__close-btn" onClick={() => setVisible(false)}><CloseIcon /></IconButton>
              )}
            />

            {/* Card Content by Type */}
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
                />
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
                  entreeLabel={props.entreeLabel} 
                  entreePlaceholder={props.entreePlaceholder}
                  entreeOptions={props.entreeOptions}
                  sideLabel={props.sideLabel}
                  sidePlaceholder={props.sidePlaceholder}
                  sideOptions={props.sideOptions}
                  drinkLabel={props.drinkLabel}
                  drinkPlaceholder={props.drinkPlaceholder}
                  drinkOptions={props.drinkOptions}
                />
              )}
            </CardContent>

            {/* Card Actions by Type */}
            <CardActions
              className={`rds-adaptive-cards__actions${type === "RestaurantOrder" ? ' rds-adaptive-cards__actions--restaurant-order' : ''}`}
              {...(type === "ActivityUpdateCard" ? { style: { justifyContent: "flex-end", display: "flex" } } : {})}
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
      </RdsCardDetail>
    )
  );
};

RdsCompAdaptiveCards.displayName = 'RdsCompAdaptiveCards';
export default RdsCompAdaptiveCards;