import React from "react";
import "@testing-library/jest-dom";
import RdsAccordionItem from "../src/rds-accordion/rds-accordion-item";
import { render, screen } from "@testing-library/react";
import RdsAccordion, { RdsAccordionProps } from "../src/rds-accordion/rds-accordion";

describe("Test script of RdsAccordion and RdsAccordionItem", () => {

    it("renders without errors", () => {
        render(<RdsAccordion accordionType={""} />);
    });

    it("should render the accordion component", () => {
        const { container } = render(<RdsAccordion accordionType="default" />);
        const accordionElement = container.querySelector(".accordion");

        expect(accordionElement).toBeInTheDocument();
    });

    it("should render the accordion component with flush type", () => {
        const { container } = render(<RdsAccordion accordionType="flush" />);
        const accordionElement = container.querySelector(".accordion-flush");

        expect(accordionElement).toBeInTheDocument();
    });


    it("should render the child components", () => {
        const child = (
            <RdsAccordionItem id="1" title="Accordion Title">
                <p>Child Content</p>
            </RdsAccordionItem>
        );
        render(<RdsAccordion accordionType="default">{child}</RdsAccordion>);
        const childElement = screen.getByText("Accordion Title");
        expect(childElement).toBeInTheDocument();
    });


    test("renders title and children", () => {
        const title = "Accordion Title";
        const children = <div>Accordion Content</div>;

        render(<RdsAccordionItem title={title} id="1" defaultOpen>{children}</RdsAccordionItem>);

        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();

        const childrenElement = screen.getByText("Accordion Content");
        expect(childrenElement).toBeInTheDocument();
    });


    it("renders the title and children", () => {
        const title = "Accordion Title";
        const children = "Accordion Body";
        render(<RdsAccordionItem title={title} children={children} id="1" />);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
    });


    it("defaults to closed when defaultOpen prop is not passed", () => {
        const title = "Accordion Title";
        const children = "Accordion Body";
        render(<RdsAccordionItem title={title} children={children} id="2" />);
        const collapseButton = screen.getByRole("button");
        expect(collapseButton).not.toHaveClass("show");
    });


    it("defaults to open when defaultOpen prop is true", () => {
        const title = "Accordion Title";
        const children = "Accordion Body";
        render(<RdsAccordionItem title={title} children={children} id="3" defaultOpen />);
        const collapseButton = screen.getByRole("button");
        expect(collapseButton).not.toHaveClass("collapsed");
    });

    it("stays open when alwaysOpen prop is true", () => {
        const title = "Accordion Title";
        const children = "Accordion Body";
        render(<RdsAccordionItem title={title} children={children} id="4" AlwaysOpen />);
        const collapseButton = screen.getByRole("button");
        expect(collapseButton.getAttribute("data-bs-parent")).toBe(null);
    });

    it("Checking Button Attribute to be false", () => {
  
        render(<RdsAccordionItem title={""} id={undefined} children={undefined}/>);
        const BtnAttribute = screen.getByRole("button");
        console.log("Console Message:",BtnAttribute);
        expect(BtnAttribute.getAttribute("aria-expanded")).toBe("false");
    });


});
