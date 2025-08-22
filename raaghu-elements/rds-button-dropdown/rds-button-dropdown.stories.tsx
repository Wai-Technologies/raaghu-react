
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsButtonDropdown from './rds-button-dropdown';
import { ArrowDropDown, Circle } from '@mui/icons-material';

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
    layout: 'padded',
  },
  tags: ['autodocs'],
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
    state: {
      control: 'select',
        options: ['default', 'selected'],
        description: 'State of the dropdown',
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
    state: 'default',
    rightIcon:<ArrowDropDown/>,
    leftIcon:<Circle />,
    showUserAvatar: false,
    showRadio: false,
  },
};
Default.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch','state','showUserAvatar','showRadio'] } };

export const MultiSelect: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: true,
    showSearch: false,
    rightIcon:<ArrowDropDown/>,
    leftIcon:<Circle />
  },
};
MultiSelect.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch'] } };

export const WithSearch: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: false,
    showSearch: true,
    rightIcon:<ArrowDropDown/>,
    leftIcon:<Circle />
  },
};
WithSearch.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch'] } };

export const MultiSelectWithSearch: Story = {
  args: {
    buttonText: 'Button',
    options,
    multiSelect: true,
    showSearch: true,
    rightIcon:<ArrowDropDown/>,
    leftIcon:<Circle />
  },
};
MultiSelectWithSearch.parameters = { controls: { include: ['buttonText', 'options', 'multiSelect', 'showSearch'] } };
