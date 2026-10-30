import type { Meta, StoryObj } from '@storybook/react-vite';
import Home from '@mui/icons-material/Home';
import Favorite from '@mui/icons-material/Favorite';
import LocationOn from '@mui/icons-material/LocationOn';
import Folder from '@mui/icons-material/Folder';
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
    value: {
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
    value: 'home',
    showLabels: false, 
  },
};

export const WithLabels: Story = {
  args: {
    items: navigationItems,
    value: 'home',
    showLabels: true,
  },
};

export const Interactive: Story = {
  args: {
    items: navigationItems,
    value: 'home',
    showLabels: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value ?? 'home');

    return (
      <RdsBottomNavigation
        {...args}
        value={value}
        onChange={(_event, newValue: string) => setValue(newValue)}
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
    value: 'home',
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
    value: 'home',
    showLabels: true,
  },
};
