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
    style: {
      control: 'select',
      options: ['filled', 'outlined', 'transparent'],
      description: 'The style of the button',
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
    shape: {
      control: 'select',
      options: ['pill', 'rectangle'],
      description: 'The shape of the button',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled', 'selected'],
      description: 'The state of the button',
    },
    layout: {
      control: 'select',
      options: ["Icon + Text", "Icon Only", "Text Only"],
      description: 'The layout of the button',
    },
    icon: {
      control: 'select',
      options: ['add', 'delete', 'save'],
      description: 'The predefined icon to display on the button',
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

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
    style: 'filled',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    isLoading: true,
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    style: 'outlined',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    style: 'filled',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    style: 'filled',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
    style: 'filled',
  },
};

export const Transparent: Story = {
  args: {
    label: 'Transparent Button',
    style: 'transparent',
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Delete Item',
    style: 'filled',
    color: 'error',
    icon: 'delete',
    iconPosition: 'end',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Add Item',
    style: 'filled',
    startIcon: <Add />,
  },
};

