import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Fastfood, LaptopMac, Hotel } from '@mui/icons-material';
import RdsTimeline from './rds-timeline';

const meta: Meta<typeof RdsTimeline> = {
  title: 'Elements/Timeline',
  component: RdsTimeline,
  parameters: {
    status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['ref', 'component', 'children'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'alternate'],
    },
    showTime: {
      control: 'boolean',
    },
    items: {
      control: false,
      description: 'Timeline entries. Icons are provided in the story render, not Controls.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 1,
    title: 'Eat',
    description: 'Because you need strength',
  },
  {
    id: 2,
    title: 'Code',
    description: "Because it's fun",
    icon: <LaptopMac />,
  },
  {
    id: 3,
    title: 'Sleep',
    description: 'Because you need rest',
  },
];

const iconItems = [
  {
    id: 1,
    title: 'Eat',
    description: 'Because you need strength',
    icon: <Fastfood />,
  },
  {
    id: 2,
    title: 'Code',
    description: "Because it's fun",
    icon: <LaptopMac />,
  },
  {
    id: 3,
    title: 'Sleep',
    description: 'Because you need rest',
    icon: <Hotel />,
  },
];

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  },
  args: {
    position: 'right',
    showTime: false,
  },
  render: (args) => <RdsTimeline {...args} items={defaultItems} />,
};

export const WithIcons: Story = {
  args: {
    position: 'right',
    showTime: false,
  },
  render: (args) => <RdsTimeline {...args} items={iconItems} />,
};

export const Alternate: Story = {
  args: {
    position: 'alternate',
    showTime: false,
  },
  render: (args) => <RdsTimeline {...args} items={iconItems} />,
};

export const Right: Story = {
  args: {
    position: 'right',
    showTime: false,
  },
  render: (args) => <RdsTimeline {...args} items={iconItems} />,
};
