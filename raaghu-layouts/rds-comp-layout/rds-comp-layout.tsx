import { type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';
import clsx from 'clsx';
import './rds-comp-layout.scss';
import renderLayoutContent from './renderLayoutContent';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

type LayoutDisplayType = 'Basic' | 'Board' | 'Boxify' | 'Cardify' | 'Collage' | 'Gridify' | 'Highlight' | 'Matrix' | 'Mosaic' | 'Nexus' | 'Pinboard' | 'Sections' | 'Snapshots' | 'Splitz' | 'Spotlight' | 'Stacks' | 'Dashboard' | 'Relaxed';

export type LayoutTemplate = Lowercase<LayoutDisplayType>;

const toDisplayType = (template: LayoutTemplate) =>
  (template.charAt(0).toUpperCase() + template.slice(1)) as LayoutDisplayType;

export interface RdsCompLayoutProps extends BoxProps {
  children?: ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
  /** Figma layout name, rendered when `mode` is `'standard'`. */
  displayType?: LayoutDisplayType;
  /** Renders the predefined layout template. */
  template?: LayoutTemplate;
  elevated?: boolean;
  /** @deprecated Use `elevated` instead. */
  hasShadow?: boolean;
  mode?: 'standard';
}

const RdsCompLayout = ({
  children,
  spacing = 2,
  direction = 'column',
  fullHeight = false,
  fullWidth = false,
  displayType,
  template,
  elevated,
  hasShadow,
  wrap = false,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  className,
  mode,
  sx,
  ...props
}: RdsCompLayoutProps) => {
  if (hasShadow !== undefined) warnDeprecatedProp('RdsCompLayout', 'hasShadow', '`elevated`');

  if (template || mode === 'standard') {
    return renderLayoutContent(template ? toDisplayType(template) : displayType ?? 'Basic', elevated ?? hasShadow ?? false);
  }

  return (
    <Box
      {...props}
      className={clsx('rds-layout', direction, fullHeight && 'full-height', fullWidth && 'full-width', className)}
      sx={[
        {
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          justifyContent,
          alignItems,
          gap: spacing,
          height: fullHeight ? '100%' : 'auto',
          width: fullWidth ? '100%' : 'auto',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};
RdsCompLayout.displayName = 'RdsCompLayout';
export default RdsCompLayout;
