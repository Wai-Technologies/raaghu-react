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
      description: 'Array of breadcrumb items. Each item supports `label`, `href`, `active`, `selected`, `level`, `layout`, `showIcon`, `icon`, and `onClick`. Set `selected: true` on an item to display it as selected.',
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
    icon: {
      control: 'text',
      description: "Icon to display in breadcrumb items: a built-in name ('home', 'folder', 'category', 'business', 'inventory', 'star') or any icon element",
    },
    separator: { control: { disable: true }, table: { disable: true } },
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
    level: 'level3',
    separatorType: BreadcrumbSeparator.GreaterThan,
    autoIcons: false,
  },
};

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => {} },
      { label: 'Products', onClick: () => {} },
      { label: 'Category', onClick: () => {} },
      { label: 'Subcategory', onClick: () => {} },
      { label: 'Current Page', active: true },
    ],
    layout: 'without background',
    showIcon: false,
    level: 'level2',
    separatorType: BreadcrumbSeparator.GreaterThan,
  },
};

export const WithSelectedItem: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products', selected: true },
      { label: 'Category', href: '/products/category' },
      { label: 'Current Page', active: true },
    ],
    layout: 'without background',
    showIcon: true,
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
    separatorType: BreadcrumbSeparator.Arrow,
    autoIcons: false,
    level: 'level3',
  },
};
