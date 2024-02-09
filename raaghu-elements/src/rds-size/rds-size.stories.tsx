import React from "react";
import Todos from "./rds-size";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Size',
    component: Todos,
    parameters: {
        layout: 'centered',
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
        sizeType: {
            options: ["withoutDescription", "withDescription"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof Todos>;

export default meta;
type Story = StoryObj<typeof Todos>;


export const Default: Story = {
    args: {
        sizeType: "withoutDescription",
        sizeData: [
            { value: "XXS", inStock: false },
            { value: "XS", inStock: true },
            { value: "S", inStock: true },
            { value: "M", inStock: true },
            { value: "L", inStock: true },
            { value: "XL", inStock: true },
            { value: "XXL", inStock: true },

        ],

    },
} satisfies Story;

export const WithDescription: Story = {
    args: {
        sizeType: "withDescription",
        sizeDataWithDescription: [
            { value: "13", description: "impoity input " },
            { value: "15", description: "impoity input and ngonint" },
            { value: "14", description: " with the passanger" },
        ],
    },
} satisfies Story;


