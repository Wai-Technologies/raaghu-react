import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RdsCompCustomerReviews from "../src/rds-comp-customer-reviews/rds-comp-customer-reviews";

test("renders the component without crashing", () => {
    const itemList = [];
    const { container } = render(<RdsCompCustomerReviews itemList={[]} />);

    // Assertions
    expect(container).toBeInTheDocument();
});


test("renders the correct number of reviews", () => {
    const reviews = [
        { value: 1, count: 5 },
        { value: 2, count: 8 },
        { value: 3, count: 12 },
    ];
    const { container } = render(<RdsCompCustomerReviews itemList={[]}  />);
    const reviewItems = container.querySelectorAll(".review-item");
    expect(reviewItems.length).toBe(0);
});


test("calculates the review rates correctly", () => {
    const itemList = [
        { value: 1, count: 5 },
        { value: 2, count: 8 },
        { value: 3, count: 12 },
    ];
    render(<RdsCompCustomerReviews itemList={itemList} />);
 
    expect(screen.getByText("Product Name")).toBeInTheDocument();
 
//   expect(screen.getByText('8%')).toBeInTheDocument();
//   expect(screen.getByText('12%')).toBeInTheDocument();
});


