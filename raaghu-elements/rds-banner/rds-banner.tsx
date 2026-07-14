import { useState, type ReactNode } from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Close } from '@mui/icons-material';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose' | 'component' | 'content'> {
  description?: string;
  type?: AlertColor;
  title?: string;
  content?: {
    icon?: 'visible' | 'hidden';
    title?: 'visible' | 'hidden';
    description?: 'visible' | 'hidden';
    multiline?: 'on' | 'off';
  };
  size?: 'small' | 'medium' | 'large';
  variantStyle?: 'style1' | 'style2' | 'style3';
  actionsConfig?: {
    link?: 'visible' | 'hidden';
    secondary?: 'visible' | 'hidden';
    primary?: 'visible' | 'hidden';
    close?: 'visible' | 'hidden';
  };
  layout?: {
    persistent?: 'on' | 'off';
    width?: 'full' | 'auto';
    outline?: 'on' | 'off';
  };
  onClose?: () => void;
  actions?: ReactNode;
  [key: string]: unknown;
}

const RdsBanner = ({
  description,
  children,
  type = 'info',
  title = 'Heading Title.',
  content,
  size = 'medium',
  variantStyle = 'style1',
  actionsConfig,
  layout,
  onClose,
  actions,
  ...props
}: RdsBannerProps) => {
  const legacyIcon = typeof props['Icon'] === 'boolean' ? (props['Icon'] as boolean) : undefined;
  const legacyShowTitle = typeof props['showTitle'] === 'boolean' ? (props['showTitle'] as boolean) : undefined;
  const legacyShowDescription = typeof props['showDescription'] === 'boolean' ? (props['showDescription'] as boolean) : undefined;
  const legacyMultiline = typeof props['multiline'] === 'boolean' ? (props['multiline'] as boolean) : undefined;
  const legacyShowLink = typeof props['showLink'] === 'boolean' ? (props['showLink'] as boolean) : undefined;
  const legacyShowSecondary = typeof props['showSecondary'] === 'boolean' ? (props['showSecondary'] as boolean) : undefined;
  const legacyShowPrimary = typeof props['showPrimary'] === 'boolean' ? (props['showPrimary'] as boolean) : undefined;
  const legacyClosable = typeof props['closable'] === 'boolean' ? (props['closable'] as boolean) : undefined;
  const legacyPersistent = typeof props['persistent'] === 'boolean' ? (props['persistent'] as boolean) : undefined;
  const legacyFullWidth = typeof props['fullWidth'] === 'boolean' ? (props['fullWidth'] as boolean) : undefined;
  const legacyShowOutline = typeof props['showOutline'] === 'boolean' ? (props['showOutline'] as boolean) : undefined;

  const showIcon = content?.icon ? content.icon === 'visible' : (legacyIcon ?? true);
  const showTitle = content?.title ? content.title === 'visible' : (legacyShowTitle ?? false);
  const showDescription = content?.description ? content.description === 'visible' : (legacyShowDescription ?? true);
  const multiline = content?.multiline ? content.multiline === 'on' : (legacyMultiline ?? false);
  const showLink = actionsConfig?.link ? actionsConfig.link === 'visible' : (legacyShowLink ?? true);
  const showSecondary = actionsConfig?.secondary ? actionsConfig.secondary === 'visible' : (legacyShowSecondary ?? true);
  const showPrimary = actionsConfig?.primary ? actionsConfig.primary === 'visible' : (legacyShowPrimary ?? true);
  const closable = actionsConfig?.close ? actionsConfig.close === 'visible' : (legacyClosable ?? true);
  const persistent = layout?.persistent ? layout.persistent === 'on' : (legacyPersistent ?? false);
  const fullWidth = layout?.width ? layout.width === 'full' : (legacyFullWidth ?? true);
  const showOutline = layout?.outline ? layout.outline === 'on' : (legacyShowOutline ?? false);

  const {
    Icon: _legacyIcon,
    showTitle: _legacyShowTitle,
    showDescription: _legacyShowDescription,
    multiline: _legacyMultiline,
    showLink: _legacyShowLink,
    showSecondary: _legacyShowSecondary,
    showPrimary: _legacyShowPrimary,
    closable: _legacyClosable,
    persistent: _legacyPersistent,
    fullWidth: _legacyFullWidth,
    showOutline: _legacyShowOutline,
    ...muiAlertProps
  } = props as typeof props & {
    Icon?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    multiline?: boolean;
    showLink?: boolean;
    showSecondary?: boolean;
    showPrimary?: boolean;
    closable?: boolean;
    persistent?: boolean;
    fullWidth?: boolean;
    showOutline?: boolean;
  };

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
  const mainText = description;
  const outlineClass = showOutline
    ? (variantStyle === 'style1' ? 'rds-banner--style1-outline'
      : variantStyle === 'style2' ? 'rds-banner--style2-outline'
      : '')
    : '';

  let muiVariant: AlertProps['variant'] = props.variant ?? 'standard';
  if (!muiAlertProps.variant) {
  if (variantStyle === 'style2') {
    muiVariant = 'outlined';
  } else if (variantStyle === 'style3') {
    muiVariant = 'standard';
  }
  }

  return (
    <MuiAlert
      severity={type}
      variant={muiVariant}
      icon={showIcon ? <InfoOutlinedIcon /> : false}
      className={clsx(
        'rds-banner',
        `rds-banner--${size}`,
        `rds-banner--${variantStyle}`,
        `rds-banner--${type}`,
        fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width',
        outlineClass,
        muiAlertProps.className,
      )}
      action={
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
              <Close fontSize="inherit" />
            </IconButton>
          )}
        </div>
      }
      {...muiAlertProps}
    >
      <div className="rds-banner__content-wrapper">
        <div className="rds-banner__text-content">
          {multiline ? (
            <div>
              {showTitle && (
                <strong className="rds-banner__heading rds-banner__heading--multiline">{title}</strong>
              )}
              {showDescription && (
                <div className="rds-banner__description">{mainText}</div>
              )}
            </div>
          ) : (
            <span>
              {showTitle && (
                <strong className="rds-banner__heading">{title}</strong>
              )}
              {showDescription && mainText}
            </span>
          )}
          {children}
        </div>
        {(showLink || showSecondary || showPrimary) && (
          <div className="rds-banner__actions">
            {showLink && (
              <RdsButton size="small" className="rds-banner__link-button" text="Link" />
            )}
            {showSecondary && (
              <RdsButton size="small" className="rds-banner__secondary-button" text="Cancel" />
            )}
            {showPrimary && (
              <RdsButton style='filled' size="small" className="rds-banner__primary-button" text="Okay" />
            )}
          </div>
        )}
      </div>
    </MuiAlert>
  );
};

RdsBanner.displayName = 'RdsBanner';
export default RdsBanner;
