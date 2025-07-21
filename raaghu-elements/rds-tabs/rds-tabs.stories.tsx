import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTabs from './rds-tabs';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof RdsTabs> = {
  title: 'Elements/Tabs',
  component: RdsTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab configurations',
    },
    activeTab: {
      control: 'number',
      description: 'Index of the active tab',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    label: 'Overview',
    content: (
      <Box p={3}>
        <Typography variant="h6">Overview Content</Typography>
        <Typography>This is the overview tab content with general information.</Typography>
      </Box>
    ),
  },
  {
    label: 'Details',
    content: (
      <Box p={3}>
        <Typography variant="h6">Details Content</Typography>
        <Typography>This tab contains detailed information and specifications.</Typography>
      </Box>
    ),
  },
  {
    label: 'Settings',
    content: (
      <Box p={3}>
        <Typography variant="h6">Settings Content</Typography>
        <Typography>Configure your preferences and options here.</Typography>
      </Box>
    ),
  },
  {
    label: 'Help',
    content: (
      <Box p={3}>
        <Typography variant="h6">Help Content</Typography>
        <Typography>Find help and documentation in this section.</Typography>
      </Box>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 0,
  },
};

export const SecondTabActive: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 1,
  },
};

export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 0,
    orientation: 'vertical',
  },
};

export const SimpleTabs: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', content: <Box p={2}>Content for Tab 1</Box> },
      { label: 'Tab 2', content: <Box p={2}>Content for Tab 2</Box> },
      { label: 'Tab 3', content: <Box p={2}>Content for Tab 3</Box> },
    ],
    activeTab: 0,
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      content: <Box p={2}>Content for Tab {i + 1}</Box>,
    })),
    activeTab: 2,
  },
};
