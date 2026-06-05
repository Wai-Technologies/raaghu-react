import React from 'react';
import { Alert as MuiAlert, AlertProps, AlertColor, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Close } from '@mui/icons-material';
import RdsButton from '../rds-button/rds-button';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from '../../raaghu-react-themes/src/motion';

import './rds-banner.scss';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose'> {
  description?: string;
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
  showOutline?: boolean;
  animationDuration?: number;
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
  animationDuration,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const tokens = useMotionTokens();
  const shouldReduce = useReducedMotion();
  const duration = typeof animationDuration === 'number' ? animationDuration / 1000 : tokens.base;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  };

  const mainText = description !== undefined ? String(description) : (typeof children === 'string' ? children : '');
  const sizeClass = `rds-banner--${size}`;
  const styleClass = `rds-banner--${variantStyle}`;
  const severityClass = `rds-banner--${type}`;
  const widthClass = fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width';
  let outlineClass = '';
  if (showOutline) {
    if (variantStyle === 'style1') outlineClass = 'rds-banner--style1-outline';
    if (variantStyle === 'style2') outlineClass = 'rds-banner--style2-outline';
  }

  let muiVariant: AlertProps['variant'] = props.variant ?? 'standard';
  if (!props.variant) {
  if (variantStyle === 'style2') {
    muiVariant = 'outlined';
  } else if (variantStyle === 'style3') {
    muiVariant = 'standard';
  }
  }

  const shouldShow = isVisible || persistent;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={shouldReduce ? { duration: 0 } : { duration, ease: [0.4, 0, 0.2, 1] }}
        >
          <MuiAlert
            severity={type}
            variant={muiVariant}
            icon={Icon ? <InfoOutlinedIcon /> : false}
            className={`rds-banner ${sizeClass} ${styleClass} ${severityClass} ${widthClass}${outlineClass ? ` ${outlineClass}` : ''}${props.className ? ` ${props.className}` : ''}`}
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
                      <strong className="rds-banner__heading rds-banner__heading--multiline">{title}</strong>
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
                    <RdsButton size="small" className="rds-banner__link-button" text="Link" />
                  )}
                  {showSecondary && (
                    <RdsButton size="small" className="rds-banner__secondary-button" text="Cancel" />
                  )}
                  {showPrimary && (
                    <RdsButton style='filled' size="small" className="rds-banner__primary-button" text="Okay" />
                  )}
                </div>
              )}
            </div>
          </MuiAlert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

RdsBanner.displayName = 'RdsBanner';
export default RdsBanner;
