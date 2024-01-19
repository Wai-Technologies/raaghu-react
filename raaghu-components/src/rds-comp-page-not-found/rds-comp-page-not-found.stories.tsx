import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompPageNotFound from "./rds-comp-page-not-found";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Page Not Found",
  component: RdsCompPageNotFound,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompPageNotFound>;


const Template: ComponentStory<typeof RdsCompPageNotFound> = (args) => (
  <RdsCompPageNotFound {...args} />
);


export const PageNotFound = Template.bind({});

PageNotFound.args = {

};