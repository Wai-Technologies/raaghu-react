import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompProfileEdit from "./rds-comp-profile-edit";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Edit Profile",
  component: RdsCompProfileEdit,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompProfileEdit>;

const Template: ComponentStory<typeof RdsCompProfileEdit> = (args) => (
  <RdsCompProfileEdit {...args} />
);

export const Default = Template.bind({});

Default.args = {};
