import type { Meta, StoryObj } from '@storybook/react-vite';
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
  { icon: <Share />, name: 'Share' },
  { icon: <Print />, name: 'Print' },
  { icon: <Favorite />, name: 'Save' },
];

export const Default: Story = {
  args: {
    ariaLabel: 'SpeedDial basic example',
    icon: <Speed />,
    actions: speedDialActions,
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
    actions: speedDialActions,
  },
};

export const DirectionLeft: Story = {
  args: {
    ariaLabel: 'SpeedDial left example',
    icon: <Speed />,
    direction: 'left',
    actions: speedDialActions,
  },
};

export const DirectionRight: Story = {
  args: {
    ariaLabel: 'SpeedDial right example',
    icon: <Speed />,
    direction: 'right',
    actions: speedDialActions,
  },
};

export const Hidden: Story = {
  args: {
    ariaLabel: 'SpeedDial hidden example',
    icon: <Speed />,
    hidden: true,
    actions: speedDialActions,
  },
};

export const WithTooltips: Story = {
  args: {
    ariaLabel: 'SpeedDial with tooltips',
    icon: <Speed />,
    actions: [
      { icon: <Share />, name: 'Share', tooltipTitle: 'Share this item' },
      { icon: <Print />, name: 'Print', tooltipTitle: 'Print this item' },
      { icon: <Favorite />, name: 'Save', tooltipTitle: 'Save to favorites' },
    ],
  },
};
