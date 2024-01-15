/* eslint-disable */
import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompChangePassword from './rds-comp-change-password';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Change Password",
  component: RdsCompChangePassword,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompChangePassword>;


const Template: ComponentStory<typeof RdsCompChangePassword> = (args) => (
  <RdsCompChangePassword {...args} />
);

export const ChangePassword = Template.bind({});

ChangePassword.args = {

};