import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCheckbox from './rds-checkbox';

const meta: Meta<typeof RdsCheckbox> = {
  title: 'Elements/Checkbox',
  component: RdsCheckbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    isChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
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
    isChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked Checkbox',
    isChecked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    isChecked: true,
    isDisabled: true,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Color',
    color: 'primary',
    isChecked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Color',
    color: 'secondary',
    isChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'small',
  },
};

export const WithoutLabel: Story = {
  args: {
    isChecked: true,
  },
};
