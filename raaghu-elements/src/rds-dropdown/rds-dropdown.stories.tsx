import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsDropdown from "./rds-dropdown";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Elements/Dropdown",
  component: RdsDropdown,
  argTypes: {
    size: {
      options: ["small", "mid", "large"],
      control: { type: "radio" },
    },
    colorVariant: {
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "white",
      ],
      control: { type: "select" },
    },
    direction: {
      options: ["Drop-Up", "Drop-Right", "Drop-Down", "Drop-Left"],
      control: { type: "radio" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "150px 0", textAlign: "center" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof RdsDropdown>;

const Template: ComponentStory<typeof RdsDropdown> = (args) => (
  <RdsDropdown {...args} />
);

export const Default = Template.bind({});

Default.args = {
  colorVariant: "primary",
  id: "2",
  size: "mid",
  darkDropdown: false,
  label: "Dropdown Button",
  direction: "Drop-Down",
  split: false,
  listItems: [
    {
      value: "Export To Excel",
      id: "1",
      href: "",
    },
    {
      value: "Import From Excel",
      id: "2",
      href: "",
    },
    {
      value: "Click here download sample import file",
      id: "3",
      href: "",
    },
  ],
};

export const WithSplit = Template.bind({});

WithSplit.args = {
  colorVariant: "primary",
  id: "3",
  size: "mid",
  darkDropdown: false,
  label: "Dropdown Button",
  direction: "Drop-Down",
  split: true,
  listItems: [
    {
      value: "Export To Excel",
      id: "1",
      href: "",
    },
    {
      value: "Import From Excel",
      id: "2",
      href: "",
    },
    {
      value: "Click here download sample import file",
      id: "3",
      href: "",
    },
  ],
};
