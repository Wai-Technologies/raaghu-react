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
import RdsCompCardDetailList from "./rds-comp-card-detail-list";


const meta: Meta = { 
    title: "Components/Detail List",
    component: RdsCompCardDetailList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCardDetailList>;

export default meta;
type Story = StoryObj<typeof RdsCompCardDetailList>;

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
                    cardName: "MasterCard",
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
                    cardName: "MasterCard",
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
                    cardName: "MasterCard",
                    cardExpiry: "11/2027",
                    cardNumber: 3596,
                    isDefault: false,
                },
            ],
        
    }
} satisfies Story;