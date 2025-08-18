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
      description: 'Show title below/next to avatar',
    },
    showDesignation: {
      control: 'boolean',
      description: 'Show subText below/next to avatar',
    },
    title: {
      control: 'text',
      description: 'Title to display initial from',
    },
    subText: {
      control: 'text',
      description: 'Sub text to display below/next to avatar',
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
    activityRing: {
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
    title: 'John Doe',
    subText: 'Developer',
    showName: true,
    showDesignation: true,
    displayStyle: 'with-name',
  },
};
export const WithName: Story = {
  args: {
    title: 'Jane Doe',
    subText: 'Designation',
    displayStyle: 'with-name',
    size: 'medium',
  },
};

export const WithInitials: Story = {
  args: {
    title: 'Wai Technologies',
    subText: 'Developer',
    displayStyle: 'with-name',
    showName: true,
    showDesignation: true,
    activityRing: true,
    activeDotTop: true,
    colorVariant: 'primary',
  },
};

export const NameOnBottom: Story = {
  args: {
    title: 'Jane Doe',
    subText: 'Designation',
    displayStyle: 'name-bottom',
    size: 'large',
  },
};

export const Stacking: Story = {
  args: {
    displayStyle: 'stacking',
    avatars: [
      { title: 'Jane Doe', subText: 'Designation', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'John Smith', subText: 'Designation', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Ava Lee', subText: 'Designation', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Mike Brown', subText: 'Designation', size: 'medium', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    ],
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    displayStyle: 'with-name',
    title: 'Jane Doe', 
    subText: 'Designation',
    showName: true,
    showDesignation: true,
  },
};

export const Small: Story = {
  args: {
    title: 'Small User',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    title: 'Medium User',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    title: 'Large User',
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
    title: 'Fallback User',
  },
};
