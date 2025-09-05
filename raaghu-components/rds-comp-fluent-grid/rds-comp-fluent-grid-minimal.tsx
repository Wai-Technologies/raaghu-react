import React from 'react';
import { Box, Typography } from '@mui/material';

interface MinimalGridProps {
  title?: string;
}

const RdsFluentGridMinimal: React.FC<MinimalGridProps> = ({ title = 'Minimal Grid' }) => {
  return (
    <Box p={2}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">This is a minimal grid component for testing.</Typography>
    </Box>
  );
};

export default RdsFluentGridMinimal;