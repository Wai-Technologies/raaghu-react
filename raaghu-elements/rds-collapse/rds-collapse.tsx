import { useState, type ReactNode } from 'react';
import { Collapse as MuiCollapse, type CollapseProps, Box, Typography, IconButton } from '@mui/material';
import './rds-collapse.scss';
import { ExpandMore } from '@mui/icons-material';

export interface RdsCollapseProps extends Omit<CollapseProps, 'children' | 'onToggle' | 'component'> {
  title?: string;
  children: ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  showToggleButton?: boolean;
}

const RdsCollapse = ({
  title,
  children,
  expanded = false,
  onToggle,
  showToggleButton = true,
  ...props
}: RdsCollapseProps) => {
  const isControlled = expanded !== undefined && onToggle !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(expanded ?? false);
  const currentExpanded = isControlled ? expanded : internalExpanded;

  const handleToggle = () => {
    const newExpanded = !currentExpanded;
    if (!isControlled) setInternalExpanded(newExpanded);
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
              aria-label={currentExpanded ? 'Collapse' : 'Expand'}
              size="small"
              sx={{
                transform: currentExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
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
      <MuiCollapse in={currentExpanded} {...props}>
        <Box sx={{ pt: title ? 1 : 0 }}>
          {children}
        </Box>
      </MuiCollapse>
    </Box>
  );
};

RdsCollapse.displayName = 'RdsCollapse';
export default RdsCollapse;
