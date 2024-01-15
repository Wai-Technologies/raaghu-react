/* eslint-disable */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserRoles from "./rds-comp-user-roles";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";


export default {
  title: "Components/User Roles",
  component: RdsCompUserRoles,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompUserRoles>;

const Template: ComponentStory<typeof RdsCompUserRoles> = (args) => (
  <RdsCompUserRoles {...args} />
);


export const UserRoles = Template.bind({});

UserRoles.story = {
  roleData: [
    {
      id: 1,
      name: "Child Checkbox 1",
      checked: false,
      disabled: false,
    },
    {
      id: 2,
      name: "Child Checkbox 2",
      checked: false,
      disabled: false,
    },
    {
      id: 3,
      name: "Child Checkbox 3",
      checked: false,
      disabled: false,
    },
  ]

};
