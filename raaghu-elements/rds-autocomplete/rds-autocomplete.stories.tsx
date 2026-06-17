import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RdsAutocomplete from './rds-autocomplete';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.9" stroke="#B1B1B1" strokeWidth="0.2" fill="white" />
    <image
      href="data:image/png;base64,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"
      width="20"
      height="20"
    />
  </svg>
);

const PopupIcon = () => (
  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 0.5L5.731 5.37991C5.75919 5.41535 5.79707 5.4447 5.84154 5.46554C5.88601 5.48638 5.93578 5.49812 5.98675 5.49979C6.03773 5.50146 6.08845 5.49302 6.13474 5.47515C6.18103 5.45728 6.22157 5.43048 6.253 5.397L6.2695 5.37991L11 0.5" stroke="#7D7D7D" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof RdsAutocomplete> = {
  title: 'Elements/Autocomplete',
  component: RdsAutocomplete,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
    exclude: ['component', 'slots', 'slotProps', 'ref'],
    },
  },
  tags: ['autodocs', 'stable'],
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
    showTitle: {
      control: 'boolean',
      description: 'Show or hide the title/label',
      defaultValue: true,
    },
    isMandatory: {
      name: 'IsMandatory',
      control: 'boolean',
      description: 'Show asterisk for required field',
    },
    showHintText: {
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
    showHintText: true,
    selectSize: 'medium',
    helperText: 'Select one of the available options',
    controlStyle: 'default',
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
Default.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'showHintText', 'selectSize', 'helperText', 'controlStyle', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'variant', 'error', 'disabled', 'showTitle', 'state'] 
  } 
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
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
Disabled.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'disabled', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'variant', 'selectSize'] 
  } 
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
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
Error.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'error', 'helperText', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'variant', 'selectSize', 'showHintText'] 
  } 
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
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
Filled.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'variant', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'selectSize'] 
  } 
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
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
Standard.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'variant', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'selectSize'] 
  } 
};

export const WithHelperText: Story = {
  args: {
    options,
    label: 'Choose an option',
    isMandatory: true,
    placeholder: 'Start typing...',
    helperText: 'Select one of the available options',
    showHintText: true,
    isShowCheckbox: false,
    isShowRadio: false,
    isShowUser: false,
    userIcon: <UserIcon />,
    popupIcon: <PopupIcon />,
  },
};
WithHelperText.parameters = { 
  controls: { 
    include: ['options', 'label', 'isMandatory', 'placeholder', 'variant', 'isShowCheckbox', 'isShowRadio', 'isShowUser', 'selectSize'] 
  } 
};
