import type { Meta, StoryObj } from '@storybook/react-vite';
import { Star, StarBorder } from '@mui/icons-material';
import RdsRating from './rds-rating';

const levelControl = {
  control: { type: 'select' as const },
  options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 'Left', 'Mid', 'Right'],
  mapping: {
    Left: 0,
    Mid: 2.5,
    Right: 5,
  },
};

const precisionControl = {
  control: { type: 'select' as const },
  options: [1, 0.5, 0.25, 0.1],
};

const hiddenControls = [
  'level',
  'precision',
  'max',
  'icon',
  'emptyIcon',
  'onChange',
  'ref',
  'component',
  'slots',
  'slotProps',
];

const meta: Meta<typeof RdsRating> = {
  title: 'Elements/Rating',
  component: RdsRating,
  parameters: {
    status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: hiddenControls,
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
    },
    showValue: {
      control: 'boolean',
    },
    maxStars: {
      control: 'number',
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
    precision: precisionControl,
    level: levelControl,
    colorVariant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'danger', 'warning', 'light', 'info', 'secondary', 'dark'],
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    icon: { control: { disable: true }, table: { disable: true } },
    emptyIcon: { control: { disable: true }, table: { disable: true } },
    onChange: { control: { disable: true }, table: { disable: true } },
    ref: { control: { disable: true }, table: { disable: true } },
    component: { control: { disable: true }, table: { disable: true } },
    slots: { control: { disable: true }, table: { disable: true } },
    slotProps: { control: { disable: true }, table: { disable: true } },
    max: { control: { disable: true }, table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    type: 'star',
  },
  parameters: {
    controls: {
      exclude: hiddenControls.filter((key) => key !== 'level'),
    },
    docs: {
      description: {
        story:
          'Default rating component with click-to-toggle functionality and level control. You can either: 1) Click any star to select it, click the same star again to unselect (set to 0), or 2) Use the level control to set specific values.',
      },
    },
  },
  argTypes: {
    value: { table: { disable: true } },
    showValue: { table: { disable: true } },
    label: { table: { disable: true } },
    maxStars: { table: { disable: true } },
    size: { table: { disable: true } },
    precision: { table: { disable: true } },
    readOnly: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
};

export const WithColor: Story = {
  args: {
    value: 4,
    type: 'star',
    colorVariant: 'primary',
    styles: 'filled',
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
};

export const HalfStar: Story = {
  args: {
    value: 3.5,
    precision: 0.5,
  },
  parameters: {
    controls: {
      exclude: hiddenControls.filter((key) => key !== 'precision'),
    },
  },
};

export const HighPrecision: Story = {
  args: {
    value: 3.7,
    precision: 0.1,
  },
  parameters: {
    controls: {
      exclude: hiddenControls.filter((key) => key !== 'precision'),
    },
  },
};

export const Large: Story = {
  args: {
    value: 5,
    size: 'large',
  },
};

export const NoValue: Story = {
  args: {
    value: 0,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    value: 4,
    size: 'small',
  },
};

export const WithCustomIcon: Story = {
  args: {
    value: 3,
    icon: <Star fontSize="inherit" />,
    emptyIcon: <StarBorder fontSize="inherit" />,
  },
};
