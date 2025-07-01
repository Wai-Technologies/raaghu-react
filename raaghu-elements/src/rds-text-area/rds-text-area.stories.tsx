import React from "react";
import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react-vite";

//whatever code is commented below is required for the future reference

const meta: Meta = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        layout: 'padded',
        docs:{
          description: {
  component: `The **Text Area** component provides a flexible, multi-line input field designed for capturing longer text entries such as comments, descriptions, or notes. It supports multiple **interaction states** including \`Default\`, \`Active\`, \`Selected\`, \`Disabled\`, and \`Error\`, allowing clear communication of input status and validation feedback. Various **visual styles** are available, including \`Default\`, \`Pill\`, and \`Bottom Outline\`, to match different design contexts. Labels can be positioned **above** or **below** the input field, and mandatory fields can be indicated clearly using the \`isMandatory\` flag. Additional features include configurable number of visible rows, placeholder text, and optional tooltips with customizable placement and content. This component is ideal for forms, feedback sections, and anywhere multi-line text input is needed, ensuring consistent look and feel aligned with your design system.`
}

    ,
            source:{
                transform: (code: string) => {
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={TextareaState.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state:TextareaState ${p1.replace(/\s+/g, "")}`);
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={TextareaStyle.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style:TextareaStyle ${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
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
        placeholder: "Enter Description",
        // labelPosition: "top",
        isMandatory: false,
        label: "Label",

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
