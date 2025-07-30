import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTooltip from './rds-tooltip';
import { Button, IconButton } from '@mui/material';
import { Info, Delete, Help } from '@mui/icons-material';

const meta: Meta<typeof RdsTooltip> = {
  title: 'Elements/Tooltip',
  component: RdsTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Tooltip text content',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
    },
    placement: {
      control: 'select',
      options: [
        'top', 'bottom', 'left', 'right',
        'top-start', 'top-end',
        'bottom-start', 'bottom-end',
        'left-start', 'left-end',
        'right-start', 'right-end',
      ],
      description: 'Placement of the tooltip',
    },

  },
};

export default meta;

export const Default: StoryObj<typeof RdsTooltip> = {
  args: {
    title: 'This is a tooltip',
    children: <Button variant="contained">Hover me</Button>,
    placement: 'top',
  },
};

export const OnIconButton: StoryObj<typeof RdsTooltip> = {
  args: {
    title: 'Delete item',
    children: (
      <IconButton>
        <Delete />
      </IconButton>
    ),
    placement: 'top',
  },
};

export const WithArrow: StoryObj<typeof RdsTooltip> = {
  args: {
    title: 'Tooltip with arrow',
    arrow: true,
    children: <Button variant="outlined">Arrow tooltip</Button>,
    placement: 'top',
  },
};

export const Different_Placements: StoryObj<typeof RdsTooltip> = {
  args: {
    title: 'Top placement',
    placement: 'top',
    children: <Button>Top</Button>,
  },
};

export const LongText: StoryObj<typeof RdsTooltip> = {
  args: {
    title: 'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    children: (
      <IconButton>
        <Help />
      </IconButton>
    ),
    placement: 'top',
  },
};
