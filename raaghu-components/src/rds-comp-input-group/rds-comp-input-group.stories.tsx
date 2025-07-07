import React from "react";
import { StoryObj, Meta } from "@storybook/react-vite";
import RdsInputGroup, { InputGroupSize } from "./rds-comp-input-group";
import { button_colors } from "../../../raaghu-elements/libs/types/colorvariant";
import { input_size } from "../../../raaghu-elements/libs/types/size";

const buttonColorsArray = Object.values(button_colors);
const inputSizeArray = Object.values(input_size);

const meta: Meta = {
    title: 'Components/Input Group',
    component: RdsInputGroup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
  component: `The **Input Group** component combines a text input field with an optional action button, designed for forms and interactive UI elements. It supports configurable \`size\` options ("small", "medium", "large") for consistent sizing across the design system. The \`colorVariant\` prop applies different color themes to the button, aligning with the system’s color palette. The input field can display a placeholder and an optional label, whose position can be set to "top" or "bottom" for flexible layout. The button can be styled with an outline variant for subtle emphasis. This component is ideal for scenarios requiring user input paired with a clear call-to-action button, such as search bars, form submissions, or filters, ensuring accessibility and visual consistency across your application.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(small|medium|large)"/g, '{InputGroupSize.$1}');
                    return code;
                },
            },
        },
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

export const Standard: Story = {
    args: {
        buttonLabel: "BUTTON",
        colorVariant: "primary",
        placeholder: "Placeholder text",
        size: InputGroupSize.Medium,
        outline: true,
        inputGroupLabel: "Field Label",
        labelPosition: "top",
        icon: ""
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['buttonLabel', 'colorVariant', 'placeholder', 'size', 'outline', 'inputGroupLabel', 'labelPosition', 'icon'] } };
