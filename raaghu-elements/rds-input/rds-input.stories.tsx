import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsInput from './rds-input';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const meta: Meta<typeof RdsInput> = {
  title: 'Elements/Input',
  component: RdsInput,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    size: {
      control:"select",
      options: ['small', 'medium', 'large'],
    },
    layout: {
      control: "select",
      options: ['text', 'password', 'phone number', 'number', 'card number'],
    },
    variant: {
      control: "select",
      options: ['default', 'pill', 'bottom outline'],
    },
    inputVariant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'MUI TextField rendering variant',
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
      control: 'select',
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
    titlePosition: {
      control: 'select',
      options: ['inline-title', 'title-above'],
      description: 'Position of the title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'small',
    layout: 'text',
    variant: 'default',
    state: 'default',
    label: 'Input Label',
    helperText: 'This is a hint text',
    required: false,
    titlePosition: 'inline-title',
    error: false,
    disabled: false,
  },
};
Default.parameters ={ controls: { include: [ 'size', 'layout', 'variant', 'inputVariant', 'state', 'label', 'helperText', 'required', 'titlePosition', 'error', 'disabled','showIcon','iconPosition','icon'] } };
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: 'small',
    titlePosition: 'inline-title',
    layout: 'text',
    state: 'disabled',
  },
};
Disabled.parameters = { controls: { include: ['label', 'placeholder', 'size', 'titlePosition', 'layout', 'state'] } };

export const Required: Story = {
  args: {
    label: 'Required Input',
    required: true,
    placeholder: 'This field is required',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title',
  },
};
Required.parameters = { controls: { include: ['label', 'required', 'placeholder', 'size', 'layout', 'titlePosition'] } };

export const WithLabel: Story = {
  args: {
    label: 'Input',
    placeholder: 'Enter value',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title'
  },
};
WithLabel.parameters = { controls: { include: ['label', 'placeholder', 'size', 'layout', 'titlePosition'] } };

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    helperText: 'This field has an error',
    placeholder: 'Invalid value',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title',
    state: 'error',
  },
};
WithError.parameters = { controls: { include: ['label', 'helperText', 'placeholder', 'size', 'layout', 'titlePosition', 'state'] } };