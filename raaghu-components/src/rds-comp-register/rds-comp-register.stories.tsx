/* eslint-disable */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompRegister from './rds-comp-register';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "components/Register",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};
const Template: ComponentStory<typeof RdsCompRegister> = (args) => (
  <RdsCompRegister {...args} />
);

export const Register = Template.bind({});

Register.story = {
  name: 'default',
};
