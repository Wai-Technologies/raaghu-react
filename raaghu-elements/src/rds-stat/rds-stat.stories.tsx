import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsStat from "./rds-stat";

export default {
    title: "Elements/Stat",
    component: RdsStat,
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
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsStat>;

const Template: ComponentStory<typeof RdsStat> = (args) => (
    <RdsStat {...args} />
);

export const Default = Template.bind({});
Default.args = {
    displayType: "basic",
    colorVariant: "primary",
    items: [
        {
            title: "SAM SMITH",
            value: "2370",
            icon: "star",
            iconHeight: "80px",
            iconWidth: "80px",
            iconFill: true,
        },
    ],
};

export const Advanced = Template.bind({});
Advanced.args = {
    displayType: "advanced",
    colorVariant: "primary",
    items: [
        {
            title: "SAM SMITH",
            value: "2370",
            icon: "star",
            iconHeight: "80px",
            iconWidth: "80px",
            iconFill: true,
        },
    ],
};
