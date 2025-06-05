import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPage from './rds-comp-page';

const meta: Meta = {
  title: "Components/Page",
  component: RdsCompPage,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Page** component is a foundational UI element designed to structure and display content within your application. It provides a flexible layout for organizing various elements, making it ideal for dashboards, content pages, or any interface requiring a consistent and customizable page structure. Fully customizable, the Page component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPage>;

export default meta;
type Story = StoryObj<typeof RdsCompPage>;

export const Default: Story = {
  args: {
    type:"default",
  }
} satisfies Story;
Default.parameters = { controls: { include: [ "newPageData", "reset", "onSaveHandler", "onCancel"]},};

export const Pages: Story = {
    args: {
      type: "pages",
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
      // actionPosition: ActionPosition.Right,
      // recordsPerPageSelectListOption: false,
      // onPaginationHandler: fn()
    }
} satisfies Story;
Pages.parameters = { controls: { include: [ "actionPosition", "tableHeaders", "tableData", "actions", "pagination", "recordsPerPage", "recordsPerPageSelectListOption", "onPaginationHandler", "fontWeight", "enablecheckboxselection", "enableRadioButtonselection", "illustration", "noDataTilte", "noDataheaderTitle", "classes", "swapRows", "isSwap", "isClickable", "onActionSelection", "onRowSelect", "onRowClick", "tableStyle", "alignmentType", "totalRecords", "actionColumnStyle"]},};

export const pageNotFound: Story = {
  args: {
    type:"pageNotFound",
  }
} satisfies Story;
pageNotFound.parameters = { controls: { include: []},};
