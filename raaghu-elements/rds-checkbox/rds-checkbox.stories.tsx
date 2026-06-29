import type { Meta, StoryObj } from '@storybook/react-vite';
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
    labeltext: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    status: {
      control: 'select',
      options: ['checked', 'unchecked', 'indeterminate'],
      description: 'Status control for the checkbox',
    },
    isDisabled: {
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
    labeltext: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    labeltext: 'Checked Checkbox',
    status: 'checked',
  },
};

export const Disabled: Story = {
  args: {
    labeltext: 'Disabled Checkbox',
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    labeltext: 'Disabled Checked',
    status: 'checked',
    isDisabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    labeltext: 'Indeterminate Checkbox',
    status: 'indeterminate',
  },
};

export const Primary: Story = {
  args: {
    labeltext: 'Primary Color',
    color: 'primary',
    status: 'checked',
  },
};

export const Secondary: Story = {
  args: {
    labeltext: 'Secondary Color',
    color: 'secondary',
    status: 'checked',
  },
};

export const Small: Story = {
  args: {
    labeltext: 'Small Checkbox',
    size: 'small',
  },
};

export const Unchecked: Story = {
  args: {
    labeltext: 'Unchecked Checkbox',
    status: 'unchecked',
  },
};

export const WithoutLabel: Story = {
  args: {
    status: 'checked',
  },
};