import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsChip from './rds-chip';
import { Face, Delete, Done } from '@mui/icons-material';

const meta: Meta<typeof RdsChip> = {
  title: 'Elements/Chip',
  component: RdsChip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display on the chip',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Variant of the chip',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color of the chip',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the chip',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Chip',
  },
};

export const Primary: Story = {
  args: {
    text: 'Primary Chip',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Chip',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    text: 'Outlined Chip',
    variant: 'outlined',
  },
};

export const Clickable: Story = {
  args: {
    text: 'Clickable Chip',
    clickable: true,
    onClick: () => alert('Chip clicked!'),
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Chip with Icon',
    icon: <Face />,
  },
};

export const WithDeleteIcon: Story = {
  args: {
    text: 'Deletable Chip',
    onDelete: () => alert('Chip deleted!'),
    deleteIcon: <Delete />,
  },
};

export const Small: Story = {
  args: {
    text: 'Small Chip',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Chip',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    text: 'Success',
    color: 'success',
    icon: <Done />,
  },
};
