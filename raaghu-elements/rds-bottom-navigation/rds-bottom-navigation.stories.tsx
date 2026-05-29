import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
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

export const SwitchNavItem: Story = {
  name: 'Interaction: Switch navigation item',
  args: {
    items: navigationItems,
    activeValue: 'home',
    showLabels: true,
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeValue || 'home');
    return (
      <RdsBottomNavigation
        {...args}
        activeValue={active}
        onItemChange={(value: string) => setActive(value)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    await expect(buttons.length).toBeGreaterThan(1)
    await expect(buttons[0]).toBeVisible()
    // Click Favorites (second item)
    await userEvent.click(buttons[1])
    await expect(canvasElement).toBeTruthy()
  }
};
