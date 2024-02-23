import React from "react";
import RdsTextArea from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        labelPosition: {
            options: ["top", "bottom"],
            control: "radio",
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
            if: { arg: 'tooltip' }
        },
    },
} satisfies Meta<typeof RdsTextArea>;

export default meta;
type Story = StoryObj<typeof RdsTextArea>;


export const Default: Story = {
    args: {
        rows: 3,
        label: "Example label",
        placeholder: "This is text area...",
        labelPosition: "top",
        isRequired: false,
    }
} satisfies Story;

Default.parameters = { controls: { include: ['label', 'placeholder', 'isRequired', 'labelPosition'] } };

export const Disabled: Story = {
    args: {
        label: "Example label",
        placeholder: "This is text area...",
        isDisabled: true,
        labelPosition: "top",
    }
} satisfies Story;

Disabled.parameters = { controls: { include: ['label', 'placeholder', 'isDisabled'] } };


export const ReadOnly: Story = {
    args: {
        readonly: true,
        label: "Example label",
        placeholder: "This is text area...",
    }
} satisfies Story;

ReadOnly.parameters = { controls: { include: ['label', 'placeholder', 'readonly'] } };

export const FloatingLabel: Story = {
    args: {
        label: "Example label",
        placeholder: "This is text area...",
        isFloatingInputLabel: true
    }
} satisfies Story;

FloatingLabel.parameters = { controls: { include: ['label', 'placeholder', 'isFloatingInputLabel'] } };


export const Tooltip: Story = {
    args: {
        label: "Example label",
        placeholder: "This is text area...",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
    }
} satisfies Story;

Tooltip.parameters = { controls: { include: ['label', 'placeholder', 'tooltipPlacement', 'tooltipTitle'] } };
