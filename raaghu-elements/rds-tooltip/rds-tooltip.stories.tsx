import type { Meta } from '@storybook/react-vite';
import RdsTooltip from './rds-tooltip';
import { Button, IconButton } from '@mui/material';
import {Delete, Help } from '@mui/icons-material';

const meta: Meta<typeof RdsTooltip> = {
  title: 'Elements/Tooltip',
  component: RdsTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Tooltip text content',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
    },
    style: {
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

export const Default = {
  args: {
    label: 'This is a tooltip',
    children: <Button variant="contained">Hover me</Button>,
    style: 'top',
    arrow : false,
  },
};

export const OnIconButton = {
  args: {
    label: 'Delete item',
    children: (
      <IconButton>
        <Delete />
      </IconButton>
    ),
    style: 'top',
  },
};

export const WithArrow = {
  args: {
    label: 'Tooltip with arrow',
    arrow: true,
    children: <Button variant="outlined">Arrow tooltip</Button>,
    style: 'top',
  },
};

export const Different_Placements = {
  args: {
    label: 'Top placement',
    style: 'top',
    children: <Button>Top</Button>,
  },
};

export const LongText = {
  args: {
    label: 'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    children: (
      <IconButton>
        <Help />
      </IconButton>
    ),
    style: 'top',
  },
};
