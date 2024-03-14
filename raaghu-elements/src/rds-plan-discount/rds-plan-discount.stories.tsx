import { Meta, StoryObj } from "@storybook/react";
import RdsPlandiscount from "./rds-plan-discount";


const meta: Meta = {
    title: "Elements/Plan Discount",
    component: RdsPlandiscount,
    argTypes: {
    }
} satisfies Meta<typeof RdsPlandiscount>;

export default meta;
type Story = StoryObj<typeof RdsPlandiscount>;

export const Default: Story = {
    args: {
      discount: "10",
      discountValue: "100",
      saveLabel: "Save"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['discount', 'discountValue', 'saveLabel'] } };
