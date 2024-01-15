import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFormsEmail from "./rds-comp-forms-email";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Forms Email",
  component: RdsCompFormsEmail,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompFormsEmail>;

const Template: ComponentStory<typeof RdsCompFormsEmail> = (args) => (
  <RdsCompFormsEmail {...args} />
);

export const Default = Template.bind({});

Default.args = {
};

