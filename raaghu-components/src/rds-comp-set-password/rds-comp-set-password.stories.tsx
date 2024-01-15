/* eslint-disable */
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import RdsCompSetPassword from './rds-comp-set-password';
import i18n from '../../../.storybook/i18n';
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Components/Set Password",
  component: RdsCompSetPassword,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompSetPassword>;

export const Default = () => <RdsCompSetPassword />;

Default.story = {
  name: 'default',
};
