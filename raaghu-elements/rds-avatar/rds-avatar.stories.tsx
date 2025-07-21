import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAvatar from './rds-avatar';
import { Person } from '@mui/icons-material';

const meta: Meta<typeof RdsAvatar> = {
  title: 'Elements/Avatar',
  component: RdsAvatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name to display initial from',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
  },
};

export const Small: Story = {
  args: {
    name: 'Small User',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    name: 'Medium User',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    name: 'Large User',
    size: 'large',
  },
};

export const WithIcon: Story = {
  args: {
    children: <Person />,
  },
};

export const Fallback: Story = {
  args: {
    src: 'broken-image-url',
    alt: 'Broken image',
    name: 'Fallback User',
  },
};
