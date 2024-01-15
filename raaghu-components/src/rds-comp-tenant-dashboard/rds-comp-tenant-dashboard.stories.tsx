import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTenantDashboard from "./rds-comp-tenant-dashboard";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Tenant Dashboard",
  component: RdsCompTenantDashboard,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompTenantDashboard>;

const Template: ComponentStory<typeof RdsCompTenantDashboard> = () => (
  <RdsCompTenantDashboard />
);

export const TenantDashboard = Template.bind({});

TenantDashboard.args = {};
