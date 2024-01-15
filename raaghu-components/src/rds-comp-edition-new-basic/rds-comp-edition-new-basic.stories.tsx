
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompEditionNewBasic from "./rds-comp-edition-new-basic";

export default {
    title: "Components/Edition New Basic  ",
    component: RdsCompEditionNewBasic,

} as ComponentMeta<typeof RdsCompEditionNewBasic>;


const Template: ComponentStory<typeof RdsCompEditionNewBasic> = (args) => (
    <RdsCompEditionNewBasic  {...args} />
);


export const EditionNewBasic = Template.bind({});

EditionNewBasic.args = {
    planList: [
        {
            "isFree": true,
            "value": "standard",
            "option": "Standard",
            "isSelected": false
        },
        {
            "isFree": false,
            "value": "advanced",
            "option": "Advanced",
            "isSelected": false
        }
    ],
};