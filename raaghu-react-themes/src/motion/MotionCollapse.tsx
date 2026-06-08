import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
      <motion.div
        ref={ref}
        initial={false}
        animate={
          isIn
            ? { height: 'auto', opacity: 1, pointerEvents: 'auto' as const }
            : { height: 0, opacity: 0, pointerEvents: 'none' as const }
        }
        onAnimationComplete={() => { if (!isIn) onExited?.(); }}
        transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeStandard }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCollapse.displayName = 'MotionCollapse';
export default MotionCollapse;
