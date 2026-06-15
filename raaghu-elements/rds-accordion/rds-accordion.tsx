import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  type AccordionProps,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import './rds-accordion.scss';
import { MotionCollapse } from '../../raaghu-react-themes/src/motion';

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
  animationDuration?: number;
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
  animationDuration = 300,
  ...props
}: RdsAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = props.disabled;

  const accordionProps: Partial<AccordionProps> = {
    ...props,
    className: clsx(
      'rds-accordion',
      size && `rds-accordion--${size}`,
      accordionStyle && `rds-accordion--${accordionStyle}`,
      (props.expanded ?? defaultExpanded) && 'rds-accordion--expanded',
      state === 'selected' && 'rds-accordion--selected',
      state === 'hover' && isHovered && 'rds-accordion--hover',
      isDisabled && 'rds-accordion--disabled',
    ),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
  if (typeof props.expanded === 'boolean') {
    accordionProps.expanded = props.expanded;
  } else {
    accordionProps.defaultExpanded = defaultExpanded;
  }

  return (
    <div className={clsx('rds-accordion__container', accordionStyle && `rds-accordion--${accordionStyle}`)}>
      <MuiAccordion {...accordionProps} TransitionComponent={MotionCollapse} TransitionProps={{ durationMs: animationDuration } as Record<string, unknown>}>
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
