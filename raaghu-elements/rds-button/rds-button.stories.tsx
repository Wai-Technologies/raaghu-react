import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsButton from './rds-button';
import { Add, Delete, Save } from '@mui/icons-material';

const meta: Meta<typeof RdsButton> = {
  title: 'Elements/Button',
  component: RdsButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display on the button',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'The variant of the button',
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
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Add Item',
    variant: 'contained',
    startIcon: <Add />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Delete Item',
    variant: 'contained',
    color: 'error',
    endIcon: <Delete />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    isLoading: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
    variant: 'contained',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
    variant: 'contained',
  },
};
