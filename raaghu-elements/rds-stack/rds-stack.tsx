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
  divider?: boolean | React.ReactNode;
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
  let stackDivider: React.ReactNode | undefined = undefined;
  const rawDirection = props.direction;
  const directionValues: string[] = typeof rawDirection === 'string'
    ? [rawDirection]
    : Array.isArray(rawDirection)
      ? rawDirection.filter((v): v is string => typeof v === 'string')
      : rawDirection && typeof rawDirection === 'object'
        ? Object.values(rawDirection).filter((v): v is string => typeof v === 'string')
        : [];
  const hasRowDirection = directionValues.some((v) => v.includes('row'));

  if (typeof divider === 'boolean') {
    if (divider) {
      const dir = directionValues[0] ?? 'column';
      const orientation = dir.includes('row') ? 'vertical' : 'horizontal';
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

  const {
    className: propClassName,
    style: propStyle,
    useFlexGap = true,
    flexWrap = hasRowDirection ? 'wrap' : undefined,
    ...restProps
  } = props as any;
  const rootClassName = ['rds-stack', propClassName].filter(Boolean).join(' ');
  const cssVarStyle = dividerColor
    ? ({ ['--rds-stack-divider-color']: dividerColor } as React.CSSProperties)
    : undefined;
  const mergedStyle = propStyle ? { ...propStyle, ...cssVarStyle } : cssVarStyle;

  return (
    <MuiStack
      spacing={spacing ?? gap}
      useFlexGap={useFlexGap}
      flexWrap={flexWrap}
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
