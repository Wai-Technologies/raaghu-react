import React from 'react';
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialIcon as MuiSpeedDialIcon,
  SpeedDialProps
} from '@mui/material';

export interface RdsSpeedDialAction {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
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
  ...props
}) => {
  return (
    <MuiSpeedDial
      ariaLabel={ariaLabel || tooltipTitle || "Speed dial"}
      icon={icon ? <MuiSpeedDialIcon icon={icon} openIcon={openIcon} /> : <MuiSpeedDialIcon />}
      {...props}
    >
      {actions.map((action) => (
        <MuiSpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </MuiSpeedDial>
  );
};
RdsSpeedDial.displayName = 'RdsSpeedDial';
export default RdsSpeedDial;
