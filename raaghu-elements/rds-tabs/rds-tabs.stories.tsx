import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import RdsTabs from './rds-tabs';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const meta: Meta<typeof RdsTabs> = {
  title: 'Elements/Tabs',
  component: RdsTabs,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['items', 'value', 'orientation', 'layout', 'title', 'startIcon', 'endIcon', 'showLeftIcon', 'showRightIcon', 'level'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    items: {
      control: 'object',
      description: "Tab configurations. Set an item's disabled property to disable that tab.",
    },
    value: {
      control: 'number',
      description: 'Value/id of the selected tab.',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Type of the tabs',
    },
    layout: {
      control: 'select',
      options: [
        'filled',
        'flap',
        'line-bottom',
        'line-bottom-solid',
        'line-left',
        'line-left-solid',
        'line-right',
        'line-right-solid',
        'line-top',
        'line-top-solid',
        'pill',
      ],
      description: 'Tab layout style',
      defaultValue: 'filled',
    },
    title: {
      control: 'text',
      description: 'Override label for the active tab (applies in story render only)',
      defaultValue: '',
    },
    startIcon: {
      control: 'select',
      options: ['Person', 'Add', 'Home'],
      description: 'Icon to display on the left side of the tab label',
      defaultValue: 'Person',
    },
    endIcon: {
      control: 'select',
      options: ['Person', 'Add', 'Home'],
      description: 'Icon to display on the right side of the tab label',
      defaultValue: 'Add',
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Control to show/hide left icon',
      defaultValue: true,
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Control to show/hide right icon',
      defaultValue: true,
    },
    level: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Number of tabs to show (level)',
      defaultValue: 4,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { id: 0, label: 'Tab 1', icon: undefined, disabled: false },
  { id: 1, label: 'Tab 2', icon: undefined, disabled: false },
  { id: 2, label: 'Tab 3', icon: undefined, disabled: false },
  { id: 3, label: 'Tab 4', icon: undefined, disabled: true },
  { id: 4, label: 'Tab 5', icon: undefined, disabled: false },
  { id: 5, label: 'Tab 6', icon: undefined, disabled: false },
  { id: 6, label: 'Tab 7', icon: undefined, disabled: false },
  { id: 7, label: 'Tab 8', icon: undefined, disabled: false },
];


const iconMap = {
  Person: <PersonIcon fontSize="small" />,
  Add: <AddIcon fontSize="small" />,
  Home: <HomeIcon fontSize="small" />,
};

export const Default: Story = {
  args: {
    items: sampleTabs,
    value: 0,
    layout: 'filled',
    startIcon: 'Person',
    endIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { startIcon, endIcon, level, title, ...rest } = args as any;
    let tabs = (args.items || []).slice(0, level || 1);
    if (typeof args.value === 'number' && title && title.length > 0 && tabs[args.value]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.value ? { ...tab, label: title, title } : tab));
    }
    return (
      <>
        <RdsTabs
          {...rest}
          items={tabs}
          startIcon={iconMap[startIcon as keyof typeof iconMap]}
          endIcon={iconMap[endIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({ id: i, label: `Tab ${i + 1}` })),
    value: 0,
    layout: "filled",
    startIcon: 'Person',
    endIcon: 'Add',
    orientation: "horizontal",
    level: 5
  },
  render: (args) => {
    const { startIcon, endIcon, level, title, ...rest } = args as any;
    let tabs = (args.items || []).slice(0, level || 1);
    if (typeof args.value === 'number' && title && title.length > 0 && tabs[args.value]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.value ? { ...tab, label: title, title } : tab));
    }
    return (
      <>
        <RdsTabs
          {...rest}
          items={tabs}
          startIcon={iconMap[startIcon as keyof typeof iconMap]}
          endIcon={iconMap[endIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};

export const SecondTabActive: Story = {
  args: {
    items: sampleTabs,
    value: 1,
    layout: 'filled',
    startIcon: 'Person',
    endIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { startIcon, endIcon, level, title, ...rest } = args as any;
    let tabs = (args.items || []).slice(0, level || 1);
    if (typeof args.value === 'number' && title && title.length > 0 && tabs[args.value]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.value ? { ...tab, label: title, title } : tab));
    }
    return (
      <>
        <RdsTabs
          {...rest}
          items={tabs}
          startIcon={iconMap[startIcon as keyof typeof iconMap]}
          endIcon={iconMap[endIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};

export const SimpleTabs: Story = {
  args: {
    items: [
      { id: 0, label: 'Tab 1' },
      { id: 1, label: 'Tab 2' },
      { id: 2, label: 'Tab 3' },
      { id: 3, label: 'Tab 4' },
      { id: 4, label: 'Tab 5' },
      { id: 5, label: 'Tab 6' },
      { id: 6, label: 'Tab 7' },
      { id: 7, label: 'Tab 8' },
    ],
    value: 0,
    layout: 'filled',
    startIcon: 'Person',
    endIcon: 'Add',
  },
  render: (args) => {
    const { startIcon, endIcon, level, title, ...rest } = args as any;
    let tabs = (args.items || []).slice(0, level || 1);
    if (typeof args.value === 'number' && title && title.length > 0 && tabs[args.value]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.value ? { ...tab, label: title, title } : tab));
    }
    return (
      <>
        <RdsTabs
          {...rest}
          items={tabs}
          startIcon={iconMap[startIcon as keyof typeof iconMap]}
          endIcon={iconMap[endIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};

export const Vertical: Story = {
  args: {
    items: sampleTabs,
    value: 0,
    orientation: 'vertical',
    layout: 'filled',
    startIcon: 'Person',
    endIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { startIcon, endIcon, level, title, ...rest } = args as any;
    let tabs = (args.items || []).slice(0, level || 1);
    if (typeof args.value === 'number' && title && title.length > 0 && tabs[args.value]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.value ? { ...tab, label: title, title } : tab));
    }
    return (
      <>
        <RdsTabs
          {...rest}
          items={tabs}
          startIcon={iconMap[startIcon as keyof typeof iconMap]}
          endIcon={iconMap[endIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};
