import React from 'react';
import { Alert as MuiAlert, AlertProps, AlertColor, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Close } from '@mui/icons-material';
import Button from '@mui/material/Button';
import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose'> {
  message?: string;
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
  actions?: React.ReactNode;
}

const RdsBanner: React.FC<RdsBannerProps> = ({
  message,
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
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

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
  const mainText = message !== undefined ? String(message) : (typeof children === 'string' ? children : '');
  const sizeClass = `rds-banner--${size}`;
  const styleClass = `rds-banner--${variantStyle}`;
  const severityClass = `rds-banner--${type}`;
  const widthClass = fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width';

  // Map variantStyle to MUI Alert variant
  let muiVariant: AlertProps['variant'] = 'standard';
  
  // style1: keep original (do not set filled variant)
  if (variantStyle === 'style2') {
    muiVariant = 'outlined';
  } else if (variantStyle === 'style3') {
    muiVariant = 'standard';
  }

  return (
    <MuiAlert
      severity={type}
      variant={muiVariant}
      icon={Icon ? <InfoOutlinedIcon /> : false}
      className={`rds-banner ${sizeClass} ${styleClass} ${severityClass} ${widthClass}${props.className ? ` ${props.className}` : ''}`}
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
                <div className="rds-banner__heading rds-banner__heading--multiline">{title}</div>
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
          {React.isValidElement(children) ? children : null}
        </div>
        {(showLink || showSecondary || showPrimary) && (
          <div className="rds-banner__actions">
            {showLink && (
              <Button variant="text" size="small" className="rds-banner__link-button">Link</Button>
            )}
            {showSecondary && (
              <Button variant="text" size="small" className="rds-banner__secondary-button">Cancel</Button>
            )}
            {showPrimary && (
              <Button variant="contained" size="small" className="rds-banner__primary-button">Okay</Button>
            )}
          </div>
        )}
      </div>
    </MuiAlert>
  );
};

export default RdsBanner;
