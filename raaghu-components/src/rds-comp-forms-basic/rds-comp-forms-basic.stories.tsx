
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFormsBasic from "./rds-comp-forms-basic";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Forms Basic",
  component: RdsCompFormsBasic,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompFormsBasic>;


const Template: ComponentStory<typeof RdsCompFormsBasic> = (args) =>
  <RdsCompFormsBasic {...args} />;


export const Default = Template.bind({});

Default.args = {
}

