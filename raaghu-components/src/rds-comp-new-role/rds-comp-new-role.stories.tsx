import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompNewRole from "./rds-comp-new-role";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "components/New Role",
  component: RdsCompNewRole,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompNewRole>;


const Template: ComponentStory<typeof RdsCompNewRole> = (args) => (
  <RdsCompNewRole {...args} />
);


export const NewRole = Template.bind({});

NewRole.args = {
  roleData: {
    "displayName": "Role Name",
    "isDefault": false
  }
};