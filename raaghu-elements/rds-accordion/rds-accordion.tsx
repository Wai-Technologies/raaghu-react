import React from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface RdsAccordionProps extends Omit<AccordionProps, 'children'> {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
}

const RdsAccordion: React.FC<RdsAccordionProps> = ({
  title,
  children,
  icon = <ExpandMoreIcon />,
  defaultExpanded = false,
  ...props
}) => {
  return (
    <MuiAccordion defaultExpanded={defaultExpanded} {...props}>
      <MuiAccordionSummary expandIcon={icon}>
        <Typography>{title}</Typography>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default RdsAccordion;
