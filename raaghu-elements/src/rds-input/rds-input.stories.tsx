import RdsInput from "./rds-input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Input',
    component: RdsInput,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        inputType: {
            options: ["email", "text", "password"],
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom", "floating", "right", "left"],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsInput>;

export default meta;
type Story = StoryObj<typeof RdsInput>;

export const Default: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        showIcon: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon'] } };

export const Tooltip: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        tooltipPlacement: "top",
        tooltipTitle: "This is tooltip",
        showIcon: true,
    }
} satisfies Story;
Tooltip.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'tooltipPlacement', 'tooltipTitle', 'showIcon'] } };

export const Disabled: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        isDisabled: true,
        showIcon: true,
    }
} satisfies Story;
Disabled.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'isDisabled', 'showIcon'] } };

export const Readonly: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "Add Placeholder",
        label: "Label",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: true,
        showIcon: true,
    }
} satisfies Story;
Readonly.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon'] } };

export const Email: Story = {
    args: {
        size: "medium",
        inputType: "email",
        placeholder: "Add Email",
        label: "Email",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: true,
        showIcon: true,
    }
} satisfies Story;
Email.parameters = { controls: { include: ['size', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required',] } };

export const Password: Story = {
    args: {
        size: "medium",
        inputType: "password",
        placeholder: "Add Password",
        label: "Password",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: true,
        showIcon: true,
    }
} satisfies Story;
Password.parameters = { controls: { include: ['size', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon'] } };