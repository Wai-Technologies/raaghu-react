import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from '@storybook/test';
import RdsChip from './rds-chip';
import { Face, Delete, Done } from '@mui/icons-material';

const meta: Meta<typeof RdsChip> = {
  title: 'Elements/Chip',
  component: RdsChip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text to display on the chip',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Variant of the chip',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color of the chip',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the chip',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Chip',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Chip',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Chip',
    variant: 'outlined',
  },
};

export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    clickable: true,
    onClick: () => alert('Chip clicked!'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Chip with Icon',
    icon: <Face />,
  },
};

export const WithDeleteIcon: Story = {
  args: {
    label: 'Deletable Chip',
    onDelete: () => alert('Chip deleted!'),
    deleteIcon: <Delete />,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Chip',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Chip',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    color: 'success',
    icon: <Done />,
  },
};

export const ClickTest: Story = {
  name: 'Interaction: Chip click fires callback',
  args: {
    label: 'Click Me',
    clickable: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // MUI Chip renders as role="button" but accessible name is empty — query without name filter
    const chip = canvas.getByRole('button')
    await expect(chip).toBeVisible()
    await userEvent.click(chip)
    await expect(args.onClick).toHaveBeenCalledOnce()
  }
};
