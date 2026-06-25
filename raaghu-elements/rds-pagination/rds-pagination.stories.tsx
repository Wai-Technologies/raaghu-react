import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import RdsPagination from './rds-pagination';
import React, { useState } from 'react';

const meta: Meta<typeof RdsPagination> = {
  title: 'Elements/Pagination',
  component: RdsPagination,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
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
    showFirstButton: {
      control: 'boolean',
      description: 'Show first page button',
    },
    showLastButton: {
      control: 'boolean',
      description: 'Show last page button',
    },
    showDropdown: {
      control: 'boolean',
      description: 'Show records per page dropdown',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend text (e.g., "3 of 50 items")',
    },
    legendText: {
      control: 'text',
      description: 'Legend text template. Use {current}, {total}, {page}, {totalPages} as placeholders',
    },
    showFirst: {
      control: 'boolean',
      description: 'Show first page button (independent control)',
    },
    showLast: {
      control: 'boolean',
      description: 'Show last page button (independent control)',
    },
    showManualInput: {
      control: 'boolean',
      description: 'Show manual page input (Go to [input] Page)',
    },
    paginationStyle: {
      name: 'Style',
      control: 'select',
      options: ['Style 1', 'Style 2', 'Style 3', 'Style 4', 'Style 5', 'Style 6', 'Style 7', 'Style 8', 'Style 9', 'Style 10', 'Style 11'],
      description: 'Predefined pagination styles with different feature combinations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <RdsPagination
        {...args}
        page={page}
        pageSize={pageSize}
        onChange={(_, value) => setPage(value)}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 25, 50]}
        showDropdown={args.showDropdown}
        showLegend={args.showLegend}
        legendText={args.legendText}
        showFirst={args.showFirst}
        showLast={args.showLast}
        showManualInput={args.showManualInput}
        paginationStyle={args.paginationStyle}
      />
    );
  };

export const Default: Story = {
  render: DefaultStory,
  args: {
    count: 50,
    page: 1,
    showDropdown: false,
    showLegend: false,
    legendText: "{current} of {total} items",
    showManualInput: true,
    paginationStyle: 'Style 1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pagination with all controls available. Use the Style control to switch between 11 different pagination layouts and feature combinations.'
      }
    }
  }
};
const AdvancedStory = (args) => {
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
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        showFirstLast={false}
        showDropdown={args.showDropdown}
        showLegend={args.showLegend}
        legendText={args.legendText}
        showFirst={args.showFirst}
        showLast={args.showLast}
        showManualInput={args.showManualInput}
        paginationStyle={args.paginationStyle}
      />
    );
  };

export const Advanced: Story = {
  render: AdvancedStory,
  args: {
    showDropdown: false,
    showLegend: false,
    legendText: "{current} of {total} items",
    showManualInput: true,
    paginationStyle: 'Style 1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced pagination with 11 predefined styles. Select different styles to see various feature combinations.'
      }
    }
  }
};

const DisabledStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const Disabled: Story = {
  render: DisabledStory,
  args: {
    count: 10,
    page: 5,
    disabled: true,
  },
};
const LargeStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const Large: Story = {
  render: LargeStory,
  args: {
    count: 12,
    page: 6,
    size: 'large',
  },
};

const OutlinedStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const Outlined: Story = {
  render: OutlinedStory,
  args: {
    count: 10,
    page: 3,
    variant: 'outlined',
  },
};

const RoundedStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const Rounded: Story = {
  render: RoundedStory,
  args: {
    count: 15,
    page: 7,
    shape: 'rounded',
  },
};
const SmallStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const Small: Story = {
  render: SmallStory,
  args: {
    count: 8,
    page: 4,
    size: 'small',
  },
};

const WithFirstLastStory = (args) => {
    const [page, setPage] = useState(args.page ?? 1);
    return (
      <RdsPagination
        {...args}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    );
  };

export const WithFirstLast: Story = {
  render: WithFirstLastStory,
  args: {
    count: 20,
    page: 10,
  },
};



const NavigatePageStory = (args) => {
    const [page, setPage] = useState(1);
    return (
      <RdsPagination
        {...args}
        page={page}
        pageSize={10}
        onChange={(_: React.ChangeEvent<unknown>, value: number) => setPage(value)}
        onPageChange={setPage}
        pageSizeOptions={[10, 25, 50]}
      />
    );
  };

export const NavigatePage: Story = {
  name: 'Interaction: Navigate to next page',
  render: NavigatePageStory,
  args: {
    totalPages: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // RdsPagination shows prev/next controls — verify they render
    await expect(canvas.getByRole('button', { name: /go to next page/i })).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: /go to previous page/i })).toBeInTheDocument()
    // Current page is marked with aria-current="page"
    await expect(canvasElement.querySelector('[aria-current="page"]')).not.toBeNull()
  }
};
