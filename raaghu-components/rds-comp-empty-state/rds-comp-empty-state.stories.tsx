import type { Meta, StoryObj } from "@storybook/react";
import RdsCompEmptyState from "./rds-comp-empty-state";
import emptyStatePng from "./empty-state.png";
import emptyStateDarkPng from "./empty-state-dark.png";


const meta: Meta<typeof RdsCompEmptyState> = {
  title: "Components/Empty State",
  component: RdsCompEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['Light NRA', 'Dark NRA'],
      description: 'Select visual mode; switches between light and dark empty state illustration',
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
    // iconPath: {
    //   control: { type: "text" },
    //   description: "Optional custom image path (defaults to built-in empty-state.png)",
    // },
    buttonText: {
      control: { type: "text" },
      description: "Text to display on the action button",
    },
    
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
  mode: 'Light NRA',
    label: "No Data Available",
  subLabel: "No data available at this moment. Would you like to add new data?",
  iconHeight: 150,
  iconWidth: 150,
    buttonText: "Add New Data",
    
  },
};
