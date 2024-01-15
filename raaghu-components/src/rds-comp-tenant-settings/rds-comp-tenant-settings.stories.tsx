import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTenantSettings from "./rds-comp-tenant-settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Tenant Settings",
  component: RdsCompTenantSettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompTenantSettings>;


const Template: ComponentStory<typeof RdsCompTenantSettings> = (args) =>
  <RdsCompTenantSettings {...args} />;


export const TenantSettings = Template.bind({});

TenantSettings.args = {
  tenantSettingInfo: {},
  isTenantInfoValid: false,
  showEditData: true

};

