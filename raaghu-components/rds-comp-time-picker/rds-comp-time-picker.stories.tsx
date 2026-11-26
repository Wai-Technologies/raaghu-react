import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompTimePicker from "./rds-comp-time-picker";

const meta: Meta = {
  title: "Components/Time Picker",
  component: RdsCompTimePicker,
  parameters: {
        status: { type: 'stable' },
    layout: "padded",
    controls: {
    exclude: ['onChange', 'value'],
    },
  },
  tags: ["autodocs", 'stable'],
  argTypes: {
    color: {
      options: ["primary", "secondary", "success", "error", "warning"],
      control: { type: "select" },
      description: "Accent colour of the time picker",
      table: { defaultValue: { summary: "primary" } },
    },
    colorVariant: { table: { disable: true } },
    style: {
      options: ["default", "compact"],
      control: { type: "select" },
      defaultValue: "default",
      description: "Style variant of the time picker",
    },
    state: {
      options: ["default", "expanded", "selected"],
      control: { type: "select" },
      defaultValue: "default",
      description: "State of the time picker",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the time picker",
    },
  },
} satisfies Meta<typeof RdsCompTimePicker>;

export default meta;
type Story = StoryObj<typeof RdsCompTimePicker>;

export const Default: Story = {
  args: {
    color: "primary",
    style: "default",
    state: "default",
    disabled: false,
  },
};