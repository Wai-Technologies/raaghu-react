import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from '@storybook/test';
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Favorite />,
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Share />,
  },
};
export const Delete_Button: Story = {
  args: {
    color: 'error',
    children: <Delete />,
  },
};
export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    iconOutlined: <FavoriteBorder />,
    iconFilled: <Favorite />,
    tooltip: 'Filled Icon',
  },
};
export const Large: Story = {
  args: {
    size: 'large',
    children: <Add />,
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    iconOutlined: <FavoriteBorder />,
    iconFilled: <Favorite />,
    tooltip: 'Outlined Icon',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: <Home />,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: <Settings />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: <Edit />,
  },
};




export const ClickTest: Story = {
  name: 'Interaction: Icon button fires callback',
  args: {
    children: <Favorite />,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  }
};
