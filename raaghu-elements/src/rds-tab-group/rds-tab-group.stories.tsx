import { Meta, StoryObj } from "@storybook/react";
import RdsTabGroup from "./rds-tab-group";

const meta: Meta = {
    title: "Elements/Tab Group",
    component: RdsTabGroup,
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof RdsTabGroup>;

export default meta;
type Story = StoryObj<typeof RdsTabGroup>;

export const Default: Story = {
    args: {
      tabList: [{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['tabList'] } };
