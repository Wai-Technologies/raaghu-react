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
    itemList: [
      {
        prodName: "Premium Quality Soft T-Shirt",
        image: "./assets/profile-picture-circle.svg",
        description: "Gray - medium",
        quantity: [
          {
          option: 'Qty 1',
          value: 'one'
          },
          {
          option: 'Qty 2',
          value: 'two'
          },
          {
          option: 'Qty 3',
          value: 'three'
          },
          {
          option: 'Qty 4',
          value: 'four'
          }
      ],
      highlightsIcon: 'tick',
      highlights: 'In Stock',
        price: 100,
      },
      {
        prodName: "Premium Quality Soft T-Shirt",
        image: "./assets/profile-picture-circle.svg",
        description: "Black & White - Large",
        quantity: [
          {
            option: 'Qty 1',
            value: 'one'
            },
            {
            option: 'Qty 2',
            value: 'two'
            },
            {
            option: 'Qty 3',
            value: 'three'
            },
            {
            option: 'Qty 4',
            value: 'four'
            }
        ],
        highlightsIcon: 'clock',
        highlights: 'Ships in 3-4 weeks',     
        price: 200,
      },
    ],
  }
} satisfies Story;
Default.parameters = { controls: { include: ['itemList'] } };




