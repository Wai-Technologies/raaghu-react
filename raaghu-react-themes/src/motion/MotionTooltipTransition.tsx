import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

interface MotionTooltipTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

/**
 * Drop-in replacement for MUI Tooltip's default Grow transition.
 * Pass as TransitionComponent prop on MuiTooltip.
 * Uses tokens.fast by default — tooltips should be snappy.
 */
const MotionTooltipTransition = React.forwardRef<HTMLDivElement, MotionTooltipTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    const tokens = useMotionTokens();
    const shouldReduce = useReducedMotion();
    const duration = typeof durationMs === 'number' ? durationMs / 1000 : tokens.fast;

    React.useEffect(() => {
      if (isIn) {
        onEnter?.();
      } else {
        onExit?.();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    return (
      <AnimatePresence initial={false} onExitComplete={onExited}>
        {isIn && (
          <motion.div
            ref={ref}
            initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeStandard }}
            onAnimationComplete={() => isIn && onEntered?.()}
            style={{ transformOrigin: 'inherit' }}
            {...rest}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MotionTooltipTransition.displayName = 'MotionTooltipTransition';
export default MotionTooltipTransition;
