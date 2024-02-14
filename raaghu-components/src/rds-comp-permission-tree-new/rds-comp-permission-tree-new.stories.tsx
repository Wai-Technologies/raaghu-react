import type { Meta, StoryObj } from '@storybook/react';
import TreeNode from './rds-comp-permission-tree-new';


const meta: Meta = { 
    title: "Components/Permission Tree New",
    component: TreeNode,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof TreeNode>;

export default meta;
type Story = StoryObj<typeof TreeNode>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




