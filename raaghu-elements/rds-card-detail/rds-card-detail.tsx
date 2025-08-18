import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  CardProps,
} from '@mui/material';

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
  return (
    <Card {...props}>
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
