import type { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompEmptyState from "./rds-comp-empty-state";


const meta: Meta<typeof RdsCompEmptyState> = {
  title: "Components/Empty State",
  component: RdsCompEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", 'stable'],
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
    isContinueAnimate: {
      control: { type: "boolean" },
      description: "Enable Lottie animation for the empty state icon. When true, displays animated Lottie instead of static PNG image",
    },
    buttonText: {
      control: { type: "text" },
      description: "Text to display on the action button",
    },
    className: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    label: "No Data Available",
    subLabel: "No data available at this moment. Would you like to add new data?",
    iconHeight: 150,
    iconWidth: 150,
    buttonText: "Add New Data",
    isContinueAnimate: false,
  
  },
};


