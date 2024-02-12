import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPermissionTree from "./rds-comp-permission-tree";


const meta: Meta = { 
    title: "Components/Permission Tree",
    component: RdsCompPermissionTree,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPermissionTree>;

export default meta;
type Story = StoryObj<typeof RdsCompPermissionTree>;

export const Default: Story = {
    args: {
        permissions: [
            {
                displayName: "[Test edition scope feature]",
                id: "testEditionScopeFeature",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                parent_id: "",
                children: []
            },
            {
                displayName: "Chat",
                id: "chat",
                parent_id: "",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                children: [
                    {
                        displayName: "Chat with host",
                        id: "chatwithhost",
                        parent_id: "chat",
                        isSelected: false,
                        isIntermediate: false,
                        disabled: false,
                        children: []
                    },
                    {
                        displayName: "Chat with other tenants",
                        id: "chatwithothertenats",
                        parent_id: "chat",
                        isSelected: false,
                        isIntermediate: false,
                        disabled: false,
                        children: []
                    },
                ],
            },
            {
                displayName: "Maximum user count",
                id: "maximumUserCount",
                parent_id: "",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                children: []
            },
            {
                displayName: "Test check feature",
                id: "testCheckFeature",
                parent_id: "",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                children: []
            },
            {
                displayName: "Test check feature",
                id: "testCheckFeature",
                parent_id: "",
                isSelected: true,
                isIntermediate: false,
                disabled: false,
                children: []
            },
        ],
    
        selectedPermissions: () => {
        }
    }
} satisfies Story;




