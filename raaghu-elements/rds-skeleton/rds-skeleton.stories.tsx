import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSkeleton from './rds-skeleton';
import { Card, CardContent } from '@mui/material';
const meta: Meta<typeof RdsSkeleton> = {
  title: 'Elements/Skeleton',
  component: RdsSkeleton,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['shape', 'frames', 'animation', 'width', 'height'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular'],
      description: 'Shape of the skeleton block',
    },
    frames: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of skeleton frames to render',
    },
    animated: {
      control: false,
      table: { disable: true },
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

export const Default: Story = {
  args: {
    shape: 'text',
    frames: 3,
    width: '100%',
    animation: 'pulse',
  },
};

export const Text: Story = {
  args: {
    shape: 'text',
    frames: 3,
    width: '100%',
    animation: 'pulse',
  },
};

export const Rectangular: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: "210px",
    height: "118px",
    animation: 'pulse',
  },
};

export const Circular: Story = {
  args: {
    shape: 'circular',
    frames: 3,
    width: "40px",
    height: "40px",
    animation: 'pulse',
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    frames: 3,
    width: "210px",
    height: "60px",
    animation: 'pulse',
  },
};

export const WaveAnimation: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: "210px",
    height: "118px",
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: "210px",
    height: "118px",
    animation: false,
  },
};

export const CardSkeleton: Story = {
  parameters: {
    controls: { exclude: ['shape', 'frames', 'component', 'lines'] },
  },
  argTypes: {
    shape: { table: { disable: true }, control: false },
    frames: { table: { disable: true }, control: false },
    component: { table: { disable: true }, control: false },
  },
  args: {
    width: "100%",
    height: "140px",
    animation: 'pulse',
  },
  render: (args) => (
    <Card sx={{ maxWidth: 345 }}>
      <RdsSkeleton shape="rectangular" width={args.width} height={args.height} frames={1} animation={args.animation} />
      <CardContent>
        <RdsSkeleton shape="text" sx={{ fontSize: '1.2rem' }} frames={1} animation={args.animation} />
        <RdsSkeleton shape="text" frames={1} animation={args.animation} />
        <RdsSkeleton shape="text" width="60%" frames={1} animation={args.animation} />
      </CardContent>
    </Card>
  ),
};
