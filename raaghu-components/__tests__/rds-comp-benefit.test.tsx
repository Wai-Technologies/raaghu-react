import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompBenefit from "../src/rds-comp-benefit/rds-comp-benefit";

const props = {
    displayType: "Center Aligned",
    colsize: 4,
    itemList: [
        {
            id: 1,
            iconHeight: "40px",
            iconWidth: "40px",
            icon: "truck",
            iconFill: false,
            iconstroke: true,
            iconColorVarient: "dark",
            title: "Free shipping",
            description:
        "Free delivery is our main part of company we just price it into the products. Someone's paying for it, and it's not us.",
        },
        {
            id: 2,
            iconHeight: "40px",
            iconWidth: "40px",
            icon: "refresh_sync",
            iconFill: false,
            iconstroke: true,
            iconColorVarient: "dark",
            title: "Exchanges",
            description:
        "We are take our customer and their needs also, if you don't like it, trade it to one of your friends for something of theirs.",
        },
        {
            id: 3,
            display_type: "Centre Aligned",
            iconHeight: "40px",
            iconWidth: "40px",
            icon: "shield_check",
            iconFill: false,
            iconstroke: true,
            iconColorVarient: "dark",
            title: "10-year warranty",
            description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though. This is the best part of our service.",
        },
    ],
};

describe("RdsCompBenefit", () => {
    it("renders the correct number of items", () => {
        render(<RdsCompBenefit {...props} />);
        expect(screen.getAllByTestId("rds-benefit")).toHaveLength(3);
    });
});
