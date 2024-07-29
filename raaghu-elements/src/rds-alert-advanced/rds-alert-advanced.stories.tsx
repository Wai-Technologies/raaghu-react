import React from "react";
import RdsAlert from "./rds-alert-advanced";
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof RdsAlert> = {
    title: "Elements/Alert Advance",
    component: RdsAlert,
    tags: ['autodocs'],
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
        },
    },
    
};

export default meta;
type Story = StoryObj<typeof RdsAlert>;

export const Default: Story = {
    args: {
        icon: "information",
        iconFill: false,
        iconStroke: true,
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        alertheading: "Alert Title: ",
        alertmessage: "This is default alert description message.",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        sticky: false,
        position: "top",
        withBorder: false,
        withLeftBorder: false,
    }
};
Default.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'dismisable', 'sticky', 'position', 'alertheading', 'withBorder', 'withLeftBorder'] } };
