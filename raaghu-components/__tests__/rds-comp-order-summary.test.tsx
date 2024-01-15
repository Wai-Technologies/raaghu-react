import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompOrderSummary, { RdsCompOrderSummaryProps } from "../src/rds-comp-order-summary/rds-comp-order-summary";



describe("RdsCompOrderSummary", () => {
    it("renders order summary table correctly", () => {
        const props: RdsCompOrderSummaryProps = {
            isCheckout: true,
        };
  
        const { getByText } = render(<RdsCompOrderSummary {...props} />);
        const number = "$0.00";
        // Assert that the table headers and rows are rendered correctly
        expect(screen.getByText("Order summary")).toBeInTheDocument();
        expect(screen.getByText("subtotal")).toBeInTheDocument();
        expect(screen.getByText("Shipping estimate")).toBeInTheDocument();
        expect(screen.getByText("Tax estimate")).toBeInTheDocument();
        expect(screen.getByText("Order Total")).toBeInTheDocument();


    
        const elementsWithNumber = screen.getAllByText(number.toString());
        // Assuming only one element should match the number, you can select the first element
        expect(elementsWithNumber[0]).toBeInTheDocument();
        expect(elementsWithNumber[1]).toBeInTheDocument();
    });


    it("renders checkout button when isCheckout is true", () => {
        const props: RdsCompOrderSummaryProps = {
            isCheckout: true,
        };

        const { getByText } = render(<RdsCompOrderSummary {...props} />);

        // Assert that the checkout button is rendered when isCheckout is true
        expect(getByText("Checkout")).toBeInTheDocument();
    });
});
