import RdsBankCardDetail from "./rds-bank-card-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Bank Card Detail',
    component: RdsBankCardDetail,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsBankCardDetail>;

export default meta;
type Story = StoryObj<typeof RdsBankCardDetail>;

export const BankCardDetailManager: Story = {
    args: {
        isSelectable: true,
        isEditable: true,
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
    }
} satisfies Story;
BankCardDetailManager.parameters = { controls: { include: ['isSelectable', 'isEditable', 'cardDatas'] } };

