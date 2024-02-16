
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProductList from "./rds-comp-product-list";


const meta: Meta = { 
    title: "Components/Product List",
    component: RdsCompProductList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProductList>;

export default meta;
type Story = StoryObj<typeof RdsCompProductList>;

export const ProductListWithTitle: Story = {
    args: {
            items: [
                {
                    imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                    productTitle: "Basic Tee",
                },
                {
                    imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                    productTitle: "Basic Tee",
                },
                {
                    imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                    productTitle: "Basic Tee",
                },
                {
                    imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                    productTitle: "Basic Tee",
                },
                {
                    imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                    productTitle: "Basic Tee",
                },
            ],
    }
} satisfies Story;

export const DefaProductListWithInfolt: Story = {
  args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
            },
        ],
    }
} satisfies Story;

export const ProductListWithInlinePrice: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
        ],
    }
} satisfies Story;

export const ProductListSimple: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
        ],
    }
} satisfies Story;

export const ProductListCardWithFullDetails: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
        ],
    }
} satisfies Story;

export const ProductListWithBorder: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const WithImageOverlayAndAddButton: Story = {
  args : {
    items: [
        {
            imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
            productTitle: "Basic Tee",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
        },
        {
            imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
            productTitle: "Basic Tee",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
        },
        {
            imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
            productTitle: "Basic Tee",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
        },
        {
            imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
            productTitle: "Basic Tee",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
        },
        {
            imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
            productTitle: "Basic Tee",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
        },
    ],
}
} satisfies Story;

export const WithSupportingText: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
        ],
    }
} satisfies Story;

export const WithColorSwatchesAndHorizontalScrolling: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
        ],
        type: "With Color Swatches and Horizontal Scrolling",
    }
} satisfies Story;

export const InfiniteProductList: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                rating: 3,
                cost: "$35",
            },
        ],
        type: "Infinite List",
    }
} satisfies Story;

export const WithCTALink: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
            },
        ],
        type: "With Tall Images And CTA Link",
    }
} satisfies Story;


export const WithTallImages: Story = {
    args : {
        items: [
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
            {
                imgUrl: "https://www.linkpicture.com/q/product_img_with_title_1.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            },
        ],
    }
} satisfies Story;
