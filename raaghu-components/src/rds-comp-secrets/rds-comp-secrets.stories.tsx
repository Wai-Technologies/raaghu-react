import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompSecrets from "./rds-comp-secrets";

export default {
    title: "Components/Secrets",
    component: RdsCompSecrets,

} as ComponentMeta<typeof RdsCompSecrets>;

const Template: ComponentStory<typeof RdsCompSecrets> = (args) =>
    <RdsCompSecrets {...args} />;

export const Secrets = Template.bind({});

Secrets.args = {

};