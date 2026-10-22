import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import React from 'react';
import RdsButton from './rds-button';

const meta: Meta<typeof RdsButton> = {
  title: 'Elements/Button',
  component: RdsButton,
  parameters: {
      status: { type: 'stable' },
  layout: 'padded',
  controls: { exclude: ['component'] },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The button label',
    },
    style: {
      control: 'select',
      options: ['filled', 'outlined', 'transparent'],
      description: 'The style of the button',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    shape: {
      control: 'select',
      options: ['pill', 'rectangle'],
      description: 'The shape of the button',
    },
    selected: {
      control: 'boolean',
      description: 'Applies the selected treatment for toggle-style buttons',
    },
    layout: {
      control: 'select',
      options: ["icon+text", "icon-only", "text-only"],
      description: 'The layout of the button',
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Control to show/hide left icon (Add icon)',
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Control to show/hide right icon (Save icon)',
    },
    changeLeftIcon: {
      control: 'text',
      description: 'Icon name or React component for the left side. Available icon names: add, delete, save, edit, close, arrow-forward, arrow-back, circle, chevron',
    },
    changeRightIcon: {
     control: 'text', 
      description: 'Icon name or React component for the right side. Available icon names: add, delete, save, edit, close, arrow-forward, arrow-back, circle, chevron',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    style: 'filled',
    color: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    shape: 'rectangle',
    layout: 'text-only',
    showLeftIcon: true,
    showRightIcon: false,
    changeLeftIcon: 'add',
    changeRightIcon: 'save',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    style: 'filled',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
    style: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    style: 'outlined',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    style: 'filled',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    style: 'filled',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
    style: 'filled',
  },
};

export const Transparent: Story = {
  args: {
    children: 'Transparent Button',
    style: 'transparent',
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Save Item',
    style: 'filled',
    color: 'primary',
    showRightIcon: true,
    changeRightIcon: 'save',
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Add Item',
    style: 'filled',
    showLeftIcon: true,
    changeLeftIcon: 'add',
  },
};
