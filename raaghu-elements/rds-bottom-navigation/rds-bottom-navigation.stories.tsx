import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Favorite, LocationOn, Folder } from '@mui/icons-material';
import { useState } from 'react';
import RdsBottomNavigation from './rds-bottom-navigation';

const meta: Meta<typeof RdsBottomNavigation> = {
  title: 'Elements/Bottom Navigation',
  component: RdsBottomNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: () => {
    const [activeValue, setActiveValue] = useState('home');
    
    return (
      <RdsBottomNavigation
        items={navigationItems}
        activeValue={activeValue}
        onItemChange={(value) => setActiveValue(value)}
        showLabels
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
