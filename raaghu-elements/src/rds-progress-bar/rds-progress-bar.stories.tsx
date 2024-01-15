import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsProgressBar from "./rds-progress-bar";
import { button_colors } from "../../libs/types/colorvariant";

export default {
    title: "Elements/ProgressBar",
    component: RdsProgressBar,
    argTypes: {
        colorVariant: {
            options: button_colors,
            control: { type: "select" },
            if: { arg: 'colorVariant' }
        }
    },
} as ComponentMeta<typeof RdsProgressBar>;

const Template: ComponentStory<typeof RdsProgressBar> = (args) => (
    <RdsProgressBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    role: "single",
    colorVariant: "primary",
    striped: true,
    progressWidth: 40,
    animation: false,
    height: 15,
    displayLevel: true,
    displayPercentage: true,
};

export const MultiProgressBar = Template.bind({});
MultiProgressBar.args = {
    role: "multiple",
    height: 15,
    width: "inherit",
    progressValues: [
        {
            progressWidth: 50,
            colorVariant: "success",
            stripe: true,
            animation: true
        },
        {
            progressWidth: 20,
            colorVariant: "danger",
            stripe: true,
            animation: true
        },
        {
            progressWidth: 30,
            colorVariant: "info",
            stripe: true,
            animation: true
        },
    ],
};
