import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsSelectList from "./rds-select-list";

export default {
    title: "Elements/SelectList",
    component: RdsSelectList,
    argTypes: {
        size: {
            options: ["lg",
                "md",
                "sm"
            ],
            control: { type: "select" },
        },
    }
} as ComponentMeta<typeof RdsSelectList>;

const Template: ComponentStory<typeof RdsSelectList> = (args) => (
    <RdsSelectList {...args} />
);

export const SelectList = Template.bind({});
SelectList.args = {
    id:"story",
    label:"Open select list",
    isMultiple:false,
    placeholder:"Select option",
    selectItems:[
        {
            option:"One",
            value:"one"
        },
        {
            option:"two",
            value:"two"
        },
        {
            option:"three",
            value:"three"
        },
        {
            option:"four",
            value:"four"
        }

    ],
    isDisabled:false,
    selectedValue:"",
};