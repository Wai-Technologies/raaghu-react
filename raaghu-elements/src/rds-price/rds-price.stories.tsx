import React from "react";
import RdsPrice from "./rds-price";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Price',
    component: RdsPrice,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsPrice>;

export default meta;
type Story = StoryObj<typeof RdsPrice>;


export const Default: Story = {
    args: {
        mrp: 100,
        currentPrice: 90,
        withDiscount: true
    }
} satisfies Story;
Default.parameters = { controls: { include: ['mrp', 'currentPrice', 'withDiscount'] } };

export const Price_on_Right: Story = {
    args: {
        mrp: 100,
        currentPrice: 90,
        type: "priceOnRight",
        withDiscount: true
    }
} satisfies Story;
Price_on_Right.parameters = { controls: { include: ['mrp', 'currentPrice', 'type', 'withDiscount'] } };

export const Without_Discount: Story = {
    args: {
        mrp: 100,
        currentPrice: 90,
    }
} satisfies Story;
Without_Discount.parameters = { controls: { include: ['mrp', 'currentPrice'] } };

