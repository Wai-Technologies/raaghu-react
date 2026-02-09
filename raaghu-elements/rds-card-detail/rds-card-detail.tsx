import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  CardProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './rds-card-detail.scss';

export interface RdsCardDetailProps extends CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageHeight?: number;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const RdsCardDetail: React.FC<RdsCardDetailProps> = ({
  title,
  subtitle,
  image,
  imageHeight = 140,
  actions,
  children,
  ...props
}) => {
  const theme = useTheme();

  const passedElevation = (props.elevation ?? 0) as number;
  const isElevationVariant = props.variant === 'elevation';
  const isDarkMode = theme?.palette?.mode === 'dark';
  const shouldUsePaperShadow = isElevationVariant && isDarkMode && passedElevation > 0;

  const shadowVariable = isDarkMode ? 'var(--Paper-shadow-dark)' : 'var(--Paper-shadow-light)';
  
  const mergedSx = shouldUsePaperShadow
    ? Array.isArray(props.sx)
      ? [...props.sx, { boxShadow: shadowVariable }]
      : [props.sx || {}, { boxShadow: shadowVariable }]
    : props.sx;

  const mergedClassName = `rds-card-detail ${props.className || ''}`.trim();

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
