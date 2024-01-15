import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompPermissionTree from "./rds-comp-permission-tree";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Permission Tree",
    component: RdsCompPermissionTree,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompPermissionTree>;

const Template: ComponentStory<typeof RdsCompPermissionTree> = (args) => (
    <RdsCompPermissionTree {...args} />
);

export const PermissionTree = Template.bind({});

PermissionTree.args = {
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
};
