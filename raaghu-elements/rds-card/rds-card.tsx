import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';

export interface RdsCardProps extends CardProps {
  padding?: number | string;
}

const RdsCard: React.FC<RdsCardProps> = ({
  padding,
  children,
  sx,
  ...props
}) => {
  return (
    <MuiCard
      sx={{
        padding: padding,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

export default RdsCard;
