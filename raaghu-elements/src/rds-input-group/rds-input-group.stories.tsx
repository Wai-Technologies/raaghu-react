import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsInputGroup from "./rds-input-group";
import {input_size} from "../../libs/types/size";
import { button_colors } from "../../libs/types/colorvariant";

export default {
    title: "Elements/Input Group",
    component: RdsInputGroup,
    argTypes: {
        
        colorVariant: {
            options: button_colors,
            control: { type: "select" },
        },
        size: {
            options: input_size,
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsInputGroup>;

const Template: ComponentStory<typeof RdsInputGroup> = (args) => (
    <RdsInputGroup {...args} />
);

export const InputGroup = Template.bind({});
InputGroup.args = {
    buttonLabel: "BUTTON",
    colorVariant: "primary",
    placeholder: "Placeholder text",
    size: "medium",
    outline: true,
    inputGroupLabel: "Field Label",
    labelPosition:"top",
    icon : ""
};
