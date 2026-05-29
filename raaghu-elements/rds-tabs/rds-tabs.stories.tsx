import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import RdsTabs from './rds-tabs';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const meta: Meta<typeof RdsTabs> = {
  title: 'Elements/Tabs',
  component: RdsTabs,
  parameters: {
    layout: 'padded',
    controls: {
      include: ['tabs', 'activeTab', 'type', 'layout', 'title', 'state', 'leftIcon', 'rightIcon', 'showLeftIcon', 'showRightIcon', 'level'],
    },
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
    type: {
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
  { id: 0, label: 'Tab 1', icon: undefined, disabled: false },
  { id: 1, label: 'Tab 2', icon: undefined, disabled: false },
  { id: 2, label: 'Tab 3', icon: undefined, disabled: false },
  { id: 3, label: 'Tab 4', icon: undefined, disabled: false },
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
    tabs: sampleTabs,
    activeTab: 0,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, title, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.activeTab ? { ...tab, label: title, title } : tab));
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

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({ id: i, label: `Tab ${i + 1}` })),
    activeTab: 0,
    layout: "filled",
    leftIcon: 'Person',
    rightIcon: 'Add',
    type: "horizontal",
    state: "default",
    level: 5
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, title, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.activeTab ? { ...tab, label: title, title } : tab));
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

export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 1,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, title, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.activeTab ? { ...tab, label: title, title } : tab));
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

export const SimpleTabs: Story = {
  args: {
    tabs: [
      { id: 0, label: 'Tab 1' },
      { id: 1, label: 'Tab 2' },
      { id: 2, label: 'Tab 3' },
      { id: 3, label: 'Tab 4' },
      { id: 4, label: 'Tab 5' },
      { id: 5, label: 'Tab 6' },
      { id: 6, label: 'Tab 7' },
      { id: 7, label: 'Tab 8' },
    ],
    activeTab: 0,
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, title, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.activeTab ? { ...tab, label: title, title } : tab));
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

export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 0,
    type: 'vertical',
    layout: 'filled',
    leftIcon: 'Person',
    rightIcon: 'Add',
    level: 4,
  },
  render: (args) => {
    const { leftIcon, rightIcon, level, title, ...rest } = args as any;
    let tabs = (args.tabs || []).slice(0, level || 1);
    if (typeof args.activeTab === 'number' && title && title.length > 0 && tabs[args.activeTab]) {
      tabs = tabs.map((tab: any, idx: number) => (idx === args.activeTab ? { ...tab, label: title, title } : tab));
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


export const SwitchTab: Story = {
  name: 'Interaction: Switch between tabs',
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
      { id: 0, label: 'Tab One' },
      { id: 1, label: 'Tab Two' },
      { id: 2, label: 'Tab Three' },
    ];
    return (
      <RdsTabs
        tabs={tabs}
        activeTab={activeTab}
        layout="filled"
        onChange={(_: React.SyntheticEvent, value: number) => setActiveTab(value)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const allTabs = canvas.getAllByRole('tab')
    await expect(allTabs).toHaveLength(3)
    await expect(allTabs[0]).toHaveAttribute('aria-selected', 'true')
    await expect(allTabs[1]).toHaveAttribute('aria-selected', 'false')
    await userEvent.click(allTabs[1])
    await expect(allTabs[1]).toHaveAttribute('aria-selected', 'true')
  }
};
