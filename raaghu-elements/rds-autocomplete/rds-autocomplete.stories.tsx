import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAutocomplete from './rds-autocomplete';

const meta: Meta<typeof RdsAutocomplete> = {
  title: 'Elements/Autocomplete',
  component: RdsAutocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'],
    },
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
];

export const Default: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
  },
};

export const WithHelperText: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
    helperText: 'Select one of the available options',
  },
};

export const Error: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
    error: true,
    helperText: 'Please select a valid option',
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
    variant: 'filled',
  },
};

export const Standard: Story = {
  args: {
    options,
    label: 'Choose an option',
    placeholder: 'Start typing...',
    variant: 'standard',
  },
};
