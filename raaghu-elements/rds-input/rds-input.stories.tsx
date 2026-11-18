import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsInput from './rds-input';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const iconOptions = ['none', 'search', 'person', 'email', 'home'];
const iconMapping = {
  none: undefined,
  search: <SearchIcon />,
  person: <PersonIcon />,
  email: <EmailIcon />,
  home: <HomeIcon />,
};

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
    style: {
      control: "select",
      options: ['default', 'pill', 'bottom outline'],
    },
    selected: {
      control: 'boolean',
      description: 'Show the input in its selected style',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    startIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Icon shown at the start of the input field',
    },
    endIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Icon shown at the end of the input field',
    },
    state: { control: { disable: true }, table: { disable: true } },
    showIcon: { control: { disable: true }, table: { disable: true } },
    iconPosition: { control: { disable: true }, table: { disable: true } },
    icon: { control: { disable: true }, table: { disable: true } },
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
    selected: false,
    label: 'Input Label',
    hintText: 'This is a hint text',
    isMandatory: false,
    titlePosition: 'inline-title',
    error: false,
    disabled: false,
  },
};
Default.parameters ={ controls: { include: [ 'size', 'layout', 'style', 'selected', 'label', 'hintText', 'isMandatory', 'titlePosition', 'error', 'disabled', 'startIcon', 'endIcon'] } };
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: 'small',
    titlePosition: 'inline-title',
    layout: 'text',
    disabled: true,
  },
};
Disabled.parameters = { controls: { include: ['label', 'placeholder', 'size', 'titlePosition', 'layout', 'disabled'] } };

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
    error: true,
  },
};
WithError.parameters = { controls: { include: ['label', 'hintText', 'placeholder', 'size', 'layout', 'titlePosition', 'error'] } };

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search people',
    size: 'small',
    layout: 'text',
    titlePosition: 'inline-title',
    startIcon: 'search',
    endIcon: 'person',
  },
};
WithIcons.parameters = { controls: { include: ['label', 'placeholder', 'size', 'layout', 'titlePosition', 'startIcon', 'endIcon', 'selected', 'disabled', 'error'] } };