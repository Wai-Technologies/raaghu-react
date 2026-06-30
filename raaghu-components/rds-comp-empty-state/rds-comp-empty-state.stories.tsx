import type { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompEmptyState from "./rds-comp-empty-state";
import { expect } from 'storybook/test';


const meta: Meta<typeof RdsCompEmptyState> = {
  title: "Components/Empty State",
  component: RdsCompEmptyState,
  parameters: {
        status: { type: 'stable' },
    layout: "padded",
  },
  tags: ["autodocs", 'stable'],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["illustration", "minimal"],
      description:
        "Visual style: illustration shows full artwork; minimal uses a compact icon or cropped circular animation",
    },
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
      description:
        "Enable animation: full Lottie for illustration, circular cropped Lottie for minimal",
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

export const Default: Story = {
  args: {
    variant: "illustration",
    label: "No Data Available",
    subLabel: "No data available at this moment. Would you like to add new data?",
    iconHeight: 150,
    iconWidth: 150,
    buttonText: "Add New Data",
    isContinueAnimate: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};

export const Animated: Story = {
  args: {
    ...Default.args,
    isContinueAnimate: true,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
    await expect(
      canvasElement.querySelector('[data-testid="emptyStateLottie"]')
    ).toBeTruthy();
  },
};

