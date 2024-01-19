import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompMySettings from "./rds-comp-my-settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/My Settings",
  component: RdsCompMySettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompMySettings>;

const Template: ComponentStory<typeof RdsCompMySettings> = (args) => (
  <RdsCompMySettings {...args} />
);

export const MySettings = Template.bind({});

MySettings.args = {
};
