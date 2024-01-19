
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompPasswordSetting from "./rds-comp-password-setting";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Password Setting",
  component: RdsCompPasswordSetting,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompPasswordSetting>;


const Template: ComponentStory<typeof RdsCompPasswordSetting> = (args) => (
  <RdsCompPasswordSetting {...args} />
);


export const PasswordSetting = Template.bind({});

PasswordSetting.args = {
  sizeDataWithDescription: [
    { type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
    { type: "Express", days: "2-5 buisness days", cost: "$16.00" },
    { type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
  sizeType: "withDescription",
};

