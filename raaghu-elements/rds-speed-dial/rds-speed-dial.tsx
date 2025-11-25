import React, { useState } from 'react';
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialIcon as MuiSpeedDialIcon,
  SpeedDialProps
} from '@mui/material';
import type { OpenReason, CloseReason } from '@mui/material/SpeedDial';

export interface RdsSpeedDialAction {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
  tooltipTitle?: string;
}

export interface RdsSpeedDialProps extends Omit<SpeedDialProps, 'children'> {
  actions: RdsSpeedDialAction[];
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  tooltipTitle?: string;
}

const RdsSpeedDial: React.FC<RdsSpeedDialProps> = ({
  actions,
  icon,
  openIcon,
  tooltipTitle,
  ariaLabel,
  open,
  onClose,
  onOpen,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // If open is explicitly true, force it to stay open
  // If open is false or undefined, use internal state for interactions
  const isForceOpen = open === true;
  const useInternalState = open !== true; // Use internal state when open is false or undefined
  const finalOpenState = isForceOpen ? true : internalOpen;
  
  const handleOpen = (event: React.SyntheticEvent<{}, Event>, reason: OpenReason) => {
    // Only update internal state if not force opened
    if (useInternalState) {
      setInternalOpen(true);
    }
    onOpen?.(event, reason);
  };
  
  const handleClose = (event: React.SyntheticEvent<{}, Event>, reason: CloseReason) => {
    // Only update internal state if not force opened
    if (useInternalState) {
      setInternalOpen(false);
    }
    onClose?.(event, reason);
  };

  return (
    <MuiSpeedDial
      ariaLabel={ariaLabel || tooltipTitle || "Speed dial"}
      icon={icon ? <MuiSpeedDialIcon icon={icon} openIcon={openIcon} /> : <MuiSpeedDialIcon />}
      open={finalOpenState}
      onOpen={handleOpen}
      onClose={handleClose}
      {...props}
    >
      {actions.map((action) => (
        <MuiSpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.tooltipTitle || action.name}
          onClick={action.onClick || (() => console.log(`${action.name} clicked`))}
        />
      ))}
    </MuiSpeedDial>
  );
};
RdsSpeedDial.displayName = 'RdsSpeedDial';
export default RdsSpeedDial;
