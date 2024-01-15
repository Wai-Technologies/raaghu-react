import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import RdsCompTestimonials from "../src/rds-comp-testimonials/rds-comp-testimonials";

describe("RdsCompTestionials", () => {
    const carousalItem = [
        {
            id: 1,
            imgUrl:
        "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
            name: "Sam Smith",
            roleName: "Product Manager",
            subTitle:
        "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt",
        }
    ];

    const testimonialItems = [
        [
            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "SAM SMITH",
                subtitle: "PRODUCT MANAGER",
                description:
          "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "zapier",
                route: "/home",
                selected: true,
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: false,
                iconStroke: true,
            },
        ],

        [
            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "King John",
                subtitle: "MARKETING MANAGER",
                description:
          "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "zapier",
                route: "/home",
                selected: true,
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: false,
                iconStroke: true,
            },
        ],
        [
            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "King Khan",
                subtitle: "BUSINESS MANAGER",
                description:
          "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "zapier",
                route: "/home",
                selected: true,
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: false,
                iconStroke: true,
            },
        ],
    ];

    it("renders default type correctly", () => {
        render(
            <RdsCompTestimonials displayType="basic" carousalItem={carousalItem} />
        );
        expect(screen.getByText(/Testimonials/)).toBeInTheDocument();
        const imgElement = screen.getAllByRole("img");
        imgElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText(/Sam Smith/)).toBeInTheDocument();
        expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
        expect(screen.getByText(/Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt/)).toBeInTheDocument();
    });

    it("renders advanced type correctly", () => {
        render(
            <RdsCompTestimonials displayType="advanced" testimonialItems={testimonialItems} />
        );
        expect(screen.getByText(/Testimonials/)).toBeInTheDocument();
        const imgElement = screen.getAllByRole("img");
        const titleElement = screen.getAllByText(/Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat/);
        imgElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        titleElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText(/SAM SMITH/)).toBeInTheDocument();
        expect(screen.getByText(/King John/)).toBeInTheDocument();
        expect(screen.getByText(/King Khan/)).toBeInTheDocument();
        expect(screen.getByText(/PRODUCT MANAGER/)).toBeInTheDocument();
        expect(screen.getByText(/MARKETING MANAGER/)).toBeInTheDocument();
        expect(screen.getByText(/BUSINESS MANAGER/)).toBeInTheDocument();
    });
});
