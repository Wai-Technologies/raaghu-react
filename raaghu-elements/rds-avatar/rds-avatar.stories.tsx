import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAvatar from './rds-avatar';
import { Person } from '@mui/icons-material';
import { expect } from 'storybook/test';

const meta: Meta<typeof RdsAvatar> = {
  title: 'Elements/Avatar',
  component: RdsAvatar,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'danger', 'warning', 'light', 'info', 'secondary', 'dark'],
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
    name: {
      control: 'text',
      description: 'Title to display initial from',
    },
    description: {
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
    status: {
      control: 'select',
      options: ['online', 'offline'],
      description: 'Status dot (shown when online)',
    },
    statusPosition: {
      control: 'select',
      options: ['top', 'bottom', 'both'],
      description: 'Status dot corner. Use "both" to show top and bottom dots together.',
    },
    activeDotTop: {
      control: 'boolean',
      description: 'Show top dot (combine with activeDotBottom for both). Ignored when status is set.',
    },
    activeDotBottom: {
      control: 'boolean',
      description: 'Show bottom dot (combine with activeDotTop for both). Ignored when status is set.',
    },
    max: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Maximum number of avatars to show in stacking mode (1-5)',
    },
    showRemainingCount: {
      control: 'boolean',
      description: 'Show +N indicator for remaining avatars in stacking mode',
    },
    slots: { control: { disable: true }, table: { disable: true } },
    slotProps: { control: { disable: true }, table: { disable: true } },
    ref: { control: { disable: true }, table: { disable: true } },
    ['component' as string]: { control: { disable: true }, table: { disable: true } },
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
    name: 'John Doe',
    description: 'Developer',
    showName: true,
    showDesignation: true,
    displayStyle: 'with-name',
    avatars: [
      { title: 'Jane Doe', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { title: 'John Smith', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { title: 'Ava Lee', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
      { title: 'Mike Brown', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
      { title: 'Sarah Wilson', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
    ],
    max: 3,
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src'
      ]
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};

export const Fallback: Story = {
  args: {
    src: 'broken-image-url',
    alt: 'Broken image',
    name: 'Fallback User',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'showDesignation',
        'description'
      ]
    },
  },
};

export const Large: Story = {
  args: {
    name: 'Large User',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'showDesignation',
        'description'
      ]
    },
  },
};

export const Medium: Story = {
  args: {
    name: 'Medium User',
    size: 'medium',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'showDesignation',
        'description'
      ]
    },
  },
};

export const NameOnBottom: Story = {
  args: {
    name: 'Jane Doe',
    description: 'Designation',
    displayStyle: 'name-bottom',
    size: 'large',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
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
    max: 3,
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
        'description',
        'name',
        'showDesignation',
        'showName',
        'color',
        'displayStyle',
        'avatars'
      ]
    },
  },
}

export const Small: Story = {
  args: {
    name: 'Small User',
    size: 'small',
    showDesignation: false,
    description: 'Designation',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
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
        'max',
        'alt',
        'src',
        'size',
        'name',
        'showDesignation',
        'showName',
        'description'
      ]
    },
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    displayStyle: 'with-name',
    name: 'Jane Doe',
    description: 'Designation',
    showName: true,
    showDesignation: true,
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'description'
      ]
    },
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Wai Technologies',
    description: 'Developer',
    displayStyle: 'with-name',
    showName: true,
    showDesignation: true,
    activityRing: true,
    status: 'online',
    statusPosition: 'both',
    color: 'primary',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'description'
      ]
    },
  },
};

export const WithName: Story = {
  args: {
    name: 'Jane Doe',
    description: 'Designation',
    displayStyle: 'with-name',
    size: 'medium',
  },
  parameters: {
    controls: {
      exclude: [
        'max',
        'alt',
        'src',
        'description'
      ]
    },
  },
};


