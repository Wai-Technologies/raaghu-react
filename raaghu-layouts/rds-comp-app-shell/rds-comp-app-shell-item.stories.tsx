import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAppShellItem from './rds-comp-app-shell-item';

const meta = {
  title: 'Application Shells/App Shell Item',
  component: RdsCompAppShellItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    headingLevel: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Heading element used for the title. Each level has its own size.',
      table: { defaultValue: { summary: 'h2' } },
    },
    className: { control: 'text', description: 'CSS class applied to the app shell item root.' },
    sx: { control: 'object', description: 'MUI system styles applied to the app shell item root.' },
    ref: { control: false, description: 'React ref to the app shell item root; assign it in code.' },
  },
} satisfies Meta<typeof RdsCompAppShellItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'App Shell Item',
    headingLevel: 'h2',
    children: 'Application content is rendered within this item.',
  },
};
