import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompThemeNew from "./rds-comp-theme-new";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/Theme New",
  component: RdsCompThemeNew,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompThemeNew>;

const Template: ComponentStory<typeof RdsCompThemeNew> = (args) => (
  <RdsCompThemeNew {...args} />
);

export const ThemeNew = Template.bind({});

ThemeNew.args = {
  StyleList: [{ option: "Style 1" }, { option: "Style 2" }],
  WebList: [{ option: "Public 1" }, { option: "Public 2" }],
  MenuList: [{ option: "Placement 1" }, { option: "Placement 2" }],
  StatusList: [{ option: "Status 1" }, { option: "Status 2" }],
};
