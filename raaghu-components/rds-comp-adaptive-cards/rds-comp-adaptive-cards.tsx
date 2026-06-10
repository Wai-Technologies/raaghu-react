import { useCallback, useMemo, useState } from "react";
import clsx from 'clsx';
import "./rds-comp-adaptive-cards.scss";
import {
  RdsBox,
  RdsTypography,
  RdsStack,
  RdsButtonDropdown,
  RdsButton,
} from "../../raaghu-elements";
import RdsCardDetail from "../../raaghu-elements/rds-card-detail/rds-card-detail";
import { CardHeader, CardContent, CardActions, IconButton } from "@mui/material";
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
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

const ALLOWED_BUTTON_STYLES = ["filled", "outlined", "transparent"] as const;
type ButtonStyle = (typeof ALLOWED_BUTTON_STYLES)[number];

const VARIANT_DEFAULTS = {
  cardTitle: "Title",
  showHeader: false,
  showBtn1: false,
  showBtn2: false,
  btn1style: "transparent",
  btn2style: "filled",
  btn1Label: "Cancel",
  btn2Label: "Done",
  type: "Default",
  showDismiss: false,
  closeIcon: false,
  label: "",
  smallText: "",
};

const getRdsButtonStyle = (style: unknown): ButtonStyle =>
  ALLOWED_BUTTON_STYLES.includes(style as ButtonStyle) ? (style as ButtonStyle) : "filled";

