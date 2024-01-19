
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompDeliveryMethod from "./rds-comp-delivery-method";

export default {
    title: "Components/Delivery Method ",
    component: RdsCompDeliveryMethod,

} as ComponentMeta<typeof RdsCompDeliveryMethod>;


const Template: ComponentStory<typeof RdsCompDeliveryMethod> = (args) => (
    <RdsCompDeliveryMethod {...args} />
);


export const DeliveryMethod = Template.bind({});

DeliveryMethod.args = {
    sizeDataWithDescription: [
        { id: 1, type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
        { id: 2, type: "Express", days: "2-5 buisness days", cost: "$16.00" },
        { id: 3, type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
    sizeType: "withDescription",
};

