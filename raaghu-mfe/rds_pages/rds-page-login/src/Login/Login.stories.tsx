import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageLogin from "./Login";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

addDecorator((story) => (
    <BrowserRouter>
        <Provider store={store}>{story()}</Provider>
    </BrowserRouter>
));

export default {
    title: "Pages/Login",
    component: RdsPageLogin,
} as ComponentMeta<typeof RdsPageLogin>;

const Template: ComponentStory<typeof RdsPageLogin> = (args) => (
    <RdsPageLogin {...args} />
);

export const Default = Template.bind({});

Default.args = {};
