/* eslint-disable */
import React from 'react';
import { ComponentStory } from "@storybook/react";
import RdsCompNewPage from './rds-comp-newPage';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "components/New Page",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};
const Template: ComponentStory<typeof RdsCompNewPage> = (args) => (
  <RdsCompNewPage {...args} />
);
export const NewPage = () => <RdsCompNewPage />;

NewPage.story = {
  name: 'default',
};
