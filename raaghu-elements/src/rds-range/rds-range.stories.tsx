import React from "react";
import RdsRange from "./rds-range";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Range',
    component: RdsRange,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsRange>;

export default meta;
type Story = StoryObj<typeof RdsRange>;


export const Default: Story = {
    args: {
        max: 200,
        min: 10,
        colorVariant: "danger",
        rangeType: "default"
    }
} satisfies Story;




export const RangeType_1: Story = {
    args: {
        max: 200,
        min: 10,
        colorVariant: "danger",
        rangeType: "type1"
    }
} satisfies Story;


export const RangeType_2: Story = {
    args: {
        max: 200,
        min: 10,
        colorVariant: "danger",
        rangeType: "type2"
    }
} satisfies Story;




