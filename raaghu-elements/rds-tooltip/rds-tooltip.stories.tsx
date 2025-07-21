import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTooltip from './rds-tooltip';
import { Button, IconButton } from '@mui/material';
import { Info, Delete, Help } from '@mui/icons-material';

const meta: Meta<typeof RdsTooltip> = {
  title: 'Elements/Tooltip',
  component: RdsTooltip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Tooltip text content',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of the tooltip',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is a tooltip',
    children: <Button variant="contained">Hover me</Button>,
  },
};

export const OnIconButton: Story = {
  args: {
    title: 'Delete item',
    children: (
      <IconButton>
        <Delete />
      </IconButton>
    ),
  },
};

export const WithArrow: Story = {
  args: {
    title: 'Tooltip with arrow',
    arrow: true,
    children: <Button variant="outlined">Arrow tooltip</Button>,
  },
};

export const Different_Placements: Story = {
  args: {
    title: 'Top placement',
    placement: 'top',
    children: <Button>Top</Button>,
  },
};

export const LongText: Story = {
  args: {
    title: 'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    children: (
      <IconButton>
        <Help />
      </IconButton>
    ),
  },
};
