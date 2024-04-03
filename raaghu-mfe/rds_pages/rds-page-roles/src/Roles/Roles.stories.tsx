import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import Roles from "./Roles";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";
export default {
    title: "Pages/Roles",
    component: Roles,
} as ComponentMeta<typeof Roles>;
const Template: ComponentStory<typeof Roles> = (args) => (
    <Roles {...args} />
);

export const Default = Template.bind({});
Default.args = {};
