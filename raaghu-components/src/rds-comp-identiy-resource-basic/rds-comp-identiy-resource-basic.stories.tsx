/* eslint-disable */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIdentiyResourceBasic from "./rds-comp-identiy-resource-basic";

export default {
  title: "Components/Scope",
  component: RdsCompIdentiyResourceBasic,
};


const Template: ComponentStory<typeof RdsCompIdentiyResourceBasic> = (args) => (
  <RdsCompIdentiyResourceBasic {...args} />
);

export const IdentiyResourceBasic = Template.bind({});

IdentiyResourceBasic.story = {
  name: 'default',
};
