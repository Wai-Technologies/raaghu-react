import { useState, type ReactNode, type ReactElement, type ElementType, type KeyboardEvent, type MouseEvent } from 'react';
import { Breadcrumbs as MuiBreadcrumbs, type BreadcrumbsProps, Link, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-breadcrumbs.scss';
import clsx from 'clsx';
export { BreadcrumbSeparator } from './rds-breadcrumbs-types';
import { BreadcrumbSeparator } from './rds-breadcrumbs-types';

const iconMap: Record<string, ElementType> = {
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

/** A built-in icon name or a custom icon element. */
export type RdsBreadcrumbIcon = keyof typeof iconMap | ReactElement;

const isIconGiven = (value: RdsBreadcrumbIcon): boolean =>
  value !== undefined && value !== null && value !== '' && typeof value !== 'boolean';

/** Enter/Space activate an element that has `role="button"` (native `<a href>` already handles Enter). */
const activateOnKey = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    event.currentTarget.click();
  }
};

export interface RdsBreadcrumbItem {
  label: string;
  href?: string;
  /** @deprecated – has no effect (only used to build the React key). Use `href`. */
  url?: string;
  /** @deprecated – has no effect (only used to build the React key). Use `href`. */
  routePath?: string;
  /** Called when the item is clicked. Receives the click event (e.g. to call `preventDefault()` for client-side routing). */
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
  active?: boolean;
  selected?: boolean;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean;
  /** Built-in icon name (see `RdsBreadcrumbIcon`) or any icon element. Overrides the component-level `icon`. */
  icon?: RdsBreadcrumbIcon;
}

export interface RdsBreadcrumbsProps extends Omit<BreadcrumbsProps, 'children' | 'component'> {
  items: RdsBreadcrumbItem[];
  /** Separator between items. Takes precedence over `separatorType` when both are given. */
  separator?: ReactNode | BreadcrumbSeparator;
  /** Predefined separator character. Accepts the `BreadcrumbSeparator` enum or its string value (e.g. `'/'`). Ignored when `separator` is given. */
  separatorType?: BreadcrumbSeparator | `${BreadcrumbSeparator}`;
  level?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  layout?: 'pill background' | 'without background' | 'square background';
  showIcon?: boolean;
  /** Built-in icon name (see `RdsBreadcrumbIcon`) or any icon element, used for every item that has no `icon` of its own. */
  icon?: RdsBreadcrumbIcon;
  /** @deprecated Set the first item's `label` instead. Replaces the label of the first item; not rendered as an HTML `title` attribute. */
  title?: string;
  /** @deprecated Pass `icon` explicitly instead. Picks a default icon per item position and label. Defaults to `true`. */
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
  icon,
  title,
  autoIcons: autoIconsProp,
  ...props
}:RdsBreadcrumbsProps) => {
  if (title !== undefined) warnDeprecatedProp('RdsBreadcrumbs', 'title', "the first item's `label`");
  if (autoIconsProp !== undefined) warnDeprecatedProp('RdsBreadcrumbs', 'autoIcons', '`icon`');
  const autoIcons = autoIconsProp ?? true;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
  const getSeparator = (): ReactNode => {
    if (separator !== undefined) {
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
  if (title && filteredItems.length > 0) {
    filteredItems = filteredItems.map((item, index) => {
      if (index === 0) {
        return { ...item, label: title };
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

  const breadcrumbsClass = clsx('rds-breadcrumbs', getLayoutClass(), className);
  
  const getIconComponent = (itemIcon?: RdsBreadcrumbIcon, globalIcon?: RdsBreadcrumbIcon, index?: number, label?: string): ReactNode => {
    let iconName: RdsBreadcrumbIcon;
    if (isIconGiven(itemIcon)) {
      iconName = itemIcon;
    } else if (isIconGiven(globalIcon)) {
      iconName = globalIcon;
    } else if (autoIcons && index !== undefined && label !== undefined) {
      iconName = getDefaultIconForPosition(index, label);
    } else {
      iconName = 'home';
    }

    if (typeof iconName !== 'string') {
      return iconName;
    }

    const IconComp = iconMap[iconName.toLowerCase()] || HomeOutlinedIcon;
    return <IconComp sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} color="inherit" />;
  };

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      {...props}
      separator={getSeparator()}
      className={breadcrumbsClass}
    >
      {filteredItems.map((item, index) => {
        const isLast = index === filteredItems.length - 1;
        const itemLayoutClass = getLayoutClass(item.layout);
        const isSelected = item.selected === true;

        const typographyClass = clsx(
          'rds-breadcrumbs__item',
          'rds-breadcrumbs__item__active',
          itemLayoutClass,
          (isSelected || selectedIdx === index) && 'rds-breadcrumbs__item__selected',
        );

        if (isLast || item.active || isSelected || selectedIdx === index) {
          return (
            <Typography 
              key={`${item.label}-${item.routePath || item.url || index}`}
              className={typographyClass.trim()}
              onClick={() => setSelectedIdx(index)}
              {...(isLast
                ? { 'aria-current': 'page' as const }
                : { role: 'button', tabIndex: 0, onKeyDown: activateOnKey })}
              style={{ cursor: 'pointer' }}
            >
              {showIcon && (item.showIcon !== false) && getIconComponent(item.icon, icon, index, item.label)}
              {item.label}
            </Typography>
          );
        }

        const isClickable = Boolean(item.onClick) || item.selected === true;
        const buttonProps = !item.href && isClickable
          ? { role: 'button', tabIndex: 0, onKeyDown: activateOnKey }
          : {};
        return (
          <Link
            key={`${item.label}-${item.routePath || item.url || item.href || 'link'}`}
            color="inherit"
            href={item.href}
            {...buttonProps}
            onClick={e => {
              if (item.selected) {
                setSelectedIdx(index);
                e.preventDefault();
              }
              if (item.onClick) item.onClick(e);
            }}
            underline="hover"
            className={clsx('rds-breadcrumbs__item', itemLayoutClass, item.selected && 'rds-breadcrumbs__item__selected')}
            sx={{ cursor: isClickable ? 'pointer' : 'default' }}
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
