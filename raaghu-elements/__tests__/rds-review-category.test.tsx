import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsReviewCategory, { Item, RdsReviewCategoryProps } from "../src/rds-review-category/rds-review-category";

// Mock RdsIcon to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, colorVariant, height, width }) => (
        <img 
            src="test-icon.svg" 
            alt={name} 
            data-testid={`icon-${name}`} 
            role="img"
        />
    ))
}));

// Mock RdsRating component
jest.mock("../src/rds-rating", () => ({
    __esModule: true,
    default: jest.fn(({ rating }) => (
        <div data-testid={`rating-${rating}`}>
            {Array(rating).fill("★").join("")}
        </div>
    ))
}));

// Mock RdsAvatar component
jest.mock("../src/rds-avatar", () => ({
    __esModule: true,
    default: jest.fn(({ profilePic }) => (
        <div data-testid="avatar" className="avatar">
            <img src={profilePic} alt="Avatar" />
        </div>
    ))
}));

// Mock RdsLikeDislike component
jest.mock("../src/rds-like-dislike", () => ({
    __esModule: true,
    default: jest.fn(({ like, dislike }) => (
        <div data-testid="like-dislike">
            <span data-testid="likes">{like}</span>
            <span data-testid="dislikes">{dislike}</span>
        </div>
    ))
}));

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
        const { getByText, getByTestId } = render(<RdsReviewCategory {...defaultProps} />);
        
        expect(getByText(item.name)).toBeInTheDocument();
        // Check for date in the expected format
        const dateString = item.date!.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).replace(/ (\d{4})/, ', $1');
        expect(getByText(dateString)).toBeInTheDocument();
        
        expect(getByText(item.reviewTitle!)).toBeInTheDocument();
        expect(getByText(item.reviewSubTitle!)).toBeInTheDocument();
        expect(getByText(item.description!)).toBeInTheDocument();
        
        // Check for rating component
        expect(getByTestId(`rating-${item.rating}`)).toBeInTheDocument();
        
        // Check for like/dislike component
        const likesElement = getByTestId("likes");
        const dislikesElement = getByTestId("dislikes");
        expect(likesElement).toBeInTheDocument();
        expect(dislikesElement).toBeInTheDocument();
        expect(likesElement.textContent).toBe(item.likes!.toString());
        expect(dislikesElement.textContent).toBe(item.dislikes!.toString());
    });
  
    it("renders without errors", () => {
        render(<RdsReviewCategory display_type="Basic" item={mockItem} />);
        // Just checking if it renders without throwing
    });
  
    it("renders correctly with display_type Basic", () => {
        const { getByText, getByTestId } = render(
            <RdsReviewCategory display_type="Basic" item={mockItem} />
        );
  
        expect(getByText(mockItem.name)).toBeInTheDocument();
        expect(getByText(mockItem.reviewTitle!)).toBeInTheDocument();
        expect(getByText(mockItem.reviewSubTitle!)).toBeInTheDocument();
        expect(getByText(mockItem.description!)).toBeInTheDocument();
        
        // Check for rating component
        expect(getByTestId(`rating-${mockItem.rating}`)).toBeInTheDocument();
        
        // Check for like/dislike component with proper values
        expect(getByTestId("likes").textContent).toBe(mockItem.likes!.toString());
        expect(getByTestId("dislikes").textContent).toBe(mockItem.dislikes!.toString());
    });
  
    it("renders correctly with display_type ReviewType_2", () => {
        const { getByText, getByTestId } = render(
            <RdsReviewCategory display_type="ReviewType_2" item={mockItem} />
        );
  
        expect(getByText(mockItem.name)).toBeInTheDocument();
        expect(getByText(mockItem.description!)).toBeInTheDocument();
        
        // Check for rating component
        expect(getByTestId(`rating-${mockItem.rating}`)).toBeInTheDocument();
        
        // Check for like/dislike component with proper values
        expect(getByTestId("likes").textContent).toBe(mockItem.likes!.toString());
        expect(getByTestId("dislikes").textContent).toBe(mockItem.dislikes!.toString());
    });
});
  