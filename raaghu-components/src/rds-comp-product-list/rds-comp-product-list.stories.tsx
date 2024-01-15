import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompProductList from "./rds-comp-product-list";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Product List",
    component: RdsCompProductList,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompProductList>;

const Template: ComponentStory<typeof RdsCompProductList> = (args) => (
    <RdsCompProductList {...args} />
);

export const ProductListWithTitle = Template.bind({});

ProductListWithTitle.args = {
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
};

export const ProductListWithInfo = Template.bind({});

ProductListWithInfo.args = {
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
};

export const ProductListWithInlinePrice = Template.bind({});
ProductListWithInlinePrice.args = {
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
};

export const ProductListSimple = Template.bind({});
ProductListSimple.args = {
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
};

export const ProductListCardWithFullDetails = Template.bind({});
ProductListCardWithFullDetails.args = {
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
};

export const ProductListWithBorder = Template.bind({});
ProductListWithBorder.args = {
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
};

export const WithImageOverlayAndAddButton = Template.bind({});
WithImageOverlayAndAddButton.args = {
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
};

export const WithSupportingText = Template.bind({});
WithSupportingText.args = {
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
};

export const WithColorSwatchesAndHorizontalScrolling = Template.bind({});
WithColorSwatchesAndHorizontalScrolling.args = {
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
};

export const InfiniteProductList = Template.bind({});
InfiniteProductList.args = {
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
};

export const WithCTALink = Template.bind({});
WithCTALink.args = {
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
};

export const WithTallImages = Template.bind({});
WithTallImages.args = {
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
};
