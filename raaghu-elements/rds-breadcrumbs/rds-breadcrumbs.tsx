import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, BreadcrumbsProps, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface RdsBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface RdsBreadcrumbsProps extends Omit<BreadcrumbsProps, 'children'> {
  items: RdsBreadcrumbItem[];
  separator?: React.ReactNode;
}

const RdsBreadcrumbs: React.FC<RdsBreadcrumbsProps> = ({
  items,
  separator = <NavigateNextIcon fontSize="small" />,
  ...props
}) => {
  return (
    <MuiBreadcrumbs separator={separator} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        if (isLast || item.active) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        }
        
        return (
          <Link
            key={index}
            color="inherit"
            href={item.href}
            onClick={item.onClick}
            underline="hover"
            sx={{ cursor: item.onClick ? 'pointer' : 'default' }}
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default RdsBreadcrumbs;
