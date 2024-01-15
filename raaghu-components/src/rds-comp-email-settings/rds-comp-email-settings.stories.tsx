import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompEmailSettings from "./rds-comp-email-settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Email Settings",
  component: RdsCompEmailSettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompEmailSettings>;


const Template: ComponentStory<typeof RdsCompEmailSettings> = (args) => (
  <RdsCompEmailSettings {...args} />
);


export const EmailSettings = Template.bind({});

EmailSettings.args = {
  emailSettings: {
    "currentEmail": "niphy.anto@waiin.com",
    "newEmail": "abc@waiin.com",
    "confirmEmail": "abc@waiin.com"
  }
};