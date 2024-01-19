import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsIllustration from "./rds-illustration";

export default {
    title: "Elements/Illustration",
    component: RdsIllustration,
} as ComponentMeta<typeof RdsIllustration>;

const Template: ComponentStory<typeof RdsIllustration> = (args) => (
    <RdsIllustration {...args} />
);

export const Illustration = Template.bind({});
Illustration.args = {
    label: "Currently you don't have any data",
    subLabel: "Click on the button above to add data",
    iconHeight: '250px',
    iconWidth: '250px',
    iconPath :"/assets/lottie-files/outlined/dual-color/illustration-light.json",
    isContinueAnimate : true
};
