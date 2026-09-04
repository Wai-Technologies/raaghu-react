import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import RdsIconButton from './rds-icon-button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const meta: Meta<typeof RdsIconButton> = {
  title: 'Elements/IconButton',
  component: RdsIconButton,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
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
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Visual variant for icon button',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip/title text',
    },
    children: {
      control: { disable: true },
      table: { disable: true },
    },
    iconOutlined: {
      control: { disable: true },
      table: { disable: true },
    },
    iconFilled: {
      control: { disable: true },
      table: { disable: true },
    },
    icon: {
      control: { disable: true },
      table: { disable: true },
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
    onClick: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <FavoriteIcon />,
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: <ShareIcon />,
  },
};
export const Delete_Button: Story = {
  args: {
    color: 'error',
    children: <DeleteIcon />,
  },
};
export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    iconOutlined: <FavoriteBorderIcon />,
    iconFilled: <FavoriteIcon />,
    tooltip: 'Filled Icon',
  },
};
export const Large: Story = {
  args: {
    size: 'large',
    children: <AddIcon />,
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    iconOutlined: <FavoriteBorderIcon />,
    iconFilled: <FavoriteIcon />,
    tooltip: 'Outlined Icon',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: <HomeIcon />,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: <SettingsIcon />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: <EditIcon />,
  },
};
