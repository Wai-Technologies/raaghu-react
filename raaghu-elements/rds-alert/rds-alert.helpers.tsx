import React from 'react';
import type { AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RdsButton from '../rds-button/rds-button';

export function resolveAlertIcon(
  showIcon: boolean,
  changeIconName?: React.ReactNode
): React.ReactNode | false {
  if (!showIcon) return false;
  if (changeIconName === null) return false;
  if (changeIconName !== undefined) {
    if (React.isValidElement(changeIconName)) {
      const existingClass = (changeIconName.props as { className?: string })?.className || '';
      return React.cloneElement(changeIconName as React.ReactElement<{ className?: string }>, {
        className: `${existingClass ? existingClass + ' ' : ''}rds-alert__icon`,
      });
    }
    return changeIconName;
  }
  return <InfoOutlinedIcon className="rds-alert__icon" />;
}

export interface AlertContentProps {
  multiline: boolean;
  showTitle: boolean;
  showDescription: boolean;
  title: string;
  mainText: string;
  children?: React.ReactNode;
}

export function AlertContent({
  multiline,
  showTitle,
  showDescription,
  title,
  mainText,
  children,
}: AlertContentProps) {
  return (
    <div className="rds-alert__content">
      {multiline ? (
        <div>
          {showTitle && (
            <div className="rds-alert__heading rds-alert__heading--multiline">{title}</div>
          )}
          {showDescription && <div className="rds-alert__description">{mainText}</div>}
        </div>
      ) : (
        <span>
          {showTitle && <strong className="rds-alert__heading">{title}</strong>}
          {showDescription && mainText && (
            <span className="rds-alert__description-inline">{` ${mainText}`}</span>
          )}
        </span>
      )}
      {React.isValidElement(children) ? children : null}
    </div>
  );
}

export interface AlertActionsProps {
  multiline: boolean;
  showButtons: boolean;
  showLink: boolean;
  showSecondary: boolean;
  showPrimary: boolean;
  severityColor: AlertColor;
}

export function AlertActions({
  multiline,
  showButtons,
  showLink,
  showSecondary,
  showPrimary,
  severityColor,
}: AlertActionsProps) {
  if (!showButtons || (!showLink && !showSecondary && !showPrimary)) return null;

  const buttonColor = severityColor === 'error' ? 'error' : 'primary';

  return (
    <div className="rds-alert__actions">
      {multiline ? (
        <div className="rds-alert__bottom-row">
          <div className="rds-alert__left-actions">
            {showLink && <a href="#" className="rds-alert__link-button">Link</a>}
          </div>
          <div className="rds-alert__right-actions">
            {showSecondary && (
              <RdsButton
                style="transparent"
                size="small"
                text="Cancel"
                textCase="capitalize"
                color={buttonColor}
              />
            )}
            {showPrimary && (
              <RdsButton
                className="rds-alert__primary-button"
                style="filled"
                size="small"
                text="Okay"
                color={buttonColor}
                textCase="capitalize"
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {showLink && <a href="#" className="rds-alert__link-button">Link</a>}
          {showSecondary && (
            <RdsButton
              style="transparent"
              size="small"
              sx={{ mr: showPrimary ? 2 : 0 }}
              text="Cancel"
              textCase="capitalize"
              color={buttonColor}
            />
          )}
          {showPrimary && (
            <RdsButton
              className="rds-alert__primary-button"
              style="filled"
              size="small"
              text="Okay"
              color={buttonColor}
              textCase="capitalize"
            />
          )}
        </>
      )}
    </div>
  );
}
