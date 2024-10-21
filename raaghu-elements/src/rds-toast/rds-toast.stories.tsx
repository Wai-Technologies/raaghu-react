import RdsToast from "./rds-toast";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: "Elements/Toast",
    component: RdsToast,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
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
        state: {
            options: ["basic", "info", "success", "error"], control: {type: "select"},}
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;


export const Default: Story = {
    args: {
        state: "basic",
        headerTitle: "Toast Headline",
        message: "This is a big sample placeholder text.",
        delay: 5000,
        autohide: false,    
        colorVariant: "light",
        showHeader: true,
        withIcon: true,
        iconName: "circle",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        borderColor: "primary",
        layout : "text"

    }
} satisfies Story;
Default.parameters = { controls: { include: ["state", "headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName"] } };

export const toastWithDownload: Story = {
    args: {
        state: "basic",
        headerTitle: "Toast Headline",
        message: "This is a help text",
        delay: 5000,
        autohide: false,    
        colorVariant: "light",
        showHeader: true,
        withIcon: true,
        iconName: "circle",
        iconColorvariant: "primary",
        iconFill: false,
        borderColor: "primary",
        layout : "download",
        progressWidth: 40,
        filename: "Filename.txt"
    }
} satisfies Story;
toastWithDownload.parameters = { controls: { include: ["state","headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "progressWidth", "filename"] } };

export const toastWithChat: Story = {
    args: {
        state: "basic",
        headerTitle: "Toast Headline",
        message: "This is a help text",
        delay: 5000,
        autohide: false,    
        colorVariant: "light",
        showHeader: true,
        withIcon: true,
        iconName: "circle",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        iconFill: false,
        borderColor: "primary",
        layout : "chat",
        placeholder: "Placeholder Text"
    }
} satisfies Story;
toastWithChat.parameters = { controls: { include: ["state","headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "placeholder"] } };

export const toastWithRequest: Story = {
    args: {
                state: "basic",
        headerTitle: "Toast Headline",
        message: "This is a big sample placeholder text.",
        delay: 5000,
        autohide: false,    
        colorVariant: "light",
        showHeader: true,
        withIcon: true,
        iconName: "circle",
        iconColorvariant: "primary",
        iconHeight: "18px",
        iconWidth: "18px",
        iconFill: false,
        borderColor: "primary",
        layout : "request",

    }
} satisfies Story;
toastWithRequest.parameters = { controls: { include: ["state", "headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName"] } };
