import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompCustomerReviews from "./rds-comp-customer-reviews";

export default {
    title: "Components/Customer Review",
    component: RdsCompCustomerReviews,
    argTypes: { itemList: { control: "object" } },
} as ComponentMeta<typeof RdsCompCustomerReviews>;

const Template: ComponentStory<typeof RdsCompCustomerReviews> = (args) => (
    <RdsCompCustomerReviews {...args} />
);

export const CustomerReviews = Template.bind({});

CustomerReviews.args = {
    itemList: [
        { value: 1, count: 1017 },
        { value: 2, count: 313 },
        { value: 3, count: 704 },
        { value: 4, count: 1722 },
        { value: 5, count: 4069 },
    ],
};
