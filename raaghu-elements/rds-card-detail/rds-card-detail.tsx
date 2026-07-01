import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  CardProps,
} from '@mui/material';
import { useRaaghuTheme } from '../../raaghu-react-themes/src/provider/RaaghuThemeProvider';
import './rds-card-detail.scss';

export interface RdsCardDetailProps extends CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageHeight?: number;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const isRenderableNode = (node: unknown): node is React.ReactNode => {
  if (node == null || node === false) return false;
  if (typeof node === 'string' || typeof node === 'number') return true;
  if (React.isValidElement(node)) return true;
  if (Array.isArray(node)) return node.length > 0;
  return false;
};

const RdsCardDetail: React.FC<RdsCardDetailProps> = ({
  title,
  subtitle,
  image,
  imageHeight = 140,
  actions,
  children,
  ...props
}) => {
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

  const mergedClassName = `rds-card-detail ${props.className || ''}`.trim();
  const resolvedImageHeight =
    typeof imageHeight === 'number' && !Number.isNaN(imageHeight) ? imageHeight : 140;
  const renderedActions = isRenderableNode(actions) ? actions : null;

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
          height={resolvedImageHeight}
          image={image}
          alt={title || 'Card image'}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {renderedActions && (
        <CardActions>
          {renderedActions}
        </CardActions>
      )}
    </Card>
  );
};

RdsCardDetail.displayName = 'RdsCardDetail';
export default RdsCardDetail;
