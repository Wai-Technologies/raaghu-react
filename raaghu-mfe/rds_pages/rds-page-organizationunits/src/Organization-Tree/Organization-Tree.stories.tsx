import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageOrganization from "./Organization-Tree";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";
export default {
    title: "Pages/Organization Unit",
    component: RdsPageOrganization,
} as ComponentMeta<typeof RdsPageOrganization>;
const Template: ComponentStory<typeof RdsPageOrganization> = (args) => (
    <RdsPageOrganization {...args} />
);
export const Default = Template.bind({});