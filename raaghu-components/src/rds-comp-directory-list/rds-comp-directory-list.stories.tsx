import type { Meta, StoryObj } from "@storybook/react";
import RdsCompDirectoryList from "./rds-comp-directory-list";

const meta: Meta = {
  title: "Components/Directory List",
  component: RdsCompDirectoryList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompDirectoryList>;

export default meta;

type Story = StoryObj<typeof RdsCompDirectoryList>;

export const Default: Story = {
  args: {
    items: [
      { id: "1", name: "Directory 1" },
      { id: "2", name: "Directory 2" },
      { id: "3", name: "Directory 3" },
    ],
  },
} satisfies Story;
