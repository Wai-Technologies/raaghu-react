import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompEditionNewBasic, { RdsCompEditionNewBasicProps } from "../src/rds-comp-edition-new-basic/rds-comp-edition-new-basic";

describe("RdsCompEditionNewBasic", () => {
    const planList = [
        { value: "plan1", label: "Plan 1" },
        { value: "plan2", label: "Plan 2" },
        { value: "plan3", label: "Plan 3" },
    ];
    

    const renderComponent = (props: RdsCompEditionNewBasicProps) => {
        render(<RdsCompEditionNewBasic {...props} planListLabel="Plan-List" />);
    };

    it("renders the component with input and select list", () => {
        renderComponent({ planList });

        const editionNameInput = screen.getByText("Edition Name");
        expect(editionNameInput).toBeInTheDocument();

        const planSelectList = screen.getByText("Plan-List");
        expect(planSelectList).toBeInTheDocument();
    });

    it("renders the component with required fields", () => {
        renderComponent({ planList });

        const editionNameInput = screen.getByTestId("edition-name");
        expect(editionNameInput).toBeRequired();
    });

    // it("renders the component with provided plan list", () => {
    //     renderComponent({ planList });

    //     const planSelectList = screen.getByText("Plan-List");
    //     expect(planSelectList).toBeInTheDocument();

    //     const planOptions = screen.getAllByRole("option");
    //     expect(planOptions).toHaveLength(planList.length);
    // });
});
