import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserClaim from "./rds-comp-user-claims";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/User Claims",
  component: RdsCompUserClaim,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],

} as ComponentMeta<typeof RdsCompUserClaim>;


const Template: ComponentStory<typeof RdsCompUserClaim> = (args) => (
  <RdsCompUserClaim {...args} />
);


export const UserClaim = Template.bind({});

UserClaim.args = {

};