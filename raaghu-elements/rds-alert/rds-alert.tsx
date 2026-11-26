import { forwardRef, isValidElement, cloneElement, type ReactNode, type MouseEvent } from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-alert.scss';

export interface RdsAlertProps extends Omit<AlertProps, 'component' | 'content' | 'color'> {
  description?: string;
  /** Semantic color of the alert. @default 'info' */
  color?: AlertColor;
  /** @deprecated Use `color`. */
  type?: AlertColor;
  /** @deprecated Use `color`. */
  severity?: AlertColor;
  changeIconName?: ReactNode;
  title?: string;
  content?: {
    icon?: 'visible' | 'hidden';
    title?: 'visible' | 'hidden';
    description?: 'visible' | 'hidden';
    multiline?: 'on' | 'off';
  };
  size?: 'small' | 'medium' | 'large';
  variantStyle?: 'style1' | 'style2' | 'style3';
  actions?: {
    visibility?: 'visible' | 'hidden';
    link?: 'visible' | 'hidden';
    secondary?: 'visible' | 'hidden';
    primary?: 'visible' | 'hidden';
  };
  linkText?: string;
  secondaryText?: string;
  primaryText?: string;
  onLinkClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSecondaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPrimaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}

const RdsAlert = forwardRef<HTMLDivElement, RdsAlertProps>(function RdsAlert({
  description,
  children,
  color,
  type,
  severity,
  changeIconName,
  title = 'Heading Title.',
  content,
  size = 'medium',
  variantStyle = 'style1',
  actions,
  variant = 'standard',
  linkText = 'Link',
  secondaryText = 'Cancel',
  primaryText = 'Okay',
  onLinkClick,
  onSecondaryClick,
  onPrimaryClick,
  ...props
}, ref) {
  if (type !== undefined) warnDeprecatedProp('RdsAlert', 'type', '`color`');
  if (severity !== undefined) warnDeprecatedProp('RdsAlert', 'severity', '`color`');
  const legacyShowIcon = typeof props['showIcon'] === 'boolean' ? (props['showIcon'] as boolean) : undefined;
  const legacyShowTitle = typeof props['showTitle'] === 'boolean' ? (props['showTitle'] as boolean) : undefined;
  const legacyShowDescription = typeof props['showDescription'] === 'boolean' ? (props['showDescription'] as boolean) : undefined;
  const legacyMultiline = typeof props['multiline'] === 'boolean' ? (props['multiline'] as boolean) : undefined;
  const legacyShowLink = typeof props['showLink'] === 'boolean' ? (props['showLink'] as boolean) : undefined;
  const legacyShowSecondary = typeof props['showSecondary'] === 'boolean' ? (props['showSecondary'] as boolean) : undefined;
  const legacyShowPrimary = typeof props['showPrimary'] === 'boolean' ? (props['showPrimary'] as boolean) : undefined;
  const legacyShowButtons = typeof props['showButtons'] === 'boolean' ? (props['showButtons'] as boolean) : undefined;

  const showIcon = content?.icon ? content.icon === 'visible' : (legacyShowIcon ?? true);
  const showTitle = content?.title ? content.title === 'visible' : (legacyShowTitle ?? false);
  const showDescription = content?.description ? content.description === 'visible' : (legacyShowDescription ?? true);
  const multiline = content?.multiline ? content.multiline === 'on' : (legacyMultiline ?? false);
  const showLink = actions?.link ? actions.link === 'visible' : (legacyShowLink ?? true);
  const showSecondary = actions?.secondary ? actions.secondary === 'visible' : (legacyShowSecondary ?? true);
  const showPrimary = actions?.primary ? actions.primary === 'visible' : (legacyShowPrimary ?? true);
  const showButtons = actions?.visibility ? actions.visibility === 'visible' : (legacyShowButtons ?? true);

  const {
    showIcon: _legacyShowIcon,
    showTitle: _legacyShowTitle,
    showDescription: _legacyShowDescription,
    multiline: _legacyMultiline,
    showLink: _legacyShowLink,
    showSecondary: _legacyShowSecondary,
    showPrimary: _legacyShowPrimary,
    showButtons: _legacyShowButtons,
    ...muiAlertProps
  } = props as typeof props & {
    showIcon?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    multiline?: boolean;
    showLink?: boolean;
    showSecondary?: boolean;
    showPrimary?: boolean;
    showButtons?: boolean;
  };

  const hasElementChildren = isValidElement(children);
  const mainText = description ?? (!hasElementChildren ? children : undefined);
  const resolvedSeverity: AlertColor = color ?? severity ?? type ?? 'info';
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
      ref={ref}
      variant={variant}
      severity={resolvedSeverity}
      icon={iconNode}
      {...muiAlertProps}
      className={clsx(
        'rds-alert',
        sizeClass,
        styleClass,
        severityClass,
        multilineClass,
        muiAlertProps.className,
      )}
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
              {showDescription && mainText && <span className="rds-alert__description-inline">{' '}{mainText}</span>}
            </span>
          )}
          {hasElementChildren ? children : null}
        </div>
        {showButtons && (showLink || showSecondary || showPrimary) && (
          <div className="rds-alert__actions">
            {multiline ? (
              <>
                <div className="rds-alert__bottom-row">
                  <div className="rds-alert__left-actions">
                    {showLink && (
                      <button type="button" className="rds-alert__link-button" onClick={onLinkClick}>{linkText}</button>
                    )}
                  </div>
                  <div className="rds-alert__right-actions">
                    {showSecondary && (
                      <RdsButton
                        className={resolvedSeverity === 'error' ? 'rds-alert__secondary-button--error' : 'rds-alert__secondary-button'}
                        style="transparent"
                        size="small"
                        text={secondaryText}
                        onClick={onSecondaryClick}
                        textCase="capitalize"
                        color={resolvedSeverity === 'error' ? 'error' : 'info'}
                      />
                    )}
                    {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text={primaryText} onClick={onPrimaryClick} color={resolvedSeverity === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
                  </div>
                </div>
              </>
            ) : (
              <>
                {showLink && (
                      <button type="button" className="rds-alert__link-button" onClick={onLinkClick}>{linkText}</button>
                )}
                {showSecondary && (
                  <RdsButton
                    className={resolvedSeverity === 'error' ? 'rds-alert__secondary-button--error' : 'rds-alert__secondary-button'}
                    style="transparent"
                    size="small"
                    sx={{ mr: showPrimary ? 2 : 0 }}
                    text={secondaryText}
                        onClick={onSecondaryClick}
                    textCase="capitalize"
                    color={resolvedSeverity === 'error' ? 'error' : 'info'}
                  />
                )}
                {showPrimary && <RdsButton className="rds-alert__primary-button" style="filled" size="small" text={primaryText} onClick={onPrimaryClick} color={resolvedSeverity === 'error' ? 'error' : 'primary'} textCase="capitalize" />}
              </>
            )}
          </div>
        )}
      </div>
    </MuiAlert>
  );
});

RdsAlert.displayName = 'RdsAlert';
export default RdsAlert;
