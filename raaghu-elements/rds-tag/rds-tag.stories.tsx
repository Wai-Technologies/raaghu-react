import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import RdsTag from './rds-tag';

const meta: Meta<typeof RdsTag> = {
  title: 'Elements/Tag',
  component: RdsTag,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
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
    onRemove: { control: { disable: true }, table: { disable: true } },
    onDelete: { control: { disable: true }, table: { disable: true } },
    ref: { control: { disable: true }, table: { disable: true } },
    component: { control: { disable: true }, table: { disable: true } },
    slots: { control: { disable: true }, table: { disable: true } },
    slotProps: { control: { disable: true }, table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
  },
   parameters: {
    controls: { exclude: ['removable'] },
  }
};

export const Primary: Story = {
  args: {
    label: 'Primary Tag',
    color: 'primary',
  },
   parameters: {
    controls: { exclude: ['removable'] },
  }
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Tag',
    color: 'secondary',
  },
   parameters: {
    controls: { exclude: ['removable'] },
  }
};

export const Removable: Story = {
  args: {
    label: 'Removable Tag',
    removable: true,
    onRemove: () => {},
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Tag',
    variant: 'outlined',
    color: 'primary',
  },
   parameters: {
    controls: { exclude: ['removable'] },
  }
};

export const Small: Story = {
  args: {
    label: 'Small Tag',
    size: 'small',
    color: 'success',
  },
   parameters: {
    controls: { exclude: ['removable'] },
  }
};

export const Multiple: Story = {
  render: () => (
    <Box className="rds-tag-group">
      <RdsTag label="React" color="primary" />
      <RdsTag label="TypeScript" color="secondary" />
      <RdsTag label="Material-UI" color="success" />
      <RdsTag label="Removable Tag" onRemove={() => {}} removable />
      <RdsTag label="Vite" color="info" variant="outlined" />
      <RdsTag label="ESLint" color="error" size="small" />
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};


