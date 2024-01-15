import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsReviewCategory, { Item, RdsReviewCategoryProps } from "../src/rds-review-category/rds-review-category";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsReviewCategory", () => {
    const mockItem: Item = {
        name: "Test Item",
        date: new Date("2022-05-01"),
        imageUrl: "https://example.com/test.png",
        rating: 3,
        reviewTitle: "Test Review Title",
        reviewSubTitle: "Test Review Subtitle",
        description: "Test Description",
        likes: 10,
        dislikes: 5,
    };
    
    const item: Item = {
        name: "John Doe",
        date: new Date("2023-05-10"),
        imageUrl: "https://example.com/avatar.jpg",
        rating: 4,
        reviewTitle: "Great Product",
        reviewSubTitle: "Highly recommended",
        description: "Lorem ipsum dolor sit amet",
        likes: 10,
        dislikes: 2,
    };
    
    const defaultProps: RdsReviewCategoryProps = {
        display_type: "Basic",
        item: item,
    };
    
    
      
    
    it("renders basic display type correctly", () => {
        const { getByText } = render(<RdsReviewCategory {...defaultProps} />);
        
        expect(getByText(item.name)).toBeInTheDocument();
        expect(getByText(item.date!.toDateString().slice(4))).toBeInTheDocument();
        expect(getByText(item.reviewTitle!)).toBeInTheDocument();
        expect(getByText(item.reviewSubTitle!)).toBeInTheDocument();
        expect(getByText(item.description!)).toBeInTheDocument();
    });
    
  
    it("renders without errors", () => {
        render(<RdsReviewCategory display_type="Basic" item={mockItem} />);
    });
  
    it("renders correctly with display_type Basic", () => {
        const { getByText } = render(
            <RdsReviewCategory display_type="Basic" item={mockItem} />
        );
  
        expect(getByText(mockItem.name)).toBeInTheDocument();
        expect(getByText(mockItem.date!.toDateString().slice(4))).toBeInTheDocument();
        expect(getByText(mockItem.reviewTitle!)).toBeInTheDocument();
        expect(getByText(mockItem.reviewSubTitle!)).toBeInTheDocument();
        expect(getByText(mockItem.description!)).toBeInTheDocument();
        expect(getByText("10")).toBeInTheDocument();
        expect(getByText("5")).toBeInTheDocument();
    });
  
  
  
    it("renders correctly with display_type ReviewType_2", () => {
        const { getByText } = render(
            <RdsReviewCategory display_type="ReviewType_2" item={mockItem} />
        );
  
        expect(getByText(mockItem.name)).toBeInTheDocument();
        expect(getByText(mockItem.description!)).toBeInTheDocument();
        expect(getByText("10")).toBeInTheDocument();
        expect(getByText("5")).toBeInTheDocument();
    });
});
  