import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsInput from './rds-input';

const meta: Meta<typeof RdsInput> = {
  title: 'Elements/Input',
  component: RdsInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control:"select",
      options: ['small', 'medium'],
    },
    type: {
      control: "select",
      options: ['text', 'password', 'phone number', 'number', 'card number'],
    },
    inputStyle: {
      control: "select",
      options: ['default', 'pill', 'bottom outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    inputSize: 'small',
    type: 'text',
    inputStyle: 'default',
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit this',
    inputSize: 'small',
    labelposition: true,
    type: 'text',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    isRequired: true,
    placeholder: 'This field is required',
    inputSize: 'small',
    type: 'text',
    labelposition: true,
  },
};
export const WithLabel: Story = {
  args: {
    label: 'Input',
    placeholder: 'Enter value',
    inputSize: 'small',
    type: 'text',
    labelposition: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    error: true,
    helperText: 'This field has an error',
    value: 'Invalid value',
    inputSize: 'small',
    type: 'text',
    labelposition: true,
  },
};
