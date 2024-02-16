import type { Meta, StoryObj } from '@storybook/react';
import RdsCompShoppingCart from "./rds-comp-shopping-cart";


const meta: Meta = {
  title: "Components/Shopping Cart",
  component: RdsCompShoppingCart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompShoppingCart>;

export default meta;
type Story = StoryObj<typeof RdsCompShoppingCart>;

export const Default: Story = {
  args: {

  }
} satisfies Story;




