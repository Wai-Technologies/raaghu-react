import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompOtherSettings from "./rds-comp-other-settings";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Other Settings",
  component: RdsCompOtherSettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompOtherSettings>;


const Template: ComponentStory<typeof RdsCompOtherSettings> = (args) => (
  <RdsCompOtherSettings {...args} />
);


export const OtherSettings = Template.bind({});

OtherSettings.args = {

};

