
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompContactInformation from "./rds-comp-contact-information";

export default {
    title: "Components/Contact Information",
    component: RdsCompContactInformation,

} as ComponentMeta<typeof RdsCompContactInformation>;


const Template: ComponentStory<typeof RdsCompContactInformation> = (args) =>
    <RdsCompContactInformation {...args} />;


export const Default = Template.bind({});

Default.args = {
};

