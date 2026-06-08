import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useMotionTokens } from './useMotionTokens';

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

function getInitialOffset(anchor: DrawerAnchor): { x?: number; y?: number } {
  switch (anchor) {
    case 'left':   return { x: -320 };
    case 'right':  return { x: 320 };
    case 'top':    return { y: -320 };
    case 'bottom': return { y: 320 };
  }
}

interface MotionDrawerTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  anchor?: DrawerAnchor;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

/**
 * Drop-in replacement for MUI Drawer's default Slide transition.
 * Pass as TransitionComponent and supply anchor via TransitionProps.
 *
 * Example:
 *   <MuiDrawer
 *     TransitionComponent={MotionDrawerTransition}
 *     TransitionProps={{ anchor: 'left' } as any}
 *   />
 */
const MotionDrawerTransition = React.forwardRef<HTMLDivElement, MotionDrawerTransitionProps>(
  ({ in: isIn, children, anchor = 'left', onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    const tokens = useMotionTokens();
    const shouldReduce = useReducedMotion();
    const offset = getInitialOffset(anchor);
    const duration = typeof durationMs === 'number' ? durationMs / 1000 : tokens.slow;

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
            initial={shouldReduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={shouldReduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { duration, ease: tokens.easeDecelerate }
            }
            onAnimationComplete={() => isIn && onEntered?.()}
            style={{ height: '100%' }}
            {...rest}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MotionDrawerTransition.displayName = 'MotionDrawerTransition';
export default MotionDrawerTransition;
