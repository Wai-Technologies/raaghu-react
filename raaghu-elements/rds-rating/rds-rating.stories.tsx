import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { Star, StarBorder } from '@mui/icons-material';
import RdsRating from './rds-rating';

const meta: Meta<typeof RdsRating> = {
  title: 'Elements/Rating',
  component: RdsRating,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'ref', 'onChange', 'icon', 'emptyIcon', 'max'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Optional label displayed next to the rating',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to display the numeric rating value',
    },
    maxStars: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Maximum number of stars',
    },
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    type: {
      control: { type: 'select' },
      options: ['star', 'slider'],
    },
    styles: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    precision: {
      control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
      description:
        'Minimum increment for star selection. Values that do not divide 1 evenly (e.g. 0.3, 0.4) are normalized so the rating renders safely.',
    },
    level: {
      control: { type: 'select' },
      options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 'Left', 'Mid', 'Right'],
      mapping: {
        'Left': 0,
        'Mid': 2.5,
        'Right': 5,
      },
    },
    colorVariant: {
      control: { type: 'select' },
      options: ['primary','success','danger','warning','light','info','secondary','dark'],
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicRatingControls = [
  'value',
  'type',
  'styles',
  'size',
  'readOnly',
  'disabled',
  'precision',
] as const;

export const Default: Story = {
  args: {
    value: 3,
    type: 'star',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['star', 'slider'],
    },
    styles: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    value: { control: false },
    showValue: { control: false },
    label: { control: false },
    maxStars: { control: false },
    size: { control: false },
    precision: { control: false },
    readOnly: { control: false },
    disabled: { control: false },
    colorVariant: { control: false },
    level: {
      control: { type: 'select' },
      options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 'Left', 'Mid', 'Right'],
      mapping: {
        'Left': 0,
        'Mid': 2.5,
        'Right': 5,
      },
    },
  },
  parameters: {
    controls: { include: ['type', 'styles', 'level'] },
    docs: {
      description: {
        story: 'Default rating component with click-to-toggle functionality and level control. You can either: 1) Click any star to select it, click the same star again to unselect (set to 0), or 2) Use the level control to set specific values.',
      },
    },
  },
};

export const WithColor: Story = {
  args: {
    value: 4,
    type: 'star',
    colorVariant: 'primary',
    styles: 'filled',
  },
  parameters: {
    controls: { include: ['value', 'type', 'colorVariant', 'styles', 'size', 'readOnly', 'disabled'] },
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const HalfStar: Story = {
  args: {
    value: 3.5,
    precision: 0.5,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const HighPrecision: Story = {
  args: {
    value: 3.7,
    precision: 0.1,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const Large: Story = {
  args: {
    value: 5,
    size: 'large',
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const NoValue: Story = {
  args: {
    value: 0,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const Small: Story = {
  args: {
    value: 4,
    size: 'small',
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};

export const WithCustomIcon: Story = {
  args: {
    value: 3,
    icon: <Star fontSize="inherit" />,
    emptyIcon: <StarBorder fontSize="inherit" />,
  },
  parameters: { controls: { include: [...basicRatingControls] } },
};
