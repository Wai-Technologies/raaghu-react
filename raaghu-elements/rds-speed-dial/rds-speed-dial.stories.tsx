import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import { Speed, Share, Print, Favorite } from '@mui/icons-material';
import RdsSpeedDial from './rds-speed-dial';

const meta: Meta<typeof RdsSpeedDial> = {
  title: 'Elements/Speed Dial',
  component: RdsSpeedDial,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const speedDialActions = [
  { icon: <Share />, name: 'Share', onClick: () => {} },
  { icon: <Print />, name: 'Print', onClick: () => {} },
  { icon: <Favorite />, name: 'Save', onClick: () => {} },
];

export const Default: Story = {
  args: {
    ariaLabel: 'SpeedDial basic example',
    icon: <Speed />,
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
    icon: <Speed />,
    open: true,
    actions: speedDialActions,
  },
};

export const DirectionDown: Story = {
  args: {
    ariaLabel: 'SpeedDial down example',
    icon: <Speed />,
    direction: 'down',
    open: false,
    actions: speedDialActions,
  },
};

export const DirectionLeft: Story = {
  args: {
    ariaLabel: 'SpeedDial left example',
    icon: <Speed />,
    direction: 'left',
    open: false,
    actions: speedDialActions,
  },
};

export const DirectionRight: Story = {
  args: {
    ariaLabel: 'SpeedDial right example',
    icon: <Speed />,
    direction: 'right',
    open: false,
    actions: speedDialActions,
  },
};

export const Hidden: Story = {
  args: {
    ariaLabel: 'SpeedDial hidden example',
    icon: <Speed />,
    hidden: true,
    open: false,
    actions: speedDialActions,
  },
};

export const WithTooltips: Story = {
  args: {
    ariaLabel: 'SpeedDial with tooltips',
    icon: <Speed />,
    open: false,
    actions: [
      { icon: <Share />, name: 'Share', tooltipTitle: 'Share this item', onClick: () => {} },
      { icon: <Print />, name: 'Print', tooltipTitle: 'Print this item', onClick: () => {} },
      { icon: <Favorite />, name: 'Save', tooltipTitle: 'Save to favorites', onClick: () => {} },
    ],
  },
};
