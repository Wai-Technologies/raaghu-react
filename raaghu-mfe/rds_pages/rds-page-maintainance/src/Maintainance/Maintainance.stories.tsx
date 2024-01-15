import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageMaintainance from "./Maintainance";

export default {
    title: "Pages/Maintainance",
    component: RdsPageMaintainance,
} as ComponentMeta<typeof RdsPageMaintainance>;

const Template: ComponentStory<typeof RdsPageMaintainance> = () => (
    <RdsPageMaintainance />
);

export const Default = Template.bind({});

Default.args = {};
