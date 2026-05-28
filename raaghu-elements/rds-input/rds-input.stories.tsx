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
    style: 'default',
    state: 'default',
    label: 'Input Label',
    hintText: 'This is a hint text',
    isMandatory: false,
    titlePosition: 'inline-title',
    error: false,
    disabled: false,
  },
};
Default.parameters ={ controls: { include: [ 'size', 'layout', 'style', 'state', 'label', 'hintText', 'isMandatory', 'titlePosition', 'error', 'disabled','showIcon','iconPosition','icon'] } };
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
    isMandatory: true,
    placeholder: 'This field is required',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title',
  },
};
Required.parameters = { controls: { include: ['label', 'isMandatory', 'placeholder', 'size', 'layout', 'titlePosition'] } };

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
    hintText: 'This field has an error',
    placeholder: 'Invalid value',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title',
    state: 'error',
  },
};
WithError.parameters = { controls: { include: ['label', 'hintText', 'placeholder', 'size', 'layout', 'titlePosition', 'state'] } };