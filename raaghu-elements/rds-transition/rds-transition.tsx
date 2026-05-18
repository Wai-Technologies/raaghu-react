import React, { ReactNode } from 'react';
import {
  Fade,
  Grow,
  Slide,
  Zoom,
  TransitionProps,
} from '@mui/material';
import './rds-transition.scss';

export type TransitionType = 'fade' | 'grow' | 'slide' | 'zoom';
export type TransitionDirection = 'up' | 'down' | 'left' | 'right';

export interface RdsTransitionProps extends Omit<TransitionProps, 'children' | 'in'> {
  /**
   * The type of transition effect
   * @default 'fade'
   */
  type?: TransitionType;

  /**
   * Direction for slide transition (up, down, left, right)
   * @default 'down'
   */
  direction?: TransitionDirection;

  /**
   * Duration of the transition in milliseconds
   * @default 300
   */
  duration?: number | { enter?: number; exit?: number };

  /**
   * Whether the component is visible
   * @default true
   */
  in?: boolean;

  /**
   * Custom timing function
   * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
   */
  easing?: string;

  /**
   * Content to be transitioned
   */
  children: ReactNode;

  /**
   * Callback fired when the transition enters
   */
  onEnter?: () => void;

  /**
   * Callback fired when the transition exits
   */
  onExit?: () => void;

  /**
   * Callback fired when the transition has entered
   */
  onEntered?: () => void;

  /**
   * Callback fired when the transition has exited
   */
  onExited?: () => void;

  /**
   * Whether to unmount the component when not visible
   * @default false
   */
  unmountOnExit?: boolean;

  /**
   * Whether to mount the component initially
   * @default true
   */
  mountOnEnter?: boolean;

  /**
   * Timeout configuration for transitions
   */
  timeout?: number | { enter?: number; exit?: number };

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * RdsTransition Component
 * 
 * A flexible transition wrapper component that provides multiple animation effects
 * with full theme support (light/dark mode).
 * 
 * @example
 * ```tsx
 * <RdsTransition type="fade" in={isVisible} duration={300}>
 *   <Box>Content to animate</Box>
 * </RdsTransition>
 * ```
 */
const RdsTransition: React.FC<RdsTransitionProps> = ({
  type = 'fade',
  direction = 'down',
  duration = 300,
  in: inProp = true,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  children,
  onEnter,
  onExit,
  onEntered,
  onExited,
  unmountOnExit = false,
  mountOnEnter = false,
  timeout = duration,
  className = '',
  ...props
}) => {
  // Determine which MUI transition component to use
  const getTransitionComponent = () => {
    const transitionProps = {
      in: inProp,
      timeout: timeout || duration,
      unmountOnExit,
      mountOnEnter,
      onEnter,
      onExit,
      onEntered,
      onExited,
      ...props,
    };

    const wrapperDiv = (
      <div
        className={`rds-transition rds-transition--${type} ${className}`}
        role="region"
        aria-live="polite"
      >
        {children}
      </div>
    );

    switch (type) {
      case 'grow':
        return (
          <Grow {...transitionProps}>
            {wrapperDiv}
          </Grow>
        );

      case 'slide':
        return (
          <Slide {...transitionProps} direction={direction}>
            <div
              className={`rds-transition rds-transition--slide rds-transition--slide-${direction} ${className}`}
              role="region"
              aria-live="polite"
            >
              {children}
            </div>
          </Slide>
        );

      case 'zoom':
        return (
          <Zoom {...transitionProps}>
            {wrapperDiv}
          </Zoom>
        );

      case 'fade':
      default:
        return (
          <Fade {...transitionProps}>
            {wrapperDiv}
          </Fade>
        );
    }
  };

  return getTransitionComponent();
};

RdsTransition.displayName = 'RdsTransition';
export default RdsTransition;
