import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import RdsSkeleton from './rds-skeleton';
import { Card, CardContent } from '@mui/material';

const meta: Meta<typeof RdsSkeleton> = {
  title: 'Elements/Skeleton',
  component: RdsSkeleton,
  parameters: {
    layout: 'padded',
    controls: {
      include: ['shape', 'frames', 'animated', 'animation', 'width', 'height'],
    },
  },
  tags: ['autodocs'],
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
      control: 'boolean',
      description: 'Show Animated: Yes/No. Enable this option to add animation to the skeleton, providing a more dynamic loading effect, or turn it off for a static placeholder.',
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
    animated: true,
  },
};

export const Rectangular: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: "210px",
    height: "118px",
    animated: true,
  },
};

export const Circular: Story = {
  args: {
    shape: 'circular',
    frames: 3,
    width: "40px",
    height: "40px",
    animated: true,
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    frames: 3,
    width: "210px",
    height: "60px",
    animated: true,
  },
};

export const WaveAnimation: Story = {
  args: {
    shape: 'rectangular',
    frames: 3,
    width: "210px",
    height: "118px",
    animation: 'wave',
    animated: true,
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
  parameters: {
    controls: {
      exclude: ['animated'],
    },
  },
};

export const CardSkeleton: Story = {
  parameters: {
    controls: { exclude: ['shape', 'frames', 'component', 'lines'] },
  },
  argTypes: {
    shape: { table: { disable: true }, control: false },
    frames: { table: { disable: true }, control: false },
    // lines: { table: { disable: true }, control: false }, // removed: not in RdsSkeletonProps
    component: { table: { disable: true }, control: false },
  },
  args: {
    width: "100%",
    height: "140px",
    animated: true,
  },
  render: (args) => (
    <Card sx={{ maxWidth: 345 }}>
      <RdsSkeleton shape="rectangular" width={args.width} height={args.height} frames={1} animated={args.animated} animation={args.animation} />
      <CardContent>
        <RdsSkeleton shape="text" sx={{ fontSize: '1.2rem' }} frames={1} animated={args.animated} animation={args.animation} />
        <RdsSkeleton shape="text" frames={1} animated={args.animated} animation={args.animation} />
        <RdsSkeleton shape="text" width="60%" frames={1} animated={args.animated} animation={args.animation} />
      </CardContent>
    </Card>
  ),
};
export const SkeletonVisible: Story = {
  name: 'Interaction: Skeleton renders loading state',
  args: {
    shape: 'text',
    frames: 3,
    width: '100%',
    animated: true,
  },
  play: async ({ canvasElement }) => {
    // MUI Skeleton renders as role="presentation" or has MuiSkeleton class
    const skeletons = canvasElement.querySelectorAll('[class*="MuiSkeleton-root"]')
    await expect(skeletons.length).toBeGreaterThan(0)
    await expect(skeletons[0]).toBeVisible()
  }
};
