import { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompTreeStructure, { IconType, NodeState, RdsCompTreeStructureProps, TreeLevel, defaultFileTypeIcons, getDefaultFileIcon } from './rds-comp-tree-structure';

const meta: Meta = {
  title: 'Internal/Tree Structure',
  component: RdsCompTreeStructure,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          code = code.replace(/level="(Level1|Level2|Level3|Level4)"/g, 'level={TreeLevel.$1}');
          code = code.replace(/level:\s*"(Level1|Level2|Level3|Level4)"/g, 'level: TreeLevel.$1');
          
          code = code.replace(/state="(Default|Hover|Selected)"/g, 'state={NodeState.$1}');
          code = code.replace(/state:\s*"(Default|Hover|Selected)"/g, 'state: NodeState.$1');
          
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
      control: {
        type: 'select',
        labels: {
          [TreeLevel.Level1]: 'Level 1',
          [TreeLevel.Level2]: 'Level 2', 
          [TreeLevel.Level3]: 'Level 3',
          [TreeLevel.Level4]: 'Level 4'
        }
      },
      options: Object.values(TreeLevel),
      description: "Tree depth level. Controls how many nested levels are shown (Level1 to Level4)."
    },
    type: {
      options: Object.values(IconType),
      control: { type: "select" },
      description: "Icon type for folders. Choose between Circle or Folder icons."
    },
    state: {
      options: Object.values(NodeState),
      control: { type: "select" },
      description: "Node state: Default, Hover, or Selected. Controls node highlight style."
    },
    Language: {
      options: [
        "CSS",
        "Cplus",
        "Config",
        "Database",
        "Default",
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
      control: { type: "select" },
      description: "Language type for file icons. Select to show different file type icons."
    },
    showChewron: { control: 'boolean', description: "Show chevron icon for expandable/collapsible nodes." },
    showCheckbox: { control: 'boolean', description: "Show checkbox next to each node for selection." },
    showFolder: { control: 'boolean', description: "Show folder icon for folder nodes." },
    showFile: { control: 'boolean', description: "Show file icon for file nodes." },
    showActions: { control: 'boolean', description: "Show action buttons (add, edit, move, delete) on node hover." },
    showCollapsed: { control: 'boolean', description: "Collapse tree by default. If false, tree is expanded initially." },
    checkedNodes: { control: 'object', description: "Array of checked node IDs. Controls which nodes are selected." },
    treeData: { control: 'object', description: "Tree data structure. Defines nodes, children, and hierarchy." },
    text: { control: 'text', description: "Text to display for each node. If not set, uses node name." },
  },
} satisfies Meta<RdsCompTreeStructureProps>;

export default meta;
// type Story = StoryObj<typeof RdsCompTreeStructure>;

// export const Default: Story = {
//   args: {
//     level: TreeLevel.Level4,  // Use enum instead of string
//     state: NodeState.Default, // Use enum instead of string
//     showChewron: true,
//     showCheckbox: true,
//     showFolder: true,
//     showFile: true,
//     text: "Name", 
//     showActions: true,
//     showCollapsed: false,
//     type: IconType.Folder,  // Use enum instead of string
//     Language: "TypeScript",
//     treeData: [
//       {
//         id: 1,
//         name: "Name",
//         icon: "folder",
//         children: [
//           {
//             id: 2,
//             name: "Name",
//             icon: "folder",
//             children: [
//               {
//                 id: 3,
//                 name: "Name",
//                 icon: "file",
//                 children: [
//                   {
//                     id: 4,
//                     name: "Name",
//                     icon: "file",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 5,
//         name: "Name",
//         icon: "folder",
//         children: [
//           {
//             id: 6,
//             name: "Name",
//             icon: "folder",
//             children: [
//               {
//                 id: 7,
//                 name: "Name",
//                 icon: "file",
//                 children: [
//                   {
//                     id: 8,
//                     name: "Name",
//                     icon: "file",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 9,
//         name: "Name",
//         icon: "folder",
//         children: [
//           {
//             id: 10,
//             name: "Name",
//             icon: "folder",
//             children: [
//               {
//                 id: 11,
//                 name: "Name",
//                 icon: "file",
//                 children: [
//                   {
//                     id: 12,
//                     name: "Name",
//                     icon: "file",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 13,
//         name: "Name",
//         icon: "folder",
//         children: [
//           {
//             id: 14,
//             name: "Name",
//             icon: "folder",
//             children: [
//               {
//                 id: 15,
//                 name: "Name",
//                 icon: "file",
//                 children: [
//                   {
//                     id: 16,
//                     name: "Name",
//                     icon: "file",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// } satisfies Story;

// Default.parameters = {
//   controls: { include: ['level', 'state', 'showChewron', 'showCheckbox', 'showFolder', 'showFile',  'text', 'showActions', 'showCollapsed', 'Language', 'type', 'treeData'] },
// };