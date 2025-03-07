import RdsToast, {ToastLayout, ToastState, ToastPosition, ToastLeadingIcon} from "./rds-toast";
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
                "topLeft",
                "topCenter",
                "topRight",
                "middleLeft",
                "middleCenter",
                "middleRight",
                "bottomLeft",
                "bottomCenter",
                "bottomRight",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;

export const Default: Story = {
    args: {
        state: ToastState.Basic,
        headerText: "Toast Headline",
        showSubText: true,
        subText: "This is a big sample placeholder text.",
        colorVariant: "light",
        showHeader: true,
        showLeading: true,
        leadingIcon: ToastLeadingIcon.Circle,
        borderColor: "primary",
        layout: ToastLayout.Text,
        position: ToastPosition.TopLeft,
        progressWidth: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        showDismiss: true,
        chatTime: "12.29 PM"
    }
} satisfies Story;
Default.parameters = { controls: { include: ["layout", "state", "headerText", "showSubText", "subText", "showHeader", "showDismiss", "leadingIcon", "showLeading"] } };
