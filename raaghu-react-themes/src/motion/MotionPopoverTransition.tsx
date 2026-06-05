import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

interface MotionPopoverTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
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
 * Drop-in replacement for MUI Popover's default Grow transition.
 * Pass as TransitionComponent prop on MuiPopover.
 */
const MotionPopoverTransition = React.forwardRef<HTMLDivElement, MotionPopoverTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    const tokens = useMotionTokens();
    const shouldReduce = useReducedMotion();
    const duration = typeof durationMs === 'number' ? durationMs / 1000 : tokens.base;

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
            initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeDecelerate }}
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

MotionPopoverTransition.displayName = 'MotionPopoverTransition';
export default MotionPopoverTransition;
