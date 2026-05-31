import React from 'react';
import { Collapse as MuiCollapse, CollapseProps, Box, Typography, IconButton } from '@mui/material';
import './rds-collapse.scss';
import { ExpandMore } from '@mui/icons-material';

export interface RdsCollapseProps extends Omit<CollapseProps, 'children' | 'onToggle'> {
  title?: string;
  children: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  showToggleButton?: boolean;
}

const RdsCollapse: React.FC<RdsCollapseProps> = ({
  title,
  children,
  expanded = false,
  onToggle,
  showToggleButton = true,
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = React.useState(expanded);

  React.useEffect(() => {
    setInternalExpanded(expanded);
  }, [expanded]);

  const handleToggle = () => {
    const newExpanded = !internalExpanded;
    setInternalExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <Box>
      {(title || showToggleButton) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: showToggleButton ? 'pointer' : 'default',
            py: 1,
          }}
          onClick={showToggleButton ? handleToggle : undefined}
        >
          {title && (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          )}
          {showToggleButton && (
            <IconButton
              aria-label={internalExpanded ? 'Collapse' : 'Expand'}
              size="small"
              sx={{
                transform: internalExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                p: 0,
                ml: 0,
              }}
            >
              <ExpandMore />
            </IconButton>
          )}
        </Box>
      )}
      <MuiCollapse in={internalExpanded} {...props}>
        <Box sx={{ pt: title ? 1 : 0 }}>
          {children}
        </Box>
      </MuiCollapse>
    </Box>
  );
};

RdsCollapse.displayName = 'RdsCollapse';
export default RdsCollapse;
