import { isValidElement, cloneElement, type ReactNode } from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import './rds-alert.scss';

export interface RdsAlertProps extends AlertProps {
  description?: string;
  type?: AlertColor;
  showIcon?: boolean;
  changeIconName?: ReactNode;
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
  const resolvedSeverity = severity || type;
  const sizeClass = `rds-alert--${size}`;
  const styleClass = `rds-alert--${variantStyle}`;
  const severityClass = `rds-alert--${resolvedSeverity}`;
  const multilineClass = multiline ? 'rds-alert--multiline' : '';
  let iconNode: ReactNode | false = false;

  if (showIcon) {
    if (changeIconName === null) {
      iconNode = false;
    } else if (changeIconName !== undefined) {
      if (isValidElement<{ className?: string }>(changeIconName)) {
        const existingClass = changeIconName.props.className || '';
        iconNode = cloneElement(changeIconName, {
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
    <MuiAlert
      variant={variant}
      severity={resolvedSeverity}
      icon={iconNode}
      className={clsx(
        'rds-alert',
        sizeClass,
        styleClass,
        severityClass,
        multilineClass,
        props.className,
      )}
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
          {isValidElement(children) ? children : null}
        </div>
        {showButtons && (showLink || showSecondary || showPrimary) && (
          <div className="rds-alert__actions">
            {multiline ? (
              <>
                <div className="rds-alert__bottom-row">
                  <div className="rds-alert__left-actions">
                    {showLink && (
                      <a href="#" className="rds-alert__link-button">Link</a>
                    )}
                  </div>
                  <div className="rds-alert__right-actions">
                    {showSecondary && (
                      <RdsButton
                        className={resolvedSeverity === 'error' ? 'rds-alert__secondary-button--error' : 'rds-alert__secondary-button'}
                        style="transparent"
                        size="small"
                        text="Cancel"
                        textCase="capitalize"
                        color={resolvedSeverity === 'error' ? 'error' : 'info'}
                      />
                    )}
                    {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text="Okay" color={resolvedSeverity === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
                  </div>
                </div>
              </>
            ) : (
              <>
                {showLink && (
                      <a href="#" className="rds-alert__link-button">Link</a>
                )}
                {showSecondary && (
                  <RdsButton
                    className={resolvedSeverity === 'error' ? 'rds-alert__secondary-button--error' : 'rds-alert__secondary-button'}
                    style="transparent"
                    size="small"
                    sx={{ mr: showPrimary ? 2 : 0 }}
                    text="Cancel"
                    textCase="capitalize"
                    color={resolvedSeverity === 'error' ? 'error' : 'info'}
                  />
                )}
                {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text="Okay" color={resolvedSeverity === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
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
