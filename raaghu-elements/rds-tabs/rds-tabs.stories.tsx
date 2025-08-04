import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTabs from './rds-tabs';
import { Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const meta: Meta<typeof RdsTabs> = {
  title: 'Elements/Tabs',
  component: RdsTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab configurations',
    },
    activeTab: {
      control: 'number',
      description: 'Index of the active tab',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
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
    title:{
      control: 'text',
      description: 'Title for the tab, used for accessibility and tooltips',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'disabled'],
      description: 'Control tab state for demo and Storybook',
      defaultValue: 'default',
    },
    leftIcon: {
      control: 'select',
      options: ['Person', 'Add', 'Home'],
      description: 'Icon to display on the left side of the tab label',
      defaultValue: 'Person',
    },
    rightIcon: {
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
  { id: 0, label: 'Overview', icon: undefined, disabled: false },
  { id: 1, label: 'Details', icon: undefined, disabled: false },
  { id: 2, label: 'Settings', icon: undefined, disabled: false },
  { id: 3, label: 'Help', icon: undefined, disabled: false },
];


const iconMap = {
  Person: <PersonIcon fontSize="small" />,
  Add: <AddIcon fontSize="small" />,
  Home: <HomeIcon fontSize="small" />,
};

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 0,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, ...rest } = args as any;
    const tabs = (args.tabs || []).slice(0, level || 1);
    return (
      <>
        <RdsTabs
          {...rest}
          tabs={tabs}
          leftIcon={iconMap[leftIcon as keyof typeof iconMap]}
          rightIcon={iconMap[rightIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};


export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 1,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, ...rest } = args as any;
    const tabs = (args.tabs || []).slice(0, level || 1);
    return (
      <>
        <RdsTabs
          {...rest}
          tabs={tabs}
          leftIcon={iconMap[leftIcon as keyof typeof iconMap]}
          rightIcon={iconMap[rightIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};


export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 0,
    orientation: 'vertical',
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, ...rest } = args as any;
    const tabs = (args.tabs || []).slice(0, level || 1);
    return (
      <>
        <RdsTabs
          {...rest}
          tabs={tabs}
          leftIcon={iconMap[leftIcon as keyof typeof iconMap]}
          rightIcon={iconMap[rightIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};


export const SimpleTabs: Story = {
  args: {
    tabs: [
      { id: 0, label: 'Tab 1' },
      { id: 1, label: 'Tab 2' },
      { id: 2, label: 'Tab 3' },
    ],
    activeTab: 0,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, ...rest } = args as any;
    const tabs = (args.tabs || []).slice(0, level || 1);
    return (
      <>
        <RdsTabs
          {...rest}
          tabs={tabs}
          leftIcon={iconMap[leftIcon as keyof typeof iconMap]}
          rightIcon={iconMap[rightIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};


export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({ id: i, label: `Tab ${i + 1}` })),
    activeTab: 0,
    layout: "flap",
    leftIcon: 'Person',
    rightIcon: 'Add',
    title: '',
    orientation: "horizontal",
    state: "default",
    level: 1
  },
  render: (args) => {
    const { leftIcon, rightIcon, title, level, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab, idx) => {
        if (idx === args.activeTab) {
          return {
            ...tab,
            label: title,
            title: title,
          };
        }
        return tab;
      });
    }
    return (
      <>
        <RdsTabs
          {...rest}
          tabs={tabs}
          leftIcon={iconMap[leftIcon as keyof typeof iconMap]}
          rightIcon={iconMap[rightIcon as keyof typeof iconMap]}
        />
      </>
    );
  },
};