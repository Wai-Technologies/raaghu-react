import RdsToast, { RdsToastProps } from "./rds-toast";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsToast> = {
    title: 'Elements/Toast',
    component: RdsToast,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ["success", "error", "info", "warning"],
            control: { type: "select" },
        },
        message: {
            control: { type: "text" },
        },
        autoHide: {
            control: { type: "boolean" },
        },
        delay: {
            control: { type: "number" },
        },
        show: {
            control: { type: "boolean" },
        },
        onClose: {
            action: 'closed',
        },
    },
} satisfies Meta<typeof RdsToast>;

export default meta;
type Story = StoryObj<typeof RdsToast>;

export const Default: Story = {
    args: {
        type: "success",
        message: "This is a success toast message",
        autoHide: true,
        delay: 5000,
        show: true,
    },
};