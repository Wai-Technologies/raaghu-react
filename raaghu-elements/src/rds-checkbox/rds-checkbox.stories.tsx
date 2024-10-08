import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsCheckbox from "./rds-checkbox";

const meta: Meta<typeof RdsCheckbox> = {
  title: "Elements/Checkbox",
  component: RdsCheckbox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      options: ["Checkbox", "Indeterminate", "ErrorCheckbox"],
      control: { type: "select" },
    },
    type: {
      options: ["Square", "Circular"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCheckbox>;

export const checkBox: Story = {
  args: {
    type: "Square",
    state: "Checkbox",
    label: "default checkbox",
    checked: false,
    isDisabled: false,
    isSwitch: false,
    withlabel: true,
    id: "id1",
    // errorMessage: "error Message",
    isInputGroup: false,
  },
  parameters: {
    controls: {
      include: [
        "type",
        "state",
        "label",
        "checked",
        "isDisabled",
        "isSwitch",
        "withlabel",
        "id",
        "isInputGroup",
      ],
    },
  },
};