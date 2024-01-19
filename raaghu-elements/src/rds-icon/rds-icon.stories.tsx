import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsIcon from "./rds-icon";

export default {
    title: "Elements/Icon",
    component: RdsIcon,
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
    }
} as ComponentMeta<typeof RdsIcon>;

const Template: ComponentStory<typeof RdsIcon> = (args) => (
    <RdsIcon {...args} />
);

export const Icon= Template.bind({});
Icon.args = {
    name: "users",
    width: "20px",
    height: "20px",
    fill: false,
    stroke: true,
    colorVariant: "primary",
    isAnimate: true,
};

export const Tooltip = Template.bind({});
Tooltip.args = {
    colorVariant: "primary",
    icon: "plus",
    block: false,
    size: "medium",
    databstoggle: "tooltip",
    tooltip: true,
    tooltipPlacement: "right",
    tooltipTitle: "This is tooltip",
    lottie: false
};
