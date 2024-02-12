// import React from 'react';
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompFileMover, { FileItem } from './rds-comp-file-mover';

// export default {
//   title: "Components/File Mover",
//   component: RdsCompFileMover,
// } as ComponentMeta<typeof RdsCompFileMover>;

// const sampleItems: FileItem[] = [
//   {
//     id: "1",
//     name: "Folder 1",
//     hasChildren: true,
//     children: [
//       {
//         id: "1.1",
//         name: "Subfolder 1.1",
//         hasChildren: true,
//         children: [
//           {
//             id: "1.1.1",
//             name: "Sub-subfolder 1.1.1",
//           },
//         ],
//       },
//       {
//         id: "1.2",
//         name: "Subfolder 1.2",
//         hasChildren: false,
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Folder 2",
//     hasChildren: true,
//     children: [
//       {
//         id: "2.1",
//         name: "Subfolder 2.1",
//         hasChildren: false,
//       },
//     ],
//   },
// ];

// export const Default: ComponentStory<typeof RdsCompFileMover> = (args) => (
//   <RdsCompFileMover {...args} />
// );

// Default.args = {
//   items: sampleItems,
//   path: (id: string) => {
//   },
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFileMover, { FileItem } from './rds-comp-file-mover';


const meta: Meta = { 
    title: "Components/File Mover",
    component: RdsCompFileMover,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFileMover>;


const sampleItems: FileItem[] = [
  {
    id: "1",
    name: "Folder 1",
    hasChildren: true,
    children: [
      {
        id: "1.1",
        name: "Subfolder 1.1",
        hasChildren: true,
        children: [
          {
            id: "1.1.1",
            name: "Sub-subfolder 1.1.1",
          },
        ],
      },
      {
        id: "1.2",
        name: "Subfolder 1.2",
        hasChildren: false,
      },
    ],
  },
  {
    id: "2",
    name: "Folder 2",
    hasChildren: true,
    children: [
      {
        id: "2.1",
        name: "Subfolder 2.1",
        hasChildren: false,
      },
    ],
  },
];

export default meta;
type Story = StoryObj<typeof RdsCompFileMover>;

export const Default: Story = {
    args: {
      items: sampleItems,
        path: (id: string) => {
        },
    }
} satisfies Story;
