import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import RdsTreeStructure, { IconType, NodeState, RdsTreeStructureProps, TreeLevel } from './rds-tree-structure';

const meta: Meta = {
  title: 'Elements/Tree Structure',
  component: RdsTreeStructure,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
  component: `The **Tree Structure** component visually represents hierarchical data in a clear, expandable, and collapsible tree format. It supports multiple nesting levels (Level 1 to Level 4) and different node **states** such as \`Default\`, \`Hover\`, and \`Selected\` to indicate user interaction. The component allows customization of node **icons** (e.g., \`Folder\`, \`Circle\`), and supports optional features like checkboxes, action buttons, and chevrons for expand/collapse control. Tree nodes can display labels, language icons, or other metadata, enabling intuitive navigation of complex data structures such as file systems, menus, or organizational charts. This component enhances usability and clarity by providing a structured view that fits seamlessly into your design system’s style and interaction patterns.`
}
,
      source: {
        transform: (code: string) => {
          // Transform TreeLevel enum
          code = code.replace(/level="Level([1-4])"/g, 'level={TreeLevel.Level$1}');
          code = code.replace(/level:\s*"Level([1-4])"/g, 'level: TreeLevel.Level$1');
          
          // Transform NodeState enum
          code = code.replace(/state="(Default|Hover|Selected)"/g, 'state={NodeState.$1}');
          code = code.replace(/state:\s*"(Default|Hover|Selected)"/g, 'state: NodeState.$1');
          
          // Transform IconType enum
          code = code.replace(/type="(Circle|Folder)"/g, 'type={IconType.$1}');
          code = code.replace(/type:\s*"(Circle|Folder)"/g, 'type: IconType.$1');
          
          return code;
        }
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      options: Object.values(TreeLevel),
      control: { type: "select" },
    },
    type: {
      options: Object.values(IconType),
      control: { type: "select" },
    },
    state: {
      options: Object.values(NodeState),
      control: { type: "select" },
    },
    Language: {
      options: [
        "CSS",
        "Cplus",
        "Config",
        "Database",
        "Docker",
        "ESLint",
        "Git",
        "GitHub",
        "Go",
        "Gulp",
        "HTML",
        "JS",
        "JSON",
        "Markdown",
        "Notebook",
        "Python",
        "React",
        "Sass",
        "TypeScript",
        "XML",
        "YML"
      ],
      control: { type: "select" }
    },
    showChewron: { control: 'boolean' },
    showCheckbox: { control: 'boolean' },
    showFolder: { control: 'boolean' },
    showFile: { control: 'boolean' },
    showActions: { control: 'boolean' },
    showCollapsed: { control: 'boolean' },
    treeData: { control: 'object' },
    text: { control: 'text' }, 
  },
} satisfies Meta<RdsTreeStructureProps>;

export default meta;
type Story = StoryObj<typeof RdsTreeStructure>;

export const Standard: Story = {
  args: {
    level: TreeLevel.Level4,  // Use enum instead of string
    state: NodeState.Default, // Use enum instead of string
    showChewron: true,
    showCheckbox: true,
    showFolder: true,
    showFile: true,
    text: "Name", 
    showActions: true,
    showCollapsed: false,
    type: IconType.Folder,  // Use enum instead of string
    Language: "CSS",
    treeData: [
      {
        id: 1,
        name: "Name",
        icon: "folder",
        children: [
          {
            id: 2,
            name: "Name",
            icon: "folder",
            children: [
              {
                id: 3,
                name: "Name",
                icon: "file",
                children: [
                  {
                    id: 4,
                    name: "Name",
                    icon: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Name",
        icon: "folder",
        children: [
          {
            id: 6,
            name: "Name",
            icon: "folder",
            children: [
              {
                id: 7,
                name: "Name",
                icon: "file",
                children: [
                  {
                    id: 8,
                    name: "Name",
                    icon: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 9,
        name: "Name",
        icon: "folder",
        children: [
          {
            id: 10,
            name: "Name",
            icon: "folder",
            children: [
              {
                id: 11,
                name: "Name",
                icon: "file",
                children: [
                  {
                    id: 12,
                    name: "Name",
                    icon: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 13,
        name: "Name",
        icon: "folder",
        children: [
          {
            id: 14,
            name: "Name",
            icon: "folder",
            children: [
              {
                id: 15,
                name: "Name",
                icon: "file",
                children: [
                  {
                    id: 16,
                    name: "Name",
                    icon: "file",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies Story;

Standard.parameters = {
  controls: { include: ['level', 'state', 'showChewron', 'showCheckbox', 'showFolder', 'showFile',  'text', 'showActions', 'showCollapsed', 'Language', 'type', 'treeData'] },
};