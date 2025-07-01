import { Meta, StoryObj } from "@storybook/react";
import RdsPlandiscount from "./rds-plan-discount";


const meta: Meta = {
    title: "Components/Plan Discount",
    component: RdsPlandiscount,
    parameters:{
      docs:{
        description: {
  component: `The **Plan Discount** component displays discount-related information prominently, 
  helping users understand how much they are saving on a selected plan. It accepts the following props: 
  \`discount\` (the percentage of discount offered), \`discountValue\` (the actual monetary value saved), 
  and \`saveLabel\` (a customizable label to accompany the savings information, typically showing a word 
  like "Save"). This component is ideal for use in pricing cards, checkout summaries, or promotional 
  sections to encourage conversions by clearly showing the benefits of a discounted plan.`
}

      }
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof RdsPlandiscount>;

export default meta;
type Story = StoryObj<typeof RdsPlandiscount>;

export const Standard: Story = {
    args: {
      discount: "10",
      discountValue: "100",
      saveLabel: "Save"
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['discount', 'discountValue', 'saveLabel'] } };
