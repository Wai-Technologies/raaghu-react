import type { Meta, StoryObj } from "@storybook/react";
import RdsCompApiResourceBasic from "./rds-comp-api-resource-basic";

const meta: Meta = {
  title: "Components/Api",
  component: RdsCompApiResourceBasic,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompApiResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApiResourceBasic>;

export const ResourceBasic: Story = {
  args: {
    apiType:"resourceBasic",
  },
} satisfies Story;
ResourceBasic.parameters = { controls: { include: ["apiResourceBasic", "reset", "onSaveHandler"] } };

export const ScopeBasicResource: Story = {
    args: {
      apiType:"scopeBasicResource",
    }
} satisfies Story;
ScopeBasicResource.parameters = { controls: { include: ["scopeData", "onSuccess", "reset"] } };
