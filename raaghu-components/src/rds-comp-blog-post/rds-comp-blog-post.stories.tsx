// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//   title: "Components/Blog post",
//   component: RdsCompDatatable,
//   decorators: [
//     (StoryComponent) => (
//       <I18nextProvider i18n={i18n}>
//         <StoryComponent />
//       </I18nextProvider>
//     ),
//   ],
// } as ComponentMeta<typeof RdsCompDatatable>;
// const Template: ComponentStory<typeof RdsCompDatatable> = (args) => (
//   <RdsCompDatatable {...args} />
// );

// export const Default = Template.bind({});
// Default.args = {
//   enablecheckboxselection: false,
//   actionPosition: "right",
//   tableHeaders: [
//     {
//       displayName: "Details",
//       key: "details",
//       datatype: "text",
//       dataLength: 30,
//       required: true,
//       sortable: true,
//     },
//     {
//       displayName: "Blog",
//       key: "blog",
//       datatype: "text",
//       dataLength: 30,
//       required: true,
//       sortable: true,
//     }, {
//       displayName: "Title",
//       key: "title",
//       datatype: "text",
//       dataLength: 30,
//       required: true,
//       sortable: true,
//     },
//     {
//       displayName: "Slug",
//       key: "slug",
//       datatype: "number",
//       dataLength: 5,
//       required: true,
//     },
//     {
//       displayName: "Creation TIme",
//       key: "CreationTime",
//       datatype: "text",
//       dataLength: 5,
//       required: true,
//     },
//     {
//       displayName: "Status",
//       key: "status",
//       datatype: "text",
//       dataLength: 5,
//       required: true
//     }
//   ],
//   tableData: [
//     { id: 1, details: "Standard", blog: "Standard", title: "Name", slug: 5, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//     { id: 2, details: "Basic", blog: "Basic", title: "Text", slug: 10, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//     { id: 3, details: "Default", blog: "Professional", title: "Name", slug: 2, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//     { id: 4, details: "Standard", blog: "Standard", title: "Text", slug: 6, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//     { id: 5, details: "Premium", blog: "Premium", title: "Name", slug: 8, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//     { id: 6, details: "Basic", blog: "Standard", title: "Data", slug: 6, CreationTime: "03/11/2023, 00:00 AM", status: "publish" },
//   ],
//   actions: [
//     { id: "delete", displayName: "Delete" },
//     { id: "edit", displayName: "Edit" },
//   ],
//   pagination: true,
//   recordsPerPage: 5,
//   recordsPerPageSelectListOption: true,
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
import RdsCompBlogPost from "./rds-comp-blog-post";

const meta: Meta = {
  title: "Components/Blog Post",
  component: RdsCompBlogPost,
  parameters: {
    layout: "",
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompBlogPost>;

export default meta;
type Story = StoryObj<typeof RdsCompBlogPost>;

export const Default: Story = {
  args: {
    enablecheckboxselection: false,
    actionPosition: "right",
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
      }, {
        displayName: "Title",
        key: "title",
        datatype: "text",
        dataLength: 30,
        required: true,
        sortable: true,
      },
      {
        displayName: "Slug",
        key: "slug",
        datatype: "number",
        dataLength: 5,
        required: true,
      },
      {
        displayName: "Creation TIme",
        key: "CreationTime",
        datatype: "text",
        dataLength: 5,
        required: true,
      },
      {
        displayName: "Status",
        key: "status",
        datatype: "text",
        dataLength: 5,
        required: true
      }
    ],
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
    recordsPerPageSelectListOption: true,


  }
} satisfies Story;