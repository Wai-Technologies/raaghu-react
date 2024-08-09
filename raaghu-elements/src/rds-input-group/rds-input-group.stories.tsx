import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsInputGroup from "./rds-input-group";
import { input_size } from "../../libs/types/size";
import { button_colors } from "../../libs/types/colorvariant";

const buttonColorsArray = Object.values(button_colors);
const inputSizeArray = Object.values(input_size);

const meta: Meta = {
    title: 'Elements/Input Group',
    component: RdsInputGroup,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: buttonColorsArray ,
            control: { type: "select" },
        },
        size: {
            options: inputSizeArray,
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsInputGroup>;

export default meta;
type Story = StoryObj<typeof RdsInputGroup>;

export const InputGroup: Story = {
    args: {
        buttonLabel: "BUTTON",
        colorVariant: "primary",
        placeholder: "Placeholder text",
        size: "medium",
        outline: true,
        inputGroupLabel: "Field Label",
        labelPosition: "top",
        icon: ""
    }
} satisfies Story;
InputGroup.parameters = { controls: { include: ['buttonLabel', 'colorVariant', 'placeholder', 'size', 'outline', 'inputGroupLabel', 'labelPosition', 'icon'] } };
