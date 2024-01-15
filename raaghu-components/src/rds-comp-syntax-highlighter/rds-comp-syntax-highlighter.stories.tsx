import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompSyntaxHighlighter from "./rds-comp-syntax-highlighter";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Syntax-Highlighter",
  component: RdsCompSyntaxHighlighter,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompSyntaxHighlighter>;

const Template: ComponentStory<typeof RdsCompSyntaxHighlighter> = (args) => (
  <RdsCompSyntaxHighlighter {...args} />
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  maxLength: 550,
  minLength: 500,
  name: "Editior",
  placeholder: "Type here",
  padding: 15,
  required: true,
  tabSize: 15
};
