import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsTextArea from "./rds-text-area";

export default {
    title: "Elements/TextArea",
    component: RdsTextArea,
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
} as ComponentMeta<typeof RdsTextArea>;

const Template: ComponentStory<typeof RdsTextArea> = (args) => (
    <RdsTextArea {...args} />
);

export const Default = Template.bind({});
Default.parameters = { controls: { include: ['label', 'placeholder', 'isRequired', 'labelPosition'] } };
Default.args = {
    rows: 3,
    label: "Example label",
    placeholder: "This is text area...",
    labelPosition: "top",
    isRequired: false,
};

export const Disabled = Template.bind({});
Disabled.parameters = { controls: { include: ['label', 'placeholder', 'isDisabled'] } };
Disabled.args = {
    label: "Example label",
    placeholder: "This is text area...",
    isDisabled: true,
    labelPosition: "top",
};

export const ReadOnly = Template.bind({});
ReadOnly.parameters = { controls: { include: ['label', 'placeholder', 'readonly'] } };
ReadOnly.args = {
    readonly: true,
    label: "Example label",
    placeholder: "This is text area...",
};

export const FloatingLabel = Template.bind({});
FloatingLabel.parameters = { controls: { include: ['label', 'placeholder', 'isFloatingInputLabel'] } };
FloatingLabel.args = {
    label: "Example label",
    placeholder: "This is text area...",
    isFloatingInputLabel: true
};

export const Tooltip = Template.bind({});
Tooltip.parameters = { controls: { include: ['label', 'placeholder', 'tooltipPlacement', 'tooltipTitle'] } };
Tooltip.args = {
    label: "Example label",
    placeholder: "This is text area...",
    tooltip: true,
    tooltipPlacement: "right",
    tooltipTitle: "This is tooltip",
};