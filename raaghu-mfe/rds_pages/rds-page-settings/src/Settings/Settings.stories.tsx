import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageSettings from "./Settings";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/Settings",
    component: RdsPageSettings,
} as ComponentMeta<typeof RdsPageSettings>;

const Template: ComponentStory<typeof RdsPageSettings> = (args) => (
    <RdsPageSettings {...args} />
);

export const Default = Template.bind({});

Default.args = {};
