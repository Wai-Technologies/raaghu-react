import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBreadcrumbs from './rds-breadcrumbs';

const meta: Meta<typeof RdsBreadcrumbs> = {
  title: 'Elements/Breadcrumbs',
  component: RdsBreadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current Page', active: true },
    ],
  },
};

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current', active: true },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Navigate to Home') },
      { label: 'Products', onClick: () => alert('Navigate to Products') },
      { label: 'Current Page', active: true },
    ],
  },
};
