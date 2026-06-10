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
export interface RdsCardProps extends Omit<CardProps, 'children' | 'style'> {
  padding?: number | string;
  state?: CardState;
  showIndicator?: boolean;
  style?: CardStyle;
  showTitle?: boolean;
  showSubtext?: boolean;
  showDescription?: boolean;
  layout?: CardLayout;
  showIcon?: boolean;
  changeIcon?: CardIconName;
  children?: ReactNode;
  title?: string; 
  cardSubtext?: string; 
  description?: string;
}

const RdsCard = ({
  padding,
  children,
  sx,
  state = 'default',
  className,
  showIndicator = true,
  style: cardStyleProp = 'default',
  showTitle = true,
  showSubtext = true,
  showDescription = true,
  layout = 'vertical',
  showIcon = true,
  changeIcon = 'person',
  title,
  cardSubtext,
  description,
  ...props
}: RdsCardProps) => {
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

  const renderIcon = () => {
    if (!showIcon) return null;
    return (
      <Avatar className={`rds-card__icon rds-card__icon--${changeIcon}`}>
        {ICON_MAP[changeIcon] ?? <Person />}
      </Avatar>
    );
  };

  const renderHeaderText = () => (
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

  const renderDescriptionAndChildren = () => {
    if (!description && !children) return null;
    return (
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
  };

  return (
    <MuiCard
      className={cardClassName}
      sx={[
        cardInlineStyle,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
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
                {renderIcon()}
              </div>
            )}
            <div className="rds-card__header-text">
              {renderHeaderText()}
            </div>
          </div>
          {renderDescriptionAndChildren()}
        </>
      ) : (
        <div className="rds-card__content-wrapper">
          {showIcon && (
            <div className="rds-card__icon-container rds-card__icon-container--vertical">
              {renderIcon()}
            </div>
          )}
          {renderHeaderText()}
          {renderDescriptionAndChildren()}
        </div>
      )}
    </MuiCard>
  );
};

RdsCard.displayName = 'RdsCard';
export default RdsCard;
