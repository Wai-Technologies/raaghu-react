import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import RdsCarousel from './rds-carousel';

const meta: Meta<typeof RdsCarousel> = {
  title: 'Elements/Carousel',
  component: RdsCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: {
      control: 'boolean',
      description: 'Enable automatic slide transition',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'Interval (ms) between auto-play slide transitions',
    },
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows for previous/next slide',
    },
    showDots: {
      control: 'boolean',
      description: 'Show indicator dots/lines for slide navigation',
    },
    height: {
      control: 'text',
      description: 'Height of the carousel (e.g., 400px, 50vh)',
    },
    type: {
      control: 'select',
      options: ['circle', 'line'],
      description: 'Indicator style: circle (dot) or line',
    },
    state: {
      control: 'select',
      options: ['1', '2', '3', '4'],
      description: 'Initial active slide (1-based index)',
    },
    style: {
      control: 'select',
      options: ['default', 'with title', 'full width image'],
      description: 'Carousel style variant: default, with title overlay, or full width image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleSlide = ({ image, text }: { image: string; text: string }) => (
  <Box
    sx={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    }}
  >
    {text}
  </Box>
);

export const Default: Story = {
  args: {
    children: [
      <SampleSlide key={1} image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" text="Slide 1" />,
      <SampleSlide key={2} image="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" text="Slide 2" />,
      <SampleSlide key={3} image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" text="Slide 3" />,
      <SampleSlide key={4} image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" text="Slide 4" />,
    ],
    autoPlay: false,
    showArrows: true,
    showDots: true,
    height: '400px',
    type: 'circle',
    style: 'default',
  },
};

export const AutoPlay: Story = {
  args: {
    children: [
      <SampleSlide key={1} image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" text="Auto Slide 1" />,
      <SampleSlide key={2} image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80" text="Auto Slide 2" />,
      <SampleSlide key={3} image="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" text="Auto Slide 3" />,
    ],
    autoPlay: true,
    autoPlayInterval: 2000,
    showArrows: true,
    showDots: true,
    height: '300px',
    style: 'default',
  },
};

export const NoControls: Story = {
  args: {
    children: [
      <SampleSlide key={1} image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" text="No Controls 1" />,
      <SampleSlide key={2} image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" text="No Controls 2" />,
    ],
    showArrows: false,
    showDots: false,
    height: '250px',
  },
};
