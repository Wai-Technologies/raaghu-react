import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIdentityLdapManagement from './rds-comp-identity-ldap-management';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";


export default {
  title: "Components/Identity Ldap Management",
  component: RdsCompIdentityLdapManagement,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompIdentityLdapManagement>;

const Template: ComponentStory<typeof RdsCompIdentityLdapManagement> = (args) => (
  <RdsCompIdentityLdapManagement {...args} />
);

export const Default = Template.bind({});

Default.args = {

};
