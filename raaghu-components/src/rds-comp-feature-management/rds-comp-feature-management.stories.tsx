import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFeatureManagement from "./rds-comp-feature-management";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Feature Management",
  component: RdsCompFeatureManagement,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompFeatureManagement>;

const Template: ComponentStory<typeof RdsCompFeatureManagement> = (args) => (
  <RdsCompFeatureManagement {...args} />
);
export const Default = Template.bind({});
Default.story = {
  label: "default",
  featureManagementData: {
    id: 0,
    name: "Identity",
    displayName: "Identity",
    features: [
      { id: 0, name: "Identity.TwoFactor", displayName: "Two factor behaviour", value: "Optional" },
      { id: 1, name: "Identity.TwoFactor", displayName: "Two factor behaviour", value: "Optional" },
      { id: 2, name: "Identity.MaxUserCount", displayName: "Maximum user count", value: "0" },
      { id: 3, name: "Account.EnableLdapLogin", displayName: "LDAP Login", value: "true" },
      { id: 4, name: "Identity.EnableOAuthLogin", displayName: "OAuth Login", value: "true" }
    ]
  }
};
