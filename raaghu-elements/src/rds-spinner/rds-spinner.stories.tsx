import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsSpinner from "./rds-spinner";

export default {
    title: "Elements/Spinner",
    component: RdsSpinner,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
    }
} as ComponentMeta<typeof RdsSpinner>;

const Template: ComponentStory<typeof RdsSpinner> = (args) => (
    <RdsSpinner {...args}/>
);

export const Spinner = Template.bind({});
Spinner.parameters = { controls: { include: ['spinnerType','size', 'colorVariant'] } };
Spinner.args = {
    colorVariant:"primary",
    spinnerType:false
};

