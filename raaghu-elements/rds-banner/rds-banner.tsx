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
import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose'> {
  description?: string;
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
}

const RdsBanner: React.FC<RdsBannerProps> = ({
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

  const mainText = resolveBannerMainText(description, children);
  const muiVariant = resolveBannerMuiVariant(variantStyle, props.variant);

  return (
    <MuiAlert
      severity={type}
      variant={muiVariant}
      icon={Icon ? <InfoOutlinedIcon /> : false}
      className={resolveBannerClasses(size, variantStyle, type!, fullWidth, showOutline, props.className)}
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
        />
      </div>
    </MuiAlert>
  );
};

RdsBanner.displayName = 'RdsBanner';
export default RdsBanner;
