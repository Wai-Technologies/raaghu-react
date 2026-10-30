import { type ReactNode, type CSSProperties } from 'react';
import {
  Stack as MuiStack,
  type StackProps,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-stack.scss';

export interface RdsStackProps extends Omit<StackProps, 'component'> {
  /** Items to stack. */
  children: ReactNode;
  /** @deprecated Use `spacing` instead. `spacing` wins when both are set (`spacing={0}` is honoured). */
  gap?: number | string;
  /** `true` renders a default divider (vertical for row directions); a node is used as the divider. */
  divider?: boolean | ReactNode;
  /** Colour of the default divider, applied via the `--rds-stack-divider-color` CSS variable. */
  dividerColor?: string;
}

type DirectionValue = NonNullable<StackProps['direction']>;

function orientationForDirection(dir: string): 'horizontal' | 'vertical' {
  return dir.includes('row') ? 'vertical' : 'horizontal';
}

const RdsStack = ({
  children,
  gap,
  spacing,
  divider,
  dividerColor,
  direction = 'column',
  ...props
}: RdsStackProps) => {
  if (gap !== undefined) warnDeprecatedProp('RdsStack', 'gap', '`spacing`');
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const upMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const upLg = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const upXl = useMediaQuery(theme.breakpoints.up('xl'), { noSsr: true });

  const resolveDirection = (value: DirectionValue): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      const map = value as Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>>;
      if (upXl && map.xl != null) return map.xl;
      if (upLg && map.lg != null) return map.lg;
      if (upMd && map.md != null) return map.md;
      if (upSm && map.sm != null) return map.sm;
      return map.xs ?? 'column';
    }
    return 'column';
  };

  let stackDivider: ReactNode | undefined = undefined;

  if (typeof divider === 'boolean') {
    if (divider) {
      const orientation = orientationForDirection(resolveDirection(direction));
      stackDivider = (
        <Divider
          className="rds-stack__divider"
          orientation={orientation}
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
      direction={direction}
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
