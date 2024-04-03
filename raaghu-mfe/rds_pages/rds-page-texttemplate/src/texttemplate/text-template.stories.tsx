import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageTextTemplate from "./text-template";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/TextTemplate",
    component: RdsPageTextTemplate,
} as ComponentMeta<typeof RdsPageTextTemplate>;

const Template: ComponentStory<typeof RdsPageTextTemplate> = () => (
    <RdsPageTextTemplate />
);

export const Default = Template.bind({});

Default.args = {};
