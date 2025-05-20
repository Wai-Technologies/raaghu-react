import { Meta, StoryObj } from "@storybook/react";
import RdsPlandiscount from "./rds-plan-discount";


const meta: Meta = {
    title: "Components/Plan Discount",
    component: RdsPlandiscount,
    tags: ['autodocs'],
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
