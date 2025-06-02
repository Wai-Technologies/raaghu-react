import type { Meta, StoryObj } from '@storybook/react';
import TreeNode from './rds-comp-permission-tree';


const meta: Meta = { 
    title: "Components/Permission Tree",
    component: TreeNode,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Permission Tree** component is a customizable UI element designed to display and manage hierarchical permission structures within your application. It supports features such as nested nodes, selectable items, and expandable/collapsible levels, making it ideal for role-based access control systems, administrative dashboards, or any application requiring structured permission management. Fully customizable, the Permission Tree component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




