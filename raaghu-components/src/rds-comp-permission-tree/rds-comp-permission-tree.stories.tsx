import type { Meta, StoryObj } from '@storybook/react';
import TreeNode from './rds-comp-permission-tree';


const meta: Meta = { 
    title: "Components/Permission Tree",
    component: TreeNode,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof TreeNode>;

export default meta;
type Story = StoryObj<typeof TreeNode>;

export const Default: Story = {
    args: {
        treeData: [
            {
                data: { id: 1 },
                label: 'Root',
                selected: false,
                level: 0,
                children: [
                    {
                        data: { id: 2 },
                        label: 'Child 1',
                        selected: false,
                        level: 1,
                        children: [
                            {
                                data: { id: 3 },
                                label: 'Grandchild 1',
                                selected: false,
                                level: 2,
                                children: [],
                            },
                            {
                                data: { id: 4 },
                                label: 'Grandchild 2',
                                selected: false,
                                level: 2,
                                children: [],
                            },
                        ],
                    },
                    {
                        data: { id: 5 },
                        label: 'Child 2',
                        selected: false,
                        level: 1,
                        children: [],
                    },
                ],
            },
            {
                data: { id: 2 },
                label: 'New',
                selected: false,
                level: 1,
                children: [
                    {
                        data: { id: 2 },
                        label: 'Child 1',
                        selected: false,
                        level: 1,
                        children: [
                            {
                                data: { id: 3 },
                                label: 'Grandchild 1',
                                selected: false,
                                level: 2,
                                children: [],
                            },
                            {
                                data: { id: 4 },
                                label: 'Grandchild 2',
                                selected: false,
                                level: 2,
                                children: [],
                            },
                        ],
                    },
                    {
                        data: { id: 5 },
                        label: 'Child 2',
                        selected: false,
                        level: 1,
                        children: [],
                    },
                ],
            },
        ],
    }
} satisfies Story;




