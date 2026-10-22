import { type ReactElement, type ReactNode, type AriaAttributes, type CSSProperties } from 'react';
import { Card as MuiCard, type CardProps, Avatar, Typography } from '@mui/material';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import Favorite from '@mui/icons-material/Favorite';
import Star from '@mui/icons-material/Star';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import LocationOn from '@mui/icons-material/LocationOn';
import Camera from '@mui/icons-material/Camera';
import Image from '@mui/icons-material/Image';
import MusicNote from '@mui/icons-material/MusicNote';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import Description from '@mui/icons-material/Description';
import Folder from '@mui/icons-material/Folder';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Download from '@mui/icons-material/Download';
import Upload from '@mui/icons-material/Upload';
import Share from '@mui/icons-material/Share';
import Notifications from '@mui/icons-material/Notifications';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
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

/** Roles on which `aria-selected` is allowed; other roles get `aria-current` instead. */
const ARIA_SELECTED_ROLES = new Set(['option', 'tab', 'row', 'gridcell', 'columnheader', 'rowheader', 'treeitem']);

export type CardState = 'default' | 'hover' | 'selected' | 'disabled';
export type CardStyle = 'default' | 'outlined' | 'filled';
export type CardLayout = 'vertical' | 'horizontal';
export type CardIconName = 'person' | 'home' | 'settings' | 'favorite' | 'star' | 'email' | 'phone' | 'location' | 'camera' | 'image' | 'music' | 'video' | 'document' | 'folder' | 'calendar' | 'clock' | 'search' | 'add' | 'edit' | 'delete' | 'check' | 'close' | 'arrow_forward' | 'arrow_back' | 'download' | 'upload' | 'share' | 'notification';
export interface RdsCardProps extends Omit<CardProps, 'children' | 'style' | 'component' | 'content' | 'variant'> {
  /** @deprecated Use `sx` instead. */
  padding?: number | string;
  /** Visual state (Figma). `disabled` and `selected` take precedence when set. */
  state?: CardState;
  /** Shows the card as selected and sets `aria-selected` (or `aria-current`). Takes precedence over `state`. */
  selected?: boolean;
  /** Shows the card as disabled and sets `aria-disabled`. Takes precedence over `state` and `selected`. */
  disabled?: boolean;
  /** Visual variant (Figma): `'default'`, `'outlined'` or `'filled'`. MUI's `'elevation'` is still accepted. */
  variant?: CardStyle | CardProps['variant'];
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: CardStyle | CSSProperties;
  layout?: CardLayout;
  /**
   * Shows or hides each section with `'visible'`/`'hidden'`. When a key is set it takes precedence
   * over the matching `show*` boolean.
   */
  content?: {
    indicator?: 'visible' | 'hidden';
    title?: 'visible' | 'hidden';
    subtext?: 'visible' | 'hidden';
    description?: 'visible' | 'hidden';
    icon?: 'visible' | 'hidden';
  };
  /** Shows the indicator strip. Defaults to `true`. */
  showIndicator?: boolean;
  /** Shows `title`. Defaults to `true`. */
  showTitle?: boolean;
  /** Shows `cardSubtext`. Defaults to `true`. */
  showSubtext?: boolean;
  /** Shows `description`. Defaults to `true`. */
  showDescription?: boolean;
  /** Shows the icon. Defaults to `true`. Use `icon={false}` to hide it as well. */
  showIcon?: boolean;
  /** Icon shown in the avatar. Takes precedence over `changeIcon`; `null`/`false` hide it. Defaults to a person icon. */
  icon?: ReactNode;
  /** @deprecated Use `icon` instead. */
  changeIcon?: CardIconName;
  children?: ReactNode;
  title?: string;
  /** Secondary line under the title. */
  subtitle?: string;
  /** @deprecated Use `subtitle` instead. */
  cardSubtext?: string;
  description?: string;
}

