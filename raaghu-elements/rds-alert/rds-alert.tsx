import { isValidElement, cloneElement, type ReactNode, type MouseEvent } from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-alert.scss';

type Visibility = 'visible' | 'hidden';

export interface RdsAlertProps extends Omit<AlertProps, 'component' | 'content'> {
  /** Message text. A string `children` is used when this is not set. */
  description?: string;
  /** Heading shown before the message when `showTitle` is on. */
  title?: string;
  /** Size of the alert. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Visual style variant of the alert. @default 'style1' */
  variantStyle?: 'style1' | 'style2' | 'style3';
  /** Shows the icon. Defaults to `true`. Use `icon={false}` to hide it as well. */
  showIcon?: boolean;
  /** Shows `title`. Defaults to `false`. */
  showTitle?: boolean;
  /** Shows the message. Defaults to `true`. */
  showDescription?: boolean;
  /** Puts the heading and message on separate lines. Defaults to `false`. */
  multiline?: boolean;
  /** Shows the action buttons area. Defaults to `false`. */
  showButtons?: boolean;
  /** Shows the link button. Defaults to `false`. */
  showLink?: boolean;
  /** Shows the secondary (cancel) button. Defaults to `false`. */
  showSecondary?: boolean;
  /** Shows the primary (confirm) button. Defaults to `false`. */
  showPrimary?: boolean;
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
  /** @deprecated Use `icon`. */
  changeIconName?: ReactNode;
  /** @deprecated Use `showIcon`, `showTitle`, `showDescription` and `multiline`. */
  content?: {
    icon?: Visibility;
    title?: Visibility;
    description?: Visibility;
    multiline?: 'on' | 'off';
  };
  /** @deprecated Use `showButtons`, `showLink`, `showSecondary` and `showPrimary`. */
  actions?: {
    visibility?: Visibility;
    link?: Visibility;
    secondary?: Visibility;
    primary?: Visibility;
  };
}

/** The deprecated `content`/`actions` objects take precedence, as they did before. */
const pick = (value: string | undefined, on: string, fallback: boolean) =>
  value ? value === on : fallback;

const withIconClass = (node: ReactNode): ReactNode =>
  isValidElement<{ className?: string }>(node)
    ? cloneElement(node, { className: clsx(node.props.className, 'rds-alert__icon') })
    : node;

const RdsAlert = ({
  description,
  children,
  severity,
  icon,
  title = 'Heading Title.',
  size = 'medium',
  variantStyle = 'style1',
  variant = 'standard',
  showIcon: showIconProp = true,
  showTitle: showTitleProp = false,
  showDescription: showDescriptionProp = true,
  multiline: multilineProp = false,
  showButtons: showButtonsProp = false,
  showLink: showLinkProp = false,
  showSecondary: showSecondaryProp = false,
  showPrimary: showPrimaryProp = false,
  linkText = 'Link',
  secondaryText = 'Cancel',
  primaryText = 'Okay',
  onLinkClick,
  onSecondaryClick,
  onPrimaryClick,
  type,
  changeIconName,
  content,
  actions,
  className,
  ...props
}: RdsAlertProps) => {
  if (type !== undefined) warnDeprecatedProp('RdsAlert', 'type', '`severity`');
  if (changeIconName !== undefined) warnDeprecatedProp('RdsAlert', 'changeIconName', '`icon`');
  if (content !== undefined) warnDeprecatedProp('RdsAlert', 'content', '`showIcon`, `showTitle`, `showDescription` and `multiline`');
  if (actions !== undefined) warnDeprecatedProp('RdsAlert', 'actions', '`showButtons`, `showLink`, `showSecondary` and `showPrimary`');

  const showIcon = pick(content?.icon, 'visible', showIconProp);
  const showTitle = pick(content?.title, 'visible', showTitleProp);
  const showDescription = pick(content?.description, 'visible', showDescriptionProp);
  const multiline = pick(content?.multiline, 'on', multilineProp);
  const showButtons = pick(actions?.visibility, 'visible', showButtonsProp);
  const showLink = pick(actions?.link, 'visible', showLinkProp);
  const showSecondary = pick(actions?.secondary, 'visible', showSecondaryProp);
  const showPrimary = pick(actions?.primary, 'visible', showPrimaryProp);

  const resolvedSeverity: AlertColor = severity ?? type ?? 'info';
  const isError = resolvedSeverity === 'error';
  const hasElementChildren = isValidElement(children);
  const mainText = description ?? (!hasElementChildren ? children : undefined);

  const customIcon = icon !== undefined ? icon : changeIconName;
  const iconNode: ReactNode =
    !showIcon || customIcon === null || customIcon === false
      ? false
      : customIcon !== undefined
        ? withIconClass(customIcon)
        : <InfoOutlinedIcon className="rds-alert__icon" />;

  const linkButton = showLink && (
    <button type="button" className="rds-alert__link-button" onClick={onLinkClick}>{linkText}</button>
  );
  const secondaryButton = showSecondary && (
    <RdsButton
      className={isError ? 'rds-alert__secondary-button--error' : 'rds-alert__secondary-button'}
      variant="transparent"
      size="small"
      sx={multiline ? undefined : { mr: showPrimary ? 2 : 0 }}
      textCase="capitalize"
      color={isError ? 'error' : 'info'}
      onClick={onSecondaryClick}
    >
      {secondaryText}
    </RdsButton>
  );
  const primaryButton = showPrimary && (
    <RdsButton
      className="rds-alert__primary-button"
      variant="filled"
      size="small"
      color={isError ? 'error' : 'primary'}
      textCase="capitalize"
      onClick={onPrimaryClick}
    >
      {primaryText}
    </RdsButton>
  );

  return (
    <MuiAlert
      {...props}
      variant={variant}
      severity={resolvedSeverity}
      icon={iconNode}
      className={clsx(
        'rds-alert',
        `rds-alert--${size}`,
        `rds-alert--${variantStyle}`,
        `rds-alert--${resolvedSeverity}`,
        multiline && 'rds-alert--multiline',
        className,
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
              {showTitle && <strong className="rds-alert__heading">{title}</strong>}
              {showDescription && mainText && <span className="rds-alert__description-inline">{' '}{mainText}</span>}
            </span>
          )}
          {hasElementChildren ? children : null}
        </div>
        {showButtons && (showLink || showSecondary || showPrimary) && (
          <div className="rds-alert__actions">
            {multiline ? (
              <div className="rds-alert__bottom-row">
                <div className="rds-alert__left-actions">{linkButton}</div>
                <div className="rds-alert__right-actions">
                  {secondaryButton}
                  {primaryButton}
                </div>
              </div>
            ) : (
              <>
                {linkButton}
                {secondaryButton}
                {primaryButton}
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
