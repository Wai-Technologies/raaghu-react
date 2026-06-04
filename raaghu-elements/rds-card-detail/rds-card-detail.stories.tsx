import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Typography, Box } from '@mui/material';
import { Share, Favorite } from '@mui/icons-material';
import RdsCardDetail from './rds-card-detail';

const meta: Meta<typeof RdsCardDetail> = {
  title: 'Elements/Card Detail',
  component: RdsCardDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24 },
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Card',
    subtitle: 'Card subtitle',
    children: (
      <Typography variant="body2" color="text.secondary">
        This is the main content of the card. It can contain any type of content including text, images, and other components.
      </Typography>
    ),
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    subtitle: 'Nature Photography',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
    children: (
      <Typography variant="body2" color="text.secondary">
        A stunning landscape photograph showcasing the beauty of nature. Perfect for desktop wallpapers and art collections.
      </Typography>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Interactive Card',
    subtitle: 'With action buttons',
    children: (
      <Typography variant="body2" color="text.secondary">
        This card includes action buttons at the bottom for user interaction.
      </Typography>
    ),
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button size="small" startIcon={<Favorite />}>
          Like
        </Button>
        <Button size="small" startIcon={<Share />}>
          Share
        </Button>
      </Box>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: 'Complete Card Example',
    subtitle: 'All features demonstrated',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop',
    elevation: 3,
    sx: { maxWidth: 345 },
    children: (
      <Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          This card demonstrates all available features including title, subtitle, image, content, and actions.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Perfect for showcasing products, articles, or any content that needs a structured layout.
        </Typography>
      </Box>
    ),
    actions: (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Box>
          <Button size="small" startIcon={<Favorite />}>
            Like
          </Button>
          <Button size="small" startIcon={<Share />}>
            Share
          </Button>
        </Box>
      </Box>
    ),
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    subtitle: 'With border style',
    variant: 'outlined',
    children: (
      <Typography variant="body2" color="text.secondary">
        This card uses the outlined variant instead of elevation for a different visual style.
      </Typography>
    ),
  },
};


