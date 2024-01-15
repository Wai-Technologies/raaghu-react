import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIdentityManagement from "./rds-comp-identity-management-new";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Identity Management",
  component: RdsCompIdentityManagement,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompIdentityManagement>;


const Template: ComponentStory<typeof RdsCompIdentityManagement> = (args) => (
  <RdsCompIdentityManagement {...args} />
);


export const IdentityManagement = Template.bind({});

IdentityManagement.args = {
  identityData: {
    requiredLength: "",
    defaultAddress: "",
    nonAlpha: false,
    uppercaserequired: false,
    numbers: false,
    lowercaserequired: false,
    lockoutDuration: "",
    MaxAttmpts: "",
    uppercase: false,
    lowercase: false,
    newusers: ""

  }
}; 