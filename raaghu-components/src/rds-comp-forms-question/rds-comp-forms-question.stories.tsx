import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFormsQuestions from './rds-comp-forms-questions';
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Forms Question",
  component: RdsCompFormsQuestions,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompFormsQuestions>;

const Template: ComponentStory<typeof RdsCompFormsQuestions> = (args) => (
  <RdsCompFormsQuestions {...args} />
);

export const Default = Template.bind({});

Default.args = {

};
