import React from "react";
import RdsCardDetail from "./rds-card-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Card Detail',
    component: RdsCardDetail,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Card Detail** component is designed to display detailed information about payment cards in a clean and organized manner. It supports rendering multiple card entries through the \`cardDatas\` prop, each containing key details such as card icon, card name, card number (partially masked), expiry date, and unique card ID. 

The component provides optional features for enhanced interactivity, including edit functionality and the ability to mark a card as the default payment method, controlled via the \`IsEditAndDefaultFunctionalityRequired\` flag. Additionally, it supports selection capabilities for scenarios where users may need to choose a card from a list, enabled through the \`IsSelectionRequired\` prop.

With customizable icon sizes and color variants, the component ensures visual consistency and adaptability across different UI themes. It is ideal for dashboards, payment management interfaces, and user profile sections where users need to view, manage, or select payment cards efficiently and intuitively.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCardDetail>;

export default meta;
type Story = StoryObj<typeof RdsCardDetail>;

export const cardDetailManager: Story = {
    args: {
        cardDatas: [
            {
                iconHeight: "30px",
                iconWidth: "30px",
                icon: "editions",
                iconFill: false,
                iconstroke: true,
                iconColorVarient: "dark",
                cardID: "1011",
                cardName: "Mastercard",
                cardExpiry: "11/2027",
                cardNumber: 3596,
                isDefault: false,
            },
        ],
        IsEditAndDefaultFunctionalityRequired: true,
        IsSelectionRequired: true,
    }
} satisfies Story;
