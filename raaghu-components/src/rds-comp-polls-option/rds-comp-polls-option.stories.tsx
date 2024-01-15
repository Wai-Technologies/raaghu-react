
/* eslint-disable */
import React from 'react';
import RdsCompPollsOption from './rds-comp-polls-option';
import { ComponentStory } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../.storybook/i18n';

export default {
  title: "Components/Polls-Option",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};

const Template: ComponentStory<typeof RdsCompPollsOption> = (args) => (
  <RdsCompPollsOption {...args} />
);

export const PollsOption = () => <RdsCompPollsOption />;

PollsOption.story = {
  name: 'default',
};
