import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

const SWIPE_DISMISS_THRESHOLD_PX = 80;
const SWIPE_DISMISS_VELOCITY = 500;

interface MotionSnackbarTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  /** Called when the user swipes past the dismiss threshold — use to close the snackbar */
  onDismiss?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

/**
 * Drop-in replacement for MUI Snackbar's default Slide transition.
 * Pass as TransitionComponent prop on MuiSnackbar.
 * Slides up from bottom + fades in, slides down + fades out.
 * Supports swipe-to-dismiss: pass onDismiss via TransitionProps to close on horizontal swipe.
 */
const MotionSnackbarTransition = React.forwardRef<HTMLDivElement, MotionSnackbarTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, onDismiss, durationMs, appear, timeout, ...rest }, ref) => {
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
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={shouldReduce ? { duration: 0 } : { duration, ease: tokens.easeDecelerate }}
            onAnimationComplete={() => isIn && onEntered?.()}
            drag={shouldReduce || !onDismiss ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              if (
                Math.abs(offset.x) > SWIPE_DISMISS_THRESHOLD_PX ||
                Math.abs(velocity.x) > SWIPE_DISMISS_VELOCITY
              ) {
                onDismiss?.();
              }
            }}
            style={{ cursor: onDismiss && !shouldReduce ? 'grab' : undefined }}
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
