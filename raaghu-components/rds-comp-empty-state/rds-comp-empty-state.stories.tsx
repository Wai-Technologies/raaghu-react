import type { Meta, StoryObj } from "@storybook/react";
import RdsCompEmptyState from "./rds-comp-empty-state";

const meta: Meta<typeof RdsCompEmptyState> = {
  title: "Components/Empty State",
  component: RdsCompEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "text" },
      description: "Mode or state identifier",
    },
    label: {
      control: { type: "text" },
      description: "Main title text",
    },
    subLabel: {
      control: { type: "text" },
      description: "Subtitle or description text",
    },
    iconHeight: {
      control: { type: "number" },
      description: "Icon height (px if number). Default 150",
    },
    iconWidth: {
      control: { type: "number" },
      description: "Icon width (px if number). Default 150",
    },
    buttonText: {
      control: { type: "text" },
      description: "Text to display on the action button",
    },
    showButton: {
      control: { type: "boolean" },
      description: "Whether to show the action button",
    },
    onButtonClick: {
      action: "button clicked",
      description: "Function called when button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    mode: "no-data",
    label: "No Data Available",
    subLabel: "No data available at the moment. Would you like to add new data?",
  iconHeight: 150,
  iconWidth: 150,
    buttonText: "Add New Data",
    showButton: true,
    onButtonClick: () => console.log("Add new data clicked"),
  },
};
