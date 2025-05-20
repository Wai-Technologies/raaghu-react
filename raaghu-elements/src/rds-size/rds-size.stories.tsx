import React from "react";
import Todos from "./rds-size";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Size',
    component: Todos,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
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
Default.parameters = { controls: { include: ['sizeType', 'sizeData'] } };

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
WithDescription.parameters = { controls: { include: ['sizeType', 'sizeDataWithDescription'] } };


