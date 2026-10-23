
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
    className: {
      control: 'text',
      description: 'CSS class applied to the trigger button.',
      table: { category: 'Root props' },
    },
    sx: {
      control: 'object',
      description: 'MUI system styles applied to the trigger button.',
      table: { category: 'Root props' },
    },
    ref: {
      control: false,
      description: 'React ref to the trigger button. Assign in code; refs cannot be set through Controls.',
      table: { category: 'Root props' },
    },
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
    open: {
      control: 'boolean',
      description: 'Whether the dropdown menu is open',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the trigger button is disabled',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the trigger button has the selected treatment',
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
    size: 'medium',
    layout: 'icon+text',
    variant: 'primary',
    shape: 'rectangle',
    endIcon: <ArrowDropDown />,
    startIcon: <RadioButtonUnchecked />,
    showUserAvatar: true,
    showRadio: true,
    isShowLeftIcon: true,
    isShowRightIcon: true,
  },
};
Default.parameters = { controls: { include: ['children', 'multiple', 'showSearch', 'open', 'disabled', 'selected', 'showUserAvatar', 'showRadio', 'isShowLeftIcon', 'isShowRightIcon', 'size', 'layout', 'variant', 'shape', 'className', 'sx', 'ref'] } };

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
MultiSelect.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch', 'open', 'disabled', 'selected', 'size', 'layout', 'variant', 'shape', 'className', 'sx', 'ref'] } };

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
WithSearch.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch', 'open', 'disabled', 'selected', 'size', 'layout', 'variant', 'shape', 'className', 'sx', 'ref'] } };

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
MultiSelectWithSearch.parameters = { controls: { include: ['children', 'options', 'multiple', 'showSearch', 'open', 'disabled', 'selected', 'size', 'layout', 'variant', 'shape', 'className', 'sx', 'ref'] } };
