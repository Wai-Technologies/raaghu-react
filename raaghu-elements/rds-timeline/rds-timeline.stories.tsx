import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import { Fastfood, LaptopMac, Hotel } from '@mui/icons-material';
import RdsTimeline from './rds-timeline';

const meta: Meta<typeof RdsTimeline> = {
  title: 'Elements/Timeline',
  component: RdsTimeline,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'alternate'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  },
  args: {
    items: [
      {
        id: 1,
        title: 'Eat',
        description: 'Because you need strength',
      },
      {
        id: 2,
        title: 'Code',
        description: 'Because it\'s fun',
        icon: <LaptopMac />,
      },
      {
        id: 3,
        title: 'Sleep',
        description: 'Because you need rest',
      },
    ],
  },
};
export const WithIcons: Story = {
  args: {
     items: [
      {
        id: 1,
        title: 'Eat',
        description: 'Because you need strength',
        icon: <Fastfood />,
      },
      {
        id: 2,
        title: 'Code',
        description: 'Because it\'s fun',
        icon: <LaptopMac />,
      },
      {
        id: 3,
        title: 'Sleep',
        description: 'Because you need rest',
        icon: <Hotel />,
      },
    ],
  },
};
      

export const Alternate: Story = {
  args: {
    position: 'alternate',
    items: [
      {
        id: 1,
        title: 'Eat',
        description: 'Because you need strength',
        icon: <Fastfood />,
      },
      {
        id: 2,
        title: 'Code',
        description: 'Because it\'s fun',
        icon: <LaptopMac />,
      },
      {
        id: 3,
        title: 'Sleep',
        description: 'Because you need rest',
        icon: <Hotel />,
      },
    ],
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    items: [
      {
        id: 1,
        title: 'Eat',
        description: 'Because you need strength',
        icon: <Fastfood />,
      },
      {
        id: 2,
        title: 'Code',
        description: 'Because it\'s fun',
        icon: <LaptopMac />,
      },
      {
        id: 3,
        title: 'Sleep',
        description: 'Because you need rest',
        icon: <Hotel />,
      },
    ],
  },
};