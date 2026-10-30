import {
  Box as MuiBox,
  type BoxProps
} from '@mui/material';
import clsx from 'clsx';
import './rds-box.scss';

/**
 * Props for RdsBox. Same as MUI `BoxProps`, including the polymorphic
 * `component` prop (e.g. `component="section"` or a component type) and
 * `children` (`ReactNode`).
 */
export type RdsBoxProps = BoxProps;

const RdsBox = ({
  children,
  className,
  ...props
}: RdsBoxProps) => {
  const mergedClassName = clsx('rds-box', className);

  return (
    <MuiBox {...props} className={mergedClassName}>
      {children}
    </MuiBox>
  );
};

RdsBox.displayName = 'RdsBox';
export default RdsBox;
