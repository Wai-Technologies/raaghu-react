import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsSwitch from './rds-switch';

const meta: Meta<typeof RdsSwitch> = {
  title: 'Elements/Switch',
  component: RdsSwitch,
  parameters: {
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
      options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6"],
      description: 'Switch style variant',
      defaultValue: 'Style 1',
    },
    color: {
      control: 'select',
      options: ["primary", "secondary", "error", "warning", "info", "success"],
      description: 'Switch color variant',
      defaultValue: 'primary',
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
export const ToggleOn: Story = {
  name: 'Interaction: Toggle switch on',
  args: {
    label: 'Toggle Me',
    showLabel: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // MUI Switch uses role="switch" (not "checkbox" like MUI Checkbox)
    const switchEl = canvas.getByRole('switch')
    await expect(switchEl).toBeInTheDocument()
    await expect(switchEl).not.toBeChecked()
    await userEvent.click(switchEl)
    await expect(switchEl).toBeChecked()
  }
};
