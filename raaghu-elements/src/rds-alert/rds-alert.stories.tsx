import React from "react";
import RdsAlert from "./rds-alert";
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof RdsAlert> = {
    title: "Elements/Alert",
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
        displayType: {
            options: ["singleline", "multiline"],
            control: { type: "select" },
        },
    },
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
        withBorder: true,
        displayType: "singleline",
    }
};
Default.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'dismisable', 'sticky', 'position'] } };

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
        withBorder: true,
        displayType: "singleline",
    }
};
With_icon.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'dismisable', 'icon', 'iconFill', 'iconStroke', 'iconHeight', 'iconWidth', 'sticky', 'position'] } };

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
        withBorder: true,
        displayType: "singleline",
    }
};
With_close_button.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'dismisable', 'icon', 'iconFill', 'iconStroke', 'iconHeight', 'iconWidth', 'sticky', 'position'] } };

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
        withBorder: true,
        displayType: "singleline",
    }
};
With_Delay_Alert.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'dismisable', 'icon', 'iconFill', 'iconStroke', 'iconHeight', 'iconWidth', 'sticky', 'position', 'delay'] } };

export const With_Buttons: Story = {
    args: {
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        alertheading: "Heading Title: ",
        alertmessage: "This is the description of the message bar.",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        position: "top",
        withBorder: true,
        displayType: "singleline",
    }
};
With_Buttons.parameters = { controls: { include: ['alertmessage', 'icon', 'colorVariant', 'size', 'alertheading', 'withBorder'] } };

export const With_Buttons_Multiline: Story = {
    args: {
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        alertheading: "Heading Title: ",
        alertmessage: "This is the description of the message bar.",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        position: "top",
        withBorder: true,
        withLeftBorder: false,
        description: "This is the description which should not exceed 100 character limit.",
        displayType: "multiline",
    }
};
With_Buttons_Multiline.parameters = { controls: { include: ['alertmessage', 'colorVariant', 'size', 'alertheading', 'withBorder', 'withLeftBorder', 'description'] } };

export const With_Shadow: Story = {
    args: {
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        alertheading: "Heading Title: ",
        alertmessage: "This is the description of the message bar.",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        position: "top",
        withBorder: false,
        displayType: "singleline",
    }
};
With_Shadow.parameters = { controls: { include: ['alertmessage', 'icon', 'colorVariant', 'size', 'alertheading', 'withBorder'] } };

export const With_Left_Border: Story = {
    args: {
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        alertheading: "Heading Title: ",
        alertmessage: "This is the description of the message bar.",
        colorVariant: "primary",
        size: "small",
        dismisable: true,
        position: "top",
        withBorder: true,
        withLeftBorder: true,
        displayType: "singleline",
    }
};
With_Left_Border.parameters = { controls: { include: ['alertmessage', 'icon', 'colorVariant', 'size', 'alertheading'] } };
