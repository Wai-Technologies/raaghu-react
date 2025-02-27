import React from "react";
import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react";

//whatever code is commented below is required for the future reference

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
        state: {
            options: ['Default', 'Active', 'Selected', 'Disabled', 'Error'],
            control: { type: 'select' },
        },
        style: {
            options: ['Default', 'Pill', 'Bottom Outline'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof RdsTextArea>;

export default meta;
type Story = StoryObj<typeof RdsTextArea>;


export const Default: Story = {
    args: {
        state: TextareaState.Default,
        style: TextareaStyle.Default,
        showTitle: true,
        rows: 5,
        placeholder: "This is text area...",
        // labelPosition: "top",
        isMandatory: false,
        label: "Textarea label",

    }
} satisfies Story;
Default.parameters = { controls: { include: ['state', 'style', 'showTitle', 'isMandatory', 'label'] } };

// export const Disabled: Story = {
//     args: {
//         label: "Example label",
//         placeholder: "This is text area...",
//         isDisabled: true,
//         labelPosition: "top",
//     }
// } satisfies Story;

// Disabled.parameters = { controls: { include: ['label', 'placeholder', 'isDisabled'] } };


// export const ReadOnly: Story = {
//     args: {
//         readonly: true,
//         label: "Example label",
//         placeholder: "This is text area...",
//     }
// } satisfies Story;

// ReadOnly.parameters = { controls: { include: ['label', 'placeholder', 'readonly'] } };

// export const FloatingLabel: Story = {
//     args: {
//         label: "Example label",
//         placeholder: "This is text area...",
//         isFloatingInputLabel: true
//     }
// } satisfies Story;

// FloatingLabel.parameters = { controls: { include: ['label', 'placeholder', 'isFloatingInputLabel'] } };


// export const Tooltip: Story = {
//     args: {
//         label: "Example label",
//         placeholder: "This is text area...",
//         tooltip: true,
//         tooltipPlacement: "right",
//         tooltipTitle: "This is tooltip",
//     }
// } satisfies Story;

// Tooltip.parameters = { controls: { include: ['label', 'placeholder', 'tooltipPlacement', 'tooltipTitle'] } };
