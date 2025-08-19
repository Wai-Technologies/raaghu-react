import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsPagination from './rds-pagination';
import React, { useState } from 'react';

const meta: Meta<typeof RdsPagination> = {
  title: 'Elements/Pagination',
  component: RdsPagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'Total number of pages',
    },
    page: {
      control: 'number',
      description: 'Current page number',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of pagination',
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined'],
      description: 'Variant of pagination',
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded'],
      description: 'Shape of pagination buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether pagination is disabled',
    },
    showFirst: {
      control: 'boolean',
      description: 'Show first page button',
    },
    showLast: {
      control: 'boolean',
      description: 'Show last page button',
    },
    showDropdown: {
      control: 'boolean',
      description: 'Show dropdown for page size selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    page: 5,
  },
};
export const Advanced: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalRecords = 123;
    return (
      <RdsPagination
        {...args}
        count={totalRecords}
        page={page}
        pageSize={pageSize}
        onChange={(_, value) => setPage(value)}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        showFirst={true}
        showLast={true}
        showDropdown={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced pagination with dynamic records per page selector.'
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    count: 10,
    page: 5,
    disabled: true,
  },
};
export const Large: Story = {
  args: {
    count: 12,
    page: 6,
    size: 'large',
  },
};

export const Outlined: Story = {
  args: {
    count: 10,
    page: 3,
    variant: 'outlined',
  },
};

export const Rounded: Story = {
  args: {
    count: 15,
    page: 7,
    shape: 'rounded',
  },
};
export const Small: Story = {
  args: {
    count: 8,
    page: 4,
    size: 'small',
  },
};

export const WithFirstLast: Story = {
  args: {
    count: 20,
    page: 10,
    showFirst: true,
    showLast: true,
  },
};

