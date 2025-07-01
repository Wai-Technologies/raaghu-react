import RdsBankCardDetail from "./rds-bank-card-detail";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Bank Card Detail',
    component: RdsBankCardDetail,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Bank Card Detail** component presents a visually structured layout for displaying saved bank or credit card information within an application. It allows configuration through the \`cardDatas\` prop, which takes an array of card objects containing attributes such as card name, number, expiry date, and branding icon. Each card entry supports customization with icon properties like size, color variant, stroke, and fill. The component offers interactivity with optional flags: \`isSelectable\` enables users to select a card (useful in checkout or payment flows), and \`isEditable\` allows users to edit card details directly. This flexible and reusable UI element is well-suited for dashboards, profile settings, or payment method management screens.`
}

        }
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

