import { type ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  type CardProps,
} from '@mui/material';
import clsx from 'clsx';
import { useRaaghuTheme } from '../../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import './rds-card-detail.scss';

export interface RdsCardDetailProps extends Omit<CardProps, 'component'> {
  title?: string;
  subtitle?: string;
  image?: string;
  imageHeight?: number;
  /**
   * Alt text for `image`. Pass `''` for a purely decorative image.
   * When omitted, the alt text falls back to `title`, then to `'Card image'`.
   */
  imageAlt?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const RdsCardDetail = ({
  title,
  subtitle,
  image,
  imageHeight = 140,
  imageAlt,
  actions,
  children,
  sx,
  className,
  ...props
}: RdsCardDetailProps) => {
  const { mode } = useRaaghuTheme();

  const passedElevation = (props.elevation ?? 1) as number;
  const isElevationVariant = props.variant !== 'outlined';
  const isDarkMode = mode === 'dark';

  // For elevation variant: remove border so the shadow is the visual indicator.
  // In dark mode MUI doesn't render shadows natively, so we apply a custom shadow token.
  const elevationSx = isElevationVariant
    ? {
        border: 'none',
        ...(isDarkMode && passedElevation > 0
          ? { boxShadow: `var(--rds-elevation-${Math.min(passedElevation, 5)}, var(--rds-elevation-1))` }
          : {}),
      }
    : {};

  // Base styles first so the consumer's `sx` always wins.
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
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt ?? (title || 'Card image')}
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
