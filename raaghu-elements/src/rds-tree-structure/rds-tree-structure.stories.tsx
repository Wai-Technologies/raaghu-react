import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RdsTreeStructure, { IconType, NodeState, RdsTreeStructureProps, TreeLevel } from './rds-tree-structure';

const meta: Meta = {
  title: 'Elements/Tree Structure',
  component: RdsTreeStructure,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      options: [
        "level1",
        "level2",
        "level3",
        "level4",
      ],
      control: { type: "select" },
    },
    type: {
      options: [
        "circle",
        "folder",
      ],
      control: { type: "select" },
    },
    state: {
      options: [
        "default",
        "hover",
        "selected"
      ],
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

export const Default: Story = {
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

Default.parameters = {
  controls: { include: ['level', 'state', 'showChewron', 'showCheckbox', 'showFolder', 'showFile',  'text', 'showActions', 'showCollapsed', 'Language', 'type', 'treeData'] },
};