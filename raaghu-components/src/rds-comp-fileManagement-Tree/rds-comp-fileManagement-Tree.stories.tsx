import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFileManagementTree from "./rds-comp-fileManagement-Tree";


const meta: Meta = { 
    title: "Components/File Management Tree",
    component: RdsCompFileManagementTree,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFileManagementTree>;

export default meta;
type Story = StoryObj<typeof RdsCompFileManagementTree>;

export const Default: Story = {
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
