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
        layout : "text",
        state: "basic"
    }
} satisfies Story;
Default.parameters = { controls: { include: ["headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "iconHeight", "iconWidth", "iconFill", "borderColor", "layout", "state"] } };

export const toastWithDownload: Story = {
    args: {
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
        layout : "download",
        state: "basic",
        progressWidth: 40,
        filename: "Filename.txt"
    }
} satisfies Story;
toastWithDownload.parameters = { controls: { include: ["headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "iconHeight", "iconWidth", "iconFill", "borderColor", "layout", "state", "progressWidth", "filename"] } };

export const toastWithChat: Story = {
    args: {
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
        state: "basic",
        placeholder: "Placeholder Text"
    }
} satisfies Story;
toastWithChat.parameters = { controls: { include: ["headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "iconHeight", "iconWidth", "iconFill", "borderColor", "layout", "placeholder"] } };

export const toastWithRequest: Story = {
    args: {
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
        state: "basic"
    }
} satisfies Story;
toastWithRequest.parameters = { controls: { include: ["headerTitle", "message", "delay", "autohide", "withIcon", "showHeader", "iconName", "iconHeight", "iconWidth", "iconFill", "borderColor", "layout", "state"] } };
