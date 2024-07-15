
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
                    imgUrl: "./assets/inline_price.png",
                    productTitle: "Basic Tee",
                    bordered: true,
                },
                {
                    imgUrl: "./assets/inline_price.png",
                    productTitle: "Basic Tee",
                    bordered: true,
                },
                {
                    imgUrl: "./assets/inline_price.png",
                    productTitle: "Basic Tee",
                    bordered: true,
                },
                {
                    imgUrl: "./assets/inline_price.png",
                    productTitle: "Basic Tee",
                    bordered: true,
                },
                {
                    imgUrl: "./assets/inline_price.png",
                    productTitle: "Basic Tee",
                    bordered: true,
                },
            ],
    }
} satisfies Story;

export const DefaProductListWithInfolt: Story = {
  args : {
        items: [
            {
                imgUrl: "./assets/inline_price.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                bordered: true,
            },
            {
                imgUrl: "./assets/inline_price.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                bordered: true,
            },
            {
                imgUrl: "./assets/inline_price.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                bordered: true,
            },
            {
                imgUrl: "./assets/inline_price.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                bordered: true,
            },
            {
                imgUrl: "./assets/inline_price.png",
                productTitle: "Basic Tee",
                colorLabel: "White",
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const ProductListWithInlinePrice: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/earthen_bottle.png",
                productTitle: "Earthen Bottle",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/tumbler_bottle.png",
                productTitle: "Nomad Tumbler Bottle",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/pure_glass_bottle.png",
                productTitle: "Pure Glass Bottle",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const ProductListSimple: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/earthen_bottle.png",
                productTitle: "Earthen Bottle",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/tumbler_bottle.png",
                productTitle: "Nomad Tumbler Bottle",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/pure_glass_bottle.png",
                productTitle: "Pure Glass Bottle",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const ProductListCardWithFullDetails: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/finish_table.png",
                productTitle: "Premium Finish Table",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/wood_chair.png",
                productTitle: "Premium Rose Wood Chair",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/Lounge_Chair.png",
                productTitle: "Lounge Chair",
                productDescription:
                    "White tees stain easily, and black tees fade. This is going to be gray for a while.",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const ProductListWithBorder: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/school_bag_red.png",
                productTitle: "Orange Bag",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "./assets/school_bag_black_red.png",
                productTitle: "multicolor Bag",
                rating: 3,
                reviews: "See all 123 reviews",
                cost: "$35",
                bordered: true,
            },
            {
                imgUrl: "./assets/school_bag_green.png",
                productTitle: "Green Bag",
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
            imgUrl: "./assets/leather_bag.png",
            productTitle: "Leather Hand Bag",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
            bordered: true,
        },
        {
            imgUrl: "./assets/leather_girls_bag.png",
            productTitle: "Leather long Wallet",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
            bordered: true,
        },
        {
            imgUrl: "./assets/Leather_wallet.png",
            productTitle: "Leather Girls Bag",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
            bordered: true,
        },
        {
            imgUrl: "./assets/leather_office_bag.png",
            productTitle: "Leather Office Bag",
            colorLabel: "White",
            cost: "$35",
            badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
            showAddToBagButton: true,
            bordered: true,
        },
    ],
}
} satisfies Story;

export const WithSupportingText: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/Leather_long_wallet.png",
                productTitle: "Leather Long Wallet",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/Pen_with_diary.png",
                productTitle: "Pen with Diary",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/tea_coaster_Set_antique.png",
                productTitle: "Tea Coaster Set Antique",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/wood_primer_toy.png",
                productTitle: "Wood Primer Toy",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
        ],
    }
} satisfies Story;

export const WithColorSwatchesAndHorizontalScrolling: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/Ink_pen.png",
                productTitle: "Premium Quality Ink Pen",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "./assets/Layer_glass_bottle.png",
                productTitle: "Layer Glass Water Bottle",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "./assets/elegant_creative_art.png",
                productTitle: "Elegant Creative Art",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
                ColorSwitcherList: [
                    { id: 1, color: "#FFFFFF" },
                    { id: 2, color: "#FDD2FF" },
                    { id: 3, color: "#BFEAFF" },
                ],
            },
            {
                imgUrl: "./assets/Door_hanger.png",
                productTitle: "Door Hanger",
                rating: 3,
                reviews: "See all 123 reviews",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
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
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2016/01/15/05/57/lunch-box-1141196_960_720.jpg",
                productTitle: "Tiffin Box",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2016/01/15/05/57/lunch-box-1141196_960_720.jpg",
                productTitle: "Tiffin Box",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2016/01/15/05/57/lunch-box-1141196_960_720.jpg",
                productTitle: "Tiffin Box",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2016/01/15/05/57/lunch-box-1141196_960_720.jpg",
                productTitle: "Tiffin Box",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2022/01/22/10/03/coca-cola-6956750_960_720.jpg",
                productTitle: "coca-cola",
                rating: 3,
                cost: "$35",
            },
            {
                imgUrl: "https://cdn.pixabay.com/photo/2016/01/15/05/57/lunch-box-1141196_960_720.jpg",
                productTitle: "Tiffin Box",
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
                imgUrl: "./assets/Leather_long_wallet.png",
                productTitle: "Leather Long Wallet",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/Pen_with_diary.png",
                productTitle: "Pen with Diary",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/tea_coaster_Set_antique.png",
                productTitle: "Tea Coaster Set Antique",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
            {
                imgUrl: "./assets/wood_primer_toy.png",
                productTitle: "Wood Primer Toy",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                showAddToBagButton: true,
                showBuyNowButton: true,
                bordered: true,
            },
        ],
        type: "With Tall Images And CTA Link",
    }
} satisfies Story;


export const WithTallImages: Story = {
    args : {
        items: [
            {
                imgUrl: "./assets/finish_table.png",
                productTitle: "Premium Finish Table",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/wood_chair.png",
                productTitle: "Premium Rose Wood Chair",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/Lounge_Chair.png",
                productTitle: "Lounge Chair",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
            {
                imgUrl: "./assets/brass_metal.png",
                productTitle: "Brass Peace Sign Metal Paperweight",
                colorLabel: "White",
                cost: "$35",
                badgeWithIcon: { badge: "Quality Assured", icon: "featured" },
                bordered: true,
            },
        ],
    }
} satisfies Story;
