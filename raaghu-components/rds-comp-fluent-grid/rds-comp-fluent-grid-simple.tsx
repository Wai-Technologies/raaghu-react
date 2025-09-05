import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface SimpleGridProps {
  tableHeaders: any[];
  tableData: any[];
}

const RdsFluentGridSimple: React.FC<SimpleGridProps> = ({ tableHeaders, tableData }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Simple Fluent Grid
        </Typography>
        <Box>
          <Typography variant="body2">
            Headers: {tableHeaders.length}, Data: {tableData.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a simplified version for testing.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RdsFluentGridSimple;