import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAlert from './rds-alert';

const meta: Meta<typeof RdsAlert> = {
  title: 'Elements/Alert',
  component: RdsAlert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to display in the alert',
    },
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'The type/severity of the alert',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      description: 'The variant of the alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is an info alert',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    message: 'This is a success alert',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning alert',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    message: 'This is an error alert',
    type: 'error',
  },
};

export const Filled: Story = {
  args: {
    message: 'This is a filled alert',
    type: 'success',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    message: 'This is an outlined alert',
    type: 'warning',
    variant: 'outlined',
  },
};
