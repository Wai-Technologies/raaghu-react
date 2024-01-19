
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompApplyForPosition from "./rds-comp-apply-for-position";

export default {
    title: "Components/Apply For Position",
    component: RdsCompApplyForPosition,

} as ComponentMeta<typeof RdsCompApplyForPosition>;


const Template: ComponentStory<typeof RdsCompApplyForPosition> = (args) => (
    <RdsCompApplyForPosition {...args} />
);


export const ApplyForPosition = Template.bind({});

ApplyForPosition.args = {

};

