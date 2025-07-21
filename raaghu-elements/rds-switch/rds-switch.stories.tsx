import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSwitch from './rds-switch';

const meta: Meta<typeof RdsSwitch> = {
  title: 'Elements/Switch',
  component: RdsSwitch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    defaultChecked: true,
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

export const Colors: Story = {
  args: {
    label: 'Secondary Color',
    color: 'secondary',
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Switch',
    size: 'small',
  },
};
