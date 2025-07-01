// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
// import RdsCompCardDetailList from "./rds-comp-card-detail-list";

// export default {
//     title: "Components/Card Detail List ",
//     component: RdsCompCardDetailList,
// } as ComponentMeta<typeof RdsCompCardDetailList>;

// const Template: ComponentStory<typeof RdsCompCardDetailList> = (args) => (
//     <RdsCompCardDetailList {...args} />
// );

// export const DetailList = Template.bind({});

// DetailList.args = {
//     isSelectable: true,
//     isEditable: false,
//     cardDatas: [
//         {
//             iconHeight: "30px",
//             iconWidth: "30px",
//             icon: "editions",
//             iconFill: false,
//             iconstroke: true,
//             iconColorVarient: "dark",
//             cardID: "1011",
//             cardName: "MasterCard",
//             cardExpiry: "11/2027",
//             cardNumber: 3596,
//             isDefault: false,
//         },
//         {
//             iconHeight: "30px",
//             iconWidth: "30px",
//             icon: "editions",
//             iconFill: false,
//             iconstroke: true,
//             iconColorVarient: "dark",
//             cardID: "1011",
//             cardName: "MasterCard",
//             cardExpiry: "11/2027",
//             cardNumber: 3596,
//             isDefault: false,
//         },
//         {
//             iconHeight: "30px",
//             iconWidth: "30px",
//             icon: "editions",
//             iconFill: false,
//             iconstroke: true,
//             iconColorVarient: "dark",
//             cardID: "1011",
//             cardName: "MasterCard",
//             cardExpiry: "11/2027",
//             cardNumber: 3596,
//             isDefault: false,
//         },
//     ],
// };

import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompBankCardDetailList from "./rds-comp-bank-card-detail-list";


const meta: Meta = { 
    title: "Components/Bank Card Detail List",
    component: RdsCompBankCardDetailList,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Bank Card Detail List** component is a customizable UI element designed to display and manage a list of bank card details within your application. It supports features such as `isSelectable` to enable card selection, `isEditable` to allow editing of card details, and a `cardDatas` array to define the list of cards. Each card in the list can include properties like `icon`, `iconHeight`, `iconWidth`, `iconFill`, `iconStroke`, `iconColorVariant`, `cardID`, `cardName`, `cardExpiry`, `cardNumber`, and `isDefault`. This component is ideal for payment management systems, user dashboards, or any interface requiring structured and visually appealing card detail displays. Fully customizable, the Bank Card Detail List component ensures a seamless user experience while maintaining consistency with your design system.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBankCardDetailList>;

export default meta;
type Story = StoryObj<typeof RdsCompBankCardDetailList>;

export const Default: Story = {
    args: {

        isSelectable: true,
            isEditable: false,
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