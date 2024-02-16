// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompCustomerReviews from "./rds-comp-customer-reviews";

// export default {
//     title: "Components/Customer Review",
//     component: RdsCompCustomerReviews,
//     argTypes: { itemList: { control: "object" } },
// } as ComponentMeta<typeof RdsCompCustomerReviews>;

// const Template: ComponentStory<typeof RdsCompCustomerReviews> = (args) => (
//     <RdsCompCustomerReviews {...args} />
// );

// export const CustomerReviews = Template.bind({});

// CustomerReviews.args = {
//     itemList: [
//         { value: 1, count: 1017 },
//         { value: 2, count: 313 },
//         { value: 3, count: 704 },
//         { value: 4, count: 1722 },
//         { value: 5, count: 4069 },
//     ],
// };
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCustomerReviews from "./rds-comp-customer-reviews";

const meta: Meta = { 
    title: "Components/Customer Reviews",
    component: RdsCompCustomerReviews,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCustomerReviews>;

export default meta;
type Story = StoryObj<typeof RdsCompCustomerReviews>;

export const Default: Story = {
    args: {
        itemList: [
                    { value: 1, count: 1017 },
                    { value: 2, count: 313 },
                    { value: 3, count: 704 },
                    { value: 4, count: 1722 },
                    { value: 5, count: 4069 },
                ],
    }
} satisfies Story;




