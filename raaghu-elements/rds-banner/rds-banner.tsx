import React from 'react';
import { Alert as MuiAlert, AlertProps, AlertColor, IconButton, Box, Typography } from '@mui/material';
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

  // Map variantStyle to MUI Alert variant
  let muiVariant: AlertProps['variant'] = 'standard';
  let customSx: any = {
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 0,
        '& .MuiAlert-message': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
  };
  // style1: keep original (do not set filled variant)
  if (variantStyle === 'style2') {
    muiVariant = 'outlined';
  } else if (variantStyle === 'style3') {
    muiVariant = 'standard';
    customSx.borderLeft = '6px solid';
    customSx.borderLeftColor = (theme: any) => theme.palette[type]?.main || theme.palette.info.main;
  }

  return (
    <MuiAlert
      severity={type}
      variant={muiVariant}
      icon={Icon ? <InfoOutlinedIcon /> : false}
      className={`rds-banner ${sizeClass} ${styleClass} ${severityClass}${props.className ? ` ${props.className}` : ''}`}
      sx={customSx}
      action={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {actions}
          {closable && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
              sx={{ mt: '-4px' }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      }
      {...props}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
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
        </Box>
        {(showLink || showSecondary || showPrimary) && (
          <Box className="rds-banner__actions" sx={{ display: 'flex', gap: 1, ml: 2 }}>
            {showLink && (
              <Button variant="text" size="small" className="rds-banner__link-button" sx={{ mr: '-9px' }}  >Link</Button>
            )}
            {showSecondary && (
              <Button variant="text" size="small" sx={{ mr: '10px' }} >Cancel</Button>
            )}
            {showPrimary && (
              <Button variant="contained" size="small" sx={{ height: '28px' }}>Okay</Button>
            )}
          </Box>
        )}
      </Box>
    </MuiAlert>
  );
};

export default RdsBanner;
