import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSwitch from './rds-switch';

const meta: Meta<typeof RdsSwitch> = {
  title: 'Elements/Switch',
  component: RdsSwitch,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: ['layout', 'showLabel', 'style', 'ref', 'component'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text shown next to the switch',
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
      description: 'Position of the label relative to the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state for an uncontrolled switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    variant: {
      control: 'select',
      options: ['style1', 'style2', 'style3', 'style4', 'style5'],
      description: 'Switch style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Switch color variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
    labelPlacement: 'end',
    variant: 'style1',
    defaultChecked: false,
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
