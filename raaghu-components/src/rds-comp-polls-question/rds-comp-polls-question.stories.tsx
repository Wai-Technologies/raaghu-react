/* eslint-disable */
import React from 'react';
import { ComponentStory } from "@storybook/react";
import RdsCompPollsQuestion from './rds-comp-polls-question';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../.storybook/i18n';

export default {
  title: "components/Polls-Question",
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
};

const Template: ComponentStory<typeof RdsCompPollsQuestion> = (args) => (
  <RdsCompPollsQuestion {...args} />
);

export const PollsQuestion = () => <RdsCompPollsQuestion />;

PollsQuestion.story = {
  name: 'default',

  widgetList: [
    {
      option: "One"
    },
    {
      option: "two"
    },
    {
      option: "three"
    },
    {
      option: "four"
    }

  ]
};
