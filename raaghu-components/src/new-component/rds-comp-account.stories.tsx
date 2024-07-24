import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompAccount from "./rds-comp-account";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Account",
  component: RdsCompAccount,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompAccount>;

const Template: ComponentStory<typeof RdsCompAccount> = (args) => (
  <RdsCompAccount {...args} />
);

export const Account = Template.bind({});

Account.args = {
  versionList: [{ option: "1" }, { option: "2" }, { option: "3" }],
  twoFactList: [{ option: "Optional" }, { option: "Disabled" }, { option: "Forced" }]
};

