import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSkeleton from './rds-skeleton';
import { Card, CardContent } from '@mui/material';

const meta: Meta<typeof RdsSkeleton> = {
  title: 'Elements/Skeleton',
  component: RdsSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular'],
      description: 'Shape of the skeleton block',
    },
    type: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular'],
      description: 'Shape variant of the skeleton',
    },
    frames: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of skeleton frames to render',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'Animation type',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    shape: 'text',
    frames: 3,
    width: '100%',
  },
};

export const Rectangular: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: 210,
    height: 118,
  },
};

export const Circular: Story = {
  args: {
    shape: 'circular',
    frames: 3,
    width: 40,
    height: 40,
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    frames: 3,
    width: 210,
    height: 60,
  },
};

export const WaveAnimation: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: 210,
    height: 118,
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: 210,
    height: 118,
    animation: false,
  },
};

export const CardSkeleton: Story = {
  args: {},
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <RdsSkeleton variant="rectangular" width="100%" height={140} frames={1} />
      <CardContent>
        <RdsSkeleton variant="text" sx={{ fontSize: '1.2rem' }} frames={1} />
        <RdsSkeleton variant="text" frames={1} />
        <RdsSkeleton variant="text" width="60%" frames={1} />
      </CardContent>
    </Card>
  ),
};
