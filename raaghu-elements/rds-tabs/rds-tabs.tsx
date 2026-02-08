import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, type TabsProps } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import './rds-tabs.scss';

export interface RdsTabItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode; 
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
  type = 'horizontal',
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  ...props
}:RdsTabsProps) => {
  const capitalizeFirstLetter = (text: string) => {
    if (typeof text !== 'string' || text.length === 0) return text;
    const result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return result;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

const layoutClass = `rds-tabs--${layout} rds-state--${props.state || 'default'}`;

  const tabsWithIcons = tabs.map((tab) => ({
    ...tab,
    leftIcon: showLeftIcon ? (tab.leftIcon ?? leftIcon ?? <PersonIcon fontSize="small" />) : undefined,
    rightIcon: showRightIcon ? (tab.rightIcon ?? rightIcon ?? <AddIcon fontSize="small" />) : undefined,
  }));

  return (
    <MuiTabs
      value={value || activeTab}
      onChange={handleChange}
      orientation={type}
      className={`rds-tabs ${layoutClass}`}
      {...props}
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