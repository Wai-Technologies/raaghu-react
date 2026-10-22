import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsInput from './rds-input';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

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
    startIcon: {
      control: 'select',
      options: ['none', 'search', 'person', 'email', 'home'],
      mapping: iconMapping,
      description: 'Icon at the start of the field',
    },
    endIcon: {
      control: 'select',
      options: ['none', 'search', 'person', 'email', 'home'],
      mapping: iconMapping,
      description: 'Icon at the end of the field',
    },
    labelPlacement: {
      control: 'select',
      options: ['inline', 'top'],
      description: 'Placement of the label',
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
    label: 'Input Label',
    helperText: 'This is a hint text',
    required: false,
    labelPlacement: 'inline',
    error: false,
    disabled: false,
    selected: false,
  },
};
Default.parameters ={ controls: { include: [ 'size', 'layout', 'style', 'label', 'helperText', 'required', 'labelPlacement', 'error', 'disabled', 'readOnly', 'selected','startIcon', 'endIcon'] } };
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    size: 'small',
    labelPlacement: 'inline',
    layout: 'text',
    disabled: true,
  },
};
Disabled.parameters = { controls: { include: ['label', 'placeholder', 'size', 'labelPlacement', 'layout', 'disabled'] } };

export const Required: Story = {
  args: {
    label: 'Required Input',
    required: true,
    placeholder: 'This field is required',
    size: 'small',
    layout: 'text',
    labelPlacement: 'inline',
  },
};
Required.parameters = { controls: { include: ['label', 'required', 'placeholder', 'size', 'layout', 'labelPlacement'] } };

export const WithLabel: Story = {
  args: {
    label: 'Input',
    placeholder: 'Enter value',
    size: 'small',
    layout: 'text',
    labelPlacement: 'inline'
  },
};
WithLabel.parameters = { controls: { include: ['label', 'placeholder', 'size', 'layout', 'labelPlacement'] } };

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    helperText: 'This field has an error',
    placeholder: 'Invalid value',
    size: 'small',
    layout: 'text',
    labelPlacement: 'inline',
    error: true,
  },
};
WithError.parameters = { controls: { include: ['label', 'helperText', 'placeholder', 'size', 'layout', 'labelPlacement', 'error'] } };