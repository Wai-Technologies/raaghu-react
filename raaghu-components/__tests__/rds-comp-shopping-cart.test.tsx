import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompShoppingCart, { RdsCompShoppingCartProp } from "../src/rds-comp-shopping-cart/rds-comp-shopping-cart";

describe("RdsCompShoppingCart", () => {
    const mockProps: RdsCompShoppingCartProp = {
        cart: {},
        role: "user",
        itemList: [
            {
                image: "image-url",
                description: "Item description",
                quantity: 1,
                price: 10,
            },
            // Add more items if needed
        ],
    };

    it("renders shopping cart items", () => {
        render(<RdsCompShoppingCart {...mockProps} />);
    
        const itemElements = screen.getAllByTestId("shopping-cart-item");
        expect(itemElements).toHaveLength(mockProps.itemList.length);

        mockProps.itemList.forEach((item, index) => {
            const imageElement = screen.getByText(item.image);
            const descriptionElement = screen.getByText(item.description);
            const quantityElement = screen.getByText(item.quantity.toString());
            const priceElement = screen.getByText(item.price.toString());

            expect(imageElement).toBeInTheDocument();
            expect(descriptionElement).toBeInTheDocument();
            expect(quantityElement).toBeInTheDocument();
            expect(priceElement).toBeInTheDocument();
        });
    });
});
