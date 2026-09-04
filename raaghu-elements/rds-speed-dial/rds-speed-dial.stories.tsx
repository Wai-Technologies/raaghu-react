import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import SpeedIcon from '@mui/icons-material/Speed';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RdsSpeedDial from './rds-speed-dial';

const meta: Meta<typeof RdsSpeedDial> = {
  title: 'Elements/Speed Dial',
  component: RdsSpeedDial,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
    },
    open: {
      control: { type: 'boolean' },
    },
    hidden: {
      control: { type: 'boolean' },
    },
    actions: {
      control: { disable: true },
    },
    icon: {
      control: { disable: true },
    },
    openIcon: {
      control: { disable: true },
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const speedDialActions = [
  { icon: <ShareIcon />, name: 'Share', onClick: () => {} },
  { icon: <PrintIcon />, name: 'Print', onClick: () => {} },
  { icon: <FavoriteIcon />, name: 'Save', onClick: () => {} },
];

export const Default: Story = {
  args: {
    ariaLabel: 'SpeedDial basic example',
    icon: <SpeedIcon />,
    open: false,
    actions: speedDialActions,
  },
  play: async ({ canvasElement }) => {
    const fab = canvasElement.querySelector('.MuiSpeedDial-fab, button') || canvasElement.firstElementChild;
    expect(fab).toBeTruthy();
  },
};

export const Open: Story = {
  args: {
    ariaLabel: 'SpeedDial open example',
    icon: <SpeedIcon />,
    open: true,
    actions: speedDialActions,
  },
};

export const DirectionDown: Story = {
  args: {
    ariaLabel: 'SpeedDial down example',
    icon: <SpeedIcon />,
    direction: 'down',
    open: false,
    actions: speedDialActions,
  },
};

export const DirectionLeft: Story = {
  args: {
    ariaLabel: 'SpeedDial left example',
    icon: <SpeedIcon />,
    direction: 'left',
    open: false,
    actions: speedDialActions,
  },
};

export const DirectionRight: Story = {
  args: {
    ariaLabel: 'SpeedDial right example',
    icon: <SpeedIcon />,
    direction: 'right',
    open: false,
    actions: speedDialActions,
  },
};

export const Hidden: Story = {
  args: {
    ariaLabel: 'SpeedDial hidden example',
    icon: <SpeedIcon />,
    hidden: true,
    open: false,
    actions: speedDialActions,
  },
};

export const WithTooltips: Story = {
  args: {
    ariaLabel: 'SpeedDial with tooltips',
    icon: <SpeedIcon />,
    open: false,
    actions: [
      { icon: <ShareIcon />, name: 'Share', tooltipTitle: 'Share this item', onClick: () => {} },
      { icon: <PrintIcon />, name: 'Print', tooltipTitle: 'Print this item', onClick: () => {} },
      { icon: <FavoriteIcon />, name: 'Save', tooltipTitle: 'Save to favorites', onClick: () => {} },
    ],
  },
};
