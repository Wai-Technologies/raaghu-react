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
    size: {
      control:"select",
      options: ['small', 'medium'],
    },
    layout: {
      control: "select",
      options: ['text', 'password', 'phone number', 'number', 'card number'],
    },
    style: {
      control: "select",
      options: ['default', 'pill', 'bottom outline'],
    },
    state: {
      control: "select",
      options: ['default', 'active', 'selected', 'error', 'disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'small',
    layout: 'text',
    style: 'default',
    state: 'default',
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: 'small',
    labelposition: true,
    layout: 'text',
    state: 'disabled',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    isRequired: true,
    placeholder: 'This field is required',
    size: 'small',
    layout: 'text',
    labelposition: true,
  },
};
export const WithLabel: Story = {
  args: {
    label: 'Input',
    placeholder: 'Enter value',
    size: 'small',
    layout: 'text',
    labelposition: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    hintText: 'This field has an error',
    value: 'Invalid value',
    size: 'small',
    layout: 'text',
    labelposition: true,
    state: 'error',
  },
};
