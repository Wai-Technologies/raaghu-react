import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@mui/material';
import './rds-stack.scss';
import RdsStack from './rds-stack';
import RdsBox from '../rds-box/rds-box';


const meta: Meta<typeof RdsStack> = {
  title: 'Elements/Stack',
  component: RdsStack,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
      include: ['spacing', 'children', 'direction', 'divider'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    spacing: {
      control: { type: 'number' },
    },
    divider: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const stackItems = [
  <RdsBox key="1" className="rds-stack__demo-item rds-stack__demo-item--primary">Item 1</RdsBox>,
  <RdsBox key="2" className="rds-stack__demo-item rds-stack__demo-item--secondary">Item 2</RdsBox>,
  <RdsBox key="3" className="rds-stack__demo-item rds-stack__demo-item--success">Item 3</RdsBox>,
];

export const Default: Story = {
  args: {
    spacing: 2,
    children: stackItems,
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    children: stackItems,
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    spacing: 2,
    children: stackItems,
  },
};

export const RowReverse: Story = {
  args: {
    direction: 'row-reverse',
    spacing: 2,
    children: stackItems,
  },
};

export const ColumnReverse: Story = {
  args: {
    direction: 'column-reverse',
    spacing: 2,
    children: stackItems,
  },
};

export const WithSpacing: Story = {
  args: {
    direction: 'row',
    spacing: 4,
    children: stackItems,
  },
};

export const NoSpacing: Story = {
  args: {
    direction: 'row',
    spacing: 0,
    children: stackItems,
  },
};

export const WithDivider: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    divider: true,
    children: stackItems,
  },
};

export const Responsive: Story = {
  args: {
    direction: { xs: 'column', sm: 'row' },
    spacing: { xs: 1, sm: 2, md: 4 },
    children: [
      <Typography key="1" variant="h6">Responsive</Typography>,
      <Typography key="2" variant="h6">Stack</Typography>,
      <Typography key="3" variant="h6">Layout</Typography>,
    ],
  },
};
