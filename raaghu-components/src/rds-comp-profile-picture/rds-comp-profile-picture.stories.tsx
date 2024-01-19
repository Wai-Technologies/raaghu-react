/* eslint-disable */
import React from 'react';
import { ComponentStory } from "@storybook/react";
import RdsCompProfilePicture from './rds-comp-profile-picture';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../.storybook/i18n';

export default {
  title: "Components/Profile-Picture",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};

const Template: ComponentStory<typeof RdsCompProfilePicture> = (args) => (
  <RdsCompProfilePicture {...args} />
);

export const ProfilePicture = () => <RdsCompProfilePicture />;

ProfilePicture.story = {
  name: 'default',
  profilePictureData: "https://abpstagereact12.raaghu.io/assets/profile-picture-circle.svg",
};
