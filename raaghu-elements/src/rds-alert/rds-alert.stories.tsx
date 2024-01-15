import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsAlert from "./rds-alert";
import { alert_colors } from "../../libs/types";

export default {
    title: "Elements/Alert",
    component: RdsAlert,
    argTypes: {
        colorVariant: {
            options: alert_colors,
            control: { type: "select" },
        },
        position: {
            options: [
                "top",
                "bottom"
            ],
            control: { type: "radio" },
            if: { arg: "sticky" }
        },
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        }
    },
} as ComponentMeta<typeof RdsAlert>;

const Template: ComponentStory<typeof RdsAlert> = (args) => (
    <RdsAlert {...args} />
);



export const Default = Template.bind({});
Default.args = {
    alertmessage: "This is default alert",
    colorVariant: "primary",
    size: "small",
    dismisable: false,
    sticky: false,
    position: "top",
};

export const With_icon = Template.bind({});
With_icon.args = {
    alertmessage: "This is alert width icon",
    colorVariant: "primary",
    size: "small",
    dismisable: false,
    icon: "information",
    iconFill: false,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    sticky: false,
    position: "top",
};

export const With_close_button = Template.bind({});
With_close_button.args = {
    alertmessage: "This is close alert",
    colorVariant: "primary",
    size: "small",
    sticky: false,
    position: "top",
    dismisable: true,
    icon: "information",
    iconFill: false,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",

};
export const With_Delay_Alert = Template.bind({});
With_Delay_Alert.args = {
    alertmessage: "This is close alert",
    colorVariant: "primary",
    size: "small",
    sticky: false,
    position: "top",
    dismisable: false,
    delay: 3000,
    icon: "information",
    iconFill: false,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
};
