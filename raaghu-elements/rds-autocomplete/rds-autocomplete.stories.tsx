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
    label: {
      name: 'Title',
      control: 'text',
      description: 'Label for the autocomplete input',
    },
    isMandatory: {
      name: 'IsMandatory',
      control: 'boolean',
      description: 'Show asterisk for required field',
    },
    showHint: {
      control: 'boolean',
      defaultValue: true,    
      description: 'Toggle to show or hide hint text'
    },
    selectSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Size of the select input field',
    },
    controlStyle: {
      control: { type: 'select' },
      options: ['default', 'bottom line'],
      defaultValue: 'default',
      description: 'Input style: default (with underline/border) or bottom line (no underline)',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'expanded', 'selected', 'disabled'],
      defaultValue: 'default',
      description: 'Controls the state of the autocomplete component',
    },
    isShowCheckbox: {
      control: { type: 'boolean' },
      description: 'Show checkbox with options only',
      defaultValue: false,
    },
    isShowRadio: {
      control: { type: 'boolean' },
      description: 'Show radio buttons with options only',
      defaultValue: false,
    },
    isShowUser: {
      control: { type: 'boolean' },
      description: 'Show user icon with options only',
      defaultValue: false,
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
    isMandatory: true,
    placeholder: 'Start typing...',
    showHint: true,
    selectSize: 'medium',
    helperText: 'Select one of the available options',
    controlStyle: 'default',
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};

export const WithHelperText: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    helperText: 'Select one of the available options',
    showHint: true,
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};

export const Error: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    error: true,
    helperText: 'Please select a valid option',
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    disabled: true,
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};

export const Filled: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    variant: 'filled',
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};

export const Standard: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    variant: 'standard',
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
  },
};
