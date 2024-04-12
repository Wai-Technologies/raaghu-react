import type { Meta, StoryObj } from "@storybook/react";
import RdsCompApiResourceBasic from "./rds-comp-api-resource-basic";

const meta: Meta = {
  title: "Components/Api Resource Basic",
  component: RdsCompApiResourceBasic,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompApiResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApiResourceBasic>;

export const Default: Story = {
  args: {
  },
} satisfies Story;
//Default.parameters = { controls: { include: [] } };
