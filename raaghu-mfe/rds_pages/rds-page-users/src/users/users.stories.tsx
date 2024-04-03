import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageUsers from "./users";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/Users",
    component: RdsPageUsers,
} as ComponentMeta<typeof RdsPageUsers>;

const Template: ComponentStory<typeof RdsPageUsers> = () => (
    <RdsPageUsers />
);

export const Default = Template.bind({});

Default.args = {};
