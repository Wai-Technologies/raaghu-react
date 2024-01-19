import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompShippingAddress from "./rds-comp-shipping-address";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Shipping Address",
    component: RdsCompShippingAddress,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompShippingAddress>;


const Template: ComponentStory<typeof RdsCompShippingAddress> = (args) => (
    <RdsCompShippingAddress {...args} />
);


export const ShippingAddress = Template.bind({});

ShippingAddress.args = {
    countryList: [
        {
            "value": "1",
            "option": "India",
            "isSelected": false
        },
        {
            "value": "2",
            "option": "China",
            "isSelected": false
        },
        {
            "value": "3",
            "option": "Canada",
            "isSelected": false
        },
        {
            "value": "4",
            "option": "Japan",
            "isSelected": false
        },
        {
            "value": "5",
            "option": "Australia",
            "isSelected": false
        },
        {
            "value": "6",
            "option": "USA",
            "isSelected": false
        },
        {
            "value": "7",
            "option": "UK",
            "isSelected": false
        }
    ]
};