import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, type BreadcrumbsProps, Link, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import './rds-breadcrumbs.scss';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export enum BreadcrumbSeparator {
  GreaterThan = ">",
  Slash = "/",
  Arrow = "→",
  DoubleArrow = "»",
  Pipe = "|",
  Dash = "-",
  Plus = "+",
}

const iconMap: Record<string, React.ElementType> = {
  home: HomeOutlinedIcon,
  folder: FolderOutlinedIcon,
  category: CategoryOutlinedIcon,
  business: BusinessOutlinedIcon,
  inventory: InventoryOutlinedIcon,
  star: StarBorderOutlinedIcon,
};

const getDefaultIconForPosition = (index: number, label: string): string => {
  if (index === 0) {
    return 'home';
  }
  const labelLower = label.toLowerCase();
  if (labelLower.includes('product') || labelLower.includes('shop') || labelLower.includes('store')) {
    return 'inventory';
  }
  if (labelLower.includes('category') || labelLower.includes('section')) {
    return 'category';
  }
  if (labelLower.includes('folder') || labelLower.includes('directory')) {
    return 'folder';
  }
  if (labelLower.includes('business') || labelLower.includes('company')) {
    return 'business';
  }
  
  const positionIcons = ['home', 'inventory', 'category', 'folder', 'star'];
  return positionIcons[index] || 'folder';
};

export interface RdsBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean;
  /** Shows this item in its selected style (overrides the breadcrumb-level `selected`). */
  selected?: boolean;
  /** Disables this item. */
  disabled?: boolean;
  /** Enables the hover effect on this item (overrides the breadcrumb-level `hover`). */
  hover?: boolean;
  /** @deprecated Use `selected` or `hover` instead. */
  state?: 'default' | 'hover' | 'selected';
  icon?: string;
}

export interface RdsBreadcrumbsProps extends Omit<BreadcrumbsProps, 'children'> {
  items: RdsBreadcrumbItem[];
  separator?: React.ReactNode | BreadcrumbSeparator;
  separatorType?: BreadcrumbSeparator;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean;
  /** Shows the breadcrumb items in their selected style when clicked. */
  selected?: boolean;
  /** Disables the whole breadcrumb trail. */
  disabled?: boolean;
  /** Enables the hover effect on the breadcrumb items. */
  hover?: boolean;
  /** @deprecated Use `selected`, `disabled` or `hover` instead. */
  state?: 'default' | 'hover' | 'selected';
  icon?: string;
  title?: string;
  autoIcons?: boolean;
}

