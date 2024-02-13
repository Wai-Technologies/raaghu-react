import React from "react";
import { ComponentStory, ComponentMeta, Meta, StoryObj } from "@storybook/react";
import RdsColorSwitcher from "./rds-color-switcher";

const meta: Meta = {
    title: 'Elements/Alert',
    component: RdsColorSwitcher,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsColorSwitcher>;

export default meta;
type Story = StoryObj<typeof RdsColorSwitcher>;


export const ColorSwitcher: Story = {
    args: {
        displayType: "rounded",
        header: "Color",
        defaultValue: 1,
        itemList: [
            { id: 1, color: "#FFFFFF" },
            { id: 2, color: "#FDD2FF" },
            { id: 3, color: "#BFEAFF" },
        ]
    }
} satisfies Story;


