import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, type BreadcrumbsProps, Link, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// Add more icons as needed
import './rds-breadcrumbs.scss';

// Map string names to icon components
const iconMap: Record<string, React.ElementType> = {
  home: HomeOutlinedIcon,
  folder: FolderOutlinedIcon,
  category: CategoryOutlinedIcon,
  star: StarBorderOutlinedIcon,
  // Add more mappings as needed
};

export interface RdsBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean; 
  state?: 'default' | 'hover' | 'selected';
  icon?: string;
}

export interface RdsBreadcrumbsProps extends Omit<BreadcrumbsProps, 'children'> {
  items: RdsBreadcrumbItem[];
  separator?: React.ReactNode;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean;
  state?: 'default' | 'hover' | 'selected';
  icon?: string; // Icon name to use from iconMap
  title?: string; // Title for the first breadcrumb
}

const RdsBreadcrumbs = ({
  items,
  separator = <NavigateNextIcon fontSize="small" />,
  level,
  layout = 'without background',
  className,
  showIcon = true,
  state,
  icon,
  ...props
}:RdsBreadcrumbsProps) => {
  // Track which breadcrumb is selected by click (for selected state)
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  // Filter items based on level if specified
  const getFilteredItems = () => {
    if (!level) return items;

    const levelMap = {
      level1: 1,
      level2: 2,
      level3: 3,
      level4: 4,
      level5: 5
    };

    const maxItems = levelMap[level];
    return items.slice(0, maxItems);
  };

  // Get filtered items first, then apply title only to the first item
  let filteredItems = getFilteredItems();
  
  // If title prop is provided, override the label of ONLY the first item
  if (props.title && filteredItems.length > 0) {
    filteredItems = filteredItems.map((item, index) => {
      if (index === 0) {
        return { ...item, label: props.title! };
      }
      return item;
    });
  }

  // Generate CSS classes based on layout
  const getLayoutClass = (itemLayout?: string) => {
    const activeLayout = itemLayout || layout;
    switch (activeLayout) {
      case 'pill background':
        return 'rds-breadcrumbs__pill';
      case 'square background':
        return 'rds-breadcrumbs__square';
      case 'without background':
      default:
        return 'rds-breadcrumbs__plain';
    }
  };

  const breadcrumbsClass = `rds-breadcrumbs ${getLayoutClass()} ${className || ''}`.trim();
  // Helper to get state class
  const getStateClass = (itemState?: string) => {
    const activeState = itemState || state || 'default';
    switch (activeState) {
      case 'hover':
        return 'rds-breadcrumbs__item__hover';
      case 'selected':
        return 'rds-breadcrumbs__item__selected';
      case 'default':
      default:
        return '';
    }
  };

  // Helper to get the icon component for a breadcrumb
  const getIconComponent = (itemIcon?: string, globalIcon?: string): React.ReactNode => {
    const iconName = itemIcon || globalIcon || 'home';
    const IconComp = iconMap[iconName.toLowerCase()] || HomeOutlinedIcon;
    return <IconComp sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />;
  };

  return (
    <MuiBreadcrumbs 
      separator={separator} 
      className={breadcrumbsClass}
      {...props}
    >
      {filteredItems.map((item, index) => {
        const isLast = index === filteredItems.length - 1;
        const itemLayoutClass = getLayoutClass(item.layout);
        const itemStateClass = getStateClass(item.state);
        const isSelected = (item.state === 'selected') || (state === 'selected' && !item.state);
        const isHovered = (item.state === 'hover') || (state === 'hover' && !item.state);

        // Compose class list for Typography (last/active/selected)
        let typographyClass = `rds-breadcrumbs__item rds-breadcrumbs__item__active ${itemLayoutClass}`;
        if (isSelected || selectedIdx === index) {
          typographyClass += ' rds-breadcrumbs__item__selected';
        }

        if (isLast || item.active || isSelected || selectedIdx === index) {
          return (
            <Typography 
              key={index} 
              color="text.primary"
              className={typographyClass.trim()}
              onClick={() => setSelectedIdx(index)}
              style={{ cursor: 'pointer' }}
            >
              {showIcon && (item.showIcon !== false) && getIconComponent(item.icon, icon)}
              {item.label}
            </Typography>
          );
        }

        // Only enable hover effect if state is 'hover' (either on item or global)
        const enableHoverClass = (item.state === 'hover' || (!item.state && state === 'hover')) ? 'rds-breadcrumbs__item__enable-hover' : '';
        return (
          <Link
            key={index}
            color="inherit"
            href={item.href}
            onClick={e => {
              if (item.state === 'selected' || state === 'selected') {
                setSelectedIdx(index);
                e.preventDefault();
              }
              if (item.onClick) item.onClick();
            }}
            underline="hover"
            className={`rds-breadcrumbs__item ${itemLayoutClass} ${itemStateClass} ${enableHoverClass}`.trim()}
            sx={{ cursor: item.onClick || item.state === 'selected' || state === 'selected' ? 'pointer' : 'default' }}
          >
            {showIcon && (item.showIcon !== false) && getIconComponent(item.icon, icon)}
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default RdsBreadcrumbs;
