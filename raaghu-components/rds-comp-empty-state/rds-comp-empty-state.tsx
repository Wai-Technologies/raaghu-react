import React, { Fragment } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './rds-comp-empty-state.scss';
import RdsCompEmptyStateIcon from './icon';

export interface RdsCompEmptyStateProps {
  /**
   * Mode of the empty state, e.g., "Dark NRA" or "Light NRA"
   */
  mode?: string;
  

  label?: string;
  

  subLabel?: string;
  

  iconHeight?: string | number;
  
 
  iconWidth?: string | number;
  

  iconPath?: string;
  

  buttonText?: string;
  

  onButtonClick?: () => void;
  

  showButton?: boolean;

  isContinueAnimate?: boolean;
  

  className?: string;
  

  testId?: string;
}

const RdsCompEmptyState = (props: RdsCompEmptyStateProps) => {
  // Normalize size (default 250px if not provided)
  const rawW = props.iconWidth ?? 150;
  const rawH = props.iconHeight ?? props.iconWidth ?? 150;
  const toCss = (v: string | number): string => (/^\d+$/.test(String(v)) ? `${v}px` : String(v));
  const width = toCss(rawW);
  const height = toCss(rawH);

  return (
    <Fragment>
      <Box className="rds-comp-empty-state">
        <Box className="rds-comp-empty-state__content">
          <Box className="rds-comp-empty-state__icon" data-testid="icon">
            <RdsCompEmptyStateIcon
              sx={{ width, height }}
              data-testid="emptyStateIconSvg"
              aria-label="Empty state"
              focusable="false"
            />
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
                color: '#374151',
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
              sx={{
                fontSize: '16px',
                color: '#6B7280',
                marginBottom: '10px',
                textAlign: 'center'
              }}
            >
              {props.subLabel}
            </Typography>
          )}

          {(props.showButton !== false) && (
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

export default RdsCompEmptyState;
