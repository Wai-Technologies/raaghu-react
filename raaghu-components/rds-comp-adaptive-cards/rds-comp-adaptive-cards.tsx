import React, { useState } from "react";
import './rds-comp-adaptive-cards.scss';
import RdsCardDetail from "../../raaghu-elements/rds-card-detail/rds-card-detail";
import { 
  FootballScorecardCard,
  ImageGalleryCard,
  AdaptiveCardProps,
  DefaultAdaptiveCard,
  AdaptiveTypedCard,
  AdaptiveCardActions,
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
  const merged = { ...variantDefaults, ...props };

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

  const calendarLabel = type === "CalenderReminder" ? (label || variantDefaults.label) : label;
  const calendarSmallText = type === "CalenderReminder" ? (smallText || variantDefaults.smallText) : smallText;
  const inputFormLabel = type === "InputForm" ? (label || variantDefaults.label) : undefined;
  const inputFormSmallText = type === "InputForm" ? (smallText || variantDefaults.smallText) : undefined;

  const [entree, setEntree] = useState("");
  const [side, setSide] = useState("");
  const [drink, setDrink] = useState("");
  const [visible, setVisible] = useState(true);

  const handleClose = () => setVisible(false);

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

  return (
    visible && (
      <RdsCardDetail className={`rds-adaptive-cards rds-adaptive-cards--default${type === 'Default' ? ' is-default-selected' : ''}`}>
        {type === 'Default' ? (
          <DefaultAdaptiveCard
            showDismiss={showDismiss}
            showHeader={showHeader}
            cardTitle={cardTitle}
            closeIcon={closeIcon}
            smallText={smallText}
            cardText={cardText}
            showBtn1={showBtn1}
            showBtn2={showBtn2}
            btn1style={btn1style}
            btn2style={btn2style}
            btn1Label={btn1Label}
            btn2Label={btn2Label}
            onClose={handleClose}
          />
        ) : (
          <>
            <AdaptiveTypedCard
              type={type}
              props={props}
              showHeader={showHeader}
              showDismiss={showDismiss}
              cardTitle={cardTitle}
              closeIcon={closeIcon}
              calendarLabel={calendarLabel}
              calendarSmallText={calendarSmallText}
              inputFormLabel={inputFormLabel}
              inputFormSmallText={inputFormSmallText}
              showBtn1={showBtn1}
              showBtn2={showBtn2}
              btn1Label={btn1Label}
              btn2Label={btn2Label}
              activityProps={activityProps}
              entree={entree}
              setEntree={setEntree}
              side={side}
              setSide={setSide}
              drink={drink}
              setDrink={setDrink}
              onClose={handleClose}
            />
            <AdaptiveCardActions
              type={type}
              showBtn1={showBtn1}
              showBtn2={showBtn2}
              btn1style={btn1style}
              btn2style={btn2style}
              btn1Label={btn1Label}
              btn2Label={btn2Label}
              activityProps={activityProps}
              onBtn1Click={props.onBtn1Click}
            />
          </>
        )}
      </RdsCardDetail>
    )
  );
};

RdsCompAdaptiveCards.displayName = 'RdsCompAdaptiveCards';
export default RdsCompAdaptiveCards;
