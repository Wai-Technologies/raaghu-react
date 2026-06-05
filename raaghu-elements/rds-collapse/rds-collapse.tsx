import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import './rds-collapse.scss';
import { ExpandMore } from '@mui/icons-material';
import { motion, useReducedMotion } from 'motion/react';
import { MotionCollapse, useMotionTokens } from '../../raaghu-react-themes/src/motion';
import type { CollapseProps } from '@mui/material';

export interface RdsCollapseProps extends Omit<CollapseProps, 'children' | 'onToggle'> {
  title?: string;
  children: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  showToggleButton?: boolean;
  animationDuration?: number;
}

const RdsCollapse: React.FC<RdsCollapseProps> = ({
  title,
  children,
  expanded = false,
  onToggle,
  showToggleButton = true,
  animationDuration,
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = React.useState(expanded);
  const tokens = useMotionTokens();
  const shouldReduce = useReducedMotion();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : tokens.slow;

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
              sx={{ p: 0, ml: 0 }}
            >
              <motion.div
                animate={{ rotate: internalExpanded ? 180 : 0 }}
                transition={shouldReduce ? { duration: 0 } : { duration: dur, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: 'flex' }}
              >
                <ExpandMore />
              </motion.div>
            </IconButton>
          )}
        </Box>
      )}
      <MotionCollapse in={internalExpanded} durationMs={animationDuration}>
        <Box sx={{ pt: title ? 1 : 0 }}>
          {children}
        </Box>
      </MotionCollapse>
    </Box>
  );
};

RdsCollapse.displayName = 'RdsCollapse';
export default RdsCollapse;
