import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps } from '@mui/material';

export interface RdsTabItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RdsTabsProps extends TabsProps {
  tabs: RdsTabItem[];
  activeTab?: string | number;
  onTabChange?: (tabId: string | number) => void;
}

const RdsTabs: React.FC<RdsTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <MuiTabs
      value={value || activeTab}
      onChange={handleChange}
      {...props}
    >
      {tabs.map((tab) => (
        <MuiTab
          key={tab.id}
          value={tab.id}
          label={tab.label}
          icon={tab.icon as any}
          disabled={tab.disabled}
          iconPosition="start"
        />
      ))}
    </MuiTabs>
  );
};

export default RdsTabs;
