import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompDeliveryMethod, {
    RdsCompDeliveryMethodProps,
} from "../src/rds-comp-delivery-method/rds-comp-delivery-method";

describe("RdsCompDeliveryMethod", () => {
    const sizeDataWithDescription = [
        { id: 1, type: "Type 1", days: "2 days", cost: "$10" },
        { id: 2, type: "Type 2", days: "3 days", cost: "$15" },
        { id: 3, type: "Type 3", days: "4 days", cost: "$20" },
    ];

    test("renders the component with size data without description", () => {
        const props: RdsCompDeliveryMethodProps = {
            sizeDataWithDescription,
            sizeType: "withoutDescription",
        };
        render(<RdsCompDeliveryMethod {...props} />);

        const sizeItems = screen.getAllByRole("listitem");
        expect(sizeItems.length).toBe(sizeDataWithDescription.length);

        sizeDataWithDescription.forEach((data) => {
            const type = screen.getByText(data.type);
            expect(type).toBeInTheDocument();

            const days = screen.getByText(data.days);
            expect(days).toBeInTheDocument();

            const cost = screen.getByText(data.cost);
            expect(cost).toBeInTheDocument();
        });
    });

    test("renders the component with size data with description and handles click event", () => {
        const props: RdsCompDeliveryMethodProps = {
            sizeDataWithDescription,
            sizeType: "withDescription",
        };
        render(<RdsCompDeliveryMethod {...props} />);

        const sizeItems = screen.getAllByRole("listitem");
        expect(sizeItems.length).toBe(sizeDataWithDescription.length);

        sizeDataWithDescription.forEach((data) => {
            const type = screen.getByText(data.type);
            expect(type).toBeInTheDocument();

            const days = screen.getByText(data.days);
            expect(days).toBeInTheDocument();

            const cost = screen.getByText(data.cost);
            expect(cost).toBeInTheDocument();
        });
        const firstSizeItem = sizeItems[0];
        fireEvent.click(firstSizeItem);
        expect(firstSizeItem).toHaveClass("m-2 border flex-evens");
    });
});



describe("RdsCompDeliveryMethod", () => {
    const sizeDataWithDescription = [
        { id: 1, type: "Type 1", days: "2 days", cost: "$10" },
        { id: 2, type: "Type 2", days: "3 days", cost: "$15" },
    // Add more test data if needed
    ];

    it("renders the delivery method list correctly", () => {
        const { container, getByText } = render(
            <RdsCompDeliveryMethod
                sizeDataWithDescription={sizeDataWithDescription}
                sizeType="withoutDescription"
            />
        );

        // Check if the list items are rendered
        const listItems = container.querySelectorAll("li");
        expect(listItems.length).toBe(sizeDataWithDescription.length);

        // Check if the type, description, and cost are rendered correctly
        sizeDataWithDescription.forEach((data) => {
            expect(getByText(data.type)).toBeInTheDocument();
            expect(getByText(data.days)).toBeInTheDocument();
            expect(getByText(data.cost)).toBeInTheDocument();
        });
    });


    it("marks a button as active when clicked", () => {
        const { container } = render(
            <RdsCompDeliveryMethod
                sizeDataWithDescription={sizeDataWithDescription}
                sizeType="withoutDescription"
            />
        );
  
        // Click on the first button
        const firstButton = container.querySelector(".p-3") as Element;
        fireEvent.click(firstButton);
  
        // Check if the first button is marked as active
        expect(firstButton).toHaveClass("border-color");
  
        // Click on the second button
        const secondButton = container.querySelectorAll(".p-3")[1] as Element;
        fireEvent.click(secondButton);
  
        // Check if the second button is marked as active
        expect(secondButton).toHaveClass("border-color");
        expect(firstButton).not.toHaveClass("border-color");
    });
  
 
});
