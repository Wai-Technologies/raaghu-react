import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSkeleton from './rds-skeleton';
import { Box, Card, CardContent } from '@mui/material';

const meta: Meta<typeof RdsSkeleton> = {
  title: 'Elements/Skeleton',
  component: RdsSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular'],
      description: 'Shape variant of the skeleton',
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
    variant: 'text',
    width: '100%',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 210,
    height: 60,
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
    animation: false,
  },
};

export const CardSkeleton: Story = {
  args: {},
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <RdsSkeleton variant="rectangular" width="100%" height={140} />
      <CardContent>
        <RdsSkeleton variant="text" sx={{ fontSize: '1.2rem' }} />
        <RdsSkeleton variant="text" />
        <RdsSkeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  ),
};
