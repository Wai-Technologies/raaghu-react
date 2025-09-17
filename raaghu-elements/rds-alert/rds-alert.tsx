import React from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RdsButton from '../rds-button/rds-button';
import './rds-alert.scss';

export interface RdsAlertProps extends AlertProps {
  description?: string;
  type?: AlertColor;
  showIcon?: boolean;
  changeIconName?: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  size?: 'small' | 'medium' | 'large';
  multiline?: boolean;
  variantStyle?: 'style1' | 'style2' | 'style3';
  showLink?: boolean;
  showSecondary?: boolean;
  showPrimary?: boolean;
  showButtons?: boolean;
}

const RdsAlert= ({
  description,
  children,
  type = 'info',
  severity,
  showIcon = true,
  changeIconName,
  title = 'Heading Title.',
  showTitle = false,
  showDescription = true,
  size = 'medium',
  multiline = false,
  variantStyle = 'style1',
  showLink = true,
  showSecondary = true,
  showPrimary = true,
  showButtons = true,
  variant = 'standard',
  ...props
}:RdsAlertProps) => {
  const mainText = description !== undefined ? String(description) : (typeof children === 'string' ? children : '');
  const sizeClass = `rds-alert--${size}`;
  const styleClass = `rds-alert--${variantStyle}`;
  const severityClass = `rds-alert--${(severity || type)}`;
  const multilineClass = multiline ? 'rds-alert--multiline' : '';
  let iconNode: React.ReactNode | false = false;
  if (showIcon) {
    if (changeIconName === null) {
      iconNode = false;
    } else if (changeIconName !== undefined) {
      if (React.isValidElement(changeIconName)) {
        const existingClass = (changeIconName.props as any)?.className || '';
        iconNode = React.cloneElement(changeIconName, {
          className: `${existingClass ? existingClass + ' ' : ''}rds-alert__icon`,
        });
      } else {
        iconNode = changeIconName;
      }
    } else {
      iconNode = <InfoOutlinedIcon className="rds-alert__icon" />;
    }
  }

  return (
    // removed Paper wrapper so MuiAlert's variant styling (filled/outlined/standard) is visible
    <MuiAlert
      variant={variant}
      severity={severity || type}
      icon={iconNode}
      className={`rds-alert ${sizeClass} ${styleClass} ${severityClass} ${multilineClass}${props.className ? ` ${props.className}` : ''}`}
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
              {showDescription && mainText && (
                <span className="rds-alert__description-inline">{` ${mainText}`}</span>
              )}
            </span>
          )}
          {React.isValidElement(children) ? children : null}
        </div>
        {showButtons && (showLink || showSecondary || showPrimary) && (
          <div className="rds-alert__actions">
            {multiline ? (
              // For multiline: restructure layout with bottom row
              <>
                <div className="rds-alert__bottom-row">
                  <div className="rds-alert__left-actions">
                    {showLink && (
                      <a href="#" className="rds-alert__link-button">Link</a>
                    )}
                  </div>
                  <div className="rds-alert__right-actions">
                    {showSecondary && <RdsButton style="transparent" size="small" text="Cancel" textCase="capitalize" color={(severity || type) === 'error' ? 'error' : 'primary'} />}
                    {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text="Okay" color={(severity || type) === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
                  </div>
                </div>
              </>
            ) : (
              // For single line: original layout
              <>
                {showLink && (
                      <a href="#" className="rds-alert__link-button">Link</a>
                )}
                {showSecondary && <RdsButton style="transparent" size="small" sx={{ mr: showPrimary ? 2 : 0 }} text="Cancel" textCase="capitalize" color={(severity || type) === 'error' ? 'error' : 'primary'} />}
                {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text="Okay" color={(severity || type) === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
              </>
            )}
          </div>
        )}
      </div>
    </MuiAlert>
  );
};

RdsAlert.displayName = 'RdsAlert';
export default RdsAlert;
