import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCheckboxParentChild from "./rds-checkbox-parent-child";

export default {
    title: "Elements/Checkbox Parent Child",
    component: RdsCheckboxParentChild,
} as ComponentMeta<typeof RdsCheckboxParentChild>;

const Template: ComponentStory<typeof RdsCheckboxParentChild> = (args) => (
    <RdsCheckboxParentChild {...args} />
);

export const CheckboxParent = Template.bind({});
CheckboxParent.args = {
    userData: [
        {
            id: 1,
            label: "Parent Checkbox 1",
            isSelected: false,
            isIntermediate: false,
            disabled: false,
            childList: [
                {
                    id: 1,
                    parent_id: 1,
                    label: "Child Checkbox 1",
                    isSelected: false,
                    disabled: false,
                },
                {
                    id: 2,
                    parent_id: 1,
                    label: "Child Checkbox 2",
                    isSelected: false,
                    disabled: false,
                },
                {
                    id: 3,
                    parent_id: 1,
                    label: "Child Checkbox 3",
                    isSelected: false,
                    disabled: false,
                },
                {
                    id: 4,
                    parent_id: 1,
                    label: "Child Checkbox 4",
                    isSelected: false,
                    disabled: false,
                },
            ],
        },
        {
            id: 2,
            label: "Parent Checkbox 2",
            isSelected: false,
            isIntermediate: false,
            isClosed: false,
            disabled: false,
            childList: [
                {
                    id: 1,
                    parent_id: 2,
                    label: "Child Checkbox 1",
                    isSelected: true,
                    disabled: false,
                },
                {
                    id: 2,
                    parent_id: 2,
                    label: "Child Checkbox 2",
                    isSelected: true,
                    disabled: false,
                },
            ],
        },
    ],
};
