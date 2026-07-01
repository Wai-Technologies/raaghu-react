import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsIconButton from './rds-icon-button';
import { 
  Favorite, 
  FavoriteBorder, 
  Delete, 
  Edit, 
  Share, 
  Add,
  Home,
  Settings 
} from '@mui/icons-material';

const meta: Meta<typeof RdsIconButton> = {
  title: 'Elements/IconButton',
  component: RdsIconButton,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: [
        'iconOutlined',
        'iconFilled',
        'icon',
        'tooltip',
        'children',
        'onClick',
        'ref',
        'className',
        'component',
        'sx',
      ],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Visual variant of the icon button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the icon button',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color of the icon button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RdsIconButton {...args}>
      <Favorite />
    </RdsIconButton>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Share />
    </RdsIconButton>
  ),
};

export const Delete_Button: Story = {
  args: {
    color: 'error',
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Delete />
    </RdsIconButton>
  ),
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    tooltip: 'Filled Icon',
  },
  render: (args) => (
    <RdsIconButton
      {...args}
      iconOutlined={<FavoriteBorder />}
      iconFilled={<Favorite />}
    />
  ),
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Add />
    </RdsIconButton>
  ),
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    tooltip: 'Outlined Icon',
  },
  render: (args) => (
    <RdsIconButton
      {...args}
      iconOutlined={<FavoriteBorder />}
      iconFilled={<Favorite />}
    />
  ),
};

export const Primary: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Home />
    </RdsIconButton>
  ),
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Settings />
    </RdsIconButton>
  ),
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => (
    <RdsIconButton {...args}>
      <Edit />
    </RdsIconButton>
  ),
};





