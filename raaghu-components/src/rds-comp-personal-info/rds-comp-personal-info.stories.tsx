/* eslint-disable */
import React from 'react';
import { ComponentStory } from "@storybook/react";
import RdsCompPersonalInfo from './rds-comp-personal-info';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../.storybook/i18n';

export default {
  title: "Components/Personal Info",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};

const Template: ComponentStory<typeof RdsCompPersonalInfo> = (args) => (
  <RdsCompPersonalInfo {...args} />
);


export const PersonalInfo = () => <RdsCompPersonalInfo />;

PersonalInfo.story = {
  name: 'default',
};
