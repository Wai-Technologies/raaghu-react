import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompNotificationSettings from "./rds-comp-notification-settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Notification Setting",
  component: RdsCompNotificationSettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
  argTypes: {
    onCancel: { action: "Cancelled" },
    onSave: { action: "Saved" },
  },
} as ComponentMeta<typeof RdsCompNotificationSettings>;

const Template: ComponentStory<typeof RdsCompNotificationSettings> = (args) => (
  <RdsCompNotificationSettings {...args} />
);

export const NotificationSettings = Template.bind({});

NotificationSettings.args = {
  default: [{ enabled: false, NewUser: false, NewTenant: false }],
};
