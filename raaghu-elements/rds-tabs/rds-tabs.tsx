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
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  title?: string; 
  state?: 'default' | 'hover' | 'selected' | 'disabled'; 
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
 * Tab strip built on MUI `Tabs`. Pass `tabs` as data; select with `value` / `onChange`.
 * Figma props (`layout`, `state`, `showLeftIcon` / `showRightIcon`) stay supported.
 */
export interface RdsTabsProps extends Omit<TabsProps, 'component'> {
  tabs: RdsTabItem[];
  /** @deprecated Use `value` instead. */
  activeTab?: string | number;
  /** @deprecated Use `onChange(event, value)` instead. */
  onTabChange?: (tabId: string | number) => void;
  layout?: RdsTabsLayout;
  /** @deprecated Use `orientation` instead. */
  type?: 'horizontal' | 'vertical';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showLeftIcon?: boolean; 
  showRightIcon?: boolean; 
  state?: 'default' | 'hover' | 'selected' | 'disabled'; 
  level?: number; 
}

const RdsTabs = ({
  tabs,
  activeTab,
  onTabChange,
  value,
  onChange,
  layout = 'filled',
  orientation,
  type,
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  state,
  level: _level,
  className,
  ...props
}:RdsTabsProps) => {
  if (activeTab !== undefined) warnDeprecatedProp('RdsTabs', 'activeTab', '`value`');
  if (onTabChange !== undefined) warnDeprecatedProp('RdsTabs', 'onTabChange', '`onChange`');
  if (type !== undefined) warnDeprecatedProp('RdsTabs', 'type', '`orientation`');

  const handleChange = (event: SyntheticEvent, newValue: string | number) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

const layoutClass = clsx(`rds-tabs--${layout}`, `rds-state--${state || 'default'}`);

  const tabsWithIcons = tabs.map((tab) => ({
    ...tab,
    leftIcon: showLeftIcon ? (tab.leftIcon ?? leftIcon ?? <PersonIcon fontSize="small" />) : undefined,
    rightIcon: showRightIcon ? (tab.rightIcon ?? rightIcon ?? <AddIcon fontSize="small" />) : undefined,
  }));

  // Keep Tabs uncontrolled unless a controlled value is explicitly provided.
  const providedValue = value ?? activeTab;

  return (
    <MuiTabs
      {...(providedValue !== undefined ? { value: providedValue } : {})}
      onChange={handleChange}
      orientation={orientation ?? type ?? 'horizontal'}
      {...props}
      className={clsx('rds-tabs', layoutClass, className)}
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