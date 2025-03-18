import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDatatable, { ActionPosition } from '../rds-comp-data-table/rds-comp-data-table';


const meta: Meta = { 
  title: "components/Pages",
    component: RdsCompDatatable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDatatable>;

export default meta;
type Story = StoryObj<typeof RdsCompDatatable>;

export const Default: Story = {
    args: {
      actionPosition: ActionPosition.Right,
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
        { id: 7, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 8, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 9, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 10, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 11, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
        { id: 12, title: "Name", slug: "test1", isHome: "True", creationTime: "03/11/2023, 00:00 AM", lastTime: "06/11/2023,05:47 AM" },
      ],
      actions: [
        { id: "delete", displayName: "Delete" },
        { id: "edit", displayName: "Edit" },
      ],
      pagination: true,
      recordsPerPage: 10,
      recordsPerPageSelectListOption: false,
    }
} satisfies Story;




