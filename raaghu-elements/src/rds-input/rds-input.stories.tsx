import RdsInput, { RdsInputProps } from "./rds-input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsInput> = {
    title: 'Elements/Input',
    component: RdsInput,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ["text", "password", "email", "number", "url", "tel", "search"],
            control: { type: "select" },
        },
        placeholder: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        readOnly: {
            control: { type: "boolean" },
        },
        value: {
            control: { type: "text" },
        },
        onChange: {
            action: 'changed',
        },
    },
} satisfies Meta<typeof RdsInput>;

export default meta;
type Story = StoryObj<typeof RdsInput>;

export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Enter text",
        disabled: false,
        readOnly: false,
        value: "",
    },
};