// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
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

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBankCardDetailList from "./rds-comp-bank-card-detail-list";


const meta: Meta = { 
    title: "Components/Bank Card Detail List",
    component: RdsCompBankCardDetailList,
    parameters: {
        layout: 'padded',
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