import { useState, type ReactNode, type MouseEvent } from 'react';
import { Alert as MuiAlert, IconButton, type AlertProps, type AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-banner.scss';

type Visibility = 'visible' | 'hidden';
type Toggle = 'on' | 'off';

export interface RdsBannerProps extends Omit<AlertProps, 'onClose' | 'component' | 'content'> {
  /** Message text. */
  description?: string;
  /** Heading shown before the message when the title is visible. */
  title?: string;
  /** Visibility of icon, title, description and multiline layout; wins over the boolean flags. */
  content?: {
    icon?: Visibility;
    title?: Visibility;
    description?: Visibility;
    multiline?: Toggle;
  };
  /** Size of the banner. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Visual style of the banner. @default 'style1' */
  variantStyle?: 'style1' | 'style2' | 'style3';
  /** Per-action visibility ('visible' | 'hidden') for link, secondary, primary and close; wins over the boolean flags. */
  actionsConfig?: {
    link?: Visibility;
    secondary?: Visibility;
    primary?: Visibility;
    close?: Visibility;
  };
  /** Persistent, width ('full' | 'auto') and outline toggles; wins over the boolean flags. */
  layout?: {
    persistent?: Toggle;
    width?: 'full' | 'auto';
    outline?: Toggle;
  };
  /** Called when the close button is clicked. When set, the banner does not hide itself. */
  onClose?: () => void;
  /** Label of the link button. Defaults to `'Link'`. */
  linkText?: string;
  /** Label of the secondary button. Defaults to `'Cancel'`. */
  secondaryText?: string;
  /** Label of the primary button. Defaults to `'Okay'`. */
  primaryText?: string;
  /** Called when the link button is clicked. */
  onLinkClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Called when the secondary button is clicked. */
  onSecondaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Called when the primary button is clicked. */
  onPrimaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** @deprecated Use `severity`. */
  type?: AlertColor;
  /** Extra content rendered next to the close button. MUI `action` replaces the whole action area instead. */
  actions?: ReactNode;
  /** Shows the icon. Defaults to `true`. Overridden by `content.icon`. */
  Icon?: boolean;
  /** Shows the title. Defaults to `false`. Overridden by `content.title`. */
  showTitle?: boolean;
  /** Shows the description. Defaults to `true`. Overridden by `content.description`. */
  showDescription?: boolean;
  /** Puts the title and description on separate lines. Defaults to `false`. Overridden by `content.multiline`. */
  multiline?: boolean;
  /** Shows the link button. Defaults to `false`. Overridden by `actionsConfig.link`. */
  showLink?: boolean;
  /** Shows the secondary button. Defaults to `false`. Overridden by `actionsConfig.secondary`. */
  showSecondary?: boolean;
  /** Shows the primary button. Defaults to `false`. Overridden by `actionsConfig.primary`. */
  showPrimary?: boolean;
  /** Shows the close button. Defaults to `true`. Overridden by `actionsConfig.close`. */
  closable?: boolean;
  /** Keeps the banner rendered after it is closed. Defaults to `false`. Overridden by `layout.persistent`. */
  persistent?: boolean;
  /** Stretches the banner to full width. Defaults to `true`. Overridden by `layout.width`. */
  fullWidth?: boolean;
  /** Adds the outline style. Defaults to `false`. Overridden by `layout.outline`. */
  showOutline?: boolean;
}

/** The `content`/`actionsConfig`/`layout` objects take precedence over the legacy boolean flags. */
const pick = (value: string | undefined, on: string, fallback: boolean) =>
  value ? value === on : fallback;

const RdsBanner = ({
  description,
  children,
  severity,
  icon,
  action,
  variant,
  title = 'Heading Title.',
  content,
  size = 'medium',
  variantStyle = 'style1',
  actionsConfig,
  layout,
  onClose,
  linkText = 'Link',
  secondaryText = 'Cancel',
  primaryText = 'Okay',
  onLinkClick,
  onSecondaryClick,
  onPrimaryClick,
  type,
  actions,
  Icon: IconProp,
  showTitle: showTitleProp,
  showDescription: showDescriptionProp,
  multiline: multilineProp,
  showLink: showLinkProp,
  showSecondary: showSecondaryProp,
  showPrimary: showPrimaryProp,
  closable: closableProp,
  persistent: persistentProp,
  fullWidth: fullWidthProp,
  showOutline: showOutlineProp,
  className,
  ...props
}: RdsBannerProps) => {
  if (type !== undefined) warnDeprecatedProp('RdsBanner', 'type', '`severity`');

  const showIcon = pick(content?.icon, 'visible', IconProp ?? true);
  const showTitle = pick(content?.title, 'visible', showTitleProp ?? false);
  const showDescription = pick(content?.description, 'visible', showDescriptionProp ?? true);
  const multiline = pick(content?.multiline, 'on', multilineProp ?? false);
  const showLink = pick(actionsConfig?.link, 'visible', showLinkProp ?? false);
  const showSecondary = pick(actionsConfig?.secondary, 'visible', showSecondaryProp ?? false);
  const showPrimary = pick(actionsConfig?.primary, 'visible', showPrimaryProp ?? false);
  const closable = pick(actionsConfig?.close, 'visible', closableProp ?? true);
  const persistent = pick(layout?.persistent, 'on', persistentProp ?? false);
  const fullWidth = pick(layout?.width, 'full', fullWidthProp ?? true);
  const showOutline = pick(layout?.outline, 'on', showOutlineProp ?? false);

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible && !persistent) {
    return null;
  }

  const resolvedSeverity: AlertColor = severity ?? type ?? 'info';
  const muiVariant = variant ?? (variantStyle === 'style2' ? 'outlined' : 'standard');
  const iconNode: ReactNode = icon !== undefined ? icon : showIcon ? <InfoOutlinedIcon /> : false;

  return (
    <MuiAlert
      {...props}
      severity={resolvedSeverity}
      variant={muiVariant}
      icon={iconNode}
      className={clsx(
        'rds-banner',
        `rds-banner--${size}`,
        `rds-banner--${variantStyle}`,
        `rds-banner--${resolvedSeverity}`,
        fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width',
        showOutline && variantStyle !== 'style3' && `rds-banner--${variantStyle}-outline`,
        className,
      )}
      action={action !== undefined ? action : (
        <div className="rds-banner__action-container">
          {actions}
          {closable && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
              className="rds-banner__close-button"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      )}
    >
      <div className="rds-banner__content-wrapper">
        <div className="rds-banner__text-content">
          {multiline ? (
            <div>
              {showTitle && (
                <strong className="rds-banner__heading rds-banner__heading--multiline">{title}</strong>
              )}
              {showDescription && (
                <div className="rds-banner__description">{description}</div>
              )}
            </div>
          ) : (
            <span>
              {showTitle && (
                <strong className="rds-banner__heading">{title}</strong>
              )}
              {showDescription && description}
            </span>
          )}
          {children}
        </div>
        {(showLink || showSecondary || showPrimary) && (
          <div className="rds-banner__actions">
            {showLink && (
              <RdsButton size="small" className="rds-banner__link-button" onClick={onLinkClick}>
                {linkText}
              </RdsButton>
            )}
            {showSecondary && (
              <RdsButton size="small" className="rds-banner__secondary-button" onClick={onSecondaryClick}>
                {secondaryText}
              </RdsButton>
            )}
            {showPrimary && (
              <RdsButton variant="filled" size="small" className="rds-banner__primary-button" onClick={onPrimaryClick}>
                {primaryText}
              </RdsButton>
            )}
          </div>
        )}
      </div>
    </MuiAlert>
  );
};

RdsBanner.displayName = 'RdsBanner';
export default RdsBanner;
