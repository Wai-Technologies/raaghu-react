import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import RdsTag from './rds-tag';

const meta: Meta<typeof RdsTag> = {
  title: 'Elements/Tag',
  component: RdsTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    removable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Tag',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Tag',
    color: 'secondary',
  },
};

export const Removable: Story = {
  args: {
    label: 'Removable Tag',
    removable: true,
    onRemove: () => alert('Tag removed!'),
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Tag',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Tag',
    size: 'small',
    color: 'success',
  },
};

export const Multiple: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <RdsTag label="React" color="primary" />
      <RdsTag label="TypeScript" color="secondary" />
      <RdsTag label="Material-UI" color="success" />
      <RdsTag label="Removable Tag"  onRemove={() => alert('Tag removed!')} removable/>
      <RdsTag label="Vite" color="info" variant="outlined" />
      <RdsTag label="ESLint" color="error" size="small" />
    </Box>
  ),
};
