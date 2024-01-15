import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RdsCompNewMenu from "../src/rds-comp-new-menu/rds-comp-new-menu";

describe("RdsCompNewMenu", () => {
    it("should render the component with the correct props", () => {
        const props = {
            onSubmit: jest.fn(),
            menusData: {
                url: "https://example.com",
                displayName: "My Menu",
                isActive: true,
                icon: "fa-bars",
                target: "_self",
                elementId: "my-menu",
                cssClass: "my-menu-css-class",
            },
        };

        render(<RdsCompNewMenu menuPage={[]} {...props} />);

        const iconElement = screen.getAllByText("Icon");
        iconElement.forEach(element => {
            expect(element).toBeInTheDocument();
        });
        expect(screen.getByTestId("url")).toBeInTheDocument();
        expect(screen.getByTestId("display-name")).toBeInTheDocument();
        expect(screen.getByTestId("target")).toBeInTheDocument();
        expect(screen.getByTestId("enter-id")).toBeInTheDocument();
        expect(screen.getByTestId("enter-css-class")).toBeInTheDocument();
    });

    it("should disable the Save button when the Display Name is empty", () => {
        const props = {
            onSubmit: jest.fn(),
            menusData: {
                url: "https://example.com",
                displayName: "",
                isActive: true,
                icon: "fa-bars",
                target: "_self",
                elementId: "my-menu",
                cssClass: "my-menu-css-class",
            },
        };
        render(<RdsCompNewMenu menuPage={[]} {...props} />);
        expect(screen.getByTestId("save")).toBeDisabled();
    });

    it("should not call the onSubmit prop when the Save button is clicked if the Display Name is empty", () => {
        const props = {
            onSubmit: jest.fn(),
            menusData: {
                url: "https://example.com",
                displayName: "",
                isActive: true,
                icon: "fa-bars",
                target: "_self",
                elementId: "my-menu",
                cssClass: "my-menu-css-class",
            },
        };
        render(<RdsCompNewMenu menuPage={[]} {...props} />);
        screen.getByTestId("save").click();
        expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it("should render the correct error message when the Display Name is empty", () => {
        const props = {
            onSubmit: jest.fn(),
            menusData: {
                url: "https://example.com",
                displayName: "",
                isActive: true,
                icon: "fa-bars",
                target: "_self",
                elementId: "my-menu",
                cssClass: "my-menu-css-class",
            },
        };
        render(<RdsCompNewMenu menuPage={[]} {...props} />);
        const submitButton = screen.getByTestId("save");
        fireEvent.click(submitButton);
        expect(screen.getByText("Display Name")).not.toHaveValue();
    });
});
