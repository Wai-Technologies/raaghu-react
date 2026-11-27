import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, type TabsProps } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import './rds-tabs.scss';

export interface RdsTabItem {
  id: string | number;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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

export interface RdsTabsProps extends Omit<TabsProps, 'orientation'> {
  tabs: RdsTabItem[];
  activeTab?: string | number;
  onTabChange?: (tabId: string | number) => void;
  layout?: RdsTabsLayout;
  type?: 'horizontal' | 'vertical';
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
  showLeftIcon?: boolean; 
  showRightIcon?: boolean;
  /** Shows the active tab in its selected style. */
  selected?: boolean;
  /** Disables every tab. */
  disabled?: boolean;
  /**
   * @deprecated Use `selected` and `disabled` instead.
   */
  state?: 'default' | 'hover' | 'selected' | 'disabled';
  level?: number;
}

const RdsTabs = React.forwardRef<HTMLDivElement, RdsTabsProps>(function RdsTabs({
  tabs,
  activeTab,
  onTabChange,
  value,
  onChange,
  layout = 'filled',
  type = 'horizontal',
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  selected = true,
  disabled,
  state,
  level: _level,
  className,
  ...props
}, ref) {
  const isDisabled = disabled ?? state === 'disabled';
  const stateClass = isDisabled ? 'disabled' : (state ?? 'default');
  const capitalizeFirstLetter = (text: string) => {
    if (typeof text !== 'string' || text.length === 0) return text;
    const result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return result;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setInternalValue(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

const layoutClass = `rds-tabs--${layout} rds-state--${stateClass}${isDisabled ? ' rds-tabs--disabled' : ''}`;

  const tabsWithIcons = tabs.map((tab) => ({
    ...tab,
    leftIcon: showLeftIcon ? (tab.leftIcon ?? leftIcon ?? <PersonIcon fontSize="small" />) : undefined,
    rightIcon: showRightIcon ? (tab.rightIcon ?? rightIcon ?? <AddIcon fontSize="small" />) : undefined,
  }));

  const providedValue = (value ?? activeTab);
  const firstEnabledId = tabs.find((tab) => !tab.disabled)?.id;
  const [internalValue, setInternalValue] = React.useState<string | number | undefined>(undefined);
  const resolvedValue = providedValue ?? internalValue ?? firstEnabledId;

  return (
    <MuiTabs
      value={selected ? (resolvedValue ?? false) : false}
      onChange={handleChange}
      orientation={type}
      className={`rds-tabs ${layoutClass}${className ? ` ${className}` : ''}`}
      {...props}
      ref={ref}
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
            disabled={isDisabled || tab.disabled}
            title={tab.title ? capitalizeFirstLetter(tab.title) : capitalizeFirstLetter(tab.label)}
          />
        );
      })}
    </MuiTabs>
  );
});
RdsTabs.displayName = 'RdsTabs';
export default RdsTabs;