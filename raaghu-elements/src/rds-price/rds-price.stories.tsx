import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPrice from "./rds-price";

export default {
    title: "Elements/Price",
    component: RdsPrice,
    argTypes: {
    
    },
} as ComponentMeta<typeof RdsPrice>;

const Template: ComponentStory<typeof RdsPrice> = (args) => (
    <RdsPrice {...args} />
);

export const Default = Template.bind({});
Default.args = {
    mrp: 100,
    currentPrice: 90,
    withDiscount:true
};

export const Price_on_Right = Template.bind({});
Price_on_Right.args = {
    mrp: 100,
    currentPrice: 90,
    type: "priceOnRight",
    withDiscount:true
};

export const Without_Discount = Template.bind({});
Without_Discount.args = {
    mrp: 100,
    currentPrice: 90,
};
