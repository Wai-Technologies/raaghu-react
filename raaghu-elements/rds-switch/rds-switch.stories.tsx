import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsSwitch from './rds-switch';

const meta: Meta<typeof RdsSwitch> = {
  title: 'Elements/Switch',
  component: RdsSwitch,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    layout: {
      control: 'select',
      options: ["Switch + Label", "Label + Switch", "Top Label + Switch", "Bottom Label + Switch"],
      description: 'Layout of the switch and label',
      defaultValue: 'Switch + Label',
    },
    state: {
      control: 'select',
      options: ["Off", "On", "Disabled On", "Disabled Off"],
      description: 'Control switch state for demo and Storybook',
      defaultValue: 'Off',
    },
    showLabel: {
      control: 'boolean',
      description: 'Control to show/hide label',
      defaultValue: true,
    },
    style: {
      control: 'select',
      options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5"],
      mapping: {
        "Style 1": "style1",
        "Style 2": "style2",
        "Style 3": "style3",
        "Style 4": "style4",
        "Style 5": "style5",
      },
      description: 'Switch style variant',
      defaultValue: 'Style 1',
    },
    color: {
      control: 'select',
      options: ["primary", "secondary", "error", "warning", "info", "success"],
      description: 'Switch color variant',
      defaultValue: 'primary',
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
      description: 'Position of the label relative to the switch',
      defaultValue: 'end',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
    layout: 'switch+label',
    style: 'style1',
    state: 'off',
    showLabel: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    defaultChecked: true,
  },
};

export const Colors: Story = {
  args: {
    label: 'Secondary Color',
    color: 'secondary',
    defaultChecked: true,
    showLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    defaultChecked: true,
  },
};
