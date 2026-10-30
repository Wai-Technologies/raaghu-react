import { type ReactNode, type SyntheticEvent } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, type TabsProps } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-tabs.scss';

function capitalizeFirstLetter(text: string): string {
  if (typeof text !== 'string' || text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export interface RdsTabItem {
  id: string | number;
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  leftIcon?: ReactNode;
  /** @deprecated Use `endIcon` instead. */
  rightIcon?: ReactNode;
  disabled?: boolean;
  title?: string; 
  level?: number;
}

export type RdsTabsLayout =
  | 'filled'
  | 'flap'
  | 'line-bottom'
  | 'line-bottom-solid'
  | 'line-left'
  | 'line-left-solid'
  | 'line-right'
  | 'line-right-solid'
  | 'line-top'
  | 'line-top-solid'
  | 'pill';

/**
 * Tab strip built on MUI `Tabs`. Pass `items` as data; select with `value` / `onChange`.
 * Presentation uses `layout`; selection and unavailable tabs use `value` and item-level `disabled`.
 */
export interface RdsTabsProps extends Omit<TabsProps, 'component'> {
  /** Tabs to render (id, label, icons, disabled state). */
  items?: RdsTabItem[];
  /** @deprecated Use `items` instead. */
  tabs?: RdsTabItem[];
  /** @deprecated Use `value` instead. */
  activeTab?: string | number;
  /** @deprecated Use `onChange(event, value)` instead. */
  onTabChange?: (tabId: string | number) => void;
  /** Visual layout of the tab strip. @default 'filled' */
  layout?: RdsTabsLayout;
  /** @deprecated Use `orientation` instead. */
  type?: 'horizontal' | 'vertical';
  /** Default start icon for tabs that do not define their own. */
  startIcon?: ReactNode;
  /** Default end icon for tabs that do not define their own. */
  endIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  leftIcon?: ReactNode;
  /** @deprecated Use `endIcon` instead. */
  rightIcon?: ReactNode;
  /** Shows a start icon on every tab, using a default person icon when none is set. @default false */
  showLeftIcon?: boolean; 
  /** Shows an end icon on every tab, using a default add icon when none is set. @default false */
  showRightIcon?: boolean; 
  /** Accepted but not used by the component. */
  level?: number;
}

const RdsTabs = ({
  items,
  tabs,
  activeTab,
  onTabChange,
  value,
  onChange,
  layout = 'filled',
  orientation,
  type,
  startIcon,
  endIcon,
  leftIcon,
  rightIcon,
  showLeftIcon = false,
  showRightIcon = false,
  level: _level,
  className,
  ...props
}:RdsTabsProps) => {
  if (activeTab !== undefined) warnDeprecatedProp('RdsTabs', 'activeTab', '`value`');
  if (onTabChange !== undefined) warnDeprecatedProp('RdsTabs', 'onTabChange', '`onChange`');
  if (type !== undefined) warnDeprecatedProp('RdsTabs', 'type', '`orientation`');
  if (tabs !== undefined) warnDeprecatedProp('RdsTabs', 'tabs', '`items`');
  if (leftIcon !== undefined) warnDeprecatedProp('RdsTabs', 'leftIcon', '`startIcon`');
  if (rightIcon !== undefined) warnDeprecatedProp('RdsTabs', 'rightIcon', '`endIcon`');
  const tabItems = items ?? tabs ?? [];
  if (tabItems.some((tab) => tab.leftIcon !== undefined)) warnDeprecatedProp('RdsTabs', 'tabs[].leftIcon', '`items[].startIcon`');
  if (tabItems.some((tab) => tab.rightIcon !== undefined)) warnDeprecatedProp('RdsTabs', 'tabs[].rightIcon', '`items[].endIcon`');

  const handleChange = (event: SyntheticEvent, newValue: string | number) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };


  const tabsWithIcons = tabItems.map((tab) => {
    const resolvedStart = tab.startIcon ?? tab.leftIcon ?? startIcon ?? leftIcon;
    const resolvedEnd = tab.endIcon ?? tab.rightIcon ?? endIcon ?? rightIcon;
    return {
      ...tab,
      leftIcon: showLeftIcon ? (resolvedStart ?? <PersonIcon fontSize="small" />) : resolvedStart,
      rightIcon: showRightIcon ? (resolvedEnd ?? <AddIcon fontSize="small" />) : resolvedEnd,
    };
  });

  const providedValue = value ?? activeTab;

  return (
    <MuiTabs
      {...(providedValue !== undefined ? { value: providedValue } : {})}
      onChange={handleChange}
      orientation={orientation ?? type ?? 'horizontal'}
      {...props}
      className={clsx('rds-tabs', `rds-tabs--${layout}`, className)}
    >
      {tabsWithIcons.map((tab) => {
        const labelContent = (
          <span className="rds-tabs__label">
            {tab.leftIcon && (
              <span className="rds-tabs__icon rds-tabs__icon--left">{tab.leftIcon}</span>
            )}
            <span>{capitalizeFirstLetter(tab.label)}</span>
            {tab.rightIcon && (
              <span className="rds-tabs__icon rds-tabs__icon--right">{tab.rightIcon}</span>
            )}
          </span>
        );
        return (
          <MuiTab
            key={tab.id}
            value={tab.id}
            label={labelContent}
            disabled={tab.disabled}
            title={tab.title ? capitalizeFirstLetter(tab.title) : capitalizeFirstLetter(tab.label)}
          />
        );
      })}
    </MuiTabs>
  );
};
RdsTabs.displayName = 'RdsTabs';
export default RdsTabs;