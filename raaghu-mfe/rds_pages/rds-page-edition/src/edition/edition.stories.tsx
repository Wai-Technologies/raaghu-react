
import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageEdition from "./edition";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";
export default {
    title: "Pages/Edition",
    component: RdsPageEdition,
} as ComponentMeta<typeof RdsPageEdition>;
const Template: ComponentStory<typeof RdsPageEdition> = (args) => (
    <RdsPageEdition {...args} />
);

export const Default = Template.bind({});
Default.args = {};