const RdsCompAdaptiveCards = (props: AdaptiveCardProps) => {
  const type = props.type || "Default";
  const merged = useMemo(() => ({ ...VARIANT_DEFAULTS, ...props }), [props]);

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

  const resolvedBtn1Style = getRdsButtonStyle(btn1style);
  const resolvedBtn2Style = getRdsButtonStyle(btn2style);

  const calendarLabel =
    type === "CalenderReminder" ? label || VARIANT_DEFAULTS.label : label;
  const calendarSmallText =
    type === "CalenderReminder" ? smallText || VARIANT_DEFAULTS.smallText : smallText;
  const inputFormLabel = type === "InputForm" ? label || VARIANT_DEFAULTS.label : undefined;
  const inputFormSmallText =
    type === "InputForm" ? smallText || VARIANT_DEFAULTS.smallText : undefined;

  const [entree, setEntree] = useState("");
  const [side, setSide] = useState("");
  const [drink, setDrink] = useState("");
  const [visible, setVisible] = useState(true);

  const handleDismiss = useCallback(() => setVisible(false), []);

  const activityDropdownOptions = useMemo(
    () =>
      (activityProps?.radioOptions ?? []).map((opt, idx) => ({
        id: opt.value ?? idx,
        label: opt.label,
        size: "small" as const,
        styleType: "outline" as const,
        avatarSrc: undefined,
        checked: undefined,
        disabled: undefined,
      })),
    [activityProps?.radioOptions]
  );

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
    return (
      <FootballScorecardCard
        leagueName={leagueName ?? footballProps?.leagueName ?? ""}
        leagueAvatar={leagueAvatar ?? footballProps?.leagueAvatar ?? ""}
        isLive={isLive ?? footballProps?.isLive ?? false}
        date={matchDate ?? footballProps?.date ?? ""}
        isFinal={isFinal ?? footballProps?.isFinal ?? false}
        homeTeam={{
          name: homeTeamName ?? footballProps?.homeTeam?.name ?? "",
          logo: homeTeamLogo ?? footballProps?.homeTeam?.logo ?? "",
          status: homeTeamStatus ?? footballProps?.homeTeam?.status ?? "",
        }}
        awayTeam={{
          name: awayTeamName ?? footballProps?.awayTeam?.name ?? "",
          logo: awayTeamLogo ?? footballProps?.awayTeam?.logo ?? "",
          status: awayTeamStatus ?? footballProps?.awayTeam?.status ?? "",
        }}
        homeScore={homeScore ?? footballProps?.homeScore ?? 0}
        awayScore={awayScore ?? footballProps?.awayScore ?? 0}
        time={time ?? footballProps?.time ?? ""}
        finalText={merged.finalText ?? footballProps?.finalText ?? "Final"}
        closeIcon={false}
      />
    );
  }

  return (
    visible && (
      <RdsCardDetail
        className={clsx("rds-adaptive-cards", "rds-adaptive-cards--default")}
      >
        {type === "Default" ? (
          <RdsBox className="custom-box">
            <RdsStack
              direction="row"
              alignItems="center"
              spacing={1}
              className="custom-box__title-stack"
            >
              {showDismiss && <RdsBox className="custom-box__circle" />}
              {showHeader && (
                <RdsTypography variant="h5" className="custom-box__title-text">
                  {cardTitle}
                </RdsTypography>
              )}
              <RdsBox sx={{ flex: 1 }} />
              {closeIcon && (
                <IconButton
                  aria-label="Close"
                  size="small"
                  className="custom-box__close-icon"
                  onClick={handleDismiss}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </RdsStack>
            {smallText && (
              <RdsTypography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {smallText}
              </RdsTypography>
            )}
            <RdsBox className="custom-box__slot">
              <RdsTypography variant="body1" color="text.secondary">
                {cardText || "Instance Slot"}
              </RdsTypography>
            </RdsBox>
            <RdsStack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              className="custom-box__actions"
            >
              {showBtn1 && (
                <RdsButton
                  style={resolvedBtn1Style}
                  className={clsx(
                    "custom-box__button--cancel",
                    resolvedBtn1Style === "filled" && "rds-button__primary"
                  )}
                  text={btn1Label}
                />
              )}
              {showBtn2 && (
                <RdsButton
                  style={resolvedBtn2Style}
                  className={clsx(
                    "custom-box__button--done",
                    resolvedBtn2Style === "filled" && "rds-button__primary"
                  )}
                  text={btn2Label}
                />
              )}
            </RdsStack>
          </RdsBox>
        ) : (
          <>
            <CardHeader
              className="rds-adaptive-cards__header"
              title={
                showHeader && (
                  <RdsStack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="rds-adaptive-cards__header-title-row"
                  >
                    {showDismiss && <RdsBox className="rds-adaptive-cards__title-icon" />}
                    <RdsTypography
                      variant="h5"
                      className="rds-adaptive-cards__title"
                      fontWeight={600}
                    >
                      {cardTitle}
                    </RdsTypography>
                  </RdsStack>
                )
              }
              action={
                closeIcon && (
                  <IconButton
                    aria-label="Close"
                    size="small"
                    className="rds-adaptive-cards__close-btn"
                    onClick={handleDismiss}
                  >
                    <CloseIcon />
                  </IconButton>
                )
              }
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
                    avatar={activityProps?.avatar ?? ""}
                    name={props.name ?? activityProps?.name ?? ""}
                    date={props.date ?? activityProps?.date ?? ""}
                    cardText={props.cardText}
                    radioOptions={activityProps?.radioOptions ?? []}
                  />
                </div>
              )}
              {type === "RestaurantOrder" && (
                <RestaurantOrderForm
                  entree={entree}
                  setEntree={setEntree}
                  side={side}
                  setSide={setSide}
                  drink={drink}
                  setDrink={setDrink}
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

            <CardActions
              className={clsx(
                "rds-adaptive-cards__actions",
                type === "RestaurantOrder" && "rds-adaptive-cards__actions--restaurant-order",
                type === "ActivityUpdateCard" && "rds-adaptive-cards__actions--activity-update"
              )}
            >
              {type === "RestaurantOrder" ? (
                showBtn1 ? (
                  <RdsButton
                    style="filled"
                    className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--restaurant-order rds-button__primary"
                    fullWidth
                    text={btn1Label}
                    onClick={props.onBtn1Click}
                  />
                ) : null
              ) : type === "CalenderReminder" ? null : (
                <>
                  {showBtn1 &&
                    (type === "InputForm" ? (
                      <RdsButton
                        style="filled"
                        className="rds-adaptive-cards__action-btn rds-adaptive-cards__action-btn--input-form-button rds-button__primary"
                        fullWidth
                        text={btn1Label}
                        onClick={props.onBtn1Click}
                      />
                    ) : type === "ActivityUpdateCard" ? (
                      <RdsButtonDropdown
                        buttonText={btn1Label}
                        styleType="outline"
                        options={activityDropdownOptions}
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
                        style={resolvedBtn1Style}
                        className={clsx(
                          "rds-adaptive-cards__action-btn",
                          type === "RestaurantOrder" && "rds-adaptive-cards__action-btn--restaurant-order",
                          type === "ActivityUpdateCard" && "rds-adaptive-cards__action-btn--activity",
                          resolvedBtn1Style === "filled" && "rds-button__primary"
                        )}
                        size={type === "RestaurantOrder" ? "small" : undefined}
                        text={btn1Label}
                      />
                    ))}
                  {showBtn2 &&
                    type !== "InputForm" && (
                      <RdsButton
                        style={resolvedBtn2Style}
                        className={clsx(
                          "rds-adaptive-cards__action-btn",
                          type === "ActivityUpdateCard" && "rds-adaptive-cards__action-btn--activity",
                          resolvedBtn2Style === "filled" && "rds-button__primary"
                        )}
                        size="medium"
                        text={capitalizeFirstWord(btn2Label)}
                      />
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

RdsCompAdaptiveCards.displayName = "RdsCompAdaptiveCards";
export default RdsCompAdaptiveCards;
