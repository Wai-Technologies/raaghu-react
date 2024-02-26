import React from "react";
import RdsLabel from "./rds-label";
import { Meta, StoryObj } from "@storybook/react";



const meta: Meta = {
    title: 'Elements/Label',
    component: RdsLabel,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        fontWeight: {
            options: [
                "black",
                "bold",
                "bolder",
                "extrabold",
                "light",
                "lighter",
                "medium",
                "normal",
                "semibold",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsLabel>;

export default meta;
type Story = StoryObj<typeof RdsLabel>;

export const Label: Story = {
    args: {
        label: "Label",
        fontWeight: "bold",
        italic: false,
        required: false
    }
} satisfies Story;
Label.parameters = { controls: { include: ['label', 'fontWeight', 'italic', 'required'] } };

