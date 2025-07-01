import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompShoppingCart from "./rds-comp-shopping-cart";


const meta: Meta = {
  title: "Components/Shopping Cart",
  component: RdsCompShoppingCart,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Shopping Cart** component is a customizable UI element designed to display and manage items in a shopping cart within your application. It provides a structured interface for showcasing product details such as name, image, description, quantity options, highlights (e.g., stock status or shipping time), and price. This component is ideal for e-commerce platforms or any application requiring a user-friendly and interactive shopping cart interface. Fully customizable, the Shopping Cart component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




