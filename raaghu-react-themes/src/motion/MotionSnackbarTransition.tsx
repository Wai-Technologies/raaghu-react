import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

interface MotionSnackbarTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
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
 * Drop-in replacement for MUI Snackbar's default Slide transition.
 * Pass as TransitionComponent prop on MuiSnackbar.
 * Slides up from bottom + fades in, slides down + fades out.
 */
const MotionSnackbarTransition = React.forwardRef<HTMLDivElement, MotionSnackbarTransitionProps>(
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
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeDecelerate }}
            onAnimationComplete={() => isIn && onEntered?.()}
            {...rest}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MotionSnackbarTransition.displayName = 'MotionSnackbarTransition';
export default MotionSnackbarTransition;
