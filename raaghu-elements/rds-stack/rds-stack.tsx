import { type ReactNode, type CSSProperties } from 'react';
import {
  Stack as MuiStack,
  type StackProps,
  Divider
} from '@mui/material';
import clsx from 'clsx';
import './rds-stack.scss';

export interface RdsStackProps extends StackProps {
  children: ReactNode;
  gap?: number | string;
  divider?: boolean | ReactNode;
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
      const dir = (props.direction && typeof props.direction === 'string')
        ? props.direction
        : 'row';
      const orientation = dir.includes('row') ? 'vertical' : 'horizontal';
      stackDivider = (
        <Divider
          className="rds-stack__divider"
          orientation={orientation as 'horizontal' | 'vertical'}
          flexItem
        />
      );
    }
  } else {
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
