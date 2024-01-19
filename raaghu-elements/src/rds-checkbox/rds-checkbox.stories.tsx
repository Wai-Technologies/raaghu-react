import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCheckbox from "./rds-checkbox";

export default {
    title: "Elements/Checkbox",
    component: RdsCheckbox,
    argTypes:{
        state: {
            options:["Checkbox" ,"Indeterminate" , "ErrorCheckbox"],
            control: { type: "select" },
        }
    }
} as ComponentMeta<typeof RdsCheckbox>;

const Template: ComponentStory<typeof RdsCheckbox> = (args) => (
    <RdsCheckbox {...args} />
);
                                                                                                                                                                                              
export const checkbox = Template.bind({});
checkbox.args = {
    state: "Checkbox",
    label: "default checkbox",
    checked:false,
    isDisabled:false,
    isSwitch:false,
    withlabel:true,
    id: "id1",
    //errorMessage:"error Message",
    isInputGroup: false
};

