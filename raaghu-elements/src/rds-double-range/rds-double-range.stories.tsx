import React from "react";
import RdsDoubleRange from "./rds-double-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/DoubleRange',
    component: RdsDoubleRange,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light",],
            control: { type: "select" },
        },
        doubleRangeType: {
            options: ["default", "type_1", "type_2"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsDoubleRange>;

export default meta;
type Story = StoryObj<typeof RdsDoubleRange>;



export const DoubleRange: Story = {
    args: {
        max: 100,
        min: 0,
        doubleRangeType: "default"
    }
} satisfies Story;

