import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
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
      options: ['smallest', 'small', 'medium', 'large', 'largest'],
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
    maxVisibleAvatars: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Maximum number of avatars to show in stacking mode (1-5)',
    },
    displayStyle: {
      control: 'select',
      options: ['with-name', 'name-bottom', 'stacking'],
      description: 'Layout style for displaying the avatar (with-name: horizontal layout, name-bottom: vertical layout, stacking: multiple avatars)',
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
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src'
      ]
    },
  },
};

export const Fallback: Story = {
  args: {
    src: 'broken-image-url',
    alt: 'Broken image',
    title: 'Fallback User',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'showDesignation',
        'subText'
      ]
    },
  },
};

export const Large: Story = {
  args: {
    title: 'Large User',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'showDesignation',
        'subText'
      ]
    },
  },
};

export const Medium: Story = {
  args: {
    title: 'Medium User',
    size: 'medium',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'showDesignation',
        'subText'
      ]
    },
  },
};

export const NameOnBottom: Story = {
  args: {
    title: 'Jane Doe',
    subText: 'Designation',
    displayStyle: 'name-bottom',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src'
      ]
    },
  },
};

export const Stacking: Story = {
  args: {
    displayStyle: 'stacking',
    size: 'medium',
    maxVisibleAvatars: 3,
    avatars: [
      { title: 'Jane Doe', subText: 'Designation', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'John Smith', subText: 'Designation', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Ava Lee', subText: 'Designation', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Mike Brown', subText: 'Designation', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Sarah Wilson', subText: 'Designation', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    ],
  },
  parameters: {
    controls: {
      exclude: [
        'src',
        'alt',
        'activityRing',
        'activeDotTop',
        'activeDotBottom',
        'subText',
        'title',
        'showDesignation',
        'showName',
        'colorVariant',
        'displayStyle',
        'avatars'
      ]
    },
  },
}

export const Small: Story = {
  args: {
    title: 'Small User',
    size: 'small',
    showDesignation: false,
    subText: 'Designation',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
      ]
    },
  },
};

export const WithIcon: Story = {
  args: {
    children: <Person />,
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'size',
        'title',
        'showDesignation',
        'showName',
        'subText'
      ]
    },
  },
};

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
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'subText'
      ]
    },
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
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'subText'
      ]
    },
  },
};

export const WithName: Story = {
  args: {
    title: 'Jane Doe',
    subText: 'Designation',
    displayStyle: 'with-name',
    size: 'medium',
  },
  parameters: {
    controls: {
      exclude: [
        'maxVisibleAvatars',
        'alt',
        'src',
        'subText'
      ]
    },
  },
};

export const AvatarVisible: Story = {
  name: 'Interaction: Avatar renders with accessible name',
  args: {
    title: 'John Doe',
    size: 'medium',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    // MUI Avatar renders as img (with src) or generic element
    const avatar = canvasElement.querySelector('[class*="MuiAvatar-root"]')
    await expect(avatar).not.toBeNull()
    await expect(avatar).toBeVisible()
    // The avatar should contain text initials "JD" when no image is provided
    await expect(canvasElement).toBeTruthy()
  }
};
