import React from "react";
import RdsInput from "./rds-input";
import { input_size, colors} from "../../libs/types";
import { tooltip_position } from "../../libs/types/placement";
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
            options: input_size,
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
            options: tooltip_position,
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
    }
} satisfies Story;

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
    }
} satisfies Story;

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
    }
} satisfies Story;

