import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProductImage from "./rds-comp-product-image";


const meta: Meta = { 
  title: "Components/Product Image",
    component: RdsCompProductImage,
    parameters: {
        layout: "",
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
        imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
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




