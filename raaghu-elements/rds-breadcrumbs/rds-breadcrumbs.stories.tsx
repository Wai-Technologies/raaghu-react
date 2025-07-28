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
    level: {
      control: 'select',
      options: ['level1', 'level2', 'level3', 'level4', 'level5'],
      description: 'Breadcrumb level to display specific number of items',
    },
    layout: {
      control: 'select',
      options: ['pill background', 'without background', 'square background'],
      description: 'Breadcrumb item style layout',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show icon in breadcrumb items',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected'],
      description: 'Breadcrumb item state',
    },
     icon: {
      control: 'text',
      description: 'Icon to display in breadcrumb items',
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
      { label: 'Category', href: '/products/category' },
      { label: 'Subcategory', href: '/products/category/subcategory' },
      { label: 'Current Page', active: true },
    ],
    layout: 'without background',
    showIcon: true,
    state: 'default',
  },
};

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current', active: true },
    ],
    layout: 'without background',
    showIcon: false,
    state: 'default',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Navigate to Home') },
      { label: 'Products', onClick: () => alert('Navigate to Products') },
      { label: 'Current Page', active: true },
    ],
    layout: 'pill background',
    showIcon: true,
    state: 'default',
  },
};