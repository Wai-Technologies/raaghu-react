import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFormsSettings from './rds-comp-forms-setting';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n"

export default {
  title: "Components/Forms Settings",
  component: RdsCompFormsSettings,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompFormsSettings>;

const Template: ComponentStory<typeof RdsCompFormsSettings> = (args) => (
  <RdsCompFormsSettings {...args} />
);

export const Default = Template.bind({});

Default.args = {

};
