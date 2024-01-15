import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompCookiesSection from "./rds-comp-cookies-section";

export default {
    title: "Components/Cookies Section",
    component: RdsCompCookiesSection,
    argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof RdsCompCookiesSection>;

const Template: ComponentStory<typeof RdsCompCookiesSection> = (args) => (
    <RdsCompCookiesSection {...args} />
);

export const Default = Template.bind({});

Default.args = {
    showDeclineButton: true,
};
