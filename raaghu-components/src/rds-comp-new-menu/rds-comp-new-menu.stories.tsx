/* eslint-disable */

import React from "react";
import { ComponentStory } from "@storybook/react";
import RdsCompNewMenu from './rds-comp-new-menu';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";


export default {
  title: "Components/ New Menu",
  component: RdsCompNewMenu,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};

const Template: ComponentStory<typeof RdsCompNewMenu> = (args) => (
  <RdsCompNewMenu {...args} />
);

export const NewMenu = Template.bind({});

NewMenu.story = {
};
