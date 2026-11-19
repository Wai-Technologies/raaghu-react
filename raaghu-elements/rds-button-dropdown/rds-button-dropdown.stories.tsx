
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsButtonDropdown from './rds-button-dropdown';
import { ArrowDropDown } from '@mui/icons-material';

const options = [
  { id: 1, label: 'Option 1', avatarSrc: '', checked: false },
  { id: 2, label: 'Option 2', avatarSrc: '', checked: false },
  { id: 3, label: 'Option 3', avatarSrc: '', checked: false },
  { id: 4, label: 'Option 4', avatarSrc: '', checked: false },
  { id: 5, label: 'Option 5', avatarSrc: '', checked: false },
  { id: 6, label: 'Option 6', avatarSrc: '', checked: false },
  { id: 7, label: 'Option 7', avatarSrc: '', checked: false },
  { id: 8, label: 'Option 8', avatarSrc: '', checked: false },
  { id: 9, label: 'Option 9', avatarSrc: '', checked: false },
  { id: 10, label: 'Option 10', avatarSrc: '', checked: false },
];

const meta: Meta<typeof RdsButtonDropdown> = {
  title: 'Elements/Button Dropdown',
  component: RdsButtonDropdown,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'Text to display on the button',
    },
    options: {
      control: 'object',
      description: 'Dropdown options',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-select (checkbox) mode',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input in dropdown',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown button',
    },
    selected: {
      control: 'boolean',
      description: 'Show the dropdown button in its selected style',
    },
    // Deprecated: replaced by `disabled` and `selected`.
    state: { control: { disable: true }, table: { disable: true } },
    buttonState: { control: { disable: true }, table: { disable: true } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    styleType: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'transparent'],
      description: 'Style of the button',
    },
    layout: {
      control: 'select',
      options: ['icon+text', 'text-only', 'icon-only'],
      description: 'Layout of the button (icon + text, text only, or icon only)',
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'pill'],
      description: 'Shape of the button',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: false,
    showSearch: false,
    disabled: false,
    selected: false,
    size: 'medium',
    layout: 'icon+text',
    styleType: 'primary',
    shape: 'rectangle',
    rightIcon:<ArrowDropDown/>,
    leftIcon:"circle",
    showUserAvatar: true,
    showRadio: true,
    isShowLeftIcon: true,
    isShowRightIcon: true,
  },
};
Default.parameters = { controls: { include: ['buttonText', 'multiSelect', 'showSearch','disabled','selected','showUserAvatar','showRadio','isShowLeftIcon','isShowRightIcon','size','layout','styleType','shape'] } };

export const MultiSelect: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: true,
    showSearch: false,
    rightIcon:<ArrowDropDown/>,
    leftIcon:"circle"
  },
};
MultiSelect.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch','size','layout','styleType','shape','disabled','selected'] } };

export const WithSearch: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: false,
    showSearch: true,
    rightIcon:<ArrowDropDown/>,
    leftIcon:"circle"
  },
};
WithSearch.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch','size','layout','styleType','shape','disabled','selected'] } };

export const MultiSelectWithSearch: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: true,
    showSearch: true,
    rightIcon:<ArrowDropDown/>,
    leftIcon:"circle"
  },
};
MultiSelectWithSearch.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch','size','layout','styleType','shape','disabled','selected'] } };
