import React from "react";
import RdsCardDetail from "./rds-card-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Card Detail',
    component: RdsCardDetail,
    parameters: {
        layout: 'padded',
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
