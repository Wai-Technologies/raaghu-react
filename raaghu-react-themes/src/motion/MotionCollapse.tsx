import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

interface MotionCollapseProps {
  in?: boolean;
  children?: React.ReactNode;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
}

/**
 * Drop-in replacement for MUI Accordion's default Collapse transition.
 * Pass as TransitionComponent prop on MuiAccordion.
 */
const MotionCollapse = React.forwardRef<HTMLDivElement, MotionCollapseProps>(
  ({ in: isIn, children, onExited, durationMs }, ref) => {
    const tokens = useMotionTokens();
    const shouldReduce = useReducedMotion();
    const duration = typeof durationMs === 'number' ? durationMs / 1000 : tokens.slow;

    return (
      <AnimatePresence initial={false} onExitComplete={onExited}>
        {isIn && (
          <motion.div
            ref={ref}
            initial={shouldReduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeStandard }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MotionCollapse.displayName = 'MotionCollapse';
export default MotionCollapse;
