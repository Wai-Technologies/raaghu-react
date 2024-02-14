// /* eslint-disable */
// import React from 'react';
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompDatatable from '../rds-comp-data-table/rds-comp-data-table';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../../.storybook/i18n';

// export default {
//   title: "components/Pages",
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
//   actionPosition: "right",
//   tableHeaders: [
//     {
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
//       datatype: "text",
//       dataLength: 5,
//       required: true,
//     },
//     {
//       displayName: "Is Home Pages",
//       key: "isHome",
//       datatype: "text",
//       dataLength: 30,
//       required: true,
//       sortable: true,
//     },
//     {
//       displayName: "Creation TIme",
//       key: "creationTime",
//       datatype: "text",
//       dataLength: 5,
//       required: true,
//     },
//     {
//       displayName: "Last Modification Time",
//       key: "lastTime",
//       datatype: "text",
//       dataLength: 5,
//       required: true,
//     }

//   ],
//   tableData: [
//     { id: 1, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
//     { id: 2, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
//     { id: 3, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
//     { id: 4, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
//     { id: 5, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
//     { id: 6, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
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
import RdsCompDatatable from '../rds-comp-data-table/rds-comp-data-table';


const meta: Meta = { 
  title: "components/Pages",
    component: RdsCompDatatable,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDatatable>;

export default meta;
type Story = StoryObj<typeof RdsCompDatatable>;

export const Default: Story = {
    args: {
      actionPosition: "right",
      tableHeaders: [
        {
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
          datatype: "text",
          dataLength: 5,
          required: true,
        },
        {
          displayName: "Is Home Pages",
          key: "isHome",
          datatype: "text",
          dataLength: 30,
          required: true,
          sortable: true,
        },
        {
          displayName: "Creation TIme",
          key: "creationTime",
          datatype: "text",
          dataLength: 5,
          required: true,
        },
        {
          displayName: "Last Modification Time",
          key: "lastTime",
          datatype: "text",
          dataLength: 5,
          required: true,
        }
    
      ],
      tableData: [
        { id: 1, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 2, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 3, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 4, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 5, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 6, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
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




