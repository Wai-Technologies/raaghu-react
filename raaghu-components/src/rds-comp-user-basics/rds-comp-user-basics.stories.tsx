import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserBasics from "./rds-comp-user-basics";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/User Basics",
  component: RdsCompUserBasics,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompUserBasics>;


const Template: ComponentStory<typeof RdsCompUserBasics> = (args) =>
  <RdsCompUserBasics {...args} />;


export const UserBasics = Template.bind({});

UserBasics.args = {

};