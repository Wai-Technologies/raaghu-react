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
  ...props
}: RdsAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = props.disabled;

  const accordionProps: any = {
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

export const RdsAccordionGroup: React.FC = () => (
  <>
    <RdsAccordion
      title="Accordion Title 1"
      icon={<ExpandMoreIcon />}
      state="hover"
    >
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </RdsAccordion>
    <RdsAccordion
      title="Accordion Title 2"
      icon={<ExpandMoreIcon />}
      state="selected"
    >
      <Typography>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </Typography>
    </RdsAccordion>
    <RdsAccordion
      title="Accordion Title 3"
      icon={<ExpandMoreIcon />}
    >
      <Typography>
        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
      </Typography>
    </RdsAccordion>
  </>
);

RdsAccordion.displayName = 'RdsAccordion';
export default RdsAccordion;
