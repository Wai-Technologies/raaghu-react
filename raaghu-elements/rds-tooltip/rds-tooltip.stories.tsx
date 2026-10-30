
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
      exclude: ['ref', 'slots', 'slotProps', 'children'],
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
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: 'Tooltip placement',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const controls = {
  controls: {
    include: ['title', 'placement', 'arrow'],
  },
};

const textButton = (
  label: string,
  variant: 'filled' | 'outlined' | 'transparent'
) => (
  <RdsButton
    color="primary"
    layout="text-only"
    shape="rectangle"
    size="medium"
    variant={variant}
    textCase="unset"
  >
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
    variant="transparent"
    aria-label={label}
  />
);

export const Default: Story = {
  args: {
    title: 'This is a tooltip',
    placement: 'top',
    arrow: false,
  },
  parameters: controls,
  render: (args) => (
    <RdsTooltip {...args}>{textButton('Hover me', 'filled')}</RdsTooltip>
  ),
};

export const OnIconButton: Story = {
  args: {
    title: 'Delete item',
    placement: 'top',
  },
  parameters: controls,
  render: (args) => (
    <RdsTooltip {...args}>{iconButton(<Delete />, 'Delete item')}</RdsTooltip>
  ),
};

export const WithArrow: Story = {
  args: {
    title: 'Tooltip with arrow',
    arrow: true,
    placement: 'top',
  },
  parameters: controls,
  render: (args) => (
    <RdsTooltip {...args}>{textButton('Arrow tooltip', 'outlined')}</RdsTooltip>
  ),
};

export const Different_Placements: Story = {
  args: {
    title: 'Top placement',
    placement: 'top',
  },
  parameters: controls,
  render: (args) => (
    <RdsTooltip {...args}>{textButton('Top', 'transparent')}</RdsTooltip>
  ),
};

export const LongText: Story = {
  args: {
    title:
      'This is a very long tooltip text that might wrap to multiple lines depending on the screen size',
    placement: 'top',
    arrow: false,
  },
  parameters: controls,
  render: (args) => (
    <RdsTooltip {...args}>{iconButton(<HelpIcon />, 'Help')}</RdsTooltip>
  ),
};
