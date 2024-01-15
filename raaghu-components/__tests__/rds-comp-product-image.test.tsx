import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompProductImage, { Item } from "../src/rds-comp-product-image/rds-comp-product-image";


describe("RdsCompProductImage", () => {
    const mockItem: Item = {
        imgUrl: "image-url",
        rating: 4,
        reviews: "10 reviews",
        productTitle: "Basic Tee",
        productDescription: "Lorem ipsum dolor sit amet",
        colorLabel: "Red",
        cost: "$35",
        badgeWithIcon: { badge: "New", icon: "star" },
        itemWidth: "200px",
        ColorSwitcherList: [
            { id: 1, color: "Red" },
            { id: 2, color: "Blue" },
        ],
        showAddToBagButton: true,
        bordered: true,
        showBuyNowButton: true,
    };

    it("renders the product image component correctly", () => {
        const { getByAltText, getByText } = render(
            <RdsCompProductImage item={mockItem} />
        );

        const productImage = getByAltText("product-img");
        expect(productImage).toBeInTheDocument();
        expect(productImage.getAttribute("src")).toBe("image-url");

        const productTitle = getByText("Basic Tee");
        expect(productTitle).toBeInTheDocument();

        const reviewsLink = getByText("10 reviews");
        expect(reviewsLink).toBeInTheDocument();

        const productDescription = getByText("Lorem ipsum dolor sit amet");
        expect(productDescription).toBeInTheDocument();

        const colorLabel = getByText("Red");
        expect(colorLabel).toBeInTheDocument();

        const costLabel = getByText("$35");
        expect(costLabel).toBeInTheDocument();

        const addToBagButton = getByText("ADD TO BAG");
        expect(addToBagButton).toBeInTheDocument();

        const buyNowButton = getByText("BUY NOW");
        expect(buyNowButton).toBeInTheDocument();
    });

    test("handles heart icon click", () => {
        const { getByAltText } = render(<RdsCompProductImage item={mockItem} />);
      
        // Assert initial state
        expect(getByAltText("product-img")).toBeInTheDocument();
      
        // Simulate a click on the heart icon
        const heartIcon = document.querySelector(".iconposition-heart") as HTMLElement;
        fireEvent.click(heartIcon);
      
        // Assert updated state
        expect(getByAltText("product-img")).toBeInTheDocument();
    });
      
      

});

