import React from 'react';
import { Alert as MuiAlert, AlertProps, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Close } from '@mui/icons-material';
import {
  resolveBannerMainText,
  resolveBannerClasses,
  resolveBannerMuiVariant,
  BannerTextContent,
  BannerActionButtons,
} from './rds-banner.helpers';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose' | 'color'> {
  description?: string;
  /** Semantic color of the banner. @default 'info' */
  color?: AlertProps['severity'];
  /** @deprecated Use `color`. */
  type?: AlertProps['severity'];
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
  showOutline?: boolean;
  linkText?: string;
  secondaryText?: string;
  primaryText?: string;
  onLinkClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RdsBanner = React.forwardRef<HTMLDivElement, RdsBannerProps>(function RdsBanner({
  description,
  children,
  color,
  type,
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
  linkText,
  secondaryText,
  primaryText,
  onLinkClick,
  onSecondaryClick,
  onPrimaryClick,
  className,
  ...props
}, ref) {
  if (type !== undefined) warnDeprecatedProp('RdsBanner', 'type', '`color`');
  const resolvedColor = color ?? type ?? 'info';
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

  const mainText = resolveBannerMainText(description, children);
  const muiVariant = resolveBannerMuiVariant(variantStyle, props.variant);

  return (
    <MuiAlert
      ref={ref}
      severity={resolvedColor}
      variant={muiVariant}
      icon={Icon ? <InfoOutlinedIcon /> : false}
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
      className={resolveBannerClasses(size, variantStyle, resolvedColor!, fullWidth, showOutline, className)}
    >
      <div className="rds-banner__content-wrapper">
        <BannerTextContent
          multiline={multiline}
          showTitle={showTitle}
          showDescription={showDescription}
          title={title}
          mainText={mainText}
          children={children}
        />
        <BannerActionButtons
          showLink={showLink}
          showSecondary={showSecondary}
          showPrimary={showPrimary}
          linkText={linkText}
          secondaryText={secondaryText}
          primaryText={primaryText}
          onLinkClick={onLinkClick}
          onSecondaryClick={onSecondaryClick}
          onPrimaryClick={onPrimaryClick}
        />
      </div>
    </MuiAlert>
  );
});

RdsBanner.displayName = 'RdsBanner';
export default RdsBanner;
