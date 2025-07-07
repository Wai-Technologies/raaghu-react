// import React from 'react';
// import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
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

// export const Standard: ComponentStory<typeof RdsCompFileMover> = (args) => (
//   <RdsCompFileMover {...args} />
// );

// Default.args = {
//   items: sampleItems,
//   path: (id: string) => {
//   },
// };

import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompFileMover, { FileItem } from './rds-comp-file-mover';


const meta: Meta = { 
    title: "Components/File Mover",
    component: RdsCompFileMover,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **File Mover** component is a versatile and customizable UI element designed to manage and navigate hierarchical file or folder structures within your application. It supports a `items` array to define the folder hierarchy, where each item includes properties such as `id`, `name`, `hasChildren`, `iconName`, `iconFill`, and nested `children` for subfolders. This component is ideal for file management systems, cloud storage interfaces, or any application requiring structured and interactive folder navigation. Fully customizable, the File Mover component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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
    iconName:"folder",
    iconFill: true,
    children: [
      {
        id: "1.1",
        iconName:"home",
        iconFill: true,
        name: "Subfolder 1.1",
        hasChildren: true,
        children: [
          {
            id: "1.1.1",
            name: "Sub-subfolder 1.1.1",
            iconName:"dashboard",
            iconFill: true,
          },
        ],
      },
      {
        id: "1.2",
        iconName:"folder",
        iconFill: true,
        name: "Subfolder 1.2",
        hasChildren: false,
      },
    ],
  },
  {
    id: "2",
    name: "Folder 2",
    hasChildren: true,
    iconName:"folder",
    iconFill: true,
    children: [
      {
        id: "2.1",
        name: "Subfolder 2.1",
        hasChildren: false,
        iconName:"folder",
        iconFill: true,
      },
    ],
  },
];

export default meta;
type Story = StoryObj<typeof RdsCompFileMover>;

export const Standard: Story = {
    args: {
      items: sampleItems,
        path: (id: string) => {
        },
    }
} satisfies Story;
