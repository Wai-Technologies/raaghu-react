import React from 'react';
import { Alert as MuiAlert, AlertProps, AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RdsButton from '../rds-button/rds-button';
import './rds-alert.scss';

export interface RdsAlertProps extends AlertProps {
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
}

const RdsAlert: React.FC<RdsAlertProps> = ({
  message,
  children,
  type = 'info',
  severity,
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
  ...props
}) => {
  const mainText = message !== undefined ? String(message) : (typeof children === 'string' ? children : '');
  const sizeClass = `rds-alert--${size}`;
  const styleClass = `rds-alert--${variantStyle}`;
  const severityClass = `rds-alert--${(severity || type)}`;

  return (
    <MuiAlert
      severity={severity || type}
      icon={Icon ? <InfoOutlinedIcon className="rds-alert__icon" /> : false}
      className={`rds-alert ${sizeClass} ${styleClass} ${severityClass}${props.className ? ` ${props.className}` : ''}`}
      {...props}
    >
      <div className="rds-alert__wrapper">
        <div className="rds-alert__content">
          {multiline ? (
            <div>
              {showTitle && (
                <div className="rds-alert__heading rds-alert__heading--multiline">{title}</div>
              )}
              {showDescription && (
                <div className="rds-alert__description">{mainText}</div>
              )}
            </div>
          ) : (
            <span>
              {showTitle && (
                <strong className="rds-alert__heading">{title}</strong>
              )}
              {showDescription && mainText}
            </span>
          )}
          {React.isValidElement(children) ? children : null}
        </div>
        {(showLink || showSecondary || showPrimary) && (
          <div className="rds-alert__actions">
            {showLink && (
              <RdsButton
                style="transparent"
                size="small"
                className="rds-alert__link-button"
              >
                Link
              </RdsButton>
            )}

            {showSecondary && <RdsButton style="transparent" size="small" sx={{ mr: showPrimary ? 2 : 0 }}>Cancel</RdsButton>}
            {showPrimary && <RdsButton style="filled" size="small">Okay</RdsButton>}
          </div>
        )}
      </div>
    </MuiAlert>
  );
};

export default RdsAlert;
