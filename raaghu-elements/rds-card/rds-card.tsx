import { type ReactElement, type ReactNode } from 'react';
import { Card as MuiCard, type CardProps, Avatar, Typography } from '@mui/material';
import { Person, Home, Settings, Favorite, Star, Email, Phone, LocationOn, Camera, Image, MusicNote, VideoLibrary,
         Description, Folder, CalendarToday, AccessTime, Search, Add, Edit, Delete, Check, Close, ArrowForward, ArrowBack,
         Download, Upload, Share, Notifications,
} from '@mui/icons-material';
import clsx from 'clsx';
import './rds-card.scss';

const ICON_MAP: Record<string, ReactElement> = {
  person: <Person />,
  home: <Home />,
  settings: <Settings />,
  favorite: <Favorite />,
  star: <Star />,
  email: <Email />,
  phone: <Phone />,
  location: <LocationOn />,
  camera: <Camera />,
  image: <Image />,
  music: <MusicNote />,
  video: <VideoLibrary />,
  document: <Description />,
  folder: <Folder />,
  calendar: <CalendarToday />,
  clock: <AccessTime />,
  search: <Search />,
  add: <Add />,
  edit: <Edit />,
  delete: <Delete />,
  check: <Check />,
  close: <Close />,
  arrow_forward: <ArrowForward />,
  arrow_back: <ArrowBack />,
  download: <Download />,
  upload: <Upload />,
  share: <Share />,
  notification: <Notifications />,
};

export type CardState = 'default' | 'hover' | 'selected' | 'disabled';
export type CardStyle = 'default' | 'outlined' | 'filled';
export type CardLayout = 'vertical' | 'horizontal';
export type CardIconName = 'person' | 'home' | 'settings' | 'favorite' | 'star' | 'email' | 'phone' | 'location' | 'camera' | 'image' | 'music' | 'video' | 'document' | 'folder' | 'calendar' | 'clock' | 'search' | 'add' | 'edit' | 'delete' | 'check' | 'close' | 'arrow_forward' | 'arrow_back' | 'download' | 'upload' | 'share' | 'notification';
export interface RdsCardProps extends Omit<CardProps, 'children' | 'style' | 'component' | 'content'> {
  padding?: number | string;
  state?: CardState;
  style?: CardStyle;
  layout?: CardLayout;
  content?: {
    indicator?: 'visible' | 'hidden';
    title?: 'visible' | 'hidden';
    subtext?: 'visible' | 'hidden';
    description?: 'visible' | 'hidden';
    icon?: 'visible' | 'hidden';
  };
  changeIcon?: CardIconName;
  children?: ReactNode;
  title?: string; 
  cardSubtext?: string; 
  description?: string;
  [key: string]: unknown;
}

const RdsCard = ({
  padding,
  children,
  sx,
  state = 'default',
  className,
  style: cardStyleProp = 'default',
  layout = 'vertical',
  content,
  changeIcon = 'person',
  title,
  cardSubtext,
  description,
  ...props
}: RdsCardProps) => {
  const legacyShowIndicator = typeof props['showIndicator'] === 'boolean' ? (props['showIndicator'] as boolean) : undefined;
  const legacyShowTitle = typeof props['showTitle'] === 'boolean' ? (props['showTitle'] as boolean) : undefined;
  const legacyShowSubtext = typeof props['showSubtext'] === 'boolean' ? (props['showSubtext'] as boolean) : undefined;
  const legacyShowDescription = typeof props['showDescription'] === 'boolean' ? (props['showDescription'] as boolean) : undefined;
  const legacyShowIcon = typeof props['showIcon'] === 'boolean' ? (props['showIcon'] as boolean) : undefined;

  const showIndicator = content?.indicator ? content.indicator === 'visible' : (legacyShowIndicator ?? true);
  const showTitle = content?.title ? content.title === 'visible' : (legacyShowTitle ?? true);
  const showSubtext = content?.subtext ? content.subtext === 'visible' : (legacyShowSubtext ?? true);
  const showDescription = content?.description ? content.description === 'visible' : (legacyShowDescription ?? true);
  const showIcon = content?.icon ? content.icon === 'visible' : (legacyShowIcon ?? true);

  const {
    showIndicator: _legacyShowIndicator,
    showTitle: _legacyShowTitle,
    showSubtext: _legacyShowSubtext,
    showDescription: _legacyShowDescription,
    showIcon: _legacyShowIcon,
    ...muiCardProps
  } = props as typeof props & {
    showIndicator?: boolean;
    showTitle?: boolean;
    showSubtext?: boolean;
    showDescription?: boolean;
    showIcon?: boolean;
  };

  const cardClassName = clsx(
    'rds-card',
    `rds-card--${state}`,
    `rds-card--style-${cardStyleProp}`,
    `rds-card--layout-${layout}`,
    showIndicator && 'rds-card--with-indicator',
    !showTitle && 'rds-card--hide-title',
    !showSubtext && 'rds-card--hide-subtext',
    !showDescription && 'rds-card--hide-description',
    !showIcon && 'rds-card--hide-icon',
    showIcon && `rds-card--icon-${changeIcon}`,
    className,
  );

  const cardInlineStyle = padding ? { padding } : undefined;

  const iconElement = !showIcon ? null : (
    <Avatar className={`rds-card__icon rds-card__icon--${changeIcon}`}>
      {ICON_MAP[changeIcon] ?? <Person />}
    </Avatar>
  );

  const headerTextElement = (
    <div className="rds-card__content">
      {title && showTitle && (
        <Typography
          variant="h5"
          component="h2"
          className="rds-card__title"
        >
          {title}
        </Typography>
      )}
      {cardSubtext && showSubtext && (
        <Typography 
          variant="body2"
          component="p"
          className="rds-card__subtext"
        >
          {cardSubtext}
        </Typography>
      )}
    </div>
  );

  const descriptionAndChildrenElement = !description && !children ? null : (
    <div className="rds-card__below-content">
      {description && showDescription && (
        <Typography 
          variant="body2"
          component="p"
          className="rds-card__description"
        >
          {description}
        </Typography>
      )}
      {children && (
        <div className="rds-card__additional-content">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <MuiCard
      className={cardClassName}
      sx={[
        cardInlineStyle,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...muiCardProps}
    >
      {showIndicator && (
        <div className="rds-card__indicator">
          <div className="rds-card__indicator-icon"></div>
        </div>
      )}
      {layout === 'horizontal' ? (
        <>
          <div className="rds-card__header-row">
            {showIcon && (
              <div className="rds-card__icon-container">
                {iconElement}
              </div>
            )}
            <div className="rds-card__header-text">
              {headerTextElement}
            </div>
          </div>
          {descriptionAndChildrenElement}
        </>
      ) : (
        <div className="rds-card__content-wrapper">
          {showIcon && (
            <div className="rds-card__icon-container rds-card__icon-container--vertical">
              {iconElement}
            </div>
          )}
          {headerTextElement}
          {descriptionAndChildrenElement}
        </div>
      )}
    </MuiCard>
  );
};

RdsCard.displayName = 'RdsCard';
export default RdsCard;
