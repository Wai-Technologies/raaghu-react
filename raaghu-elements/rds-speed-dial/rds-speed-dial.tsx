import { useState, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialIcon as MuiSpeedDialIcon,
  type SpeedDialProps
} from '@mui/material';
import type { OpenReason, CloseReason } from '@mui/material/SpeedDial';

/** A single action shown when the speed dial is open. */
export interface RdsSpeedDialAction {
  /** Icon rendered inside the action button. */
  icon: ReactNode;
  /** Unique name; used as the React key and as the tooltip when `tooltipTitle` is not set. */
  name: string;
  /** Called with the click event when the action is clicked. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Tooltip text for the action (defaults to `name`). */
  tooltipTitle?: string;
}

export interface RdsSpeedDialProps extends Omit<SpeedDialProps, 'children' | 'component'> {
  /** Actions shown when the dial is open. */
  actions: RdsSpeedDialAction[];
  /** Icon of the main button (defaults to the MUI plus icon). */
  icon?: ReactNode;
  /** Icon of the main button while open (used with `icon`). */
  openIcon?: ReactNode;
  /** Fallback accessible label when `ariaLabel` is not set. */
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
          slotProps={{ tooltip: { title: action.tooltipTitle || action.name } }}
          onClick={action.onClick}
        />
      ))}
    </MuiSpeedDial>
  );
};
RdsSpeedDial.displayName = 'RdsSpeedDial';
export default RdsSpeedDial;
