import React from "react";
import Tooltip from "./rds-tooltip";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        place: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const tooltip: Story = {
    args: {
        text: "This is tooltip",
        place: "right",
        children: <button className="btn btn-primary" >Button</button>
    }
} satisfies Story;
tooltip.parameters = { controls: { include: ['text', 'place', 'children'] } };

