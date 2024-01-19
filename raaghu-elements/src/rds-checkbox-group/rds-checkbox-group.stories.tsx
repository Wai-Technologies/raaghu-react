import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCheckboxGroup from "./rds-checkbox-group";

export default {
    title: "Elements/Checkbox Group",
    component: RdsCheckboxGroup,
    argTypes: {
        state: {
            options: ["Checkbox", "Indeterminate", "ErrorCheckbox"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsCheckboxGroup>;

const Template: ComponentStory<typeof RdsCheckboxGroup> = (args) => (
    <RdsCheckboxGroup {...args} />
);

export const CheckboxGroup = Template.bind({}); 
CheckboxGroup.args = {
    state: "Checkbox",
    isSwitch: false,
    isInline: false,
    label: "Checkbox Group",
  
    itemList: [
        {
            id: 1,
            label: "Child Checkbox 1",
            checked: false,
            disabled: false,
        },
        {
            id: 2,
            label: "Child Checkbox 2",
            checked: false,
            disabled: false,
        },
        {
            id: 3,
            label: "Child Checkbox 3",
            checked: false,
            disabled: false,
        },
    ],
    errorMessage: "Error Message",
};
