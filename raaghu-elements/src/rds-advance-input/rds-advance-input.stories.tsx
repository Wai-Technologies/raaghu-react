import RdsAdvanceInput from "./rds-advance-input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Advance Input',
    component: RdsAdvanceInput,
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
            options: ["email", "text", "password", "otp"],
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
        isDisabled: {
            options: [true, false],
            control: { type: 'boolean' }, 
        },
        shape: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof RdsAdvanceInput>;

export default meta;
type Story = StoryObj<typeof RdsAdvanceInput>;

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
        singleDigit: false,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'singleDigit', 'isDisabled', 'shape'] } };

export const phoneNumber: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "+91 1234567890",
        label: "Phone Number",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
phoneNumber.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'isDisabled', 'shape'] } };

export const Label: Story = {
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
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
Label.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'isDisabled', 'showIcon', 'shape'] } };

export const Number: Story = {
    args: {
        size: "medium",
        inputType: "text",
        placeholder: "50",
        label: "Number",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
Number.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'isDisabled', 'shape'] } };

export const Email: Story = {
    args: {
        size: "medium",
        inputType: "email",
        placeholder: "Enter Email",
        label: "Email",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
Email.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'isDisabled', 'shape'] } };

export const Password: Story = {
    args: {
        size: "medium",
        inputType: "password",
        placeholder: "Enter Password",
        label: "Password",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
Password.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'isDisabled', 'shape'] } };

export const CardNumber: Story = {
    args: {
        size: "medium",
        inputType: "cardNumber",
        placeholder: "0000 0000 0000",
        label: "Card Number",
        labelPosition: "top",
        id: "",
        value: "",
        required: true,
        readonly: false,
        showIcon: true,
        isDisabled: false,
        shape: false,
    }
} satisfies Story;
phoneNumber.parameters = { controls: { include: ['size', 'inputType', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'isDisabled', 'shape'] } };