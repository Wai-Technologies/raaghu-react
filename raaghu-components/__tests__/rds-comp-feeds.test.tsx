import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import RdsCompFeeds, { Item } from "../src/rds-comp-feeds/rds-comp-feeds";

describe("RdsCompFeeds", () => {
    const itemList: Item[] = [
        {
            name: "John Doe",
            description: "Test description",
            rating: 3,
            reviews: "5 reviews",
            hashtags: "test, hashtag",
            replies: "3 replies",
            imageUrl: "https://test.com/image.jpg",
            username: "johndoe",
            date: new Date(),
            feedIcon: "test-icon",
            likes: 10,
            dislikes: 5,
        },
    ];

    it("renders basic variant correctly", () => {
        render(<RdsCompFeeds itemList={itemList} variantType="Basic" />);
        const nameElement = screen.getByText(/John Doe/i);
        expect(nameElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(/Test description/i);
        expect(descriptionElement).toBeInTheDocument();
    });

    it("renders advanced variant correctly", () => {
        render(<RdsCompFeeds itemList={itemList} variantType="Advanced" />);
        const nameElement = screen.getByText(/John Doe/i);
        expect(nameElement).toBeInTheDocument();
        const descriptionElement = screen.getByText(/Test description/i);
        expect(descriptionElement).toBeInTheDocument();
        const reviewsElement = screen.getByText(/5 reviews/i);
        expect(reviewsElement).toBeInTheDocument();
        const hashtagsElement = screen.getByText(/test, hashtag/i);
        expect(hashtagsElement).toBeInTheDocument();
        const repliesElement = screen.getByText(/3 replies/i);
        expect(repliesElement).toBeInTheDocument();
    });

    it("displays like/dislike counts correctly", () => {
        render(<RdsCompFeeds itemList={itemList} variantType="Advanced" />);
        const likesElement = screen.getByText(/35/i);
        expect(likesElement).toBeInTheDocument();
        const dislikesElement = screen.getByText(/10/i);
        expect(dislikesElement).toBeInTheDocument();
    });
});
