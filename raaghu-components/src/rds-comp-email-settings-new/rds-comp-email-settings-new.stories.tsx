import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompEmailSettingsNew from "./rds-comp-email-settings-new";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Email Settings New",
  component: RdsCompEmailSettingsNew,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompEmailSettingsNew>;


const Template: ComponentStory<typeof RdsCompEmailSettingsNew> = (args) => (
  <RdsCompEmailSettingsNew {...args} />

);

export const EmailSettingsNew = Template.bind({});

EmailSettingsNew.args = {

};