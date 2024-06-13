import type { Meta, StoryObj } from '@storybook/react';
import RdsCompShippingAddress from "./rds-comp-shipping-address";


const meta: Meta = { 
    title: "Components/Shipping Address",
    component: RdsCompShippingAddress,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompShippingAddress>;

export default meta;
type Story = StoryObj<typeof RdsCompShippingAddress>;

export const Default: Story = {
    args: {
        countryList: [
                    {
                        "value": "1",
                        "option": "India",
                        // "isSelected": false
                    },
                    {
                        "value": "2",
                        "option": "China",
                        // "isSelected": false
                    },
                    {
                        "value": "3",
                        "option": "Canada",
                        // "isSelected": false
                    },
                    {
                        "value": "4",
                        "option": "Japan",
                        // "isSelected": false
                    },
                    {
                        "value": "5",
                        "option": "Australia",
                        // "isSelected": false
                    },
                    {
                        "value": "6",
                        "option": "USA",
                        // "isSelected": false
                    },
                    {
                        "value": "7",
                        "option": "UK",
                        // "isSelected": false
                    }
        ]
    }
} satisfies Story;
// Default.parameters = { controls: { include: ['countryList'] } };




