import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPageDashboard from "./Dashboard";

export default {
    title: "Pages/Dashboard",
    component: RdsPageDashboard,

} as ComponentMeta<typeof RdsPageDashboard>;


const Template: ComponentStory<typeof RdsPageDashboard> = (args) =>
    <RdsPageDashboard {...args} />;


export const Default = Template.bind({});

Default.args = {

};

