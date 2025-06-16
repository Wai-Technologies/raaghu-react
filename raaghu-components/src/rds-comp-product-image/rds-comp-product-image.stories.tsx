import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProductImage from "./rds-comp-product-image";


const meta: Meta = { 
  title: "Components/Product Image",
    component: RdsCompProductImage,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Product Image** component is a customizable UI element designed to display product details along with an image in a structured and visually appealing format. It supports features such as product ratings, reviews, color switchers, badges with icons, and action buttons like "Add to Bag" and "Buy Now." This component is ideal for e-commerce platforms, product showcases, or any application requiring an interactive and user-friendly product display. Fully customizable, the Product Image component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProductImage>;

export default meta;
type Story = StoryObj<typeof RdsCompProductImage>;

export const Default: Story = {
    args: {
      item: {
        imgUrl: "https://www.crestedschoolwear.co.uk/wp-content/uploads/2018/07/white-tshirt.jpg",
        rating: 3,
        reviews: "See all 123 reviews",
        productTitle: "Basic Tee",
        productDescription:
          "White tees stain easily, and black tees fade. This is going to be gray for a while.",
        colorLabel: "White",
        cost: "$35",
        badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
        ColorSwitcherList: [
          { id: 1, color: "#FFFFFF" },
          { id: 2, color: "#FDD2FF" },
          { id: 3, color: "#BFEAFF" },
        ],
        showAddToBagButton: true,
        showBuyNowButton: true,
        bordered: true,
      },
    }
} satisfies Story;
