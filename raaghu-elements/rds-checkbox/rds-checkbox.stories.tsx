import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsCheckbox from './rds-checkbox';

const meta: Meta<typeof RdsCheckbox> = {
  title: 'Elements/Checkbox',
  component: RdsCheckbox,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  controls: { exclude: ['cssStyle', 'slots', 'slotProps', 'component'] },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    status: {
      control: 'select',
      options: ['checked', 'unchecked', 'indeterminate'],
      description: 'Status control for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    style: {
      control: 'select',
      options: ['square', 'circular'],
      description: 'Visual style variant of the checkbox',
    },
    state: {
      control: 'select',
      options: ['default', 'disabled', 'hover'],
      description: 'State of the checkbox (default, disabled, hover)',
    },
    showText: {
      control: 'boolean',
      description: 'Whether to show the label text',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'default'],
      description: 'Color of the checkbox',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    status: 'checked',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    status: 'checked',
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    status: 'indeterminate',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Color',
    color: 'primary',
    status: 'checked',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Color',
    color: 'secondary',
    status: 'checked',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'small',
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked Checkbox',
    status: 'unchecked',
  },
};

export const WithoutLabel: Story = {
  args: {
    status: 'checked',
  },
};