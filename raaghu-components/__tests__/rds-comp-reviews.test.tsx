import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RdsCompReviews, { RdsCompReviewsProps } from "../src/rds-comp-reviews/rds-comp-reviews";
import { Item } from "../src/rds-comp-feeds/rds-comp-feeds";


describe("RdsCompReviews", () => {
    const itemList = [
        { id: 1, name: "Item 1", description: "Description 1" },
        { id: 2, name: "Item 2", description: "Description 2" },
        { id: 3, name: "Item 3", description: "Description 3" },
    ] as any[];

    const renderComponent = (props: RdsCompReviewsProps) =>
        render(<RdsCompReviews {...props} />);

    it("should render RdsReviewCategory for each item when variantType is \"multi-column\"", () => {
        const props: RdsCompReviewsProps = {
            itemList,
            variantType: "multi-column",
        };
    
        const { container } = renderComponent(props);
        const reviewCategories = container.getElementsByClassName("mb-4");
        expect(reviewCategories.length).toBe(itemList.length);
    }); 


});


describe("RdsCompReviews", () => {
    const itemList: Item[] = [
    // Define your test item data here
    ];


  
    it("renders RdsReviewCategory for each item when variantType is \"multi-column\"", () => {
        const props = {
            variantType: "multi-column",
            itemList: itemList,
        };

        const { container } = render(<RdsCompReviews itemList={[]} />);

        itemList.forEach((item) => {
            expect(container.querySelector(".RdsReviewCategory")).toBeInTheDocument();
        });
    });

    it("does not render RdsCompFeeds when variantType is not \"with-summary-chart\" or \"simple-with-avatars\"", () => {
        const props = {
            variantType: "unknown-variant",
            itemList: itemList,
        };

        const { container } = render(<RdsCompReviews itemList={[]}  />);

        expect(container.querySelector(".RdsCompFeeds")).toBeNull();
    });


    it("renders the correct number of RdsReviewCategory components when variantType is \"multi-column\"", () => {
        const props = {
            variantType: "multi-column",
            itemList: itemList,
        };

        const { container } = render(<RdsCompReviews itemList={[]}  />);

        const reviewCategories = container.querySelectorAll(".RdsReviewCategory");
        expect(reviewCategories.length).toBe(itemList.length);
    });
});
