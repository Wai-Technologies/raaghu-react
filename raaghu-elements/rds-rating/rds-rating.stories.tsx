import type { Meta, StoryObj } from '@storybook/react-vite';
import { Star, StarBorder } from '@mui/icons-material';
import RdsRating from './rds-rating';

const meta: Meta<typeof RdsRating> = {
  title: 'Elements/Rating',
  component: RdsRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    precision: {
      control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
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

export const Default: Story = {
  args: {
    value: 3,
  },
};

export const HalfStar: Story = {
  args: {
    value: 3.5,
    precision: 0.5,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    value: 4,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    value: 5,
    size: 'large',
  },
};

export const HighPrecision: Story = {
  args: {
    value: 3.7,
    precision: 0.1,
  },
};

export const NoValue: Story = {
  args: {
    value: 0,
  },
};

export const WithCustomIcon: Story = {
  args: {
    value: 3,
    icon: <Star fontSize="inherit" />,
    emptyIcon: <StarBorder fontSize="inherit" />,
  },
};
