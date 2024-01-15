import React from "react";
import { ComponentMeta, ComponentStory} from "@storybook/react";
import RdsBankCardDetail from "./rds-bank-card-detail";

export default {
    title: "Elements/Bank Card Detail",
    component: RdsBankCardDetail,
} as ComponentMeta<typeof RdsBankCardDetail>;

const Template: ComponentStory<typeof RdsBankCardDetail> = (args) => <RdsBankCardDetail {...args} />;


export const BankCardDetail = Template.bind({});
BankCardDetail.args = {
    isSelectable: true,
    isEditable:true,
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
    ],
   
    
};