import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsInput, { RdsInputLayout, RdsInputSize, RdsInputState, RdsInputStyle } from './rds-input';
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
    size: RdsInputSize.Small,
    layout: RdsInputLayout.Text,
    style: RdsInputStyle.Default,
    state: RdsInputState.Default,
    label: 'Input Label',
    hintText: 'This is a hint text',
    isMandatory: false,
    showTitle: true,
    error: false,
    disabled: false,
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: RdsInputSize.Small,
    showTitle: true,
    layout: RdsInputLayout.Text,
    state: RdsInputState.Disabled,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    isMandatory: true,
    placeholder: 'This field is required',
    size: RdsInputSize.Small,
    layout: RdsInputLayout.Text,
    showTitle: true,
  },
};
export const WithLabel: Story = {
  args: {
    label: 'Input',
    value: 'Enter value',
    size: RdsInputSize.Small,
    layout: RdsInputLayout.Text,
    showTitle: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    hintText: 'This field has an error',
    value: 'Invalid value',
    size: RdsInputSize.Small,
    layout: RdsInputLayout.Text,
    showTitle: true,
    state: RdsInputState.Error,
  },
};