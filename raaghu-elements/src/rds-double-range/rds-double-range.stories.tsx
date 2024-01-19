import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import  RdsDoubleRange from "./rds-double-range";

export default {
    title: "Elements/DoubleRange",
    component:  RdsDoubleRange,
    argTypes: {
        colorVariant: {
            options: [ "primary", "secondary","success", "info","warning","danger", "dark","light",],
            control: { type: "select" },
        },
        doubleRangeType:{
            options: ["default","type_1","type_2"],
            control: { type: "select" },
        }
    }
} as ComponentMeta<typeof  RdsDoubleRange>;

const Template: ComponentStory<typeof  RdsDoubleRange> = (args) => (
    < RdsDoubleRange {...args} />
);

export const DoubleRange = Template.bind({});
DoubleRange.args = {
    max:200,
    min:10,
    doubleRangeType:"default"
};

