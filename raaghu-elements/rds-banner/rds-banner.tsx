import { useState, isValidElement, type ReactNode } from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Close } from '@mui/icons-material';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose'> {
  description?: string;
  type?: AlertColor;
  Icon?: boolean;
  title?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  size?: 'small' | 'medium' | 'large';
  multiline?: boolean;
  variantStyle?: 'style1' | 'style2' | 'style3';
  showLink?: boolean;
  showSecondary?: boolean;
  showPrimary?: boolean;
  closable?: boolean;
  onClose?: () => void;
  persistent?: boolean;
  fullWidth?: boolean;
  actions?: ReactNode;
  showOutline?: boolean;
}

const RdsBanner = ({
  description,
  children,
  type = 'info',
  Icon = true,
  title = 'Heading Title.',
  showTitle = false,
  showDescription = true,
  size = 'medium',
  multiline = false,
  variantStyle = 'style1',
  showLink = true,
  showSecondary = true,
  showPrimary = true,
  closable = true,
  onClose,
  persistent = false,
  fullWidth = true,
  actions,
  showOutline = false,
  ...props
}: RdsBannerProps) => {
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
  const mainText = description !== undefined ? String(description) : (typeof children === 'string' ? children : '');
  const outlineClass = showOutline
    ? (variantStyle === 'style1' ? 'rds-banner--style1-outline'
      : variantStyle === 'style2' ? 'rds-banner--style2-outline'
      : '')
    : '';

  let muiVariant: AlertProps['variant'] = props.variant ?? 'standard';
  if (!props.variant) {
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
      icon={Icon ? <InfoOutlinedIcon /> : false}
      className={clsx(
        'rds-banner',
        `rds-banner--${size}`,
        `rds-banner--${variantStyle}`,
        `rds-banner--${type}`,
        fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width',
        outlineClass,
        props.className,
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
      {...props}
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
          {isValidElement(children) ? children : null}
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
