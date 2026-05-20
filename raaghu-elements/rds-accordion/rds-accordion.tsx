import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  type AccordionProps,
  Typography,
  Slide
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import './rds-accordion.scss';
import RdsTransition from '../rds-transition/rds-transition';

export interface RdsAccordionProps extends Omit<AccordionProps, 'children'> {
  ShowLeftIcon?: boolean;
  changeleftIcon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'hover' | 'selected';
  accordionStyle?: 'border' | 'bottomline' | 'borderhide';
}

const RdsAccordion = ({
  ShowLeftIcon = true,
  changeleftIcon,
  title,
  children,
  icon,
  defaultExpanded = false,
  size = 'medium',
  state = 'default',
  accordionStyle = 'border',
  TransitionComponent: providedTransitionComponent,
  TransitionProps: providedTransitionProps,
  ...propsRest
}: RdsAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = propsRest.disabled;

  // Determine the final TransitionComponent and TransitionProps
  // Default to using Slide if direction is specified, since Collapse doesn't support direction
  let finalTransitionComponent = providedTransitionComponent;
  let finalTransitionProps = providedTransitionProps;

  const hasDirection = providedTransitionProps && (providedTransitionProps as any).direction;
  if (hasDirection && !finalTransitionComponent) {
    // If direction is passed without TransitionComponent, use Slide to honor the direction prop
    finalTransitionComponent = Slide as any;
  }

  const accordionProps: any = {
    ...propsRest,
    className: clsx(
      'rds-accordion',
      size && `rds-accordion--${size}`,
      accordionStyle && `rds-accordion--${accordionStyle}`,
      (propsRest.expanded ?? defaultExpanded) && 'rds-accordion--expanded',
      state === 'selected' && 'rds-accordion--selected',
      state === 'hover' && isHovered && 'rds-accordion--hover',
      isDisabled && 'rds-accordion--disabled',
    ),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
  
  if (typeof propsRest.expanded === 'boolean') {
    accordionProps.expanded = propsRest.expanded;
  } else {
    accordionProps.defaultExpanded = defaultExpanded;
  }

  // Always set TransitionComponent and TransitionProps explicitly
  // This ensures they are not lost in the spread operation
  if (finalTransitionComponent) {
    accordionProps.TransitionComponent = finalTransitionComponent;
  }

  if (finalTransitionProps) {
    accordionProps.TransitionProps = finalTransitionProps;
  }

  return (
    <div className={clsx('rds-accordion__container', accordionStyle && `rds-accordion--${accordionStyle}`)}>
      <MuiAccordion {...accordionProps}>
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="rds-accordion__summary"
        >
          <div className="rds-accordion__header">
            {ShowLeftIcon && changeleftIcon !== null && (
              <span className="rds-accordion__icon">
                {changeleftIcon ?? icon ?? <AddIcon fontSize="small" />}
              </span>
            )}
            <Typography component="span" className="rds-accordion__title">
              {title}
            </Typography>
          </div>
      </MuiAccordionSummary>
      <MuiAccordionDetails className="rds-accordion__details">
        <div className="rds-accordion__details-panel">
          {children}
        </div>
      </MuiAccordionDetails>
    </MuiAccordion>
    </div>
  );
};

RdsAccordion.displayName = 'RdsAccordion';
export default RdsAccordion;
