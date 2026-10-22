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
        "Visual style: illustration shows full artwork; minimal uses a compact icon",
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
    description: {
      control: { type: "text" },
      description: "Subtitle or description text",
    },
    imageSize: {
      control: { type: "number" },
      description: "Image size (px if number). Default 150 for illustration, 72 for minimal",
    },
    animated: {
      control: { type: "boolean" },
      if: { arg: "variant", eq: "illustration" },
      description: "Enable full Lottie animation (illustration variant only)",
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
    description: "No data available at this moment. Would you like to add new data?",
    animated: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};

export const Animated: Story = {
  args: {
    ...Default.args,
    variant: "illustration",
    animated: true,
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
    await expect(
      canvasElement.querySelector('[data-testid="emptyStateLottie"]')
    ).toBeTruthy();
  },
};

