import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsColorPicker from "./rds-color-picker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/ColorPicker',
    component: RdsColorPicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsColorPicker>;


export const ColorPicker: Story = {
    args: {
        value: "#e1e1e1",
        isDisabled: false,
        label: "Color-Picker"
    }
} satisfies Story;


