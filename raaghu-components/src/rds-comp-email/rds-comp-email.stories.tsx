import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompEmail from "./rds-comp-email";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Email",
  component: RdsCompEmail,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompEmail>;


const Template: ComponentStory<typeof RdsCompEmail> = (args) => (
  <RdsCompEmail {...args} />
);


export const Email = Template.bind({});

Email.args = {

};