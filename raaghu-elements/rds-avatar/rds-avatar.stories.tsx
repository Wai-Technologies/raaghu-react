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
    colorVariant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'light', 'info', 'secondary', 'dark'],
      description: 'Color variant for activity ring and dot',
    },
    showName: {
      control: 'boolean',
      description: 'Show name below/next to avatar',
    },
    showDesignation: {
      control: 'boolean',
      description: 'Show designation below/next to avatar',
    },
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
    ring: {
      control: 'boolean',
      description: 'Show activity ring',
    },
    activeDotTop: {
      control: 'boolean',
      description: 'Show dot at top',
    },
    activeDotBottom: {
      control: 'boolean',
      description: 'Show dot at bottom',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    designation: 'Developer',
    showName: true,
    showDesignation: true,
    displayStyle: 'with-name',
  },
};
export const WithName: Story = {
  args: {
    name: 'Jane Doe',
    designation: 'Designation',
    displayStyle: 'with-name',
    size: 'medium',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Wai Technologies',
    designation: 'Developer',
    displayStyle: 'with-name',
    showName: true,
    showDesignation: true,
    ring: true,
    activeDotTop: true,
    colorVariant: 'primary',
  },
};

export const NameOnBottom: Story = {
  args: {
    name: 'Jane Doe',
    designation: 'Designation',
    displayStyle: 'name-bottom',
    size: 'large',
  },
};

export const Stacking: Story = {
  args: {
    displayStyle: 'stacking',
    avatars: [
      { name: 'Jane Doe', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { name: 'John Smith', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { name: 'Ava Lee', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { name: 'Mike Brown', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    ],
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    displayStyle: 'with-name',
    name: 'Jane Doe', 
    designation: 'Designation',
    showName: true,
    showDesignation: true,
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
