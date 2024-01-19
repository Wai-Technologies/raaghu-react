import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIconList from "./rds-comp-icon-list";

export default {
    title: "Icon List",
    component: RdsCompIconList,
} as ComponentMeta<typeof RdsCompIconList>;

const Template: ComponentStory<typeof RdsCompIconList> = (args) => (
    <RdsCompIconList {...args} />
);

export const Default = Template.bind({});

Default.args = {
};
