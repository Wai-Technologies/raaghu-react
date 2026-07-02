import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBreadcrumbs, { BreadcrumbSeparator } from './rds-breadcrumbs';

const meta: Meta<typeof RdsBreadcrumbs> = {
  title: 'Elements/Breadcrumbs',
  component: RdsBreadcrumbs,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
    title: {
      control: 'text',
      description: 'Title for the first breadcrumb item',
    },
    separatorType: {
      control: 'select',
      options: Object.values(BreadcrumbSeparator),
      description: 'Type of separator to use between breadcrumb items',
    },
    separator: {
      control: false,
      table: { disable: true },
    },
    autoIcons: {
      control: 'boolean',
      description: 'Automatically assign different icons based on breadcrumb position and content',
    },
    level: {
      control: {
        type: 'select',
        labels: {
          'level1': 'Level 1',
          'level2': 'Level 2',
          'level3': 'Level 3',
          'level4': 'Level 4',
          'level5': 'Level 5'
        }
      },
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
    title: 'Home',
    layout: 'without background',
    showIcon: true,
    state: 'default',
    level: 'level3',
    separatorType: BreadcrumbSeparator.GreaterThan,
    autoIcons: false,
  },
};

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current', active: true },
      { label: 'Category', href: '/products/category' },
      { label: 'Subcategory', href: '/products/category/subcategory' },
      { label: 'Current Page', active: true },
    ],
    layout: 'without background',
    showIcon: false,
    state: 'default',
    level: 'level2',
    separatorType: BreadcrumbSeparator.GreaterThan,
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => console.log('Navigate to Home') },
      { label: 'Products', onClick: () => console.log('Navigate to Products') },
      { label: 'Category', onClick: () => console.log('Navigate to Category') },
      { label: 'Subcategory', onClick: () => console.log('Navigate to Subcategory') },
      { label: 'Current Page', active: true },
    ],
    layout: 'pill background',
    showIcon: true,
    state: 'default',
    separatorType: BreadcrumbSeparator.Arrow,
    autoIcons: false,
    level: 'level3',
  },
};

