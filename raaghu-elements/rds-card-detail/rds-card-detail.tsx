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
  actions?: ReactNode;
  children: ReactNode;
}

const RdsCardDetail = ({
  title,
  subtitle,
  image,
  imageHeight = 140,
  actions,
  children,
  ...props
}: RdsCardDetailProps) => {
  const { mode } = useRaaghuTheme();

  const passedElevation = (props.elevation ?? 0) as number;
  const isElevationVariant = props.variant === 'elevation';
  const isDarkMode = mode === 'dark';
  const shouldUsePaperShadow = isElevationVariant && isDarkMode && passedElevation > 0;

  const shadowVariable = isDarkMode ? 'var(--Paper-shadow-dark)' : 'var(--Paper-shadow-light)';
  
  const mergedSx = shouldUsePaperShadow
    ? Array.isArray(props.sx)
      ? [...props.sx, { boxShadow: shadowVariable }]
      : [props.sx || {}, { boxShadow: shadowVariable }]
    : props.sx;

  const mergedClassName = clsx('rds-card-detail', props.className);

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
          alt={title || 'Card image'}
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
