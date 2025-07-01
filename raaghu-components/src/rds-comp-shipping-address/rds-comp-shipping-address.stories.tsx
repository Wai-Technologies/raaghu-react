import type { Meta, StoryObj } from '@storybook/react';
import RdsCompShippingAddress from "./rds-comp-shipping-address";


const meta: Meta = { 
    title: "Components/Shipping Address",
    component: RdsCompShippingAddress,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Shipping Address** component is a customizable UI element designed to manage and display shipping address details within your application. It provides a structured interface for users to select or input their shipping address, including country selection from a predefined list. This component is ideal for e-commerce platforms, order management systems, or any application requiring a user-friendly and efficient shipping address management interface. Fully customizable, the Shipping Address component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompShippingAddress>;

export default meta;
type Story = StoryObj<typeof RdsCompShippingAddress>;

export const Standard: Story = {
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
// Standard.parameters = { controls: { include: ['countryList'] } };




