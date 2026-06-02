import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { Box } from '@mui/material';
import RdsTag from './rds-tag';

const meta: Meta<typeof RdsTag> = {
  title: 'Elements/Tag',
  component: RdsTag,
  parameters: {
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
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <RdsTag label="React" color="primary" />
      <RdsTag label="TypeScript" color="secondary" />
      <RdsTag label="Material-UI" color="success" />
      <RdsTag label="Removable Tag"  onRemove={() => {}} removable/>
      <RdsTag label="Vite" color="info" variant="outlined" />
      <RdsTag label="ESLint" color="error" size="small" />
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const RemoveTag: Story = {
  name: 'Interaction: Remove tag fires callback',
  args: {
    label: 'Removable',
    removable: true,
    onRemove: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // Tag label is visible
    await expect(canvas.getByText('Removable')).toBeVisible()
    // Remove button — MUI Chip delete icon renders as role="button" or has specific class
    const removeBtn = canvasElement.querySelector('[data-testid="CancelIcon"], [aria-label*="delete"], [aria-label*="remove"], svg[class*="delete"]')
      ?? canvasElement.querySelectorAll('button')[1]
      ?? canvasElement.querySelector('button')
    await expect(removeBtn).not.toBeNull()
    await userEvent.click(removeBtn as HTMLElement)
    await expect(args.onRemove).toHaveBeenCalledOnce()
  }
};
