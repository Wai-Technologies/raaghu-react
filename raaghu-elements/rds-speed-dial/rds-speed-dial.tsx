import { useState, type ReactNode, type SyntheticEvent } from 'react';
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialIcon as MuiSpeedDialIcon,
  type SpeedDialProps
} from '@mui/material';
import type { OpenReason, CloseReason } from '@mui/material/SpeedDial';

export interface RdsSpeedDialAction {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
  tooltipTitle?: string;
}

export interface RdsSpeedDialProps extends Omit<SpeedDialProps, 'children'> {
  actions: RdsSpeedDialAction[];
  icon?: ReactNode;
  openIcon?: ReactNode;
  tooltipTitle?: string;
}

const RdsSpeedDial = ({
  actions,
  icon,
  openIcon,
  tooltipTitle,
  ariaLabel,
  open,
  onClose,
  onOpen,
  ...props
}: RdsSpeedDialProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isForceOpen = open === true;
  const useInternalState = open !== true; 
  const finalOpenState = isForceOpen ? true : internalOpen;
  
  const handleOpen = (event: SyntheticEvent<{}, Event>, reason: OpenReason) => {
    if (useInternalState) {
      setInternalOpen(true);
    }
    onOpen?.(event, reason);
  };
  
  const handleClose = (event: SyntheticEvent<{}, Event>, reason: CloseReason) => {
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
          onClick={action.onClick}
        />
      ))}
    </MuiSpeedDial>
  );
};
RdsSpeedDial.displayName = 'RdsSpeedDial';
export default RdsSpeedDial;
