import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIdentityOauthManagement from './rds-comp-identity-oauth-management';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";



export default {
  title: "Components/Identity Oauth Management",
  component: RdsCompIdentityOauthManagement,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompIdentityOauthManagement>;

const Template: ComponentStory<typeof RdsCompIdentityOauthManagement> = (args) => (
  <RdsCompIdentityOauthManagement {...args} />
);

export const Default = Template.bind({});

Default.args = {

};
