import React from "react";
import RdsToast from "./rds-toast";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Toast',
    component: RdsToast,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
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
        borderColor: {
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
        iconColorvariant: {
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
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;


export const Default: Story = {
    args: {
        headerTitle: "Toast",
        message: "This is a sample toast",
        colorVariant: "light",
        showHeader: true,
        withIcon: true,
        iconName: "folder",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        iconFill: false,
        borderColor: "primary"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['headerTitle', 'message', 'colorVariant', 'showHeader', 'withIcon', 'iconName', 'iconColorvariant', 'iconHeight', 'iconWidth', 'iconFill', 'borderColor'] } };

export const toastWithAutohide: Story = {
    args: {
        headerTitle: "Toast",
        message: "This is a sample toast",
        delay: 5000,
        autohide: true,
        withIcon: true,
        showHeader: true,
        iconName: "folder",
        colorVariant: "light",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        iconFill: false
    }
} satisfies Story;
toastWithAutohide.parameters = { controls: { include: ['headerTitle', 'message', 'delay', 'autohide', 'withIcon', 'showHeader', 'iconName', 'colorVariant', 'iconColorvariant', 'iconHeight', 'iconWidth', 'iconFill'] } };

export const toastWithoutHeader: Story = {
    args: {
        headerTitle: "Toast",
        autohide: false,
        withIcon: true,
        delay: 5000,
        showHeader: false,
        message: "This is a sample toast",
        colorVariant: "light",
        iconName: "folder",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        iconFill: false
    }
} satisfies Story;
toastWithoutHeader.parameters = { controls: { include: ['headerTitle', 'autohide', 'withIcon', 'delay', 'showHeader', 'message', 'colorVariant', 'iconName', 'iconColorvariant', 'iconHeight', 'iconWidth', 'iconFill'] } };

