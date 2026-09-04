import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Home, Favorite, LocationOn, Folder } from '@mui/icons-material';
import { useState } from 'react';
import RdsBottomNavigation from './rds-bottom-navigation';

const meta: Meta<typeof RdsBottomNavigation> = {
  title: 'Elements/Bottom Navigation',
  component: RdsBottomNavigation,
  parameters: {
    status: { type: 'stable' },
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'stable'],
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

export const Interactive: Story = {
  args: {
    items: navigationItems,
    activeValue: 'home',
    showLabels: false,
  },
  render: (args) => {
    const [activeValue, setActiveValue] = useState(args.activeValue || 'home');
    
    return (
      <RdsBottomNavigation
        {...args}
        activeValue={args.activeValue}
        onItemChange={(value) => setActiveValue(value)}
      />
    );
  },
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
