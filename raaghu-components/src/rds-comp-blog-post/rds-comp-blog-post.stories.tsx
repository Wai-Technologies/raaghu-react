import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBlogPost from "./rds-comp-blog-post";

const meta: Meta = {
  title: "Components/Blog List",
  component: RdsCompBlogPost,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompBlogPost>;

export default meta;
type Story = StoryObj<typeof RdsCompBlogPost>;

export const Default: Story = {
  args: {
    tableHeaders: [
      {
        displayName: "Details",
        key: "details",
        datatype: "text",
        dataLength: 30,
        required: true,
        sortable: true,
      },
      {
        displayName: "Blog",
        key: "blog",
        datatype: "text",
        dataLength: 30,
        required: true,
        sortable: true,
      },
      {
        displayName: "Title",
        key: "title",
        datatype: "text",
        dataLength: 30,
        required: true,
        sortable: true,
      },
    ],
    // ...
    tableData: [
      { id: 1, details: "Standard", blog: "Standard", title: "Name", slug: 5, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
      { id: 2, details: "Basic", blog: "Basic", title: "Text", slug: 10, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
      { id: 3, details: "Default", blog: "Professional", title: "Name", slug: 2, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
      { id: 4, details: "Standard", blog: "Standard", title: "Text", slug: 6, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
      { id: 5, details: "Premium", blog: "Premium", title: "Name", slug: 8, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
      { id: 6, details: "Basic", blog: "Standard", title: "Data", slug: 6, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
    ],
    actions: [
      { id: "delete", displayName: "Delete" },
      { id: "edit", displayName: "Edit" },
    ],
    pagination: true,
    recordsPerPage: 5,
  }
} satisfies Story;