const RdsCard = ({
  padding,
  children,
  sx,
  state = 'default',
  selected,
  disabled,
  className,
  style,
  variant,
  layout = 'vertical',
  content,
  showIndicator: showIndicatorProp,
  showTitle: showTitleProp,
  showSubtext: showSubtextProp,
  showDescription: showDescriptionProp,
  showIcon: showIconProp,
  icon,
  changeIcon,
  title,
  cardSubtext,
  subtitle,
  description,
  'aria-disabled': ariaDisabledProp,
  'aria-selected': ariaSelectedProp,
  'aria-current': ariaCurrentProp,
  ...muiCardProps
}: RdsCardProps) => {
  if (changeIcon !== undefined) warnDeprecatedProp('RdsCard', 'changeIcon', '`icon`');
  if (cardSubtext !== undefined) warnDeprecatedProp('RdsCard', 'cardSubtext', '`subtitle`');
  if (padding !== undefined) warnDeprecatedProp('RdsCard', 'padding', '`sx`');
  const legacyVariant = typeof style === 'string' ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsCard', 'style', '`variant`');
  const cardVariant: CardStyle = (variant && variant !== 'elevation' ? variant : undefined) ?? legacyVariant ?? 'default';
  const resolvedSubtitle = subtitle ?? cardSubtext;

  const legacy = (value: unknown) => (typeof value === 'boolean' ? value : undefined);
  const iconHiddenByProp = icon === null || icon === false;

  const showIndicator = content?.indicator ? content.indicator === 'visible' : (legacy(showIndicatorProp) ?? true);
  const showTitle = content?.title ? content.title === 'visible' : (legacy(showTitleProp) ?? true);
  const showSubtext = content?.subtext ? content.subtext === 'visible' : (legacy(showSubtextProp) ?? true);
  const showDescription = content?.description ? content.description === 'visible' : (legacy(showDescriptionProp) ?? true);
  const showIcon = !iconHiddenByProp && (content?.icon ? content.icon === 'visible' : (legacy(showIconProp) ?? true));

  const isDisabled = disabled ?? state === 'disabled';
  const isSelected = !isDisabled && (selected ?? state === 'selected');
  const resolvedState: CardState = isDisabled
    ? 'disabled'
    : isSelected
      ? 'selected'
      : state === 'disabled' || state === 'selected'
        ? 'default'
        : state;

  const useAriaSelected = typeof muiCardProps.role === 'string' && ARIA_SELECTED_ROLES.has(muiCardProps.role);
  const ariaProps: AriaAttributes = {
    'aria-disabled': ariaDisabledProp ?? (isDisabled || undefined),
    'aria-selected': ariaSelectedProp ?? (useAriaSelected && isSelected ? true : undefined),
    'aria-current': ariaCurrentProp ?? (!useAriaSelected && isSelected ? true : undefined),
  };

  const hasCustomIcon = icon !== undefined && !iconHiddenByProp;
  const iconName = changeIcon ?? 'person';

  const cardClassName = clsx(
    'rds-card',
    `rds-card--${resolvedState}`,
    `rds-card--style-${cardVariant}`,
    `rds-card--layout-${layout}`,
    showIndicator && 'rds-card--with-indicator',
    !showTitle && 'rds-card--hide-title',
    !showSubtext && 'rds-card--hide-subtext',
    !showDescription && 'rds-card--hide-description',
    !showIcon && 'rds-card--hide-icon',
    showIcon && !hasCustomIcon && `rds-card--icon-${iconName}`,
    className,
  );

  const cardInlineStyle = padding ? { padding } : undefined;

  const iconElement = !showIcon ? null : (
    <Avatar className={clsx('rds-card__icon', !hasCustomIcon && `rds-card__icon--${iconName}`)}>
      {hasCustomIcon ? icon : (ICON_MAP[iconName] ?? <Person />)}
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
      {resolvedSubtitle && showSubtext && (
        <Typography
          variant="body2"
          component="p"
          className="rds-card__subtext"
        >
          {resolvedSubtitle}
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
      {...muiCardProps}
      {...ariaProps}
      variant={variant === 'outlined' || variant === 'elevation' ? variant : undefined}
      className={cardClassName}
      style={typeof style === 'object' ? style : undefined}
      sx={[
        cardInlineStyle,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
