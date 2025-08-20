import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsButton from './rds-button';

const meta: Meta<typeof RdsButton> = {
  title: 'Elements/Button',
  component: RdsButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
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
    textCase: {
      control: { type: "select" },
      options: ["uppercase", "lowercase", "capitalize", "unset"],
      description: 'The text case of the button',
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
    showLeftIcon: {
      control: 'boolean',
      description: 'Control to show/hide left icon (Add icon)',
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Control to show/hide right icon (Save icon)',
    },
    changeLeftIcon: {
      control: 'select',
      options: ['add', 'delete', 'save', 'edit', 'close', 'arrow-forward', 'arrow-back', 'circle'],
      description: 'Select which icon to display on the left',
    },
    changeRightIcon: {
      control: 'select',
      options: ['add', 'delete', 'save', 'edit', 'close', 'arrow-forward', 'arrow-back', 'circle'],
      description: 'Select which icon to display on the right',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Button',
    style: 'filled',
    color: 'primary',
    size: 'medium',
    disabled: false,
    isLoading: false,
    shape: 'rectangle',
    textCase: 'uppercase',
    state: 'default',
    layout: 'text-only',
    showLeftIcon: true,
    showRightIcon: false,
    changeLeftIcon: 'add',
    changeRightIcon: 'save',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'large',
    style: 'filled',
  },
};

export const Loading: Story = {
  args: {
    text: 'Loading Button',
    isLoading: true,
    style: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    text: 'Outlined Button',
    style: 'outlined',
  },
};

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    style: 'filled',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    style: 'filled',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'small',
    style: 'filled',
  },
};

export const Transparent: Story = {
  args: {
    text: 'Transparent Button',
    style: 'transparent',
  },
};

export const WithEndIcon: Story = {
  args: {
    text: 'Save Item',
    style: 'filled',
    color: 'primary',
    showRightIcon: true,
    changeRightIcon: 'save',
  },
};

export const WithStartIcon: Story = {
  args: {
    text: 'Add Item',
    style: 'filled',
    showLeftIcon: true,
    changeLeftIcon: 'add',
  },
};

