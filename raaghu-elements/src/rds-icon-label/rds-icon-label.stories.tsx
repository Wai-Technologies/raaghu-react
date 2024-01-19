import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsIconLabel from "./rds-icon-label";

export default {
  title: "Elements/Icon Label",
  component: RdsIconLabel,
  argTypes: {
    colorVariant: {
        options: [
            "primary",
            "secondary",
            "success",
            "info",
            "warning",
            "danger",
            "dark",
            "light",
        ],
        control: { type: "select" },
    },
    size: {
        options: ['small', 'medium', 'large'],
        control: { type: 'radio' }
      },
  },
} as ComponentMeta<typeof RdsIconLabel>;

const Template: ComponentStory<typeof RdsIconLabel> = (args) => (
  <RdsIconLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "User Name",
  icon: "users",
  size: "medium",
  colorVariant:"primary",
};

export const WithPosition = Template.bind({});
WithPosition.args = {
label: "User Name",
  icon: "users",
  size: "medium",
  iconposition: "left",
  colorVariant:"primary",
};
WithPosition.argTypes = {
  iconposition: {
    options: ["left", "right"],
    control: { type: "radio" },
  },
};
