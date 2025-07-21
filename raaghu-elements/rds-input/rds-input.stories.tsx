import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsInput from './rds-input';

const meta: Meta<typeof RdsInput> = {
  title: 'Elements/Input',
  component: RdsInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter value',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    required: true,
    placeholder: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    error: true,
    helperText: 'This field has an error',
    value: 'Invalid value',
  },
};
