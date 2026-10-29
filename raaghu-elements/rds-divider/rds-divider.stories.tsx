import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Box, Typography } from '@mui/material';
import RdsDivider from './rds-divider';

const meta: Meta<typeof RdsDivider> = {
  title: 'Elements/Divider',
  component: RdsDivider,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: ['component','flexItem'],
    },
  },
  tags: ['autodocs', 'stable'],

  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    children: {
      control: 'text',
      description: 'Text shown next to the line',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    flexItem: {
      control: 'boolean',
    },
    iconShow: {
      name: 'show icon',
      control: 'boolean',
      description: 'Show the icon next to the divider text. Set false (or icon={null}) to hide.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    icon: {
      control: false,
      description: 'Icon shown next to the text (ReactNode). Defaults to an InfoOutlined icon',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the divider',
      defaultValue: 'medium',
    },
    color: {
      name: 'color',
      control: 'select',
      options: ['subtle', 'strong', 'primary'],
      description: 'Style appearance of the divider',
      defaultValue: 'subtle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Divider',
    textAlign: 'center',
    size: 'medium',
    color: 'subtle',
    iconShow: true,
  },
  play: async ({ canvasElement }) => {
    const hr = canvasElement.querySelector('hr, [role="separator"]');
    expect(hr).toBeTruthy();
  },
};
export const Vertical: Story = {
  args: {
    flexItem: true,
    layout: "vertical",
    iconShow: false
  },
  parameters: {
    controls: { exclude: ['layout', 'component', 'icon', 'children', 'textAlign', 'iconShow'] },
  },
  render: (args) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body2">Left</Typography>
      <RdsDivider {...args} />
      <Typography variant="body2">Right</Typography>
    </Box>
  ),
};


export const WithText: Story = {
  args: {
    children: 'OR',
    textAlign: 'center',
    size: 'medium',
    color: 'subtle',
  },
};

export const Flexed: Story = {
  args: {
    children: 'Flexed',
    flexItem: true,
    size: 'medium',
    color: 'subtle',
  },
};
