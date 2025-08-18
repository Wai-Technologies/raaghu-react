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
  // selected?: boolean; // Removed, use state === 'selected'
}

const RdsAccordion= ({
  ShowLeftIcon = true,
  changeleftIcon,
  title,
  children,
  icon,
  defaultExpanded = false,
  size = 'medium',
  state = 'default',
  ...props
}:RdsAccordionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = props.disabled;
  const expanded = props.expanded ?? defaultExpanded;

  const accordionClasses = clsx(
    'rds-accordion',
    size && `rds-accordion--${size}`,
    expanded && 'rds-accordion--expanded',
    state === 'selected' && 'rds-accordion--selected',
    state === 'hover' && isHovered && 'rds-accordion--hover',
    isDisabled && 'rds-accordion--disabled',
  );

  return (
    <div className="rds-accordion__container">
      <MuiAccordion
        defaultExpanded={defaultExpanded}
        {...props}
        className={accordionClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="rds-accordion__summary"
        >
          <div className="rds-accordion__header">
            {ShowLeftIcon && (changeleftIcon !== null ? (
              <span className="rds-accordion__icon">
                {changeleftIcon !== undefined ? changeleftIcon : (icon || <AddIcon fontSize="small" />)}
              </span>
            ) : null)}
            <Typography component="span" className="rds-accordion__title">
              {title}
            </Typography>
          </div>
      </MuiAccordionSummary>
      <MuiAccordionDetails className="rds-accordion__details">
        {children}
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

export default RdsAccordion;
