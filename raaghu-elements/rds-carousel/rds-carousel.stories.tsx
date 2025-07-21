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
    },
    autoPlayInterval: {
      control: 'number',
    },
    showArrows: {
      control: 'boolean',
    },
    showDots: {
      control: 'boolean',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleSlide = ({ color, text }: { color: string; text: string }) => (
  <Box
    sx={{
      backgroundColor: color,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
    }}
  >
    {text}
  </Box>
);

export const Default: Story = {
  args: {
    children: [
      <SampleSlide key={1} color="#e74c3c" text="Slide 1" />,
      <SampleSlide key={2} color="#3498db" text="Slide 2" />,
      <SampleSlide key={3} color="#2ecc71" text="Slide 3" />,
      <SampleSlide key={4} color="#f39c12" text="Slide 4" />,
    ],
    autoPlay: false,
    showArrows: true,
    showDots: true,
    height: '400px',
  },
};

export const AutoPlay: Story = {
  args: {
    children: [
      <SampleSlide key={1} color="#9b59b6" text="Auto Slide 1" />,
      <SampleSlide key={2} color="#1abc9c" text="Auto Slide 2" />,
      <SampleSlide key={3} color="#e67e22" text="Auto Slide 3" />,
    ],
    autoPlay: true,
    autoPlayInterval: 2000,
    showArrows: true,
    showDots: true,
    height: '300px',
  },
};

export const NoControls: Story = {
  args: {
    children: [
      <SampleSlide key={1} color="#34495e" text="No Controls 1" />,
      <SampleSlide key={2} color="#95a5a6" text="No Controls 2" />,
    ],
    showArrows: false,
    showDots: false,
    height: '250px',
  },
};
