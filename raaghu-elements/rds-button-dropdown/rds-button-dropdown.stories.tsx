
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsButtonDropdown from './rds-button-dropdown';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';

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
    children: {
      control: 'text',
      description: 'Text to display on the button',
    },
    options: {
      control: 'object',
      description: 'Dropdown options',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select (checkbox) mode',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input in dropdown',
    },
    state: {
      control: 'select',
        options: ['default', 'selected'],
        description: 'State of the dropdown',
      },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    variant: {
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
    buttonState: {
      control: 'select',
      options: ['default', 'hover', 'disabled', 'selected'],
      description: 'Visual state of the inner button (does not change dropdown open logic)',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    options,
    multiple: false,
    showSearch: false,
    state: 'default',
    size: 'medium',
    layout: 'icon+text',
    variant: 'primary',
    shape: 'rectangle',
    buttonState: 'default',
    endIcon: <ArrowDropDown />,
    startIcon: <RadioButtonUnchecked />,
    showUserAvatar: true,
    showRadio: true,
    isShowLeftIcon: true,
    isShowRightIcon: true,
  },
};
Default.parameters = { controls: { include: ['children', 'multiple', 'showSearch','state','showUserAvatar','showRadio','isShowLeftIcon','isShowRightIcon','size','layout','variant','shape','buttonState'] } };

export const MultiSelect: Story = {
  args: {
    children: 'Button',
    options,
    multiple: true,
    showSearch: false,
    endIcon: <ArrowDropDown />,
    startIcon: <RadioButtonUnchecked />
  },
};
MultiSelect.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch','size','layout','variant','shape','buttonState'] } };

export const WithSearch: Story = {
  args: {
    children: 'Button',
    options,
    multiple: false,
    showSearch: true,
    endIcon: <ArrowDropDown />,
    startIcon: <RadioButtonUnchecked />
  },
};
WithSearch.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch','size','layout','variant','shape','buttonState'] } };

export const MultiSelectWithSearch: Story = {
  args: {
    children: 'Button',
    options,
    multiple: true,
    showSearch: true,
    endIcon: <ArrowDropDown />,
    startIcon: <RadioButtonUnchecked />
  },
};
MultiSelectWithSearch.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch','size','layout','variant','shape','buttonState'] } };
