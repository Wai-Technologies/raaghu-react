import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Favorite, LocationOn, Folder } from '@mui/icons-material';
import { useState } from 'react';
import RdsBottomNavigation from './rds-bottom-navigation';

const meta: Meta<typeof RdsBottomNavigation> = {
  title: 'Elements/Bottom Navigation',
  component: RdsBottomNavigation,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          transform: 'translateZ(0)',
          overflow: 'hidden',
          width: 'calc(var(--rds-spacing-240) + var(--rds-spacing-120, 120px))',
          maxWidth: '100%',
          height: 'calc(var(--rds-spacing-120, 120px) + var(--rds-spacing-xl))',
          border: 'var(--rds-border-width-thin) solid var(--rds-border-default)',
          borderRadius: 'var(--rds-radius-md)',
          backgroundColor: 'var(--rds-background-default)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeValue: {
      control: { type: 'text' },
    },
    showLabels: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navigationItems = [
  { label: 'Home', value: 'home', icon: <Home /> },
  { label: 'Favorites', value: 'favorites', icon: <Favorite /> },
  { label: 'Nearby', value: 'nearby', icon: <LocationOn /> },
  { label: 'Folder', value: 'folder', icon: <Folder /> },
];

export const Default: Story = {
  args: {
    items: navigationItems,
    activeValue: 'home',
    showLabels: false, 
  },
};

export const WithLabels: Story = {
  args: {
    items: navigationItems,
    activeValue: 'home',
    showLabels: true,
  },
};

const InteractiveStory = (args) => {
    const [activeValue, setActiveValue] = useState(args.activeValue || 'home');
    
    return (
      <RdsBottomNavigation
        {...args}
        activeValue={activeValue}
        onItemChange={(value) => setActiveValue(value)}
      />
    );
  };

export const Interactive: Story = {
  args: {
    items: navigationItems,
    activeValue: 'home',
    showLabels: false,
  },
  render: InteractiveStory,
};

export const ThreeItems: Story = {
  args: {
    items: [
      { label: 'Home', value: 'home', icon: <Home /> },
      { label: 'Favorites', value: 'favorites', icon: <Favorite /> },
      { label: 'Nearby', value: 'nearby', icon: <LocationOn /> },
    ],
    activeValue: 'home',
    showLabels: true,
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Home', value: 'home', icon: <Home /> },
      { label: 'Favorites', value: 'favorites', icon: <Favorite />, disabled: true },
      { label: 'Nearby', value: 'nearby', icon: <LocationOn /> },
      { label: 'Folder', value: 'folder', icon: <Folder /> },
    ],
    activeValue: 'home',
    showLabels: true,
  },
};
