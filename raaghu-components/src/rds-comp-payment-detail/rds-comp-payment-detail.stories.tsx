import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompPaymentDetail from "./rds-comp-payment-detail";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Payment Detail",
    component: RdsCompPaymentDetail,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompPaymentDetail>;


const Template: ComponentStory<typeof RdsCompPaymentDetail> = (args) => (
    <RdsCompPaymentDetail {...args} />
);


export const PaymentDetail = Template.bind({});

PaymentDetail.args = {
    cvc: 123,
    cardNumber: 12345666,
    name: "Saniya Sonkaria",
    buttonSpinner: true,
    paymentModeList: [
        {
            "id": 1,
            "label": "Credit Card",
            "checked": true,
            "name": "Radio-Button"
        },
        {
            "id": 2,
            "label": "Paypal",
            "checked": false,
            "name": "Radio-Button"
        },
        {
            "id": 3,
            "label": "eTransfer",
            "checked": false,
            "name": "Radio-Button"
        }
    ]

};

