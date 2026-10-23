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
    labelText: {
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
    variant: {
      control: 'select',
      options: ['square', 'circular'],
      description: 'Visual style variant of the checkbox',
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
    labelText: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    labelText: 'Checked Checkbox',
    status: 'checked',
  },
};

export const Disabled: Story = {
  args: {
    labelText: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    labelText: 'Disabled Checked',
    status: 'checked',
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    labelText: 'Indeterminate Checkbox',
    status: 'indeterminate',
  },
};

export const Primary: Story = {
  args: {
    labelText: 'Primary Color',
    color: 'primary',
    status: 'checked',
  },
};

export const Secondary: Story = {
  args: {
    labelText: 'Secondary Color',
    color: 'secondary',
    status: 'checked',
  },
};

export const Small: Story = {
  args: {
    labelText: 'Small Checkbox',
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