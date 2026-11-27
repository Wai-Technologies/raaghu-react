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

const RdsSpeedDial = React.forwardRef<HTMLDivElement, RdsSpeedDialProps>(function RdsSpeedDial({
  actions,
  icon,
  openIcon,
  tooltipTitle,
  ariaLabel,
  open,
  onClose,
  onOpen,
  ...props
}, ref) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = open !== undefined;
  const finalOpenState = isControlled ? open : internalOpen;
  
  const handleOpen = (event: React.SyntheticEvent<{}, Event>, reason: OpenReason) => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpen?.(event, reason);
  };
  
  const handleClose = (event: React.SyntheticEvent<{}, Event>, reason: CloseReason) => {
    if (!isControlled) {
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
      ref={ref}
    >
      {actions.map((action) => (
        <MuiSpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.tooltipTitle || action.name}
          onClick={action.onClick}
        />
      ))}
    </MuiSpeedDial>
  );
});
RdsSpeedDial.displayName = 'RdsSpeedDial';
export default RdsSpeedDial;
