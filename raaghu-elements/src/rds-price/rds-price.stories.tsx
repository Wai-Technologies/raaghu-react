import React from "react";
import RdsPrice from "./rds-price";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Price',
    component: RdsPrice,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Price** component is used to display product pricing, including original and discounted 
  prices. It accepts props like \`mrp\` (the maximum retail price), \`currentPrice\` (the final selling price), 
  and \`withDiscount\` (a boolean flag to show if a discount should be visually highlighted). It also supports 
  layout types such as \`priceOnRight\` to control price alignment. This component is ideal for e-commerce 
  interfaces and pricing sections where clear, dynamic price representation enhances user understanding and 
  conversion potential.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsPrice>;

export default meta;
type Story = StoryObj<typeof RdsPrice>;


export const Standard: Story = {
    args: {
        mrp: 100,
        currentPrice: 90,
        withDiscount: true
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['mrp', 'currentPrice', 'withDiscount'] } };

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

