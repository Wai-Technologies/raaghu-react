import type { Meta, StoryObj } from '@storybook/react-vite';
import { Add, Edit, Favorite } from '@mui/icons-material';
import RdsFab from './rds-fab';

const meta: Meta<typeof RdsFab> = {
  title: 'Elements/Fab',
  component: RdsFab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'extended'],
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
    children: <Add />,
    className: 'rds-fab-default-dark-override',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: <Add />,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: <Favorite />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    color: 'primary',
    children: <Add />,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    color: 'primary',
    children: <Add />,
  },
};

export const Extended: Story = {
  args: {
    variant: 'extended',
    color: 'primary',
  },
  render: (args) => {
      if (args.variant === 'extended') {
        return (
          <RdsFab
            {...args}
            icon={<div style={{ marginTop: '5px', }}><Edit /></div>}
            label="Edit"
          />
        );
      }
      return <RdsFab {...args} icon={<Edit />} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    color: 'primary',
    children: <Add />,
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    children: <Add />,
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    children: <Add />,
  },
};
