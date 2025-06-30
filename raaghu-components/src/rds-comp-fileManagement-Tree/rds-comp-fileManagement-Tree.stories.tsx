import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFileManagementTree from "./rds-comp-fileManagement-Tree";


const meta: Meta = { 
    title: "Components/File Management Tree",
    component: RdsCompFileManagementTree,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **File Management Tree** component is a customizable UI element designed to display and manage hierarchical file or folder structures in a tree format. It supports an `items` array to define the hierarchy, where each item includes properties such as `id`, `name`, and nested `children` for subfolders or files. This component is ideal for file management systems, cloud storage interfaces, or any application requiring structured and interactive folder navigation. Fully customizable, the File Management Tree component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFileManagementTree>;

export default meta;
type Story = StoryObj<typeof RdsCompFileManagementTree>;

export const Standard: Story = {
    args: {
      items: [
        {
          id: "1",
          name: "Folder 1",
          children: [
            {
              id: "1-1",
              name: "File 1-1",
            },
            {
              id: "1-2",
              name: "File 1-2",
            },
            {
              id: "1-3",
              name: "File 1-3",
            },
          ],
        },
        {
          id: "2",
          name: "Folder 2",
          children: [
            {
              id: "2-1",
              name: "File 2-1",
            },
            {
              id: "2-2",
              name: "File 2-2",
            },
          ],
        },
      ],
    }
} satisfies Story;
