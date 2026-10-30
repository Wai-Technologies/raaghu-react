import { type ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  type CardProps,
  type CardMediaProps,
} from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import { useRaaghuTheme } from '../../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import './rds-card-detail.scss';

export interface RdsCardDetailProps extends Omit<CardProps, 'component'> {
  /** Title text of the card. */
  title?: string;
  /** Subtitle text shown under the title. */
  subtitle?: string;
  /** @deprecated Use `slotProps.media.image` instead. */
  image?: string;
  /** @deprecated Use `slotProps.media.height` instead. */
  imageHeight?: number;
  /** Props for the media element; they win over `image` and `imageHeight`. */
  slotProps?: { media?: Omit<CardMediaProps<'img'>, 'component'> };
  /**
   * Alt text for `image`. Pass `''` for a purely decorative image.
   * When omitted, the alt text falls back to `title`, then to `'Card image'`.
   */
  imageAlt?: string;
  /** Action content rendered at the bottom of the card. */
  actions?: ReactNode;
  children: ReactNode;
}

const RdsCardDetail = ({
  title,
  subtitle,
  image,
  imageHeight,
  imageAlt,
  slotProps,
  actions,
  children,
  sx,
  className,
  ...props
}: RdsCardDetailProps) => {
  const { mode } = useRaaghuTheme();
  if (image !== undefined) warnDeprecatedProp('RdsCardDetail', 'image', '`slotProps.media.image`');
  if (imageHeight !== undefined) warnDeprecatedProp('RdsCardDetail', 'imageHeight', '`slotProps.media.height`');
  const { image: mediaImage = image, height: mediaHeight = imageHeight ?? 140, ...mediaProps } = slotProps?.media ?? {};

  const passedElevation = (props.elevation ?? 1) as number;
  const isElevationVariant = props.variant !== 'outlined';
  const isDarkMode = mode === 'dark';

  const ELEVATION_VARS = [
    'var(--rds-elevation-0)',
    'var(--rds-elevation-1)',
    'var(--rds-elevation-2)',
    'var(--rds-elevation-3)',
    'var(--rds-elevation-4)',
    'var(--rds-elevation-5)',
  ] as const;
  const elevationSx = isElevationVariant
    ? {
        border: 'none',
        ...(isDarkMode && passedElevation > 0
          ? { boxShadow: ELEVATION_VARS[Math.min(passedElevation, 5)] ?? ELEVATION_VARS[1] }
          : {}),
      }
    : {};

  const mergedSx = [elevationSx, ...(Array.isArray(sx) ? sx : [sx])];

  const mergedClassName = clsx('rds-card-detail', className);

  return (
    <Card {...props} sx={mergedSx} className={mergedClassName}>
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
        />
      )}
      {mediaImage && (
        <CardMedia
          component="img"
          alt={imageAlt ?? (title || 'Card image')}
          {...mediaProps}
          height={mediaHeight}
          image={mediaImage}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

RdsCardDetail.displayName = 'RdsCardDetail';
export default RdsCardDetail;
