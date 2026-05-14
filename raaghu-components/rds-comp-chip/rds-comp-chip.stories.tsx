import { StoryObj, Meta } from '@storybook/react-vite';
import { useState } from 'react';
import RdsCompChip, { RdsCompChipProps } from './rds-comp-chip';
import { Delete, Face, Favorite, CheckCircle, Error, Warning, Info } from '@mui/icons-material';

const meta: Meta<typeof RdsCompChip> = {
  title: 'Components/Chip',
  component: RdsCompChip,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The content of the component',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'The variant to use',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the component',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the component',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    selected: {
      control: 'boolean',
      description: 'If true, the chip is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompChip>;

// ─── Default Story ───────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Chip Component',
    variant: 'filled',
    size: 'medium',
    color: 'default',
  },
};


