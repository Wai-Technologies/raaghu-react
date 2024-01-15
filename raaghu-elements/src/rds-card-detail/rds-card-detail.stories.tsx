import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RdsCardDetail from "./rds-card-detail";

export default {
    title: "Elements/Card Detail",
    component: RdsCardDetail,
} as ComponentMeta<typeof RdsCardDetail>;

const Template: ComponentStory<typeof RdsCardDetail> = (args) => <RdsCardDetail {...args} />;


export const cardDetail = Template.bind({});
cardDetail.args = {
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
    IsEditAndDefaultFunctionalityRequired: true,
    IsSelectionRequired: true,
};