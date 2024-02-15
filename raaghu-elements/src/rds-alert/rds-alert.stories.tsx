import React from "react";
import RdsAlert from "./rds-alert";
// import { alert_colors } from "../../libs/types";
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof RdsAlert> = {
    title: "Elements/Alert",
    component: RdsAlert,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "success",
                "danger",
                "warning",
                "light",
                "info",
                "secondary",
                "dark",
            ],
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
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RdsAlert>;

export const Default: Story = {
    args: {
        alertmessage: "This is default alert",
        colorVariant: "primary",
        size: "small",
        dismisable: false,
        sticky: false,
        position: "top",
    }
};



export const With_icon: Story = {
    args: {
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
    }
};


export const With_close_button: Story = {
    args: {
        alertmessage: "This is close alert",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        sticky: false,
        position: "top",
        icon: "information",
        iconFill: false,
        iconStroke: true,
        iconHeight: "20px",
        iconWidth: "20px",
    }
};

export const With_Delay_Alert: Story = {
    args: {
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
    }
};

