import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageTenant from "./tenant";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/Tenant",
    component: RdsPageTenant,
} as ComponentMeta<typeof RdsPageTenant>;

const Template: ComponentStory<typeof RdsPageTenant> = (args) => (
    <RdsPageTenant {...args} />
);

export const Default = Template.bind({});

Default.args = {};
