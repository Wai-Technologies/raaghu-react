import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPageForgotPassword from "./changepassword";

export default {
    title: "Pages/Forgot Password",
    component: RdsPageForgotPassword,
} as ComponentMeta<typeof RdsPageForgotPassword>;

const Template: ComponentStory<typeof RdsPageForgotPassword> = (args) => (
    <RdsPageForgotPassword {...args} />
);

export const Default = Template.bind({});

Default.args = {};
