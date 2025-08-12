import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsInput from './rds-input';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

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
      options: ['small', 'medium', 'large'],
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
    showIcon: {
      control: 'boolean',
      description: 'Show icon in the input field',
    },
    iconPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the icon',
    },
    icon: {
      control: 'select',
      options: ['search', 'person', 'email', 'home'],
      mapping: {
        search: <SearchIcon />,
        person: <PersonIcon />,
        email: <EmailIcon />,
        home: <HomeIcon />,
      },
      description: 'Custom icon to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter value',
    size: 'small',
    layout: 'text',
    style: 'default',
    state: 'default',
    label: 'Input Label',
    hintText: 'This is a hint text',
    isRequired: false,
    showTitle: true,
    error: false,
    disabled: false,
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: 'small',
    showTitle: true,
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
    showTitle: true,
  },
};
export const WithLabel: Story = {
  args: {
    label: 'Input',
    value: 'Enter value',
    size: 'small',
    layout: 'text',
    showTitle: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    hintText: 'This field has an error',
    value: 'Invalid value',
    size: 'small',
    layout: 'text',
    showTitle: true,
    state: 'error',
  },
};