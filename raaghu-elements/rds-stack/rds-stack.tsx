import { type ReactNode, type CSSProperties } from 'react';
import {
  Stack as MuiStack,
  type StackProps,
  Divider
} from '@mui/material';
import clsx from 'clsx';
import './rds-stack.scss';

export interface RdsStackProps extends Omit<StackProps, 'component'> {
  /** Items to stack. */
  children: ReactNode;
  /** Alias of `spacing`; `spacing` wins when both are set (`spacing={0}` is honoured). */
  gap?: number | string;
  /** `true` renders a default divider (vertical for row directions); a node is used as the divider. */
  divider?: boolean | ReactNode;
  /** Colour of the default divider, applied via the `--rds-stack-divider-color` CSS variable. */
  dividerColor?: string;
}

const RdsStack = ({
  children,
  gap,
  spacing,
  divider,
  dividerColor,
  ...props
}: RdsStackProps) => {
  let stackDivider: ReactNode | undefined = undefined;

  if (typeof divider === 'boolean') {
    if (divider) {
      // MUI Stack defaults to column; row* directions use a vertical divider.
      const dir = (props.direction && typeof props.direction === 'string')
        ? props.direction
        : 'column';
      const orientation = dir.includes('row') ? 'vertical' : 'horizontal';
      stackDivider = (
        <Divider
          className="rds-stack__divider"
          orientation={orientation as 'horizontal' | 'vertical'}
          flexItem
        />
      );
    }
  } else if (divider) {
    stackDivider = divider;
  }

  const { className: propClassName, style: propStyle, ...restProps } = props;
  const rootClassName = clsx('rds-stack', propClassName);
  const cssVarStyle = dividerColor
    ? ({ ['--rds-stack-divider-color']: dividerColor } as CSSProperties)
    : undefined;
  const mergedStyle = propStyle ? { ...propStyle, ...cssVarStyle } : cssVarStyle;

  return (
    <MuiStack
      spacing={spacing ?? gap}
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
