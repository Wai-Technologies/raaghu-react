import React, { type ReactNode } from 'react';
import { Card as MuiCard, type CardProps, Avatar, Typography } from '@mui/material';
import { Person, Home, Settings, Favorite, Star, Email, Phone, LocationOn, Camera, Image, MusicNote, VideoLibrary,
         Description, Folder, CalendarToday, AccessTime, Search, Add, Edit, Delete, Check, Close, ArrowForward, ArrowBack,
         Download, Upload, Share, Notifications,
} from '@mui/icons-material';
import './rds-card.scss';

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
}:RdsCardProps) => {
  const getCardClassName = () => {
    const baseClass = 'rds-card';
    const stateClass = `rds-card--${state}`;
    const styleClass = `rds-card--style-${cardStyleProp}`;
    const layoutClass = `rds-card--layout-${layout}`;
    const indicatorClass = showIndicator ? 'rds-card--with-indicator' : '';
    const titleClass = showTitle ? '' : 'rds-card--hide-title';
    const subtextClass = showSubtext ? '' : 'rds-card--hide-subtext';
    const descriptionClass = showDescription ? '' : 'rds-card--hide-description';
    const iconClass = showIcon ? '' : 'rds-card--hide-icon';
    const iconNameClass = showIcon ? `rds-card--icon-${changeIcon}` : '';
    const combinedClass = `${baseClass} ${stateClass} ${styleClass} ${layoutClass} ${indicatorClass} ${titleClass} ${subtextClass} ${descriptionClass} ${iconClass} ${iconNameClass}`.trim();
    
    return className ? `${combinedClass} ${className}` : combinedClass;
  };

  const cardInlineStyle = padding ? { padding } : undefined;

  const renderIcon = () => {
    if (!showIcon) return null;
    
    const iconProps = {
      className: `rds-card__icon rds-card__icon--${changeIcon}`,
    };

    const getIconComponent = () => {
      switch (changeIcon) {
        case 'person': return <Person />;
        case 'home': return <Home />;
        case 'settings': return <Settings />;
        case 'favorite': return <Favorite />;
        case 'star': return <Star />;
        case 'email': return <Email />;
        case 'phone': return <Phone />;
        case 'location': return <LocationOn />;
        case 'camera': return <Camera />;
        case 'image': return <Image />;
        case 'music': return <MusicNote />;
        case 'video': return <VideoLibrary />;
        case 'document': return <Description />;
        case 'folder': return <Folder />;
        case 'calendar': return <CalendarToday />;
        case 'clock': return <AccessTime />;
        case 'search': return <Search />;
        case 'add': return <Add />;
        case 'edit': return <Edit />;
        case 'delete': return <Delete />;
        case 'check': return <Check />;
        case 'close': return <Close />;
        case 'arrow_forward': return <ArrowForward />;
        case 'arrow_back': return <ArrowBack />;
        case 'download': return <Download />;
        case 'upload': return <Upload />;
        case 'share': return <Share />;
        case 'notification': return <Notifications />;
        default: return <Person />;
      }
    };

    return (
      <Avatar {...iconProps}>
        {getIconComponent()}
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
      className={getCardClassName()}
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
