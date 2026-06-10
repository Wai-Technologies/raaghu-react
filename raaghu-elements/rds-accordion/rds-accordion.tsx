import { useState, type ReactNode } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  type AccordionProps,
  type AccordionOwnProps,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import './rds-accordion.scss';

export interface RdsAccordionProps extends Omit<AccordionProps, 'children'> {
  ShowLeftIcon?: boolean;
  changeleftIcon?: ReactNode;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
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
  ...props
}: RdsAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = props.disabled;
  const isExpanded = props.expanded ?? defaultExpanded;

  const containerClassName = clsx(
    'rds-accordion__container',
    accordionStyle && `rds-accordion--${accordionStyle}`,
  );

  const accordionClassName = clsx(
    'rds-accordion',
    size && `rds-accordion--${size}`,
    accordionStyle && `rds-accordion--${accordionStyle}`,
    isExpanded && 'rds-accordion--expanded',
    state === 'selected' && 'rds-accordion--selected',
    state === 'hover' && isHovered && 'rds-accordion--hover',
    isDisabled && 'rds-accordion--disabled',
  );

  const accordionProps: AccordionProps = {
    ...props,
    className: accordionClassName,
    onMouseEnter: (event) => {
      props.onMouseEnter?.(event);
      if (state === 'hover') {
        setIsHovered(true);
      }
    },
    onMouseLeave: (event) => {
      props.onMouseLeave?.(event);
      if (state === 'hover') {
        setIsHovered(false);
      }
    },
  };

  if (typeof props.expanded === 'boolean') {
    accordionProps.expanded = props.expanded;
  } else {
    (accordionProps as AccordionOwnProps).defaultExpanded = defaultExpanded;
  }

  return (
    <div className={containerClassName}>
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
