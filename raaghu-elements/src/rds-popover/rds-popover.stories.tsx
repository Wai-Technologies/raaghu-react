import React from "react";
import RdsPopover from "./rds-popover";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Popover',
    component: RdsPopover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        popoverPosition: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsPopover>;

export default meta;
type Story = StoryObj<typeof RdsPopover>;

export const PopoverWithDirection: Story = {
    args: {
        popoverPosition: "top",
        children: <p>Popover</p>,
    }
} satisfies Story;
PopoverWithDirection.parameters = { controls: { include: ['popoverPosition', 'children'] } };