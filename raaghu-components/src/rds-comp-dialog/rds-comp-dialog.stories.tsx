import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsCompDialog from "./rds-comp-dialog";

//Whatever code is commented in this file is needed in fututre reference - enhancement as per figma design

const meta: Meta = {
  title: "Elements/Dialog",
  component: RdsCompDialog,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    Size: {
      options: ["Large", "Small"],
      control: { type: "select" },
    },
    Style: {
      options: ["Default", "Outlined", "Filled"],
      control: { type: "select" },
    },
    ContentPosition: {
      options: ["Bottom", "Left"],
      control: { type: "select" },
    },
    ColorVariant: {
      options: [
          "primary",
          "success",
          "danger",
          "warning",
          "light",
          "info",
          "secondary",
          "dark",
      ],
      control: { type: "select" },
  },
  },
} satisfies Meta<typeof RdsCompDialog>;

export default meta;
type Story = StoryObj<typeof RdsCompDialog>;

export const Default: Story = {
  args: {
    Size: "Large",
    Style: "Default",
    ShowDissmiss: true,
    ShowPrimary: true,
    ShowSecondary: true,
    ShowTitle: true,
    Title: "Delete Account",
    ColorVariant: "primary",
    Content: "Deleting this data will remove your account and you will no longer login to the application! Are you sure you want to proceed?",
    Icon: "users", 
    ContentPosition: "Bottom",
  },
} satisfies Story;
Default.parameters = {
  controls: {
    include: [
      "Size",
      "Style",
      // "ColorVariant",
      "Title",
      // "Content",
      "ShowTitle",
      "ShowDissmiss",
      "ShowPrimary",
      "ShowSecondary",
        // "Icon",
        // "ContentPosition",
    ],
  },
};
