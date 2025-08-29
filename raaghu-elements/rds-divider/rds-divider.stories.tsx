import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsDivider from './rds-divider';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof RdsDivider> = {
  title: 'Elements/Divider',
  component: RdsDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],

  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    dividerMessage: {
      control: 'text',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    flexItem: {
      control: 'boolean',
    },
    iconShow: {
      control: 'boolean',
      defaultValue: true,
    },
    iconName: {
      control: 'text',
      description: 'Enter the icon name to display (e.g., InfoOutlined, Add)',
      defaultValue: 'InfoOutlined',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dividerMessage: 'Default Divider',
    textAlign: 'center',
    iconShow: true,
    iconName: 'InfoOutlined',
  },
};
export const Vertical: Story = {
  args: {
    flexItem: true,
    layout: "vertical",
    iconName: 'InfoOutlined',
  },
  parameters: {
    controls: { exclude: ['layout'] }, // Hide layout control for this story
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: 120 }}>
        <Typography>Left</Typography>
        <Story />
        <Typography>Right</Typography>
      </Box>
    ),
  ],
};


export const WithText: Story = {
  args: {
    dividerMessage: 'OR',
    textAlign: 'center',
    iconShow: true,
    iconName: 'InfoOutlined',
  },
};

export const Flexed: Story = {
  args: {
    dividerMessage: 'Flexed',
    flexItem: true,
    iconShow: true,
    iconName: 'InfoOutlined',
  },
};
