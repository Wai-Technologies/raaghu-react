import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsButton from "./rds-button";

export default {
    title: "Elements/Button",
    component: RdsButton,
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
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
            if: { arg: 'tooltip' }
        },
    },
} as ComponentMeta<typeof RdsButton>;

const Template: ComponentStory<typeof RdsButton> = (args) => (
    <RdsButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    colorVariant: "primary",
    label: "BUTTON",
    block: false,
    size: "medium",
    showLoadingSpinner:true,
};

export const Disable = Template.bind({});
Disable.args = {
    colorVariant: "primary",
    label: "Disable",
    isDisabled: true,
    block: false,
    size: "medium",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: "plus",
    colorVariant: "primary",
    size: "medium",
    isFabIcon:true
};

export const Outline = Template.bind({});
Outline.args = {
    isOutline: true,
    colorVariant: "primary",
    label: "BUTTON",
    block: false,
    size: "medium",
};

export const Tooltip = Template.bind({});
Tooltip.args = {
    colorVariant: "primary",
    icon:"plus",
    block: false,
    size: "medium",
    databstoggle : "tooltip",
    tooltip:true,
    tooltipPlacement: "right",
    tooltipTitle: "This is tooltip",
};


export const TextWithIcon = Template.bind({});
TextWithIcon.args = {
    icon: "plus",
    colorVariant: "primary",
    label: "Button",
    block: false,
    size: "medium",
    showLoadingSpinner:true
};