const RdsBreadcrumbs = ({
  items,
  separator,
  separatorType,
  level,
  layout = 'without background',
  className,
  showIcon = true,
  selected,
  disabled = false,
  hover,
  state,
  icon,
  autoIcons = true,
  ...props
}:RdsBreadcrumbsProps) => {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  if (state !== undefined) {
    warnDeprecatedProp('RdsBreadcrumbs', 'state', '`selected`, `disabled` or `hover`');
  }
  if (items.some(item => item.state !== undefined)) {
    warnDeprecatedProp('RdsBreadcrumbs', 'items[].state', '`items[].selected` or `items[].hover`');
  }
  const rootSelected = selected ?? state === 'selected';
  const rootHover = hover ?? state === 'hover';
  const isItemSelected = (item: RdsBreadcrumbItem) =>
    item.selected ?? (item.state !== undefined ? item.state === 'selected' : rootSelected);
  const isItemHover = (item: RdsBreadcrumbItem) =>
    item.hover ?? (item.state !== undefined ? item.state === 'hover' : rootHover);
  
  const isRenderableSeparator = (value: unknown): value is React.ReactNode | BreadcrumbSeparator => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true;
    if (React.isValidElement(value)) return true;
    return false;
  };

  const getSeparator = (): React.ReactNode => {
    if (isRenderableSeparator(separator)) {
      return separator;
    }
    
    if (separatorType) {
      return <span className="rds-breadcrumbs__separator">{separatorType}</span>;
    }
    
    return <span className="rds-breadcrumbs__separator"><NavigateNextIcon fontSize="small" color="inherit" /></span>;
  };
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

  let filteredItems = getFilteredItems();
  if (props.title && filteredItems.length > 0) {
    filteredItems = filteredItems.map((item, index) => {
      if (index === 0) {
        return { ...item, label: props.title! };
      }
      return item;
    });
  }

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

  const breadcrumbsClass = `rds-breadcrumbs ${getLayoutClass()}${disabled ? ' rds-breadcrumbs__disabled' : ''} ${className || ''}`.trim();

  const getStateClass = (item: RdsBreadcrumbItem) => {
    if (isItemSelected(item)) return 'rds-breadcrumbs__item__selected';
    if (isItemHover(item)) return 'rds-breadcrumbs__item__hover';
    return '';
  };

  const getIconComponent = (itemIcon?: string, globalIcon?: string, index?: number, label?: string): React.ReactNode => {
    let iconName: string;
    if (itemIcon) {
      iconName = itemIcon;
    } else if (globalIcon) {
      iconName = globalIcon;
    } else if (autoIcons && index !== undefined && label !== undefined) {
      iconName = getDefaultIconForPosition(index, label);
    } else {
      iconName = 'home';
    }
    
    const IconComp = iconMap[iconName.toLowerCase()] || HomeOutlinedIcon;
    return <IconComp sx={{ fontSize: 'var(--rds-font-size-xl)', verticalAlign: 'middle', mr: 0.5 }} color="inherit" />;
  };

  return (
    <MuiBreadcrumbs 
      separator={getSeparator()} 
      className={breadcrumbsClass}
      {...props}
    >
      {filteredItems.map((item, index) => {
        const isLast = index === filteredItems.length - 1;
        const itemLayoutClass = getLayoutClass(item.layout);
        const itemStateClass = getStateClass(item);
        const isSelected = isItemSelected(item);
        const isItemDisabled = disabled || item.disabled === true;
        const selectOnClick = item.selected ?? (item.state === 'selected' || rootSelected);

        let typographyClass = `rds-breadcrumbs__item rds-breadcrumbs__item__active ${itemLayoutClass}`;
        if (isSelected || selectedIdx === index) {
          typographyClass += ' rds-breadcrumbs__item__selected';
        }

        if (isLast || item.active || isSelected || selectedIdx === index) {
          return (
            <Typography 
              key={item.href ?? item.label} 
              className={`${typographyClass.trim()}${isItemDisabled ? ' rds-breadcrumbs__item--disabled' : ''}`}
              onClick={isItemDisabled ? undefined : () => setSelectedIdx(index)}
              aria-disabled={isItemDisabled || undefined}
              style={{ cursor: isItemDisabled ? 'default' : 'pointer' }}
            >
              {showIcon && (item.showIcon !== false) && getIconComponent(item.icon, icon, index, item.label)}
              {item.label}
            </Typography>
          );
        }

        const enableHoverClass = isItemHover(item) && !isItemDisabled ? 'rds-breadcrumbs__item__enable-hover' : '';
        const disabledClass = isItemDisabled ? 'rds-breadcrumbs__item--disabled' : '';
        return (
          <Link
            key={item.href ?? item.label}
            color="inherit"
            href={isItemDisabled ? undefined : item.href}
            aria-disabled={isItemDisabled || undefined}
            tabIndex={isItemDisabled ? -1 : undefined}
            onClick={e => {
              if (isItemDisabled) {
                e.preventDefault();
                return;
              }
              if (selectOnClick) {
                setSelectedIdx(index);
                e.preventDefault();
              }
              if (item.onClick) item.onClick();
            }}
            underline={isItemDisabled ? 'none' : 'hover'}
            className={`rds-breadcrumbs__item ${itemLayoutClass} ${itemStateClass} ${enableHoverClass} ${disabledClass}`.replace(/\s+/g, ' ').trim()}
            sx={{ cursor: isItemDisabled ? 'default' : item.onClick || selectOnClick ? 'pointer' : 'default' }}
          >
            {showIcon && (item.showIcon !== false) && getIconComponent(item.icon, icon, index, item.label)}
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

RdsBreadcrumbs.displayName = 'RdsBreadcrumbs';
export default RdsBreadcrumbs;
