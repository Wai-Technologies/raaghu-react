import React from 'react';
import {
  Stack as MuiStack,
  StackProps,
  Divider
} from '@mui/material';
import './rds-stack.scss';

export interface RdsStackProps extends StackProps {
  children: React.ReactNode;
  gap?: number | string;
  // allow boolean in addition to StackProps' divider type (ReactNode)
  divider?: boolean | React.ReactNode;
  // optional color for the auto-created divider when divider is boolean true
  dividerColor?: string;
}

const RdsStack: React.FC<RdsStackProps> = ({
  children,
  gap,
  spacing,
  divider,
  dividerColor,
  ...props
}) => {
  // If consumer passed a boolean `true` for divider (as in some stories),
  // convert it into a proper <Divider /> element. If divider is already
  // a React node, pass it through.
  let stackDivider: React.ReactNode | undefined = undefined;

  if (typeof divider === 'boolean') {
    if (divider) {
      // Decide orientation based on direction when it's a string; fall back
      // to 'vertical' which is suitable for row layouts (common default).
      const dir = (props.direction && typeof props.direction === 'string')
        ? props.direction
        : 'row';
      const orientation = dir.includes('row') ? 'vertical' : 'horizontal';
      // Use a CSS class on the Divider; the actual color will be picked up
      // from a CSS custom property set on the stack root (see SCSS).
      stackDivider = (
        <Divider
          className="rds-stack__divider"
          orientation={orientation as any}
          flexItem
        />
      );
    }
  } else {
    stackDivider = divider;
  }

  // Extract any incoming className/style so we can merge them with our
  // stack-level class and the CSS variable for divider color.
  const { className: propClassName, style: propStyle, ...restProps } = props as any;
  const rootClassName = ['rds-stack', propClassName].filter(Boolean).join(' ');
  const cssVarStyle = dividerColor
    ? ({ ['--rds-stack-divider-color']: dividerColor } as React.CSSProperties)
    : undefined;
  const mergedStyle = propStyle ? { ...propStyle, ...cssVarStyle } : cssVarStyle;

  return (
    <MuiStack
      spacing={spacing || gap}
      {...restProps}
      className={rootClassName}
      style={mergedStyle}
      divider={stackDivider}
    >
      {children}
    </MuiStack>
  );
};
RdsStack.displayName = 'RdsStack';
export default RdsStack;
