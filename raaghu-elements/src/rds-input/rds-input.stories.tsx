import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsInput from "./rds-input";
import { input_size } from "../../libs/types";
import { tooltip_position } from "../../libs/types/placement";

export default {
    title: "Elements/Input",
    component: RdsInput,
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
            options: ["top", "bottom", "floating","right","left"],
            control: { type: "select" },
        },
        tooltipPlacement: {
            options: tooltip_position,
            control: { type: "radio" },
        },
    },
} as ComponentMeta<typeof RdsInput>;

const Template: ComponentStory<typeof RdsInput> = (args) => (
    <RdsInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    size: "medium",
    inputType: "text",
    placeholder: "Add Placeholder",
    label:"Label",
    labelPosition:"top",
    id:"",
    value: "",
    required: true,
    showIcon: true,
};

export const Tooltip = Template.bind({});
Tooltip.decorators= [
    (Story) => (
        <div style={{ padding:"70px 200px" ,
        }}>
            <Story/>
        </div>
    ),
],
Tooltip.args = {
    size: "medium",
    inputType: "text",
    placeholder: "Add Placeholder",
    label:"Label",
    labelPosition:"top",
    id:"",
    value: "",
    required: true,
    tooltipPlacement:"top",
    tooltipTitle:"This is tooltip",
};


export const Disabled = Template.bind({});
Disabled.args = {
    size: "medium",
    inputType: "text",
    placeholder: "Add Placeholder",
    label:"Label",
    labelPosition:"top",
    id:"",
    value: "",
    required: true,
    isDisabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
    size: "medium",
    inputType: "text",
    placeholder: "Add Placeholder",
    label:"Label",
    labelPosition:"top",
    id:"",
    value: "",
    required: true,
    readonly: true,
};