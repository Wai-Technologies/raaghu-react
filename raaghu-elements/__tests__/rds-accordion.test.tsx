import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RdsAccordion, { AccordionItem, AccordionType } from "../src/rds-accordion/rds-accordion";

describe("RdsAccordion", () => {
  const items: AccordionItem[] = [
    { id: "1", title: "Accordion 1", accordionContent: <div>Content 1</div> },
    { id: "2", title: "Accordion 2", accordionContent: <div>Content 2</div>, defaultOpen: true },
  ];

  it("renders all accordion items", () => {
    const { getByText } = render(<RdsAccordion items={items} />);
    expect(getByText("Accordion 1")).toBeInTheDocument();
    expect(getByText("Accordion 2")).toBeInTheDocument();
  });

  it("shows content for defaultOpen item", () => {
    const { getByText } = render(<RdsAccordion items={items} />);
    expect(getByText("Content 2")).toBeVisible();
  });

  it("toggles content on click (single mode)", () => {
    const { getByText, queryByText } = render(
      <RdsAccordion items={items} accordionType={AccordionType.single} />
    );
    // Content 2 is open by default
    expect(getByText("Content 2")).toBeVisible();
    // Click Accordion 1 to open
    fireEvent.click(getByText("Accordion 1"));
    expect(getByText("Content 1")).toBeVisible();
    // Content 2 should now be closed (not visible)
    // Instead of not.toBeVisible(), check for display: none on the parent
    const content2 = queryByText("Content 2");
    expect(content2).toBeInTheDocument();
    expect(content2?.closest('.accordion-collapse')).toHaveClass('collapse');
    expect(content2?.closest('.accordion-collapse')).not.toHaveClass('show');
  });

  it("allows multiple open (multiple mode)", () => {
    const { getByText } = render(
      <RdsAccordion items={items} accordionType={AccordionType.multiple} />
    );
    fireEvent.click(getByText("Accordion 1"));
    expect(getByText("Content 1")).toBeVisible();
    expect(getByText("Content 2")).toBeVisible();
  });
});