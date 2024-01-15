
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompContactUs from "./rds-comp-contact-us";

export default {
    title: "Components/Contact Us",
    component: RdsCompContactUs,

} as ComponentMeta<typeof RdsCompContactUs>;


const Template: ComponentStory<typeof RdsCompContactUs> = (args) =>
    <RdsCompContactUs {...args} />;


export const Default = Template.bind({});

Default.args = {
    sizeDataWithDescription: [
        { type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
        { type: "Express", days: "2-5 buisness days", cost: "$16.00" },
        { type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
    sizeType: "withDescription",
};

