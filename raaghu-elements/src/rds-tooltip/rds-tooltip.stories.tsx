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
        style: {
            options: ["No Arrow", "Middle Top Arrow", "Middle Bottom Arrow", "Left Arrow", "Left Top Arrow", "Left Bottom Arrow", "Right Arrow", "Right Top Arrow", "Right Bottom Arrow"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        label: "This is tooltip",
        style: "Right Arrow",
        children: <button className="btn btn-primary">Button</button>
    }
} satisfies Story;
Default.parameters = { controls: { include: ['label', 'style'] } };
