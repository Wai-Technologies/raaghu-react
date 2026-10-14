import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTooltip from './rds-tooltip';
import Delete from '@mui/icons-material/Delete';
import RdsButton from '../rds-button/rds-button';
import HelpIcon from '@mui/icons-material/Help';
import type { ReactNode } from 'react';

const meta: Meta<typeof RdsTooltip> = {
  title: 'Elements/Tooltip',
  component: RdsTooltip,
  parameters: {
    status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['ref', 'slots', 'slotProps'],
    },
  },
  tags: ['autodocs', 'stable'],
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
type Story = StoryObj<typeof meta>;

const controls = { controls: { include: ['title', 'placement', 'arrow'] } };

const textButton = (label: string, style: 'filled' | 'outlined' | 'transparent') => (
  <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style={style} textCase="unset">
    {label}
  </RdsButton>
);

const iconButton = (icon: ReactNode, label: string) => (
  <RdsButton
    changeLeftIcon={icon}
    color="primary"
    layout="icon-only"
    shape="rectangle"
    showLeftIcon
    size="medium"
    state="default"
    style="transparent"
    aria-label={label}
  />
);

export const Default: Story = {
  args: {
    title: 'This is a tooltip',
    children: textButton('Hover me', 'filled'),
    placement: 'top',
    arrow: false,
  },
  parameters: controls,
};

export const OnIconButton: Story = {
  args: {
    title: 'Delete item',
    children: iconButton(<Delete />, 'Delete item'),
    placement: 'top',
  },
  parameters: controls,
};

export const WithArrow: Story = {
  args: {
    title: 'Tooltip with arrow',
    arrow: true,
    children: textButton('Arrow tooltip', 'outlined'),
    placement: 'top',
  },
  parameters: controls,
};

export const Different_Placements: Story = {
  args: {
    title: 'Top placement',
    placement: 'top',
    children: textButton('Top', 'transparent'),
  },
  parameters: controls,
};

export const LongText: Story = {
  args: {
    title: 'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    children: iconButton(<HelpIcon />, 'Help'),
    placement: 'top',
  },
  parameters: controls,
};
