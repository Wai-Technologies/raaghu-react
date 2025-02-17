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
        state: {
            options: ["basic", "info", "success", "error"], control: { type: "select" },
        },
        layout: {
            options: ["text", "download", "chat", "request"], control: { type: "select" },
        },
        leadingIcon: {
            options: ["circle", "plus"], control: { type: "select" },
        },
        position: {
            options: [
                "top left",
                "top center",
                "top right",
                "middle left",
                "middle center",
                "middle right",
                "bottom left",
                "bottom center",
                "bottom right",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;

export const Default: Story = {
    args: {
        state: "basic",
        headerText: "Toast Headline",
        showSubText: true,
        subText: "This is a big sample placeholder text.",
        colorVariant: "light",
        showHeader: true,
        showLeading: true,
        leadingIcon: "circle",
        borderColor: "primary",
        layout: "text",
        position: "top left",
        progressWidth: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        showDismiss: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ["layout", "state", "headerText", "showSubText", "subText", "showHeader", "showDismiss", "leadingIcon", "showLeading"] } };
