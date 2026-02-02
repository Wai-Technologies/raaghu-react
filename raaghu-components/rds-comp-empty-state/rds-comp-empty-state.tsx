import React, { Fragment } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Lottie from 'lottie-react';
import './rds-comp-empty-state.scss';
import emptyStatePng from './empty-state.png';
import emptyStateDarkPng from './empty-state-dark.png';
import illustrationLight from './illustration-light.json';
import illustrationDark from './illustration-dark.json';

export interface RdsCompEmptyStateProps {

  mode?: string;
  label?: string;
  subLabel?: string;
  iconHeight?: string | number;
  iconWidth?: string | number;
  iconPath?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isContinueAnimate?: boolean;
  className?: string;
  testId?: string;
}

const RdsCompEmptyState = (props: RdsCompEmptyStateProps) => {
  const rawW = props.iconWidth ?? 150;
  const rawH = props.iconHeight ?? props.iconWidth ?? 150;
  const toCss = (v: string | number): string => (/^\d+$/.test(String(v)) ? `${v}px` : String(v));
  const width = toCss(rawW);
  const height = toCss(rawH);
  
  // Auto-detect dark theme if mode not provided
  const isDarkTheme = !props.mode && (
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.body.classList.contains('dark')
  );
  
  const useDarkVariant = props.mode === 'Dark NRA' || isDarkTheme;
  
  // Select appropriate assets based on theme
  const resolvedImage = useDarkVariant ? emptyStateDarkPng : emptyStatePng;
  const resolvedAnimation = useDarkVariant ? illustrationDark : illustrationLight;
  const imageSrc = props.iconPath || resolvedImage;

  return (
    <Fragment>
      <Box className="rds-comp-empty-state">
        <Box className="rds-comp-empty-state__content">
          <Box 
            className={`rds-comp-empty-state__icon ${props.isContinueAnimate ? 'rds-comp-empty-state__icon--animated' : ''}`} 
            data-testid="icon" 
            style={{ width, height }}
          >
            {props.isContinueAnimate ? (
              <Lottie
                animationData={resolvedAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
                data-testid="emptyStateLottie"
              />
            ) : (
              <img
                src={imageSrc}
                alt={props.label || props.mode || 'Empty state'}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                data-testid="emptyStateImage"
              />
            )}
          </Box>

          {props.label && (
            <Typography
              variant="h5"
              component="h5"
              className="rds-comp-empty-state__title"
              data-testid="labelElement"
              sx={{
                fontSize: '20px',
                fontWeight: 600,
                color: props.mode === 'Dark NRA' ? '#fff' : '#374151',
                marginBottom: '8px',
                marginTop: '24px',
              }}
            >
              {props.label}
            </Typography>
          )}

          {props.subLabel && (
            <Typography
              variant="body1"
              className="rds-comp-empty-state__subtitle"
              data-testid="sublabelElement"
              sx={{ textAlign: 'center', color: props.mode === 'Dark NRA' ? '#fff' : undefined }}
            >
              {props.subLabel}
            </Typography>
          )}

          {(
            <Box className="rds-comp-empty-state__action">
              <Button
                variant="contained"
                className="rds-comp-empty-state__button"
                onClick={props.onButtonClick}
                data-testid="actionButton"
              >
                {props.buttonText || 'Add New Data'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};
RdsCompEmptyState.displayName = 'RdsCompEmptyState';
export default RdsCompEmptyState;
