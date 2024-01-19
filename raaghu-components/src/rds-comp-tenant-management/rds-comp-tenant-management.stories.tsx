
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTenantManagement from "./rds-comp-tenant-management";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Tenant Management",
  component: RdsCompTenantManagement,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompTenantManagement>;


const Template: ComponentStory<typeof RdsCompTenantManagement> = (args) =>
  <RdsCompTenantManagement {...args} />;


export const TenantManagement = Template.bind({});

TenantManagement.args = {
  settingsTenantEditionList: [
    { option: "one" },
    { option: "two" },
    { option: "three" },
  ],
  allowSelfRegistration: false,
  isNewRegisteredTenantActiveByDefault: false,
  useCaptchaOnRegistration: false

};


